import { User } from './User';

export type Item = {
  itemId: string;
  itemName: string;
  itemDescription?: string;
  translation?: string;
  translationOverride?: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type TodoItem = Item & {
  isDone?: boolean;
};

export type SharedList = {
  ownerUserId: string;
  listId: string;
  createdAt: string;
  createdBy: string;
  permission?: string;
  updatedAt?: string;
  updatedBy?: string;
};

type ListSharedWith = {
  user: User;
  createdAt: string;
  createdBy: string;
  permission?: string;
  updatedAt?: string;
  updatedBy?: string;
};

export type TodoList = {
  owner: string; // docId of user
  createdAt: string;
  createdBy: string; // user email
  listId: string;
  listName: string;
  items: TodoItem[];
  isArchived?: boolean;
  listAvatar?: string;
  orderBy?: string; // ListOrderType; // TODO define types
  sharedWith?: ListSharedWith[];
  updatedAt?: string;
  updatedBy?: string;
};
