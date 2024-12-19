import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { Swagger } from 'src/shared/openapi/swagger';
import {
  UploadSingleInputDto,
  UploadSingleOutputDto,
} from './dto/create-upload-file.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @Swagger({
    tags: ['Upload de arquivos'],
    summary: 'Upload de arquivo único',
    applyBadRequest: true,
    applyUnsupportedMediaType: true,
    createdResponse: UploadSingleOutputDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadSingleInputDto })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: file.location,
    };
  }
}
