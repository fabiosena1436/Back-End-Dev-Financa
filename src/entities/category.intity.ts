type CategoryPropos = {
  id?: string;
  title: string;
  color: string;
};

export class Category {
  public id?: string;
  public title: string;
  public color: string;

  constructor({ id, color, title }: CategoryPropos) {
    this.id = id;
    this.title = title;
    this.color = color.toUpperCase();
  }
}


