import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Protected } from 'src/decorators/protected.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ResponseNoteDocs } from './docs/response-note.docs';
import { UpdateNoteDocs } from './docs/update-note.docs';

@ApiTags('Notes')
@Controller('note')
export class NoteController {
  constructor(private readonly note: NoteService) {}

  @Protected()
  @ApiOperation({ summary: 'Create new note' })
  @ApiCreatedResponse({
    description: 'Note created successfully',
    type: ResponseNoteDocs,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @Post()
  add(@Body() dto: CreateNoteDto, @GetUser('id') id: string) {
    return this.note.add(id, dto);
  }

  @Protected()
  @ApiOperation({ summary: 'Get all user notes' })
  @ApiOkResponse({
    description: 'List of user notes',
    type: [ResponseNoteDocs],
  })
  @Get()
  findAll(@GetUser('id') id: string) {
    return this.note.findAll(id);
  }

  @Protected()
  @ApiOperation({ summary: 'Update note by ID' })
  @ApiParam({
    name: 'id',
    description: 'Note ID',
    example: 'e182cca9-ba4a-4ac3-9b53-2b78be395e22',
  })
  @ApiOkResponse({
    description: 'Note updated successfully',
    type: ResponseNoteDocs,
  })
  @ApiNotFoundResponse({
    description: 'Note not found or access denied',
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: UpdateNoteDocs,
  ) {
    return this.note.update(id, userId, dto);
  }

  @Protected()
  @ApiOperation({ summary: 'Delete note by ID' })
  @ApiParam({
    name: 'id',
    description: 'Note ID',
    example: 'e182cca9-ba4a-4ac3-9b53-2b78be395e22',
  })
  @ApiOkResponse({
    description: 'Note deleted successfully',
    type: ResponseNoteDocs,
  })
  @ApiNotFoundResponse({
    description: 'Note not found or access denied',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete note',
  })
  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.note.delete(id, userId);
  }
}
