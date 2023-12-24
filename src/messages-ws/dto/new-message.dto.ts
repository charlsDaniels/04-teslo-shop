import { IsOptional, IsString } from "class-validator";

export class NewMessageDto {

  @IsString()
  fullName: string

  @IsString()
  @IsOptional()
  message: string

}
