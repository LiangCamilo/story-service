import { TagName } from '../value-objects/tag-vo/TagName';

export class Tag {
  constructor(
    public id: string,
    public name: TagName,
  ) {}
}
