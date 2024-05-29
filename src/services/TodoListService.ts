import { TodoItem, TodoList } from '../model/Todo';
import { TodoListRepository } from '../repository/TodoListRepository';

export class TodoListService {
  repository = new TodoListRepository();

  queryList(): ReturnType<typeof this.repository.queryList> {
    return this.repository.queryList();
  }

  queryListItems(
    list: TodoList
  ): ReturnType<typeof this.repository.queryListItems> {
    return this.repository.queryListItems(list);
  }

  async getLists(): Promise<TodoList[]> {
    return this.repository.getAll();
  }

  async addList(newList: TodoList): Promise<TodoList> {
    return this.repository.create(newList);
  }

  async updateList(id: string, props: Partial<TodoList>) {
    // TODO
    // return this.repository.update(id, props);
  }

  async deleteListItem(listId, itemId) {
    return this.repository.deleteListItem(listId, itemId);
  }

  async setItemIsDone(listId, item) {
    return this.repository.setItemIsDone(listId, item);
  }

  async deleteList(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async addItem(list: TodoList, item: TodoItem): Promise<void> {
    return this.repository.addListItem(list, item);
  }
}
