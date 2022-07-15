import { Rule, RuleType } from '@midwayjs/validate';

class UserLoginDTO {
  @Rule(RuleType.string().empty(''))
  username: string;

  @Rule(RuleType.string().empty(''))
  password: string;
}

export { UserLoginDTO };
