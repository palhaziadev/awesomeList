import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useAuthContext } from '../../context/useAuthContext';
import firestore from '@react-native-firebase/firestore';
import { ListRepository } from '../../repository/ListRepository';
import { List } from '../../model/List';
import ListElement from '../../components/List/ListElement';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

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
  const repo = new ListRepository();
  const [newList, setNewList] = useState<List>(defaultList);
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState<List[]>([]);

  //
  // TODO create service

  const addList = () => {
    repo.create({
      ...newList,
      createdAt: new Date().toISOString(),
      createdBy: `${user?.uid}`,
    });
    setNewList(defaultList);
  };

  const removeList = (listId) => {
    repo.delete(listId);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('awesomeLists')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const lists: List[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          lists.push({
            ...(documentSnapshot.data() as List),
            // TODO delete with docId or use added+generated id by me??
            listId: documentSnapshot.id,
            key: documentSnapshot.id,
          });
        });

        setLists(lists);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
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
