import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Res
} from '@nestjs/common'
import { BlogService } from './blog.service'
import { CreatePostDTO } from './dto/create-post.dto'
import { ValidateId } from './shared/validate-id.pipes'

@Controller('/')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts()
    return res.status(HttpStatus.OK).json(posts)
  }

  @Get('posts/:id')
  async getPost(@Res() res, @Param('id', new ValidateId()) id) {
    const post = await this.blogService.getPost(id)

    if (!post) throw new NotFoundException('Post not found')
    return res.status(HttpStatus.OK).json(post)
  }

  @Post('post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO)
    return res.status(HttpStatus.OK).json({
      status: 'created',
      post: newPost
    })
  }

  @Delete('delete')
  async deletePost(@Res() res, @Query('id', new ValidateId()) id) {
    const deletedPost = await this.blogService.deletePost(id)

    if (!deletedPost) throw new NotFoundException('Post does not exist!')
    return res.status(HttpStatus.OK).json({
      status: 'deleted',
      post: deletedPost
    })
  }
}
