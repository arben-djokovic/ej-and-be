'use server'

import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { signToken, verifyToken } from '@/app/lib/auth'

export async function login(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (
    email !== process.env.ADMIN_EMAIL ||
    !(await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH))
  ) {
    return { success: false, error: 'Pogrešan email ili lozinka' }
  }

  const token = await signToken({ email, role: 'admin' })

  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/login')
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return await verifyToken(token)
}