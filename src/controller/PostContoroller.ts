import * as express from 'express';
import { Post } from './entity/Post';
import { AppDataSource } from './data-source';
import { PostService } from '../service/PostService'

export const postContoroller = express.Router();

postContoroller.post('/add', async(req, res) => {
  try {
    const { text } = req.body;
    const newPost = await PostService.addPost(text);
    res.json({ newPost });
  } catch(error) {
    res.send(error);
  }
  });
