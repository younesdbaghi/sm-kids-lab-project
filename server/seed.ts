import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import type {
  UserModel,
  ChildModel,
  ActivityModel,
  BadgeModel,
  DailyMissionModel
} from './db.ts';
import type { INITIAL_ACTIVITIES, INITIAL_BADGES, INITIAL_DAILY_MISSIONS } from './data/initialActivities.ts';

dotenv.config();

async function runSeed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smartkidslab';
  console.log('🌱 Connexion à MongoDB pour initialisation des données :', uri);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connecté à MongoDB avec succès.');

    // 1. Clear existing
    console.log('🧹 Nettoyage des anciennes données...');
    await UserModel.deleteMany({});
    await ChildModel.deleteMany({});
    await ActivityModel.deleteMany({});
    await BadgeModel.deleteMany({});
    await DailyMissionModel.deleteMany({});

    // 2. Create Admin Parent
    console.log('👤 Création du compte parent administrateur : admin / admin123@0');
    const passwordHash = await bcrypt.hash('admin123@0', 10);
    const admin = new UserModel({
      username: 'admin',
      passwordHash,
      role: 'parent'
    });
    await admin.save();

    // 3. Create Default Child (Adam, 9 ans, Niveau 0, 0 XP)
    console.log('🧒 Création du profil enfant initial : Adam, 9 ans, Niveau 0, 0 XP');
    const adam = new ChildModel({
      parentId: admin._id.toString(),
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

    // 4. Seed Activities (95+)
    console.log(`📚 Insertion des ${INITIAL_ACTIVITIES.length} activités pédagogiques interactives...`);
    await ActivityModel.insertMany(INITIAL_ACTIVITIES);

    // 5. Seed Badges
    console.log(`🏅 Insertion des ${INITIAL_BADGES.length} badges...`);
    await BadgeModel.insertMany(INITIAL_BADGES);

    // 6. Seed Daily Missions
    console.log(`⭐ Insertion des ${INITIAL_DAILY_MISSIONS.length} missions quotidiennes...`);
    await DailyMissionModel.insertMany(INITIAL_DAILY_MISSIONS);

    console.log('🎉 Seed terminé avec grand succès !');
    console.log('Prêt pour la commande : npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed MongoDB :', error);
    process.exit(1);
  }
}

runSeed();
