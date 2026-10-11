import test from 'node:test'
import assert from 'node:assert/strict'
import { databasePool } from '../src/lib/database'

test('separate credentials preserve reserved password characters', () => {
  const password = 'test@#:/%?[$] password'
  const pool = databasePool({ NODE_ENV: 'production', PGHOST: 'database', PGUSER: 'elastictech', PGDATABASE: 'elastictech', PGPASSWORD: password, DATABASE_URL: 'malformed-and-ignored' })
  assert.equal(pool.password, password)
  assert.equal(pool.host, 'database')
  assert.equal(pool.port, 5432)
  assert.equal('connectionString' in pool, false)
})
test('malformed URLs fail without exposing credentials', () => {
  const secret = 'private-password'
  assert.throws(() => databasePool({ DATABASE_URL: 'postgres://' + secret + '@[bad' }), error => error instanceof Error && error.message.includes('DATABASE_URL is invalid') && !error.message.includes(secret))
  assert.throws(() => databasePool({ DATABASE_URL: 'https://example.test' }), /DATABASE_URL is invalid/)
  assert.throws(() => databasePool({ DATABASE_URL: 'postgres://user:unencoded#password@database/db' }), /DATABASE_URL is invalid/)
})
test('encoded external connection URLs remain supported', () => {
  const connectionString = 'postgres://user:pass%40word%23@database:5432/elastictech'
  assert.deepEqual(databasePool({ DATABASE_URL: connectionString }), { connectionString })
})
test('production requires credentials and validates the port', () => {
  assert.throws(() => databasePool({ NODE_ENV: 'production' }), /Set database credentials/)
  assert.throws(() => databasePool({ NODE_ENV: 'production', PGHOST: 'database' }), /Set PGPASSWORD/)
  assert.throws(() => databasePool({ PGHOST: 'database', PGPORT: 'bad' }), /PGPORT/)
})
