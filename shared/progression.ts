import type { LevelProgress, RankInfo } from './types.ts';

export const RANKS: RankInfo[] = [
  { name: 'Débutant', icon: '🌱', minLevel: 0, maxLevel: 2 },
  { name: 'Explorateur', icon: '🔎', minLevel: 3, maxLevel: 6 },
  { name: 'Penseur', icon: '🧠', minLevel: 7, maxLevel: 12 },
  { name: 'Constructeur', icon: '⚙️', minLevel: 13, maxLevel: 19 },
  { name: 'Codeur', icon: '💻', minLevel: 20, maxLevel: 29 },
  { name: 'AI Explorer', icon: '🤖', minLevel: 30, maxLevel: 44 },
  { name: 'Inventeur', icon: '🚀', minLevel: 45, maxLevel: 59 },
  { name: 'Innovateur', icon: '🧪', minLevel: 60, maxLevel: 79 },
  { name: 'Expert', icon: '🏆', minLevel: 80, maxLevel: 94 },
  { name: 'PRO', icon: '👑', minLevel: 95, maxLevel: 100 }
];

export function getXpRequiredForLevel(level: number): number {
  if (level <= 0) return 0;
  if (level === 1) return 100;
  if (level === 2) return 250;
  if (level === 3) return 450;
  if (level === 4) return 700;
  return Math.round(55 * Math.pow(level, 1.42) + 45 * level);
}

export function calculateLevelFromXp(xp: number): { level: number; progress: LevelProgress } {
  let currentLevel = 0;
  while (currentLevel < 100 && xp >= getXpRequiredForLevel(currentLevel + 1)) {
    currentLevel++;
  }

  const xpForCurrent = getXpRequiredForLevel(currentLevel);
  const xpForNext = currentLevel >= 100 ? xpForCurrent : getXpRequiredForLevel(currentLevel + 1);
  const xpInThisLevel = Math.max(0, xp - xpForCurrent);
  const xpNeeded = Math.max(1, xpForNext - xpForCurrent);
  const progressPercent = currentLevel >= 100 ? 100 : Math.min(100, Math.round((xpInThisLevel / xpNeeded) * 100));

  const rank = RANKS.find(r => currentLevel >= r.minLevel && currentLevel <= r.maxLevel) || RANKS[0];

  return {
    level: currentLevel,
    progress: {
      currentLevel,
      currentXp: xp,
      xpForCurrentLevel: xpForCurrent,
      xpForNextLevel: xpForNext,
      progressPercent,
      rank
    }
  };
}

export function getRankForLevel(level: number): RankInfo {
  return RANKS.find(r => level >= r.minLevel && level <= r.maxLevel) || RANKS[0];
}
