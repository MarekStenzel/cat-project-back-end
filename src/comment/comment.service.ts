import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../types/comment';
import { User } from '../types/user';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async createComment(commentDTO: CreateCommentDTO, user: User): Promise<Comment> {
    const commentProfile = await this.commentModel.create({
      ...commentDTO,
      user,
    });
    await commentProfile.save();
    return commentProfile.populate('user');
  }

  async deleteComment(id: string, userId: string): Promise<Comment> {
    const commentProfile = await this.commentModel.findById(id);
    if (userId !== commentProfile.user.toString()) {
      throw new HttpException(
        `It's not your comment`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await commentProfile.remove();
    return commentProfile.populate('user');
  }

  async updateComment(id: string, commentDTO: UpdateCommentDTO, userId: string): Promise<Comment> {
    const commentProfile = await this.commentModel.findById(id);
    if (userId !== commentProfile.user.toString()) {
      throw new HttpException(
        `It's not your comment`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    await commentProfile.updateOne(commentDTO);
    return await this.commentModel.findById(id).populate('user');
  }

  async findAllComments(): Promise<Comment[]> {
    return await this.commentModel.find();
  }
}
