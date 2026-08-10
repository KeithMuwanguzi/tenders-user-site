import assert from 'node:assert/strict'
import test from 'node:test'

import {
  inferTenderSourceParam,
  isTenderSourceParam,
  normaliseExternalUrl,
  sourceLabelFromParam,
  sourceParamFromLabel,
  submissionSystemName,
} from '../lib/tender-sources.ts'

test('accepts only canonical tender source parameters', () => {
  assert.equal(isTenderSourceParam('cf'), true)
  assert.equal(isTenderSourceParam('ft'), true)
  assert.equal(isTenderSourceParam('foo'), false)
  assert.equal(isTenderSourceParam(''), false)
  assert.equal(isTenderSourceParam(undefined), false)
})

test('infers canonical detail sources without relying on a query parameter', () => {
  assert.equal(inferTenderSourceParam('ocds-h6vhtk-06dca8'), 'ft')
  assert.equal(inferTenderSourceParam('074292-2026'), 'ft')
  assert.equal(inferTenderSourceParam('cf-record', null, 'Find a Tender'), 'ft')
  assert.equal(inferTenderSourceParam('ocds-h6vhtk-06dca8', 'cf', 'Find a Tender'), 'cf')
  assert.equal(inferTenderSourceParam('cf-record'), 'cf')
})

test('maps official source labels to their stable URL values', () => {
  assert.equal(sourceParamFromLabel('Contracts Finder'), 'cf')
  assert.equal(sourceParamFromLabel('Find a Tender'), 'ft')
  assert.equal(sourceLabelFromParam('cf'), 'Contracts Finder')
  assert.equal(sourceLabelFromParam('ft'), 'Find a Tender')
})

test('names submission systems separately from official notice services', () => {
  assert.equal(submissionSystemName('https://procontract.due-north.com/'), 'ProContract')
  assert.equal(submissionSystemName('https://example.gov.uk/tender'), 'the buyer’s electronic tendering system')
})

test('normalises supplier portal links from inconsistent notice data', () => {
  assert.equal(normaliseExternalUrl('www.cornwall.gov.uk'), 'https://www.cornwall.gov.uk/')
  assert.equal(
    normaliseExternalUrl('Please refer to tender opportunity @ www.supplingthesouthwest.org.uk'),
    'https://www.supplingthesouthwest.org.uk/',
  )
  assert.equal(normaliseExternalUrl('https://procontract.due-north.com/path'), 'https://procontract.due-north.com/path')
  assert.equal(normaliseExternalUrl('not a web address'), null)
  assert.equal(normaliseExternalUrl('javascript:alert(1)'), null)
})
