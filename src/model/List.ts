import { User } from './User';

export type List = {
  users: User[];
  createdAt: string;
  createdBy: string;
  listId: string;
  listName: string;
  key?: string;
};
