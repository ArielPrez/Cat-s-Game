export class Player {
  name!: string;
  choice!: string;

  public load(data: any): Player {
    Object.assign(this, data);

    return this;
  }
}
