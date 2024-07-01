import { PaginationParams } from 'src/types/paginationParams.type'
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export function applyPagination<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  pagination: PaginationParams
): SelectQueryBuilder<T> {
  const { cursor, isNext = true, size = 50, order = 'DESC' } = pagination
  query.orderBy(`${query.alias}.id`, order).limit(size)
  // cursorデータがundefinedではない場合にクエリーにメソッドを追加
  if (cursor !== undefined) {
    const comparison = isNext ? '<' : '>'
    query = query.andWhere(`${query.alias}.id` + comparison + ' :cursor', {
      cursor,
    })
  }
  return query
}

export const parsePaginationParams = (
  queryParams: Record<string, any>
): PaginationParams => {
  if (queryParams.pagination == null) return {}
  const { cursor, isNext, size, order } = queryParams.pagination
  return {
    cursor: cursor ? parseInt(cursor) : undefined,
    size: size ? parseInt(size) : undefined,
    isNext: isNext != null ? isNext === true || isNext === 'true' : undefined,
    order: order ? order : undefined,
  }
}
