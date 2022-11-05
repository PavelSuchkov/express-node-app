import Post from "../models/Post.js";
import fileService from "./fileService.js";

class PostService {

    async create(post, picture) {
        const fileName = fileService.saveFile(picture)
        const createdPost = await Post.create({...post, picture: fileName})
        console.log(createdPost.toJSON())
        return createdPost
    }

    async getAll() {
        const posts = await Post.find()
        return posts

    }

    async getOne(id) {
        if (!id) {
            throw new Error('id are not entered')
        }
        const post = Post.findById(id)
        if (post) {
            return post
        }
    }

    async update(post) {
        if(!post._id){
            throw new Error('id are not entered')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost


    }

    async delete(id) {
        if(!id){
            throw new Error('id are not entered')
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}

export default new PostService()