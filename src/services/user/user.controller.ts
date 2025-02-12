import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser({userId}: {userId: string}) {
    return this.userService.getUser({userId});
  }
}
