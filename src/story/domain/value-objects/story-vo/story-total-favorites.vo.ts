
export class StoryTotalFavorites {
  constructor(private value: number) {
    this.isValid(value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(totalFavorites: number) {
    this.value = totalFavorites;
  }

  isValid(totalFavorites: number): boolean {
    if (totalFavorites < 0) throw new Error('Invalid StoryTotalFavorites');
    return true;
  }
  
  equals(other: StoryTotalFavorites): boolean {
    return this.value === other.value;
  }
}