declare module '@payloadcms/next/admin/DefaultAdminRoute' {
  const DefaultAdminRoute: any
  export default DefaultAdminRoute
}

declare module '@payloadcms/next/payload' {
  export function handle(...args: any[]): any
}
declare module '@payloadcms/next/views' {
  export const RootPage: (props: any) => any
}
declare module '@payloadcms/next/routes' {
  export function handle(...args: any[]): any
}

// src/types/payload-next.d.ts
declare module '@payloadcms/next/views' {
  export const RootPage: (props: any) => any
  export const Root: (props: any) => any
  const _default: any
  export default _default
}
declare module '@payloadcms/next/routes' {
  export const handle: any
  export const createRouteHandler: any
  const _default: any
  export default _default
}
