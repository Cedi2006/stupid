// LinkedOut - Mock Data for React Application

// Interface définie dans mockData.ts mais sans les types:
// User, Skill, UserBadge, Post, Job, Badge, Comment, ConnectionRequest

// Sample users data
export const SAMPLE_USERS = [
  {
    id: 'user_1',
    name: 'Jean Glandeur',
    email: 'test@linkedout.com',
    password: 'password123',
    title: 'Expert en procrastination avancée',
    unemploymentStart: '2023-01-15',
    avatar: '',
    skills: [
      { name: 'Netflix Expert', endorsements: 47 },
      { name: 'Maître du scroll infini', endorsements: 32 },
      { name: 'Champion de sieste', endorsements: 28 },
      { name: 'Procrastination professionnelle', endorsements: 41 },
      { name: 'Évitement d\'entretiens', endorsements: 19 }
    ],
    connections: ['user_2', 'user_3', 'user_4'],
    badges: [
      { id: 'unemployed_100', earned: true, earnedDate: '2023-04-25' },
      { id: 'netflix_master', earned: true, earnedDate: '2023-02-10' },
      { id: 'no_interview', earned: true, earnedDate: '2023-03-01' }
    ],
    bio: 'Expert en glandouille professionnelle depuis plus de 10 ans. Spécialiste du canapé et des excuses créatives pour éviter le travail.',
    failures: [
      'A raté un entretien car "trop occupé à regarder la dernière saison de Stranger Things"',
      'A dormi pendant une visioconférence avec un recruteur'
    ]
  },
  {
    id: 'user_2',
    name: 'Sophie Flemme',
    email: 'sophie@linkedout.com',
    password: 'password123',
    title: 'Consultante en repos stratégique',
    unemploymentStart: '2022-11-03',
    avatar: '',
    skills: [
      { name: 'Sommeil productif', endorsements: 28 },
      { name: 'Création d\'excuses', endorsements: 35 },
      { name: 'Évitement de CV', endorsements: 41 }
    ],
    connections: ['user_1', 'user_3'],
    badges: [
      { id: 'unemployed_100', earned: true, earnedDate: '2023-02-12' }
    ],
    bio: 'Experte en techniques avancées d\'évitement de travail. Je transforme la procrastination en art de vivre.',
    failures: [
      'A prétendu avoir un problème de connexion pendant un entretien difficile'
    ]
  },
  {
    id: 'user_3',
    name: 'Marc Tranquille',
    email: 'marc@linkedout.com',
    password: 'password123',
    title: 'Spécialiste en pauses prolongées',
    unemploymentStart: '2022-09-20',
    avatar: '',
    skills: [
      { name: 'Jeux vidéo professionnel', endorsements: 51 },
      { name: 'Repos thérapeutique', endorsements: 26 },
      { name: 'Optimisation de temps libre', endorsements: 33 }
    ],
    connections: ['user_1', 'user_2', 'user_4'],
    badges: [
      { id: 'unemployed_100', earned: true, earnedDate: '2022-12-29' },
      { id: 'netflix_master', earned: true, earnedDate: '2023-01-15' }
    ],
    bio: 'Ancien travailleur reconverti dans l\'art du farniente. Champion national de sieste 2022.',
    failures: [
      'A oublié d\'envoyer un CV car "trop occupé à battre son record sur FIFA"'
    ]
  },
  {
    id: 'user_4',
    name: 'Émilie Paisible',
    email: 'emilie@linkedout.com',
    password: 'password123',
    title: 'Artiste du rien-faire',
    unemploymentStart: '2023-02-28',
    avatar: '',
    skills: [
      { name: 'Méditation sur canapé', endorsements: 23 },
      { name: 'Bingewatching expert', endorsements: 39 },
      { name: 'Sommeil créatif', endorsements: 17 }
    ],
    connections: ['user_1', 'user_3'],
    badges: [],
    bio: 'Je cultive l\'art de vivre sans stress ni travail. Adepte du slow life et du maximum de repos.',
    failures: [
      'A refusé un emploi car "trop loin de son canapé"'
    ]
  }
];

