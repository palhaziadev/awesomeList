import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import ProfileScreen from './screens/Profile/Profile';
import { AuthProvider } from './context/useAuthContext';
import TodoDetailScreen from './screens/Todo/TodoDetail';
import TodoListsScreen from './screens/Todo/TodoLists';
import { TodoList } from './model/Todo';

type StackParamList = {
  Profile: undefined;
  Lists: undefined;
  List: { list: TodoList };
};
export type ListScreenProps = NativeStackScreenProps<StackParamList, 'List'>;

export type ListScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'List'
>;

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen name="Lists" component={TodoListsScreen} />
          <Stack.Screen name="List" component={TodoDetailScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);
