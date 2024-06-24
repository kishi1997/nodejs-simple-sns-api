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
