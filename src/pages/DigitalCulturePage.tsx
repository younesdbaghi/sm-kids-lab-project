import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { Activity } from '../../shared/types.ts';
import { AICoachModal } from '../components/AICoachModal.tsx';
import {
  Globe,
  ShieldCheck,
  Lock,
  Wifi,
  Server,
  Cloud,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  RotateCcw,
  ChevronRight,
  KeyRound
} from 'lucide-react';

export const DigitalCulturePage: React.FC = () => {
  const { selectedChild, refreshChildData, triggerCelebration } = useApp();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Interactive password strength tester widget
  const [testPassword, setTestPassword] = useState('');

  useEffect(() => {
    async function loadActivities() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const list = await api.getActivities(selectedChild.id, 'digital');
        setActivities(list);
        if (list.length > 0 && !selectedActivity) {
          setSelectedActivity(list[0]);
        }
      } catch (e) {
        console.error('Erreur chargement culture num:', e);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, [selectedChild?.id]);

  const handleSelectActivity = (act: Activity) => {
    setSelectedActivity(act);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handleSubmit = async () => {
    if (!selectedActivity || !selectedAnswer || isSubmitted) return;

    const correct = selectedAnswer === selectedActivity.data.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct && selectedChild) {
      try {
        const res = await api.completeActivity(selectedActivity.id, {
          childId: selectedChild.id,
          isSuccess: true,
          score: 100,
          timeSpentSeconds: 45
        });

        await refreshChildData();
        setActivities(prev => prev.map(a => a.id === selectedActivity.id ? { ...a, isCompleted: true } : a));

        triggerCelebration({
          levelUp: res.levelUp,
          newLevel: res.newLevel,
          xpEarned: res.xpEarned + (res.badgeBonusXp || 0),
          badges: res.newlyUnlockedBadges
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'Très Faible 🔴', width: '20%', color: 'bg-rose-500' };
    if (score === 2) return { label: 'Faible 🟠', width: '40%', color: 'bg-amber-500' };
    if (score === 3) return { label: 'Moyen 🟡', width: '60%', color: 'bg-yellow-500' };
    if (score === 4) return { label: 'Fort 🟢', width: '85%', color: 'bg-emerald-500' };
    return { label: 'Inviolable ! 🛡️', width: '100%', color: 'bg-emerald-600' };
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement de la Culture Numérique...</p>
        </div>
      </div>
    );
  }

  const actData = selectedActivity?.data || {};
  const pwdStrength = getPasswordStrength(testPassword);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 text-2xl">
            🌐
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Culture Numérique & Cybersécurité
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Internet, serveurs, données personnelles, cloud, fake news et écologie numérique
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCoachOpen(true)}
          className="py-2.5 px-4 rounded-2xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Bot className="w-4 h-4 text-cyan-600" />
          <span>Demander conseil au Coach IA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 15 Modules list */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Les 15 Modules de Citoyenneté Numérique
          </div>
          {activities.map((act, index) => {
            const isSelected = selectedActivity?.id === act.id;
            return (
              <div
                key={act.id}
                onClick={() => handleSelectActivity(act)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold'
                    : act.isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : act.isCompleted
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{act.title}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                      Niveau {act.level} • +{act.xpReward} XP
                    </div>
                  </div>
                </div>

                {act.isCompleted ? (
                  <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                )}
              </div>
            );
          })}

          {/* Interactive Password Tester Card in Sidebar */}
          <div className="mt-6 p-4 rounded-3xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
              <KeyRound className="w-4 h-4" />
              <span>Testeur de Mot de Passe</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Tape un mot de passe fictif pour tester sa sécurité en temps réel :
            </p>
            <input
              type="text"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="Ex: Astre!2026_Bleu"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white focus:outline-hidden"
            />
            {testPassword && (
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-1">
                  <span>Force : {pwdStrength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pwdStrength.color} rounded-full transition-all`}
                    style={{ width: pwdStrength.width }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Lesson & Quiz */}
        {selectedActivity && (
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  NIVEAU {selectedActivity.level}
                </span>
                <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-amber-500" />
                  +{selectedActivity.xpReward} XP
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {selectedActivity.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1 font-medium">
                {selectedActivity.description}
              </p>

              {/* Lesson Box */}
              <div className="my-6 p-6 rounded-3xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-2">
                  Défi & Question Pratique
                </div>
                <div className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed">
                  {actData.question}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {actData.options?.map((option: string, idx: number) => {
                  const isSelected = selectedAnswer === option;
                  let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-emerald-400';

                  if (isSelected) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                  }

                  if (isSubmitted) {
                    if (option === actData.correctAnswer) {
                      style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted && isCorrect}
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{option}</span>
                      {isSubmitted && option === actData.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Result explanation feedback */}
              {isSubmitted && (
                <div
                  className={`mt-6 p-4 rounded-2xl border text-sm leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="font-black mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Réponse exacte ! Super réflexe numérique ! 🛡️</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-5 h-5 text-rose-600" />
                        <span>Pas tout à fait, regarde l’indice et réessaie !</span>
                      </>
                    )}
                  </div>
                  <p>{actData.explanation}</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsCoachOpen(true)}
                className="text-xs font-extrabold text-cyan-700 hover:text-cyan-900 flex items-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-cyan-600" />
                <span>Demander un indice au Coach IA</span>
              </button>

              <div className="flex items-center gap-3">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
                  >
                    Valider ma réponse
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const curIdx = activities.findIndex(a => a.id === selectedActivity.id);
                      if (curIdx !== -1 && curIdx < activities.length - 1) {
                        handleSelectActivity(activities[curIdx + 1]);
                      }
                    }}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Module Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Socratic AI Coach */}
      {selectedActivity && (
        <AICoachModal
          isOpen={isCoachOpen}
          onClose={() => setIsCoachOpen(false)}
          activityTitle={selectedActivity.title}
          activityCategory="digital"
          activityDescription={selectedActivity.description}
          currentQuestion={actData.question}
          userAnswer={selectedAnswer || undefined}
        />
      )}

    </div>
  );
};
