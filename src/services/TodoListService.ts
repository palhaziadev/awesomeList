import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TodoList } from '../model/Todo';
import { User } from '../model/User';
import { TodoListRepository } from '../repository/TodoListRepository';

export class TodoListService {
  listRepository = new TodoListRepository();

  queryList(
    user: User
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.listRepository.queryList(user);
  }

  async addList({
    user,
    list: { items, ...listProps }, // exclude items property from creation
  }: {
    user: User;
    list: TodoList;
  }): Promise<TodoList> {
    return this.listRepository.create(user, {
      ...listProps,
      createdAt: new Date().toISOString(),
      createdBy: `${user?.email}`,
    });
  }

  async deleteList(user: User, listId: string): Promise<void> {
    return this.listRepository.delete(user, listId);
  }

  async updateList(id: string, props: Partial<TodoList>) {
    // TODO
    // return this.repository.update(id, props);
  }
}
