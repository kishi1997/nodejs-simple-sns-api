import { validateNull } from "src/utils/validateUtils/validateNull";
import { getMessageRepository } from "../utils/getRepository";
import { validateEmpty } from "src/utils/validateUtils/validateEmpty";
import { User } from "src/entity/User";
import { Post } from "src/entity/Post";
import { createError } from "src/utils/errorUtils/createError";

export class MessageService {
    static messageRepo = getMessageRepository();

    static validateMessageData(content: string, roomId: string, postId?: number) {
        if (postId) {
            validateNull(
                { name: 'Message', value: content },
                { name: 'RoomId', value: roomId },
                { name: 'postId', value: postId }
            );
        } else {
            validateNull(
                { name: 'Message', value: content },
                { name: 'RoomId', value: roomId }
            );
        }
        validateEmpty(
          { name: 'Message', value: content.trim() },
        );
    }

    static async createMessage(content: string, roomId: string, userId: number) {
        this.validateMessageData(content, roomId);
        const user = await User.findOne({ where: { id: userId } });
        if(!user) {
            throw createError('User does not exist', 404);
        };
        const newMessage = MessageService.messageRepo.create({ content, roomId, userId });
        await MessageService.messageRepo.save(newMessage);
        return {user, newMessage};
    }
    static async createMessageViaPost(content: string, roomId: string, postId: number, userId: number) {
        this.validateMessageData(content, roomId, postId);
        const user = await User.findOne({ where: { id: userId } });
        if(!user) {
            throw createError('User does not exist', 404);
        };
        const post = await Post.findOne({ where: { id: postId }, relations: ["user"] });
        if(!post) {
            throw createError('Post does not exist', 404);
        };
        const postUser = post.user;
        if(!postUser) {
            throw createError('Post User does not exist', 404);
        };
        const newMessage = MessageService.messageRepo.create({ content, roomId, postId, userId });
        await MessageService.messageRepo.save(newMessage);
        return {user, post, postUser, newMessage};
    }
}
