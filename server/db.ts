import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { INITIAL_ACTIVITIES, INITIAL_BADGES, INITIAL_DAILY_MISSIONS } from './data/initialActivities.ts';
import type { calculateLevelFromXp } from '../shared/progression.ts';

// --- Mongoose Schemas ---
export interface IUser extends Document {
  id: string;
  username: string;
  passwordHash: string;
  role: 'parent';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'parent' },
  createdAt: { type: Date, default: Date.now }
});

export interface IChild extends Document {
  id: string;
  parentId: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  favoriteDomain?: string;
  unlockedBadgeCodes: string[];
  createdAt: Date;
}

const ChildSchema = new Schema<IChild>({
  parentId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  avatar: { type: String, default: '🤖' },
  level: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 1 },
  lastActiveDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  favoriteDomain: { type: String, default: 'logic' },
  unlockedBadgeCodes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const ActivitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, default: 0 },
  difficulty: { type: String, default: 'easy' },
  durationMinutes: { type: Number, default: 5 },
  xpReward: { type: Number, default: 15 },
  conceptLearned: { type: String, default: '' },
  type: { type: String, required: true },
  data: { type: Schema.Types.Mixed, default: {} }
});

const ActivityAttemptSchema = new Schema({
  childId: { type: String, required: true },
  activityId: { type: String, required: true },
  activityTitle: { type: String, required: true },
  category: { type: String, required: true },
  isSuccess: { type: Boolean, required: true },
  score: { type: Number, default: 100 },
  timeSpentSeconds: { type: Number, default: 60 },
  timestamp: { type: String, default: () => new Date().toISOString() },
  xpEarned: { type: Number, default: 0 },
  hintsUsed: { type: Number, default: 0 }
});

const BadgeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: { type: String, required: true },
  xpBonus: { type: Number, default: 50 },
  criteria: { type: String, required: true }
});

const ProjectSchema = new Schema({
  id: { type: String, required: true, unique: true },
  childId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  skills: { type: [String], default: [] },
  xpEarned: { type: Number, default: 50 },
  createdAt: { type: String, default: () => new Date().toISOString() },
  status: { type: String, default: 'completed' },
  data: { type: Schema.Types.Mixed, default: {} }
});

const DailyMissionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  targetCount: { type: Number, default: 1 },
  currentCount: { type: Number, default: 0 },
  xpReward: { type: Number, default: 30 },
  completed: { type: Boolean, default: false },
  type: { type: String, default: 'daily' }
});

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const ChildModel = mongoose.models.Child || mongoose.model<IChild>('Child', ChildSchema);
export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
export const ActivityAttemptModel = mongoose.models.ActivityAttempt || mongoose.model('ActivityAttempt', ActivityAttemptSchema);
export const BadgeModel = mongoose.models.Badge || mongoose.model('Badge', BadgeSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const DailyMissionModel = mongoose.models.DailyMission || mongoose.model('DailyMission', DailyMissionSchema);

// In-Memory Fallback State (when MongoDB daemon is not running)
interface DBState {
  users: Record<string, unknown>[];
  children: Record<string, unknown>[];
  activities: Record<string, unknown>[];
  attempts: Record<string, unknown>[];
  badges: Record<string, unknown>[];
  projects: Record<string, unknown>[];
  missions: Record<string, unknown>[];
}

const memoryDb: DBState = {
  users: [],
  children: [],
  activities: [...INITIAL_ACTIVITIES],
  attempts: [],
  badges: [...INITIAL_BADGES],
  projects: [],
  missions: [...INITIAL_DAILY_MISSIONS]
};

let isMongoConnected = false;

export async function initDatabase(): Promise<void> {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartkidslab';
  
  try {
    // Attempt Mongoose connection with short timeout so server starts instantly even if local mongod is down
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    isMongoConnected = true;
    console.log('✅ Connecté avec succès à MongoDB:', uri);
    await seedMongooseIfNeeded();
  } catch (err: unknown) {
    isMongoConnected = false;
    console.log('ℹ️ MongoDB local non détecté, exécution en mode stockage mémoire persistant.');
    await seedMemoryDb();
  }
}

async function seedMemoryDb() {
  // Ensure admin user exists in memory
  if (!memoryDb.users.find(u => u.username === 'admin')) {
    const passwordHash = await bcrypt.hash('admin123@0', 10);
    memoryDb.users.push({
      id: 'admin-1',
      username: 'admin',
      passwordHash,
      role: 'parent',
      createdAt: new Date().toISOString()
    });
  }

  // Ensure default child exists in memory
  if (memoryDb.children.length === 0) {
    memoryDb.children.push({
      id: 'child-adam-1',
      parentId: 'admin-1',
      name: 'Adam',
      age: 9,
      avatar: '🤖',
      level: 0,
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      favoriteDomain: 'logic',
      unlockedBadgeCodes: [],
      createdAt: new Date().toISOString()
    });
  }
}

async function seedMongooseIfNeeded() {
  const adminExists = await UserModel.findOne({ username: 'admin' });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('admin123@0', 10);
    const adminUser = new UserModel({
      username: 'admin',
      passwordHash,
      role: 'parent'
    });
    await adminUser.save();

    const adam = new ChildModel({
      parentId: adminUser._id.toString(),
      name: 'Adam',
      age: 9,
      avatar: '🤖',
      level: 0,
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      favoriteDomain: 'logic',
      unlockedBadgeCodes: []
    });
    await adam.save();
  }

  const activitiesCount = await ActivityModel.countDocuments();
  if (activitiesCount === 0) {
    await ActivityModel.insertMany(INITIAL_ACTIVITIES);
  }

  const badgesCount = await BadgeModel.countDocuments();
  if (badgesCount === 0) {
    await BadgeModel.insertMany(INITIAL_BADGES);
  }

  const missionsCount = await DailyMissionModel.countDocuments();
  if (missionsCount === 0) {
    await DailyMissionModel.insertMany(INITIAL_DAILY_MISSIONS);
  }
}

