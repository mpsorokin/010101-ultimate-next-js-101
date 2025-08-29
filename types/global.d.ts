interface ISimpleEntity {
  _id: string;
  name: string;
}

interface IAuthor extends ISimpleEntity {
  image: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  tags: ISimpleEntity[];
  author: IAuthor;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
}
