import { Id } from '../value-objects/id.vo';
import { TagName } from '../value-objects/tag-vo/tag-name.vo';

export class Tag {
  constructor(
    private id: Id,
    private name: TagName,
  ) {}

  get getId(): Id {
    return this.id;
  }

  get getName(): TagName {
    return this.name;
  }

  static create(param: { name: string; id?: string }) {
    return new Tag(new Id(param.id), new TagName(param.name));
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      name: this.getName.getValue,
    };
  }
}
