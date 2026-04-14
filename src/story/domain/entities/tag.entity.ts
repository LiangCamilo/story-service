import { TagName } from '../value-objects/tag-vo/tag-name.vo';

export class Tag {
  constructor(
    private id: string,
    private name: TagName,
  ) {}
}
