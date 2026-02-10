import { PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { IsOptional } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsOptional()
  title?: string;

  @IsOptional()
  text?: string;

  @IsOptional()
  tags?: string[];
}
