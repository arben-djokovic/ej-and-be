'use server'

import { s3Client } from '@/app/lib/s3'
import { requireAdmin } from '@/app/lib/auth'
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export async function getPresignedUploadUrl(fileType) {
  await requireAdmin()

  const extension = ALLOWED_IMAGE_TYPES[fileType]
  if (!extension) throw new Error('Nepodržan tip fajla')

  const key = `properties/${randomUUID()}-${Date.now()}.${extension}`

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 })
  const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

  return { uploadUrl, publicUrl, key }
}

export async function deleteS3Image(key) {
  try {
    await requireAdmin()

    // Only allow deleting objects this app uploaded, never arbitrary bucket keys
    if (typeof key !== 'string' || !key.startsWith('properties/') || key.includes('..')) {
      return { success: false, error: 'Nevažeći ključ slike' }
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    )
    return { success: true }
  } catch (err) {
    console.error('S3 delete error:', err)
    return { success: false, error: err.message }
  }
}
