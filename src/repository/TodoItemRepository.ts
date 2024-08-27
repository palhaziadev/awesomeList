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

  // TODO check both repository if functions works correctly + when adding set the ID correctly
  async delete(id: string): Promise<void> {
    try {
      await firestore().collection(this.collectionName).doc(id).delete();
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async create(newListItem: TodoItem): Promise<TodoItem> {
    let docRef;
    try {
      docRef = await firestore()
        .collection(this.collectionName)
        .add(newListItem);
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
