import { Post } from 'src/entity/Post'

export const formatPostResponse = (post: Post) => {
  return {
    id: post?.id,
    body: post?.body,
    userId: post?.userId,
    createdAt: post?.createdDate,
    user: {
      id: post.user?.id,
      name: post.user?.name,
      iconImageUrl: post.user?.iconImageUrl,
    },
  }
}
