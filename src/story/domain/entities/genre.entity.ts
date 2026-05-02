import { AllowedGenre } from '../constants/genre-constants/genre-name.constants';
import { GenreName } from '../value-objects/genre-vo/genre-name.vo';
import { Id } from '../value-objects/id.vo';

export class Genre {
  constructor(
    private id: Id,
    private name: GenreName,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    name: AllowedGenre;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Genre {
    return new Genre(
      new Id(params.id),
      new GenreName(params.name),
      params.createdAt,
      params.updatedAt,
    );
  }

  get getId() {
    return this.id;
  }

  get getName() {
    return this.name;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.getId.getValue,
      name: this.getName.getValue,
    };
  }
}
