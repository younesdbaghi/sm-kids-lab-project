import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Child, Badge, LevelProgress } from '../../shared/types.ts';
import { api } from '../services/api.ts';
import { calculateLevelFromXp } from '../../shared/progression.ts';

export type AppMode = 'parent' | 'child';

export interface AppNotification {
  id: string;
  type: 'level_up' | 'badge' | 'xp' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface AppContextType {
  user: User | null;
  token: string | null;
  childrenList: Child[];
  selectedChild: Child | null;
  selectedChildProgress: LevelProgress | null;
  mode: AppMode;
  currentPath: string;
  isLoading: boolean;
  notifications: AppNotification[];
  celebrationData: {
    show: boolean;
    levelUp?: boolean;
    newLevel?: number;
    xpEarned?: number;
    badges?: Badge[];
  } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setMode: (mode: AppMode) => void;
  navigate: (path: string) => void;
  selectChild: (childId: string) => void;
  createChild: (name: string, age: number, avatar: string) => Promise<Child>;
  updateChild: (id: string, updates: Partial<Child>) => Promise<Child>;
  deleteChild: (id: string) => Promise<boolean>;
  refreshChildData: () => Promise<void>;
  dismissCelebration: () => void;
  triggerCelebration: (data: { levelUp?: boolean; newLevel?: number; xpEarned?: number; badges?: Badge[] }) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp'>) => void;
  dismissNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(api.getToken());
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [mode, setModeState] = useState<AppMode>('parent');
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname === '/' ? '/login' : window.location.pathname);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [celebrationData, setCelebrationData] = useState<{
    show: boolean;
    levelUp?: boolean;
    newLevel?: number;
    xpEarned?: number;
    badges?: Badge[];
  } | null>(null);

  // Sync browser path
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to 401 unauthorized
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
      navigate('/login');
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  // Initial load
  useEffect(() => {
    async function initAuth() {
      const storedToken = api.getToken();
      if (!storedToken) {
        setIsLoading(false);
        if (currentPath !== '/login') navigate('/login');
        return;
      }

      try {
        const data = await api.getMe();
        setUser(data.user);
        setChildrenList(data.children || []);
        if (data.children && data.children.length > 0) {
          setSelectedChildId(data.children[0].id);
        }
        if (currentPath === '/login' || currentPath === '/') {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Session invalide au démarrage:', err);
        api.clearToken();
        setToken(null);
        setUser(null);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await api.login(username, password);
      setUser(data.user);
      setToken(data.token);
      setChildrenList(data.children || []);
      if (data.children && data.children.length > 0) {
        setSelectedChildId(data.children[0].id);
      }
      setModeState('parent');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setToken(null);
    setChildrenList([]);
    setSelectedChildId(null);
    navigate('/login');
  };

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    if (newMode === 'child') {
      navigate('/child');
    } else {
      navigate('/dashboard');
    }
  };

  const selectChild = (childId: string) => {
    setSelectedChildId(childId);
  };

  const createChild = async (name: string, age: number, avatar: string) => {
    const newChild = await api.createChild({ name, age, avatar });
    setChildrenList(prev => [...prev, newChild]);
    setSelectedChildId(newChild.id);
    addNotification({
      type: 'info',
      title: 'Nouveau profil créé',
      message: `Bienvenue à ${newChild.name} dans le Smart Kids Lab !`
    });
    return newChild;
  };

  const updateChild = async (id: string, updates: Partial<Child>) => {
    const updated = await api.updateChild(id, updates);
    setChildrenList(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    addNotification({
      type: 'info',
      title: 'Profil mis à jour',
      message: `Les modifications pour ${updated.name} ont été enregistrées.`
    });
    return updated;
  };

  const deleteChild = async (id: string) => {
    const target = childrenList.find(c => c.id === id);
    const childName = target ? target.name : 'Profil';
    await api.deleteChild(id);
    setChildrenList(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (selectedChildId === id) {
        setSelectedChildId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
    addNotification({
      type: 'info',
      title: 'Profil supprimé',
      message: `Le profil de ${childName} a été supprimé.`
    });
    return true;
  };

  const refreshChildData = async () => {
    if (!selectedChildId) return;
    try {
      const updated = await api.getChild(selectedChildId);
      setChildrenList(prev => prev.map(c => c.id === updated.id ? updated : c));
    } catch (e) {
      console.error('Erreur rafraîchissement enfant:', e);
    }
  };

  const selectedChild = childrenList.find(c => c.id === selectedChildId) || childrenList[0] || null;
  const selectedChildProgress = selectedChild ? calculateLevelFromXp(selectedChild.xp).progress : null;

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const triggerCelebration = (data: { levelUp?: boolean; newLevel?: number; xpEarned?: number; badges?: Badge[] }) => {
    setCelebrationData({ show: true, ...data });
  };

  const dismissCelebration = () => {
    setCelebrationData(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        childrenList,
        selectedChild,
        selectedChildProgress,
        mode,
        currentPath,
        isLoading,
        notifications,
        celebrationData,
        login,
        logout,
        setMode,
        navigate,
        selectChild,
        createChild,
        updateChild,
        deleteChild,
        refreshChildData,
        triggerCelebration,
        dismissCelebration,
        addNotification,
        dismissNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp doit être utilisé à l’intérieur d’un AppProvider');
  return context;
};
