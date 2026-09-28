import type { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import type { db } from '../db.ts';
import type { authMiddleware, AuthenticatedRequest, generateToken } from '../middleware/auth.ts';
import { calculateLevelFromXp, getRankForLevel } from '../../shared/progression.ts';
import type { askAICoach } from '../services/aiCoach.ts';
import { DomainCategory, ParentRecommendation } from '../../shared/types.ts';

export const apiRouter = Router();

// --- Auth Routes ---
apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Veuillez saisir votre identifiant et votre mot de passe.' });
  }

  const user = await db.findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect.' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Identifiant ou mot de passe incorrect.' });
  }

  const token = generateToken({ id: user.id, username: user.username, role: user.role });
  const children = await db.getChildren(user.id);

  return res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
    children
  });
});

apiRouter.post('/auth/logout', (_req, res) => {
  return res.json({ message: 'Déconnexion réussie.' });
});

apiRouter.post('/auth/change-password', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Veuillez renseigner le mot de passe actuel et le nouveau mot de passe.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' });
  }

  const user = await db.findUserById(req.user!.id);
  if (!user) {
    return res.status(404).json({ message: 'Compte parent introuvable.' });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: 'Le mot de passe actuel est incorrect.' });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.updateUserPassword(user.id, newHash);

  return res.json({ success: true, message: 'Votre mot de passe a été modifié avec succès !' });
});

apiRouter.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const user = await db.findUserById(req.user!.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

  const children = await db.getChildren(user.id);
  return res.json({
    user: { id: user.id, username: user.username, role: user.role },
    children
  });
});

// --- Children Routes ---
apiRouter.get('/children', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const children = await db.getChildren(req.user!.id);
  return res.json(children);
});

apiRouter.post('/children', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { name, age, avatar } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: 'Le prénom et l’âge sont requis.' });
  }

  const child = await db.createChild({
    parentId: req.user!.id,
    name: name.trim(),
    age: Number(age),
    avatar: avatar || '🤖'
  });

  return res.status(201).json(child);
});

apiRouter.get('/children/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const child = await db.getChildById(req.params.id);
  if (!child) return res.status(404).json({ message: 'Profil enfant non trouvé.' });

  const { progress } = calculateLevelFromXp(child.xp);
  return res.json({ ...child, levelProgress: progress });
});

apiRouter.put('/children/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { name, age, avatar, favoriteDomain } = req.body;
  const updates: any = {};
  if (name !== undefined) updates.name = String(name).trim();
  if (age !== undefined) updates.age = Number(age);
  if (avatar !== undefined) updates.avatar = String(avatar);
  if (favoriteDomain !== undefined) updates.favoriteDomain = String(favoriteDomain);

  const child = await db.updateChild(req.params.id, updates);
  if (!child) return res.status(404).json({ message: 'Profil enfant non trouvé.' });
  return res.json(child);
});

apiRouter.delete('/children/:id', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const child = await db.getChildById(id);
  if (!child) {
    return res.status(404).json({ message: 'Profil enfant introuvable.' });
  }

  const success = await db.deleteChild(id);
  if (!success) {
    return res.status(500).json({ message: 'Impossible de supprimer le profil.' });
  }

  return res.json({ success: true, message: `Profil de ${child.name} supprimé avec succès.` });
});

// --- Activities Routes ---
apiRouter.get('/children/:id/activities', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { category } = req.query;

  const activities = await db.getActivities(category ? String(category) : undefined);
  const attempts = await db.getAttemptsByChild(id);

  const completedMap = new Map<string, boolean>();
  for (const a of attempts) {
    if (a.isSuccess) completedMap.set(a.activityId, true);
  }

  const list = activities.map(act => ({
    ...act,
    isCompleted: !!completedMap.get(act.id)
  }));

  return res.json(list);
});

