import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { api } from '../services/api.ts';
import type { Project } from '../../shared/types.ts';
import {
  Palette,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  CheckCircle2,
  Brush,
  BookOpen,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const CreativePage: React.FC = () => {
  const { selectedChild, refreshChildData, triggerCelebration } = useApp();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeStudio, setActiveStudio] = useState<'pixel' | 'story'>('pixel');

  // Pixel Art State
  const [gridSize] = useState(8);
  const [pixels, setPixels] = useState<string[]>(Array(64).fill('#FFFFFF'));
  const [currentColor, setCurrentColor] = useState('#0284C7');
  const [projectTitle, setProjectTitle] = useState('Mon Robot Éclaireur');
  const [projectDescription, setProjectDescription] = useState('Un petit robot d’exploration aux yeux lumineux');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Story Builder State
  const [storyTitle, setStoryTitle] = useState('Le Mystère du Laboratoire');
  const [storyIntro, setStoryIntro] = useState('Alors que la nuit tombait sur la base spatiale, une porte secrète s’est ouverte toute seule...');
  const [choiceA, setChoiceA] = useState('Entrer discrètement dans la pièce sombre');
  const [choiceB, setChoiceB] = useState('Allumer l’alarme et appeler le robot compagnon');

  const paletteColors = [
    '#0284C7', // Royal blue
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#FBBF24', // Amber/Yellow
    '#10B981', // Emerald
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#0F172A', // Deep black/slate
    '#FFFFFF'  // White
  ];

  useEffect(() => {
    async function loadProjects() {
      if (!selectedChild) return;
      try {
        const list = await api.getProjects(selectedChild.id);
        setProjects(list);
      } catch (e) {
        console.error('Erreur chargement projets:', e);
      }
    }
    loadProjects();
  }, [selectedChild?.id]);

  const handlePixelClick = (index: number) => {
    setPixels(prev => {
      const next = [...prev];
      next[index] = currentColor;
      return next;
    });
  };

  const clearCanvas = () => {
    setPixels(Array(gridSize * gridSize).fill('#FFFFFF'));
    setSavedSuccess(false);
  };

  const handleSavePixelProject = async () => {
    if (!selectedChild || isSaving) return;
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await api.saveProject(selectedChild.id, {
        title: projectTitle || 'Robot Créatif',
        description: projectDescription || 'Création Pixel Art originale',
        category: 'creative',
        skills: ['Pixel Art', 'Conception Graphique', 'Design Numérique'],
        data: { pixels, gridSize }
      });

      setProjects(prev => [res.project, ...prev]);
      setSavedSuccess(true);
      await refreshChildData();

      triggerCelebration({
        levelUp: res.levelProgress?.currentLevel > (selectedChild?.level || 0),
        newLevel: res.levelProgress?.currentLevel,
        xpEarned: res.xpEarned,
        badges: res.newlyUnlockedBadge ? [res.newlyUnlockedBadge] : []
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveStoryProject = async () => {
    if (!selectedChild || isSaving) return;
    setIsSaving(true);

    try {
      const res = await api.saveProject(selectedChild.id, {
        title: storyTitle || 'Histoire Interactive',
        description: storyIntro.slice(0, 80) + '...',
        category: 'creative',
        skills: ['Narration', 'Logique d’Embranchement', 'Écriture'],
        data: { intro: storyIntro, choiceA, choiceB }
      });

      setProjects(prev => [res.project, ...prev]);
      setSavedSuccess(true);
      await refreshChildData();

      triggerCelebration({
        levelUp: res.levelProgress?.currentLevel > (selectedChild?.level || 0),
        newLevel: res.levelProgress?.currentLevel,
        xpEarned: res.xpEarned,
        badges: res.newlyUnlockedBadge ? [res.newlyUnlockedBadge] : []
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/25 text-2xl">
            🎨
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Creative Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              Imagine, conçois et publie tes propres créations numériques
            </p>
          </div>
        </div>

        {/* Studio Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setActiveStudio('pixel');
              setSavedSuccess(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStudio === 'pixel' ? 'bg-pink-500 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            👾 Pixel Art Studio
          </button>
          <button
            onClick={() => {
              setActiveStudio('story');
              setSavedSuccess(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeStudio === 'story' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            📖 Histoire Interactive
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Creative Workshop */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          {activeStudio === 'pixel' ? (
            /* PIXEL ART WORKSHOP */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-heading">
                    Atelier Robot Pixel Art (8x8)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Clique sur une couleur puis dessine sur la grille ci-dessous
                  </p>
                </div>

                {/* Color Palette */}
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
                  {paletteColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-xl border transition-all cursor-pointer ${
                        currentColor === color
                          ? 'scale-115 shadow-md border-slate-900 ring-2 ring-blue-400'
                          : 'border-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Grid Canvas */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl shadow-inner border-4 border-slate-800">
                <div
                  className="grid gap-1 bg-slate-800 p-2 rounded-2xl"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
                >
                  {pixels.map((color, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePixelClick(idx)}
                      style={{ backgroundColor: color }}
                      className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg border border-slate-700/50 cursor-pointer hover:opacity-85 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Title & Description inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom de ta création
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Petite description
                  </label>
                  <input
                    type="text"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Actions: Save & Clear */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Effacer la grille</span>
                </button>

                <button
                  onClick={handleSavePixelProject}
                  disabled={isSaving}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm shadow-lg shadow-pink-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Publication...' : 'Sauvegarder mon Projet (+50 XP)'}</span>
                </button>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Chef-d’œuvre sauvegardé dans ta galerie de projets ! 🎉</span>
                </div>
              )}
            </div>
          ) : (
            /* INTERACTIVE STORY WORKSHOP */
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-heading">
                  Créateur d’Aventures Interactives
                </h2>
                <p className="text-xs text-slate-500">
                  Écris le début d’une histoire et offre deux choix aux lecteurs
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Titre de l’histoire
                </label>
                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Le début de l’aventure (Introduction)
                </label>
                <textarea
                  rows={3}
                  value={storyIntro}
                  onChange={(e) => setStoryIntro(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200">
                  <span className="text-xs font-black text-blue-900 uppercase">Choix A</span>
                  <input
                    type="text"
                    value={choiceA}
                    onChange={(e) => setChoiceA(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl bg-white border border-blue-200 text-xs font-semibold"
                  />
                </div>
                <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-200">
                  <span className="text-xs font-black text-purple-900 uppercase">Choix B</span>
                  <input
                    type="text"
                    value={choiceB}
                    onChange={(e) => setChoiceB(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl bg-white border border-purple-200 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveStoryProject}
                  disabled={isSaving}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Publier mon Histoire (+50 XP)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Showcase of Saved Projects */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 font-heading">
                Projets Enregistrés ({projects.length})
              </h3>
              <p className="text-xs text-slate-500">Visibles par les parents sur le tableau de bord</p>
            </div>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
              Galerie
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <Sparkles className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-xs font-medium">Aucun projet créé pour l’instant.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Dessine un robot ou écris une histoire pour gagner +50 XP !
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <span>{p.category === 'creative' ? '👾' : '📖'}</span>
                      <span>{p.title}</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Terminé
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {p.description}
                  </p>

                  {/* Render preview if pixel art */}
                  {p.data?.pixels && (
                    <div className="my-2.5 p-2 bg-slate-900 rounded-xl inline-block">
                      <div
                        className="grid gap-0.5"
                        style={{ gridTemplateColumns: `repeat(${p.data.gridSize || 8}, minmax(0, 1fr))` }}
                      >
                        {p.data.pixels.map((col: string, pidx: number) => (
                          <div
                            key={pidx}
                            style={{ backgroundColor: col }}
                            className="w-3 h-3 rounded-xs"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <div className="flex flex-wrap gap-1">
                      {p.skills?.map((skill, sidx) => (
                        <span key={sidx} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md font-semibold text-[10px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-amber-600">+{p.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
