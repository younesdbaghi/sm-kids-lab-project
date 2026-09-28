import { GoogleGenAI } from '@google/genai';
import type { AICoachRequest, AICoachResponse } from '../../shared/types.ts';

const SYSTEM_PROMPT = `Tu es Smart Kids Coach, l'assistant pédagogique bienveillant de SMART KIDS LAB, destiné aux enfants et adolescents de 6 à 15 ans.

Règles fondamentales :
1. Tu ne dois JAMAIS faire l'exercice directement à la place de l'enfant, ni lui donner la réponse brute.
2. Tu dois favoriser son propre raisonnement (méthode socratique).
3. Commence par poser une question guide ou donner un petit indice accessible.
4. Adapte impérativement ton vocabulaire et la complexité de tes phrases à l'âge de l'enfant.
   - Pour 6-8 ans : phrases très simples, imagées, métaphores faciles, émojis chaleureux.
   - Pour 9-11 ans : explications claires et encourageantes, logique étape par étape.
   - Pour 12-15 ans : vocabulaire technique précis mais pédagogique, explications des concepts fondamentaux.
5. Sois encourageant, enthousiaste, clair et concis (maximum 3 à 4 phrases).
6. Ne demande jamais d'informations personnelles.
7. Ne produis jamais de contenu dangereux ou inapproprié.
8. Lorsque l'enfant fait une erreur, valorise son essai et explique pourquoi le résultat diffère sans le décourager.
Objectif absolu : aider l'enfant à avoir le déclic et trouver la solution par lui-même.`;

export async function askAICoach(req: AICoachRequest): Promise<AICoachResponse> {
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDtyO4KATSVS9laHr3kvea_esnSGcRmh8k';

  if (!apiKey || apiKey.trim() === '') {
    return generateFallbackCoachResponse(req);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const userPrompt = `
Informations sur l'enfant et l'activité :
- Âge de l'enfant : ${req.childAge || 9} ans
- Activité : "${req.activityTitle}" (Domaine : ${req.activityCategory})
- Description : ${req.activityDescription}
- Question ou Défi en cours : ${req.currentQuestion || 'Défi en cours'}
${req.userAnswer ? `- Réponse ou tentative actuelle de l'enfant : "${req.userAnswer}"` : ''}
${req.errorContext ? `- Erreur constatée : "${req.errorContext}"` : ''}
${req.childMessage ? `- Message de l'enfant : "${req.childMessage}"` : ''}
${req.previousAttempts ? `- Nombre de tentatives précédentes : ${req.previousAttempts}` : ''}

Réponds en tant que Smart Kids Coach en français selon tes instructions pédagogiques (encouragement + indice socratique adapté à son âge, pas de réponse directe).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }] }
      ]
    });

    const replyText = response.text || 'Bravo pour ta curiosité ! Regarde bien les indices de l’exercice pour trouver la clé.';

    return {
      message: replyText.trim(),
      hintLevel: (req.previousAttempts || 0) + 1,
      encouragement: getEncouragementPhrase(req.childAge || 9)
    };
  } catch (error) {
    console.warn('Appel Gemini non disponible ou erreur réseau, utilisation du mode fallback intelligent:', error);
    return generateFallbackCoachResponse(req);
  }
}

function getEncouragementPhrase(age: number): string {
  const phrases = [
    'Tu es sur la bonne voie ! 🚀',
    'Chaque erreur fait grandir tes neurones ! 🧠',
    'Prends ton temps, tu as toutes les capacités pour réussir ! ⭐',
    'La persévérance est le super-pouvoir des grands inventeurs ! 💡'
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function generateFallbackCoachResponse(req: AICoachRequest): AICoachResponse {
  const age = req.childAge || 9;
  let hint = 'Observe bien ce qui se répète ou change entre chaque étape.';

  if (req.activityCategory === 'logic') {
    hint = age <= 8
      ? 'Fais le calcul pas à pas dans ta tête : regarde de combien le premier nombre a grandi pour devenir le second ! 🔍'
      : 'Calcule l’écart entre les termes consécutifs. Est-ce une addition constante, une multiplication ou une alternance ? 🧠';
  } else if (req.activityCategory === 'code') {
    hint = age <= 8
      ? 'Imagine que tu es toi-même le petit robot dans la pièce ! Vers où dois-tu tourner pour voir l’étoile ? 🤖'
      : 'Pense à la direction actuelle du robot avant de faire avancer. Une rotation change la direction sans changer la case ! 💻';
  } else if (req.activityCategory === 'ai') {
    hint = 'Une IA regarde les détails répétés (les motifs). Quels indices te permettent à toi d’être certain du résultat ? 🤖';
  } else if (req.activityCategory === 'digital') {
    hint = 'Pense à la sécurité et à ce qui protège le mieux tes données dans ce cas précis ! 🛡️';
  }

  return {
    message: hint,
    hintLevel: (req.previousAttempts || 0) + 1,
    encouragement: getEncouragementPhrase(age),
    suggestedAction: 'Regarde à nouveau la consigne et teste ton hypothèse !'
  };
}
