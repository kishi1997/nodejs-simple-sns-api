import multer from 'multer'
import path from 'node:path'

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve(__dirname, '../uploads'))
  },
  filename(req, file, callback) {
    const uniqueSuffix = Math.random().toString(26).substring(4, 10)
    callback(null, `${Date.now()}-${uniqueSuffix}-${file.originalname}`)
  },
})
export const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (
      ['video/mp4', 'image/png', 'image/jpeg', 'audio/mpeg'].includes(
        file.mimetype
      )
    ) {
      callback(null, true)
      return
    }
    callback(new TypeError('Invalid File Type'))
  },
})
