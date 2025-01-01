import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/shared/Button';
import InputField from '../../components/shared/InputField';
import { TodoItem } from '../../model/Todo';
import TodoDetailItem from '../../components/Todo/TodoDetailItem';
import { useAuthContext } from '../../context/useAuthContext';
import { useSubscribeListItem } from '../../hooks/useSubscribeListItems';
import { TodoItemService } from '../../services/TodoItemService';
import { ListScreenProps } from '../../App';
import { TranslationService } from '../../services/TranslationService';
import { TodoListItemService } from '../../services/TodoListItemService';

const defaultItem = {
  createdAt: '',
  createdBy: '',
  itemId: '0',
  itemName: '',
};

export default function TodoDetailsScreen({
  navigation,
  route: {
    params: { list },
  },
}: ListScreenProps) {
  const { user } = useAuthContext();
  const itemService = new TodoItemService();
  const listItemService = new TodoListItemService();
  const translationService = new TranslationService();
  const { isLoading, listItems } = useSubscribeListItem(list);
  const [newItem, setNewItem] = useState<TodoItem>(defaultItem);

  const addItem = async () => {
    if (!user) return;
    const translation = await translationService.getTextTranslation(
      newItem.itemName
    );
    const addedItem = await itemService.addTodoItem({
      ...newItem,
      createdAt: new Date().toISOString(),
      createdBy: `${user?.email}`,
      translation: translation,
    });
    listItemService.addItem({ user, list, addedItem });
    setNewItem(defaultItem);
  };

  const removeItem = (itemId) => {
    listItemService.deleteListItem({ list, itemId });
  };

  const handleIsDone = (item: TodoItem) => {
    if (!user) return;
    listItemService.setItemIsDone({ user, list, item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.newSection}>
        <InputField
          style={styles.newSectionInput}
          value={newItem.itemName}
          palceholder="Enter list name"
          onChangeText={(listName) => {
            setNewItem({ ...newItem, itemName: listName });
          }}
        ></InputField>
        <Button text="Add Item" onPress={() => addItem()}></Button>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ gap: 10 }}
        data={listItems}
        ListEmptyComponent={<Text>No item created, create one...</Text>}
        renderItem={({ item }) => (
          <TodoDetailItem
            item={item}
            handleRemove={removeItem}
            handleIsDone={handleIsDone}
          ></TodoDetailItem>
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
