// src/app/api/payload/[[...route]]/route.ts
import config from '@payload-config'
import * as Routes from '@payloadcms/next/routes'

function resolveHandlers() {
  const mod: any = Routes
  const keys = Object.keys(mod)
  console.log('[api/payload] module keys:', keys)

  // Case A: factory function export
  const factory =
    (typeof mod === 'function' && mod) ||
    (typeof mod.default === 'function' && mod.default) ||
    (typeof mod.handle === 'function' && mod.handle) ||
    (typeof mod.createRouteHandler === 'function' && mod.createRouteHandler) ||
    null

  if (factory) {
    console.log('[api/payload] using factory:', factory.name || '(anonymous)')
    const handlers = factory({ config })
    console.log('[api/payload] factory returned keys:', Object.keys(handlers || {}))
    return handlers
  }

  // Case B: already an object of handlers
  const asHandlers = mod.default ?? mod
  console.log('[api/payload] using object handlers keys:', Object.keys(asHandlers || {}))
  return asHandlers
}

const handlers: any = resolveHandlers()

function wrap(name: string) {
  const fn = handlers?.[name]
  return async (...args: any[]) => {
    const req = args[0]
    console.log(`[api/payload] ${name}`, req?.method, req?.url)
    if (typeof fn !== 'function') {
      console.error(`[api/payload] missing handler for ${name}`)
      return new Response('Not Found', { status: 404 })
    }
    return fn(...args)
  }
}

export const GET = wrap('GET')
export const POST = wrap('POST')
export const PUT = wrap('PUT')
export const PATCH = wrap('PATCH')
export const DELETE = wrap('DELETE')
export const dynamic = handlers?.dynamic ?? 'force-dynamic'
