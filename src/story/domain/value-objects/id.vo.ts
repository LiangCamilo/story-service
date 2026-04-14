export class Id {
  private value: string;

  constructor(public id?: string) {
    this.value = id || crypto.randomUUID();
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(title: string) {
    this.value = title;
  }

  equals(other: string) {
    return this.value === other;
  }
}
