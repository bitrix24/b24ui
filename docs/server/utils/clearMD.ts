/**
 * @see docs/server/utils/transformMDC.ts
 * @see docs/server/plugins/llms.ts
 * @see docs/server/routes/raw/[...slug].md.get.ts
 */

function fixBr(content: string): string {
  return content
    .replaceAll('%br%', '\n')
    .replaceAll('%br>%', '\n> ')
}

function cleanSpacesPreserveCode(text: string): string {
  const codeBlocks: string[] = []
  let blockIndex = 0

  const textWithoutCode = text.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match)
    return `__CODE_BLOCK_${blockIndex++}__`
  })

  const cleanedText = textWithoutCode.replace(/ {2,}/g, ' ')

  return cleanedText.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => {
    return codeBlocks[Number.parseInt(index)] || ''
  })
}

function clearTags(content: string): string {
  return content
    .replace(/<card-group[^>]*>/g, '').replace(/<\/card-group>/g, '')
    .replace(/<accordion[^>]*>/g, '').replace(/<\/accordion>/g, '')
    .replace(/<steps[^>]*>/g, '').replace(/<\/steps>/g, '')
    .replace(/<code-group[^>]*>/g, '').replace(/<\/code-group>/g, '')
    .replace(/<collapsible[^>]*>/g, '').replace(/<\/collapsible>/g, '')
    .replace(/<field-group[^>]*>/g, '').replace(/<\/field-group>/g, '')

    .replace(/:{2,}card-group[^}]*\}/g, '')
    .replace(/:{2,}accordion/g, '')
    .replace(/:{2,}steps[^}]*\}/g, '')
    .replace(/:{2,}code-group[^}]*\}/g, '')
    .replace(/:{2,}collapsible/g, '')
    .replace(/:{2,}field-group/g, '')

    .replace(/:{2,}\n/g, '')
}

function clearNewLine(content: string): string {
  return content
    .replace(/> \n/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\| -{4,} /g, '| --- ')
}

function clearLangTsType(content: string): string {
  return content.replace(/\{[^}]*?lang="ts-type"[^}]*\}/g, '').trim()
}

function convertHtmlTablesToMarkdown(input: string): string {
  return input.replace(/<table>[\s\S]*?<\/table>/g, (tableHtml: string) => {
    const cleanHtml = tableHtml
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()

    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g
    const rows: string[] = []
    let rowMatch: RegExpExecArray | null

    while ((rowMatch = rowRegex.exec(cleanHtml ?? '')) !== null) {
      rows.push(rowMatch[1] ?? '')
    }

    if (rows.length === 0) return tableHtml

    const markdownRows: string[] = []

    for (let i = 0; i < rows.length; i++) {
      const cells: string[] = []
      const cellRegex = /<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/g
      let cellMatch: RegExpExecArray | null

      cellRegex.lastIndex = 0
      while ((cellMatch = cellRegex.exec(rows[i] ?? '')) !== null) {
        let cellContent = cellMatch[1] ?? ''

        cellContent = extractTextFromHtml(cellContent || '')
        cells.push(cellContent.trim())
      }

      if (cells.length > 0) {
        markdownRows.push(`| ${cells.join(' | ')} |`)

        if (i === 0) {
          const separator = cells.map(() => '---').join(' | ')
          markdownRows.push(`| ${separator} |`)
        }
      }
    }

    return markdownRows.join('\n')
  })
}

function extractTextFromHtml(html: string): string {
  html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (match, content) => {
    return '`' + content.trim().replace(/\s+/g, '') + '`'
  })

  html = html.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, (match, content) => {
    return '**' + content.trim().replace(/\s+/g, ' ') + '**'
  })

  html = html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  html = html
    .replace(/\*\*\s*`/g, '**`')
    .replace(/`\s*\*\*/g, '`**')
    .replace(/\*\*(\S+)\*\*/g, '**$1**')
    .replace(/`(\S+)`/g, '`$1`')

  return html.trim()
}

export function clearMD(content: string): string {
  let result = content

  result = fixBr(result)
  result = clearLangTsType(result)
  result = convertHtmlTablesToMarkdown(result)
  result = clearTags(result)
  result = clearNewLine(result)
  result = cleanSpacesPreserveCode(result)

  return result
}
