import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import { GLOBAL_STYLES } from '../constants/styles';

type Button = {
  text: string;
  onPress: () => void;
} & TouchableOpacityProps;

export default function Button({ text, onPress, ...props }: Button) {
  return (
    <View style={props.style}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress()}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 40,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: GLOBAL_STYLES.colors.brandPrimary,
    fontSize: GLOBAL_STYLES.font.size.small,
    borderRadius: GLOBAL_STYLES.border.radius,
    padding: GLOBAL_STYLES.spacing.medium,
  },
  text: {
    alignSelf: 'center',
    color: GLOBAL_STYLES.colors.white,
  },
});
