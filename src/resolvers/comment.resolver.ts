import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gqlauth.guard';
import { CommentService } from '../comment/comment.service';
import { Comment } from 'src/types/comment';
import { CreateCommentDTO, UpdateCommentDTO } from 'src/comment/comment.dto';
import { ValidateObjectId } from '../shared/validate-object-id.pipes';

@Resolver('Comment')
export class CommentResolver {
  constructor(private commentService: CommentService) {
  }

  @Query()
  async comments(): Promise<Comment[]> {
    return await this.commentService.findAllComments();
  }

  @Query()
  async comment(@Args('id', new ValidateObjectId()) id: string): Promise<Comment> {
    return await this.commentService.findById(id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createComment(@Args('text') text: string,
                      @Args('meme') meme: boolean,
                      @Context() context): Promise<Comment> {
    const commentProfile: CreateCommentDTO = {text, meme};
    return await this.commentService.createComment(commentProfile, context.req.user);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteComment(@Args('id', new ValidateObjectId()) id: string,
                      @Context() context): Promise<Comment> {
    const userId = context.req.user._id.toString();
    return await this.commentService.deleteComment(id, userId);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateComment(@Args('id', new ValidateObjectId()) id: string,
                      @Args('text') text: string,
                      @Context() context): Promise<Comment> {
    const commentProfile: UpdateCommentDTO = {text};
    const userId = context.req.user._id.toString();
    return await this.commentService.updateComment(id, commentProfile, userId);
  }
}
