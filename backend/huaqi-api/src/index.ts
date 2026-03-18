/**
 * huaqi.jp API - B2B/B2C E-commerce Platform
 * Cloudflare Workers
 */

import { handleRegister, handleLogin, handleMe } from './auth';

interface Env {
  DB: D1Database;
  CONTACT_EMAIL: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // Health check
  if (path === '/api/health' || path === '/health') {
    return Response.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'huaqi-api'
    }, { headers: CORS_HEADERS });
  }

  // Auth routes
  if (path === '/api/auth/register' && method === 'POST') {
    const response = await handleRegister(request, env);
    // Add CORS headers to response
    const newHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => newHeaders.set(k, v));
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const response = await handleLogin(request, env);
    const newHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => newHeaders.set(k, v));
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  if (path === '/api/auth/me' && method === 'GET') {
    const response = await handleMe(request, env);
    const newHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => newHeaders.set(k, v));
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  // API not found
  return Response.json(
    { error: { code: 'NOT_FOUND', message: 'API endpoint not found' } },
    { status: 404, headers: CORS_HEADERS }
  );
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (error) {
      console.error('Unhandled error:', error);
      return Response.json(
        { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
        { status: 500, headers: CORS_HEADERS }
      );
    }
  },
} satisfies ExportedHandler<Env>;
