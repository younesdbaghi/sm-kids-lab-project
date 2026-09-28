import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import type { DashboardStats } from '../../shared/types.ts';
import {
  Brain,
  Cpu,
  Sparkles,
  Palette,
  Globe,
  Flame,
  Clock,
  Award,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight,
  Play
} from 'lucide-react';

export const ParentDashboardPage: React.FC = () => {
  const { selectedChild, navigate, setMode } = useApp();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const data = await api.getDashboard(selectedChild.id);
        setStats(data);
      } catch (e) {
        console.error('Erreur chargement dashboard:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [selectedChild?.id, selectedChild?.xp]);

  if (loading && !stats) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement des données d’apprentissage...</p>
        </div>
      </div>
    );
  }

  const childName = selectedChild?.name || 'votre enfant';
  const levelInfo = stats?.levelProgress;
  const currentRank = levelInfo?.rank || { name: 'Explorateur', icon: '🔎' };

  const domains = [
    {
      key: 'logic',
      label: 'LOGIQUE',
      icon: Brain,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      progress: stats?.domainProgress?.logic?.percentage || 0,
      completed: stats?.domainProgress?.logic?.completedCount || 0,
      total: stats?.domainProgress?.logic?.totalCount || 30,
      path: '/logic'
    },
    {
      key: 'code',
      label: 'CODE',
      icon: Cpu,
      color: 'from-cyan-500 to-teal-600',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      progress: stats?.domainProgress?.code?.percentage || 0,
      completed: stats?.domainProgress?.code?.completedCount || 0,
      total: stats?.domainProgress?.code?.totalCount || 20,
      path: '/code'
    },
    {
      key: 'ai',
      label: 'IA & DATA',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      progress: stats?.domainProgress?.ai?.percentage || 0,
      completed: stats?.domainProgress?.ai?.completedCount || 0,
      total: stats?.domainProgress?.ai?.totalCount || 15,
      path: '/ai'
    },
    {
      key: 'creative',
      label: 'CRÉATIVITÉ',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      progress: stats?.domainProgress?.creative?.percentage || 0,
      completed: stats?.domainProgress?.creative?.completedCount || 0,
      total: stats?.domainProgress?.creative?.totalCount || 15,
      path: '/creative'
    },
    {
      key: 'digital',
      label: 'CULTURE NUM.',
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      progress: stats?.domainProgress?.digital?.percentage || 0,
      completed: stats?.domainProgress?.digital?.completedCount || 0,
      total: stats?.domainProgress?.digital?.totalCount || 15,
      path: '/digital'
    }
  ];

  // Overall progress percentage
  const totalCompleted = stats?.totalActivitiesCompleted || 0;
  const overallPercentage = Math.min(100, Math.round((totalCompleted / 95) * 100));

  const hours = Math.floor((stats?.totalTimeMinutes || 30) / 60);
  const minutes = (stats?.totalTimeMinutes || 30) % 60;
  const formattedTime = hours > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${minutes} min`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Greeting */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-cyan-300 border border-white/15 mb-3">
              <span>👨‍👩‍👧</span>
              <span>Tableau de bord de suivi familial</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Bonjour 👋
            </h1>
            <p className="mt-1 text-slate-200 text-base sm:text-lg font-medium">
              Voici les progrès et découvertes d’<span className="text-cyan-300 font-bold">{childName}</span> cette semaine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMode('child')}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>🚀 Ouvrir l’Espace Enfant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar in Hero */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-cyan-200 mb-2">
              <span>Progression Globale du Cursus</span>
              <span className="text-base text-white font-black">{overallPercentage}%</span>
            </div>
            <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(5, overallPercentage)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-300 mt-1.5 flex items-center justify-between">
              <span>{totalCompleted} sur 95 activités validées</span>
              <span>Palier suivant : Niveau {(levelInfo?.currentLevel || 0) + 1}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-2xl">
              {currentRank.icon}
            </div>
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-amber-300">Niveau Actuel</div>
              <div className="text-lg font-black text-white">
                NIVEAU {levelInfo?.currentLevel || 0}
              </div>
              <div className="text-xs text-slate-300 font-bold">{currentRank.name}</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-extrabold tracking-wider text-cyan-300">Points d’Expérience</div>
              <div className="text-lg font-black text-white">
                {(selectedChild?.xp || 0).toLocaleString()} XP
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {levelInfo?.xpForNextLevel ? `${levelInfo.xpForNextLevel - (selectedChild?.xp || 0)} XP requis` : 'Niveau Max'}
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-400/30 text-orange-300 font-extrabold text-xs flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>{stats?.streak || 1} jours</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Domain Progression Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Compétences & Domaines d’Apprentissage
            </h2>
            <p className="text-xs text-slate-500">
              Développement équilibré des capacités intellectuelles et créatives
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {domains.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.key}
                onClick={() => navigate(d.path)}
                className={`p-4 rounded-3xl ${d.bgColor} border ${d.borderColor} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center ${d.textColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-base font-black text-slate-800">
                      {d.progress}%
                    </span>
                  </div>
                  <div className="text-xs font-black tracking-tight text-slate-800">
                    {d.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {d.completed} / {d.total} terminées
                  </div>
                </div>

                <div className="mt-3 w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${d.color} rounded-full`}
                    style={{ width: `${Math.max(4, d.progress)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activités terminées</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalCompleted}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activités en cours</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">3</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Badges obtenus</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{stats?.badgesCount || 0}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Temps d’apprentissage</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{formattedTime}</div>
          </div>
        </div>
      </div>

      {/* Main Bottom Section: Timeline & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Timeline (Cette semaine) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-extrabold text-slate-900 font-heading">
                Cette semaine
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              Derniers 7 jours
            </span>
          </div>

          <div className="space-y-3.5">
            {stats?.weeklyActivity?.slice(0, 5).map((item, idx) => {
              const iconMap: Record<string, string> = {
                logic: '🧠',
                code: '💻',
                ai: '🤖',
                creative: '🎨',
                digital: '🌐'
              };
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-xs font-extrabold text-slate-500 uppercase">
                      {item.dayName}
                    </span>
                    <span className="text-xl">{iconMap[item.category] || '💡'}</span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {item.activityTitle}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">
                        Domaine : {item.category}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                      item.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>terminé</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>en cours</span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Régularité constatée : excellente assiduité cette semaine !
            </span>
            <button
              onClick={() => navigate('/progression')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Voir tout l’historique</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Parent Pedagogical Recommendations */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-extrabold font-heading text-white">
                Recommandations Pédagogiques
              </h2>
            </div>
            <p className="text-xs text-slate-300 mb-6">
              Observations automatiques basées sur les exercices réalisés par {childName}.
            </p>

            <div className="space-y-4">
              {stats?.recommendations && stats.recommendations.length > 0 ? (
                stats.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-xs leading-relaxed"
                  >
                    <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Conseil d’accompagnement</span>
                    </div>
                    <p className="text-slate-200">{rec.message}</p>
                    {rec.suggestedActivityTitle && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-cyan-200 font-semibold">
                        <span>Recommandé : {rec.suggestedActivityTitle}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-white/10 text-xs text-slate-300">
                  {childName} avance à un très bon rythme régulier. Continuez à valoriser sa curiosité et sa persévérance !
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15">
            <button
              onClick={() => navigate('/parent')}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Guide complet du parent accompagnateur</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
