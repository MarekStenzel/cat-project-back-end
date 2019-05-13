import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FoundationService } from 'src/foundation/foundation.service';
import { GqlAuthGuard } from '../guards/gqlauth.guard';
import { CreateFoundationDTO, UpdateFoundationDTO } from '../foundation/foundation.dto';
import { Address } from '../types/user';
import { Foundation } from '../types/foundation';

@Resolver('Foundation')
export class FoundationResolver {
  constructor(private foundationService: FoundationService) {}

  @Query()
  async foundations(): Promise<Foundation[]> {
    return await this.foundationService.findAll();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async deleteFoundation(@Args('id') id: string): Promise<Foundation> {
    return await this.foundationService.deleteFoundation(id);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createFoundation(@Args('name') name: string,
                         @Args('email') email: string,
                         @Args('crypto') crypto: string,
                         @Args('address') address: Address): Promise<Foundation> {
    const foundationDTO: CreateFoundationDTO = {name, email, crypto, address};
    return await this.foundationService.createFoundation(foundationDTO);
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateFoundation(@Args('id') id: string,
                         @Args('name') name: string,
                         @Args('email') email: string,
                         @Args('crypto') crypto: string,
                         @Args('address') address: Address): Promise<Foundation> {
    let data = {};
    if (name) {
      data = {...data, name};
    }
    if (email) {
      data = {...data, email};
    }
    if (crypto) {
      data = {...data, crypto};
    }

    let addressData = {};
    if (address) {
      if (address.addr1) {
        const addr1 = address.addr1;
        addressData = {...addressData, addr1};
      }
      if (address.addr2) {
        const addr2 = address.addr2;
        addressData = {...addressData, addr2};
      }
      if (address.city) {
        const city = address.city;
        addressData = {...addressData, city};
      }
      if (address.state) {
        const state = address.state;
        addressData = {...addressData, state};
      }
      if (address.country) {
        const country = address.country;
        addressData = {...addressData, country};
      }
      if (address.zip) {
        const zip = address.zip;
        addressData = {...addressData, zip};
      }
      data = {...data, address: addressData};
    }
    const foundationDTO: UpdateFoundationDTO = data;
    return await this.foundationService.updateFoundation(id, foundationDTO);
  }

}
