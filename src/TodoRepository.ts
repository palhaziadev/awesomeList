import { db } from '../firebase.config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export enum TodoStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Blocked = 'Blocked',
  Done = 'Done',
  Archived = 'Archived',
}

export type Todo = {
  id?: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdBy: string;
  createdDate: string;
  owner: string;
  orderNumber: number;
};

export class TodoRepository {
  private readonly collectionName = 'todos';

  async getAll(): Promise<Todo[]> {
    const todos: Todo[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      // const querySnapshot =  await query(collection(db, this.collectionName), orderBy("createdDate"));
      for (const doc of querySnapshot.docs) {
        todos.push({
          ...doc.data(),
          id: doc.id,
        } as Todo);
      }
    } catch (e) {
      // console.error('Error getAll document: ', e);
      throw new Error(e as string);
    }
    // TODO fix sort
    return todos.sort(
      (a: Todo, b: Todo) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  }
}
