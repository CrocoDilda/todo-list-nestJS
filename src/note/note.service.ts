import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async add(userId: string, dto: CreateNoteDto) {
    try {
      return await this.prisma.note.create({ data: { ...dto, userId } });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2003'
      )
        throw new BadRequestException('Invalid user ID');
      throw new BadRequestException('Failed to create note');
    }
  }

  async findAll(userId: string) {
    return this.prisma.note.findMany({
      where: { userId },
      omit: { userId: true },
    });
  }

  async update(id: string, userId: string, dto: any) {
    await this.checkOwnership(id, userId);
    try {
      return await this.prisma.note.update({
        where: { id },
        data: dto,
        omit: { userId: true },
      });
    } catch {
      throw new BadRequestException('Failed to update note');
    }
  }

  async delete(id: string, userId: string) {
    await this.checkOwnership(id, userId);
    try {
      return await this.prisma.note.delete({ where: { id } });
    } catch {
      throw new BadRequestException('Failed to delete note');
    }
  }

  async findOne(id: string, userId: string) {
    const note = await this.prisma.note.findFirst({
      where: { id, userId },
      omit: { userId: true },
    });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  private async checkOwnership(id: string, userId: string) {
    const note = await this.prisma.note.findFirst({ where: { id, userId } });
    if (!note) throw new NotFoundException('Note not found');
  }
}
