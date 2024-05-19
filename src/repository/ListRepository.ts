import { db } from '../../firebase.config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { List } from '../model/List';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export class ListRepository {
  private readonly collectionName = 'awesomeLists';

  queryList(): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return firestore().collection('awesomeLists').orderBy('createdAt', 'desc');
  }

  async delete(id: string): Promise<void> {
    console.log('aaa remove', id);
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (e) {
      // console.log('Error removing document: ', e);
      throw new Error(e as string);
    }
  }

  async create(newList: List): Promise<List> {
    let docRef;
    try {
      docRef = await addDoc(collection(db, this.collectionName), newList);
    } catch (e) {
      // console.error('Error adding document: ', e);
      throw new Error(e as string);
    }
    return {
      ...newList,
      listId: docRef?.id,
    };
  }

  async getAll(): Promise<List[]> {
    const lists: List[] = [];
    try {
      const querySnapshot = await firestore()
        .collection(this.collectionName)
        .orderBy('listId')
        .get();
      for (const doc of querySnapshot.docs) {
        console.log(
          'aaa ------------------------',
          doc.data(),
          doc.id,
          doc.ref.id
        );
        lists.push({
          ...doc.data(),
          listId: doc.id,
        } as List);
      }
    } catch (e) {
      // console.error('Error getAll document: ', e);
      throw new Error(e as string);
    }
    return lists;
  }
}
