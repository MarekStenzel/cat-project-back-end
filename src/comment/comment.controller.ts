import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { Comment } from '../types/comment';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() commentDTO: CreateCommentDTO,
               @User() user: UserDocument): Promise<Comment> {
    return await this.commentService.createComment(commentDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string,
               @User() user: UserDocument): Promise<Comment> {
    const { id: userId } = user;
    return await this.commentService.deleteComment(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string,
               @Body() comment: UpdateCommentDTO,
               @User() user: UserDocument): Promise<Comment> {
    const { id: userId } = user;
    return await this.commentService.updateComment(id, comment, userId);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAllComments();
  }
}
