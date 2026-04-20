import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { FindGenresUseCase } from '../application/use-cases/genre-use-cases/find-genres.use-case';
import { FindGenreByNameUseCase } from '../application/use-cases/genre-use-cases/find-genre-by-name.use-case';
import { FindGenreByIdUseCase } from '../application/use-cases/genre-use-cases/find-genre-by-id.use-case ';

@Controller('api/genre')
export class GenreController {
  constructor(
    private findGenresUseCase: FindGenresUseCase,
    private findGenreByNameUseCase: FindGenreByNameUseCase,
    private findGenreByIdUseCase: FindGenreByIdUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  findGenres() {
    return this.findGenresUseCase.execute();
  }

  @Get('/name/:name')
  @HttpCode(200)
  async findGenreByName(@Param('name') name: string) {
    return await this.findGenreByNameUseCase.execute(name);
  }

  @Get('/id/:id')
  @HttpCode(200)
  async findGenreById(@Param('id') id: string) {
    return await this.findGenreByIdUseCase.execute(id);
  }
}
