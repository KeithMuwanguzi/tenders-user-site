import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const register = JSON.parse(readFileSync('content/claims-register.json', 'utf8'))

assert.equal(register.independentlyAudited, false)
assert.equal(register.claims.length, 4)
assert.deepEqual(register.claims.map((claim) => claim.display), ['92%', '200+', '£50M+', '5/5'])

const terms = readFileSync('app/terms/page.tsx', 'utf8')
const proof = readFileSync('app/proof/page.tsx', 'utf8')
assert.match(terms, /reported separately from the figure of more than 200 submissions supported/)
assert.match(proof, /92% recorded win rate, 200\+ supported submissions/)
assert.doesNotMatch(terms, /92%[^.]{0,120}across 200\+/i)

console.log('Public performance claims verified against the claims register.')
