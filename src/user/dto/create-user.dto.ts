import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Min,
  Max,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserGender } from 'generated/prisma/enums';

export class CreateUserDto {
  @IsString({ message: 'The field must be a string' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @IsString({ message: 'The field must be a string' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @IsString({ message: 'The field must be a string' })
  @IsEmail({}, { message: 'Incorrect email format' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password обязателен' })
  @MinLength(6, { message: 'Password cannot be less than 6 characters' })
  @MaxLength(128, { message: 'Password cannot exceed 128 characters' })
  password: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @Min(14, { message: 'Age cannot be less than 14 years' })
  @Max(100, { message: 'Age cannot exceed 100 years' })
  age: number;

  @IsString({ message: 'The field must be a string' })
  @IsEnum(UserGender, {
    message: 'Gender must be one of the options: male, female',
  })
  gender: UserGender;
}
