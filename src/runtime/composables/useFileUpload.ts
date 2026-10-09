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
  /**
   * Called with the dropped files that do not match `accept`.
   */
  onReject?: (files: File[]) => void
}

function isFileAccepted(file: File, accept: string): boolean {
  const types = accept.split(',').map(type => type.trim().toLowerCase()).filter(Boolean)
  if (!types.length) {
    return true
  }

  const name = file.name.toLowerCase()
  const mime = file.type.toLowerCase()

  return types.some((type) => {
    if (type === '*' || type === '*/*') {
      return true
    }
    if (type.startsWith('.')) {
      return name.endsWith(type)
    }
    if (type.endsWith('/*')) {
      return mime.startsWith(type.slice(0, -1))
    }
    return mime === type
  })
}

/**
 * The file-picking half of `FileUpload`: a hidden `<input type="file">`, an
 * optional drop zone, and the wiring that keeps the two agreeing on which
 * types are allowed.
 *
 * `accept` goes to the dialog verbatim, and the dialog filters on it
 * natively. A drop is checked here instead, once the files are released: each
 * file is matched against `accept` by MIME type (`image/png`, `image/*`) or by
 * extension (`.pdf`, case-insensitive). Files that do not match are left out of
 * `onUpdate` and handed to `onReject`; if none match, `onUpdate` is not called.
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
 * @param options.onReject Called with the dropped files that do not match
 *   `accept`. Never called for the dialog.
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
    onUpdate,
    onReject
  } = options
  const inputRef = ref<ComponentPublicInstance>()
  const dropzoneRef = ref<HTMLDivElement>()

  const onDrop = (files: FileList | File[] | null, fromDropZone = false) => {
    if (!files || files.length === 0) {
      return
    }
    if (files instanceof FileList) {
      files = Array.from(files)
    }

    // The file dialog filters on `accept` natively, a drop has to be checked here.
    if (fromDropZone) {
      const rejected: File[] = []
      files = files.filter((file) => {
        if (isFileAccepted(file, unref(accept))) {
          return true
        }
        rejected.push(file)
        return false
      })

      if (rejected.length) {
        onReject?.(rejected)
      }
      if (!files.length) {
        return
      }
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
      ? useDropZone(dropzoneRef, { onDrop: files => onDrop(files, true) })
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
