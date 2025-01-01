import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TodoItem, TodoList } from '../model/Todo';
import { TodoItemRepository } from '../repository/TodoItemRepository';

export class TodoItemService {
  repository = new TodoItemRepository();

  queryItem(
    list: TodoList
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.repository.queryItem(list);
  }

  async addTodoItem(listItem: TodoItem): Promise<TodoItem> {
    return this.repository.create(listItem);
  }

  // TODO not tested
  async deleteTodoItem(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  // TODO not used
  async updateTodoItem(id: string, props: Partial<TodoItem>) {
    // TODO
    // return this.repository.update(id, props);
  }
}
