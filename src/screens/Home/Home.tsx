import { Button, StyleSheet, Text, View } from 'react-native';
import useGoogleLogin from '../../services/AuthGoogle';
import { useAuthContext } from '../../context/useAuthContext';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState } from 'react';
import { UserService } from '../../services/UserService';
import { User } from '../../model/User';
import React from 'react';

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useAuthContext();
  const [userData, setUserData] = useState<User | undefined>();
  const userService = new UserService();

  const handleLogin = async (user: FirebaseAuthTypes.User): Promise<void> => {
    if (!user) return;
    if (user.email) {
      const userDoc = await userService.getUser(user.email).get();
      const userData = userDoc?.docs?.[0]?.data() as User;
      if (userData) {
        setUser({
          ...userData,
          userId: userDoc?.docs?.[0].id,
        });
      } else {
        const createdUser = await userService.createUser(user);
        if (createdUser) {
          setUser(createdUser);
        }
      }
    }
  };

  const { googleSignIn, googleLogOut } = useGoogleLogin(handleLogin);

  const logout = () => {
    googleLogOut().then(() => {
      setUser(null);
      console.log('User signed out!');
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {user ? (
          <>
            <View style={styles.buttonSection}>
              <Button
                title="Lists"
                onPress={() => navigation.navigate('Lists')}
              />
            </View>
            <View style={styles.buttonSection}>
              <Button
                title="Profile"
                onPress={() =>
                  navigation.navigate('Profile', { name: 'user name' })
                }
              />
            </View>
            <View style={styles.buttonSection}>
              <Button title="Logout" onPress={() => logout()} />
            </View>
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
      <View>
        <>
          <Text>{JSON.stringify(userData)}</Text>
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  buttonSection: {
    height: 40,
    marginBottom: 10,
  },
});
