import { AllowedStatus } from '../../constants/story-constants/story-status.constants';

export class StoryStatus {
  private value: AllowedStatus;

  constructor(public status: AllowedStatus) {
    this.value = status;
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(status: AllowedStatus) {
    this.value = status;
  }
}
