import { User } from '../types/user';

export interface CommentDTO {
  user: User;
  catId: string;
  memeId: string;
  meme: boolean;
  text: string;
  created: Date;
}

export type CreateCommentDTO = Partial<CommentDTO>;
export type UpdateCommentDTO = Partial<CommentDTO>;
