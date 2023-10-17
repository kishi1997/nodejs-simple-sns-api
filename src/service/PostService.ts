import { Post } from "../entity/Post";
import { getPostRepository } from "../utils/getPostRepository";

export class PostService {
    static postRepo = getPostRepository();

    static async addPost(text:string) {
        try {
            if (!text) return;
            const newPost = new Post();
            newPost.text = text;
            return await PostService.postRepo.save(newPost);
        } catch (error) {
            res.send('Failed to post: ' + error);
        }
    }
}