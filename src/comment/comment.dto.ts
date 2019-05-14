import { User } from '../types/user';

export interface CommentDTO {
  user: User;
  meme: boolean;
  text: string;
  created: Date;
}

export type CreateCommentDTO = Partial<CommentDTO>;
export type UpdateCommentDTO = Partial<CommentDTO>;
