
import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, isUserAdmin } from '../lib/appwrite';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  checkUserStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = async () => {
    try {
      const currentUser = await account.get();
      setUser({
        $id: currentUser.$id,
        name: currentUser.name,
        email: currentUser.email,
        prefs: currentUser.prefs,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const value = {
    user,
    isAdmin: user ? isUserAdmin(user.email) : false,
    loading,
    checkUserStatus,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
