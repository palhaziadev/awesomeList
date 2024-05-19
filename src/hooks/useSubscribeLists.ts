import { useEffect, useState } from 'react';
import { ListService } from '../services/ListService';
import { List } from '../model/List';

export function useSubscribeList() {
  const listService = new ListService();
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = listService.queryList().onSnapshot((querySnapshot) => {
      const lists: List[] = [];

      querySnapshot.forEach((documentSnapshot) => {
        lists.push({
          ...(documentSnapshot.data() as List),
          // TODO delete with docId or use added+generated id by me??
          listId: documentSnapshot.id,
          key: documentSnapshot.id,
        });
      });

      console.log('aaa list', lists);

      setLists(lists);
      setIsLoading(false);
    });
    return () => {
      console.log('aaa unsubs');
      return subscriber();
    };
  }, []);

  return { lists, isLoading };
}