apiRouter.get('/activities/:id', authMiddleware, async (req, res) => {
  const activity = await db.getActivityById(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activité non trouvée.' });
  return res.json(activity);
});

// Complete an activity
apiRouter.post('/activities/:id/complete', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { childId, isSuccess, score, timeSpentSeconds, hintsUsed } = req.body;

  if (!childId) {
    return res.status(400).json({ message: 'L’identifiant de l’enfant est requis.' });
  }

  const child = await db.getChildById(childId);
  if (!child) {
    return res.status(404).json({ message: 'Enfant non trouvé.' });
  }

  const activity = await db.getActivityById(id);
  if (!activity) {
    return res.status(404).json({ message: 'Activité non trouvée.' });
  }

  const previousAttempts = await db.getAttemptsByChild(childId);
  const alreadyCompleted = previousAttempts.some(a => a.activityId === id && a.isSuccess);

  // Anti-farm XP calculation
  let earnedXp = 0;
  if (isSuccess) {
    if (!alreadyCompleted) {
      earnedXp = activity.xpReward || 15;
    } else {
      earnedXp = 5; // Practice bonus for repeating
    }
  }

  // Record attempt
  await db.recordAttempt({
    childId,
    activityId: id,
    activityTitle: activity.title,
    category: activity.category,
    isSuccess: !!isSuccess,
    score: score || 100,
    timeSpentSeconds: timeSpentSeconds || 60,
    xpEarned: earnedXp,
    hintsUsed: hintsUsed || 0
  });

  // Calculate new streak
  const todayStr = new Date().toISOString().split('T')[0];
  let newStreak = child.streak || 1;
  if (child.lastActiveDate !== todayStr) {
    const lastDate = new Date(child.lastActiveDate);
    const today = new Date(todayStr);
    const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const oldXp = child.xp || 0;
  const newXp = oldXp + earnedXp;
  const oldLevelInfo = calculateLevelFromXp(oldXp);
  const newLevelInfo = calculateLevelFromXp(newXp);
  const levelUp = newLevelInfo.level > oldLevelInfo.level;

  // Check badges to unlock
  const allAttempts = await db.getAttemptsByChild(childId);
  const successfulAttempts = allAttempts.filter(a => a.isSuccess);
  const currentBadges = new Set<string>(child.unlockedBadgeCodes || []);
  const newlyUnlockedBadges: any[] = [];
  const allBadges = await db.getBadges();

  const checkBadge = (code: string, condition: boolean) => {
    if (condition && !currentBadges.has(code)) {
      currentBadges.add(code);
      const b = allBadges.find(x => x.code === code);
      if (b) newlyUnlockedBadges.push(b);
    }
  };

  checkBadge('first_step', successfulAttempts.length >= 1);
  checkBadge('logic_10', successfulAttempts.filter(a => a.category === 'logic').length >= 10);
  checkBadge('first_code', successfulAttempts.filter(a => a.category === 'code').length >= 1);
  checkBadge('ai_5', successfulAttempts.filter(a => a.category === 'ai').length >= 5);
  checkBadge('digital_5', successfulAttempts.filter(a => a.category === 'digital').length >= 5);
  checkBadge('logic_master', successfulAttempts.filter(a => a.category === 'logic').length >= 25);
  checkBadge('streak_7', newStreak >= 7);
  checkBadge('pro_rank', newLevelInfo.level >= 95);

  const categoriesCompleted = new Set(successfulAttempts.map(a => a.category));
  const hasAllFive = ['logic', 'code', 'ai', 'creative', 'digital'].every(cat => 
    successfulAttempts.filter(a => a.category === cat).length >= 3
  );
  checkBadge('all_domains', hasAllFive);

  // Add badge bonus XP
  let badgeBonusXp = 0;
  for (const b of newlyUnlockedBadges) {
    badgeBonusXp += (b.xpBonus || 50);
  }

  const finalTotalXp = newXp + badgeBonusXp;
  const finalLevelInfo = calculateLevelFromXp(finalTotalXp);

  await db.updateChild(childId, {
    xp: finalTotalXp,
    level: finalLevelInfo.level,
    streak: newStreak,
    lastActiveDate: todayStr,
    unlockedBadgeCodes: Array.from(currentBadges)
  } as any);

  return res.json({
    success: true,
    xpEarned: earnedXp,
    badgeBonusXp,
    totalXp: finalTotalXp,
    oldLevel: oldLevelInfo.level,
    newLevel: finalLevelInfo.level,
    levelUp,
    levelProgress: finalLevelInfo.progress,
    newlyUnlockedBadges,
    streak: newStreak
  });
});

// --- Badges Routes ---
apiRouter.get('/children/:id/badges', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const child = await db.getChildById(req.params.id);
  if (!child) return res.status(404).json({ message: 'Enfant non trouvé.' });

  const badges = await db.getBadges();
  const unlockedSet = new Set(child.unlockedBadgeCodes || []);

  const result = badges.map(b => ({
    ...b,
    isUnlocked: unlockedSet.has(b.code)
  }));

  return res.json(result);
});

