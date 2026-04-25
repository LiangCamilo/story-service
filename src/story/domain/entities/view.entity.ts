import { Id } from '../value-objects/id.vo';

export class View {
  constructor(
    private id: Id,
    private storyId: string,
    private userId: string,
  ) {}

  static create(params: { id: string; storyId: string; userId: string }) {
    return new View(new Id(params.id), params.storyId, params.userId);
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      storyId: this.storyId,
      userId: this.userId,
    };
  }
}
