// Prefer separate credentials: passwords do not need URL encoding in this form.
export function databasePool(env: NodeJS.ProcessEnv = process.env) {
  if (env.PGHOST?.trim()) {
    const port = Number(env.PGPORT || '5432')
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PGPORT must be a number between 1 and 65535.')
    if (!env.PGPASSWORD && env.NODE_ENV === 'production') throw new Error('Set PGPASSWORD for the production database.')
    return {
      host: env.PGHOST.trim(), port,
      user: env.PGUSER || 'elastictech',
      database: env.PGDATABASE || 'elastictech',
      password: env.PGPASSWORD,
    }
  }
  if (env.DATABASE_URL) {
    try {
      const url = new URL(env.DATABASE_URL)
      if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || url.hash || /[\r\n]/.test(env.DATABASE_URL)) throw new Error()
      return { connectionString: env.DATABASE_URL }
    } catch {
      // Never include a connection string or password in an error message.
      throw new Error('DATABASE_URL is invalid. Use PGHOST, PGPORT, PGUSER, PGDATABASE and PGPASSWORD, or a postgres:// URL with URL-encoded credentials.')
    }
  }
  if (env.NODE_ENV === 'production') throw new Error('Set database credentials using PGHOST and PGPASSWORD, or DATABASE_URL.')
  return { connectionString: 'postgres://elastictech:elastictech@localhost:5432/elastictech' }
}