// --- Missions Routes ---
apiRouter.get('/children/:id/missions', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const child = await db.getChildById(req.params.id);
  if (!child) return res.status(404).json({ message: 'Enfant non trouvé.' });

  const missions = await db.getMissions();
  const attempts = await db.getAttemptsByChild(req.params.id);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttempts = attempts.filter(a => a.timestamp.startsWith(todayStr) && a.isSuccess);

  const updatedMissions = missions.map(m => {
    let currentCount = 0;
    if (m.category === 'general') {
      currentCount = attempts.filter(a => a.isSuccess).length;
    } else {
      currentCount = todayAttempts.filter(a => a.category === m.category).length;
    }
    const completed = currentCount >= m.targetCount;
    return {
      ...m,
      currentCount: Math.min(m.targetCount, currentCount),
      completed
    };
  });

  return res.json(updatedMissions);
});

// --- Projects Routes ---
apiRouter.get('/children/:id/projects', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const projects = await db.getProjectsByChild(req.params.id);
  return res.json(projects);
});

apiRouter.post('/children/:id/projects', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, category, skills, data } = req.body;

  const child = await db.getChildById(id);
  if (!child) return res.status(404).json({ message: 'Enfant non trouvé.' });

  const projectXp = 50;
  const project = await db.saveProject({
    childId: id,
    title: title || 'Nouveau Chef-d’œuvre',
    description: description || '',
    category: category || 'creative',
    skills: skills || ['Créativité', 'Design'],
    xpEarned: projectXp,
    data: data || {}
  });

  // Check creator badge
  const currentBadges = new Set(child.unlockedBadgeCodes || []);
  let newlyUnlockedBadge = null;
  if (!currentBadges.has('first_project')) {
    currentBadges.add('first_project');
    const allBadges = await db.getBadges();
    newlyUnlockedBadge = allBadges.find(b => b.code === 'first_project');
  }

  const newTotalXp = (child.xp || 0) + projectXp;
  const { level, progress } = calculateLevelFromXp(newTotalXp);

  await db.updateChild(id, {
    xp: newTotalXp,
    level,
    unlockedBadgeCodes: Array.from(currentBadges)
  } as any);

  return res.status(201).json({
    project,
    xpEarned: projectXp,
    newTotalXp,
    levelProgress: progress,
    newlyUnlockedBadge
  });
});

// --- AI Coach Route ---
apiRouter.post('/ai/coach', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const coachRequest = req.body;
  const response = await askAICoach(coachRequest);
  return res.json(response);
});

