import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { Activity } from '../../shared/types.ts';
import { AICoachModal } from '../components/AICoachModal.tsx';
import {
  Sparkles,
  Bot,
  Brain,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Zap,
  Activity as ActivityIcon,
  ChevronRight,
  Database
} from 'lucide-react';

export const AIPage: React.FC = () => {
  const { selectedChild, refreshChildData, triggerCelebration } = useApp();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Interactive ML Playground tab state
  const [activeTab, setActiveTab] = useState<'modules' | 'playground'>('modules');
  const [trainingSamples, setTrainingSamples] = useState([
    { label: 'Chat', traits: ['Oreilles pointues', 'Moustaches fines', 'Pelage doux'] },
    { label: 'Chat', traits: ['Oreilles pointues', 'Pupilles verticales', 'Miaulement'] },
    { label: 'Chien', traits: ['Oreilles tombantes', 'Truffe ronde', 'Aboiement'] },
    { label: 'Chien', traits: ['Truffe ronde', 'Queue qui remue', 'Aboiement'] },
  ]);
  const [isTrained, setIsTrained] = useState(false);
  const [testSample, setTestSample] = useState<string[]>(['Oreilles pointues', 'Moustaches fines']);
  const [predictionResult, setPredictionResult] = useState<{ label: string; confidence: number } | null>(null);

  useEffect(() => {
    async function loadActivities() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const list = await api.getActivities(selectedChild.id, 'ai');
        setActivities(list);
        if (list.length > 0 && !selectedActivity) {
          setSelectedActivity(list[0]);
        }
      } catch (e) {
        console.error('Erreur chargement IA:', e);
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

  const handleSubmitQuiz = async () => {
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
          timeSpentSeconds: 50
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

  const handleTrainModel = () => {
    setIsTrained(true);
    // Predict current test sample
    predictTestSample(testSample);
  };

  const toggleTestTrait = (trait: string) => {
    const updated = testSample.includes(trait)
      ? testSample.filter(t => t !== trait)
      : [...testSample, trait];
    setTestSample(updated);
    if (isTrained) predictTestSample(updated);
  };

  const predictTestSample = (traits: string[]) => {
    let catScore = 0;
    let dogScore = 0;

    traits.forEach(t => {
      if (['Oreilles pointues', 'Moustaches fines', 'Pupilles verticales', 'Miaulement'].includes(t)) catScore += 2;
      if (['Oreilles tombantes', 'Truffe ronde', 'Aboiement', 'Queue qui remue'].includes(t)) dogScore += 2;
    });

    const total = Math.max(1, catScore + dogScore);
    if (catScore >= dogScore) {
      const confidence = Math.min(99, Math.round((catScore / total) * 100));
      setPredictionResult({ label: 'Chat 🐱', confidence });
    } else {
      const confidence = Math.min(99, Math.round((dogScore / total) * 100));
      setPredictionResult({ label: 'Chien 🐶', confidence });
    }
  };

  const allAvailableTraits = [
    'Oreilles pointues',
    'Moustaches fines',
    'Pupilles verticales',
    'Miaulement',
    'Oreilles tombantes',
    'Truffe ronde',
    'Aboiement',
    'Queue qui remue'
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement d’AI Explorer Lab...</p>
        </div>
      </div>
    );
  }

  const actData = selectedActivity?.data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 text-2xl">
            🤖
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              AI Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Découvre comment les machines apprennent, reconnaissent des motifs et prennent des décisions
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'modules' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            📚 Les 15 Modules
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'playground' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            🧪 Laboratoire Entraînement
          </button>
        </div>
      </div>

      {activeTab === 'playground' ? (
        /* INTERACTIVE MACHINE LEARNING PLAYGROUND */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-200">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
              Expérience Interactive
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-2">
              Entraîne ton propre Classificateur Chat / Chien
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Une IA n’a pas d’yeux réels : elle apprend en associant des caractéristiques (features) fournies dans les exemples d’entraînement !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step 1: Training Data */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-blue-600" />
                  1. Dataset d’entraînement ({trainingSamples.length} exemples)
                </span>
                <span className="text-[11px] text-slate-400 font-bold">Données étiquetées</span>
              </div>

              <div className="space-y-2">
                {trainingSamples.map((sample, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                      <span>{sample.label === 'Chat' ? '🐱' : '🐶'}</span>
                      <span>{sample.label}</span>
                    </span>
                    <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                      {sample.traits.map((t, tidx) => (
                        <span key={tidx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleTrainModel}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>{isTrained ? 'Modèle Entraîné (Ré-entraîner)' : 'Lancer l’Entraînement du Modèle'}</span>
              </button>
            </div>

            {/* Step 2: Live Prediction Testing */}
            <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-amber-600" />
                  2. Tester sur un animal inconnu
                </span>
                <span className="text-[11px] text-amber-700 font-bold">Inférence en direct</span>
              </div>

              <p className="text-xs text-slate-600">
                Sélectionne les caractéristiques observées sur le nouvel animal :
              </p>

              <div className="flex flex-wrap gap-2">
                {allAvailableTraits.map((trait) => {
                  const isChecked = testSample.includes(trait);
                  return (
                    <button
                      key={trait}
                      onClick={() => toggleTestTrait(trait)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {trait}
                    </button>
                  );
                })}
              </div>

              {/* Prediction Result Display */}
              <div className="mt-6 p-5 rounded-2xl bg-white border border-amber-200 shadow-sm text-center">
                <div className="text-xs font-extrabold uppercase text-slate-400">
                  Verdict du Modèle IA
                </div>
                {predictionResult && isTrained ? (
                  <div className="mt-2 space-y-1">
                    <div className="text-3xl font-black text-slate-900 font-heading">
                      {predictionResult.label}
                    </div>
                    <div className="text-xs font-bold text-amber-600">
                      Confiance : {predictionResult.confidence}%
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      L’IA a corrélé les motifs statistiques avec les exemples vus à l’entraînement.
                    </p>
                  </div>
                ) : (
                  <div className="py-4 text-xs font-semibold text-slate-400">
                    Clique sur "Lancer l’Entraînement" pour activer les prédictions du modèle !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 15 CURATED LESSONS & QUIZZES */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Module List */}
          <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Les 15 Modules AI Explorer
            </div>
            {activities.map((act, index) => {
              const isSelected = selectedActivity?.id === act.id;
              return (
                <div
                  key={act.id}
                  onClick={() => handleSelectActivity(act)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-bold'
                      : act.isCompleted
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                        isSelected
                          ? 'bg-black/10 text-slate-950'
                          : act.isCompleted
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{act.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-amber-950' : 'text-slate-400'}`}>
                        Niveau {act.level} • +{act.xpReward} XP
                      </div>
                    </div>
                  </div>

                  {act.isCompleted ? (
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-emerald-600'}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-slate-300'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Module Content & Quiz */}
          {selectedActivity && (
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900">
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

                {/* Question Box */}
                <div className="my-6 p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-2">
                    Question d’Exploration
                  </div>
                  <div className="text-slate-900 text-base sm:text-lg font-bold leading-relaxed">
                    {actData.question}
                  </div>
                </div>

                {/* Options Selection */}
                <div className="space-y-3">
                  {actData.options?.map((option: string, idx: number) => {
                    const isSelected = selectedAnswer === option;
                    let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-amber-400';

                    if (isSelected) {
                      style = 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20';
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

                {/* Feedback */}
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
                          <span>Bravo ! Compréhension parfaite ! 🌟</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-5 h-5 text-rose-600" />
                          <span>Ce n’est pas la bonne réponse, réessaie !</span>
                        </>
                      )}
                    </div>
                    <p>{actData.explanation}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => setIsCoachOpen(true)}
                  className="text-xs font-extrabold text-cyan-700 hover:text-cyan-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-cyan-600" />
                  <span>Demander une explication au Coach IA</span>
                </button>

                <div className="flex items-center gap-3">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!selectedAnswer}
                      className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
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
                      className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
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
      )}

      {/* Socratic AI Coach */}
      {selectedActivity && (
        <AICoachModal
          isOpen={isCoachOpen}
          onClose={() => setIsCoachOpen(false)}
          activityTitle={selectedActivity.title}
          activityCategory="ai"
          activityDescription={selectedActivity.description}
          currentQuestion={actData.question}
          userAnswer={selectedAnswer || undefined}
        />
      )}

    </div>
  );
};
