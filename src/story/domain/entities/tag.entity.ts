import { TagName } from '../value-objects/tag-vo/tag-name.vo';

export class Tag {
  constructor(
    public id: string,
    public name: TagName,
  ) {}
}
