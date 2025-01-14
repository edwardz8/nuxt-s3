import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { v4 as uuid } from 'uuid'

export default defineEventHandler(async event => {
  const body = await readMultipartFormData(event)
  const allowedFormats = ['png', 'jpeg', 'webp', 'avif']

  const s3Client = new S3({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })

  const file = body?.find(item => item.name === 'file')

  const ext = file?.filename?.split('.').pop()

  if (ext && !allowedFormats.includes(ext)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid file format.Only png,jpeg,webp and avif allowed',
    })
  }

  const newFileName = uuid() + '.' + ext
  const bucket = 'nuxt3-s3bucket'

  const res = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: file.data,
    })
  )

  if (res) {
    return newFileName
  } else {
    throw createError({
      statusCode: 400,
      message: 'Error uploading file',
    })
  }
})