import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async (req, res, next) => {
  try {
    const { post } = req.body;

    const { body, userId } = post;

    if (body == null) {
      throw new Error('invalid post');
    }

    if (body.trim().length === 0) {
      throw new Error('post should not be empty');
    }

    if (userId == null) {
      throw new Error('invalid userId');
    }

    if (userId.length == 0) {
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

