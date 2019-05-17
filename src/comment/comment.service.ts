import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../types/comment';
import { User } from '../types/user';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async createComment(id, commentDTO: CreateCommentDTO, user: User): Promise<Comment> {
    const memeLogic = (commentDTO.meme.toString() === 'true');
    let commentProfile;
    if (memeLogic) {
      commentProfile = await this.commentModel.create({
        memeId: id,
        ...commentDTO,
        user,
      });
    } else {
      commentProfile = await this.commentModel.create({
        catId: id,
        ...commentDTO,
        user,
      });
    }
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

  async findById(id: string): Promise<Comment> {
    return await this.commentModel.findById(id);
  }

  async findByCatId(id: string) {
    return await this.commentModel.find({catId: id});
  }

  async findByMemeId(id: string) {
    return await this.commentModel.find({memeId: id});
  }
}
