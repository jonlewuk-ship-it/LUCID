export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'

export async function GET() {
  const checks: any = {}
  
  // 1. Check env vars
  checks.supabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  checks.supabaseKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  checks.jwtSecret = !!process.env.JWT_SECRET
  checks.anonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 2. Try Supabase connection
  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )
    const { data, error } = await supabase.from('users').select('id').limit(1)
    checks.supabaseConnect = error ? 'ERROR: ' + error.message : 'OK'
    checks.userCount = data ? data.length : 0
  } catch (e: any) {
    checks.supabaseConnect = 'CRASH: ' + e.message
  }

  // 3. Try bcrypt
  try {
    const bcrypt = (await import('bcryptjs')).default
    const hash = await bcrypt.hash('test', 10)
    checks.bcrypt = hash ? 'OK' : 'FAIL'
  } catch (e: any) {
    checks.bcrypt = 'CRASH: ' + e.message
  }

  // 4. Try jwt
  try {
    const jwt = (await import('jsonwebtoken')).default
    const token = jwt.sign({ test: true }, process.env.JWT_SECRET || 'test')
    checks.jwt = token ? 'OK' : 'FAIL'
  } catch (e: any) {
    checks.jwt = 'CRASH: ' + e.message
  }

  return NextResponse.json(checks)
}
