import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

const root = process.cwd()
const publicRoot = resolve(root, 'public')

function filesUnder(directory) {
  if (!existsSync(directory)) return []
  return readdirSync(directory).flatMap((name) => {
    const filePath = join(directory, name)
    return statSync(filePath).isDirectory() ? filesUnder(filePath) : [filePath]
  })
}

const prohibitedExtensions = new Set([
  '.doc',
  '.docx',
  '.html',
  '.key',
  '.pdf',
  '.ppt',
  '.pptx',
  '.tmp',
  '.xls',
  '.xlsx',
  '.zip',
])

// Add a path here only after publication permission, redaction and a user-facing
// purpose have been documented. The default is deliberately empty.
const approvedDownloadPaths = new Set([])

const failures = filesUnder(publicRoot)
  .map((filePath) => relative(publicRoot, filePath).replace(/\\/g, '/'))
  .filter((path) => {
    const extension = extname(path).toLowerCase()
    return prohibitedExtensions.has(extension) && !approvedDownloadPaths.has(path)
  })

assert.deepEqual(
  failures,
  [],
  `Unapproved source/download files are exposed from public/:\n${failures.join('\n')}`,
)

console.log('Public asset boundary verified.')
