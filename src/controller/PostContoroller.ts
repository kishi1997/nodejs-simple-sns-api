import * as express from 'express';
import { authAdmin, verifyToken } from 'src/authMiddleware/auth';
import { User } from 'src/entity/User';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', verifyToken, authAdmin, async (req, res, next) => {
  try {
    const { post } = req.body;

    const { body } = post;

    if (body == null) {
      throw new Error('invalid post');
    }

    if (body.trim().length === 0) {
      throw new Error('post should not be empty');
    }
    const userId = (req as any).userId;
    const user = await User.findOne({ where: { id: userId } });
    const newPost = await PostService.createPost(body, userId);
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