// Sample posts data
export const SAMPLE_POSTS = [
  {
    id: 'post_1',
    userId: 'user_1',
    content: '🏆 Nouveau record personnel ! 14 heures de Netflix sans interruption. Le chômage a du bon ! #fier #accomplissement',
    timestamp: '2023-05-15T10:30:00Z',
    likes: 25,
    comments: 7,
    likedBy: ['user_2', 'user_3']
  },
  {
    id: 'post_2',
    userId: 'user_2',
    content: 'Je viens de refuser un entretien d\'embauche parce que "c\'est trop loin de chez moi" (1,5km). Quelqu\'un a-t-il fait mieux ? 😅 #expertise #flemme',
    timestamp: '2023-05-14T14:45:00Z',
    likes: 42,
    comments: 12,
    likedBy: ['user_1', 'user_3', 'user_4']
  },
  {
    id: 'post_3',
    userId: 'user_3',
    content: '🤦‍♂️ Échec du jour : J\'ai raté mon rendez-vous Pôle Emploi car j\'ai oublié de mettre un réveil. C\'est la 3ème fois ce mois-ci ! #pro #glandeur',
    timestamp: '2023-05-12T09:15:00Z',
    likes: 18,
    comments: 5,
    likedBy: ['user_1']
  },
  {
    id: 'post_4',
    userId: 'user_4',
    content: '💡 Astuce pour optimiser son chômage : Créez un document Word avec des offres d\'emploi fictives pour montrer à votre famille que vous "cherchez activement". #conseils #astuces',
    timestamp: '2023-05-10T16:20:00Z',
    likes: 36,
    comments: 9,
    likedBy: ['user_1', 'user_2']
  },
  {
    id: 'post_5',
    userId: 'user_1',
    content: 'Je viens de recevoir ma médaille de "1 an sans emploi" ! Tellement fier de cette non-réussite. Merci à tous ceux qui m\'ont soutenu dans cette absence d\'effort. #chômageversaire',
    timestamp: '2023-05-08T11:45:00Z',
    likes: 29,
    comments: 8,
    likedBy: ['user_2', 'user_3', 'user_4']
  },
  {
    id: 'post_6',
    userId: 'user_2',
    content: '🏆 Exploit : J\'ai réussi à reporter ma recherche d\'emploi pour le 17ème jour consécutif. #détermination #persévérance',
    timestamp: '2023-05-05T13:10:00Z',
    likes: 31,
    comments: 6,
    likedBy: ['user_1', 'user_4']
  },
  {
    id: 'post_7',
    userId: 'user_3',
    content: 'Question sérieuse : Comment expliquer un trou de 3 ans dans son CV ? Je pensais dire que j\'étais en "développement personnel intensif" 🤔 #conseils #brainstorming',
    timestamp: '2023-05-03T09:30:00Z',
    likes: 47,
    comments: 15,
    likedBy: ['user_1', 'user_2', 'user_4']
  },
  {
    id: 'post_8',
    userId: 'user_4',
    content: '🤦‍♂️ Moment gênant quand mon ancien camarade de classe m\'a demandé où je travaillais et que j\'ai répondu "je suis en transition professionnelle" pour la 5ème année consécutive.',
    timestamp: '2023-05-01T15:25:00Z',
    likes: 33,
    comments: 11,
    likedBy: ['user_1', 'user_3']
  }
];

