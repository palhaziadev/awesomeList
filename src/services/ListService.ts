import { List } from '../model/List';
import { ListRepository } from '../repository/ListRepository';

export class ListService {
  repository = new ListRepository();

  queryList(): ReturnType<typeof this.repository.queryList> {
    return this.repository.queryList();
  }

  async getLists(): Promise<List[]> {
    return this.repository.getAll();
  }

  async addList(newList: List): Promise<List> {
    return this.repository.create(newList);
  }

  async updateList(id: string, props: Partial<List>) {
    // TODO
    // return this.repository.update(id, props);
  }

  async deleteList(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
