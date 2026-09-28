import type { Activity } from '../../shared/types.ts';

export const INITIAL_ACTIVITIES: Activity[] = [
  // --- 30 LOGIC CHALLENGES ---
  {
    id: 'logic-1',
    title: 'La Suite des Nombres Pairs',
    description: 'Observe la suite et trouve le nombre manquant.',
    category: 'logic',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 3,
    xpReward: 10,
    conceptLearned: 'Sauts constants de +2',
    type: 'sequence',
    data: {
      sequence: ['2', '4', '6', '8', '?'],
      options: ['9', '10', '11', '12'],
      correctAnswer: '10',
      hint: 'Chaque nombre augmente de 2. 8 + 2 = ?',
      explanation: 'La règle est d’ajouter 2 à chaque étape : 2, 4, 6, 8, puis 10 !'
    }
  },
  {
    id: 'logic-2',
    title: 'La Marche de 5 en 5',
    description: 'Une fusée compte à rebours par pas de 5.',
    category: 'logic',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 3,
    xpReward: 10,
    conceptLearned: 'Multiples de 5',
    type: 'sequence',
    data: {
      sequence: ['5', '10', '15', '20', '?'],
      options: ['22', '25', '30', '35'],
      correctAnswer: '25',
      hint: 'Ajoute 5 au dernier nombre 20.',
      explanation: '5, 10, 15, 20... le suivant est 25 (+5).'
    }
  },
  {
    id: 'logic-3',
    title: 'La Suite Danseuse (+2, -1)',
    description: 'Les nombres font un pas en avant, un pas en arrière !',
    category: 'logic',
    level: 1,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Alternance d’opérations',
    type: 'sequence',
    data: {
      sequence: ['1', '3', '2', '4', '3', '5', '?'],
      options: ['3', '4', '6', '7'],
      correctAnswer: '4',
      hint: 'Regarde le rythme : +2, puis -1, puis +2, puis -1... Après 5, que fait-on ?',
      explanation: '1 (+2) = 3 (-1) = 2 (+2) = 4 (-1) = 3 (+2) = 5 (-1) = 4 !'
    }
  },
  {
    id: 'logic-4',
    title: 'Le Double Magique',
    description: 'Chaque case double l’énergie du robot.',
    category: 'logic',
    level: 1,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Multiplication par 2 (croissance géométrique)',
    type: 'sequence',
    data: {
      sequence: ['2', '4', '8', '16', '?'],
      options: ['24', '30', '32', '64'],
      correctAnswer: '32',
      hint: 'Chaque nombre est multiplié par 2. Quel est le double de 16 ?',
      explanation: '16 x 2 = 32. C’est la base du système binaire en informatique !'
    }
  },
  {
    id: 'logic-5',
    title: 'Les Formes en Rotation',
    description: 'Quelle forme vient compléter ce motif logique ?',
    category: 'logic',
    level: 2,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 20,
    conceptLearned: 'Reconnaissance de motifs visuels et côtés des polygones',
    type: 'quiz',
    data: {
      question: 'Triangle (3 côtés) → Carré (4 côtés) → Pentagone (5 côtés) → ?',
      options: ['Hexagone (6 côtés)', 'Octogone (8 côtés)', 'Cercle', 'Étoile'],
      correctAnswer: 'Hexagone (6 côtés)',
      hint: 'Compte le nombre de côtés : 3, 4, 5... quel est le polygone à 6 côtés ?',
      explanation: 'Chaque forme gagne un côté supplémentaire : 3, 4, 5 puis 6 côtés (hexagone) !'
    }
  },
  {
    id: 'logic-6',
    title: 'La Suite Secrète de Fibonacci',
    description: 'Chaque nombre est la somme des deux précédents !',
    category: 'logic',
    level: 3,
    difficulty: 'medium',
    durationMinutes: 6,
    xpReward: 25,
    conceptLearned: 'Algorithme de Fibonacci',
    type: 'sequence',
    data: {
      sequence: ['1', '1', '2', '3', '5', '8', '?'],
      options: ['10', '11', '13', '15'],
      correctAnswer: '13',
      hint: 'Additionne les deux derniers nombres : 5 + 8 = ?',
      explanation: '5 + 8 = 13 ! Cette suite apparaît partout dans la nature (tournesols, coquillages).'
    }
  },
  {
    id: 'logic-7',
    title: 'Déduction de Couleurs',
    description: 'Trouve la bonne place des cubes de couleur.',
    category: 'logic',
    level: 3,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 25,
    conceptLearned: 'Raisonnement déductif et contraintes',
    type: 'quiz',
    data: {
      question: 'Quatre cubes sont alignés : Bleu, Rouge, Vert, Jaune. Le Rouge est juste avant le Jaune. Le Bleu est tout au début. Le Vert est à la fin. Quel est le deuxième cube ?',
      options: ['Bleu', 'Rouge', 'Vert', 'Jaune'],
      correctAnswer: 'Rouge',
      hint: 'L’ordre commence par Bleu. Il reste Rouge et Jaune avant le Vert final.',
      explanation: 'L’ordre complet est : Bleu (1er), Rouge (2e), Jaune (3e), Vert (4e).'
    }
  },
  {
    id: 'logic-8',
    title: 'La Balance des Fruits',
    description: 'Équilibre la balance spatiale !',
    category: 'logic',
    level: 4,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 25,
    conceptLearned: 'Équations visuelles et substitution',
    type: 'quiz',
    data: {
      question: '1 Pomme pèse autant que 2 Oranges. 1 Orange pèse autant que 3 Fraises. Combien de Fraises pèse 1 Pomme ?',
      options: ['4 Fraises', '5 Fraises', '6 Fraises', '8 Fraises'],
      correctAnswer: '6 Fraises',
      hint: 'Remplace chaque Orange par 3 Fraises. 1 Pomme = 2 x 3 Fraises.',
      explanation: '1 Pomme = 2 Oranges = 2 x 3 Fraises = 6 Fraises !'
    }
  },
  {
    id: 'logic-9',
    title: 'Carrés Parfaits',
    description: 'Les nombres qui forment de vrais carrés !',
    category: 'logic',
    level: 5,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 30,
    conceptLearned: 'Nombres au carré (1x1, 2x2, 3x3...)',
    type: 'sequence',
    data: {
      sequence: ['1', '4', '9', '16', '25', '?'],
      options: ['30', '32', '36', '49'],
      correctAnswer: '36',
      hint: '1x1=1, 2x2=4, 3x3=9, 4x4=16, 5x5=25. Que vaut 6x6 ?',
      explanation: '6 x 6 = 36 ! Ce sont les carrés des entiers.'
    }
  },
  {
    id: 'logic-10',
    title: 'Les Portes Logiques (ET / OU)',
    description: 'Le robot ne peut passer que si la condition est VRAIE.',
    category: 'logic',
    level: 6,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 30,
    conceptLearned: 'Algèbre de Boole (ET / OU)',
    type: 'quiz',
    data: {
      question: 'La porte s’ouvre si : (Clé Bleue OU Clé Rouge) ET Energie > 50%. Tu as la Clé Rouge et ton énergie est à 80%. La porte s’ouvre-t-elle ?',
      options: ['Oui, la porte s’ouvre', 'Non, il manque la Clé Bleue', 'Non, énergie insuffisante', 'Seulement la nuit'],
      correctAnswer: 'Oui, la porte s’ouvre',
      hint: 'Le "OU" signifie qu’une seule des deux clés suffit. Ensuite, 80% est bien supérieur à 50% !',
      explanation: 'Condition 1 (Clé Rouge) = VRAI. Condition 2 (80% > 50%) = VRAI. VRAI ET VRAI = La porte s’ouvre !'
    }
  },
  {
    id: 'logic-11',
    title: 'Le Sens des Engrenages',
    description: 'Trois engrenages s’entraînent les uns les autres.',
    category: 'logic',
    level: 7,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 35,
    conceptLearned: 'Transmission de mouvement et parité',
    type: 'quiz',
    data: {
      question: 'L’engrenage A tourne dans le sens des aiguilles d’une montre. Il touche l’engrenage B, qui lui-même touche le C. Dans quel sens tourne l’engrenage C ?',
      options: ['Sens des aiguilles d’une montre', 'Sens inverse des aiguilles d’une montre', 'Il ne bouge pas', 'Dans les deux sens'],
      correctAnswer: 'Sens des aiguilles d’une montre',
      hint: 'A tourne dans le sens horaire -> B tourne en sens inverse -> C tourne dans le même sens que A !',
      explanation: 'Chaque engrenage inverse le sens du précédent : A (horaire) → B (anti-horaire) → C (horaire).'
    }
  },
  {
    id: 'logic-12',
    title: 'Déduction de Code Secret',
    description: 'Craque le code à 3 chiffres avec les indices de position.',
    category: 'logic',
    level: 8,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 40,
    conceptLearned: 'Contraintes combinatoires',
    type: 'quiz',
    data: {
      question: 'Indices : [6, 8, 2] a un chiffre bien placé. [6, 1, 4] a un chiffre correct mais mal placé. [2, 0, 6] a deux chiffres corrects mais mal placés. [7, 3, 8] n’a aucun chiffre correct. Quel est le code ?',
      options: ['042', '052', '602', '420'],
      correctAnswer: '042',
      hint: '7, 3 et 8 sont éliminés. Comme 8 est faux, dans [6, 8, 2], le chiffre bien placé est soit 6 soit 2...',
      explanation: 'Puisque 8 est faux, 2 est le dernier chiffre bien placé (_ _ 2). 0 et 4 complètent le code : 042 !'
    }
  },
  {
    id: 'logic-13',
    title: 'Le Voyageur du Fleuve',
    description: 'Le loup, la chèvre et le chou doivent traverser sans encombre.',
    category: 'logic',
    level: 9,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 40,
    conceptLearned: 'Planification d’états et gestion des contraintes',
    type: 'quiz',
    data: {
      question: 'Le loup mange la chèvre s’ils sont seuls. La chèvre mange le chou s’ils sont seuls. Tu ne peux transporter qu’un seul élément dans ta barque. Qui dois-tu faire traverser en premier ?',
      options: ['Le Loup', 'La Chèvre', 'Le Chou', 'Personne'],
      correctAnswer: 'La Chèvre',
      hint: 'Si tu prends le Loup, la Chèvre mange le Chou. Si tu prends le Chou, le Loup mange la Chèvre...',
      explanation: 'En emmenant la Chèvre en premier, le Loup et le Chou restent ensemble sur la rive sans danger !'
    }
  },
  {
    id: 'logic-14',
    title: 'La Suite Modulo 12 (L’Horloge Galactique)',
    description: 'L’aiguille d’une station orbitale fait des sauts réguliers.',
    category: 'logic',
    level: 10,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 45,
    conceptLearned: 'Arithmétique modulaire',
    type: 'sequence',
    data: {
      sequence: ['2h', '6h', '10h', '2h', '6h', '?'],
      options: ['8h', '9h', '10h', '12h'],
      correctAnswer: '10h',
      hint: 'On ajoute toujours 4 heures à chaque étape. 6h + 4h = ?',
      explanation: 'Le cycle ajoute 4h à chaque pas : 6h + 4h = 10h (puis 10h + 4h = 14h = 2h) !'
    }
  },
  {
    id: 'logic-15',
    title: 'Recherche Binaire',
    description: 'Trouve le nombre mystère entre 1 et 100 avec le moins de questions possibles.',
    category: 'logic',
    level: 11,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 45,
    conceptLearned: 'Algorithme de dichotomie (recherche binaire)',
    type: 'quiz',
    data: {
      question: 'Pour trouver un nombre secret entre 1 et 100 en divisant toujours les possibilités par 2, quel nombre dois-tu tester en tout premier ?',
      options: ['1', '25', '50', '99'],
      correctAnswer: '50',
      hint: 'Coupe l’intervalle [1 - 100] exactement au milieu.',
      explanation: 'En demandant "Est-ce plus grand que 50 ?", tu élimines 50 nombres d’un coup ! C’est la recherche binaire (O(log n)).'
    }
  },
  {
    id: 'logic-16',
    title: 'La Matrice des Symboles',
    description: 'Complète la case manquante de la grille 3x3.',
    category: 'logic',
    level: 12,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Matrices de Raven et corrélation multi-axes',
    type: 'quiz',
    data: {
      question: 'Ligne 1 : ▲ (bleu), ■ (bleu), ● (bleu). Ligne 2 : ▲ (vert), ■ (vert), ● (vert). Ligne 3 : ▲ (jaune), ■ (jaune), ?',
      options: ['● (jaune)', '▲ (rouge)', '■ (vert)', '★ (jaune)'],
      correctAnswer: '● (jaune)',
      hint: 'Regarde la couleur de la 3e ligne et la forme de la 3e colonne.',
      explanation: 'Chaque ligne garde sa couleur (jaune) et chaque colonne sa forme (troisième colonne = cercle ●).'
    }
  },
  {
    id: 'logic-17',
    title: 'Les Îles et les Ponts',
    description: 'Un problème classique de graphes.',
    category: 'logic',
    level: 13,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Théorie des graphes (ponts de Königsberg)',
    type: 'quiz',
    data: {
      question: 'Une ville a 4 quartiers reliés par 7 ponts. Peut-on faire une promenade en passant par chaque pont une seule fois et revenir au point de départ si tous les quartiers ont un nombre impair de ponts ?',
      options: ['Oui, toujours', 'Non, c’est mathématiquement impossible', 'Seulement en courant', 'Oui avec un GPS'],
      correctAnswer: 'Non, c’est mathématiquement impossible',
      hint: 'Pour entrer et sortir d’un quartier sans repasser par le même pont, le nombre de ponts doit être pair.',
      explanation: 'C’est le théorème d’Euler (1736) qui a fondé la théorie des graphes ! Un graphe eulérien exige des degrés pairs.'
    }
  },
  {
    id: 'logic-18',
    title: 'Le Paradoxe du Menteur',
    description: 'Deux gardiens : l’un dit toujours la vérité, l’autre ment toujours.',
    category: 'logic',
    level: 14,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Logique autoréférentielle',
    type: 'quiz',
    data: {
      question: 'Quelle question poser à l’un des gardiens pour trouver la porte du trésor sans savoir qui ment ?',
      options: [
        'Es-tu un menteur ?',
        'Que me répondrait l’AUTRE gardien si je lui demandais quelle est la bonne porte ?',
        'Fait-il beau aujourd’hui ?',
        'Où est le trésor ?'
      ],
      correctAnswer: 'Que me répondrait l’AUTRE gardien si je lui demandais quelle est la bonne porte ?',
      hint: 'Un mensonge sur une vérité donne un mensonge, et une vérité sur un mensonge donne... aussi un mensonge !',
      explanation: 'Dans les deux cas, la réponse désignera la MAUVAISE porte, donc il suffit de choisir la porte inverse !'
    }
  },
  {
    id: 'logic-19',
    title: 'Suite Triangulaire',
    description: 'Combien de billes faut-il pour construire la pyramide suivante ?',
    category: 'logic',
    level: 15,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 50,
    conceptLearned: 'Nombres triangulaires n(n+1)/2',
    type: 'sequence',
    data: {
      sequence: ['1', '3', '6', '10', '15', '?'],
      options: ['18', '20', '21', '25'],
      correctAnswer: '21',
      hint: 'On ajoute +2, puis +3, puis +4, puis +5... Que doit-on ajouter à 15 ?',
      explanation: 'On ajoute +6 : 15 + 6 = 21 ! C’est le 6e nombre triangulaire.'
    }
  },
  {
    id: 'logic-20',
    title: 'Algorithme du Sac à Dos',
    description: 'Optimise le chargement de la fusée avant le décollage.',
    category: 'logic',
    level: 16,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 55,
    conceptLearned: 'Optimisation combinatoire (Knapsack problem)',
    type: 'quiz',
    data: {
      question: 'Tu as un sac de 10 kg maximum. Objet A : 5kg / valeur 10 pts. Objet B : 6kg / valeur 12 pts. Objet C : 4kg / valeur 9 pts. Objet D : 5kg / valeur 11 pts. Quelle combinaison donne le maximum de points sans dépasser 10 kg ?',
      options: ['A + B (11kg / 22 pts)', 'A + D (10kg / 21 pts)', 'C + D (9kg / 20 pts)', 'B + C (10kg / 21 pts)'],
      correctAnswer: 'A + D (10kg / 21 pts)',
      hint: 'A + D pèse 5 + 5 = 10kg et vaut 10 + 11 = 21 points (valide !). B + C vaut 12 + 9 = 21 pts aussi, les deux sont optimales mais A+D pèse exactement 10kg.',
      explanation: 'A (5kg) + D (5kg) = 10kg pour 21 points ! C’est un classique problème d’optimisation en informatique.'
    }
  },
  {
    id: 'logic-21',
    title: 'Suite Algébrique Inversée',
    description: 'Les nombres diminuent selon une formule précise.',
    category: 'logic',
    level: 17,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 55,
    conceptLearned: 'Décroissance quadratique',
    type: 'sequence',
    data: {
      sequence: ['100', '99', '95', '86', '70', '?'],
      options: ['45', '50', '54', '60'],
      correctAnswer: '45',
      hint: 'Regarde les écarts soustraits : -1, -4 (-2²), -9 (-3²), -16 (-4²)... Ensuite on soustrait 5² (25) !',
      explanation: '70 - 25 = 45 ! Les soustractions correspondent aux carrés parfaits (1, 4, 9, 16, 25).'
    }
  },
  {
    id: 'logic-22',
    title: 'Arbre Binaire de Décision',
    description: 'Suis les branches pour identifier la créature extra-terrestre.',
    category: 'logic',
    level: 18,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 60,
    conceptLearned: 'Structures d’arbres de décision',
    type: 'quiz',
    data: {
      question: 'Règle 1 : A-t-elle des ailes ? OUI → Règle 2 : Brille-t-elle la nuit ? OUI → Zog / NON → Xyl. NON → Règle 3 : A-t-elle 6 pattes ? OUI → Krik / NON → Blob. La créature N’A PAS d’ailes et a 6 pattes. Qui est-ce ?',
      options: ['Zog', 'Xyl', 'Krik', 'Blob'],
      correctAnswer: 'Krik',
      hint: 'Prends la branche NON aux ailes, puis OUI aux 6 pattes.',
      explanation: 'Arbre : Pas d’ailes (Règle 3) → 6 pattes = OUI → Krik ! Les arbres de décision sont au cœur du Machine Learning.'
    }
  },
  {
    id: 'logic-23',
    title: 'La Chaîne de Déductions Temporelles',
    description: 'Qui est arrivé le premier à la base martienne ?',
    category: 'logic',
    level: 19,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 60,
    conceptLearned: 'Relations d’ordre strict',
    type: 'quiz',
    data: {
      question: 'Alice est arrivée avant Bob. Charlie est arrivé après Bob mais avant David. Eva est arrivée avant Alice. Qui est arrivé en premier de tous ?',
      options: ['Alice', 'Bob', 'Charlie', 'Eva'],
      correctAnswer: 'Eva',
      hint: 'Eva est avant Alice, et Alice est avant tous les autres !',
      explanation: 'Ordre d’arrivée : Eva → Alice → Bob → Charlie → David. Eva est donc la première !'
    }
  },
  {
    id: 'logic-24',
    title: 'Logique Ternaire Spatiale',
    description: 'Quand les réponses ne sont pas seulement Vrai ou Faux.',
    category: 'logic',
    level: 20,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 65,
    conceptLearned: 'Logique à 3 valeurs (Vrai, Inconnu, Faux)',
    type: 'quiz',
    data: {
      question: 'En logique ternaire SQL/IA : Si A est VRAI et B est INCONNU, que vaut l’expression (A OU B) ?',
      options: ['VRAI', 'FAUX', 'INCONNU', 'ERREUR'],
      correctAnswer: 'VRAI',
      hint: 'Dans un OU, si au moins une condition est déjà VRAIE, peu importe la valeur de la seconde !',
      explanation: 'Puisque A est VRAI, le "OU" est garanti d’être VRAI même si la valeur de B est inconnue.'
    }
  },
  {
    id: 'logic-25',
    title: 'Le Défi des 8 Reines Simplifié',
    description: 'Placer des pièces sans qu’elles ne s’attaquent.',
    category: 'logic',
    level: 22,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 70,
    conceptLearned: 'Algorithme de Backtracking',
    type: 'quiz',
    data: {
      question: 'Sur un échiquier 4x4, si tu places une Reine en case (1, 2) et une autre en (2, 4), quelle case de la 3e ligne est libre de toute attaque ?',
      options: ['Case (3, 1)', 'Case (3, 2)', 'Case (3, 3)', 'Case (3, 4)'],
      correctAnswer: 'Case (3, 1)',
      hint: 'La case (3, 1) n’est ni sur la même colonne ni sur la même diagonale qu’aucune des deux reines.',
      explanation: 'Case (3, 1) est sûre ! La technique pour explorer et revenir en arrière s’appelle le "Backtracking".'
    }
  },
  {
    id: 'logic-26',
    title: 'Cryptographie César (+3)',
    description: 'Déchiffre le mot secret utilisé par les agents.',
    category: 'logic',
    level: 25,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 75,
    conceptLearned: 'Chiffrement par décalage',
    type: 'quiz',
    data: {
      question: 'Chaque lettre a été décalée de 3 rangs vers la droite (A devient D, B devient E). Quel mot se cache derrière le message codé "FRGH" ?',
      options: ['CODE', 'CHEF', 'LUNE', 'ROBOT'],
      correctAnswer: 'CODE',
      hint: 'F - 3 = C, R - 3 = O, G - 3 = D, H - 3 = E.',
      explanation: 'F(-3)=C, R(-3)=O, G(-3)=D, H(-3)=E → "CODE" ! C’est le célèbre chiffre de Jules César.'
    }
  },
  {
    id: 'logic-27',
    title: 'Détection d’Anomalie Algorithmique',
    description: 'Trouve l’élément qui ne respecte pas la règle.',
    category: 'logic',
    level: 28,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 75,
    conceptLearned: 'Détection de motifs aberrants (Outliers)',
    type: 'quiz',
    data: {
      question: 'Voici une liste : [3, 7, 11, 15, 20, 23, 27]. Quel nombre est un intrus dans cette progression arithmétique ?',
      options: ['7', '15', '20', '23'],
      correctAnswer: '20',
      hint: 'La règle est d’ajouter 4 à chaque fois (3+4=7, 7+4=11, 11+4=15, 15+4=19...).',
      explanation: '20 est l’intrus ! Il aurait fallu 19, puis 19+4=23. En science des données, on appelle cela un outlier.'
    }
  },
  {
    id: 'logic-28',
    title: 'Le Tri Rapide (Quicksort)',
    description: 'Comprendre le fonctionnement du tri par pivot.',
    category: 'logic',
    level: 32,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 80,
    conceptLearned: 'Algorithme diviser pour régner',
    type: 'quiz',
    data: {
      question: 'Dans le tri rapide avec pivot = 5 sur la liste [8, 2, 7, 5, 1, 9, 3], quels éléments iront dans la sous-liste de gauche (plus petits que le pivot) ?',
      options: ['[8, 7, 9]', '[2, 1, 3]', '[1, 2, 3, 5]', '[2, 5, 8]'],
      correctAnswer: '[2, 1, 3]',
      hint: 'Tous les nombres strictement inférieurs à 5.',
      explanation: 'Les nombres inférieurs à 5 sont 2, 1 et 3. Le Quicksort divise le problème en deux moitiés !'
    }
  },
  {
    id: 'logic-29',
    title: 'Problème du Plus Court Chemin (Dijkstra)',
    description: 'Aide le rover à dépenser le moins de batterie possible.',
    category: 'logic',
    level: 35,
    difficulty: 'hard',
    durationMinutes: 12,
    xpReward: 90,
    conceptLearned: 'Algorithme de Dijkstra',
    type: 'quiz',
    data: {
      question: 'Départ A. Route 1 directe vers Arrivée B : coût 10. Route 2 : A vers C (coût 3) puis C vers B (coût 4). Quel chemin est le plus rapide ?',
      options: ['La route directe A → B (10)', 'La route via C : A → C → B (7)', 'Les deux coûtent pareil', 'Aucune n’est praticable'],
      correctAnswer: 'La route via C : A → C → B (7)',
      hint: 'Calcule 3 + 4 et compare à 10.',
      explanation: '3 + 4 = 7, ce qui est inférieur à 10 ! C’est exactement ainsi que votre GPS calcule les itinéraires.'
    }
  },
  {
    id: 'logic-30',
    title: 'Défi PRO : Algorithme Combinatoire Suprême',
    description: 'Le test ultime pour les futurs maîtres de la logique.',
    category: 'logic',
    level: 40,
    difficulty: 'hard',
    durationMinutes: 15,
    xpReward: 100,
    conceptLearned: 'Complexité algorithmique et raisonnement PRO',
    type: 'quiz',
    data: {
      question: 'Si doubler la taille d’un problème multiplie le temps de calcul par 4, quelle est la complexité temporelle de cet algorithme ?',
      options: ['Linéaire O(n)', 'Quadratique O(n²)', 'Logarithmique O(log n)', 'Exponentielle O(2ⁿ)'],
      correctAnswer: 'Quadratique O(n²)',
      hint: '2 au carré (2²) = 4.',
      explanation: 'Lorsque n double (2n), (2n)² = 4n², donc le temps est multiplié par 4. C’est la complexité O(n²) ! Bravo niveau PRO !'
    }
  },

  // --- 20 CODE KIDS ACTIVITIES ---
  {
    id: 'code-1',
    title: 'Premier Pas : Avancer vers l’Étoile',
    description: 'Programme le robot pour qu’il avance de 3 pas vers l’étoile scintillante.',
    category: 'code',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 4,
    xpReward: 15,
    conceptLearned: 'Séquence d’instructions ordonnées',
    type: 'code-blocks',
    data: {
      gridSize: 5,
      robotStart: { x: 0, y: 2, dir: 'right' },
      targets: [{ x: 3, y: 2 }],
      obstacles: [],
      availableBlocks: ['FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
      solution: ['FORWARD', 'FORWARD', 'FORWARD'],
      explanation: 'Le robot exécute les instructions une par une de haut en bas !'
    }
  },
  {
    id: 'code-2',
    title: 'Le Virage de l’Astronaute',
    description: 'Tourne à droite pour éviter le cratère et atteindre la base.',
    category: 'code',
    level: 1,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 20,
    conceptLearned: 'Rotation et changement de direction',
    type: 'code-blocks',
    data: {
      gridSize: 5,
      robotStart: { x: 1, y: 1, dir: 'right' },
      targets: [{ x: 3, y: 3 }],
      obstacles: [{ x: 3, y: 1 }],
      availableBlocks: ['FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
      solution: ['FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD'],
      explanation: 'Tourner change l’orientation du robot sans le déplacer !'
    }
  },
  {
    id: 'code-3',
    title: 'La Première Boucle Magique',
    description: 'Utilise la boucle RÉPÉTER pour avancer plus vite sans répéter 4 fois le bloc.',
    category: 'code',
    level: 2,
    difficulty: 'easy',
    durationMinutes: 6,
    xpReward: 25,
    conceptLearned: 'Boucle REPEAT (for loop)',
    type: 'code-blocks',
    data: {
      gridSize: 6,
      robotStart: { x: 0, y: 2, dir: 'right' },
      targets: [{ x: 4, y: 2 }],
      obstacles: [],
      availableBlocks: ['FORWARD', 'REPEAT_4', 'TURN_RIGHT'],
      solution: ['REPEAT_4'],
      explanation: 'Une boucle permet d’exécuter le même code plusieurs fois sans recopier les lignes !'
    }
  },
  {
    id: 'code-4',
    title: 'Le Tour du Carré Parfait',
    description: 'Fais tracer un carré au robot en combinant répétition et virages.',
    category: 'code',
    level: 3,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 30,
    conceptLearned: 'Algorithme géométrique et réutilisation',
    type: 'code-blocks',
    data: {
      gridSize: 5,
      robotStart: { x: 1, y: 1, dir: 'right' },
      targets: [{ x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 1 }],
      obstacles: [],
      availableBlocks: ['FORWARD', 'TURN_RIGHT', 'REPEAT_4'],
      solution: ['FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD'],
      explanation: 'Un carré est composé de 4 côtés égaux et de 4 angles droits de 90° !'
    }
  },
  {
    id: 'code-5',
    title: 'Évasion du Labyrinthe Niveau 1',
    description: 'Guider le robot à travers un couloir sinueux.',
    category: 'code',
    level: 4,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 35,
    conceptLearned: 'Enchaînement de séquences complexes',
    type: 'code-blocks',
    data: {
      gridSize: 6,
      robotStart: { x: 0, y: 0, dir: 'down' },
      targets: [{ x: 4, y: 4 }],
      obstacles: [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 3, y: 1 }, { x: 3, y: 2 }],
      availableBlocks: ['FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
      solution: ['FORWARD', 'FORWARD', 'TURN_LEFT', 'FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD', 'TURN_LEFT', 'FORWARD', 'FORWARD'],
      explanation: 'La planification étape par étape permet de résoudre n’importe quel chemin !'
    }
  },
  {
    id: 'code-6',
    title: 'Condition SI : Éviter l’Astéroïde',
    description: 'Utilise le bloc conditionnel pour détecter un obstacle avant d’avancer.',
    category: 'code',
    level: 5,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 35,
    conceptLearned: 'Instructions conditionnelles (IF / THEN)',
    type: 'code-blocks',
    data: {
      gridSize: 5,
      robotStart: { x: 1, y: 2, dir: 'right' },
      targets: [{ x: 4, y: 2 }],
      obstacles: [{ x: 3, y: 2 }],
      availableBlocks: ['FORWARD', 'IF_OBSTACLE_TURN_LEFT', 'TURN_RIGHT'],
      solution: ['FORWARD', 'IF_OBSTACLE_TURN_LEFT', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD'],
      explanation: 'Grâce au SI, ton robot prend des décisions intelligentes selon son environnement !'
    }
  },
  {
    id: 'code-7',
    title: 'Collecte d’Étoiles Multiples',
    description: 'Ramasse 3 cristaux d’énergie dispersés dans la grille.',
    category: 'code',
    level: 6,
    difficulty: 'medium',
    durationMinutes: 9,
    xpReward: 40,
    conceptLearned: 'Gestion d’objectifs multiples',
    type: 'code-blocks',
    data: {
      gridSize: 5,
      robotStart: { x: 0, y: 2, dir: 'right' },
      targets: [{ x: 2, y: 2 }, { x: 2, y: 0 }, { x: 4, y: 0 }],
      obstacles: [{ x: 2, y: 1 }],
      availableBlocks: ['FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
      solution: ['FORWARD', 'FORWARD', 'TURN_LEFT', 'FORWARD', 'FORWARD', 'TURN_RIGHT', 'FORWARD', 'FORWARD'],
      explanation: 'Découper un grand objectif en sous-objectifs est une compétence clé du développeur.'
    }
  },
  {
    id: 'code-8',
    title: 'La Variable Énergie',
    description: 'Comprendre comment stocker et modifier une valeur dans un programme.',
    category: 'code',
    level: 7,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 40,
    conceptLearned: 'Variables et assignation de valeurs',
    type: 'quiz',
    data: {
      question: 'Au départ, energie = 10. Le robot avance (+5), puis allume ses phares (-3), puis ramasse une batterie (+10). Que vaut la variable energie à la fin ?',
      options: ['12', '18', '22', '25'],
      correctAnswer: '22',
      hint: 'Calcule étape par étape : 10 + 5 = 15. 15 - 3 = 12. 12 + 10 = ?',
      explanation: '10 + 5 - 3 + 10 = 22 ! Une variable est comme une boîte qui retient un résultat qui change.'
    }
  },
  {
    id: 'code-9',
    title: 'Boucle TANT QUE (While Loop)',
    description: 'Faire avancer le robot tant qu’il n’a pas atteint le mur.',
    category: 'code',
    level: 8,
    difficulty: 'medium',
    durationMinutes: 9,
    xpReward: 45,
    conceptLearned: 'Boucle conditionnelle (WHILE)',
    type: 'quiz',
    data: {
      question: 'Quelle est la différence essentielle entre une boucle "RÉPÉTER 5 FOIS" et une boucle "TANT QUE pas de mur" ?',
      options: [
        'Répéter 5 fois s’arrête toujours au bout de 5, alors que Tant Que s’adapte à la distance réelle du mur',
        'Tant que ne fonctionne que le matin',
        'Répéter ne peut utiliser que des nombres impairs',
        'Il n’y a aucune différence'
      ],
      correctAnswer: 'Répéter 5 fois s’arrête toujours au bout de 5, alors que Tant Que s’adapte à la distance réelle du mur',
      hint: 'Pense à ce qui se passe si le mur est à 2 cases ou à 10 cases.',
      explanation: 'La boucle conditionnelle s’adapte dynamiquement à la situation inconnue à l’avance !'
    }
  },
  {
    id: 'code-10',
    title: 'Créer sa Première Fonction',
    description: 'Donne un nom à une suite d’actions pour pouvoir la réutiliser facilement.',
    category: 'code',
    level: 9,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 45,
    conceptLearned: 'Définition et appel de fonctions',
    type: 'quiz',
    data: {
      question: 'Tu crées une fonction : function faireDemiTour() { tournerDroite(); tournerDroite(); }. Que fait le robot si tu écris dans ton code : faireDemiTour(); ?',
      options: [
        'Il tourne à droite deux fois pour regarder en arrière',
        'Il s’éteint',
        'Il avance tout droit',
        'Il saute'
      ],
      correctAnswer: 'Il tourne à droite deux fois pour regarder en arrière',
      hint: 'Appeler une fonction exécute tous les blocs rangés à l’intérieur de celle-ci.',
      explanation: 'Les fonctions évitent de se répéter (principe DRY : Don’t Repeat Yourself) !'
    }
  },
  {
    id: 'code-11',
    title: 'Chasse aux Bugs (Débogage)',
    description: 'Le robot s’est trompé de direction. Trouve où se trouve l’erreur.',
    category: 'code',
    level: 10,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Débogage et lecture de code',
    type: 'quiz',
    data: {
      question: 'Pour aller vers la cible à droite, le codeur a écrit : 1. Avancer / 2. Tourner à GAUCHE / 3. Avancer. Or la cible était en bas à droite ! Quel bloc faut-il corriger ?',
      options: ['Remplacer Tourner à GAUCHE par Tourner à DROITE à l’étape 2', 'Supprimer l’étape 1', 'Ajouter 10 pas', 'Éteindre l’ordinateur'],
      correctAnswer: 'Remplacer Tourner à GAUCHE par Tourner à DROITE à l’étape 2',
      hint: 'Pour aller vers le bas depuis la droite, il faut tourner à droite.',
      explanation: 'Le débogage consiste à traquer et corriger la ligne responsable de l’erreur.'
    }
  },
  {
    id: 'code-12',
    title: 'Les Tableaux (Listes de Données)',
    description: 'Comment un ordinateur range les objets dans son sac.',
    category: 'code',
    level: 11,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 45,
    conceptLearned: 'Indexation de tableaux à partir de 0',
    type: 'quiz',
    data: {
      question: 'En programmation, le premier élément d’une liste inventaire = ["Pomme", "Bouclier", "Clé"] est à l’index 0. Quel objet se trouve à inventaire[1] ?',
      options: ['Pomme', 'Bouclier', 'Clé', 'Rien'],
      correctAnswer: 'Bouclier',
      hint: 'index 0 = Pomme. Quel est l’élément suivant à l’index 1 ?',
      explanation: 'En JS/Python, les listes commencent à 0 ! inventaire[0]="Pomme", inventaire[1]="Bouclier".'
    }
  },
  {
    id: 'code-13',
    title: 'L’Algorithme du Suiveur de Ligne',
    description: 'Comment les robots d’entrepôt suivent les bandes adhésives au sol.',
    category: 'code',
    level: 12,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 50,
    conceptLearned: 'Boucle de rétroaction et capteurs',
    type: 'quiz',
    data: {
      question: 'Capteur gauche voit NOIR, capteur droit voit BLANC. Pour rester centré sur la ligne noire, de quel côté le robot doit-il tourner ?',
      options: ['Vers la gauche', 'Vers la droite', 'En marche arrière', 'Il s’arrête'],
      correctAnswer: 'Vers la gauche',
      hint: 'Puisque la ligne noire est sous son capteur gauche, il doit s’orienter vers la gauche pour la retrouver.',
      explanation: 'En tournant vers la gauche, il se recentre. C’est la base du contrôle automatique en robotique !'
    }
  },
  {
    id: 'code-14',
    title: 'Boucles Imbriquées (Boucle dans une Boucle)',
    description: 'Remplir une grille 2D ligne par ligne.',
    category: 'code',
    level: 14,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 55,
    conceptLearned: 'Boucles imbriquées (Nested loops)',
    type: 'quiz',
    data: {
      question: 'POUR chaque ligne de 1 à 3 : POUR chaque colonne de 1 à 4 : poserUneBrique(). Combien de briques sont posées au total ?',
      options: ['7 briques', '12 briques', '14 briques', '16 briques'],
      correctAnswer: '12 briques',
      hint: '3 lignes multipliées par 4 colonnes.',
      explanation: '3 x 4 = 12 briques ! Les boucles imbriquées parcourent des surfaces en deux dimensions.'
    }
  },
  {
    id: 'code-15',
    title: 'Opérateurs Logiques dans le Code',
    description: 'Tester plusieurs conditions en une seule ligne.',
    category: 'code',
    level: 16,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 55,
    conceptLearned: 'Opérateurs logiques && (ET) et || (OU)',
    type: 'quiz',
    data: {
      question: 'Si le code est : if (aUneClef === true && porteVerrouillee === true) { ouvrirPorte(); }. Que se passe-t-il si aUneClef est FAUX mais porteVerrouillee est VRAI ?',
      options: ['La porte s’ouvre quand même', 'La porte reste fermée', 'L’ordinateur explose', 'La clé disparaît'],
      correctAnswer: 'La porte reste fermée',
      hint: 'L’opérateur && exige que les DEUX côtés soient vrais.',
      explanation: 'Avec &&, il faut obligatoirement posséder la clé ET que la porte soit verrouillée.'
    }
  },
  {
    id: 'code-16',
    title: 'La Récursivité : La Fonction Miroir',
    description: 'Une fonction qui s’appelle elle-même jusqu’à une condition d’arrêt.',
    category: 'code',
    level: 18,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 60,
    conceptLearned: 'Principe de récursion et cas de base',
    type: 'quiz',
    data: {
      question: 'Que risque-t-il d’arriver si une fonction récursive n’a pas de condition d’arrêt ("cas de base") ?',
      options: [
        'Le programme tourne à l’infini et provoque un dépassement de pile (Stack Overflow)',
        'Le code devient plus rapide',
        'Le robot change de couleur',
        'Rien d’anormal'
      ],
      correctAnswer: 'Le programme tourne à l’infini et provoque un dépassement de pile (Stack Overflow)',
      hint: 'Pense à un miroir face à un autre miroir : le reflet ne s’arrête jamais.',
      explanation: 'Sans condition d’arrêt, la pile d’appels mémoire sature : c’est le fameux Stack Overflow !'
    }
  },
  {
    id: 'code-17',
    title: 'Les Objets et Propriétés',
    description: 'Modéliser un vaisseau spatial avec du code orienté objet.',
    category: 'code',
    level: 20,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 65,
    conceptLearned: 'Objets, clés et valeurs JSON',
    type: 'quiz',
    data: {
      question: 'Soit l’objet : const robot = { nom: "Apollo", vitesse: 100, bouclierActif: true };. Comment accède-t-on au nom du robot en JavaScript ?',
      options: ['robot.nom', 'robot(nom)', 'nom[robot]', 'robot -> nom'],
      correctAnswer: 'robot.nom',
      hint: 'On utilise la notation pointée (dot notation).',
      explanation: 'robot.nom renvoie la chaîne "Apollo". Les objets permettent d’organiser des données complexes.'
    }
  },
  {
    id: 'code-18',
    title: 'Algorithme de Tri à Bulles (Bubble Sort)',
    description: 'Faire remonter les plus grands nombres vers la droite.',
    category: 'code',
    level: 24,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 70,
    conceptLearned: 'Tri par comparaisons et permutations successives',
    type: 'quiz',
    data: {
      question: 'Sur la liste [5, 1, 4], lors du premier passage, on compare 5 et 1. 5 étant plus grand, on échange. Quelle est la liste obtenue ?',
      options: ['[1, 5, 4]', '[5, 4, 1]', '[4, 1, 5]', '[1, 4, 5]'],
      correctAnswer: '[1, 5, 4]',
      hint: 'Permute simplement les deux premiers nombres.',
      explanation: '5 et 1 s’échangent pour donner [1, 5, 4]. Ensuite 5 et 4 s’échangeront pour donner [1, 4, 5] !'
    }
  },
  {
    id: 'code-19',
    title: 'Labyrinthe : La Règle de la Main Droite',
    description: 'Un algorithme infaillible pour sortir d’un labyrinthe simple.',
    category: 'code',
    level: 28,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 75,
    conceptLearned: 'Algorithme d’exploration murale',
    type: 'quiz',
    data: {
      question: 'En quoi consiste l’algorithme de la main droite dans un labyrinthe sans boucle ?',
      options: [
        'Garder toujours sa main droite posée sur le mur de droite et avancer sans la décoller',
        'Tourner à droite uniquement quand on a peur',
        'Courir les yeux fermés vers la droite',
        'Tracer un cercle'
      ],
      correctAnswer: 'Garder toujours sa main droite posée sur le mur de droite et avancer sans la décoller',
      hint: 'Tant que le mur est continu jusqu’à la sortie, tu trouveras forcément la sortie.',
      explanation: 'C’est un algorithme déterministe très simple et robuste utilisé en robotique mobile d’exploration.'
    }
  },
  {
    id: 'code-20',
    title: 'Défi PRO Code : Créer un Interpréteur Virtuel',
    description: 'Comprendre comment le processeur exécute les instructions machine.',
    category: 'code',
    level: 35,
    difficulty: 'hard',
    durationMinutes: 12,
    xpReward: 90,
    conceptLearned: 'Architecture de Von Neumann et cycle Fetch-Decode-Execute',
    type: 'quiz',
    data: {
      question: 'Quel est l’ordre des trois étapes répétées des milliards de fois par seconde par le processeur d’un ordinateur ?',
      options: [
        '1. Charger (Fetch) → 2. Décoder (Decode) → 3. Exécuter (Execute)',
        '1. Éteindre → 2. Réchauffer → 3. Nettoyer',
        '1. Dessiner → 2. Chanter → 3. Calculer',
        '1. Sauvegarder → 2. Supprimer → 3. Envoyer'
      ],
      correctAnswer: '1. Charger (Fetch) → 2. Décoder (Decode) → 3. Exécuter (Execute)',
      hint: 'Le processeur va chercher l’instruction en mémoire RAM, comprend ce qu’elle veut dire, puis l’applique.',
      explanation: 'Cycle fondamental du CPU : Fetch (chercher), Decode (décoder), Execute (exécuter) ! Tu as l’esprit d’un vrai architecte système !'
    }
  },

  // --- 15 AI EXPLORER ACTIVITIES ---
  {
    id: 'ai-1',
    title: 'Qu’est-ce qu’une IA ?',
    description: 'Découvre la différence entre un programme classique et une intelligence artificielle.',
    category: 'ai',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Programme avec règles vs modèle qui apprend par exemples',
    type: 'quiz',
    data: {
      question: 'Quelle est la différence magique entre une calculatrice classique et une IA comme Gemini ?',
      options: [
        'La calculatrice applique des règles fixes préécrites par un humain, tandis que l’IA apprend à partir de millions d’exemples',
        'L’IA possède un vrai cerveau biologique fait de neurones réels',
        'La calculatrice fonctionne avec de la magie',
        'Il n’y a aucune différence'
      ],
      correctAnswer: 'La calculatrice applique des règles fixes préécrites par un humain, tandis que l’IA apprend à partir de millions d’exemples',
      hint: 'Pense à un enfant qui apprend à reconnaître un chien en en voyant plusieurs dans la rue.',
      explanation: 'Une IA n’a pas une règle gravée pour chaque cas : elle a extrait des motifs récurrents à partir de tonnes de données !'
    }
  },
  {
    id: 'ai-2',
    title: 'C’est quoi une Donnée (Dataset) ?',
    description: 'Sans données, une IA ne sait rien du tout !',
    category: 'ai',
    level: 1,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Les données d’entraînement (Training dataset)',
    type: 'quiz',
    data: {
      question: 'Si tu veux entraîner une IA à reconnaître les pommes mûres, de quoi as-tu absolument besoin ?',
      options: [
        'D’un millier de photos de pommes avec l’indication "mûre" ou "pas mûre"',
        'D’une seule pomme en plastique',
        'De jus de pomme sur le clavier',
        'D’un télescope spatial'
      ],
      correctAnswer: 'D’un millier de photos de pommes avec l’indication "mûre" ou "pas mûre"',
      hint: 'Plus l’IA voit d’exemples variés et bien étiquetés, meilleure elle sera.',
      explanation: 'Ces exemples étiquetés forment le "dataset d’entraînement". Sans données de qualité, l’IA ne peut rien apprendre !'
    }
  },
  {
    id: 'ai-3',
    title: 'Le Classificateur Chat ou Chien',
    description: 'Comment une IA fait la différence entre deux animaux.',
    category: 'ai',
    level: 2,
    difficulty: 'easy',
    durationMinutes: 6,
    xpReward: 20,
    conceptLearned: 'Classification visuelle binaire',
    type: 'classification',
    data: {
      features: ['Oreilles pointues', 'Moustaches longues', 'Pupilles verticales'],
      options: ['Chat', 'Chien'],
      correctAnswer: 'Chat',
      hint: 'Ces caractéristiques (features) sont très courantes chez les félins.',
      explanation: 'L’IA extrait des "caractéristiques" visuelles (features) pour calculer une probabilité !'
    }
  },
  {
    id: 'ai-4',
    title: 'Reconnaissance de Motifs (Patterns)',
    description: 'Comment l’IA lit des chiffres écrits à la main.',
    category: 'ai',
    level: 3,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 25,
    conceptLearned: 'Dataset MNIST et détection de traits',
    type: 'quiz',
    data: {
      question: 'Quand une IA analyse un "8" manuscrit, quels motifs géométriques cherche-t-elle principalement ?',
      options: [
        'Deux boucles superposées reliées au centre',
        'Une seule ligne droite verticale',
        'Un triangle pointé vers le haut',
        'Une ligne en zigzag sans boucle'
      ],
      correctAnswer: 'Deux boucles superposées reliées au centre',
      hint: 'Pense à la forme du chiffre 8 : deux cercles empilés.',
      explanation: 'Le modèle détecte les courbes, les boucles et les intersections pour identifier le chiffre !'
    }
  },
  {
    id: 'ai-5',
    title: 'L’Apprentissage Supervisé',
    description: 'Le rôle du professeur qui corrige les exercices de l’ordinateur.',
    category: 'ai',
    level: 4,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 25,
    conceptLearned: 'Supervised Learning et fonction de perte (Loss)',
    type: 'quiz',
    data: {
      question: 'En apprentissage supervisé, que fait le système quand l’IA prédit "Vélo" alors que la photo montre une "Voiture" ?',
      options: [
        'Il calcule l’erreur et ajuste légèrement les connexions internes (poids) pour faire mieux la prochaine fois',
        'Il supprime tout le modèle',
        'Il félicite le modèle',
        'Il formate le disque dur'
      ],
      correctAnswer: 'Il calcule l’erreur et ajuste légèrement les connexions internes (poids) pour faire mieux la prochaine fois',
      hint: 'On appelle cet ajustement la rétropropagation du gradient (backpropagation).',
      explanation: 'C’est en réduisant progressivement ses erreurs sur des milliers d’exemples que le modèle s’améliore !'
    }
  },
  {
    id: 'ai-6',
    title: 'Prédiction Météo par les Nombres',
    description: 'Comment une IA anticipe s’il va pleuvoir demain.',
    category: 'ai',
    level: 5,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 30,
    conceptLearned: 'Régression et corrélations multi-variables',
    type: 'quiz',
    data: {
      question: 'Quelles variables l’IA météo doit-elle corréler pour prédire la pluie ?',
      options: [
        'Température, pression atmosphérique, humidité et vitesse du vent',
        'Uniquement la couleur de la chemise du présentateur',
        'Le nombre de chats dans le quartier',
        'L’heure du déjeuner'
      ],
      correctAnswer: 'Température, pression atmosphérique, humidité et vitesse du vent',
      hint: 'Ces grandeurs physiques ont un impact direct sur la condensation de l’eau.',
      explanation: 'En combinant ces millions de mesures de capteurs, l’IA détecte les schémas qui précèdent les averses.'
    }
  },
  {
    id: 'ai-7',
    title: 'Pourquoi l’IA Confond un Muffin et un Chiot ?',
    description: 'Comprendre les limites et les illusions visuelles des réseaux de neurones.',
    category: 'ai',
    level: 6,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 35,
    conceptLearned: 'Limites de la vision artificielle et illusions d’optique pour IA',
    type: 'quiz',
    data: {
      question: 'Pourquoi un modèle de vision par ordinateur peut-il hésiter entre un muffin aux myrtilles et la tête d’un petit chien carlin ?',
      options: [
        'Parce qu’ils partagent les mêmes motifs visuels locaux : trois taches sombres circulaires (yeux/truffe ou pépites de myrtille)',
        'Parce que le modèle a très faim',
        'Parce que les muffins aboient la nuit',
        'Parce que l’ordinateur ne supporte pas le chocolat'
      ],
      correctAnswer: 'Parce qu’ils partagent les mêmes motifs visuels locaux : trois taches sombres circulaires (yeux/truffe ou pépites de myrtille)',
      hint: 'L’IA ne comprend pas le monde physique ; elle analyse uniquement des contrastes de pixels.',
      explanation: 'Une IA ne "sait" pas ce qu’est un chien. Elle ne voit que des groupes de pixels sombres disposés en triangle !'
    }
  },
  {
    id: 'ai-8',
    title: 'Les Biais dans l’IA : Le Piège des Données',
    description: 'Si les exemples sont déséquilibrés, l’IA deviendra injuste.',
    category: 'ai',
    level: 7,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 40,
    conceptLearned: 'Biais algorithmiques et équité des données (AI Fairness)',
    type: 'quiz',
    data: {
      question: 'Si on entraîne une IA de détection médicale uniquement avec des photos de peaux très claires, que se passera-t-il pour un patient à la peau foncée ?',
      options: [
        'L’IA risque d’être beaucoup moins précise et de rater des diagnostics importants',
        'L’IA sera encore plus performante',
        'Rien du tout, la peau n’a pas d’importance pour les photos',
        'L’IA refusera de s’allumer'
      ],
      correctAnswer: 'L’IA risque d’être beaucoup moins précise et de rater des diagnostics importants',
      hint: 'Un modèle ne sait reconnaître que ce qu’on lui a appris à observer.',
      explanation: 'C’est le biais d’échantillonnage. Il est crucial d’avoir des données variées et représentatives de tout le monde !'
    }
  },
  {
    id: 'ai-9',
    title: 'Traitement du Langage (NLP) et Tokens',
    description: 'Comment Gemini découpe une phrase pour la comprendre.',
    category: 'ai',
    level: 8,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 40,
    conceptLearned: 'Tokenisation et probabilité du mot suivant',
    type: 'quiz',
    data: {
      question: 'Comment les grands modèles de langage (LLM) comme Gemini génèrent-ils une réponse mot après mot ?',
      options: [
        'En calculant statistiquement quel est le mot le plus pertinent et probable pour continuer la phrase',
        'En recopiant une page Wikipédia par cœur au mot près',
        'En cherchant un dictionnaire sous la table',
        'En demandant à un humain caché dans le serveur'
      ],
      correctAnswer: 'En calculant statistiquement quel est le mot le plus pertinent et probable pour continuer la phrase',
      hint: 'C’est comme une prédiction ultra-intelligente du prochain mot sur le clavier de ton téléphone.',
      explanation: 'Le modèle prédit des probabilités sur des morceaux de mots appelés "tokens".'
    }
  },
  {
    id: 'ai-10',
    title: 'Voitures Autonomes : La Fusion de Capteurs',
    description: 'Prendre une décision vitale en une fraction de seconde.',
    category: 'ai',
    level: 10,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 45,
    conceptLearned: 'Caméras, Radar, LiDAR et prise de décision temps réel',
    type: 'quiz',
    data: {
      question: 'Pourquoi une voiture autonome utilise-t-elle à la fois des caméras ET un LiDAR (laser) plutôt que des caméras seules ?',
      options: [
        'Parce que le LiDAR fonctionne dans le noir et mesure les distances au millimètre près, complétant la caméra qui lit les panneaux',
        'Pour faire joli sur le toit',
        'Pour écouter la radio plus fort',
        'Parce que le laser fait fuir les oiseaux'
      ],
      correctAnswer: 'Parce que le LiDAR fonctionne dans le noir et mesure les distances au millimètre près, complétant la caméra qui lit les panneaux',
      hint: 'La redondance et la complémentarité des capteurs sauvent des vies.',
      explanation: 'Chaque capteur a ses forces. La combinaison de plusieurs technologies s’appelle la "fusion de capteurs".'
    }
  },
  {
    id: 'ai-11',
    title: 'L’IA Générative et les Réseaux Concurrenciels',
    description: 'Comment une IA invente un dessin qu’aucun humain n’a jamais créé.',
    category: 'ai',
    level: 12,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Modèles de diffusion et réseaux GAN',
    type: 'quiz',
    data: {
      question: 'Comment fonctionne un modèle de diffusion d’image (comme Imagen ou Stable Diffusion) ?',
      options: [
        'Il part d’une image de bruit pur (brouillard de pixels) et retire pas à pas le bruit pour faire émerger l’image demandée',
        'Il prend des bouts d’images Google et les colle avec du scotch virtuel',
        'Il demande à un artiste de dessiner en secret',
        'Il utilise un appareil photo spatial'
      ],
      correctAnswer: 'Il part d’une image de bruit pur (brouillard de pixels) et retire pas à pas le bruit pour faire émerger l’image demandée',
      hint: 'Comme un sculpteur qui enlève la poussière d’un bloc de pierre pour révéler la statue.',
      explanation: 'Le débruitage progressif guidé par le texte (prompt) crée des images 100% inédites !'
    }
  },
  {
    id: 'ai-12',
    title: 'Hallucination de l’IA : Vrai ou Faux ?',
    description: 'Pourquoi il faut toujours vérifier ce qu’affirme un robot.',
    category: 'ai',
    level: 14,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 50,
    conceptLearned: 'Phénomène d’hallucination et esprit critique',
    type: 'quiz',
    data: {
      question: 'Qu’est-ce qu’une "hallucination" pour une intelligence artificielle ?',
      options: [
        'Quand l’IA invente une information fausse avec une totale assurance comme si c’était vrai',
        'Quand le ventilateur de l’ordinateur fait trop de bruit',
        'Quand l’écran s’éteint tout seul',
        'Quand l’IA rêve d’arcs-en-ciel'
      ],
      correctAnswer: 'Quand l’IA invente une information fausse avec une totale assurance comme si c’était vrai',
      hint: 'Une IA cherche la phrase la plus plausible grammaticalement, pas forcément la vérité scientifique.',
      explanation: 'Un modèle linguistique assemble des mots probables. Il faut TOUJOURS garder son esprit critique et vérifier les faits !'
    }
  },
  {
    id: 'ai-13',
    title: 'Données Personnelles et Entraînement',
    description: 'Protéger sa vie privée à l’ère des intelligences artificielles.',
    category: 'ai',
    level: 16,
    difficulty: 'hard',
    durationMinutes: 8,
    xpReward: 55,
    conceptLearned: 'RGPD, anonymisation et confidentialité des données',
    type: 'quiz',
    data: {
      question: 'Pourquoi ne faut-il JAMAIS coller ton mot de passe ou l’adresse de ta maison dans un robot conversationnel en ligne ?',
      options: [
        'Parce que ces données peuvent être enregistrées sur des serveurs distants ou utilisées pour réentraîner le modèle',
        'Parce que le clavier va se bloquer',
        'Parce que le robot va avoir peur',
        'Parce que ça fait baisser la vitesse de connexion'
      ],
      correctAnswer: 'Parce que ces données peuvent être enregistrées sur des serveurs distants ou utilisées pour réentraîner le modèle',
      hint: 'Tout ce que tu envoies sur Internet laisse une trace numérique.',
      explanation: 'La règle d’or de la cybersécurité : ne partage en ligne que ce que tu serais prêt à afficher sur la porte de ton école.'
    }
  },
  {
    id: 'ai-14',
    title: 'Le Test de Turing Moderne',
    description: 'Une machine peut-elle penser ou imite-t-elle la pensée ?',
    category: 'ai',
    level: 20,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 60,
    conceptLearned: 'Histoire de l’informatique (Alan Turing 1950)',
    type: 'quiz',
    data: {
      question: 'En quoi consistait le test imaginé par le mathématicien Alan Turing en 1950 ?',
      options: [
        'Un humain discute par texte avec deux interlocuteurs (un humain et une machine) sans savoir qui est qui ; s’il ne peut pas les distinguer, la machine réussit le test',
        'Faire courir un robot sur un tapis roulant',
        'Résoudre une équation en moins d’une seconde',
        'Construire un ordinateur en bois'
      ],
      correctAnswer: 'Un humain discute par texte avec deux interlocuteurs (un humain et une machine) sans savoir qui est qui ; s’il ne peut pas les distinguer, la machine réussit le test',
      hint: 'Le test portait sur la capacité à imiter une conversation humaine indiscernable.',
      explanation: 'Alan Turing est considéré comme le père de l’informatique théorique et de l’intelligence artificielle !'
    }
  },
  {
    id: 'ai-15',
    title: 'Défi PRO IA : L’Ingénieur Éthique',
    description: 'Prendre les bonnes décisions pour le futur de la technologie.',
    category: 'ai',
    level: 25,
    difficulty: 'hard',
    durationMinutes: 12,
    xpReward: 70,
    conceptLearned: 'Éthique de l’IA, transparence et responsabilité',
    type: 'quiz',
    data: {
      question: 'Quel principe est le plus essentiel pour construire une IA digne de confiance (Trustworthy AI) ?',
      options: [
        'Transparence, explicabilité, respect de la vie privée et contrôle humain final',
        'Garder tous les algorithmes secrets sans jamais rien expliquer',
        'Remplacer tous les enseignants par des boîtes automatiques',
        'Vendre les données des enfants aux publicitaires'
      ],
      correctAnswer: 'Transparence, explicabilité, respect de la vie privée et contrôle humain final',
      hint: 'L’IA doit rester un outil bienveillant au service de l’humanité, toujours guidé par des humains responsables.',
      explanation: 'Félicitations ! Tu as les réflexes d’un véritable ingénieur éthique en intelligence artificielle.'
    }
  },

  // --- 15 CREATIVE LAB PROJECTS ---
  {
    id: 'creative-1',
    title: 'Pixel Art : Mon Premier Robot',
    description: 'Dessine le visage de ton robot compagnon sur la grille 8x8.',
    category: 'creative',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 10,
    xpReward: 30,
    conceptLearned: 'Graphisme numérique et coordonnées matricielles',
    type: 'creative',
    data: {
      projectType: 'pixel-art',
      gridSize: 8,
      defaultColors: ['#0284C7', '#06B6D4', '#F97316', '#FBBF24', '#FFFFFF', '#0F172A'],
      prompt: 'Crée un robot avec des yeux lumineux et une antenne sur la tête !'
    }
  },
  {
    id: 'creative-2',
    title: 'Histoire Interactive : Mission sur Mars',
    description: 'Écris le premier chapitre d’une aventure spatiale où le lecteur choisit son chemin.',
    category: 'creative',
    level: 2,
    difficulty: 'easy',
    durationMinutes: 12,
    xpReward: 35,
    conceptLearned: 'Narration interactive et embranchements logiques',
    type: 'creative',
    data: {
      projectType: 'interactive-story',
      defaultTitle: 'Le Secret du Cratère Rouge',
      prompt: 'Écris la situation de départ et crée 2 choix pour le héros astronaute.'
    }
  },
  {
    id: 'creative-3',
    title: 'Générateur de Créature Spatiale',
    description: 'Assemble des pièces géométriques pour créer un extraterrestre rigolo.',
    category: 'creative',
    level: 4,
    difficulty: 'medium',
    durationMinutes: 15,
    xpReward: 40,
    conceptLearned: 'Composition d’éléments modulaires',
    type: 'creative',
    data: {
      projectType: 'character-builder',
      parts: ['antennes', 'yeux_multiples', 'tentacules', 'réacteurs']
    }
  },
  {
    id: 'creative-4',
    title: 'Le Studio Musical Algorithmique',
    description: 'Compose une mélodie en agençant des notes comme des briques de code.',
    category: 'creative',
    level: 6,
    difficulty: 'medium',
    durationMinutes: 15,
    xpReward: 45,
    conceptLearned: 'Fréquences sonores et rythmes programmés',
    type: 'creative',
    data: {
      projectType: 'music-maker',
      notes: ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']
    }
  },
  {
    id: 'creative-5',
    title: 'Animation : Le Décollage de la Fusée',
    description: 'Crée une animation image par image (stop-motion digital).',
    category: 'creative',
    level: 8,
    difficulty: 'medium',
    durationMinutes: 15,
    xpReward: 50,
    conceptLearned: 'Images par seconde (FPS) et interpolation',
    type: 'creative',
    data: {
      projectType: 'animation',
      framesCount: 4
    }
  },
  {
    id: 'creative-6',
    title: 'Créateur de Mini-Jeu : Attrape les Cristaux',
    description: 'Configure les règles d’un jeu d’esquive et de ramassage.',
    category: 'creative',
    level: 10,
    difficulty: 'hard',
    durationMinutes: 20,
    xpReward: 60,
    conceptLearned: 'Game Design : scores, vies et vitesse',
    type: 'creative',
    data: {
      projectType: 'game-designer'
    }
  },
  {
    id: 'creative-7',
    title: 'Bande Dessinée Numérique : Le Bug Mystère',
    description: 'Raconte en 3 vignettes l’histoire d’un robot qui découvre une erreur de calcul.',
    category: 'creative',
    level: 12,
    difficulty: 'hard',
    durationMinutes: 18,
    xpReward: 60,
    conceptLearned: 'Scénarisation et communication visuelle',
    type: 'creative',
    data: {
      projectType: 'comic-strip'
    }
  },
  {
    id: 'creative-8',
    title: 'Concepteur de Vaisseau Spatial Modulaire',
    description: 'Dessine le plan d’un vaisseau d’exploration avec ses propulseurs et ses boucliers.',
    category: 'creative',
    level: 14,
    difficulty: 'hard',
    durationMinutes: 20,
    xpReward: 65,
    conceptLearned: 'Dessin technique et ergonomie',
    type: 'creative',
    data: {
      projectType: 'spaceship-designer'
    }
  },
  {
    id: 'creative-9',
    title: 'Carte Galactique Personnalisée',
    description: 'Place des planètes, des astéroïdes et des trous de ver pour créer ton univers.',
    category: 'creative',
    level: 16,
    difficulty: 'hard',
    durationMinutes: 20,
    xpReward: 70,
    conceptLearned: 'Cartographie spatiale et échelle',
    type: 'creative',
    data: {
      projectType: 'galaxy-map'
    }
  },
  {
    id: 'creative-10',
    title: 'Le Générateur de Poèmes Algorithmiques',
    description: 'Assemble des rimes et des structures de phrases pour faire écrire ton robot.',
    category: 'creative',
    level: 18,
    difficulty: 'hard',
    durationMinutes: 15,
    xpReward: 70,
    conceptLearned: 'Génération procédurale de texte',
    type: 'creative',
    data: {
      projectType: 'poetry-generator'
    }
  },
  {
    id: 'creative-11',
    title: 'Simulateur d’Aquarium Numérique',
    description: 'Donne un comportement à chaque petit robot-poisson de l’aquarium.',
    category: 'creative',
    level: 20,
    difficulty: 'hard',
    durationMinutes: 20,
    xpReward: 75,
    conceptLearned: 'Systèmes multi-agents et intelligence en essaim',
    type: 'creative',
    data: {
      projectType: 'aquarium-sim'
    }
  },
  {
    id: 'creative-12',
    title: 'Conception de Carte de Vœux Interactive',
    description: 'Crée une carte animée avec boutons cliquables pour l’anniversaire d’un ami.',
    category: 'creative',
    level: 22,
    difficulty: 'hard',
    durationMinutes: 15,
    xpReward: 75,
    conceptLearned: 'Design d’interaction et événements utilisateurs',
    type: 'creative',
    data: {
      projectType: 'greeting-card'
    }
  },
  {
    id: 'creative-13',
    title: 'L’Usine de Robots : Générateur Aléatoire',
    description: 'Utilise le hasard (random) pour générer des millions de robots uniques.',
    category: 'creative',
    level: 25,
    difficulty: 'hard',
    durationMinutes: 20,
    xpReward: 80,
    conceptLearned: 'Génération procédurale et graines aléatoires (Seed)',
    type: 'creative',
    data: {
      projectType: 'procedural-factory'
    }
  },
  {
    id: 'creative-14',
    title: 'Échappée Virtuelle : L’Enigme dont tu es le Créateur',
    description: 'Construis ta propre énigme logique et teste-la sur tes parents !',
    category: 'creative',
    level: 28,
    difficulty: 'hard',
    durationMinutes: 25,
    xpReward: 85,
    conceptLearned: 'Conception d’énigmes et tests utilisateurs',
    type: 'creative',
    data: {
      projectType: 'riddle-maker'
    }
  },
  {
    id: 'creative-15',
    title: 'Défi PRO Créatif : Jeu Vidéo Complet "Mission Kepler"',
    description: 'Assemble graphismes, musique et règles pour finaliser un jeu jouable.',
    category: 'creative',
    level: 30,
    difficulty: 'hard',
    durationMinutes: 30,
    xpReward: 100,
    conceptLearned: 'Production complète d’un jeu numérique',
    type: 'creative',
    data: {
      projectType: 'full-game'
    }
  },

  // --- 15 DIGITAL CULTURE MODULES ---
  {
    id: 'digital-1',
    title: 'Comment Fonctionne Internet ?',
    description: 'Un incroyable réseau mondial de câbles sous-marins et de satellites.',
    category: 'digital',
    level: 0,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Infrastructure mondiale d’Internet et câbles sous-marins',
    type: 'quiz',
    data: {
      question: 'Par où passe la très grande majorité (plus de 95%) des données d’Internet qui traversent les océans ?',
      options: [
        'Par d’immenses câbles à fibre optique posés au fond des océans',
        'Uniquement par des pigeons voyageurs numériques',
        'Par les ondes de la radio FM',
        'Par magie dans les nuages du ciel'
      ],
      correctAnswer: 'Par d’immenses câbles à fibre optique posés au fond des océans',
      hint: 'Ces câbles sous-marins transportent la lumière à travers des milliers de kilomètres sous l’eau.',
      explanation: 'Plus de 500 câbles sous-marins relient les continents et permettent à la lumière d’acheminer les données en quelques millisecondes !'
    }
  },
  {
    id: 'digital-2',
    title: 'Clients et Serveurs : Le Restaurant du Web',
    description: 'Comprendre qui demande quoi sur le réseau.',
    category: 'digital',
    level: 1,
    difficulty: 'easy',
    durationMinutes: 5,
    xpReward: 15,
    conceptLearned: 'Architecture Client-Serveur',
    type: 'quiz',
    data: {
      question: 'Dans la métaphore du restaurant, qui est le "serveur" informatique ?',
      options: [
        'L’ordinateur distant qui stocke les pages et répond à ta commande en t’envoyant la page web',
        'Toi qui es assis devant ton écran',
        'Le câble électrique de la prise',
        'La souris d’ordinateur'
      ],
      correctAnswer: 'L’ordinateur distant qui stocke les pages et répond à ta commande en t’envoyant la page web',
      hint: 'Le client passe la commande (requête), et le serveur prépare et sert la réponse.',
      explanation: 'Ton navigateur est le client qui demande : "S’il te plaît, donne-moi la page de Smart Kids Lab !" et le serveur l’envoie.'
    }
  },
  {
    id: 'digital-3',
    title: 'Le Navigateur Web (Chrome, Firefox, Safari)',
    description: 'Comment ton écran traduit le code HTML en jolis dessins.',
    category: 'digital',
    level: 2,
    difficulty: 'easy',
    durationMinutes: 6,
    xpReward: 20,
    conceptLearned: 'Moteur de rendu navigateur (HTML, CSS, JS)',
    type: 'quiz',
    data: {
      question: 'Quel est le rôle principal d’un navigateur web ?',
      options: [
        'Lire le code (HTML, CSS, JavaScript) envoyé par le serveur et l’afficher sous forme de page interactive avec des boutons et des images',
        'Fabriquer les écrans en verre',
        'Recharger la batterie de la tablette',
        'Compter les touches du clavier'
      ],
      correctAnswer: 'Lire le code (HTML, CSS, JavaScript) envoyé par le serveur et l’afficher sous forme de page interactive avec des boutons et des images',
      hint: 'C’est un traducteur de code informatique vers un affichage visuel.',
      explanation: 'Le navigateur traduit les fichiers textes écrits par les développeurs en une magnifique interface graphique !'
    }
  },
  {
    id: 'digital-4',
    title: 'L’Art du Mot de Passe Inviolable',
    description: 'Deviens un maître de la sécurité pour protéger tes comptes de jeux.',
    category: 'digital',
    level: 3,
    difficulty: 'easy',
    durationMinutes: 6,
    xpReward: 20,
    conceptLearned: 'Robustesse des mots de passe et entropie',
    type: 'quiz',
    data: {
      question: 'Parmi ces 4 propositions, quel mot de passe est le plus sécurisé et impossible à deviner par un robot pirate ?',
      options: [
        '123456',
        'azerty',
        'Soleil!Fus3e_Bleu#2026',
        'motdepasse'
      ],
      correctAnswer: 'Soleil!Fus3e_Bleu#2026',
      hint: 'Un excellent mot de passe est long, mélange majuscules, minuscules, chiffres et caractères spéciaux.',
      explanation: 'Une phrase secrète longue avec des symboles prendrait des millions d’années à être craquée par un ordinateur !'
    }
  },
  {
    id: 'digital-5',
    title: 'La Cybersécurité et le Phishing (Hameçonnage)',
    description: 'Apprends à repérer les faux messages et les pièges en ligne.',
    category: 'digital',
    level: 4,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 25,
    conceptLearned: 'Attaques d’ingénierie sociale et signaux d’alerte',
    type: 'quiz',
    data: {
      question: 'Tu reçois un email disant : "URGENT ! Ton compte va être supprimé dans 10 minutes ! Clique vite ici et donne ton mot de passe !". Que dois-tu faire ?',
      options: [
        'Ne surtout pas cliquer et en parler immédiatement à un parent : c’est une arnaque par hameçonnage (phishing)',
        'Cliquer très vite et donner le mot de passe',
        'Renvoyer l’email à tous tes amis',
        'Éteindre la box Internet'
      ],
      correctAnswer: 'Ne surtout pas cliquer et en parler immédiatement à un parent : c’est une arnaque par hameçonnage (phishing)',
      hint: 'Les pirates utilisent la peur et l’urgence pour piéger les gens.',
      explanation: 'Aucun vrai service (Roblox, Google, école) ne te demandera jamais ton mot de passe par email urgent.'
    }
  },
  {
    id: 'digital-6',
    title: 'Le Cloud : Ce n’est pas un Nuage !',
    description: 'Où vont tes photos et tes sauvegardes de jeux vidéo ?',
    category: 'digital',
    level: 5,
    difficulty: 'medium',
    durationMinutes: 7,
    xpReward: 25,
    conceptLearned: 'Data Centers et stockage distant',
    type: 'quiz',
    data: {
      question: 'Quand on dit qu’une photo est sauvegardée "dans le Cloud", où se trouve-t-elle physiquement en réalité ?',
      options: [
        'Dans un centre de données (Data Center) plein de gros ordinateurs très sécurisés reliés à Internet',
        'Dans les vrais nuages avec la pluie',
        'Sur la lune',
        'Dans l’antenne de télévision'
      ],
      correctAnswer: 'Dans un centre de données (Data Center) plein de gros ordinateurs très sécurisés reliés à Internet',
      hint: 'Le "nuage" est juste une image métaphorique pour désigner des serveurs distants.',
      explanation: 'Des milliers de disques durs dans des pièces climatisées gardent tes données en sécurité 24h/24 !'
    }
  },
  {
    id: 'digital-7',
    title: 'Les Objets Connectés (IoT)',
    description: 'Montres intelligentes, ampoules et enceintes : comment ils se parlent.',
    category: 'digital',
    level: 6,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 30,
    conceptLearned: 'Internet des Objets (Internet of Things) et capteurs',
    type: 'quiz',
    data: {
      question: 'Comment une montre connectée sait-elle combien de pas tu as fait aujourd’hui ?',
      options: [
        'Grâce à un petit capteur interne (accéléromètre) qui mesure les mouvements et vibrations de ton poignet',
        'Elle devine au hasard',
        'Quelqu’un te regarde par la fenêtre',
        'Elle pèse ta chaussure'
      ],
      correctAnswer: 'Grâce à un petit capteur interne (accéléromètre) qui mesure les mouvements et vibrations de ton poignet',
      hint: 'L’accéléromètre mesure les accélérations selon trois axes (X, Y, Z).',
      explanation: 'Ce capteur convertit les mouvements physiques en données numériques analysées par la montre.'
    }
  },
  {
    id: 'digital-8',
    title: 'Algorithmes de Recommandation',
    description: 'Pourquoi les applications te proposent toujours de nouvelles vidéos.',
    category: 'digital',
    level: 7,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 30,
    conceptLearned: 'Profilage utilisateur et temps d’attention',
    type: 'quiz',
    data: {
      question: 'Quel est l’objectif principal des algorithmes de recommandation sur YouTube ou TikTok ?',
      options: [
        'Retenir ton attention le plus longtemps possible sur l’écran pour afficher des publicités',
        'T’aider à aller te coucher tôt',
        'Nettoyer la poussière de l’écran',
        'Économiser l’électricité'
      ],
      correctAnswer: 'Retenir ton attention le plus longtemps possible sur l’écran pour afficher des publicités',
      hint: 'C’est l’économie de l’attention. Plus tu regardes, plus l’application gagne de l’argent.',
      explanation: 'Comprendre ce mécanisme permet de garder le contrôle de son temps d’écran plutôt que de laisser l’algorithme décider !'
    }
  },
  {
    id: 'digital-9',
    title: 'Fake News : La Fabrique des Fausses Nouvelles',
    description: 'Développe ton esprit critique de détective numérique.',
    category: 'digital',
    level: 8,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 35,
    conceptLearned: 'Vérification des sources et fact-checking',
    type: 'quiz',
    data: {
      question: 'Tu vois une photo spectaculaire montrant un dinosaure vivant dans les rues de Paris. Quel réflexe avoir en premier ?',
      options: [
        'Vérifier la source, faire une recherche d’image inversée et regarder si de vrais journaux scientifiques réputés en parlent',
        'Partager tout de suite sur les réseaux en criant "ALERTE !"',
        'Fermer les volets de sa chambre',
        'Acheter une cage à dinosaure'
      ],
      correctAnswer: 'Vérifier la source, faire une recherche d’image inversée et regarder si de vrais journaux scientifiques réputés en parlent',
      hint: 'Aujourd’hui, les images créées par IA sont très réalistes ; il faut croiser les sources d’information.',
      explanation: 'Le Fact-Checking (vérification des faits) est le meilleur super-pouvoir du citoyen numérique !'
    }
  },
  {
    id: 'digital-10',
    title: 'L’Empreinte Écologique du Numérique',
    description: 'Envoyer un email ou streamer une vidéo consomme-t-il de l’énergie ?',
    category: 'digital',
    level: 9,
    difficulty: 'medium',
    durationMinutes: 8,
    xpReward: 35,
    conceptLearned: 'Green IT, consommation électrique et recyclage des métaux rares',
    type: 'quiz',
    data: {
      question: 'Quelle action simple permet de réduire l’empreinte écologique de ses activités numériques ?',
      options: [
        'Garder ses appareils le plus longtemps possible au lieu d’en changer chaque année et réparer plutôt que jeter',
        'Laisser toutes ses vidéos tourner en boucle en 4K toute la nuit',
        'Acheter 3 téléphones neufs par an',
        'Mettre de la terre sur son chargeur'
      ],
      correctAnswer: 'Garder ses appareils le plus longtemps possible au lieu d’en changer chaque année et réparer plutôt que jeter',
      hint: 'La fabrication des smartphones et des puces électroniques consomme énormément d’eau et de métaux rares.',
      explanation: 'Plus de 75% de la pollution numérique provient de la fabrication des appareils. Les préserver protège la planète !'
    }
  },
  {
    id: 'digital-11',
    title: 'L’Open Source et le Logiciel Libre',
    description: 'Partager le savoir avec toute l’humanité.',
    category: 'digital',
    level: 11,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 40,
    conceptLearned: 'Licences libres (MIT, GPL), Linux et collaboration mondiale',
    type: 'quiz',
    data: {
      question: 'Qu’est-ce qu’un logiciel "Open Source" comme Linux, Blender ou Firefox ?',
      options: [
        'Un logiciel dont le code source est rendu public et gratuit pour que tout le monde puisse l’étudier, l’améliorer et le partager',
        'Un logiciel qu’on ne peut ouvrir que les jours de pluie',
        'Un virus secret',
        'Un ordinateur sans clavier'
      ],
      correctAnswer: 'Un logiciel dont le code source est rendu public et gratuit pour que tout le monde puisse l’étudier, l’améliorer et le partager',
      hint: 'C’est une philosophie de partage et de collaboration ouverte entre programmeurs du monde entier.',
      explanation: 'Internet et la plupart des supercalculateurs du monde fonctionnent grâce à des logiciels Open Source !'
    }
  },
  {
    id: 'digital-12',
    title: 'Le Chiffrement de Bout en Bout',
    description: 'Pourquoi personne ne peut lire tes messages WhatsApp ou Signal en route.',
    category: 'digital',
    level: 13,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 45,
    conceptLearned: 'Cryptographie asymétrique (clés publique et privée)',
    type: 'quiz',
    data: {
      question: 'Que signifie le "chiffrement de bout en bout" dans une messagerie sécurisée ?',
      options: [
        'Le message est verrouillé sur ton téléphone et ne peut être déverrouillé que par le téléphone de ton correspondant, même l’entreprise ne peut pas le lire',
        'Le message est envoyé en morceaux de papier par la poste',
        'Le texte s’écrit de droite à gauche',
        'Le téléphone s’éteint à chaque envoi'
      ],
      correctAnswer: 'Le message est verrouillé sur ton téléphone et ne peut être déverrouillé que par le téléphone de ton correspondant, même l’entreprise ne peut pas le lire',
      hint: 'Seul le destinataire possède la clé mathématique privée pour ouvrir le cadenas.',
      explanation: 'C’est grâce aux mathématiques de la cryptographie que notre vie privée est protégée sur Internet !'
    }
  },
  {
    id: 'digital-13',
    title: 'La Bulle de Filtres (Filter Bubble)',
    description: 'Quand Internet ne te montre que ce avec quoi tu es déjà d’accord.',
    category: 'digital',
    level: 15,
    difficulty: 'hard',
    durationMinutes: 10,
    xpReward: 50,
    conceptLearned: 'Biais de confirmation et personnalisation algorithmique',
    type: 'quiz',
    data: {
      question: 'Pourquoi deux personnes qui tapent exactement la même recherche sur un moteur de recherche peuvent-elles obtenir des résultats différents ?',
      options: [
        'Parce que le moteur personnalise les résultats en fonction de l’historique, du pays et des préférences passées de chaque personne',
        'Parce que l’ordinateur tire à pile ou face',
        'Parce que le soleil bouge dans le ciel',
        'C’est un bug qui n’arrive jamais'
      ],
      correctAnswer: 'Parce que le moteur personnalise les résultats en fonction de l’historique, du pays et des préférences passées de chaque personne',
      hint: 'Cette personnalisation enferme parfois les internautes dans une "bulle" d’opinions similaires.',
      explanation: 'Pour rester curieux et ouvert, il est important d’aller chercher des points de vue variés et différents !'
    }
  },
  {
    id: 'digital-14',
    title: 'Droit à l’Image et Droit à l’Oubli',
    description: 'Tes droits légaux sur ce qui est publié à propos de toi.',
    category: 'digital',
    level: 18,
    difficulty: 'hard',
    durationMinutes: 9,
    xpReward: 55,
    conceptLearned: 'Législation numérique (RGPD, droit à l’oubli)',
    type: 'quiz',
    data: {
      question: 'Un ami publie une photo embarrassante de toi en ligne sans ton accord. Que dit la loi ?',
      options: [
        'Tu as le droit de lui demander de la retirer immédiatement, car chacun est propriétaire de son droit à l’image',
        'Tu dois attendre 10 ans',
        'C’est sur Internet donc c’est trop tard pour toujours',
        'Tu dois payer une amende'
      ],
      correctAnswer: 'Tu as le droit de lui demander de la retirer immédiatement, car chacun est propriétaire de son droit à l’image',
      hint: 'Le consentement est obligatoire avant de publier la photo de quelqu’un d’autre.',
      explanation: 'Le respect d’autrui s’applique dans la vraie vie comme dans le monde numérique.'
    }
  },
  {
    id: 'digital-15',
    title: 'Défi PRO Culture : Le Citoyen Numérique d’Élite',
    description: 'Prouve que tu es prêt à naviguer dans le cyberespace avec sagesse et maîtrise.',
    category: 'digital',
    level: 22,
    difficulty: 'hard',
    durationMinutes: 12,
    xpReward: 70,
    conceptLearned: 'Bilan complet de citoyenneté numérique responsable',
    type: 'quiz',
    data: {
      question: 'Qu’est-ce qui caractérise un véritable citoyen numérique éclairé ?',
      options: [
        'Il protège ses données privées, vérifie les sources d’information, respecte les autres en ligne et garde le contrôle de son temps d’écran',
        'Il croit tout ce qu’il lit sur les réseaux sans réfléchir',
        'Il pirate les comptes de ses camarades de classe',
        'Il passe 18h par jour sans jamais sortir dehors'
      ],
      correctAnswer: 'Il protège ses données privées, vérifie les sources d’information, respecte les autres en ligne et garde le contrôle de son temps d’écran',
      hint: 'La technologie est un fabuleux outil quand nous en sommes les maîtres et non les esclaves.',
      explanation: 'Bravo ! Tu as validé toutes les compétences pour explorer le monde numérique avec intelligence, créativité et sécurité !'
    }
  }
];

export const INITIAL_BADGES = [
  {
    id: 'badge-first-step',
    code: 'first_step',
    title: 'Premier Pas',
    description: 'Termine ta toute première activité sur Smart Kids Lab.',
    icon: '🌱',
    category: 'general',
    xpBonus: 50,
    criteria: '1 activité terminée'
  },
  {
    id: 'badge-logic-thinker',
    code: 'logic_10',
    title: 'Petit Penseur',
    description: 'Résous 10 défis de logique avec succès.',
    icon: '🧠',
    category: 'logic',
    xpBonus: 100,
    criteria: '10 activités de logique réussies'
  },
  {
    id: 'badge-first-program',
    code: 'first_code',
    title: 'Premier Programme',
    description: 'Assemble tes premiers blocs de code et guide le robot vers la cible.',
    icon: '💻',
    category: 'code',
    xpBonus: 75,
    criteria: '1 activité de code terminée'
  },
  {
    id: 'badge-ai-explorer',
    code: 'ai_5',
    title: 'AI Explorer',
    description: 'Termine 5 expériences interactives d’intelligence artificielle.',
    icon: '🤖',
    category: 'ai',
    xpBonus: 120,
    criteria: '5 activités d’IA terminées'
  },
  {
    id: 'badge-streak-7',
    code: 'streak_7',
    title: 'Série de Feu (7 Jours)',
    description: 'Connecte-toi et apprends 7 jours d’affilée sans interruption !',
    icon: '🔥',
    category: 'general',
    xpBonus: 200,
    criteria: 'Série continue de 7 jours'
  },
  {
    id: 'badge-creator',
    code: 'first_project',
    title: 'Créateur Inspiré',
    description: 'Crée et enregistre ton tout premier projet dans le Creative Lab.',
    icon: '🚀',
    category: 'creative',
    xpBonus: 150,
    criteria: '1 projet créatif sauvegardé'
  },
  {
    id: 'badge-cyber-guardian',
    code: 'digital_5',
    title: 'Gardien du Web',
    description: 'Termine 5 modules de culture numérique et cybersécurité.',
    icon: '🛡️',
    category: 'digital',
    xpBonus: 100,
    criteria: '5 modules culture numérique terminés'
  },
  {
    id: 'badge-logic-master',
    code: 'logic_master',
    title: 'Maître de la Logique',
    description: 'Triomphe de 25 défis de logique avancés.',
    icon: '🏆',
    category: 'logic',
    xpBonus: 300,
    criteria: '25 activités de logique réussies'
  },
  {
    id: 'badge-polymath',
    code: 'all_domains',
    title: 'L’Explorateur Total',
    description: 'Termine au moins 3 activités dans chacun des 5 domaines.',
    icon: '⭐',
    category: 'general',
    xpBonus: 250,
    criteria: '3 activités réussies par domaine'
  },
  {
    id: 'badge-pro',
    code: 'pro_rank',
    title: 'Légende PRO',
    description: 'Atteins le prestigieux rang de Maître PRO.',
    icon: '👑',
    category: 'general',
    xpBonus: 500,
    criteria: 'Atteindre le rang PRO'
  }
];

export const INITIAL_DAILY_MISSIONS = [
  {
    id: 'mission-1',
    title: 'L’Éveil du Penseur',
    description: 'Résous 2 défis de logique aujourd’hui.',
    category: 'logic',
    targetCount: 2,
    currentCount: 0,
    xpReward: 30,
    completed: false,
    type: 'daily'
  },
  {
    id: 'mission-2',
    title: 'Code Kids en Action',
    description: 'Termine au moins 1 mission de programmation de robot.',
    category: 'code',
    targetCount: 1,
    currentCount: 0,
    xpReward: 50,
    completed: false,
    type: 'daily'
  },
  {
    id: 'mission-3',
    title: 'Curiosité Numérique',
    description: 'Découvre un module de culture numérique ou d’intelligence artificielle.',
    category: 'ai',
    targetCount: 1,
    currentCount: 0,
    xpReward: 35,
    completed: false,
    type: 'daily'
  },
  {
    id: 'mission-weekly-1',
    title: 'Grand Défi Hebdomadaire',
    description: 'Termine 7 activités toutes catégories confondues cette semaine.',
    category: 'general',
    targetCount: 7,
    currentCount: 0,
    xpReward: 150,
    completed: false,
    type: 'weekly'
  }
];
