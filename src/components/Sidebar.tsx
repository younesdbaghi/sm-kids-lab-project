import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Logo } from './Logo.tsx';
import { sound } from '../utils/sound.ts';
import {
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
  Rocket,
  Menu,
  X,
  Volume2,
  VolumeX,
  UserCheck,
  PlusCircle,
  Pencil,
  Trash2
} from 'lucide-react';

interface SidebarProps {
  onOpenChildModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
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

  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setIsOpenMobile(false);
  }, [currentPath]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpenMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpenMobile]);

  if (!user || currentPath === '/login') return null;

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playPop();
  };

  interface NavItem {
    label: string;
    path: string;
    icon: Record<string, unknown>;
    badge?: string;
    color?: string;
  }

  const parentNavLinks: NavItem[] = [
    { label: 'Tableau de bord', path: '/dashboard', icon: BarChart3, badge: 'Aperçu' },
    { label: 'Progression & Stats', path: '/progression', icon: Compass },
    { label: 'Conseils Parent', path: '/parent', icon: ShieldCheck },
    { label: 'Gestion Enfants & Réglages', path: '/settings', icon: Settings },
  ];

  const childNavLinks: NavItem[] = [
    { label: 'Mon Aventure', path: '/child', icon: Rocket, color: 'text-amber-500' },
    { label: 'Logique Challenge', path: '/logic', icon: Brain, color: 'text-cyan-500' },
    { label: 'Code Kids', path: '/code', icon: Cpu, color: 'text-blue-500' },
    { label: 'AI Explorer', path: '/ai', icon: Sparkles, color: 'text-purple-500' },
    { label: 'Creative Lab', path: '/creative', icon: Palette, color: 'text-emerald-500' },
    { label: 'Culture Numérique', path: '/digital', icon: Globe, color: 'text-indigo-500' },
    { label: 'Mes Badges', path: '/badges', icon: Award, color: 'text-yellow-500' },
    { label: 'Mon Profil', path: '/profile', icon: UserCheck, color: 'text-rose-500' },
  ];

  const navLinks = mode === 'parent' ? parentNavLinks : childNavLinks;

  const handleNavClick = (path: string) => {
    sound.playPop();
    navigate(path);
    setIsOpenMobile(false);
  };

  const handleModeSwitch = (newMode: 'parent' | 'child') => {
    sound.playSwitch();
    setMode(newMode);
    setIsOpenMobile(false);
  };

  const handleChildSelect = (id: string) => {
    sound.playPop();
    selectChild(id);
    setIsChildDropdownOpen(false);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 📱 TOP BAR FOR MOBILE & TABLETS (Hidden on lg+ desktops)     */}
      {/* ============================================================ */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpenMobile(true)}
            aria-label="Ouvrir le menu"
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div
            onClick={() => handleNavClick(mode === 'parent' ? '/dashboard' : '/child')}
            className="cursor-pointer"
          >
            <Logo size="sm" />
          </div>
        </div>

        {/* Right Info on Mobile Topbar */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* Active Child Avatar pill */}
          {selectedChild && (
            <button
              onClick={() => handleNavClick('/settings')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-left"
            >
              <span className="text-xl animate-bounce-subtle">{selectedChild.avatar}</span>
              <span className="text-xs font-black text-slate-800 hidden sm:inline">{selectedChild.name}</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                Niv.{selectedChild.level}
              </span>
            </button>
          )}

          {/* Mode Badge Indicator */}
          <button
            onClick={() => handleModeSwitch(mode === 'parent' ? 'child' : 'parent')}
            className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all ${
              mode === 'parent'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            {mode === 'parent' ? '👨‍👩‍👧 Parent' : '🚀 Enfant'}
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 📱 MOBILE OVERLAY BACKDROP                                  */}
      {/* ============================================================ */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* ============================================================ */}
      {/* 🖥️ & 📱 MAIN SIDEBAR                                         */}
      {/* ============================================================ */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 shadow-xl lg:shadow-none flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div
            onClick={() => handleNavClick(mode === 'parent' ? '/dashboard' : '/child')}
            className="cursor-pointer transition-transform hover:scale-102 active:scale-98"
          >
            <Logo size="sm" />
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Activer le son' : 'Couper le son'}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-600" />}
            </button>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin">
          
          {/* MODE SWITCHER (Segmented control) */}
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/90">
            <div className="grid grid-cols-2 gap-1 text-center">
              <button
                type="button"
                onClick={() => handleModeSwitch('parent')}
                className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === 'parent'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>👨‍👩‍👧</span>
                <span>Parent</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeSwitch('child')}
                className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === 'child'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm animate-pulse-subtle'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>🚀</span>
                <span>Enfant</span>
              </button>
            </div>
          </div>

          {/* ACTIVE CHILD CARD WITH QUICK SWITCHER */}
          {selectedChild ? (
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                    <span className="hover:scale-115 transition-transform cursor-pointer">
                      {selectedChild.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800 leading-tight">
                      {selectedChild.name}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold">
                      {selectedChild.age} ans
                    </div>
                  </div>
                </div>

                {/* Child Switcher Button */}
                <button
                  type="button"
                  onClick={() => setIsChildDropdownOpen(!isChildDropdownOpen)}
                  className="px-2 py-1 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Changer</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>

              {/* XP and Level Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-blue-700">Niveau {selectedChild.level}</span>
                  <span className="text-slate-500">{selectedChild.xp} XP</span>
                </div>
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${selectedChildProgress ? Math.min(100, Math.max(5, selectedChildProgress.progressPercent)) : 5}%`
                    }}
                  />
                </div>
              </div>

              {/* Fire streak */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce-subtle" />
                  <span>Série : {selectedChild.streak || 1} j</span>
                </span>
                <button
                  onClick={() => handleNavClick('/settings')}
                  className="text-[11px] font-bold text-cyan-600 hover:underline flex items-center gap-1"
                >
                  <Pencil className="w-2.5 h-2.5" />
                  <span>Gérer</span>
                </button>
              </div>

              {/* DROPDOWN OF CHILDREN PROFILES */}
              {isChildDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Changer de profil
                  </div>
                  {childrenList.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleChildSelect(c.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedChild.id === c.id ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.avatar}</span>
                        <div>
                          <div className="text-xs font-black">{c.name}</div>
                          <div className="text-[10px] text-slate-400">{c.age} ans • Niv. {c.level}</div>
                        </div>
                      </div>
                      {selectedChild.id === c.id && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                  
                  <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChildDropdownOpen(false);
                        handleNavClick('/settings');
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-bold text-cyan-700 hover:bg-cyan-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Ajouter / Modifier les profils</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('/settings')}
              className="w-full p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-blue-600" />
              <span>Créer le profil enfant</span>
            </button>
          )}

          {/* SECTION LABEL */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              {mode === 'parent' ? 'Espace Contrôle Parent' : 'Modules d’apprentissage'}
            </div>

            {/* NAV LINKS */}
            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer group ${
                      isActive
                        ? mode === 'child'
                          ? 'bg-amber-100/90 text-amber-950 shadow-xs border border-amber-200/80 font-black'
                          : 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                        : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? mode === 'child'
                              ? 'bg-white text-amber-600 shadow-xs'
                              : 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-xs'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* MOTIVATION / KIDS BANNER (in child mode) */}
          {mode === 'child' && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100/80 text-xs">
              <div className="flex items-center gap-2 font-black text-purple-900 mb-1">
                <span>✨ Défi du Jour</span>
              </div>
              <p className="text-[11px] text-purple-700 leading-snug">
                Résous 1 défi de Logique et gagne +100 XP bonus aujourd'hui !
              </p>
            </div>
          )}
        </div>

        {/* BOTTOM USER & LOGOUT SECTION */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-extrabold text-slate-800 leading-tight">
                  {user.username}
                </div>
                <div className="text-[10px] text-slate-400">Parent Administrateur</div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                logout();
              }}
              title="Se déconnecter"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
