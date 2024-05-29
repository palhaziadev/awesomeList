import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TodoList } from '../../model/Todo';
import { GLOBAL_STYLES } from '../../constants/styles';
import Button from '../shared/Button';

type TodoListElement = {
  list: TodoList;
  remove: (id: string) => void;
  onPress?: () => void;
};

export default function TodoListElement({
  list,
  remove,
  onPress,
}: TodoListElement) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.textContainer} onPress={onPress}>
        <Text style={styles.text}>{list.listName}</Text>
      </TouchableOpacity>
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
  textContainer: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    borderTopLeftRadius: GLOBAL_STYLES.border.radius,
    borderBottomLeftRadius: GLOBAL_STYLES.border.radius,
  },
  text: {
    flex: 1,
    fontSize: GLOBAL_STYLES.font.size.normal,
    textAlignVertical: 'center',
  },
  remove: {},
  removeText: {
    color: '#ffffff',
  },
});
