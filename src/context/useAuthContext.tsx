import { getAuth } from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../model/User';
import { UserService } from '../services/UserService';

export interface IAuthContext {
  user: User | null;
  setUser(user: User | null): void;
}

const AuthContext = createContext<IAuthContext | null>(null);
AuthContext.displayName = 'AuthContext';

export function useAuthContext() {
  const context = useContext(AuthContext) as IAuthContext;
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }

  return context;
}

// TODO if no user pop login screen?

export function AuthProvider({ children }: { children: ReactNode }) {
  const userService = new UserService();
  const [user, setUser] = useState<User | null>(null);

  async function onAuthStateChanged(user) {
    if (user.email) {
      const userDoc = await userService.getUser(user.email).get();
      const userData = userDoc?.docs?.[0]?.data() as User;
      if (userData) {
        setUser({
          ...userData,
          userId: userDoc?.docs?.[0].id,
        });
      }
    } else {
      console.log('User not found!');
      setUser(user);
    }
  }

  useEffect(() => {
    getAuth();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
