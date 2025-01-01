import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { User } from '../model/User';

export class UserRepository {
  private readonly collectionName = 'awesomeLists';
  getOne(
    email: string
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return firestore().collection('awesomeLists').where('email', '==', email);
  }

  async create(newUser: Partial<User>): Promise<User> {
    let docRef;
    try {
      docRef = await firestore().collection(this.collectionName).doc();
      docRef.set({
        ...newUser,
        userId: docRef.id,
      });
    } catch (e) {
      throw new Error(e as string);
    }
    const addedUser = docRef.get()?.data();
    return addedUser;
  }
}
