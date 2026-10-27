import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('exercise26-user')) || null; }
    catch { return null; }
  });

  function login(name) {
    const nextUser = { name: name.trim() || 'Writer' };
    setUser(nextUser);
    try { localStorage.setItem('exercise26-user', JSON.stringify(nextUser)); } catch { /* Storage is optional. */ }
  }

  function logout() {
    setUser(null);
    try { localStorage.removeItem('exercise26-user'); } catch { /* Storage is optional. */ }
  }

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
