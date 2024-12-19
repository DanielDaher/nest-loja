import * as crypto from 'crypto';
import * as multerS3 from 'multer-s3';

import { Request } from 'express';
import { diskStorage } from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import { HttpException } from '@nestjs/common';

const ALLOWED_MIMES = ['image/jpeg', 'image/png'];
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: diskStorage({
    destination: process.env.STORAGE_LOCAL,
    filename: (req: Request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      file.location = `http://localhost:${process.env.PORT}/tmp/uploads/${filename}`;
      callback(null, filename);
    },
  }),

  s3: multerS3({
    s3: new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    }),
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME as string,
    contentType: (req, file, callback) => {
      callback(null, file.mimetype);
    },
    key: (req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};

export const multerOptions = {
  dest: process.env.STORAGE_LOCAL as string,
  storage:
    process.env.STORAGE_TYPE === 'local' ? storageTypes.local : storageTypes.s3,
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req: Request, file: any, callback: any) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new HttpException('Tipo de arquivo não suportado', 415), false);
    }
  },
};
