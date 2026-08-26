import type { ComponentPublicInstance, MaybeRef } from 'vue'
import { ref, computed, unref, onMounted, watch, reactive } from 'vue'
import { useFileDialog, useDropZone } from '@vueuse/core'

export interface UseFileUploadOptions {
  /**
   * Specifies the allowed file types. Provide a comma-separated list of MIME types or file extensions.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @defaultValue '*'
   */
  accept?: MaybeRef<string>
  reset?: MaybeRef<boolean>
  multiple?: MaybeRef<boolean>
  dropzone?: boolean
  onUpdate: (files: File[]) => void
}

function parseAcceptToDataTypes(accept: string): string[] {
  // An empty list means no restriction (useDropZone allows all types).
  if (!accept || accept === '*') {
    return []
  }

  return accept
    .split(',')
    .map((type) => {
      const trimmedType = type.trim()

      if (trimmedType.includes('/') && trimmedType.endsWith('/*')) {
        return trimmedType.split('/')[0] || trimmedType
      }
      return trimmedType
    })
    .filter((type) => {
      return !type.startsWith('.')
    })
}

/**
 * The file-picking half of `FileUpload`: a hidden `<input type="file">`, an
 * optional drop zone, and the wiring that keeps the two agreeing on which
 * types are allowed.
 *
 * `accept` is parsed once for both — the browser applies it to the dialog, and
 * the same list is handed to the drop zone so a rejected drag is rejected
 * before the drop rather than after.
 *
 * @param options How the picker behaves.
 * @param options.accept Comma-separated MIME types or extensions, as the
 *   `accept` attribute takes them. `'*'` allows everything. Defaults to `'*'`.
 * @param options.reset Clear the selection before each dialog, so picking the
 *   same file twice fires `onUpdate` twice. Defaults to `false`.
 * @param options.multiple Allow more than one file. Defaults to `false`.
 * @param options.dropzone Attach the drop zone to `dropzoneRef`. Defaults to
 *   `true`.
 * @param options.onUpdate Called with the chosen files, from the dialog and
 *   from a drop alike.
 * @returns `open()` to raise the dialog, `isDragging` for the hover state, and
 *   `inputRef` / `dropzoneRef` to bind to the elements.
 *
 * @example
 * ```ts
 * const { open, isDragging, dropzoneRef } = useFileUpload({
 *   accept: 'image/*',
 *   multiple: true,
 *   onUpdate: files => upload(files)
 * })
 * ```
 */
export function useFileUpload(options: UseFileUploadOptions) {
  const {
    accept = '*',
    reset = false,
    multiple = false,
    dropzone = true,
    onUpdate
  } = options
  const inputRef = ref<ComponentPublicInstance>()
  const dropzoneRef = ref<HTMLDivElement>()

  const dataTypes = computed<readonly string[]>(() => parseAcceptToDataTypes(unref(accept)))

  const onDrop = (files: FileList | File[] | null, fromDropZone = false) => {
    if (!files || files.length === 0) {
      return
    }
    if (files instanceof FileList) {
      files = Array.from(files)
    }
    if (files.length > 1 && !unref(multiple)) {
      files = [files[0]!]
    }

    // Sync dropped files to the input element for proper native validation
    if (fromDropZone && inputRef.value?.$el) {
      try {
        const dt = new DataTransfer()
        files.forEach(file => dt.items.add(file))
        inputRef.value.$el.files = dt.files
      } catch (e) {
        console.warn('Could not sync files to input element:', e)
      }
    }

    onUpdate(files)
  }

  const isDragging = ref(false)
  const fileDialog = reactive({
    open: () => {
    }
  })

  function open() {
    fileDialog.open()
  }

  onMounted(() => {
    const { isOverDropZone } = dropzone
      ? useDropZone(dropzoneRef, { dataTypes, onDrop: files => onDrop(files, true) })
      : { isOverDropZone: ref(false) }

    watch(isOverDropZone, (value) => {
      isDragging.value = value
    })

    const { onChange, open } = useFileDialog({
      accept,
      multiple,
      input: computed(() => unref(inputRef)?.$el),
      reset
    })

    fileDialog.open = open

    onChange(fileList => onDrop(fileList, false))
  })

  return {
    isDragging,
    open,
    inputRef,
    dropzoneRef
  }
}
