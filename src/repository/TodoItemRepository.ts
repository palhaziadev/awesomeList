import { db } from '../../firebase.config';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { TodoItem } from '../model/Todo';
import firestore from '@react-native-firebase/firestore';
import { TodoList } from '../model/Todo';

export class TodoItemRepository {
  private readonly collectionName = 'awesomeItems';

  queryItem(list: TodoList): any {
    return (
      firestore()
        .collection(this.collectionName)
        .doc(list.listId)
        .collection('items')
        // .orderBy('isDone', 'asc')
        .orderBy('createdAt', 'desc')
    );
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async create(newListItem: TodoItem): Promise<TodoItem> {
    let docRef;
    try {
      docRef = await addDoc(collection(db, this.collectionName), newListItem);
    } catch (e) {
      throw new Error(e as string);
    }
    return {
      ...newListItem,
      itemId: docRef?.id,
    };
  }

  // TODO needed?
  async getAll(): Promise<TodoItem[]> {
    const ListItems: TodoItem[] = [];
    try {
      const querySnapshot = await firestore()
        .collection(this.collectionName)
        .orderBy('ItemId')
        .get();
      for (const doc of querySnapshot.docs) {
        ListItems.push({
          ...doc.data(),
          itemId: doc.id,
        } as TodoItem);
      }
    } catch (e) {
      throw new Error(e as string);
    }
    return ListItems;
  }
}
