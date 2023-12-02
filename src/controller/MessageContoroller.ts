import * as express from 'express';
import { verifyToken, authAdmin } from 'src/authMiddleware/auth';
import { MessageService } from 'src/service/MessageService';
import { formatMessageResponse } from 'src/utils/responseUtils/formatMessageResponse';
import { formatPostResponse } from 'src/utils/responseUtils/formatPostResponse';
import { formatUserResponse, formatUserResponseWithoutEmail } from 'src/utils/responseUtils/formatUserResponse';

export const MessageContoroller = express.Router();

MessageContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { content, roomId } = req.body;
    const newMessageData = await MessageService.createMessage(content, roomId, (req as any).userId);
    const { user, newMessage } = newMessageData;
    const formattedMessageData = formatMessageResponse(newMessage);
    const formattedUserData = formatUserResponseWithoutEmail(user);
    res.json({
      message: formattedMessageData,
      user: formattedUserData,
    });
  } catch (error) {
  next(error);
}
});

MessageContoroller.post('/via_post', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { content, roomId, postId } = req.body;
    const messageViaPostData = await MessageService.createMessageViaPost(content, roomId, postId, (req as any).userId);
    const { user, post, postUser, newMessage } = messageViaPostData;
    const formattedMessageData = formatMessageResponse(newMessage);
    const formattedUserData = formatUserResponse(user);
    const formattedPostData = formatPostResponse(post);
    const formattedPostUserData = formatUserResponseWithoutEmail(postUser);
    res.json({
      message: formattedMessageData,
      user: formattedUserData,
      post: {...formattedPostData, user: formattedPostUserData},
    });
  } catch (error) {
    next(error);
  }
});