// --- Unified Data Access Service ---

export const db = {
  async findUserByUsername(username: string) {
    if (isMongoConnected) {
      const u = await UserModel.findOne({ username }).lean();
      return u ? { ...u, id: (u as Record<string, unknown>)._id?.toString() || (u as Record<string, unknown>).id } : null;
    }
    return memoryDb.users.find(u => u.username === username) || null;
  },

  async findUserById(id: string) {
    if (isMongoConnected) {
      const u = await UserModel.findById(id).lean();
      return u ? { ...u, id: (u as Record<string, unknown>)._id?.toString() || (u as Record<string, unknown>).id } : null;
    }
    return memoryDb.users.find(u => u.id === id) || null;
  },

  async updateUserPassword(userId: string, newPasswordHash: string) {
    if (isMongoConnected) {
      try {
        await UserModel.findByIdAndUpdate(userId, { passwordHash: newPasswordHash });
      } catch (e) {
        await UserModel.updateOne({ id: userId }, { passwordHash: newPasswordHash });
      }
      return true;
    }
    const u = memoryDb.users.find(u => u.id === userId);
    if (u) {
      u.passwordHash = newPasswordHash;
      return true;
    }
    return false;
  },

  async getChildren(parentId?: string) {
    if (isMongoConnected) {
      const query = parentId ? { parentId } : {};
      const list = await ChildModel.find(query).lean();
      return list.map(c => ({ ...c, id: (c as Record<string, unknown>)._id?.toString() || (c as Record<string, unknown>).id }));
    }
    return parentId ? memoryDb.children.filter(c => c.parentId === parentId) : memoryDb.children;
  },

  async getChildById(id: string) {
    if (isMongoConnected) {
      try {
        const c = await ChildModel.findById(id).lean();
        if (c) return { ...c, id: (c as Record<string, unknown>)._id?.toString() || (c as Record<string, unknown>).id };
      } catch (e) {
        // Not a mongo ObjectID, try custom id
        const c = await ChildModel.findOne({ id }).lean();
        if (c) return { ...c, id: (c as Record<string, unknown>)._id?.toString() || (c as Record<string, unknown>).id };
      }
      return null;
    }
    return memoryDb.children.find(c => c.id === id) || null;
  },

  async createChild(data: { parentId: string; name: string; age: number; avatar: string }) {
    if (isMongoConnected) {
      const child = new ChildModel({
        parentId: data.parentId,
        name: data.name,
        age: data.age,
        avatar: data.avatar || '🤖',
        level: 0,
        xp: 0,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        unlockedBadgeCodes: []
      });
      await child.save();
      return { ...child.toObject(), id: child._id.toString() };
    }

    const newChild = {
      id: `child-${Date.now()}`,
      parentId: data.parentId,
      name: data.name,
      age: data.age,
      avatar: data.avatar || '🤖',
      level: 0,
      xp: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      favoriteDomain: 'logic',
      unlockedBadgeCodes: [],
      createdAt: new Date().toISOString()
    };
    memoryDb.children.push(newChild);
    return newChild;
  },

  async updateChild(id: string, updates: Partial<IChild>) {
    if (isMongoConnected) {
      const updated = await ChildModel.findByIdAndUpdate(id, updates, { new: true }).lean();
      if (updated) return { ...updated, id: (updated as Record<string, unknown>)._id?.toString() };
    }
    const idx = memoryDb.children.findIndex(c => c.id === id);
    if (idx !== -1) {
      memoryDb.children[idx] = { ...memoryDb.children[idx], ...updates };
      return memoryDb.children[idx];
    }
    return null;
  },

  async deleteChild(id: string) {
    if (isMongoConnected) {
      try {
        await ChildModel.findByIdAndDelete(id);
      } catch (e) {
        await ChildModel.deleteOne({ id });
      }
      // Also cleanup child's attempts and projects
      await ActivityAttemptModel.deleteMany({ childId: id });
      await ProjectModel.deleteMany({ childId: id });
      return true;
    }
    const idx = memoryDb.children.findIndex(c => c.id === id);
    if (idx !== -1) {
      memoryDb.children.splice(idx, 1);
      memoryDb.attempts = memoryDb.attempts.filter(a => a.childId !== id);
      memoryDb.projects = memoryDb.projects.filter(p => p.childId !== id);
      return true;
    }
    return false;
  },

  async getActivities(category?: string) {
    if (isMongoConnected) {
      const query = category ? { category } : {};
      return await ActivityModel.find(query).lean();
    }
    return category ? memoryDb.activities.filter(a => a.category === category) : memoryDb.activities;
  },

  async getActivityById(id: string) {
    if (isMongoConnected) {
      return await ActivityModel.findOne({ id }).lean();
    }
    return memoryDb.activities.find(a => a.id === id) || null;
  },

  async getAttemptsByChild(childId: string) {
    if (isMongoConnected) {
      return await ActivityAttemptModel.find({ childId }).sort({ timestamp: -1 }).lean();
    }
    return memoryDb.attempts.filter(a => a.childId === childId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  },

  async recordAttempt(attempt: {
    childId: string;
    activityId: string;
    activityTitle: string;
    category: string;
    isSuccess: boolean;
    score: number;
    timeSpentSeconds: number;
    xpEarned: number;
    hintsUsed: number;
  }) {
    const item = {
      ...attempt,
      id: `attempt-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };

    if (isMongoConnected) {
      const record = new ActivityAttemptModel(item);
      await record.save();
    } else {
      memoryDb.attempts.push(item);
    }
    return item;
  },

  async getBadges() {
    if (isMongoConnected) {
      return await BadgeModel.find({}).lean();
    }
    return memoryDb.badges;
  },

  async getMissions() {
    if (isMongoConnected) {
      return await DailyMissionModel.find({}).lean();
    }
    return memoryDb.missions;
  },

  async getProjectsByChild(childId: string) {
    if (isMongoConnected) {
      return await ProjectModel.find({ childId }).sort({ createdAt: -1 }).lean();
    }
    return memoryDb.projects.filter(p => p.childId === childId);
  },

  async saveProject(project: {
    childId: string;
    title: string;
    description: string;
    category: string;
    skills: string[];
    xpEarned: number;
    data: Record<string, unknown>;
  }) {
    const newProject = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };

    if (isMongoConnected) {
      const p = new ProjectModel(newProject);
      await p.save();
    } else {
      memoryDb.projects.push(newProject);
    }
    return newProject;
  }
};
