import { generateId } from '../utils/jwt';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  user_type: string;
  company_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  email_verified: number;
  created_at: string;
  updated_at: string;
}

export async function createUser(
  db: D1Database,
  email: string,
  passwordHash: string,
  name: string,
  userType: string = 'customer',
  companyName?: string
): Promise<User> {
  const now = new Date().toISOString();
  
  const result = await db.prepare(`
    INSERT INTO users (email, password_hash, name, user_type, company_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(email, passwordHash, name, userType, companyName || null, now, now).run();
  
  // Get the inserted user
  const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<User>();
  
  if (!user) {
    throw new Error('Failed to create user');
  }
  
  return user;
}

export async function getUserByEmail(db: D1Database, email: string): Promise<User | null> {
  const result = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first<User>();
  return result || null;
}

export async function getUserById(db: D1Database, id: number): Promise<User | null> {
  const result = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>();
  return result || null;
}

export function sanitizeUser(user: User): Omit<User, 'password_hash'> {
  const { password_hash, ...sanitized } = user;
  return sanitized;
}
