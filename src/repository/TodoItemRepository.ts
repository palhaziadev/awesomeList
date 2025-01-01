import { TodoItem } from '../model/Todo';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { TodoList } from '../model/Todo';

export class TodoItemRepository {
  private readonly collectionName = 'awesomeItems';

  queryItem(
    list: TodoList
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
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
      docRef = await firestore().collection(this.collectionName).doc();
      await docRef.set({
        ...newListItem,
        itemId: docRef.id,
      });
    } catch (e) {
      throw new Error(e as string);
    }
    const addedItem = (await docRef.get())?.data();
    return addedItem;
  }
}
