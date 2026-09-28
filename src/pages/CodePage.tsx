import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import type { Activity } from '../../shared/types.ts';
import { AICoachModal } from '../components/AICoachModal.tsx';
import { sound } from '../utils/sound.ts';
import {
  Play,
  RotateCcw,
  RotateCw,
  Bot,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Navigation,
  CheckCircle2,
  Trash2,
  Cpu,
  ChevronRight,
  Zap,
  Repeat,
  ShieldAlert,
  Star,
  OctagonX,
  Code2,
  Plus
} from 'lucide-react';

export type CodeBlockType =
  | 'MOVE_UP'
  | 'MOVE_DOWN'
  | 'MOVE_LEFT'
  | 'MOVE_RIGHT'
  | 'FORWARD'
  | 'TURN_LEFT'
  | 'TURN_RIGHT'
  | 'REPEAT_2'
  | 'REPEAT_3'
  | 'REPEAT_4'
  | 'IF_OBSTACLE_TURN_LEFT';

interface BlockMeta {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  category: 'direct' | 'orientation' | 'loop';
  hint: string;
}

const BLOCK_METADATA: Record<CodeBlockType, BlockMeta> = {
  MOVE_UP: {
    label: 'Monter (Haut)',
    icon: ArrowUp,
    color: 'text-white',
    bgColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
    category: 'direct',
    hint: 'Déplace le robot d’une case vers le haut'
  },
  MOVE_DOWN: {
    label: 'Descendre (Bas)',
    icon: ArrowDown,
    color: 'text-white',
    bgColor: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
    category: 'direct',
    hint: 'Déplace le robot d’une case vers le bas'
  },
  MOVE_LEFT: {
    label: 'Aller à Gauche',
    icon: ArrowLeft,
    color: 'text-white',
    bgColor: 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/20',
    category: 'direct',
    hint: 'Déplace le robot d’une case vers la gauche'
  },
  MOVE_RIGHT: {
    label: 'Aller à Droite',
    icon: ArrowRight,
    color: 'text-white',
    bgColor: 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/20',
    category: 'direct',
    hint: 'Déplace le robot d’une case vers la droite'
  },
  FORWARD: {
    label: 'Avancer tout droit',
    icon: Navigation,
    color: 'text-white',
    bgColor: 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20',
    category: 'orientation',
    hint: 'Avance dans la direction actuelle du robot'
  },
  TURN_LEFT: {
    label: 'Pivoter à Gauche',
    icon: RotateCcw,
    color: 'text-white',
    bgColor: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20',
    category: 'orientation',
    hint: 'Fait pivoter le robot de 90° vers la gauche'
  },
  TURN_RIGHT: {
    label: 'Pivoter à Droite',
    icon: RotateCw,
    color: 'text-white',
    bgColor: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20',
    category: 'orientation',
    hint: 'Fait pivoter le robot de 90° vers la droite'
  },
  REPEAT_2: {
    label: 'Répéter 2x [Avancer]',
    icon: Repeat,
    color: 'text-white',
    bgColor: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20',
    category: 'loop',
    hint: 'Répète 2 fois l’action d’avancer'
  },
  REPEAT_3: {
    label: 'Répéter 3x [Avancer]',
    icon: Repeat,
    color: 'text-white',
    bgColor: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20',
    category: 'loop',
    hint: 'Répète 3 fois l’action d’avancer'
  },
  REPEAT_4: {
    label: 'Répéter 4x [Avancer]',
    icon: Repeat,
    color: 'text-white',
    bgColor: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/20',
    category: 'loop',
    hint: 'Répète 4 fois l’action d’avancer'
  },
  IF_OBSTACLE_TURN_LEFT: {
    label: 'Si obstacle : Tourner',
    icon: ShieldAlert,
    color: 'text-white',
    bgColor: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20',
    category: 'loop',
    hint: 'Pivote automatiquement si un obstacle bloque la route'
  }
};

