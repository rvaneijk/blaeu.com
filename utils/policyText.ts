import type { Policy } from '~/data/policies/types'

// Plain-text rendering of a policy for the download links in the widgets
export function policyToText(policy: Policy, updatedLabel: string): string {
  const lines: string[] = [policy.title.toUpperCase(), `${updatedLabel}: ${policy.updated}`, '']

  for (const section of policy.sections) {
    if (section.title) {
      lines.push(section.title.toUpperCase(), '')
    }
    for (const block of section.blocks) {
      if (block.type === 'list') {
        for (const item of block.items ?? []) lines.push(`- ${item}`)
        lines.push('')
      } else if (block.type === 'olist') {
        ;(block.items ?? []).forEach((item, i) => lines.push(`${i + 1}. ${item}`))
        lines.push('')
      } else {
        lines.push(block.text ?? '', '')
      }
    }
  }

  return (
    lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd() + '\n'
  )
}

export function downloadTextFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}