// Sample jobs data
export const SAMPLE_JOBS = [
  {
    id: 'job_1',
    title: 'Expert en Sieste Professionnelle',
    company: 'ProcrastiCorp',
    location: 'Paris, France',
    salary: '25K€ - 30K€',
    type: 'Temps partiel (très partiel)',
    description: 'Nous recherchons un expert capable de démontrer les bienfaits de la sieste en milieu professionnel. Le candidat idéal pourra dormir dans n\'importe quelle condition et justifier cette activité comme "brainstorming horizontal".',
    requirements: [
      'Expérience minimale de 5 ans en repos stratégique',
      'Capacité à s\'endormir en moins de 3 minutes',
      'Connaissance approfondie des positions de sieste optimales',
      'Créativité dans la justification de périodes d\'inactivité'
    ],
    tags: ['Sieste', 'Repos', 'Bien-être', 'Travail minimal'],
    posted: '2023-05-10',
    applications: 142,
    applicants: 120
  },
  {
    id: 'job_2',
    title: 'Consultant en Évitement de Réunions',
    company: 'Flemme & Associés',
    location: 'Lyon, France',
    salary: '30K€ - 35K€',
    type: 'Télétravail (ou absence-travail)',
    description: 'Vous excellez dans l\'art d\'éviter les responsabilités ? Vous savez créer des excuses créatives à la dernière minute ? Ce poste est fait pour vous ! Nous cherchons un spécialiste capable d\'enseigner aux autres comment éviter efficacement toute forme de travail productif.',
    requirements: [
      'Maîtrise des techniques d\'esquive de responsabilités',
      'Créativité en génération d\'excuses',
      'Capacité à paraître occupé sans rien faire',
      'Talent pour reprogrammer indéfiniment les deadlines'
    ],
    tags: ['Évitement', 'Procrastination', 'Excuses', 'Non-productivité'],
    posted: '2023-05-08',
    applications: 89,
    applicants: 85
  },
  {
    id: 'job_3',
    title: 'Testeur de Canapés Senior',
    company: 'ComfortMax',
    location: 'Bordeaux, France',
    salary: '28K€ - 32K€',
    type: 'Sur site (canapé)',
    description: 'Votre mission : tester des canapés, fauteuils et surfaces horizontales pour évaluer leur confort pendant de longues périodes d\'inactivité. Le candidat idéal doit pouvoir rester immobile pendant des heures tout en conservant un air professionnel.',
    requirements: [
      'Expérience significative en position allongée',
      'Capacité à distinguer différents niveaux de confort',
      'Résistance à l\'activité physique',
      'Connaissance des séries Netflix pour les tests de longue durée'
    ],
    tags: ['Confort', 'Détente', 'Mobilier', 'Tests'],
    posted: '2023-05-05',
    applications: 211,
    applicants: 180
  },
  {
    id: 'job_4',
    title: 'Spécialiste en Création d\'Excuses',
    company: 'AlibiTech',
    location: 'Toulouse, France',
    salary: 'À négocier (mais sans effort)',
    type: 'Flexible (très flexible)',
    description: 'Nous recherchons un talent créatif capable de générer des excuses innovantes et crédibles pour justifier l\'absence de résultats, le non-respect des délais ou l\'évitement de responsabilités.',
    requirements: [
      'Imagination débordante',
      'Capacité à inventer des situations improbables mais plausibles',
      'Expérience en improvisation',
      'Visage impassible lors de mensonges évidents'
    ],
    tags: ['Créativité', 'Communication', 'Improvisation', 'Storytelling'],
    posted: '2023-05-01',
    applications: 76,
    applicants: 65
  },
  {
    id: 'job_5',
    title: 'Bingewatcher Professionnel',
    company: 'StreamView Analytics',
    location: 'Nantes, France',
    salary: '26K€ - 29K€ (+ abonnements streaming)',
    type: 'Télétravail (canapé requis)',
    description: 'Vous regardez déjà toutes les séries disponibles sur les plateformes de streaming ? Transformez cette passion en métier ! Nous recherchons des experts capables de consommer une saison entière en une journée et d\'en tirer des analyses pertinentes.',
    requirements: [
      'Capacité à rester éveillé pendant 12+ heures de visionnage',
      'Expérience préalable en marathon de séries',
      'Connaissance approfondie des plateformes de streaming',
      'Résistance aux spoilers'
    ],
    tags: ['Streaming', 'Séries', 'Analyse', 'Divertissement'],
    posted: '2023-04-28',
    applications: 342,
    applicants: 250
  }
];

// Badge definitions
export const BADGE_DEFINITIONS = [
  {
    id: 'unemployed_100',
    label: 'Chômeur Centenaire',
    description: '100 jours consécutifs sans emploi',
    requirement: 'Atteindre 100 jours de chômage'
  },
  {
    id: 'netflix_master',
    label: 'Maître Netflix',
    description: 'A regardé plus de 500 heures de contenu',
    requirement: 'Déclarer 500 heures de visionnage'
  },
  {
    id: 'no_interview',
    label: 'Éviteur d\'Entretiens',
    description: 'A annulé 10 entretiens d\'embauche',
    requirement: 'Annuler 10 entretiens'
  },
  {
    id: 'excuse_king',
    label: 'Roi des Excuses',
    description: 'A utilisé 20 excuses différentes pour éviter de chercher un emploi',
    requirement: 'Enregistrer 20 excuses uniques'
  },
  {
    id: 'couch_potato',
    label: 'Expert du Canapé',
    description: 'A passé 1000 heures sur son canapé',
    requirement: 'Enregistrer 1000 heures de temps de canapé'
  }
];
