import { getPostRepository } from "../utils/getRepository";

export class PostService {
    static postRepo = getPostRepository();

    static async createPost(body: string, userId: number) {
        const newPost = PostService.postRepo.create({ body, userId });
        return await PostService.postRepo.save(newPost);
    }
}
