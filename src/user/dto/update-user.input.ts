import { PartialType } from '@nestjs/mapped-types';
import { createUserInput } from './create-user.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class updateUserInput extends PartialType(createUserInput) {}
