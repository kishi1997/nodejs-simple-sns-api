import { Post } from "src/entity/Post"

export const formatPostResponse = (post: Post) => {
    return {
        id: post?.id,
        body: post?.body,
        userId: post?.userId,
        createdAt: post?.createdDate
    }
}