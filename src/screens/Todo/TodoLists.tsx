import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuthContext } from '../../context/useAuthContext';
import { TodoList } from '../../model/Todo';
import InputField from '../../components/shared/InputField';
import Button from '../../components/shared/Button';
import { TodoListService } from '../../services/TodoListService';
import { useSubscribeList } from '../../hooks/useSubscribeLists';
import TodoListElement from '../../components/Todo/TodoListElement';

// TODO create interface? and create class for this? new List()?
// TODO check database layer how it is recommended to do (next-practice)
const defaultList: TodoList = {
  owner: '',
  items: [],
  createdAt: '',
  createdBy: '',
  listId: '0',
  listName: '',
};

export default function TodoListsScreen({ navigation }) {
  const { user } = useAuthContext();
  const listService = new TodoListService();
  const [newList, setNewList] = useState<TodoList>(defaultList);
  const { isLoading, lists } = useSubscribeList();

  const addList = () => {
    if (!user) return;
    listService.addList({ user, list: newList });
    setNewList(defaultList);
  };

  const removeList = (listId) => {
    if (!user) return;
    listService.deleteList(user, listId);
  };

  const handleOnPressListElement = (list: TodoList) => {
    navigation.navigate('List', { list });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonSection}>
        <Button text="Home" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.buttonSection}>
        <Button
          text="Profile"
          onPress={() => navigation.navigate('Profile', { name: 'user name' })}
        />
      </View>
      <View style={styles.newSection}>
        <InputField
          style={styles.newSectionInput}
          value={newList.listName}
          palceholder="Enter list name"
          onChangeText={(listName) => {
            setNewList({ ...newList, listName: listName });
          }}
        ></InputField>
        <Button text="Add List" onPress={() => addList()}></Button>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ gap: 10 }}
        data={lists}
        ListEmptyComponent={<Text>No list created, create one...</Text>}
        renderItem={({ item }) => (
          <TodoListElement
            list={item}
            remove={removeList}
            onPress={() => handleOnPressListElement(item)}
          ></TodoListElement>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  list: {
    // margin: 10,
  },
  buttonSection: {
    height: 40,
    marginBottom: 10,
  },
  newSection: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  newSectionInput: {
    flex: 1,
    width: 100,
    marginRight: 10,
  },
});
