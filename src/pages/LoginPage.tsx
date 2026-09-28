import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Logo } from '../components/Logo.tsx';
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123@0');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(username.trim(), password);
    } catch (err: unknown) {
      setErrorMessage(err.message || 'Identifiant ou mot de passe incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123@0');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background glowing ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Emblem & Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-white/95 rounded-3xl shadow-2xl border-2 border-cyan-400/40 backdrop-blur-md mb-4 transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" showText={false} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
            SMART KIDS LAB
          </h1>
          <p className="mt-2 text-cyan-200 text-sm sm:text-base font-semibold">
            Apprendre. Créer. Explorer. Préparer demain.
          </p>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            La plateforme d’éveil aux technologies pour les enfants de 6 à 15 ans
          </p>
        </div>

        {/* Card Form */}
        <div className="mt-8 bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/40">
          
          <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800 font-heading">
                Espace Famille
              </h2>
              <p className="text-xs text-slate-500">Connexion du parent responsable</p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[11px] font-bold text-cyan-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              Sécurisé
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Identifiant
              </label>
              <div className="relative rounded-2xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mot de passe
                </label>
              </div>
              <div className="relative rounded-2xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="block w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Preset demo credentials tip */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-8 px-6 py-4 rounded-b-3xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Compte d’accès configuré :
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 underline cursor-pointer"
              >
                Remplir automatiquement
              </button>
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-white px-3 py-2 rounded-xl border border-slate-200 text-slate-700">
              <span>admin</span>
              <span className="text-slate-300">•</span>
              <span>admin123@0</span>
            </div>
          </div>
        </div>

        {/* 5 pillars highlights */}
        <div className="mt-8 grid grid-cols-5 gap-2 text-center text-white/80">
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🧠</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">Logique</div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">💻</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">Code</div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🤖</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">IA</div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🎨</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">Créatif</div>
          </div>
          <div className="p-2 bg-white/5 rounded-2xl backdrop-blur-xs">
            <div className="text-xl">🌐</div>
            <div className="text-[10px] font-bold mt-1 text-slate-300">Culture</div>
          </div>
        </div>

      </div>
    </div>
  );
};
