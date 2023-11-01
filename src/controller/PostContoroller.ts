import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async (req, res, next) => {
  try {
    const { post } = req.body;

    const { body, userId } = post;

    if (body === null || body === undefined) {
      throw new Error('invalid post');
    }

    if (body.length === 0) {
      throw new Error('post should not be empty');
    }

    if (userId === null || userId === undefined) {
      throw new Error('invalid userId');
    }

    if (userId === null) {
      throw new Error('userId should not be empty');
    }
    if (typeof body !== 'string' || typeof userId !== 'number') {
      throw new Error('Invalid post data types. Body should be a string and userId should be a number.');
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

