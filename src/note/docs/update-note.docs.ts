import { ResponseNoteDocs } from './response-note.docs';
import { PartialType } from '@nestjs/swagger';

export class UpdateNoteDocs extends PartialType(ResponseNoteDocs) {}
