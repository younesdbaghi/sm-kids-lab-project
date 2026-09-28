import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import type { DailyMission, Badge } from '../../shared/types.ts';
import {
  Rocket,
  Brain,
  Cpu,
  Sparkles,
  Palette,
  Globe,
  Flame,
  Award,
  ArrowRight,
  Play,
  CheckCircle2,
  Bot,
  Zap,
  Target
} from 'lucide-react';
import { AICoachModal } from '../components/AICoachModal.tsx';
import { sound } from '../utils/sound.ts';

export const ChildHubPage: React.FC = () => {
  const { selectedChild, selectedChildProgress, navigate } = useApp();
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  useEffect(() => {
    async function loadChildData() {
      if (!selectedChild) return;
      try {
        const [mList, bList] = await Promise.all([
          api.getMissions(selectedChild.id),
          api.getBadges(selectedChild.id)
        ]);
        setMissions(mList);
        setBadges(bList);
      } catch (e) {
        console.error('Erreur chargement missions/badges:', e);
      }
    }
    loadChildData();
  }, [selectedChild?.id, selectedChild?.xp]);

  const childName = selectedChild?.name || 'Explorateur';
  const progress = selectedChildProgress;
  const currentRank = progress?.rank || { name: 'Débutant', icon: '🌱' };

  const realms = [
    {
      title: 'Logique & Énigmes',
      category: 'logic',
      icon: '🧠',
      tag: 'Suites & Déduction',
      color: 'from-blue-600 to-indigo-700',
      bgCard: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      path: '/logic',
      count: '30 Défis'
    },
    {
      title: 'Code Kids',
      category: 'code',
      icon: '💻',
      tag: 'Robot & Algorithmes',
      color: 'from-cyan-600 to-teal-700',
      bgCard: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      textColor: 'text-cyan-600',
      path: '/code',
      count: '20 Missions'
    },
    {
      title: 'AI Explorer',
      category: 'ai',
      icon: '🤖',
      tag: 'Laboratoire d’IA',
      color: 'from-amber-500 to-orange-600',
      bgCard: 'bg-gradient-to-br from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      path: '/ai',
      count: '15 Expériences'
    },
    {
      title: 'Creative Lab',
      category: 'creative',
      icon: '🎨',
      tag: 'Pixel Art & Jeux',
      color: 'from-pink-500 to-rose-600',
      bgCard: 'bg-gradient-to-br from-pink-500 to-rose-600',
      textColor: 'text-pink-600',
      path: '/creative',
      count: '15 Projets'
    },
    {
      title: 'Culture Numérique',
      category: 'digital',
      icon: '🌐',
      tag: 'Internet & Sécurité',
      color: 'from-emerald-500 to-teal-600',
      bgCard: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      path: '/digital',
      count: '15 Modules'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      
      {/* Hero "Continuer l'aventure" Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-amber-300">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              <span>Laboratoire de Découverte</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
              Prêt pour l’aventure, {childName} ? {selectedChild?.avatar || '🚀'}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base font-semibold max-w-xl">
              Résous des énigmes, programme ton robot, entraîne des modèles d’IA et débloque de super badges !
            </p>
          </div>

          {/* Quick Continue Button */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                sound.playPop();
                navigate('/logic');
              }}
              className="py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Continuer l’aventure</span>
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setIsCoachOpen(true);
              }}
              className="py-4 px-5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Bot className="w-5 h-5 text-cyan-300" />
              <span>Parler au Coach IA</span>
            </button>
          </div>
        </div>

        {/* Level and XP progress bar container */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-cyan-200 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">{currentRank.icon}</span>
                <span>Niveau {progress?.currentLevel || 0} — Rang {currentRank.name}</span>
              </span>
              <span className="text-white font-bold">{progress?.progressPercent || 0}% vers niveau {(progress?.currentLevel || 0) + 1}</span>
            </div>
            <div className="w-full h-4 bg-black/25 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, progress?.progressPercent || 0)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 text-right">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-cyan-200">Total XP</div>
                <div className="text-base font-black leading-none text-white">{selectedChild?.xp || 0} XP</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-orange-200">Série</div>
                <div className="text-base font-black leading-none text-white">{selectedChild?.streak || 1} jours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Missions Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 font-heading">
                Missions du Jour
              </h2>
              <p className="text-xs text-slate-500">Relève les défis pour remporter un max de bonus XP !</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {missions.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                m.completed
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-800">{m.title}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    +{m.xpReward} XP
                  </span>
                </div>
                <p className="text-xs text-slate-600">{m.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {m.currentCount} / {m.targetCount}
                </span>
                {m.completed ? (
                  <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Validé !
                  </span>
                ) : (
                  <button
                    onClick={() => navigate(m.category === 'logic' ? '/logic' : m.category === 'code' ? '/code' : '/ai')}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lancer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The 5 Realms Explorer Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-heading">
              Les 5 Mondes du Savoir
            </h2>
            <p className="text-xs text-slate-500">Choisis une planète à explorer aujourd’hui</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {realms.map((realm) => (
            <div
              key={realm.category}
              onClick={() => {
                sound.playPop();
                navigate(realm.path);
              }}
              className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className={`p-6 ${realm.bgCard} text-white relative`}>
                <div className="flex items-center justify-between">
                  <span className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
                    {realm.icon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                    {realm.count}
                  </span>
                </div>
                <h3 className="text-2xl font-black mt-3 font-heading">
                  {realm.title}
                </h3>
                <p className="text-xs text-white/80 font-bold mt-0.5">
                  {realm.tag}
                </p>
              </div>

              <div className="p-4 bg-slate-50 flex items-center justify-between text-xs font-extrabold text-slate-700">
                <span>Commencer l’entraînement</span>
                <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          {/* Badges showcase quick card */}
          <div
            onClick={() => navigate('/badges')}
            className="rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-6 text-white shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-4xl group-hover:rotate-12 transition-transform">🏆</span>
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20">
                  Trophées
                </span>
              </div>
              <h3 className="text-2xl font-black mt-3 font-heading">
                Galerie des Badges
              </h3>
              <p className="text-xs text-purple-100 font-semibold mt-1">
                {(badges.filter(b => b.isUnlocked).length)} / {badges.length} badges débloqués
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/20 text-xs font-bold">
              <span>Voir tous mes trophées</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Coach Modal */}
      <AICoachModal
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        activityTitle="Exploration Libre"
        activityCategory="logic"
        activityDescription="Accompagnement général et questions de curiosité"
      />

    </div>
  );
};
