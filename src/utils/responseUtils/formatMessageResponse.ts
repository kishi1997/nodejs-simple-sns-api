import { Message } from 'src/entity/Message'

export const formatMessageResponse = (message: Message) => {
  return {
    id: message.id,
    content: message.content,
    userId: message.userId,
    roomId: message.roomId,
    postId: message.postId,
    createdDate: message.createdDate,
    updatedDate: message.updatedDate,
    user: {
      id: message.user?.id,
      name: message.user?.name,
      iconImageUrl: message.user?.iconImageUrl,
    },
    post: {
      id: message.post?.id,
      body: message.post?.body,
      userId: message.post?.userId,
      createdAt: message.post?.createdDate,
      user: {
        id: message.post?.user?.id,
        name: message.post?.user?.name,
        iconImageUrl: message.post?.user?.iconImageUrl,
      },
    },
  }
}
