import { useEffect, useState } from 'react';
import { TodoListService } from '../services/TodoListService';
import { TodoList } from '../model/Todo';
import { useAuthContext } from '../context/useAuthContext';

export function useSubscribeList() {
  const { user } = useAuthContext();
  const listService = new TodoListService();
  const [lists, setLists] = useState<TodoList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const subscriber = listService
      .queryList(user)
      .onSnapshot((querySnapshot) => {
        const lists: TodoList[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            ...(documentSnapshot.data() as TodoList),
            listId: documentSnapshot.id,
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
