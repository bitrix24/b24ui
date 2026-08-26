import type { Editor, Mark } from '@tiptap/vue-3'
import type { Middleware } from '@floating-ui/dom'
import { flip, shift, offset, size, autoPlacement, hide, inline } from '@floating-ui/dom'
import { isArrayOfArray } from './index'
import type { EditorHandlers, EditorCustomHandlers, EditorItem, FloatingUIOptions } from '../types/editor'

/**
 * Whether the editor's schema knows a mark — the check that decides if a
 * toolbar button is offered at all, since a `Bold` button on an editor built
 * without the Bold extension would be dead.
 */
export function isMarkInSchema(mark: string | Mark, editor: Editor | null): boolean {
  if (!editor?.schema) {
    return false
  }

  const markName = typeof mark === 'string' ? mark : mark.name
  return editor.schema.spec.marks.get(markName) !== undefined
}

/**
 * Whether the current selection is one of `nodeTypes`. Used to hide controls
 * that make no sense for what is selected — text alignment over an image, say.
 */
export function isNodeTypeSelected(editor: Editor | null, nodeTypes: string[]): boolean {
  if (!editor) {
    return false
  }

  const { selection } = editor.state
  const { $from, to } = selection

  return nodeTypes.some((nodeType) => {
    return editor.state.doc.nodesBetween($from.pos, to, (node) => {
      return node.type.name === nodeType
    })
  })
}

/** Whether an extension is registered on this editor instance. */
export function isExtensionAvailable(editor: Editor | null, extensionName: string): boolean {
  if (!editor) {
    return false
  }

  return editor.extensionManager.extensions.some(ext => ext.name === extensionName)
}

/**
 * Every `create*Handler` below returns the same shape, and it is the shape
 * `EditorToolbar` binds a button to: `canExecute` decides whether to enable
 * it, `execute` runs on click, `isActive` shows it pressed, and `isDisabled`
 * greys it out where the command makes no sense — inside a code block, or with
 * an image selected. Only the differences are documented on each one.
 */

/**
 * A handler for a command that toggles, by name — `blockquote` becomes
 * `toggleBlockquote`.
 */
