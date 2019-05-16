import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MemeService } from '../meme/meme.service';
import { Meme } from 'src/types/meme';
import { GqlAuthGuard } from '../guards/gqlauth.guard';
import { CreateMemeDTO, UpdateMemeDTO } from 'src/meme/meme.dto';

@Resolver('Meme')
export class MemeResolver {
  constructor(private memeService: MemeService) {}

  @Query()
  async memes(): Promise<Meme[]> {
    return await this.memeService.findAllMemes();
  }

  @Query()
  async meme(@Args('id') id: string): Promise<Meme> {
    return await this.memeService.findById(id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createMeme(@Args('name') name: string,
                   @Context() context): Promise<Meme> {
    const memeProfile: CreateMemeDTO = {name};
    return await this.memeService.createMeme(memeProfile, context.req.user);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteMeme(@Args('id') id: string,
                   @Context() context): Promise<Meme> {
    const userId = context.req.user._id.toString();
    return await this.memeService.deleteMeme(id, userId);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateMeme(@Args('id') id: string,
                   @Args('name') name: string,
                   @Args('popularity') popularity: number,
                   @Context() context): Promise<Meme> {
    let data = {};
    if (name) {
      data = {...data, name};
    }
    if (popularity) {
      data = {...data, popularity};
    }
    const memeProfile: UpdateMemeDTO = data;
    const userId = context.req.user._id.toString();
    return await this.memeService.updateMeme(id, memeProfile, userId);
  }
}
