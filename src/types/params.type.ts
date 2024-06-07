type FilterParams = {
  userId?: number
}
type PaginationParams = {
  cursor?: number
  isNext?: boolean
  size?: number
  order?: 'ASC' | 'DESC'
}
export type FindParams = {
  pagination?: PaginationParams
  filter?: FilterParams
}
export type FindMessagesParams = {
  pagination?: PaginationParams
  roomId?: string
}
