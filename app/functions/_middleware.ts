import type { PagesFunction } from '@cloudflare/workers-types';

export const onRequest: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set('Content-Security-Policy', 
    "script-src 'self' https://telegram.org https://*.telegram.org; " +
    "frame-src https://oauth.telegram.org; " +
    "connect-src 'self' https://api.telegram.org;"
  );
  return response;
};