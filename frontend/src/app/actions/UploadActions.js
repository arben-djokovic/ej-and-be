'use server'

import { s3Client } from '@/app/lib/s3'
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

export async function getPresignedUploadUrl(fileType) {
  const extension = fileType.split('/')[1] || 'jpg'
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