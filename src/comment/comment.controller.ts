import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { Comment } from '../types/comment';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('create/:id')
  @UseGuards(AuthGuard('jwt'))
  async create(@Param('id', new ValidateObjectId()) id: string,
               @Body() commentDTO: CreateCommentDTO,
               @User() user: UserDocument): Promise<Comment> {
    return await this.commentService.createComment(id, commentDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', new ValidateObjectId()) id: string,
               @User() user: UserDocument): Promise<Comment> {
    const { id: userId } = user;
    return await this.commentService.deleteComment(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id', new ValidateObjectId()) id: string,
               @Body() comment: UpdateCommentDTO,
               @User() user: UserDocument): Promise<Comment> {
    const { id: userId } = user;
    return await this.commentService.updateComment(id, comment, userId);
  }

  @Get()
  async findAll(@Query('page') page: number): Promise<Comment[]> {
    return this.commentService.findAllComments(page);
  }

  @Get(':id')
  async read(@Param('id', new ValidateObjectId()) id: string): Promise<Comment> {
    const comment = await this.commentService.findById(id);
    if (!comment) {
      throw new HttpException(
        'Comment not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }

  @Get('cats/:id')
  async readCatComments(@Param('id', new ValidateObjectId()) id: string): Promise<Comment[]> {
    const comment = await this.commentService.findByCatId(id);
    if (!comment) {
      throw new HttpException(
        'Comment not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }

  @Get('memes/:id')
  async readMemeComments(@Param('id', new ValidateObjectId()) id: string): Promise<Comment[]> {
    const comment = await this.commentService.findByMemeId(id);
    if (!comment) {
      throw new HttpException(
        'Comment not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }
}