export const CodePage: React.FC = () => {
  const { selectedChild, refreshChildData, triggerCelebration } = useApp();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [program, setProgram] = useState<CodeBlockType[]>([]);
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0, dir: 'right' });
  const [collectedTargets, setCollectedTargets] = useState<{ x: number; y: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionIndex, setExecutionIndex] = useState<number | null>(null);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'direct' | 'orientation' | 'loop'>('all');

  useEffect(() => {
    async function loadActivities() {
      if (!selectedChild) return;
      try {
        setLoading(true);
        const list = await api.getActivities(selectedChild.id, 'code');
        setActivities(list);
        if (list.length > 0 && !selectedActivity) {
          initActivity(list[0]);
        }
      } catch (e) {
        console.error('Erreur chargement code kids:', e);
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, [selectedChild?.id]);

  const initActivity = (act: Activity) => {
    setSelectedActivity(act);
    setProgram([]);
    setIsSuccess(false);
    setExecutionMessage(null);
    setExecutionIndex(null);

    const start = act.data.robotStart || { x: 0, y: 2, dir: 'right' };
    setRobotPos({ ...start });
    setCollectedTargets([]);
  };

  const handleSelectActivity = (act: Activity) => {
    if (isRunning) return;
    sound.playPop();
    initActivity(act);
  };

  const addBlock = (block: CodeBlockType) => {
    if (isRunning || isSuccess) return;
    sound.playPop();
    setProgram(prev => [...prev, block]);
    setExecutionMessage(null);
  };

  const removeBlock = (index: number) => {
    if (isRunning || isSuccess) return;
    sound.playPop();
    setProgram(prev => prev.filter((_, i) => i !== index));
  };

  const clearProgram = () => {
    if (isRunning) return;
    sound.playPop();
    setProgram([]);
    resetSimulation();
  };

  const resetSimulation = () => {
    if (!selectedActivity) return;
    sound.playPop();
    const start = selectedActivity.data.robotStart || { x: 0, y: 2, dir: 'right' };
    setRobotPos({ ...start });
    setCollectedTargets([]);
    setIsRunning(false);
    setExecutionIndex(null);
    setExecutionMessage(null);
  };

  const runProgram = async () => {
    if (!selectedActivity || isRunning || program.length === 0) return;

    sound.playPop();
    setIsRunning(true);
    setExecutionMessage('Exécution du programme en cours... Le robot avance !');

    // Expand composite blocks like REPEAT
    const flatInstructions: CodeBlockType[] = [];
    for (const b of program) {
      if (b === 'REPEAT_4') {
        flatInstructions.push('FORWARD', 'FORWARD', 'FORWARD', 'FORWARD');
      } else if (b === 'REPEAT_3') {
        flatInstructions.push('FORWARD', 'FORWARD', 'FORWARD');
      } else if (b === 'REPEAT_2') {
        flatInstructions.push('FORWARD', 'FORWARD');
      } else {
        flatInstructions.push(b);
      }
    }

    let current = { ...robotPos };
    const targets = selectedActivity.data.targets || [];
    const obstacles = selectedActivity.data.obstacles || [];
    const gridSize = selectedActivity.data.gridSize || 5;
    const newlyCollected: { x: number; y: number }[] = [];

    const dirs = ['up', 'right', 'down', 'left'];

    for (let i = 0; i < flatInstructions.length; i++) {
      setExecutionIndex(i);
      const cmd = flatInstructions[i];

      // Delay for visual step animation
      await new Promise(r => setTimeout(r, 480));

      if (cmd === 'MOVE_UP') {
        current.dir = 'up';
        const ny = current.y - 1;
        if (ny < 0 || ny >= gridSize) {
          sound.playPop();
          setExecutionMessage('⚠️ Oups ! Le robot ne peut pas monter plus haut hors de la grille.');
          setIsRunning(false);
          return;
        }
        if (obstacles.some((o: Record<string, unknown>) => o.x === current.x && o.y === ny)) {
          sound.playPop();
          setExecutionMessage('💥 Obstacle détecté en haut ! Le robot ne peut pas passer.');
          setIsRunning(false);
          return;
        }
        current.y = ny;
      } else if (cmd === 'MOVE_DOWN') {
        current.dir = 'down';
        const ny = current.y + 1;
        if (ny < 0 || ny >= gridSize) {
          sound.playPop();
          setExecutionMessage('⚠️ Oups ! Le robot ne peut pas descendre plus bas hors de la grille.');
          setIsRunning(false);
          return;
        }
        if (obstacles.some((o: Record<string, unknown>) => o.x === current.x && o.y === ny)) {
          sound.playPop();
          setExecutionMessage('💥 Obstacle détecté en bas ! Le robot ne peut pas passer.');
          setIsRunning(false);
          return;
        }
        current.y = ny;
      } else if (cmd === 'MOVE_LEFT') {
        current.dir = 'left';
        const nx = current.x - 1;
        if (nx < 0 || nx >= gridSize) {
          sound.playPop();
          setExecutionMessage('⚠️ Oups ! Le robot a heurté le bord gauche de la grille.');
          setIsRunning(false);
          return;
        }
        if (obstacles.some((o: Record<string, unknown>) => o.x === nx && o.y === current.y)) {
          sound.playPop();
          setExecutionMessage('💥 Obstacle détecté à gauche ! Le robot ne peut pas passer.');
          setIsRunning(false);
          return;
        }
        current.x = nx;
      } else if (cmd === 'MOVE_RIGHT') {
        current.dir = 'right';
        const nx = current.x + 1;
        if (nx < 0 || nx >= gridSize) {
          sound.playPop();
          setExecutionMessage('⚠️ Oups ! Le robot a heurté le bord droit de la grille.');
          setIsRunning(false);
          return;
        }
        if (obstacles.some((o: Record<string, unknown>) => o.x === nx && o.y === current.y)) {
          sound.playPop();
          setExecutionMessage('💥 Obstacle détecté à droite ! Le robot ne peut pas passer.');
          setIsRunning(false);
          return;
        }
        current.x = nx;
      } else if (cmd === 'TURN_LEFT') {
        const idx = dirs.indexOf(current.dir);
        current.dir = dirs[(idx + 3) % 4];
      } else if (cmd === 'TURN_RIGHT') {
        const idx = dirs.indexOf(current.dir);
        current.dir = dirs[(idx + 1) % 4];
      } else if (cmd === 'FORWARD') {
        let nx = current.x;
        let ny = current.y;

        if (current.dir === 'right') nx++;
        else if (current.dir === 'left') nx--;
        else if (current.dir === 'down') ny++;
        else if (current.dir === 'up') ny--;

        // Check boundaries
        if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) {
          sound.playPop();
          setExecutionMessage('⚠️ Oups ! Le robot a heurté les limites de la grille.');
          setIsRunning(false);
          return;
        }

        // Check obstacles
        const hitObstacle = obstacles.some((o: Record<string, unknown>) => o.x === nx && o.y === ny);
        if (hitObstacle) {
          sound.playPop();
          setExecutionMessage('💥 Obstacle détecté ! Le robot ne peut pas traverser cette case.');
          setIsRunning(false);
          return;
        }

        current.x = nx;
        current.y = ny;
      } else if (cmd === 'IF_OBSTACLE_TURN_LEFT') {
        let fx = current.x;
        let fy = current.y;
        if (current.dir === 'right') fx++;
        else if (current.dir === 'left') fx--;
        else if (current.dir === 'down') fy++;
        else if (current.dir === 'up') fy--;

        const isBlocked =
          fx < 0 ||
          fx >= gridSize ||
          fy < 0 ||
          fy >= gridSize ||
          obstacles.some((o: Record<string, unknown>) => o.x === fx && o.y === fy);

        if (isBlocked) {
          const idx = dirs.indexOf(current.dir);
          current.dir = dirs[(idx + 3) % 4];
        }
      }

      setRobotPos({ ...current });

      // Check if current position matches an uncollected target
      for (const t of targets) {
        if (t.x === current.x && t.y === current.y) {
          if (!newlyCollected.some(c => c.x === t.x && c.y === t.y)) {
            newlyCollected.push({ x: t.x, y: t.y });
            setCollectedTargets([...newlyCollected]);
            sound.playPop();
          }
        }
      }
    }

    setIsRunning(false);
    setExecutionIndex(null);

    // Verify win condition
    const win =
      targets.length > 0 &&
      targets.every((t: Record<string, unknown>) => newlyCollected.some(c => c.x === t.x && c.y === t.y));

    if (win) {
      sound.playSuccess();
      setIsSuccess(true);
      setExecutionMessage('🎉 Mission accomplie ! Le robot a récolté toutes les étoiles avec succès !');

      if (selectedChild) {
        try {
          const res = await api.completeActivity(selectedActivity.id, {
            childId: selectedChild.id,
            isSuccess: true,
            score: 100,
            timeSpentSeconds: 45
          });
          await refreshChildData();
          setActivities(prev =>
            prev.map(a => (a.id === selectedActivity.id ? { ...a, isCompleted: true } : a))
          );

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
    } else {
      sound.playPop();
      setExecutionMessage('Le robot n’a pas encore atteint toutes les cibles. Ajuste ton code et réessaie !');
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
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-500">Chargement de Code Kids Studio...</p>
        </div>
      </div>
    );
  }

  const gridSize = selectedActivity?.data.gridSize || 5;
  const targets = selectedActivity?.data.targets || [];
  const obstacles = selectedActivity?.data.obstacles || [];

  const directBlocks: CodeBlockType[] = ['MOVE_UP', 'MOVE_DOWN', 'MOVE_LEFT', 'MOVE_RIGHT'];
  const orientationBlocks: CodeBlockType[] = ['FORWARD', 'TURN_LEFT', 'TURN_RIGHT'];
  const loopBlocks: CodeBlockType[] = ['REPEAT_2', 'REPEAT_3', 'IF_OBSTACLE_TURN_LEFT'];

  const getFilteredBlocks = (): CodeBlockType[] => {
    if (categoryFilter === 'direct') return directBlocks;
    if (categoryFilter === 'orientation') return orientationBlocks;
    if (categoryFilter === 'loop') return loopBlocks;
    return [...directBlocks, ...orientationBlocks, ...loopBlocks];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Code Kids Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Apprends à programmer en assemblant des blocs et guide ton robot
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCoachOpen(true)}
          className="py-2.5 px-4 rounded-2xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto active:scale-95"
        >
          <Bot className="w-4 h-4 text-cyan-600" />
          <span>Demander conseil au Coach IA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left column: Activity selector list */}
        <div className="lg:col-span-3 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-1">
            Les 20 Missions de Code
          </div>
          {activities.map((act, index) => {
            const isSelected = selectedActivity?.id === act.id;
            return (
              <div
                key={act.id}
                onClick={() => handleSelectActivity(act)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                    : act.isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold truncate max-w-[140px]">{act.title}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                      +{act.xpReward} XP
                    </div>
                  </div>
                </div>

                {act.isCompleted ? (
                  <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Center: Grid World Simulation */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-100 text-cyan-800">
                NIVEAU {selectedActivity?.level || 0}
              </span>
              <span className="text-xs font-extrabold text-amber-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                +{selectedActivity?.xpReward || 15} XP
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-900 font-heading">
              {selectedActivity?.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {selectedActivity?.description}
            </p>
          </div>

          {/* Interactive World Grid */}
          <div className="my-6 p-3 sm:p-4 bg-slate-900 rounded-3xl shadow-inner border-4 border-slate-800">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                const x = idx % gridSize;
                const y = Math.floor(idx / gridSize);

                const isRobot = robotPos.x === x && robotPos.y === y;
                const isTarget = targets.some((t: Record<string, unknown>) => t.x === x && t.y === y);
                const isCollected = collectedTargets.some(c => c.x === x && c.y === y);
                const isObstacle = obstacles.some((o: Record<string, unknown>) => o.x === x && o.y === y);

                const dirAngle = {
                  right: 'rotate-0',
                  down: 'rotate-90',
                  left: 'rotate-180',
                  up: '-rotate-90'
                }[robotPos.dir] || 'rotate-0';

                return (
                  <div
                    key={idx}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center relative transition-all"
                  >
                    {/* Obstacle Icon */}
                    {isObstacle && (
                      <div className="flex items-center justify-center" title="Obstacle infranchissable">
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-slate-700/90 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-inner">
                          <OctagonX className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
                        </div>
                      </div>
                    )}

                    {/* Target Star Icon */}
                    {isTarget && !isCollected && !isRobot && (
                      <div className="flex items-center justify-center animate-bounce" title="Étoile à récolter !">
                        <Star className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                      </div>
                    )}

                    {/* Robot Icon */}
                    {isRobot && (
                      <div
                        className={`transition-transform duration-300 transform ${dirAngle} flex items-center justify-center relative`}
                        title={`Robot orienté vers : ${robotPos.dir}`}
                      >
                        <Bot className="w-7 h-7 sm:w-10 sm:h-10 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                        {/* Orientation pointer dot */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
                      </div>
                    )}

                    {/* Target collected check */}
                    {isTarget && isCollected && !isRobot && (
                      <div className="flex items-center justify-center animate-in zoom-in">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status feedback message */}
          {executionMessage && (
            <div
              className={`w-full p-3 rounded-2xl text-xs font-bold text-center mb-4 transition-all animate-in fade-in ${
                isSuccess
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {executionMessage}
            </div>
          )}

          {/* Controls: Run & Reset */}
          <div className="w-full flex items-center gap-3">
            <button
              onClick={runProgram}
              disabled={isRunning || program.length === 0}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? 'Exécution...' : 'Lancer le Programme'}</span>
            </button>

            <button
              onClick={resetSimulation}
              disabled={isRunning}
              title="Réinitialiser la position du robot"
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isSuccess && (
              <button
                onClick={handleNextActivity}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-extrabold text-sm shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right column: Block Palette & Program Workspace */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Available Blocks Palette */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Boîte à Blocs d’Instructions
              </span>
              <span className="text-[10px] text-slate-400">Clique pour ajouter</span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Tous
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('direct')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  categoryFilter === 'direct'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Monter/Bas
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('orientation')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  categoryFilter === 'orientation'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pivoter
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('loop')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  categoryFilter === 'loop'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Boucles
              </button>
            </div>

            {/* Blocks List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {getFilteredBlocks().map((blockKey) => {
                const b = BLOCK_METADATA[blockKey];
                const IconComponent = b.icon;
                return (
                  <button
                    key={blockKey}
                    type="button"
                    onClick={() => addBlock(blockKey)}
                    disabled={isRunning}
                    title={b.hint}
                    className={`w-full py-2.5 px-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-between shadow-xs cursor-pointer active:scale-95 ${b.bgColor} ${b.color} disabled:opacity-50`}
                  >
                    <span className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span>{b.label}</span>
                    </span>
                    <span className="text-[11px] opacity-80 flex items-center gap-0.5">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Assembled Program Workspace */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Mon Programme ({program.length} blocs)
                </span>
                {program.length > 0 && (
                  <button
                    onClick={clearProgram}
                    disabled={isRunning}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Tout effacer</span>
                  </button>
                )}
              </div>

              {program.length === 0 ? (
                <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-medium space-y-1">
                  <p className="font-bold text-slate-500">Aucun bloc dans ton code</p>
                  <p>Clique sur « Monter », « Descendre » ou d’autres blocs pour guider ton robot vers les étoiles ! 🌟</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                  {program.map((blockKey, idx) => {
                    const b = BLOCK_METADATA[blockKey];
                    const IconComponent = b.icon;
                    const isExecutingThis = executionIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                          isExecutingThis
                            ? 'bg-amber-100 border-amber-500 scale-105 shadow-md'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-black w-4 text-slate-400">
                            {idx + 1}.
                          </span>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${b.bgColor} text-white`}>
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">{b.label}</span>
                        </div>
                        <button
                          onClick={() => removeBlock(idx)}
                          disabled={isRunning}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Supprimer ce bloc"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Concept : {selectedActivity?.conceptLearned}</span>
            </div>
          </div>

        </div>

      </div>

      {/* AI Coach Socratic modal */}
      {selectedActivity && (
        <AICoachModal
          isOpen={isCoachOpen}
          onClose={() => setIsCoachOpen(false)}
          activityTitle={selectedActivity.title}
          activityCategory="code"
          activityDescription={selectedActivity.description}
          currentQuestion="Comment guider le robot jusqu’à toutes les étoiles sans heurter les obstacles ?"
          userAnswer={`Programme actuel de ${program.length} blocs : ${program.join(', ')}`}
          errorContext={executionMessage && !isSuccess ? executionMessage : undefined}
        />
      )}

    </div>
  );
};
