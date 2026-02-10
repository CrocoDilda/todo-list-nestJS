import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from '../dto/create-note.dto';
import { PartialType } from '@nestjs/swagger';

export class ResponseNoteDocs extends PartialType(CreateNoteDto) {
  @ApiProperty({
    description: 'Unique note identifier',
    example: 'e182cca9-ba4a-4ac3-9b53-2b78be395e22',
  })
  id: string;

  @ApiProperty({
    description: 'Note completion status',
    example: false,
    default: false,
  })
  isComplete: boolean;

  @ApiProperty({
    description: 'Note overdue status',
    example: false,
    default: false,
  })
  isOverdue: boolean;

  @ApiProperty({
    description: 'Note due date',
    example: '2026-02-10T15:30:00.000Z',
    required: false,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Note creation timestamp',
    example: '2026-02-05T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Note last update timestamp',
    example: '2026-02-05T12:30:00.000Z',
  })
  updatedAt: Date;
}
