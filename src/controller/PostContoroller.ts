import * as express from 'express';
import { authAdmin, verifyToken } from 'src/authMiddleware/auth';
import { PostService } from 'src/service/PostService';
import { formatPostResponse } from 'src/utils/responseUtils/formatPostResponse';
import { formatUserResponse } from 'src/utils/responseUtils/formatUserResponse';

export const PostContoroller = express.Router();

PostContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { post } = req.body;
    const postData = await PostService.createPost(post, (req as any).userId);
    const {newPost, user} = postData;
    const formattedUserData = formatUserResponse(user);
    const formattedPostData = formatPostResponse(newPost);

    res.json({
      post: formattedPostData,
      user: formattedUserData
    });
  } catch (error) {
  next(error);
}
});

