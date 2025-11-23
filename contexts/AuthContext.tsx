import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../lib/appwrite';
import { Models } from 'appwrite';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  isAdmin: boolean;
  checkUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkUser = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
      setIsAdmin(accountDetails.email === 'admin@gmail.com');
    } catch (error) {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, checkUser, logout }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
