import { GenreName } from '../value-objects/genre-vo/GenreName';

export class Genre {
  constructor(
    public id: string,
    public name: GenreName,
  ) {}
}
