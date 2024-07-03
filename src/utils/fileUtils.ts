import path from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import Multer from 'multer'
import { Request, Response } from 'express'

function createMulterStorage(folderName: string) {
  // アップロード先にルートディレクトリ/uploads/folderNameを指定
  const uploadPath = path.resolve(process.cwd(), 'uploads', folderName)
  // フォルダが存在しない場合は作成
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true })
  }
  return multer.diskStorage({
    destination(req, file, callback) {
      callback(null, uploadPath)
    },
    filename(req, file, callback) {
      const uniqueSuffix = Math.random().toString(26).substring(4, 10)
      callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`)
    },
  })
}

export async function uploadFileToLocal(
  req: Request,
  res: Response,
  folderName: string
): Promise<string> {
  const multer = Multer({
    storage: createMulterStorage(folderName),
    limits: {
      // 10mb以下に指定
      fileSize: 10 * 1024 * 1024,
    },
  })
  return new Promise((resolve, reject) => {
    multer.single('file')(req, res, (err: any) => {
      if (err) {
        reject(err)
      } else if (req.file == null) {
        reject(new Error('File upload failed'))
      } else {
        const fileUrl = `${req.protocol}://${req.get(
          'host'
        )}/uploads/${folderName}/${req.file.filename}`
        resolve(fileUrl)
      }
    })
  })
}
