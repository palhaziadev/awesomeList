import { Button, Text, View } from 'react-native';
import useGoogleLogin from '../../services/AuthGoogle';
import { useAuthContext } from '../../context/useAuthContext';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useAuthContext();

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

  const logout = () => {
    googleLogOut().then(() => {
      setUser(null);
      console.log('User signed out!');
    });
  };

  return (
    <>
      <View>
        {user ? (
          <>
            <Button
              title="Profile"
              onPress={() =>
                navigation.navigate('Profile', { name: 'user name' })
              }
            />
            <Button title="Logout" onPress={() => logout()} />
          </>
        ) : null}
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
          <Text>TODO</Text>
        </>
      </View>
    </>
  );
}
