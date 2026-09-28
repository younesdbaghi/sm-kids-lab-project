import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { Badge } from '../../shared/types.ts';
import type { RANKS } from '../../shared/progression.ts';
import { Award, Lock, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const BadgesPage: React.FC = () => {
  const { selectedChild, selectedChildProgress } = useApp();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const list = await api.getBadges(selectedChild.id);
        setBadges(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadBadges();
  }, [selectedChild?.id, selectedChild?.xp]);

  const currentLevel = selectedChild?.level || 0;
  const currentRank = selectedChildProgress?.rank || RANKS[0];

  const unlockedCount = badges.filter(b => b.isUnlocked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 text-2xl">
            🏆
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Trophées & Badges de Maîtrise
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Débloque des récompenses prestigieuses à mesure que tes connaissances grandissent
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600" />
          <span>{unlockedCount} sur {badges.length} Trophées Obtenus</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {badges.map((badge) => {
          const isUnlocked = !!badge.isUnlocked;
          return (
            <div
              key={badge.id}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-purple-300 shadow-md hover:shadow-xl hover:-translate-y-1'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-purple-100 to-amber-100 border-purple-200 shadow-purple-200'
                        : 'bg-slate-200 border-slate-300 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Débloqué</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Verrouillé</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 font-heading">
                  {badge.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">
                  {badge.criteria}
                </span>
                <span className="font-extrabold text-amber-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  +{badge.xpBonus} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The 10 Ranks Roadmap from Débutant to PRO */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 font-heading">
            Feuille de Route des 10 Rangs (Niveau 0 à 100)
          </h2>
          <p className="text-xs text-slate-500">
            L’évolution continue vers la maîtrise technologique totale
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {RANKS.map((r, idx) => {
            const isReached = currentLevel >= r.minLevel;
            const isCurrent = currentLevel >= r.minLevel && currentLevel <= r.maxLevel;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                    : isReached
                    ? 'bg-blue-50/60 border-blue-200'
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{r.icon}</div>
                <div className="text-xs font-black text-slate-900">{r.name}</div>
                <div className="text-[10px] text-slate-500 font-bold">
                  Niv. {r.minLevel} - {r.maxLevel}
                </div>
                {isCurrent && (
                  <span className="mt-2 inline-block text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                    Rang Actuel
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
