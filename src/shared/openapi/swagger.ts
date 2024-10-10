import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ClientError, ServerError } from 'src/shared/errors/error.dto';
import { IPagination } from 'src/shared/value-objects/pagination/pagination';

type swaggerProps = {
  tags: string[];
  summary: string;
  description?: string;
  okResponse?: any;
  okPaginatedResponse?: any;
  createdResponse?: any;
  applyBadRequest?: boolean;
  applyUnauthorized?: boolean;
  applyForbidden?: boolean;
  applyNotFound?: boolean;
  applyConflict?: boolean;
  applyBearerAuth?: boolean;
  applyUnsupportedMediaType?: boolean;
};

export function Swagger(props: swaggerProps) {
  return applyDecorators(
    ApiTags(...props.tags),
    ApiOperation({ summary: props.summary, description: props.description }),

    applyOkResponse(props.okResponse),
    applyBearerAuth(props.applyBearerAuth),
    applyOkPaginatedResponse(props.okPaginatedResponse),
    applyPaginationModels(props.okPaginatedResponse),
    applyCreatedResponse(props.createdResponse),
    applyBadRequestResponse(props.applyBadRequest),
    applyUnauthorizedResponse(props.applyUnauthorized),
    applyForbiddenResponse(props.applyForbidden),
    applyNotFoundResponse(props.applyNotFound),
    applyConflictResponse(props.applyConflict),
    applyUnsupportedMediaTypeResponse(props.applyUnsupportedMediaType),

    ApiInternalServerErrorResponse({
      type: ServerError,
      description: 'Internal Server Error',
    }),
  );
}

function applyOkResponse(dto?: any) {
  return dto ? ApiOkResponse({ type: dto, description: 'OK' }) : () => {};
}

function applyPaginationModels<T extends Type<unknown>>(dto?: T) {
  return dto ? ApiExtraModels(IPagination, dto) : () => {};
}

function applyBearerAuth(dto?: any) {
  return dto ? ApiBearerAuth('BearerAuth') : () => {};
}

function applyOkPaginatedResponse<T extends Type<unknown>>(dto?: T) {
  return dto
    ? ApiOkResponse({
        description: 'OK',
        schema: {
          allOf: [
            { $ref: getSchemaPath(IPagination) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(dto) },
                },
              },
            },
          ],
        },
      })
    : () => {};
}

function applyCreatedResponse(type?: any) {
  return type ? ApiCreatedResponse({ type, description: 'Created' }) : () => {};
}

function applyBadRequestResponse(apply?: boolean) {
  return apply
    ? ApiBadRequestResponse({ type: ClientError, description: 'Bad Request' })
    : () => {};
}

function applyUnauthorizedResponse(apply?: boolean) {
  return apply
    ? ApiUnauthorizedResponse({
        type: ClientError,
        description: 'Unauthorized',
      })
    : () => {};
}

function applyForbiddenResponse(apply?: boolean) {
  return apply
    ? ApiForbiddenResponse({ type: ClientError, description: 'Forbidden' })
    : () => {};
}

function applyNotFoundResponse(apply?: boolean) {
  return apply
    ? ApiNotFoundResponse({ type: ServerError, description: 'Not Found' })
    : () => {};
}

function applyConflictResponse(apply?: boolean) {
  return apply
    ? ApiConflictResponse({ type: ServerError, description: 'Conflict' })
    : () => {};
}

function applyUnsupportedMediaTypeResponse(apply?: boolean) {
  return apply
    ? ApiUnsupportedMediaTypeResponse({
        type: ServerError,
        description: 'Unsupported Media Type',
      })
    : () => {};
}
