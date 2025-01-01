import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { TodoItem, TodoList } from '../model/Todo';
import { User } from '../model/User';
import { TodoListItemRepository } from '../repository/TodoListItemRepository';

export class TodoListItemService {
  listItemRepository = new TodoListItemRepository();

  queryListItems(
    list: TodoList
  ): FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> {
    return this.listItemRepository.queryListItems(list);
  }

  async deleteListItem({
    list,
    itemId,
  }: {
    list: TodoList;
    itemId: string;
  }): Promise<void> {
    return this.listItemRepository.deleteListItem(list, itemId);
  }

  async setItemIsDone({
    user,
    list,
    item,
  }: {
    user: User;
    list: TodoList;
    item: TodoItem;
  }): Promise<void> {
    return this.listItemRepository.setItemIsDone(list, {
      ...item,
      updatedAt: new Date().toISOString(),
      updatedBy: user.email,
    });
  }

  async addItem({
    user,
    list,
    addedItem,
  }: {
    user: User;
    list: TodoList;
    addedItem: TodoItem;
  }): Promise<void> {
    return this.listItemRepository.addListItem(user, list, addedItem);
  }
}
