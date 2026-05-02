export class CloudinaryError extends Error {
  constructor(
    private params: { message?: string; status?: number; type?: string },
  ) {
    super(
      (params.message = `Ha ocurrido un error desconocido mientras se subia una imagen`),
    );
    this.params.type = params.type ?? `cloudinary-error`;
    this.params.status = params.status ?? 500;
  }

  get getType() {
    return this.params.type;
  }

  get getMessage() {
    return this.params.message;
  }

  get getStatus() {
    return this.params.status;
  }
}
