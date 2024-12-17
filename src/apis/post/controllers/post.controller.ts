import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { routesV1 } from '@src/configs/app.route';

@Controller(routesV1.version)
export class PostController {
  @ApiBearerAuth('access-token')
  @Post(routesV1.post.root)
  create() {
    return 'guard test';
  }
}
