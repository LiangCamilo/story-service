export class GenreError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      genreId?: string;
      name?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'genre-error';
    this.param.status = param.status ?? 400;
  }

  get getMessage() {
    return this.param.message;
  }

  get getType() {
    return this.param.type;
  }

  get getGenreId() {
    return this.param.genreId;
  }

  get getName() {
    return this.param.name;
  }

  get getStatus() {
    return this.param.status;
  }
}
