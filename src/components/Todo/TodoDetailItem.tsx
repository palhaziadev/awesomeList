import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GLOBAL_STYLES } from '../../constants/styles';
import Button from '../shared/Button';
import { TodoItem } from '../../model/Todo';
import React from 'react';
import Checkbox from 'expo-checkbox';

type ListElement = {
  item: TodoItem;
  handleRemove: (id: string) => void;
  handleIsDone: (item: TodoItem) => void;
};

export default function TodoDetailItem({
  item,
  handleRemove,
  handleIsDone,
}: ListElement) {
  return (
    <View style={[styles.container, item.isDone && styles.containerInverse]}>
      <Checkbox
        style={styles.checkbox}
        value={item.isDone}
        onValueChange={(newValue) =>
          handleIsDone({ ...item, isDone: newValue })
        }
      />
      <TouchableOpacity style={styles.textContainer}>
        <Text style={[styles.text, item.isDone && styles.textInverse]}>
          {item.itemName}
        </Text>
      </TouchableOpacity>
      <Button
        text="Remove"
        style={styles.remove}
        onPress={() => handleRemove(item.itemId)}
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
    paddingLeft: 10,
    borderRadius: GLOBAL_STYLES.border.radius,
    display: 'flex',
  },
  containerInverse: {
    backgroundColor: '#000000',
  },
  checkbox: {},
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
  textInverse: {
    color: '#ffffff',
  },
  remove: {},
  removeText: {
    color: '#ffffff',
  },
});
