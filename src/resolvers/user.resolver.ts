import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../shared/user.service';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService,
              private authService: AuthService) {}

  @Query()
  async users() {
    return await this.userService.showAll();
  }

  @Mutation()
  async login(@Args('username') username: string,
              @Args('password') password: string) {
    const userProfile: LoginDTO = {username, password};
    const user = await this.userService.findByLogin(userProfile);
    const payload: Payload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return {user, token};
  }

  @Mutation()
  async register(@Args('username') username: string,
                 @Args('password') password: string) {
    const userProfile: RegisterDTO = {username, password};
    const user = await this.userService.create(userProfile);
    const payload: Payload = {
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return {user, token};
  }
}
