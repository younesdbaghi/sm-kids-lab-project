import React from 'react';
import type { useApp } from '../context/AppContext.tsx';
import { ShieldCheck, Heart, Lightbulb, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';

export const ParentInsightsPage: React.FC = () => {
  const { selectedChild } = useApp();
  const childName = selectedChild?.name || 'votre enfant';

  const discussionQuestions = [
    {
      title: 'Au dîner : "Comment expliquerais-tu à un robot comment faire du vélo ?"',
      theme: 'Algorithmes & Décomposition',
      desc: 'Invitez votre enfant à décomposer une action en étapes élémentaires (mettre le pied, pousser, garder l’équilibre).'
    },
    {
      title: 'En voiture : "Regarde ce feu rouge : est-ce une règle classique ou une IA ?"',
      theme: 'Comprendre l’Automatisation',
      desc: 'Distinguez les systèmes automatisés à règles strictes (horloge, feux) des systèmes apprenants (voitures autonomes).'
    },
    {
      title: 'Devant un dessin animé : "Comment les images bougent-elles ?"',
      theme: 'Images par seconde & Animation',
      desc: 'Faites le lien avec l’exercice d’animation image par image réalisé dans le Creative Lab.'
    },
    {
      title: 'À propos des mots de passe : "Pourquoi ne pas utiliser le prénom du chat ?"',
      theme: 'Cybersécurité & Données',
      desc: 'Rappelez pourquoi les ordinateurs devinent très vite les mots courants dans les dictionnaires.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 text-2xl">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Espace d’Accompagnement Parental
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Conseils pratiques et repères pédagogiques pour guider {childName}
          </p>
        </div>
      </div>

      {/* Core Philosophy Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-300">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>La Philosophie Smart Kids Lab</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-heading">
          Passer du statut de consommateur passif à celui de créateur éclairé.
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
          Sur Smart Kids Lab, chaque minute passée devant l’écran mobilise la réflexion active, la logique spatiale et l’esprit critique. L’erreur n’est jamais une sanction, c’est une donnée d’apprentissage qui permet d’ajuster son hypothèse.
        </p>
      </div>

      {/* 4 Conversation Starters */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-900 font-heading">
            4 Sujets de Discussion Familiale (Sans Écran)
          </h3>
          <p className="text-xs text-slate-500">
            Faites le pont entre les concepts virtuels et la vie quotidienne
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {discussionQuestions.map((q, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-black uppercase text-blue-600 tracking-wider">
                {q.theme}
              </span>
              <div className="text-sm font-extrabold text-slate-800">
                {q.title}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {q.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Golden Rules for Screen Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h4 className="text-sm font-black text-slate-900 font-heading">Sessions Courtes</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            15 à 30 minutes par jour suffisent amplement pour ancrer durablement les concepts sans fatiguer l’attention.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h4 className="text-sm font-black text-slate-900 font-heading">Valoriser l’Effort</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Félicitez la démarche de recherche plutôt que la rapidité : "Tu as cherché plusieurs façons de résoudre ce labyrinthe, bravo !"
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h4 className="text-sm font-black text-slate-900 font-heading">Créer Ensemble</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Dans le Creative Lab, demandez à {childName} de vous montrer son robot en pixel art ou de vous faire tester son histoire !
          </p>
        </div>
      </div>

    </div>
  );
};
