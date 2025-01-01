import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthContext } from '../../context/useAuthContext';
import React from 'react';

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useAuthContext();

  // TODO implement TodoItem functions here so I can delete items for testing purpose

  return (
    <>
      <Button
        title="Go to main"
        onPress={() => navigation.navigate('Home', { name: 'Home' })}
      />
      <View>
        <Text>
          Welcome {user?.email}, {user?.profile?.userName}, {user?.userId},{' '}
          {user?.profile?.userPhoto}
        </Text>
      </View>
    </>
  );
}
