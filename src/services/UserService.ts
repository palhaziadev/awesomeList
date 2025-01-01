import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { User } from '../model/User';
import { UserRepository } from '../repository/UserRepository';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export class UserService {
  repository = new UserRepository();

  getUser(
    email: string
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.repository.getOne(email);
  }

  createUser(user: FirebaseAuthTypes.User): Promise<User> | undefined {
    if (!user.email) {
      console.log('User not found!');
      return undefined;
    }
    const newUser: Partial<User> = {
      email: user.email,
      googleUid: user.uid,
      createdAt: new Date().toISOString(),
      createdBy: user.email,
      profile: {
        userName: user.displayName ?? '',
        userPhoto: '',
      },
      userId: '',
      // sharedLists: [],
      // todoLists: [],
    };
    return this.repository.create(newUser);
  }
}
