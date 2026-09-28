export type DomainCategory = 'logic' | 'code' | 'ai' | 'creative' | 'digital';

export type ActivityDifficulty = 'easy' | 'medium' | 'hard';

export interface User {
  id: string;
  username: string;
  role: 'parent';
  createdAt: string;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  favoriteDomain?: DomainCategory;
  unlockedBadgeCodes?: string[];
  createdAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: DomainCategory;
  level: number;
  difficulty: ActivityDifficulty;
  durationMinutes: number;
  xpReward: number;
  conceptLearned: string;
  type: 'quiz' | 'sequence' | 'code-blocks' | 'classification' | 'creative' | 'interactive';
  data: any;
  isCompleted?: boolean;
}

export interface ActivityAttempt {
  id: string;
  childId: string;
  activityId: string;
  activityTitle: string;
  category: DomainCategory;
  isSuccess: boolean;
  score: number;
  timeSpentSeconds: number;
  timestamp: string;
  xpEarned: number;
  hintsUsed: number;
}

export interface Badge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  category: DomainCategory | 'general';
  xpBonus: number;
  criteria: string;
  unlockedAt?: string;
  isUnlocked?: boolean;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  category: DomainCategory | 'general';
  targetCount: number;
  currentCount: number;
  xpReward: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}

export interface Project {
  id: string;
  childId: string;
  title: string;
  description: string;
  category: DomainCategory;
  skills: string[];
  xpEarned: number;
  createdAt: string;
  status: 'in_progress' | 'completed';
  data: any;
}

export interface RankInfo {
  name: string;
  icon: string;
  minLevel: number;
  maxLevel: number;
}

export interface LevelProgress {
  currentLevel: number;
  currentXp: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  progressPercent: number;
  rank: RankInfo;
}

export interface ParentRecommendation {
  id: string;
  domain: DomainCategory;
  type: 'success' | 'focus' | 'challenge';
  message: string;
  suggestedActivityId?: string;
  suggestedActivityTitle?: string;
}

export interface DashboardStats {
  child: Child;
  levelProgress: LevelProgress;
  streak: number;
  totalActivitiesCompleted: number;
  totalTimeMinutes: number;
  badgesCount: number;
  domainProgress: Record<DomainCategory, {
    completedCount: number;
    totalCount: number;
    percentage: number;
    xpEarned: number;
  }>;
  recentAttempts: ActivityAttempt[];
  weeklyActivity: {
    day: string;
    dayName: string;
    activityTitle: string;
    category: DomainCategory;
    status: 'completed' | 'in_progress';
  }[];
  recommendations: ParentRecommendation[];
}

export interface AICoachRequest {
  childAge: number;
  activityTitle: string;
  activityCategory: DomainCategory;
  activityDescription: string;
  currentQuestion?: string;
  userAnswer?: string;
  childMessage?: string;
  errorContext?: string;
  previousAttempts?: number;
}

export interface AICoachResponse {
  message: string;
  hintLevel: number;
  encouragement: string;
  suggestedAction?: string;
}
