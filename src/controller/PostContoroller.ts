import * as express from 'express';
import { Request } from 'express';
import { authAdmin, verifyToken } from 'src/authMiddleware/auth';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { post } = req.body;
    const postData = await PostService.createPost(post, (req as any).userId);
    const {newPost, user} = postData;
    res.json({
      post: {
        id: newPost.id,
        body: newPost.body,
        userId: newPost.userId,
        createdAt: newPost.createdAt ? new Date(newPost.createdAt).toISOString() : null,
      },
      user: {
        id: user?.id,
        name: user?.name,
        iconImageUrl: user?.iconImageUrl
      }
    });
  } catch (error) {
  next(error);
}
});