export function createToggleHandler(name: string) {
  const fnName = `toggle${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return {
    canExecute: (editor: Editor) => (editor.can() as any)[fnName](),
    execute: (editor: Editor) => (editor.chain().focus() as any)[fnName](),
    isActive: (editor: Editor) => editor.isActive(name),
    isDisabled: (editor: Editor) => isNodeTypeSelected(editor, ['image']) || editor.isActive('code')
  }
}

/**
 * A handler for a command that sets rather than toggles — `paragraph` becomes
 * `setParagraph`. Still reports active, because the node it sets *is* a state
 * the toolbar shows pressed; what differs from `createToggleHandler` is only
 * that running it twice is idempotent instead of undoing itself.
 */
export function createSetHandler(name: string) {
  const fnName = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return {
    canExecute: (editor: Editor) => (editor.can() as any)[fnName](),
    execute: (editor: Editor) => (editor.chain().focus() as any)[fnName](),
    isActive: (editor: Editor) => editor.isActive(name),
    isDisabled: (editor: Editor) => isNodeTypeSelected(editor, ['image']) || editor.isActive('code')
  }
}

/**
 * A handler for a command called by its own name and carrying no state, such
 * as `undo` and `redo`. Does not focus the editor first: undo should not move
 * the caret.
 */
export function createSimpleHandler(name: string) {
  return {
    canExecute: (editor: Editor) => (editor.can() as any)[name](),
    execute: (editor: Editor) => (editor.chain() as any)[name](),
    isActive: () => false,
    isDisabled: undefined
  }
}

/**
 * A handler for any inline mark, taking the mark's name from the item rather
 * than from a closure — so bold, italic, code and strike are one handler
 * configured four ways.
 */
export function createMarkHandler() {
  return {
    canExecute: (editor: Editor, cmd: any) => (editor.can() as any).toggleMark(cmd.mark),
    execute: (editor: Editor, cmd: any) => editor.chain().focus().toggleMark(cmd.mark),
    isActive: (editor: Editor, cmd: any) => editor.isActive(cmd.mark),
    isDisabled: (editor: Editor, cmd: any) => !isMarkInSchema(cmd.mark, editor) || isNodeTypeSelected(editor, ['image'])
  }
}

/**
 * A handler for text alignment, reading the target alignment from the item.
 */
export function createTextAlignHandler() {
  return {
    canExecute: (editor: Editor, cmd: any) => (editor.can() as any).setTextAlign(cmd.align),
    execute: (editor: Editor, cmd: any) => (editor.chain().focus() as any).setTextAlign(cmd.align),
    isActive: (editor: Editor, cmd: any) => editor.isActive({ textAlign: cmd.align }),
    isDisabled: (editor: Editor) => !isExtensionAvailable(editor, 'textAlign') || isNodeTypeSelected(editor, ['image', 'horizontalRule'])
  }
}

/**
 * A handler for headings, reading the level from the item.
 */
export function createHeadingHandler() {
  return {
    canExecute: (editor: Editor, cmd: any) => (editor.can() as any).toggleHeading({ level: cmd.level }),
    execute: (editor: Editor, cmd: any) => editor.chain().focus().toggleHeading({ level: cmd.level }),
    isActive: (editor: Editor, cmd: any) => editor.isActive('heading', { level: cmd.level }),
    isDisabled: (editor: Editor) => isNodeTypeSelected(editor, ['image']) || editor.isActive('code')
  }
}

/**
 * A handler for links. Enabled when the editor can either set or unset one,
 * so the button stays usable both to add a link and to remove the one under
 * the caret.
 */
export function createLinkHandler() {
  return {
    canExecute: (editor: Editor) => {
      // Can execute if we can set a link or unset a link
      return (editor.can() as any).setLink({ href: '' }) || (editor.can() as any).unsetLink()
    },
    execute: (editor: Editor, cmd: any) => {
      const chain = editor.chain()
      const previousUrl = editor.getAttributes('link').href
      const hasCode = editor.isActive('code')

      // If link is already active, unset it
      if (previousUrl) {
        return chain.focus().unsetLink()
      }

      // If href is provided in cmd, use it, otherwise prompt
      const href = cmd?.href || prompt('Enter the URL:')
      if (!href) {
        return chain
      }

      // When linking code, extend the code mark range first to select the full code
      if (hasCode) {
        return chain.focus().extendMarkRange('code').setLink({ href })
      }

      return chain.focus().setLink({ href })
    },
    isActive: (editor: Editor) => editor.isActive('link'),
    isDisabled: (editor: Editor) => {
      if (!isExtensionAvailable(editor, 'link') || isNodeTypeSelected(editor, ['image'])) {
        return true
      }
      // Disable if no text is selected and no link is active
      const { selection } = editor.state
      return selection.empty && !editor.isActive('link')
    }
  }
}

/**
 * A handler for images.
 */
export function createImageHandler() {
  return {
    canExecute: (editor: Editor) => {
      return (editor.can() as any).setImage({ src: '' })
    },
    execute: (editor: Editor, cmd: any) => {
      const chain = editor.chain().focus()

      // If src is provided in cmd, use it
      if (cmd?.src) {
        return chain.setImage({ src: cmd.src })
      }

      // Otherwise prompt for URL
      const src = prompt('Enter the image URL:')
      if (src) {
        return chain.setImage({ src })
      }

      return chain
    },
    isActive: (editor: Editor) => editor.isActive('image'),
    isDisabled: (editor: Editor) => {
      return !isExtensionAvailable(editor, 'image')
    }
  }
}

/**
 * A handler for one of the three list types.
 */
export function createListHandler(listType: 'bulletList' | 'orderedList' | 'taskList') {
  const fnNameMap = {
    bulletList: 'toggleBulletList',
    orderedList: 'toggleOrderedList',
    taskList: 'toggleTaskList'
  } as const
  const fnName = fnNameMap[listType]
  const listItemType = listType === 'taskList' ? 'taskItem' : 'listItem'
  const allListTypes = ['bulletList', 'orderedList', 'taskList'] as const

  return {
    canExecute: (editor: Editor) => {
      return (editor.can() as any)[fnName]()
        || editor.isActive('listItem')
        || allListTypes.some(type => isExtensionAvailable(editor, type) && editor.isActive(type))
    },
    execute: (editor: Editor) => {
      const { state } = editor
      const { selection } = state
      let chain = editor.chain().focus()

      // Handle NodeSelection (e.g., from drag handle)
      if ((selection as any).node) {
        const node = (selection as any).node
        const firstChild = node.firstChild?.firstChild
        const lastChild = node.lastChild?.lastChild

        const from = firstChild
          ? selection.from + firstChild.nodeSize
          : selection.from + 1
        const to = lastChild
          ? selection.to - lastChild.nodeSize
          : selection.to - 1

        chain = chain.setTextSelection({ from, to }).clearNodes()
      }

      if (editor.isActive(listType)) {
        let result = chain.liftListItem(listItemType)
        for (const type of allListTypes) {
          if (isExtensionAvailable(editor, type)) {
            result = result.lift(type)
          }
        }
        return result.selectTextblockEnd()
      }

      // Check if a different list type is active and convert
      if (allListTypes.some(type => isExtensionAvailable(editor, type) && editor.isActive(type))) {
        const currentListItemType = editor.isActive('taskList') ? 'taskItem' : 'listItem'
        let unwrapped = chain.liftListItem(currentListItemType)
        for (const type of allListTypes) {
          if (isExtensionAvailable(editor, type)) {
            unwrapped = unwrapped.lift(type)
          }
        }
        return (unwrapped as any)[fnName]().selectTextblockEnd()
      }

      // Wrap in list and normalize selection
      return (chain as any)[fnName]().selectTextblockEnd()
    },
    isActive: (editor: Editor) => editor.isActive(listType),
    isDisabled: (editor: Editor) => {
      // Check if the target list extension is available
      if (!isExtensionAvailable(editor, listType)) {
        return true
      }
      return isNodeTypeSelected(editor, ['image']) || editor.isActive('code')
    }
  }
}

/**
 * A handler that moves the block at `cmd.pos` up or down — what the drag
 * handle's menu binds to. Disabled when there is no node at that position, or
 * no sibling to swap with.
 */
export function createMoveHandler(direction: 'up' | 'down') {
  return {
    canExecute: (editor: Editor, cmd: any) => {
      if (cmd?.pos == null) return false
      const node = editor.state.doc.nodeAt(cmd.pos)
      if (!node) return false
      const $pos = editor.state.doc.resolve(cmd.pos)
      const parent = $pos.parent
      const index = $pos.index()
      return direction === 'up' ? index > 0 : index < parent.childCount - 1
    },
    execute: (editor: Editor, cmd: any) => {
      if (cmd?.pos == null) return editor.chain()
      const node = editor.state.doc.nodeAt(cmd.pos)
      if (!node) return editor.chain()

      const $pos = editor.state.doc.resolve(cmd.pos)
      const parent = $pos.parent
      const index = $pos.index()

      if (direction === 'up' && index > 0) {
        const prevNode = parent.child(index - 1)
        const targetPos = cmd.pos - prevNode.nodeSize
        return editor.chain().focus()
          .deleteRange({ from: cmd.pos, to: cmd.pos + node.nodeSize })
          .insertContentAt(targetPos, node.toJSON())
      }

      if (direction === 'down' && index < parent.childCount - 1) {
        const nextNode = parent.child(index + 1)
        const targetPos = cmd.pos + nextNode.nodeSize
        return editor.chain().focus()
          .deleteRange({ from: cmd.pos, to: cmd.pos + node.nodeSize })
          .insertContentAt(targetPos, node.toJSON())
      }

      return editor.chain()
    },
    isActive: () => false,
    isDisabled: undefined
  }
}

/**
 * The full set of built-in handlers, keyed by the `type` an editor item
 * declares. `mapEditorItems` merges a caller's own over these, so a custom
 * handler can replace a built-in under the same key.
 */
export function createHandlers(): EditorHandlers {
  return {
    mark: createMarkHandler(),
    textAlign: createTextAlignHandler(),
    heading: createHeadingHandler(),
    link: createLinkHandler(),
    image: createImageHandler(),
    blockquote: createToggleHandler('blockquote'),
    bulletList: createListHandler('bulletList'),
    orderedList: createListHandler('orderedList'),
    taskList: createListHandler('taskList'),
    codeBlock: createToggleHandler('codeBlock'),
    horizontalRule: createSetHandler('horizontalRule'),
    paragraph: createSetHandler('paragraph'),
    undo: createSimpleHandler('undo'),
    redo: createSimpleHandler('redo'),
    clearFormatting: {
      canExecute: (editor: Editor, cmd: any) => {
        if (cmd?.pos != null) {
          const node = editor.state.doc.nodeAt(cmd.pos)
          return !!node
        }
        return editor.can().clearNodes() || editor.can().unsetAllMarks()
      },
      execute: (editor: Editor, cmd: any) => {
        // If position is provided (from drag handle), select the node content first
        if (cmd?.pos != null) {
          const node = editor.state.doc.nodeAt(cmd.pos)
          if (!node) return editor.chain()

          const from = cmd.pos + 1
          const to = cmd.pos + node.nodeSize - 1

          return editor.chain()
            .focus()
            .setTextSelection({ from, to })
            .clearNodes()
            .unsetAllMarks()
        }

        // Otherwise, clear formatting on current selection
        return editor.chain().focus().clearNodes().unsetAllMarks()
      },
      isActive: () => false,
      isDisabled: undefined
    },
    duplicate: {
      canExecute: (editor: Editor, cmd: any) => {
        if (cmd?.pos == null) return false
        const node = editor.state.doc.nodeAt(cmd.pos)
        return !!node
      },
      execute: (editor: Editor, cmd: any) => {
        if (cmd?.pos == null) return editor.chain()
        const node = editor.state.doc.nodeAt(cmd.pos)
        if (!node) return editor.chain()
        return editor.chain().focus().insertContentAt(cmd.pos + node.nodeSize, node.toJSON())
      },
      isActive: () => false,
      isDisabled: undefined
    },
    delete: {
      canExecute: (editor: Editor, cmd: any) => {
        if (cmd?.pos == null) return false
        const node = editor.state.doc.nodeAt(cmd.pos)
        return !!node
      },
      execute: (editor: Editor, cmd: any) => {
        if (cmd?.pos == null) return editor.chain()
        const node = editor.state.doc.nodeAt(cmd.pos)
        if (!node) return editor.chain()
        return editor.chain().focus().deleteRange({ from: cmd.pos, to: cmd.pos + node.nodeSize })
      },
      isActive: () => false,
      isDisabled: undefined
    },
    moveUp: createMoveHandler('up'),
    moveDown: createMoveHandler('down'),
    suggestion: {
      canExecute: () => true,
      execute: (editor: Editor, cmd?: any) => {
        const { state } = editor
        const { selection } = state
        const { $from } = selection

        if (cmd?.pos !== undefined) {
          // When triggered from drag handle, insert after the current node
          const node = state.doc.nodeAt(cmd.pos)
          if (node) {
            const insertPos = cmd.pos + node.nodeSize
            return editor.chain().focus().insertContentAt(insertPos, { type: 'paragraph', content: [{ type: 'text', text: '/' }] })
          }
        }

        // When triggered from toolbar/elsewhere, insert new paragraph after current block
        const currentNode = $from.node($from.depth)
        const currentNodePos = $from.before($from.depth)
        const insertPos = currentNodePos + currentNode.nodeSize

        return editor.chain().focus().insertContentAt(insertPos, { type: 'paragraph', content: [{ type: 'text', text: '/' }] })
      },
      isActive: () => false,
      isDisabled: undefined
    },
    mention: {
      canExecute: () => true,
      execute: (editor: Editor) => {
        const { state } = editor
        const { selection } = state
        const { $from } = selection

        // Check if there's text before the cursor
        const textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - 1), $from.parentOffset, undefined, ' ')
        const needsSpace = textBefore && textBefore !== ' '

        return editor.chain().focus().insertContent(needsSpace ? ' @' : '@')
      },
      isActive: () => false,
      isDisabled: undefined
    },
    emoji: {
      canExecute: () => true,
      execute: (editor: Editor) => {
        const { state } = editor
        const { selection } = state
        const { $from } = selection

        // Check if there's text before the cursor
        const textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - 1), $from.parentOffset, undefined, ' ')
        const needsSpace = textBefore && textBefore !== ' '

        return editor.chain().focus().insertContent(needsSpace ? ' :' : ':')
      },
      isActive: () => false,
      isDisabled: undefined
    }
  }
}

/**
 * Binds a toolbar or menu definition to a live editor: each item's `type` is
 * looked up in the handlers, and the resulting `disabled` / `active` /
 * `onSelect` are attached.
 *
 * Grouped input (an array of arrays) comes back grouped, so a toolbar's
 * separators survive.
 *
 * @param editor The editor the items act on.
 * @param items Item definitions, flat or grouped.
 * @param customHandlers Handlers merged over the built-ins, by key.
 */
export function mapEditorItems(
  editor: Editor,
  items: (Partial<EditorItem> & Record<string, any>)[] | (Partial<EditorItem> & Record<string, any>)[][],
  customHandlers?: EditorCustomHandlers
): any[] | any[][] {
  const handlers = { ...createHandlers(), ...customHandlers }

  // Handle nested arrays [[...], [...]]
  if (isArrayOfArray(items)) {
    return items.map(group =>
      mapEditorItems(editor, group, customHandlers)
    ) as any[][]
  }

  return items.filter(Boolean).map((item) => {
    // Pass through items with type (label, separator, etc)
    if ('type' in item) {
      return item
    }

    const { kind, children, ...rest } = item

    // Recursively process children if present
    const processedChildren = children?.length
      ? mapEditorItems(editor, children as any, customHandlers) as any[]
      : undefined

    // Handle action items with handlers
    if (kind) {
      const handler = handlers[kind]
      if (!handler) {
        return {
          ...rest,
          children: processedChildren
        }
      }

      return {
        ...rest,
        children: processedChildren,
        disabled: handler.isDisabled?.(editor, item) || !handler.canExecute(editor, item),
        active: handler.isActive(editor, item),
        onSelect: () => handler.execute(editor, item).run()
      }
    }

    // Pass through items without kind but with children
    return { ...rest, children: processedChildren }
  })
}

/**
 * Assembles the floating-ui middleware chain for the editor's popups from a
 * plain options object.
 *
 * The order is fixed here rather than taken from the caller — offset, flip,
 * shift, size, autoPlacement, hide, inline — because floating-ui applies
 * middleware in sequence and the result depends on it.
 */
export function buildFloatingUIMiddleware(options: FloatingUIOptions): Middleware[] {
  const middleware: Middleware[] = []

  if (options.offset) {
    middleware.push(offset(typeof options.offset !== 'boolean' ? options.offset : undefined))
  }

  if (options.flip) {
    middleware.push(flip(typeof options.flip !== 'boolean' ? options.flip : undefined))
  }

  if (options.shift) {
    middleware.push(shift(typeof options.shift !== 'boolean' ? options.shift : undefined))
  }

  if (options.size) {
    middleware.push(size(typeof options.size !== 'boolean' ? options.size : undefined))
  }

  if (options.autoPlacement) {
    middleware.push(autoPlacement(typeof options.autoPlacement !== 'boolean' ? options.autoPlacement : undefined))
  }

  if (options.hide) {
    middleware.push(hide(typeof options.hide !== 'boolean' ? options.hide : undefined))
  }

  if (options.inline) {
    middleware.push(inline(typeof options.inline !== 'boolean' ? options.inline : undefined))
  }

  return middleware
}
