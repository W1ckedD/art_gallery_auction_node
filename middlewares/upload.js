import multer from 'multer';
import path from 'path';

const uploadPath = path.join(path.dirname(''), 'upload');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const name = new Date().toISOString().replace(/:/g, '-') + extension;
    cb(null, name);
  }
})

export const upload = multer({ storage });