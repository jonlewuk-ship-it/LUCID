import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createServerClient } from './supabase'
import type { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'lucid-dev-secret-change-in-production'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '30d' })
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch (e) {
    return null
  }
}

export async function getSessionFromHeader(req: Request): Promise<User | null> {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return null
  const token = authHeader.replace('Bearer ', '')
  const payload = verifyToken(token)
  if (!payload) return null

  const supabase = createServerClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', payload.userId)
    .single()

  return data as User | null
}

// Keep backward compat
export const getSession = getSessionFromHeader
