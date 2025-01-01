import { TodoList } from '../model/Todo';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { User } from '../model/User';

export class TodoListRepository {
  private readonly rootCollectionName = 'awesomeLists';
  private readonly listCollectionName = 'todoLists';

  queryList(
    user: User
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return firestore()
      .collection(this.rootCollectionName)
      .doc(user.userId)
      .collection(this.listCollectionName)
      .orderBy('createdAt', 'desc');
  }

  // TODO try cloud functions delete
  // https://firebase.google.com/docs/firestore/solutions/delete-collections
  async delete(user: User, listId: string): Promise<void> {
    try {
      // Get and delete list items first
      (
        await firestore()
          .collection(this.rootCollectionName)
          .doc(user.userId)
          .collection(this.listCollectionName)
          .doc(listId)
          .collection('items')
          .get()
      ).docs.forEach((doc) => {
        doc.ref.delete();
      });
      // Delete the list itself
      await firestore()
        .collection(this.rootCollectionName)
        .doc(user.userId)
        .collection(this.listCollectionName)
        .doc(listId)
        .delete();
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async create(user: User, newList: Partial<TodoList>): Promise<TodoList> {
    let docRef;
    try {
      docRef = await firestore()
        .collection(this.rootCollectionName)
        .doc(user.userId)
        .collection(this.listCollectionName)
        .doc();
      docRef.set({
        ...newList,
        owner: user.userId,
        listId: docRef?.id,
      });
    } catch (e) {
      throw new Error(e as string);
    }
    const addedList = docRef.get()?.data();
    return {
      ...addedList,
      items: [],
    };
  }
}
