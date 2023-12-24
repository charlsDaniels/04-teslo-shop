import {createParamDecorator, ExecutionContext} from '@nestjs/common';

createParamDecorator
export const RawHeaders = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest()

    const headers = req.rawHeaders

    return (data) 
      ? headers[data] 
      : headers
  }
)