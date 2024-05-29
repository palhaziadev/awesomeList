import { useEffect, useState } from 'react';
import { TodoListService } from '../services/TodoListService';
import { TodoList } from '../model/Todo';

export function useSubscribeList() {
  const listService = new TodoListService();
  const [lists, setLists] = useState<TodoList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = listService.queryList().onSnapshot((querySnapshot) => {
      const lists: TodoList[] = [];

      querySnapshot.forEach((documentSnapshot) => {
        lists.push({
          ...(documentSnapshot.data() as TodoList),
          listId: documentSnapshot.id,
          key: documentSnapshot.id,
        });
      });
      setLists(lists);
      setIsLoading(false);
    });
    return () => {
      return subscriber();
    };
  }, []);

  return { lists, isLoading };
}
