import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import {User} from '../auth/entities/user.entity';
import {ValidRoles} from '../auth/interfaces';
import {Auth, GetUser} from '../auth/decorators';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  
  executeSeed(
    @GetUser() user: User
  ) {
    return this.seedService.runSeed(user);
  }

}
