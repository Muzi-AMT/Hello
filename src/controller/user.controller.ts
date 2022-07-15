import { JwtService } from '@midwayjs/jwt';
import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';
import { Context } from '@midwayjs/koa';
import { Controller, Inject, Get, Query } from '@midwayjs/decorator';

@Controller('/api/user')
export class users {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Inject()
  UserModel: UserModel;

  @Get('/login')
  async uer(
    @Query('username') username: UserLoginDTO,
    @Query('password') password: UserLoginDTO
  ) {
    const user = await this.UserModel.getUserByUsernameAndPassword(
      username,
      password
    );
    if (user.length > 0) {
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: this.jwt,
      };
    } else {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
  }
}
