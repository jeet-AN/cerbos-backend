import { applyDecorators, SetMetadata } from '@nestjs/common';

export const IS_COMMON_CERBOS_REQUEST = 'isCommonCerbos';
export function CommonCerbosRequest() {
  return applyDecorators(
    SetMetadata(IS_COMMON_CERBOS_REQUEST, true),
  );
}
