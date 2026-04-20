export class GenreError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      genreId?: string;
      name?: string;
    },
  ) {
    super(param.message);
    this.param.type = 'genre-error';
  }
}
