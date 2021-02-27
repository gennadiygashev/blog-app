import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Post } from './interfaces/post.interface'
import { CreatePostDTO } from './dto/create-post.dto'

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getPosts(): Promise<Post[]> {
    return await this.postModel.find().exec()
  }

  async getPost(ID: string): Promise<Post> {
    return await this.postModel.findById(ID).exec()
  }

  async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await new this.postModel(createPostDTO)
    return newPost.save()
  }

  async deletePost(ID: string): Promise<any> {
    return this.postModel.findByIdAndRemove(ID)
  }
}
