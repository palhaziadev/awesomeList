import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { TodoItem, TodoList } from '../model/Todo';
import { User } from '../model/User';

export class TodoListItemRepository {
  private readonly collectionName = 'awesomeLists';
  private readonly listCollectionName = 'todoLists';
  private readonly itemCollectionName = 'items';

  queryListItems(
    list: TodoList
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return (
      firestore()
        .collection(this.collectionName)
        .doc(list.owner)
        .collection(this.listCollectionName)
        .doc(list.listId)
        .collection(this.itemCollectionName)
        // .orderBy('isDone', 'asc')
        .orderBy('createdAt', 'desc')
    );
  }

  async deleteListItem(list: TodoList, itemId: string): Promise<void> {
    const doc = await firestore()
      .collection(this.collectionName)
      .doc(list.owner)
      .collection(this.listCollectionName)
      .doc(list.listId)
      .collection(this.itemCollectionName)
      .doc(itemId)
      .get();
    doc.ref.delete();
  }

  async addListItem(
    user: User,
    list: TodoList,
    listItem: TodoItem
  ): Promise<void> {
    try {
      const docRef = await firestore()
        .collection(this.collectionName)
        .doc(user.userId)
        .collection(this.listCollectionName)
        .doc(list.listId)
        .collection(this.itemCollectionName)
        .doc();
      docRef.set({
        ...listItem,
        itemId: docRef.id,
      });
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async setItemIsDone(list: TodoList, item: TodoItem): Promise<void> {
    try {
      const querySnapshot = await firestore()
        .collection(this.collectionName)
        .doc(list.owner)
        .collection(this.listCollectionName)
        .doc(list.listId)
        .collection(this.itemCollectionName)
        .doc(item.itemId)
        .get();
      querySnapshot.ref.set(item);
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
