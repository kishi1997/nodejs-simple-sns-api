import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async (req, res, next) => {
  try {
    const { body, userId } = req.body;

    if (!body) {
      throw new Error('post should not be empty');
    }
    if (!userId) {
      throw new Error('userId should not be empty');
    }

    const newPost = await PostService.createPost(body, userId);
    res.json({
      post: {
      id: newPost.id,
      body: newPost.body,
      userId: newPost.userId,
      createdAt: newPost.createdAt ? new Date(newPost.createdAt).toISOString() : null,
      }
    });
  } catch (error) {
    next(error);
  }
});

