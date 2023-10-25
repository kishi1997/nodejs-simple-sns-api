import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async(req, res) => {
  try {
    const { body, userId } = req.body;
    const newPost = await PostService.createPost(body, userId);
    res.json({ newPost });
  } catch(error) {
    res.send(error);
  }
  });
