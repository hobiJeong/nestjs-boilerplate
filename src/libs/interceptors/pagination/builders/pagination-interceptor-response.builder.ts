import { Injectable } from '@nestjs/common';
import { OffsetPaginationQueryDto } from '@src/libs/api/dtos/request/offset-pagination-query.dto';
import { PageSize } from '@src/libs/api/types/api.constant';
import { HttpInternalServerErrorException } from '@src/libs/exceptions/server-errors/exceptions/http-internal-server-error.exception';
import { ERROR_CODE } from '@src/libs/exceptions/types/errors/error-code.constant';
import { OffsetPaginationResponseDto } from '@src/libs/interceptors/pagination/dtos/pagination-interceptor-response.dto';

interface Res {
  data: unknown;
}

@Injectable()
export class PaginationResponseBuilder {
  /**
   * Offset-Based Pagination response builder
   * @description array type 만 허용
   */
  offsetPaginationResponseBuild(res: Res, pageDto: OffsetPaginationQueryDto) {
    const { data } = res;

    if (!Array.isArray(data)) {
      throw new HttpInternalServerErrorException({
        code: ERROR_CODE.SERVER_ERROR,
        ctx: 'pagination response build 중 data 가 array type 이 아님',
      });
    }

    const [array, totalCount] = data;

    if (!Array.isArray(array)) {
      throw new HttpInternalServerErrorException({
        code: ERROR_CODE.SERVER_ERROR,
        ctx: 'pagination response build 중 조회된 객체가 array type 이 아님',
      });
    }

    if (typeof totalCount !== 'number') {
      throw new HttpInternalServerErrorException({
        code: ERROR_CODE.SERVER_ERROR,
        ctx: 'pagination response build 중 totalCount 가 number type 이 아님',
      });
    }

    if (!Number.isInteger(totalCount)) {
      throw new HttpInternalServerErrorException({
        code: ERROR_CODE.SERVER_ERROR,
        ctx: 'pagination response build 중 totalCount 가 integer format 이 아님',
      });
    }

    const currentPage = Number(pageDto.page) || 1;
    const pageSize = Number(pageDto.pageSize) || PageSize.DEFAULT;
    const nextPage =
      pageSize * currentPage < totalCount ? currentPage + 1 : null;
    const hasNext = pageSize * currentPage < totalCount;
    const lastPage = Math.ceil(totalCount / pageSize);

    return new OffsetPaginationResponseDto(
      { contents: array },
      {
        totalCount,
        currentPage,
        pageSize,
        nextPage,
        hasNext,
        lastPage,
      },
    );
  }
}
