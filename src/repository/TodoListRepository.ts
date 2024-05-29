import { db } from '../../firebase.config';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { TodoList } from '../model/Todo';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { TodoItem } from '../model/Todo';

export class TodoListRepository {
  private readonly collectionName = 'awesomeLists';

  queryList(): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return firestore().collection('awesomeLists').orderBy('createdAt', 'desc');
  }

  queryListItems(
    list: TodoList
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return (
      firestore()
        .collection('awesomeLists')
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

  async create(newList: TodoList): Promise<TodoList> {
    let docRef;
    try {
      docRef = await addDoc(collection(db, this.collectionName), newList);
    } catch (e) {
      throw new Error(e as string);
    }
    return {
      ...newList,
      listId: docRef?.id,
    };
  }

  async getAll(): Promise<TodoList[]> {
    const lists: TodoList[] = [];
    try {
      const querySnapshot = await firestore()
        .collection(this.collectionName)
        .orderBy('listId')
        .get();
      for (const doc of querySnapshot.docs) {
        lists.push({
          ...doc.data(),
          listId: doc.id,
        } as TodoList);
      }
    } catch (e) {
      throw new Error(e as string);
    }
    return lists;
  }

  async deleteListItem(listId, itemId) {
    const doc = await firestore()
      .collection(`${this.collectionName}/${listId}/items`)
      .doc(itemId)
      .get();
    doc.ref.delete();
  }

  async addListItem(list: TodoList, listItem: TodoItem): Promise<void> {
    try {
      const asd = await firestore()
        .collection(`${this.collectionName}/${list.listId}/items`)
        .doc(listItem.itemId)
        .set(listItem);
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async setItemIsDone(listId, item: TodoItem) {
    try {
      const querySnapshot = await firestore()
        .collection(`${this.collectionName}/${listId}/items`)
        .doc(item.itemId)
        .get();
      querySnapshot.ref.set(item);
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
