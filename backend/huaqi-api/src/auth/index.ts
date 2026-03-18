import { createToken, verifyToken, hashPassword, verifyPassword, generateId } from '../utils/jwt';
import { createUser, getUserByEmail, getUserById, sanitizeUser } from '../db/users';

interface Env {
  DB: D1Database;
  CONTACT_EMAIL: string;
}

export async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const { email, password, name, user_type, company_name } = body;
    
    // Validation
    if (!email || !password || !name) {
      return Response.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Email, password, and name are required' } },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await getUserByEmail(env.DB, email);
    if (existingUser) {
      return Response.json(
        { error: { code: 'USER_EXISTS', message: 'User with this email already exists' } },
        { status: 409 }
      );
    }
    
    // Create user
    const passwordHash = hashPassword(password);
    const user = await createUser(
      env.DB,
      email,
      passwordHash,
      name,
      user_type || 'customer',
      company_name
    );
    
    // Generate token
    const token = createToken({
      userId: String(user.id),
      email: user.email,
      userType: user.user_type
    });
    
    return Response.json({
      data: {
        user: sanitizeUser(user),
        token
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Register error:', error);
    return Response.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Registration failed' } },
      { status: 500 }
    );
  }
}

export async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validation
    if (!email || !password) {
      return Response.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } },
        { status: 400 }
      );
    }
    
    // Find user
    const user = await getUserByEmail(env.DB, email);
    if (!user) {
      return Response.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }
    
    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      return Response.json(
        { error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = createToken({
      userId: String(user.id),
      email: user.email,
      userType: user.user_type
    });
    
    return Response.json({
      data: {
        user: sanitizeUser(user),
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Login failed' } },
      { status: 500 }
    );
  }
}

export async function handleMe(request: Request, env: Env): Promise<Response> {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authorization header required' } },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    
    if (!payload) {
      return Response.json(
        { error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' } },
        { status: 401 }
      );
    }
    
    const user = await getUserById(env.DB, parseInt(payload.userId));
    if (!user) {
      return Response.json(
        { error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      );
    }
    
    return Response.json({
      data: {
        user: sanitizeUser(user)
      }
    });
    
  } catch (error) {
    console.error('Me error:', error);
    return Response.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Failed to get user info' } },
      { status: 500 }
    );
  }
}
