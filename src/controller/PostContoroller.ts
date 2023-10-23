import * as express from 'express';
import { PostService } from 'src/service/PostService';

export const PostContoroller = express.Router();

PostContoroller.post('/', async(req, res) => {
  try {
    const { text } = req.body;
    const newPost = await PostService.createPost(text);
    res.json({ newPost });
  } catch(error) {
    res.send(error);
  }
  });
