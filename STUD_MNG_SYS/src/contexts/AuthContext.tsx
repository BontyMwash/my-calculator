import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  ID: number;
  Name: string;
  Email: string;
  CreateTime: string;
  role?: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isLoading: boolean;
  createUserProfile: (userId: number, profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await window.ezsite.apis.getUserInfo();
        if (!error && data) {
          // Fetch user profile to get role
          const { data: profileData, error: profileError } = await window.ezsite.apis.tablePage(8989, {
            "PageNo": 1,
            "PageSize": 1,
            "Filters": [
            {
              "name": "user_id",
              "op": "Equal",
              "value": data.ID
            }]

          });

          let userRole: UserRole = 'teacher'; // default role
          if (!profileError && profileData?.List?.[0]) {
            userRole = profileData.List[0].role as UserRole;
          }

          const userWithRole = { ...data, role: userRole };
          setUser(userWithRole);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await window.ezsite.apis.login({ email, password });
      if (error) throw new Error(error);

      // Get user info after successful login
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) throw new Error(userError);

      // Fetch user profile to get role
      const { data: profileData, error: profileError } = await window.ezsite.apis.tablePage(8989, {
        "PageNo": 1,
        "PageSize": 1,
        "Filters": [
        {
          "name": "user_id",
          "op": "Equal",
          "value": userInfo.ID
        }]

      });

      let userRole: UserRole = 'teacher'; // default role
      if (!profileError && profileData?.List?.[0]) {
        userRole = profileData.List[0].role as UserRole;
      }

      const userWithRole = { ...userInfo, role: userRole };
      setUser(userWithRole);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await window.ezsite.apis.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { error } = await window.ezsite.apis.register({ email, password });
      if (error) throw new Error(error);

      // Registration successful - user needs to verify email
    } catch (error) {
      throw error;
    }
  };

  const sendResetEmail = async (email: string) => {
    try {
      const { error } = await window.ezsite.apis.sendResetPwdEmail({ email });
      if (error) throw new Error(error);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const { error } = await window.ezsite.apis.resetPassword({ token, password });
      if (error) throw new Error(error);
    } catch (error) {
      throw error;
    }
  };

  const createUserProfile = async (userId: number, profileData: any) => {
    try {
      const { error } = await window.ezsite.apis.tableCreate(8989, {
        user_id: userId,
        role: profileData.role || 'teacher',
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        phone: profileData.phone || '',
        is_active: profileData.is_active !== undefined ? profileData.is_active : true
      });
      if (error) throw new Error(error);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        sendResetEmail,
        resetPassword,
        isAuthenticated,
        isAdmin: user?.role === 'admin',
        isTeacher: user?.role === 'teacher',
        isLoading,
        createUserProfile
      }} data-id="uy929j3m1" data-path="src/contexts/AuthContext.tsx">
      {children}
    </AuthContext.Provider>);

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};