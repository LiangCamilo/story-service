import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryTotalViews {
  private value: number;

  constructor(totalViews: number) {
    this.value = totalViews;

    this.isValid(this.value);
  }

  isValid(totalViews: number) {
    if (totalViews < 0) {
      throw new DomainValidationError(
        'Las vistas totales no pueden ser menores a 0',
      );
    }
  }

  addView() {
    this.value = this.value + 1;
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(totalViews: number) {
    this.value = totalViews;
  }
}
