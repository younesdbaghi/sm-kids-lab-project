import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { DashboardStats } from '../../shared/types.ts';
import {
  Compass,
  TrendingUp,
  Brain,
  Cpu,
  Sparkles,
  Palette,
  Globe,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  ArrowRight
} from 'lucide-react';
import type { RANKS } from '../../shared/progression.ts';

export const ProgressionPage: React.FC = () => {
  const { selectedChild } = useApp();
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
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [selectedChild?.id, selectedChild?.xp]);

  if (loading || !stats) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement de la progression détaillée...</p>
        </div>
      </div>
    );
  }

  const childName = selectedChild?.name || 'votre enfant';
  const levelInfo = stats.levelProgress;
  const currentRank = levelInfo.rank || { name: 'Explorateur', icon: '🔎' };

  const domains = [
    { key: 'logic', name: 'Logique & Déduction', icon: Brain, color: 'bg-blue-600', text: 'text-blue-600', data: stats.domainProgress.logic },
    { key: 'code', name: 'Programmation Code Kids', icon: Cpu, color: 'bg-cyan-600', text: 'text-cyan-600', data: stats.domainProgress.code },
    { key: 'ai', name: 'Intelligence Artificielle', icon: Sparkles, color: 'bg-amber-500', text: 'text-amber-600', data: stats.domainProgress.ai },
    { key: 'creative', name: 'Créativité Numérique', icon: Palette, color: 'bg-pink-500', text: 'text-pink-600', data: stats.domainProgress.creative },
    { key: 'digital', name: 'Culture Numérique & Sécurité', icon: Globe, color: 'bg-emerald-600', text: 'text-emerald-600', data: stats.domainProgress.digital }
  ];

  const totalCompleted = stats.totalActivitiesCompleted;
  const overallPct = Math.min(100, Math.round((totalCompleted / 95) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 text-2xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Bilan & Analyse de Progression
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Suivi fin de l’évolution des compétences de {childName}
            </p>
          </div>
        </div>
      </div>

      {/* Global Level & Rank Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 border-2 border-amber-200 text-3xl flex items-center justify-center shadow-xs">
              {currentRank.icon}
            </div>
            <div>
              <div className="text-xs font-black uppercase text-amber-700">Rang Actuel</div>
              <div className="text-2xl font-black text-slate-900 font-heading">
                NIVEAU {levelInfo.currentLevel} — {currentRank.name}
              </div>
              <div className="text-xs text-slate-500 font-bold mt-0.5">
                Total accumulé : {stats.child.xp.toLocaleString()} XP
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
              <span>Palier Niveau {levelInfo.currentLevel} vers Niveau {levelInfo.currentLevel + 1}</span>
              <span className="font-black text-blue-600">{levelInfo.progressPercent}%</span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(5, levelInfo.progressPercent)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
              <span>XP de niveau : {levelInfo.xpForCurrentLevel} XP</span>
              <span>XP requis prochain palier : {levelInfo.xpForNextLevel} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Breakdown Bars */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 font-heading">
            Répartition des Compétences par Domaine
          </h2>
          <p className="text-xs text-slate-500">
            Équilibre de l’apprentissage à travers les 5 piliers
          </p>
        </div>

        <div className="space-y-4">
          {domains.map((dom) => {
            const Icon = dom.icon;
            const pct = dom.data?.percentage || 0;
            return (
              <div key={dom.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-xl bg-white shadow-xs ${dom.text}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-800">{dom.name}</span>
                  </div>
                  <div className="text-xs font-black text-slate-700">
                    {dom.data?.completedCount || 0} / {dom.data?.totalCount || 0} activités ({pct}%)
                  </div>
                </div>

                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full ${dom.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(3, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Attempts Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 font-heading">
              Historique Récent des Exercices
            </h2>
            <p className="text-xs text-slate-500">Dernières tentatives et réussites enregistrées</p>
          </div>
        </div>

        {stats.recentAttempts?.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs font-medium border-2 border-dashed border-slate-100 rounded-2xl">
            Aucun exercice encore enregistré. Démarrez une première activité dans l’Espace Enfant !
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-black tracking-wider">
                  <th className="pb-3">Activité</th>
                  <th className="pb-3">Domaine</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">XP Gagné</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {stats.recentAttempts?.map((att, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-bold text-slate-800">{att.activityTitle}</td>
                    <td className="py-3 capitalize text-slate-500">{att.category}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Réussi
                      </span>
                    </td>
                    <td className="py-3 font-bold text-amber-600">+{att.xpEarned} XP</td>
                    <td className="py-3 text-slate-400">
                      {new Date(att.timestamp).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
