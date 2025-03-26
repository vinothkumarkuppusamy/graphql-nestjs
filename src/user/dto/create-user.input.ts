import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

@InputType() // convert to graphQL accepted InputType
export class createUserInput {
  @IsString()
  @Field({ nullable: true }) // convert to field also
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @IsEnum(Role)
  @Field(() => Role)
  role: Role;
}