// --- Dashboard & Analytics Route ---
apiRouter.get('/dashboard', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const children = await db.getChildren(req.user!.id);
  if (children.length === 0) {
    return res.json({ children: [], selectedChild: null });
  }

  const selectedChildId = req.query.childId ? String(req.query.childId) : children[0].id;
  const child = children.find(c => c.id === selectedChildId) || children[0];

  const attempts = await db.getAttemptsByChild(child.id);
  const activities = await db.getActivities();
  const badges = await db.getBadges();
  const { progress } = calculateLevelFromXp(child.xp);

  // Domain breakdown
  const domains: DomainCategory[] = ['logic', 'code', 'ai', 'creative', 'digital'];
  const domainProgress: any = {};

  for (const d of domains) {
    const totalInDomain = activities.filter(a => a.category === d).length;
    const completedInDomain = new Set(attempts.filter(a => a.category === d && a.isSuccess).map(a => a.activityId)).size;
    const xpInDomain = attempts.filter(a => a.category === d && a.isSuccess).reduce((acc, a) => acc + (a.xpEarned || 0), 0);
    const percentage = totalInDomain > 0 ? Math.round((completedInDomain / totalInDomain) * 100) : 0;

    domainProgress[d] = {
      completedCount: completedInDomain,
      totalCount: totalInDomain,
      percentage,
      xpEarned: xpInDomain
    };
  }

  // Weekly timeline (Lundi to Dimanche)
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const weeklyActivity = daysOfWeek.map((dayName, idx) => {
    const relevantAttempt = attempts[idx % attempts.length];
    return {
      day: `J-${7 - idx}`,
      dayName,
      activityTitle: relevantAttempt ? relevantAttempt.activityTitle : 'Découverte des algorithmes',
      category: (relevantAttempt ? relevantAttempt.category : 'logic') as DomainCategory,
      status: (idx < 5 ? 'completed' : 'in_progress') as 'completed' | 'in_progress'
    };
  });

  // Calculate total time
  const totalSeconds = attempts.reduce((acc, a) => acc + (a.timeSpentSeconds || 60), 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  // Recommendations for parents
  const recommendations: ParentRecommendation[] = [];

  // Logic vs Code comparison
  if (domainProgress.logic.completedCount >= domainProgress.code.completedCount + 2) {
    recommendations.push({
      id: 'rec-code',
      domain: 'code',
      type: 'focus',
      message: `${child.name} excelle en raisonnement logique ! Pour stimuler sa créativité technique, proposez-lui une mission de programmation Code Kids.`,
      suggestedActivityId: 'code-1',
      suggestedActivityTitle: 'Premier Pas : Avancer vers l’Étoile'
    });
  }

  if (domainProgress.ai.completedCount === 0) {
    recommendations.push({
      id: 'rec-ai',
      domain: 'ai',
      type: 'challenge',
      message: `${child.name} n’a pas encore exploré le laboratoire d’Intelligence Artificielle. Le module "C'est quoi une IA ?" est parfait pour son âge.`,
      suggestedActivityId: 'ai-1',
      suggestedActivityTitle: 'Qu’est-ce qu’une IA ?'
    });
  }

  if (attempts.filter(a => a.isSuccess).length >= 5) {
    recommendations.push({
      id: 'rec-success',
      domain: 'creative',
      type: 'success',
      message: `Formidable régularité cette semaine ! Félicitez ${child.name} pour sa persévérance et invitez-le à inventer un robot dans le Creative Lab.`,
      suggestedActivityId: 'creative-1',
      suggestedActivityTitle: 'Pixel Art : Mon Premier Robot'
    });
  }

  const stats = {
    child,
    children,
    levelProgress: progress,
    streak: child.streak || 1,
    totalActivitiesCompleted: new Set(attempts.filter(a => a.isSuccess).map(a => a.activityId)).size,
    totalTimeMinutes: Math.max(15, totalMinutes),
    badgesCount: (child.unlockedBadgeCodes || []).length,
    domainProgress,
    recentAttempts: attempts.slice(0, 10),
    weeklyActivity,
    recommendations
  };

  return res.json(stats);
});
