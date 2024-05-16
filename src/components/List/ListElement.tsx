import { StyleSheet, Text, View } from 'react-native';
import { List } from '../../model/List';
import { GLOBAL_STYLES } from '../../constants/styles';
import Button from '../Button';

type ListElement = {
  list: List;
  remove: (id: string) => void;
};

export default function ListElement({ list, remove }: ListElement) {
  return (
    <View style={styles.container}>
      {/* <Text>User ID: {list.listId}</Text> */}
      <Text style={styles.text}>{list.listName}</Text>
      <Button
        text="Remove"
        style={styles.remove}
        onPress={() => remove(list.listId)}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: GLOBAL_STYLES.border.radius,
    display: 'flex',
  },
  text: {
    fontSize: GLOBAL_STYLES.font.size.normal,
    paddingLeft: 10,
  },
  remove: {},
  removeText: {
    color: '#ffffff',
  },
});
