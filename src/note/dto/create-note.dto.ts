import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  MinDate,
  IsDate,
} from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Note title',
    example: 'My first note',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Note text',
    example: 'Lorem ipsum dolor sit amet...',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Note tags',
    example: ['sport', 'health', 'work_out'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Due date (ISO 8601 format)',
    example: '2026-02-05T11:48:59.243Z',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @MinDate(
    () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 2);
      return now;
    },
    {
      message: 'Due date must be at least 2 minutes from now',
    },
  )
  dueDate?: Date;
}
