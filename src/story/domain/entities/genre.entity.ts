import { GenreName } from '../value-objects/genre-vo/genre-name.vo';

export class Genre {
  constructor(
    private id: string,
    private name: GenreName,
  ) {}
}
