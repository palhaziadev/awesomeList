import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { GLOBAL_STYLES } from '../constants/styles';

type InputField = {
  value: string;
  palceholder?: string;
  onChangeText: (value) => void;
} & TextInputProps;

export default function InputField({
  value,
  palceholder,
  onChangeText,
  ...props
}: InputField) {
  return (
    <View style={props.style}>
      <View style={styles.container}>
        <Text style={styles.label}>List Name</Text>
        <TextInput
          style={styles.field}
          placeholder={palceholder}
          value={value}
          onChangeText={(value) => onChangeText(value)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderColor: '#B2B2B2',
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: GLOBAL_STYLES.font.size.small,
    borderRadius: GLOBAL_STYLES.border.radius,
    padding: GLOBAL_STYLES.spacing.medium,
  },
  label: {
    color: GLOBAL_STYLES.colors.brandPrimary,
  },
  field: {
    fontSize: GLOBAL_STYLES.font.size.normal,
  },
});
