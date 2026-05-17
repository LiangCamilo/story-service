export class ChapterTitle {
  private value: string;

  constructor(title: string) {
    this.value = title;
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(title: string) {
    this.value = title;
  }
}
