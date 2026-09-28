import React, { useState } from 'react';
import type { useApp } from '../context/AppContext.tsx';
import type { api } from '../services/api.ts';
import { Bot, Sparkles, X, Send, Lightbulb, HelpCircle, Loader2 } from 'lucide-react';
import type { DomainCategory } from '../../shared/types.ts';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityTitle: string;
  activityCategory: DomainCategory;
  activityDescription: string;
  currentQuestion?: string;
  userAnswer?: string;
  errorContext?: string;
}

interface ChatMessage {
  id: string;
  sender: 'coach' | 'child';
  text: string;
  timestamp: Date;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  activityTitle,
  activityCategory,
  activityDescription,
  currentQuestion,
  userAnswer,
  errorContext
}) => {
  const { selectedChild } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'coach',
      text: `Coucou ${selectedChild?.name || 'explorateur'} ! 👋 Je suis ton Coach IA. Je ne te donnerai pas la réponse directe, mais je vais t’aider à la trouver toi-même ! Que souhaites-tu explorer ?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const childMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'child',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, childMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await api.askCoach({
        childAge: selectedChild?.age || 9,
        activityTitle,
        activityCategory,
        activityDescription,
        currentQuestion,
        userAnswer,
        errorContext,
        childMessage: text,
        previousAttempts: messages.filter(m => m.sender === 'coach').length
      });

      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: res.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coachMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `coach-err-${Date.now()}`,
          sender: 'coach',
          text: 'Prends le temps d’observer calmement chaque élément de l’énoncé. Tu as déjà tous les indices nécessaires ! 💡',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Donne-moi un petit indice 🔍',
    'Peux-tu réexpliquer simplement ? 📖',
    'Comment commencer ? 🚀'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-cyan-400 flex flex-col h-[560px] max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/30">
              🤖
            </div>
            <div>
              <div className="font-extrabold text-base flex items-center gap-1.5 font-heading">
                Smart Kids Coach
                <span className="text-[10px] bg-cyan-400 text-blue-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  IA
                </span>
              </div>
              <div className="text-xs text-cyan-100">
                Pédagogie bienveillante • {selectedChild?.name} ({selectedChild?.age} ans)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Activity Context Tag */}
        <div className="px-4 py-2 bg-cyan-50/80 border-b border-cyan-100 flex items-center gap-2 text-xs text-cyan-900">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate font-semibold">Exercice : {activityTitle}</span>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'child' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'coach' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-base shrink-0 shadow-xs">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  m.sender === 'child'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-xs font-medium'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'child' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-base shrink-0 shadow-xs">
                  {selectedChild?.avatar || '🧒'}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs italic">
              <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center text-base shrink-0">
                🤖
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
                <span>Le Coach réfléchit à un indice pour toi...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-cyan-800 text-slate-700 text-xs font-bold whitespace-nowrap transition-colors border border-slate-200/80 cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pose une question à ton coach..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-sm font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white disabled:opacity-50 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
