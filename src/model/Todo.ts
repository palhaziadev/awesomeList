import { User } from './User';

export type Item = {
  createdAt: string;
  createdBy: string;
  itemId: string;
  itemName: string;
  translation?: string;
  translationOverride?: string;
};

export type TodoItem = Item & {
  key?: string;
  isDone?: boolean;
};

export type TodoList = {
  users: User[];
  createdAt: string;
  createdBy: string;
  listId: string;
  listName: string;
  items: any; // TODO fix type, it is a collection not array ListItem[];
  key?: string;
};
