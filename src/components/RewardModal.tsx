import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { useApp } from '../context/AppContext.tsx';
import type { Award, Sparkles, ArrowRight } from 'lucide-react';
import type { getRankForLevel } from '../../shared/progression.ts';

export const RewardModal: React.FC = () => {
  const { celebrationData, dismissCelebration, selectedChild } = useApp();

  useEffect(() => {
    if (celebrationData?.show) {
      // Launch celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 250);
      } catch (e) {
        // Fallback if canvas confetti fails
      }

      // Play joyful harmonic chime chord using Web Audio API
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
            gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.1);
            osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
          });
        }
      } catch (err) {
        // Ignore audio errors
      }
    }
  }, [celebrationData?.show]);

  if (!celebrationData?.show) return null;

  const currentLevel = celebrationData.newLevel ?? selectedChild?.level ?? 0;
  const currentRank = getRankForLevel(currentLevel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center transform animate-in zoom-in-95 duration-250">
        
        {/* Floating icon */}
        <div className="w-20 h-20 mx-auto -mt-16 sm:-mt-18 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-lg flex items-center justify-center text-4xl animate-bounce">
          {celebrationData.levelUp ? '🚀' : '🎉'}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-4 font-heading">
          {celebrationData.levelUp ? 'Nouveau Niveau Atteint !' : 'Mission Réussie !'}
        </h2>

        <p className="text-slate-600 mt-1 text-sm sm:text-base font-medium">
          {celebrationData.levelUp
            ? `Félicitations ${selectedChild?.name || ''} ! Tu franchis une nouvelle étape fantastique !`
            : `Bravo pour ton effort et ta curiosité !`}
        </p>

        {/* Level badge if level up */}
        {celebrationData.levelUp && (
          <div className="my-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 inline-block w-full">
            <div className="text-xs uppercase font-extrabold tracking-wider text-amber-700">
              Nouveau Rang
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-1 flex items-center justify-center gap-2">
              <span>{currentRank.icon}</span>
              <span>Niveau {currentLevel} — {currentRank.name}</span>
            </div>
          </div>
        )}

        {/* XP Gain */}
        {celebrationData.xpEarned && celebrationData.xpEarned > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 font-extrabold text-lg my-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>+{celebrationData.xpEarned} XP</span>
          </div>
        )}

        {/* Unlocked Badges */}
        {celebrationData.badges && celebrationData.badges.length > 0 && (
          <div className="mt-4 p-3 rounded-2xl bg-purple-50 border border-purple-200">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-purple-600" />
              Nouveau Badge Débloqué !
            </div>
            <div className="flex flex-col gap-2">
              {celebrationData.badges.map((b) => (
                <div key={b.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-purple-100 text-left">
                  <span className="text-3xl">{b.icon}</span>
                  <div>
                    <div className="font-extrabold text-sm text-slate-800">{b.title}</div>
                    <div className="text-xs text-slate-500">{b.description}</div>
                  </div>
                  <div className="ml-auto text-xs font-bold text-purple-700 whitespace-nowrap">
                    +{b.xpBonus} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={dismissCelebration}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Continuer l’aventure</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
