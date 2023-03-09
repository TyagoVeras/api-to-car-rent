import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

class Upload {
  private config(path: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', path),
        filename: (request, file, callback) => {
          const hash = crypto.randomBytes(16).toString('hex');
          const fileName = `${hash}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
    };
  }

  single(path: string, nameInput: string) {
    return multer(this.config(path)).single(nameInput);
  }

  multiple(path: string, nameInput: string) {
    return multer(this.config(path)).array(nameInput);
  }
}

export { Upload };
