import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { createServerClient } from './supabase'
import type { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET!

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
  } catch {
    return null
  }
}

export async function getSession(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('lucid_token')?.value
  if (!token) return null

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

export function setAuthCookie(token: string) {
  cookies().set('lucid_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  })
}
