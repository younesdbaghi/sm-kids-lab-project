import React, { useState } from 'react';
import type { useApp } from '../context/AppContext.tsx';
import type { sound } from '../utils/sound.ts';
import type { Child } from '../../shared/types.ts';
import type { api } from '../services/api.ts';
import type {
  Settings,
  UserPlus,
  Shield,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Pencil,
  Trash2,
  Sparkles,
  Award,
  Flame,
  X,
  Save,
  Check,
  KeyRound,
  Eye,
  EyeOff,
  Lock,
  Loader2
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    user,
    childrenList,
    selectedChild,
    createChild,
    updateChild,
    deleteChild,
    selectChild
  } = useApp();

  // Create form state
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(8);
  const [newChildAvatar, setNewChildAvatar] = useState('🚀');
  const [isCreating, setIsCreating] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Edit modal state
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState(8);
  const [editAvatar, setEditAvatar] = useState('🤖');
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete modal state
  const [deletingChild, setDeletingChild] = useState<Child | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Difficulty settings
  const [adaptiveLevel, setAdaptiveLevel] = useState('auto');

  const avatarOptions = ['🤖', '🚀', '🧠', '🐱', '🦊', '🦁', '🐼', '👾', '🦄', '🧑‍🚀', '🦖', '⚡'];

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // Handle creation
  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || isCreating) return;

    setIsCreating(true);
    try {
      sound.playSuccess();
      const created = await createChild(newChildName.trim(), newChildAge, newChildAvatar);
      selectChild(created.id);
      setNewChildName('');
      showToast(`Le profil de ${created.name} a été créé avec succès !`);
    } catch (e: any) {
      sound.playPop();
      showToast(e.message || 'Erreur lors de la création', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  // Open edit modal
  const openEditModal = (child: Child) => {
    sound.playPop();
    setEditingChild(child);
    setEditName(child.name);
    setEditAge(child.age);
    setEditAvatar(child.avatar);
  };

  // Save edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChild || !editName.trim() || isUpdating) return;

    setIsUpdating(true);
    try {
      sound.playSuccess();
      await updateChild(editingChild.id, {
        name: editName.trim(),
        age: editAge,
        avatar: editAvatar
      });
      showToast(`Le profil de ${editName.trim()} a été mis à jour !`);
      setEditingChild(null);
    } catch (e: any) {
      sound.playPop();
      showToast(e.message || 'Erreur lors de la modification', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  // Open delete confirm
  const openDeleteModal = (child: Child) => {
    sound.playPop();
    setDeletingChild(child);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingChild || isDeleting) return;

    setIsDeleting(true);
    try {
      sound.playPop();
      const childName = deletingChild.name;
      await deleteChild(deletingChild.id);
      showToast(`Le profil de ${childName} a été supprimé.`);
      setDeletingChild(null);
    } catch (e: any) {
      showToast(e.message || 'Erreur lors de la suppression', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordToast, setPasswordToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isChangingPassword) return;

    if (!currentPassword) {
      sound.playPop();
      setPasswordToast({ type: 'error', text: 'Veuillez saisir votre mot de passe actuel.' });
      return;
    }

    if (newPassword.length < 6) {
      sound.playPop();
      setPasswordToast({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      sound.playPop();
      setPasswordToast({ type: 'error', text: 'Les deux nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    setIsChangingPassword(true);
    setPasswordToast(null);

    try {
      const res = await api.changePassword(currentPassword, newPassword);
      sound.playSuccess();
      setPasswordToast({ type: 'success', text: res.message || 'Mot de passe modifié avec succès !' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordToast(null), 5000);
    } catch (err: any) {
      sound.playPop();
      setPasswordToast({ type: 'error', text: err.message || 'Impossible de modifier le mot de passe.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Gestion du Foyer & Enfants
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Ajoutez, modifiez ou supprimez les profils de vos enfants en toute liberté
            </p>
          </div>
        </div>

        {/* Global Toast Notification */}
        {feedbackMsg && (
          <div className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 border animate-in slide-in-from-top-2 shadow-xs ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}>
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 👨‍👩‍👧 LISTE DES ENFANTS AVEC MODIFICATION & SUPPRESSION          */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
              <span>Profils Enfants Enregistrés</span>
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {childrenList.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Gérez les informations individuelles, suivez les progrès ou retirez des profils
            </p>
          </div>
        </div>

        {childrenList.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <span className="text-4xl block mb-2">👶</span>
            <p className="text-sm font-bold text-slate-600">Aucun profil enfant enregistré pour le moment.</p>
            <p className="text-xs text-slate-400 mt-1">Créez le premier profil ci-dessous pour démarrer l'aventure !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childrenList.map((c) => {
              const isActive = selectedChild?.id === c.id;
              return (
                <div
                  key={c.id}
                  className={`p-5 rounded-3xl border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  {/* Top card row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl shadow-xs group-hover:scale-110 transition-transform">
                        {c.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-slate-900">{c.name}</h3>
                          {isActive && (
                            <span className="text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                              <Check className="w-2.5 h-2.5" />
                              <span>Actif</span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold mt-0.5">
                          {c.age} ans • <span className="text-blue-600 font-bold">Niveau {c.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons (Edit & Delete) */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(c)}
                        title="Modifier ce profil"
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(c)}
                        title="Supprimer ce profil"
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all cursor-pointer shadow-xs active:scale-95"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats pills */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 text-center">
                    <div className="bg-white/80 rounded-xl p-1.5 border border-slate-200/60">
                      <div className="text-[10px] font-bold text-slate-400">Total XP</div>
                      <div className="text-xs font-black text-slate-800">{c.xp}</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-1.5 border border-slate-200/60">
                      <div className="text-[10px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>Série</span>
                      </div>
                      <div className="text-xs font-black text-slate-800">{c.streak || 1} jours</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-1.5 border border-slate-200/60">
                      <div className="text-[10px] font-bold text-slate-400 flex items-center justify-center gap-0.5">
                        <Award className="w-3 h-3 text-yellow-500" />
                        <span>Badges</span>
                      </div>
                      <div className="text-xs font-black text-slate-800">{c.unlockedBadgeCodes?.length || 0}</div>
                    </div>
                  </div>

                  {/* Switch to this child button (if not already active) */}
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        selectChild(c.id);
                        showToast(`Profil actif basculé sur ${c.name}`);
                      }}
                      className="w-full mt-3 py-2 px-3 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-700 hover:text-blue-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Activer le profil de {c.name}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* ➕ AJOUTER UN NOUVEAU PROFIL ENFANT                           */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>Ajouter un Enfant</span>
          </h2>
          <p className="text-xs text-slate-500">
            Chaque enfant débute automatiquement au Niveau 0 (0 XP) et reçoit ses propres badges
          </p>
        </div>

        <form onSubmit={handleCreateChild} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Prénom de l’enfant *
              </label>
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="Ex: Emma, Lucas, Yasmine..."
                required
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Âge de l'enfant (6 à 15 ans) *
              </label>
              <select
                value={newChildAge}
                onChange={(e) => setNewChildAge(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((age) => (
                  <option key={age} value={age}>
                    {age} ans {age <= 7 ? '(CP-CE1)' : age <= 10 ? '(CE2-CM2)' : '(Collège)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Choisir un avatar amusant
            </label>
            <div className="flex flex-wrap gap-2.5">
              {avatarOptions.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => {
                    sound.playPop();
                    setNewChildAvatar(av);
                  }}
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border transition-all cursor-pointer ${
                    newChildAvatar === av
                      ? 'bg-blue-50 border-blue-600 scale-110 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:scale-105'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isCreating || !newChildName.trim()}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{isCreating ? 'Création en cours...' : 'Créer le profil enfant'}</span>
          </button>
        </form>
      </div>

      {/* ============================================================ */}
      {/* ⚙️ PRÉFÉRENCES PÉDAGOGIQUES                                  */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 font-heading flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-600" />
            Difficulté Adaptative Intelligente
          </h2>
          <p className="text-xs text-slate-500">
            Ajustement automatique du niveau selon les réussites et échecs de l’enfant
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'auto', title: 'Adaptative Automatique', desc: 'Ajuste la difficulté en temps réel (recommandé)' },
            { id: 'gentle', title: 'Progression Douce', desc: 'Plus de temps et d’indices pour chaque notion' },
            { id: 'challenging', title: 'Défi Élevé', desc: 'Exercices avancés pour enfants précoces' },
          ].map((mode) => (
            <div
              key={mode.id}
              onClick={() => {
                sound.playPop();
                setAdaptiveLevel(mode.id);
                showToast(`Mode de difficulté changé : ${mode.title}`);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                adaptiveLevel === mode.id
                  ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div className="text-xs font-black text-slate-900">{mode.title}</div>
              <div className="text-[11px] text-slate-500 mt-1 leading-snug">{mode.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 🔐 SÉCURITÉ & MOT DE PASSE DU PARENT                         */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                Modifier le Mot de Passe Parent
              </h2>
              <p className="text-xs text-slate-500">
                Protégez l’accès au Mode Parent, aux paramètres et aux données de progression
              </p>
            </div>
          </div>
        </div>

        {/* Feedback message within card */}
        {passwordToast && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 border animate-in fade-in ${
              passwordToast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {passwordToast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{passwordToast.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-5 max-w-2xl">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mot de passe actuel *
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Votre mot de passe actuel (ex: admin123@0)"
                required
                className="w-full pl-4 pr-12 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                title={showCurrentPassword ? 'Masquer' : 'Afficher'}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 caractères"
                  required
                  minLength={6}
                  className="w-full pl-4 pr-12 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  title={showNewPassword ? 'Masquer' : 'Afficher'}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength helper */}
              {newPassword && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        newPassword.length < 6
                          ? 'w-1/4 bg-rose-500'
                          : newPassword.length < 8 || !/\d/.test(newPassword)
                          ? 'w-2/3 bg-amber-500'
                          : 'w-full bg-emerald-500'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {newPassword.length < 6
                      ? 'Trop court'
                      : newPassword.length < 8 || !/\d/.test(newPassword)
                      ? 'Moyen'
                      : 'Robuste'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirmer le mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Répétez le mot de passe"
                  required
                  className={`w-full pl-4 pr-12 py-2.5 rounded-2xl bg-slate-50 border text-sm font-semibold focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                    confirmPassword && confirmPassword !== newPassword
                      ? 'border-rose-400 focus:ring-rose-500'
                      : confirmPassword && confirmPassword === newPassword
                      ? 'border-emerald-400 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                  title={showConfirmPassword ? 'Masquer' : 'Afficher'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[11px] text-rose-500 font-bold mt-1">
                  Les mots de passe ne correspondent pas.
                </p>
              )}
              {confirmPassword && confirmPassword === newPassword && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Mots de passe identiques
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={
                isChangingPassword ||
                !currentPassword ||
                newPassword.length < 6 ||
                newPassword !== confirmPassword
              }
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Modification en cours...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Enregistrer le nouveau mot de passe</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ============================================================ */}
      {/* 🔒 COMPTE ET INFORMATIONS SÉCURISÉES                         */}
      {/* ============================================================ */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold shadow-xs">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-black text-slate-800">Compte Administrateur : {user?.username}</div>
            <div>Mono-foyer sécurisé avec session chiffrée JWT & MongoDB</div>
          </div>
        </div>

        <div className="font-mono text-[11px] bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Smart Kids Lab v1.1.0 • Sidebar & Multi-Enfants
        </div>
      </div>

      {/* ============================================================ */}
      {/* ✏️ MODAL MODIFICATION ENFANT                                 */}
      {/* ============================================================ */}
      {editingChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{editingChild.avatar}</span>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Modifier le profil
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingChild(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Âge
                </label>
                <select
                  value={editAge}
                  onChange={(e) => setEditAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((a) => (
                    <option key={a} value={a}>{a} ans</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => {
                        sound.playPop();
                        setEditAvatar(av);
                      }}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        editAvatar === av
                          ? 'bg-blue-50 border-blue-600 scale-110 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingChild(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || !editName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isUpdating ? 'Enregistrement...' : 'Enregistrer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 🗑️ MODAL CONFIRMATION SUPPRESSION ENFANT                     */}
      {/* ============================================================ */}
      {deletingChild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Supprimer le profil de {deletingChild.name} ?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cette action est définitive. Toute la progression de{' '}
                <span className="font-bold text-slate-800">{deletingChild.name}</span> ({deletingChild.xp} XP, niveau {deletingChild.level}) et ses badges seront supprimés.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeletingChild(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Suppression...' : 'Oui, supprimer'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
