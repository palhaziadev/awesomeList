import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Todo, TodoRepository } from '../../TodoRepository';
import useGoogleLogin from '../../services/AuthGoogle';
import { useAuthContext } from '../../context/useAuthContext';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useAuthContext();
  const repo = new TodoRepository();
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleLogin = (user: FirebaseAuthTypes.User): void => {
    console.log('aaa handle', user);
    if (!user) return;
    setUser({
      uid: user.uid,
      displayName: `${user.displayName}`,
      email: `${user.email}`,
      photoURL: `${user.photoURL}`,
    });
  };

  const { googleSignIn, googleLogOut } = useGoogleLogin(handleLogin);

  useEffect(() => {
    const fetchData = async () => {
      const data = await repo.getAll();
      // console.log('aaa', data);
      setTodos(data);
    };
    fetchData();
  }, []);

  const logout = () => {
    googleLogOut().then(() => {
      setUser(null);
      console.log('User signed out!');
    });
  };

  return (
    <>
      <View>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile', { name: 'user name' })}
        />
        {user ? <Button title="Logout" onPress={() => logout()} /> : null}
      </View>
      <View>
        {!user ? (
          <Button
            title="Google Sign-In"
            onPress={() =>
              googleSignIn().then(
                ({ user }: FirebaseAuthTypes.UserCredential): void => {
                  handleLogin(user);
                }
              )
            }
          />
        ) : (
          <Text>Logged In</Text>
        )}
      </View>
      <View>
        <>
          <Text>{todos.length}</Text>
          {todos.map((todo) => {
            return <Text key={todo.id}>{todo.title}</Text>;
          })}
        </>
      </View>
    </>
  );
}
