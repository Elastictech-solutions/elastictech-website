import test from 'node:test'
import assert from 'node:assert/strict'
import { boundedJson, BodyTooLarge, createLimiter } from '../src/lib/request-security'
import { jsonLd, safeExternalUrl } from '../src/lib/seo'
import { Inquiries } from '../src/collections/Inquiries'
import { publishedOrAuthenticated } from '../src/lib/access'

const request = (body: string) => new Request('https://example.test/api/public-inquiry', { method: 'POST', body })
test('body limit applies to streamed data without Content-Length', async () => {
  await assert.rejects(boundedJson(request(JSON.stringify({ message: 'x'.repeat(20000) }))), BodyTooLarge)
  assert.deepEqual(await boundedJson(request('{"name":"Elastic"}')), { name: 'Elastic' })
  await assert.rejects(boundedJson(request('[]')), SyntaxError)
})
test('throttling blocks a burst, bounds unique clients, and expires windows', () => {
  const allow = createLimiter(2, 100, 2)
  assert.equal(allow('a', 0), true)
  assert.equal(allow('a', 1), true)
  assert.equal(allow('a', 2), false)
  assert.equal(allow('b', 3), true)
  assert.equal(allow('c', 4), false)
  assert.equal(allow('c', 104), true)
})
test('structured data cannot terminate its script and product links reject executable URLs', () => {
  assert.equal(jsonLd({ name: '</script><script>alert(1)</script>' }).includes('<'), false)
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'https://user:password@example.test']) assert.equal(safeExternalUrl(url), undefined)
  assert.equal(safeExternalUrl('https://example.test/product'), 'https://example.test/product')
})
test('direct CMS inquiry creation is denied; anonymous reads constrain publication status', () => {
  assert.equal((Inquiries.access!.create as Function)({ req: {} }), false)
  assert.deepEqual(publishedOrAuthenticated({ req: { user: null } } as any), { _status: { equals: 'published' } })
  assert.equal((Inquiries.access!.read as Function)({ req: { user: null } }), false)
  assert.equal((Inquiries.access!.read as Function)({ req: { user: { role: 'editor' } } }), true)
})
