import { Post } from "../entity/Post";
import { getPostRepository } from "../utils/getPostRepository";

export class PostService {
    static postRepo = getPostRepository();

    static async createPost(text:string) {
        try {
            if (!text) return;
            const newPost = new Post();
            newPost.text = text;
            return await PostService.postRepo.save(newPost);
        } catch (error) {
            return error;
        }
    }
}