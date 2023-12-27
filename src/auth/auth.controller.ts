import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('privateRoute')
  @UseGuards(AuthGuard())
  privateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {
    return {
      message: 'Access guaranted',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  @Get('privateRouteTwo')
  // este decorator @SetMetadata se usa poco porque es facil cometer errores, mejor hacerlo de otra manera
  // @SetMetadata('roles', ['admin', 'super-user'])

  // esta solución para autorización no es tan buena, mejor todo en un único decorador
  @RoleProtected(ValidRoles.superUser)

  // AuthGuard es el que establece el user en la request
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRouteTwo(
    @GetUser() user: User
  ) {
    return {
      user
    }
  }

  @Get('privateRouteThree')
  @Auth(ValidRoles.superUser)
  privateRouteThree(
    @GetUser() user: User
  ) {
    return {
      user
    }
  }
  
}
