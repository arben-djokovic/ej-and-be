import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

// Server actions are reachable directly by POST, so each one must check the session itself
export async function requireAdmin() {
  const token = (await cookies()).get('admin_token')?.value
  const payload = token ? await verifyToken(token) : null
  if (payload?.role !== 'admin') throw new Error('Unauthorized')
}