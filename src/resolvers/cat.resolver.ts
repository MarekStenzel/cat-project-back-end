import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CatService } from '../cat/cat.service';
import { CreateCatDTO, UpdateCatDTO } from '../cat/cat.dto';
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
  async createCat(@Args('name') name: string,
                  @Args('lonely') lonely: boolean,
                  @Context() context) {
    const catProfile: CreateCatDTO = {name, lonely};
    return await this.catService.createCat(catProfile, context.req.user);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteCat(@Args('id') id: string,
                  @Context() context) {
    const userId = context.req.user._id.toString();
    return await this.catService.deleteCat(id, userId);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateCat(@Args('id') id: string,
                  @Args('name') name: string,
                  @Args('lonely') lonely: boolean,
                  @Args('popularity') popularity: number,
                  @Context() context) {
    let data = {};
    if (name) {
      data = {...data, name};
    }
    if (lonely != null) {
      data = {...data, lonely};
    }
    if (popularity) {
      data = {...data, popularity};
    }
    const catProfile: UpdateCatDTO = data;
    const userId = context.req.user._id.toString();
    return await this.catService.updateCat(id, catProfile, userId);
  }
}
