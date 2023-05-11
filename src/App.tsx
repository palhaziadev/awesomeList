import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};
const ProfileScreen = ({navigation, route}) => {
  return (
    <>
      {/* <Text>This is {route.params.name}'s profile</Text> */}
      <Button
        title="Go to main"
        onPress={() => navigation.navigate('Home', { name: 'Home' })} />
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app3!</Text>
        <StatusBar style="auto" />
        <Button
          onPress={() => Alert.alert('Simple Button pressed')}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View> */}
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