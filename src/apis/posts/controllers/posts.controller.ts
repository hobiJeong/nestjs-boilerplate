import { Controller } from '@nestjs/common';
import { routesV1 } from '@src/configs/app.route';

@Controller(routesV1.version)
export class PostsController {}
