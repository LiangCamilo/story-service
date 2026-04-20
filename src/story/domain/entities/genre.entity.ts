import { AllowedGenre } from '../constants/genre-constants/genre-name.constants';
import { GenreName } from '../value-objects/genre-vo/genre-name.vo';
import { Id } from '../value-objects/id.vo';

export class Genre {
  constructor(
    private id: Id,
    private name: GenreName,
  ) {}

  static create(params: {
    name: AllowedGenre;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Genre {
    return new Genre(new Id(params.id), new GenreName(params.name));
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  toPrimitives() {
    return {
      id: this.getId.getValue,
      name: this.getName.getValue,
    };
  }
}
