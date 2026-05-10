import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTagsByNameDto } from 'src/story/application/dtos/tag-dtos/search-tags-by-name.dto';
import { TagRepositoryPort } from 'src/story/application/ports/tag.repository';
import { Tag } from 'src/story/domain/entities/tag.entity';
import { Id } from 'src/story/domain/value-objects/id.vo';
import { TagName } from 'src/story/domain/value-objects/tag-vo/tag-name.vo';

@Injectable()
export class PrismaTagRepository implements TagRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findTagsByName(tagNames: string[]): Promise<Tag[]> {
    const existingRawTags = await this.prisma.tag.findMany({
      where: {
        name: { in: tagNames.map((tagName) => tagName) },
      },
    });

    return existingRawTags.map(
      (tag) => new Tag(new Id(tag.id), new TagName(tag.name)),
    );
  }

  async createTag(name: string): Promise<Tag> {
    const tag = Tag.create({ name });

    const data = tag.toPrimitives();
    await this.prisma.tag.create({
      data,
    });

    return tag;
  }

  async createMultipleTags(tags: Tag[]): Promise<Tag[]> {
    const rawTags = tags.map((tag) => tag.toPrimitives());

    const createdTags = await this.prisma.tag.createManyAndReturn({
      data: rawTags,
    });

    return createdTags.map(
      (tag) => new Tag(new Id(tag.id), new TagName(tag.name)),
    );
  }

  async deleteTagById(id: string): Promise<void | null> {
    const findTag = await this.prisma.tag.findUnique({ where: { id } });
    if (!findTag) {
      return null;
    }

    await this.prisma.tag.delete({ where: { id } });
  }

  async deleteTagByName(name: string): Promise<void | null> {
    const findTag = await this.prisma.tag.findUnique({ where: { name } });
    if (!findTag) {
      return null;
    }

    await this.prisma.tag.delete({ where: { name } });
  }

  async searchTagsByName(
    searchTagsByNameDto: SearchTagsByNameDto,
  ): Promise<Tag[]> {
    const { limit, offset, tagName } = searchTagsByNameDto;

    const filteredTags = await this.prisma.tag.findMany({
      skip: offset,
      take: limit,
      where: {
        name: {
          contains: tagName,
          mode: 'insensitive',
        },
      },
    });

    return filteredTags.map((tag) => {
      return Tag.create({
        id: tag.id,
        name: tag.name,
      });
    });
  }
}
