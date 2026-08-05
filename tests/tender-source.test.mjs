import assert from 'node:assert/strict'
import test from 'node:test'

import {
  isTenderSourceParam,
  sourceLabelFromParam,
  sourceParamFromLabel,
} from '../lib/tender-sources.ts'

test('accepts only canonical tender source parameters', () => {
  assert.equal(isTenderSourceParam('cf'), true)
  assert.equal(isTenderSourceParam('ft'), true)
  assert.equal(isTenderSourceParam('foo'), false)
  assert.equal(isTenderSourceParam(''), false)
  assert.equal(isTenderSourceParam(undefined), false)
})

test('maps official source labels to their stable URL values', () => {
  assert.equal(sourceParamFromLabel('Contracts Finder'), 'cf')
  assert.equal(sourceParamFromLabel('Find a Tender'), 'ft')
  assert.equal(sourceLabelFromParam('cf'), 'Contracts Finder')
  assert.equal(sourceLabelFromParam('ft'), 'Find a Tender')
})
