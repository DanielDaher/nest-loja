import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';

export class CreateUploadFileDto {}

export class UploadSingleOutputDto {
  url: string;
}

export class UploadSingleInputDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: File;
}
