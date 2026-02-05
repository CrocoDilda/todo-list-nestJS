import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User name',
    example: 'Alex',
    type: String,
  })
  @IsString({ message: 'The field must be a string' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Smith',
    type: String,
  })
  @IsString({ message: 'The field must be a string' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @ApiProperty({
    description: 'User email',
    example: 'alex.smith@example.com',
    type: String,
  })
  @IsString({ message: 'The field must be a string' })
  @IsEmail({}, { message: 'Incorrect email format' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'af234fdfDFfdas*Fdef',
    type: String,
  })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password обязателен' })
  @MinLength(6, { message: 'Password cannot be less than 6 characters' })
  @MaxLength(128, { message: 'Password cannot exceed 128 characters' })
  password: string;

  @ApiProperty({
    description: 'User age',
    example: 22,
    type: Number,
  })
  @IsNumber({}, { message: 'Age must be a number' })
  @IsNotEmpty({ message: 'The field must not be empty' })
  @Min(14, { message: 'Age cannot be less than 14 years' })
  @Max(100, { message: 'Age cannot exceed 100 years' })
  age: number;

  @ApiProperty({
    description: 'User gender',
    example: 'male',
    enum: UserGender,
    enumName: 'UserGender',
  })
  @IsString({ message: 'The field must be a string' })
  @IsEnum(UserGender, {
    message: 'Gender must be one of the options: male, female',
  })
  gender: UserGender;
}
