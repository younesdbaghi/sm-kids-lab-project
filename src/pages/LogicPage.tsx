import React, { useEffect, useState } from 'react';
import type { useApp } from '../context/AppContext.tsx';
import type { api } from '../services/api.ts';
import type { Activity } from '../../shared/types.ts';
import type { AICoachModal } from '../components/AICoachModal.tsx';
import {
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Bot,
  RotateCcw,
  Zap,
  Lock,
  ChevronRight
} from 'lucide-react';

export const LogicPage: React.FC = () => {
  const { selectedChild, refreshChildData, triggerCelebration } = useApp();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const list = await api.getActivities(selectedChild.id, 'logic');
        setActivities(list);
        if (list.length > 0 && !selectedActivity) {
          setSelectedActivity(list[0]);
        }
      } catch (e) {
        console.error('Erreur chargement activités logique:', e);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, [selectedChild?.id]);

  const handleSelectActivity = (act: Activity) => {
    setSelectedActivity(act);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setAttemptsCount(0);
  };

  const handleCheckAnswer = async () => {
    if (!selectedActivity || !selectedAnswer || isAnswerSubmitted) return;

    const correct = selectedAnswer === selectedActivity.data.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerSubmitted(true);
    setAttemptsCount(prev => prev + 1);

    if (correct && selectedChild) {
      try {
        const result = await api.completeActivity(selectedActivity.id, {
          childId: selectedChild.id,
          isSuccess: true,
          score: 100,
          timeSpentSeconds: 45,
          hintsUsed: attemptsCount
        });

        await refreshChildData();

        // Update local list
        setActivities(prev => prev.map(a => a.id === selectedActivity.id ? { ...a, isCompleted: true } : a));

        triggerCelebration({
          levelUp: result.levelUp,
          newLevel: result.newLevel,
          xpEarned: result.xpEarned + (result.badgeBonusXp || 0),
          badges: result.newlyUnlockedBadges
        });
      } catch (err) {
        console.error('Erreur enregistrement activité:', err);
      }
    }
  };

  const handleNextActivity = () => {
    if (!selectedActivity) return;
    const currentIndex = activities.findIndex(a => a.id === selectedActivity.id);
    if (currentIndex !== -1 && currentIndex < activities.length - 1) {
      handleSelectActivity(activities[currentIndex + 1]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement des défis logiques...</p>
        </div>
      </div>
    );
  }

  const actData = selectedActivity?.data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 text-2xl">
            🧠
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Logic Challenge
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Suites de nombres, déductions, matrices et raisonnement algorithmique
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCoachOpen(true)}
            className="py-2.5 px-4 rounded-2xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Bot className="w-4 h-4 text-cyan-600" />
            <span>Demander de l’aide au Coach IA</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Activity List */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Les 30 Épreuves Logiques
          </div>
          {activities.map((act, index) => {
            const isSelected = selectedActivity?.id === act.id;
            return (
              <div
                key={act.id}
                onClick={() => handleSelectActivity(act)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]'
                    : act.isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/70 text-slate-800'
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
                    <div className="text-xs font-bold leading-tight">
                      {act.title}
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      Niveau {act.level} • {act.difficulty} • +{act.xpReward} XP
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
        </div>

        {/* Right Side: Interactive Problem Solver */}
        {selectedActivity && (
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    NIVEAU {selectedActivity.level}
                  </span>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-800 uppercase">
                    {selectedActivity.difficulty}
                  </span>
                </div>
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

              {/* Central Puzzle Box */}
              <div className="my-8 p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200/80 flex flex-col items-center justify-center text-center">
                
                {selectedActivity.type === 'sequence' && actData.sequence && (
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4">
                    {actData.sequence.map((term: string, idx: number) => (
                      <div
                        key={idx}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-md border-2 ${
                          term === '?'
                            ? 'bg-amber-400 border-amber-500 text-slate-950 animate-bounce'
                            : 'bg-white border-blue-200 text-blue-900'
                        }`}
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                )}

                {selectedActivity.type === 'quiz' && actData.question && (
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 text-base sm:text-lg font-bold max-w-xl text-center shadow-xs">
                    {actData.question}
                  </div>
                )}

                <div className="mt-4 text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Concept clé : {selectedActivity.conceptLearned}</span>
                </div>
              </div>

              {/* Options selection */}
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Choisis la bonne réponse :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {actData.options?.map((option: string, idx: number) => {
                    const isSelected = selectedAnswer === option;
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-blue-300';
                    
                    if (isSelected) {
                      style = 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20';
                    }

                    if (isAnswerSubmitted) {
                      if (option === actData.correctAnswer) {
                        style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                      } else if (isSelected && !isCorrect) {
                        style = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted && isCorrect}
                        onClick={() => setSelectedAnswer(option)}
                        className={`p-4 rounded-2xl border-2 text-left font-bold text-base transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && option === actData.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Result explanation feedback */}
              {isAnswerSubmitted && (
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
                        <span>Excellent travail ! 🎉</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-5 h-5 text-rose-600" />
                        <span>Ce n’est pas tout à fait ça. Essaie encore !</span>
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
                <span>Besoin d’un indice ? Demande à ton Coach IA</span>
              </button>

              <div className="flex items-center gap-3">
                {isAnswerSubmitted && !isCorrect && (
                  <button
                    onClick={() => {
                      setIsAnswerSubmitted(false);
                      setSelectedAnswer(null);
                    }}
                    className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Réessayer</span>
                  </button>
                )}

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
                  >
                    Valider ma réponse
                  </button>
                ) : isCorrect ? (
                  <button
                    onClick={handleNextActivity}
                    className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Défi Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Socratic AI Coach modal */}
      {selectedActivity && (
        <AICoachModal
          isOpen={isCoachOpen}
          onClose={() => setIsCoachOpen(false)}
          activityTitle={selectedActivity.title}
          activityCategory="logic"
          activityDescription={selectedActivity.description}
          currentQuestion={actData.question || actData.sequence?.join(' ')}
          userAnswer={selectedAnswer || undefined}
          errorContext={isAnswerSubmitted && !isCorrect ? `La réponse choisie (${selectedAnswer}) est erronée.` : undefined}
        />
      )}

    </div>
  );
};
