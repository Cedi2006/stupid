import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SAMPLE_USERS } from '../data/mockData.js';

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
  
}

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Storage utilities
const STORAGE_KEY = 'linkedout_current_user';

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Handle storage errors
  }
};

const getUsers = () => {
  try {
    const stored = localStorage.getItem('linkedout_users');
    return stored ? JSON.parse(stored) : SAMPLE_USERS;
  } catch {
    return SAMPLE_USERS;
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem('linkedout_users', JSON.stringify(users));
  } catch {
    // Handle storage errors
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: storedUser });
    }

    // Initialize users in localStorage if not exists
    const users = getUsers();
    if (users === SAMPLE_USERS) {
      saveUsers(SAMPLE_USERS);
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      setStoredUser(user);
      return { success: true };
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, message: 'Email ou mot de passe incorrect' };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return { success: false, message: 'Cet email est déjà utilisé' };
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      unemploymentStart: new Date().toISOString().split('T')[0],
      avatar: '',
      skills: [],
      connections: [],
      badges: [],
      bio: '',
      failures: [],
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    setStoredUser(newUser);
    
    return { success: true };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setStoredUser(null);
  };

  const updateUser = (userData) => {
    if (!state.user) return;

    const updatedUser = { ...state.user, ...userData };
    dispatch({ type: 'UPDATE_USER', payload: userData });
    setStoredUser(updatedUser);

    // Update user in users list
    const users = getUsers();
    const updatedUsers = users.map(u => u.id === state.user?.id ? updatedUser : u);
    saveUsers(updatedUsers);
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};