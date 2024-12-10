import { ApiPropertyOptional } from '@nestjs/swagger';
import { transformPage } from '@src/libs/api/transformers/page.transformer';
import { PAGE_SIZE } from '@src/libs/api/types/api.constant';

import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * pagination 을 구현하는 request query dto 에 상속받아 사용합니다.
 */
export class OffsetPaginationQueryDto {
  @ApiPropertyOptional({
    description: '페이지번호',
    type: 'number',
    format: 'integer',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Min(0)
  @IsInt()
  @Transform(transformPage)
  page = 0;

  @ApiPropertyOptional({
    description: '페이지당 아이템 수',
    type: 'number',
    format: 'integer',
    minimum: 1,
    maximum: PAGE_SIZE.MAXIMUM,
    default: PAGE_SIZE.DEFAULT,
  })
  @IsOptional()
  @Max(PAGE_SIZE.MAXIMUM)
  @Min(1)
  @IsInt()
  @Type(() => Number)
  pageSize = PAGE_SIZE.DEFAULT;
}
