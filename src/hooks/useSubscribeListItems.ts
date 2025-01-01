import { useEffect, useState } from 'react';
import { TodoListItemService } from '../services/TodoListItemService';
import { TodoItem, TodoList } from '../model/Todo';

export function useSubscribeListItem(list: TodoList) {
  const todoListItemService = new TodoListItemService();
  const [listItems, setListItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = todoListItemService
      .queryListItems(list)
      .onSnapshot((querySnapshot) => {
        const listItems: TodoItem[] = [];
        for (const doc of querySnapshot.docs) {
          listItems.push(doc.data() as TodoItem);
        }
        listItems?.sort((a, b) => (a.isDone ? 1 : -1));
        setListItems(listItems);
        setIsLoading(false);
      });
    return () => {
      return subscriber();
    };
  }, []);

  return { listItems, isLoading };
}
