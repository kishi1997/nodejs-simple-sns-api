type FilterParams = {
  userId?: number
}
type PaginationParams = {
  cursor?: number
  isNext?: boolean
  size?: number
  order?: 'ASC' | 'DESC'
}
export type GetPostsParams = {
  pagination?: PaginationParams
  filter?: FilterParams
}
