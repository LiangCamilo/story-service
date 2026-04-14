import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagRepositoryPort } from 'src/story/application/ports/tag.repository';
import { Tag } from 'src/story/domain/entities/tag.entity';
import { Id } from 'src/story/domain/value-objects/id.vo';
import { TagName } from 'src/story/domain/value-objects/tag-vo/tag-name.vo';

@Injectable()
export class PrismaTagRepository implements TagRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findTagsByName(tagNames: string[]): Promise<Tag[]> {
    const rawTags = await this.prisma.tag.findMany({
      where: {
        name: { in: tagNames.map((x) => x) },
      },
    });

    const notExistingTags = tagNames.map(x => )

    const tags = rawTags.map((x) => new Tag(new Id(x.id), new TagName(x.name)));

    return tags;
  }

  async createTag(name: string): Promise<Tag> {
    const tag = Tag.create({ name });

    const data = tag.toPrimitives();
    await this.prisma.tag.create({
      data,
    });

    return tag;
  }

  async deleteTagById(id: string): Promise<void | null> {
    const findTag = await this.prisma.tag.findUnique({ where: { id } });
    if (!findTag) {
      return null;
    }

    await this.prisma.tag.delete({ where: { id } });
  }

  async deleteTagByName(name: string): Promise<void> {
    const deletedTag = await this.prisma.tag.delete({ where: { name } });

    if (!deletedTag) {
      throw new HttpException(
        'No se pudo eliminar correctamente el tag seleccionado',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
