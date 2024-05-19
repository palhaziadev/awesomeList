import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuthContext } from '../../context/useAuthContext';
import { List } from '../../model/List';
import ListElement from '../../components/List/ListElement';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { ListService } from '../../services/ListService';
import { useSubscribeList } from '../../hooks/useSubscribeLists';

// TODO check database layer how it is recommended to do (next-practice)
const defaultList = {
  users: [],
  createdAt: '',
  createdBy: '',
  listId: '0',
  listName: '',
};

export default function ListScreen({ navigation }) {
  const { user } = useAuthContext();
  const listService = new ListService();
  const [newList, setNewList] = useState<List>(defaultList);
  const { isLoading, lists } = useSubscribeList();

  const addList = () => {
    listService.addList({
      ...newList,
      createdAt: new Date().toISOString(),
      createdBy: `${user?.uid}`,
    });
    setNewList(defaultList);
  };

  const removeList = (listId) => {
    listService.deleteList(listId);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
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
          <ListElement list={item} remove={removeList}></ListElement>
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
  profileSection: {
    height: 40,
  },
  newSection: {
    marginTop: 10,
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
