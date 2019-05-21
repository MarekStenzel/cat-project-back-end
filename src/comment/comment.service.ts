import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../types/comment';
import { Cat } from '../types/cat';
import { User } from '../types/user';
import { Meme } from 'src/types/meme';
import { CreateCommentDTO, UpdateCommentDTO } from './comment.dto';
import { PaginateModel } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment')
              private commentModel: PaginateModel<Comment>,
              @InjectModel('Cat')
              private catModel: Model<Cat>,
              @InjectModel('Meme')
              private memeModel: Model<Meme>) {}

  async createComment(id, commentDTO: CreateCommentDTO, user: User): Promise<Comment> {
    const memeLogic = (commentDTO.meme.toString() === 'true');
    let commentProfile;
    if (memeLogic) {
      const memeProfile = await this.memeModel.findById(id);
      if (!memeProfile) {
        throw new HttpException(
          `Meme not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      commentProfile = await this.commentModel.create({
        memeId: id,
        ...commentDTO,
        user,
      });
    } else {
      const catProfile = await this.catModel.findById(id);
      if (!catProfile) {
        throw new HttpException(
          `Cat not found`,
          HttpStatus.NOT_FOUND,
        );
      }

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

  async findAllComments(page: number = 1): Promise<Comment[]> {
    const options = {
      page,
      limit: 25,
    };
    const paginated = await this.commentModel.paginate({}, options);
    return paginated.docs;
  }

  async findById(id: string): Promise<Comment> {
    return await this.commentModel.findById(id);
  }

  async findByCatId(page: number = 1, id: string): Promise<Comment[]> {
    const options = {
      page,
      limit: 25,
      populate: 'user',
    };
    const paginated = await this.commentModel.paginate({catId: id}, options);
    return paginated.docs;
  }

  async findByMemeId(page: number = 1, id: string): Promise<Comment[]> {
    const options = {
      page,
      limit: 25,
      populate: 'user',
    };
    const paginated = await this.commentModel.paginate({memeId: id}, options);
    return paginated.docs;
  }
}
