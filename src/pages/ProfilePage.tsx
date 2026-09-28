import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import { sound } from '../utils/sound.ts';
import type { User, Award, Shield, Sparkles, CheckCircle2, Printer, Pencil, Check, Download, FileCheck, Loader2 } from 'lucide-react';
import { Logo } from '../components/Logo.tsx';
import { downloadCertificateImage, printCertificateDirectly } from '../utils/certificateGenerator.ts';

export const ProfilePage: React.FC = () => {
  const { selectedChild, selectedChildProgress, refreshChildData, updateChild } = useApp();
  const [avatar, setAvatar] = useState(selectedChild?.avatar || '🤖');
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(selectedChild?.name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [certNotice, setCertNotice] = useState('');

  const avatars = ['🤖', '🚀', '🧠', '🐱', '🦊', '🦁', '🐼', '👾', '🦄', '🧑‍🚀', '🦖', '⚡'];

  const handleUpdateAvatar = async (newAvatar: string) => {
    if (!selectedChild) return;
    sound.playPop();
    setAvatar(newAvatar);
    setIsUpdating(true);
    try {
      await updateChild(selectedChild.id, { avatar: newAvatar });
      sound.playSuccess();
      setSuccessMsg('Avatar mis à jour avec succès !');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveName = async () => {
    if (!selectedChild || !nameInput.trim()) return;
    setIsUpdating(true);
    try {
      sound.playSuccess();
      await updateChild(selectedChild.id, { name: nameInput.trim() });
      setIsEditingName(false);
      setSuccessMsg('Prénom mis à jour avec succès !');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownloadCertificate = async () => {
    if (!selectedChild || isGeneratingCert) return;
    setIsGeneratingCert(true);
    sound.playLevelUp();
    try {
      await downloadCertificateImage({
        childName: selectedChild.name,
        level: selectedChild.level,
        xp: selectedChild.xp,
        rankName: currentRank.name,
        rankIcon: currentRank.icon,
        avatar: selectedChild.avatar
      });
      setCertNotice(`Diplôme officiel de ${selectedChild.name} téléchargé avec succès ! 🎉`);
      setTimeout(() => setCertNotice(''), 5000);
    } catch (err) {
      console.error(err);
      setCertNotice('Une erreur est survenue lors de la génération du diplôme.');
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const handlePrintCertificate = async () => {
    if (!selectedChild || isGeneratingCert) return;
    setIsGeneratingCert(true);
    sound.playLevelUp();
    try {
      const printed = await printCertificateDirectly({
        childName: selectedChild.name,
        level: selectedChild.level,
        xp: selectedChild.xp,
        rankName: currentRank.name,
        rankIcon: currentRank.icon,
        avatar: selectedChild.avatar
      });
      if (!printed) {
        setCertNotice(`L’impression directe étant restreinte par le navigateur, le diplôme de ${selectedChild.name} a été téléchargé en Image HD ! 📥`);
      } else {
        setCertNotice(`Fenêtre d’impression ouverte pour le diplôme de ${selectedChild.name} ! 🖨️`);
      }
      setTimeout(() => setCertNotice(''), 6000);
    } catch (err) {
      console.error(err);
      // Fallback download
      await handleDownloadCertificate();
    } finally {
      setIsGeneratingCert(false);
    }
  };

  if (!selectedChild) return null;

  const currentRank = selectedChildProgress?.rank || { name: 'Explorateur', icon: '🔎' };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-5xl shadow-xl shadow-blue-500/20 border-4 border-white transform hover:rotate-6 transition-transform">
            {avatar}
          </div>
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs border-2 border-white shadow-xs">
            Niv. {selectedChild.level}
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1 w-full">
          <div className="text-xs font-black uppercase text-blue-600 tracking-wider">
            Fiche Apprenant
          </div>

          {/* Name & Inline Edit */}
          {isEditingName ? (
            <div className="flex items-center gap-2 max-w-xs mx-auto sm:mx-0 pt-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-blue-500 text-lg font-black text-slate-900 focus:outline-hidden"
              />
              <button
                onClick={handleSaveName}
                className="p-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-3xl font-black text-slate-900 font-heading">
                {selectedChild.name}
              </h1>
              <button
                onClick={() => {
                  setNameInput(selectedChild.name);
                  setIsEditingName(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title="Modifier mon prénom"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          )}

          <p className="text-sm font-semibold text-slate-500">
            {selectedChild.age} ans • Rang : {currentRank.icon} {currentRank.name}
          </p>

          <div className="pt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
            <span className="px-3 py-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              ⚡ {selectedChild.xp} XP au total
            </span>
            <span className="px-3 py-1 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-700">
              🔥 Série : {selectedChild.streak} jours
            </span>
            <span className="px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-xl text-xs font-bold text-yellow-800">
              🏆 {selectedChild.unlockedBadgeCodes?.length || 0} badges obtenus
            </span>
          </div>
        </div>
      </div>

      {/* Avatar Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 font-heading">
            Personnaliser mon Avatar
          </h2>
          <p className="text-xs text-slate-500">
            Choisis ton personnage favori dans le Smart Kids Lab
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {avatars.map((av) => (
            <button
              key={av}
              onClick={() => handleUpdateAvatar(av)}
              disabled={isUpdating}
              className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                avatar === av
                  ? 'bg-blue-50 border-blue-600 scale-110 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:scale-105'
              }`}
            >
              {av}
            </button>
          ))}
        </div>

        {successMsg && (
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Official Certificate of Achievement (Printable) */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/50 rounded-3xl p-6 sm:p-12 border-4 border-amber-300 shadow-xl relative overflow-hidden text-center space-y-6">
        <div className="flex justify-center mb-2">
          <Logo size="md" />
        </div>

        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
            Certificat d’Aptitude & de Réussite
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-heading">
            DIPLÔME DE L’EXPLORATEUR NUMÉRIQUE
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
          Ce certificat atteste officiellement que <strong className="text-blue-900 font-black">{selectedChild.name}</strong> a accompli avec brio les épreuves d’initiation aux sciences de la logique, de la programmation et de l’intelligence artificielle sur la plateforme <strong>SMART KIDS LAB</strong>.
        </p>

        <div className="py-4 border-y border-amber-200/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto text-center">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Niveau Actuel</div>
            <div className="text-base sm:text-xl font-black text-slate-800">Niveau {selectedChild.level}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Rang Honorifique</div>
            <div className="text-base sm:text-xl font-black text-amber-600">{currentRank.name}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Points XP</div>
            <div className="text-base sm:text-xl font-black text-blue-700">{selectedChild.xp} XP</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 max-w-md mx-auto text-xs text-slate-500 font-bold">
          <div>
            <div className="italic">Le Responsable Pédagogique</div>
            <div className="font-heading font-black text-slate-800 mt-1">Smart Kids Lab</div>
          </div>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-400 flex items-center justify-center text-2xl bg-amber-100 shadow-inner">
            🏆
          </div>
        </div>

        {/* Notice feedback */}
        {certNotice && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{certNotice}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Primary: Direct Download HD */}
          <button
            type="button"
            onClick={handleDownloadCertificate}
            disabled={isGeneratingCert}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md shadow-amber-500/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isGeneratingCert ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Télécharger le diplôme (Image HD / PNG)</span>
          </button>

          {/* Secondary: Print */}
          <button
            type="button"
            onClick={handlePrintCertificate}
            disabled={isGeneratingCert}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Imprimer</span>
          </button>
        </div>
      </div>

    </div>
  );
};
