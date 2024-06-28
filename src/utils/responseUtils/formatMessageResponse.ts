import { Message } from 'src/entity/Message'
import { formatUserResponseWithoutEmail } from './formatUserResponse'
import { formatPostResponse } from './formatPostResponse'

export const formatMessageResponse = (message: Message) => {
  return {
    id: message.id,
    content: message.content,
    userId: message.userId,
    roomId: message.roomId,
    postId: message.postId,
    createdDate: message.createdDate,
    updatedDate: message.updatedDate,
    user: formatUserResponseWithoutEmail(message.user!),
    post: message.post ? formatPostResponse(message.post) : {},
  }
}
