import { ReactNode, createContext, useContext, useState } from 'react';

interface IUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface IAuthContext {
  user: IUser | null;
  setUser(user: IUser | null): void;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
