import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
const post = REST_POST(config)
// Provision the first administrator only with the private create-admin command.
export const POST: typeof post = async (request, context) => {
  const { slug = [] } = await context.params
  if (slug[0] === 'users' && slug[1] === 'first-register') {
    return Response.json({ error: 'Administrator provisioning is disabled on the public API.' }, { status: 403 })
  }
  return post(request, context)
}
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)
