import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

createParamDecorator
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user
    if (!user)
      throw new InternalServerErrorException('User not found (request)')

    return (data) 
      ? user[data] 
      : user
  }
)
