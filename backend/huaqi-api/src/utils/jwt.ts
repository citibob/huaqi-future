// JWT utilities for authentication
const SECRET_KEY = 'huaqi-jwt-secret-2026'; // In production, use environment variable
const EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  userType: string;
  iat?: number;
  exp?: number;
}

export function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60 // 7 days
  };
  const payloadEncoded = btoa(JSON.stringify(fullPayload));
  
  // Simple signature (in production, use proper HMAC)
  const signature = btoa(`${header}.${payloadEncoded}.${SECRET_KEY}`);
  
  return `${header}.${payloadEncoded}.${signature}`;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1])) as JWTPayload;
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }
    
    return payload;
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  const salt = 'huaqi-salt-2026';
  let hash = 0;
  const str = password + salt;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'sha256:' + Math.abs(hash).toString(16).padStart(64, '0').substring(0, 64);
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function generateId(): string {
  return crypto.randomUUID();
}
