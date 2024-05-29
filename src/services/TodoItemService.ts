import { TodoItem, TodoList } from '../model/Todo';
import { TodoItemRepository } from '../repository/TodoItemRepository';

export class TodoItemService {
  repository = new TodoItemRepository();

  queryItem(list: TodoList): ReturnType<typeof this.repository.queryItem> {
    return this.repository.queryItem(list);
  }

  async getTodoItems(): Promise<TodoItem[]> {
    return this.repository.getAll();
  }

  async addTodoItem(listItem: TodoItem): Promise<TodoItem> {
    return this.repository.create(listItem);
  }

  async updateTodoItem(id: string, props: Partial<TodoItem>) {
    // TODO
    // return this.repository.update(id, props);
  }

  async deleteTodoItem(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
