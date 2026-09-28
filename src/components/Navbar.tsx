import React, { useState } from 'react';
import type { useApp } from '../context/AppContext.tsx';
import type { Logo } from './Logo.tsx';
import type {
  Compass,
  Cpu,
  Brain,
  Palette,
  Globe,
  Award,
  BarChart3,
  Settings,
  LogOut,
  Flame,
  ChevronDown,
  UserPlus,
  Sparkles,
  ShieldCheck,
  Rocket
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    childrenList,
    selectedChild,
    selectedChildProgress,
    mode,
    setMode,
    currentPath,
    navigate,
    selectChild,
    logout
  } = useApp();

  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);

  if (!user || currentPath === '/login') return null;

  const parentNavLinks = [
    { label: 'Tableau de bord', path: '/dashboard', icon: BarChart3 },
    { label: 'Progression', path: '/progression', icon: Compass },
    { label: 'Conseils Parent', path: '/parent', icon: ShieldCheck },
    { label: 'Paramètres', path: '/settings', icon: Settings },
  ];

  const childNavLinks = [
    { label: 'Mon Aventure', path: '/child', icon: Rocket },
    { label: 'Logique', path: '/logic', icon: Brain },
    { label: 'Code Kids', path: '/code', icon: Cpu },
    { label: 'AI Explorer', path: '/ai', icon: Sparkles },
    { label: 'Creative Lab', path: '/creative', icon: Palette },
    { label: 'Culture Numérique', path: '/digital', icon: Globe },
    { label: 'Mes Badges', path: '/badges', icon: Award },
  ];

  const navLinks = mode === 'parent' ? parentNavLinks : childNavLinks;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => navigate(mode === 'parent' ? '/dashboard' : '/child')}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0"
          >
            <Logo size="sm" />
          </div>

          {/* Mode Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => setMode('parent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'parent'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👨‍👩‍👧</span>
              <span className="hidden md:inline">Mode</span> Parent
            </button>
            <button
              onClick={() => setMode('child')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'child'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs animate-pulse-subtle'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚀</span>
              <span className="hidden md:inline">Espace</span> Enfant
            </button>
          </div>

          {/* Navigation Links for Large Screens */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? mode === 'child'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? (mode === 'child' ? 'text-amber-600' : 'text-blue-600') : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Child Selector, Streak, Level, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Child Profile Dropdown */}
            {selectedChild && (
              <div className="relative">
                <button
                  onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left"
                >
                  <span className="text-xl sm:text-2xl leading-none">{selectedChild.avatar}</span>
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {selectedChild.name}
                    </div>
                    <div className="text-[10px] font-semibold text-blue-600 flex items-center gap-1">
                      <span>Niv. {selectedChild.level}</span>
                      <span className="text-slate-300">•</span>
                      <span>{selectedChild.xp} XP</span>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isChildDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Profils des enfants
                    </div>
                    {childrenList.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          selectChild(c.id);
                          setIsChildDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors ${
                          selectedChild.id === c.id ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{c.avatar}</span>
                          <div>
                            <div className="text-sm font-bold">{c.name}</div>
                            <div className="text-xs text-slate-500">{c.age} ans • Niveau {c.level}</div>
                          </div>
                        </div>
                        {selectedChild.id === c.id && (
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </button>
                    ))}
                    <div className="border-t border-slate-100 mt-2 pt-2 px-2">
                      <button
                        onClick={() => {
                          setIsChildDropdownOpen(false);
                          navigate('/settings');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-cyan-700 hover:bg-cyan-50 rounded-xl transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        Ajouter un profil enfant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Streak flame indicator */}
            {selectedChild && (
              <div
                title={`Série de ${selectedChild.streak} jour(s) consécutif(s)`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs sm:text-sm font-extrabold"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span>{selectedChild.streak}j</span>
              </div>
            )}

            {/* Logout button */}
            <button
              onClick={logout}
              title="Se déconnecter"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 no-scrollbar border-t border-slate-100">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? mode === 'child'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
