import { Message } from "src/entity/Message"

export const formatMessageResponse = (message: Message) => {
    return {
        id: message.id,
        content: message.content,
        userId: message.userId,
        roomId: message.roomId,
        postId: message.postId,
        createdDate: message.createdDate ? new Date(message.createdDate).toISOString() : null,
        updatedDate: message.updatedDate ? new Date(message.updatedDate).toISOString() : null,
    }
}