import { GenreName } from '../value-objects/genre-vo/genre-name.vo';

export class Genre {
  constructor(
    public id: string,
    public name: GenreName,
  ) {}
}
