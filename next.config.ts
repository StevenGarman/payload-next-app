import { withPayload } from '@payloadcms/next/withPayload'
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'flowbite.s3.amazonaws.com' }],
  },
  experimental: { reactCompiler: false },
}

export default withPayload(nextConfig);
