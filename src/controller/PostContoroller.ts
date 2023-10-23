import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async(req, res) => {
  try {
    const { content } = req.body;
    const newPost = await PostService.createPost(content);
    res.json({ newPost });
  } catch(error) {
    res.send(error);
  }
  });
