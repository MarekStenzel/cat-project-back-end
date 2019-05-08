import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CatService } from '../cat/cat.service';
import { CatDTO } from '../cat/cat.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gqlauth.guard';

@Resolver('Cat')
export class CatResolver {
  constructor(private catService: CatService) {}

  @Query()
  async cats() {
    return await this.catService.findAllCats();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createCat(@Args('name') name: string, @Context() context) {
    const catProfile: CatDTO = {name};
    return await this.catService.createCat(catProfile, context.req.user);
  }
}
