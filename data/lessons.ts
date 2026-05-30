import type { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // ─────────────────────────────────────────
  // SPANISH — Unit 1: Basics 1
  // ─────────────────────────────────────────
  {
    id: "es-u1-l1",
    unitId: "es-u1",
    languageId: "es",
    title: "Greetings",
    description: "Learn how to say hello, goodbye, and ask how someone is doing.",
    order: 1,
    xpReward: 10,
    goals: [
      "Say hello and goodbye in Spanish",
      "Ask someone how they are",
      "Respond to basic greetings",
    ],
    aiTeacherPrompt:
      "You are a friendly and encouraging Spanish teacher for beginners. Teach the student basic Spanish greetings such as 'hola', 'adiós', '¿cómo estás?', and 'bien, gracias'. Use simple examples, repeat key words, and praise the student's efforts.",
    activities: [
      {
        id: "es-u1-l1-a1",
        type: "vocabulary",
        title: "Greeting Words",
        vocabulary: [
          { word: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { word: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOHS" },
          { word: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nohs DEE-ahs" },
          { word: "Buenas noches", translation: "Good night", pronunciation: "BWEH-nahs NOH-chehs" },
        ],
      },
      {
        id: "es-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          { phrase: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-moh ehs-TAHS" },
          { phrase: "Estoy bien, gracias.", translation: "I am fine, thank you.", pronunciation: "ehs-TOY byehn, GRAH-syahs" },
          { phrase: "Mucho gusto.", translation: "Nice to meet you.", pronunciation: "MOO-choh GOOS-toh" },
        ],
      },
    ],
  },
  {
    id: "es-u1-l2",
    unitId: "es-u1",
    languageId: "es",
    title: "Introductions",
    description: "Learn to introduce yourself and ask someone's name.",
    order: 2,
    xpReward: 10,
    goals: [
      "Say your name in Spanish",
      "Ask someone for their name",
      "Tell someone where you are from",
    ],
    aiTeacherPrompt:
      "You are a friendly Spanish teacher. Help the beginner student practice self-introductions: 'me llamo', '¿cómo te llamas?', and 'soy de'. Keep explanations short and use role-play to make it interactive.",
    activities: [
      {
        id: "es-u1-l2-a1",
        type: "vocabulary",
        title: "Introduction Words",
        vocabulary: [
          { word: "Nombre", translation: "Name", pronunciation: "NOHM-breh" },
          { word: "País", translation: "Country", pronunciation: "pah-EES" },
          { word: "Ciudad", translation: "City", pronunciation: "syoo-DAHD" },
          { word: "Soy", translation: "I am", pronunciation: "SOY" },
        ],
      },
      {
        id: "es-u1-l2-a2",
        type: "phrase",
        title: "Introducing Yourself",
        phrases: [
          { phrase: "Me llamo Ana.", translation: "My name is Ana.", pronunciation: "meh YAH-moh AH-nah" },
          { phrase: "¿Cómo te llamas?", translation: "What is your name?", pronunciation: "KOH-moh teh YAH-mahs" },
          { phrase: "Soy de España.", translation: "I am from Spain.", pronunciation: "SOY deh ehs-PAH-nyah" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // SPANISH — Unit 2: Basics 2
  // ─────────────────────────────────────────
  {
    id: "es-u2-l1",
    unitId: "es-u2",
    languageId: "es",
    title: "Numbers 1–10",
    description: "Count from one to ten in Spanish.",
    order: 1,
    xpReward: 10,
    goals: [
      "Count from 1 to 10 in Spanish",
      "Use numbers in simple sentences",
    ],
    aiTeacherPrompt:
      "You are a cheerful Spanish teacher. Teach numbers 1 to 10 in Spanish using repetition and simple counting games. Encourage the student to count objects around them.",
    activities: [
      {
        id: "es-u2-l1-a1",
        type: "vocabulary",
        title: "Numbers 1–10",
        vocabulary: [
          { word: "Uno", translation: "One", pronunciation: "OO-noh" },
          { word: "Dos", translation: "Two", pronunciation: "DOHS" },
          { word: "Tres", translation: "Three", pronunciation: "TREHS" },
          { word: "Cuatro", translation: "Four", pronunciation: "KWAH-troh" },
          { word: "Cinco", translation: "Five", pronunciation: "SEEN-koh" },
          { word: "Seis", translation: "Six", pronunciation: "SAYS" },
          { word: "Siete", translation: "Seven", pronunciation: "SYEH-teh" },
          { word: "Ocho", translation: "Eight", pronunciation: "OH-choh" },
          { word: "Nueve", translation: "Nine", pronunciation: "NWEH-beh" },
          { word: "Diez", translation: "Ten", pronunciation: "DYEHS" },
        ],
      },
      {
        id: "es-u2-l1-a2",
        type: "phrase",
        title: "Using Numbers",
        phrases: [
          { phrase: "Tengo dos hermanos.", translation: "I have two siblings.", pronunciation: "TEHN-goh dohs ehr-MAH-nohs" },
          { phrase: "Son cinco personas.", translation: "There are five people.", pronunciation: "SOHN SEEN-koh pehr-SOH-nahs" },
        ],
      },
    ],
  },
  {
    id: "es-u2-l2",
    unitId: "es-u2",
    languageId: "es",
    title: "Colors",
    description: "Learn the basic colors in Spanish.",
    order: 2,
    xpReward: 10,
    goals: [
      "Name common colors in Spanish",
      "Describe objects using colors",
    ],
    aiTeacherPrompt:
      "You are a fun Spanish teacher. Teach basic colors in Spanish using visual descriptions. Ask the student to name the color of objects they can see around them.",
    activities: [
      {
        id: "es-u2-l2-a1",
        type: "vocabulary",
        title: "Basic Colors",
        vocabulary: [
          { word: "Rojo", translation: "Red", pronunciation: "ROH-hoh" },
          { word: "Azul", translation: "Blue", pronunciation: "ah-SOOL" },
          { word: "Verde", translation: "Green", pronunciation: "BEHR-deh" },
          { word: "Amarillo", translation: "Yellow", pronunciation: "ah-mah-REE-yoh" },
          { word: "Blanco", translation: "White", pronunciation: "BLAHN-koh" },
          { word: "Negro", translation: "Black", pronunciation: "NEH-groh" },
        ],
      },
      {
        id: "es-u2-l2-a2",
        type: "phrase",
        title: "Describing with Colors",
        phrases: [
          { phrase: "El cielo es azul.", translation: "The sky is blue.", pronunciation: "ehl SYEH-loh ehs ah-SOOL" },
          { phrase: "La manzana es roja.", translation: "The apple is red.", pronunciation: "lah mahn-SAH-nah ehs ROH-hah" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // FRENCH — Unit 1: Basics 1
  // ─────────────────────────────────────────
  {
    id: "fr-u1-l1",
    unitId: "fr-u1",
    languageId: "fr",
    title: "Greetings",
    description: "Learn how to greet people and say goodbye in French.",
    order: 1,
    xpReward: 10,
    goals: [
      "Say hello and goodbye in French",
      "Ask someone how they are",
    ],
    aiTeacherPrompt:
      "You are a warm and patient French teacher for beginners. Teach basic French greetings like 'bonjour', 'au revoir', 'comment ça va?'. Speak slowly and clearly, and use encouragement throughout.",
    activities: [
      {
        id: "fr-u1-l1-a1",
        type: "vocabulary",
        title: "Greeting Words",
        vocabulary: [
          { word: "Bonjour", translation: "Hello / Good morning", pronunciation: "bohn-ZHOOR" },
          { word: "Bonsoir", translation: "Good evening", pronunciation: "bohn-SWAHR" },
          { word: "Au revoir", translation: "Goodbye", pronunciation: "oh ruh-VWAHR" },
          { word: "Bonne nuit", translation: "Good night", pronunciation: "bohn NWEE" },
        ],
      },
      {
        id: "fr-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          { phrase: "Comment ça va?", translation: "How are you?", pronunciation: "koh-MAHN sah VAH" },
          { phrase: "Ça va bien, merci.", translation: "I am fine, thank you.", pronunciation: "sah vah BYAHN, mehr-SEE" },
          { phrase: "Enchanté(e).", translation: "Nice to meet you.", pronunciation: "ahn-shahn-TAY" },
        ],
      },
    ],
  },
  {
    id: "fr-u1-l2",
    unitId: "fr-u1",
    languageId: "fr",
    title: "Introductions",
    description: "Introduce yourself and learn to ask someone's name.",
    order: 2,
    xpReward: 10,
    goals: [
      "Say your name in French",
      "Ask someone for their name",
      "Say where you are from",
    ],
    aiTeacherPrompt:
      "You are a friendly French teacher. Help the student practice introductions using 'je m'appelle', 'comment vous appelez-vous?', and 'je suis de'. Keep it conversational and fun.",
    activities: [
      {
        id: "fr-u1-l2-a1",
        type: "vocabulary",
        title: "Introduction Words",
        vocabulary: [
          { word: "Nom", translation: "Name", pronunciation: "NOHN" },
          { word: "Pays", translation: "Country", pronunciation: "pay-EE" },
          { word: "Ville", translation: "City", pronunciation: "VEEL" },
          { word: "Je suis", translation: "I am", pronunciation: "zhuh SWEE" },
        ],
      },
      {
        id: "fr-u1-l2-a2",
        type: "phrase",
        title: "Introducing Yourself",
        phrases: [
          { phrase: "Je m'appelle Marie.", translation: "My name is Marie.", pronunciation: "zhuh mah-PEHL mah-REE" },
          { phrase: "Comment vous appelez-vous?", translation: "What is your name?", pronunciation: "koh-MAHN voo zah-play-VAY voo" },
          { phrase: "Je suis de France.", translation: "I am from France.", pronunciation: "zhuh SWEE duh FRAHNS" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // FRENCH — Unit 2: Basics 2
  // ─────────────────────────────────────────
  {
    id: "fr-u2-l1",
    unitId: "fr-u2",
    languageId: "fr",
    title: "Numbers 1–10",
    description: "Count from one to ten in French.",
    order: 1,
    xpReward: 10,
    goals: ["Count from 1 to 10 in French"],
    aiTeacherPrompt:
      "You are a cheerful French teacher. Teach numbers 1 to 10 in French with fun repetition. Encourage the student to count everyday objects.",
    activities: [
      {
        id: "fr-u2-l1-a1",
        type: "vocabulary",
        title: "Numbers 1–10",
        vocabulary: [
          { word: "Un", translation: "One", pronunciation: "UHN" },
          { word: "Deux", translation: "Two", pronunciation: "DUH" },
          { word: "Trois", translation: "Three", pronunciation: "TWAH" },
          { word: "Quatre", translation: "Four", pronunciation: "KAH-truh" },
          { word: "Cinq", translation: "Five", pronunciation: "SANK" },
          { word: "Six", translation: "Six", pronunciation: "SEES" },
          { word: "Sept", translation: "Seven", pronunciation: "SEHT" },
          { word: "Huit", translation: "Eight", pronunciation: "WEET" },
          { word: "Neuf", translation: "Nine", pronunciation: "NUF" },
          { word: "Dix", translation: "Ten", pronunciation: "DEES" },
        ],
      },
    ],
  },
  {
    id: "fr-u2-l2",
    unitId: "fr-u2",
    languageId: "fr",
    title: "Colors",
    description: "Learn the basic colors in French.",
    order: 2,
    xpReward: 10,
    goals: ["Name common colors in French", "Describe objects using colors"],
    aiTeacherPrompt:
      "You are a fun French teacher. Teach basic colors in French using visual associations. Ask the student to describe the color of things around them.",
    activities: [
      {
        id: "fr-u2-l2-a1",
        type: "vocabulary",
        title: "Basic Colors",
        vocabulary: [
          { word: "Rouge", translation: "Red", pronunciation: "ROOZH" },
          { word: "Bleu", translation: "Blue", pronunciation: "BLUH" },
          { word: "Vert", translation: "Green", pronunciation: "VEHR" },
          { word: "Jaune", translation: "Yellow", pronunciation: "ZHOHN" },
          { word: "Blanc", translation: "White", pronunciation: "BLAHN" },
          { word: "Noir", translation: "Black", pronunciation: "NWAHR" },
        ],
      },
      {
        id: "fr-u2-l2-a2",
        type: "phrase",
        title: "Describing with Colors",
        phrases: [
          { phrase: "Le ciel est bleu.", translation: "The sky is blue.", pronunciation: "luh SYEHL eh BLUH" },
          { phrase: "La pomme est rouge.", translation: "The apple is red.", pronunciation: "lah POHM eh ROOZH" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // JAPANESE — Unit 1: Basics 1
  // ─────────────────────────────────────────
  {
    id: "ja-u1-l1",
    unitId: "ja-u1",
    languageId: "ja",
    title: "Greetings",
    description: "Learn essential Japanese greetings for different times of day.",
    order: 1,
    xpReward: 10,
    goals: [
      "Say hello and goodbye in Japanese",
      "Greet people at different times of day",
    ],
    aiTeacherPrompt:
      "You are a calm and encouraging Japanese teacher for beginners. Teach basic Japanese greetings such as 'konnichiwa', 'sayōnara', 'ohayō gozaimasu', and 'arigatō'. Use romaji alongside Japanese script to help beginners.",
    activities: [
      {
        id: "ja-u1-l1-a1",
        type: "vocabulary",
        title: "Greeting Words",
        vocabulary: [
          { word: "こんにちは", translation: "Hello", pronunciation: "Konnichiwa" },
          { word: "おはようございます", translation: "Good morning", pronunciation: "Ohayō gozaimasu" },
          { word: "こんばんは", translation: "Good evening", pronunciation: "Konbanwa" },
          { word: "さようなら", translation: "Goodbye", pronunciation: "Sayōnara" },
        ],
      },
      {
        id: "ja-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          { phrase: "お元気ですか？", translation: "How are you?", pronunciation: "O-genki desu ka?" },
          { phrase: "元気です、ありがとう。", translation: "I am fine, thank you.", pronunciation: "Genki desu, arigatō." },
          { phrase: "はじめまして。", translation: "Nice to meet you.", pronunciation: "Hajimemashite." },
        ],
      },
    ],
  },
  {
    id: "ja-u1-l2",
    unitId: "ja-u1",
    languageId: "ja",
    title: "Introductions",
    description: "Introduce yourself in Japanese.",
    order: 2,
    xpReward: 10,
    goals: [
      "Say your name in Japanese",
      "Ask someone for their name",
    ],
    aiTeacherPrompt:
      "You are a patient Japanese teacher. Help the student practice introductions using 'watashi no namae wa', 'o-namae wa nan desu ka?'. Use simple romaji pronunciation guides.",
    activities: [
      {
        id: "ja-u1-l2-a1",
        type: "vocabulary",
        title: "Introduction Words",
        vocabulary: [
          { word: "名前", translation: "Name", pronunciation: "Namae" },
          { word: "わたし", translation: "I / Me", pronunciation: "Watashi" },
          { word: "あなた", translation: "You", pronunciation: "Anata" },
          { word: "国", translation: "Country", pronunciation: "Kuni" },
        ],
      },
      {
        id: "ja-u1-l2-a2",
        type: "phrase",
        title: "Introducing Yourself",
        phrases: [
          { phrase: "わたしの名前はケンです。", translation: "My name is Ken.", pronunciation: "Watashi no namae wa Ken desu." },
          { phrase: "お名前は何ですか？", translation: "What is your name?", pronunciation: "O-namae wa nan desu ka?" },
          { phrase: "日本から来ました。", translation: "I am from Japan.", pronunciation: "Nihon kara kimashita." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // JAPANESE — Unit 2: Basics 2
  // ─────────────────────────────────────────
  {
    id: "ja-u2-l1",
    unitId: "ja-u2",
    languageId: "ja",
    title: "Numbers 1–10",
    description: "Count from one to ten in Japanese.",
    order: 1,
    xpReward: 10,
    goals: ["Count from 1 to 10 in Japanese"],
    aiTeacherPrompt:
      "You are a cheerful Japanese teacher. Teach numbers 1 to 10 in Japanese. Introduce both the Japanese script and romaji pronunciation. Use fun repetition exercises.",
    activities: [
      {
        id: "ja-u2-l1-a1",
        type: "vocabulary",
        title: "Numbers 1–10",
        vocabulary: [
          { word: "一", translation: "One", pronunciation: "Ichi" },
          { word: "二", translation: "Two", pronunciation: "Ni" },
          { word: "三", translation: "Three", pronunciation: "San" },
          { word: "四", translation: "Four", pronunciation: "Shi / Yon" },
          { word: "五", translation: "Five", pronunciation: "Go" },
          { word: "六", translation: "Six", pronunciation: "Roku" },
          { word: "七", translation: "Seven", pronunciation: "Nana / Shichi" },
          { word: "八", translation: "Eight", pronunciation: "Hachi" },
          { word: "九", translation: "Nine", pronunciation: "Ku / Kyū" },
          { word: "十", translation: "Ten", pronunciation: "Jū" },
        ],
      },
    ],
  },
  {
    id: "ja-u2-l2",
    unitId: "ja-u2",
    languageId: "ja",
    title: "Colors",
    description: "Learn basic colors in Japanese.",
    order: 2,
    xpReward: 10,
    goals: ["Name common colors in Japanese"],
    aiTeacherPrompt:
      "You are a fun Japanese teacher. Teach basic colors in Japanese. Use romaji alongside script and ask the student to describe things they see.",
    activities: [
      {
        id: "ja-u2-l2-a1",
        type: "vocabulary",
        title: "Basic Colors",
        vocabulary: [
          { word: "赤", translation: "Red", pronunciation: "Aka" },
          { word: "青", translation: "Blue", pronunciation: "Ao" },
          { word: "緑", translation: "Green", pronunciation: "Midori" },
          { word: "黄色", translation: "Yellow", pronunciation: "Kiiro" },
          { word: "白", translation: "White", pronunciation: "Shiro" },
          { word: "黒", translation: "Black", pronunciation: "Kuro" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // GERMAN — Unit 1: Basics 1
  // ─────────────────────────────────────────
  {
    id: "de-u1-l1",
    unitId: "de-u1",
    languageId: "de",
    title: "Greetings",
    description: "Learn how to greet people in German.",
    order: 1,
    xpReward: 10,
    goals: [
      "Say hello and goodbye in German",
      "Ask how someone is doing",
    ],
    aiTeacherPrompt:
      "You are a friendly German teacher for beginners. Teach essential greetings like 'Hallo', 'Tschüss', 'Guten Morgen', and 'Wie geht es Ihnen?'. Keep explanations clear and simple.",
    activities: [
      {
        id: "de-u1-l1-a1",
        type: "vocabulary",
        title: "Greeting Words",
        vocabulary: [
          { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh" },
          { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen" },
          { word: "Guten Abend", translation: "Good evening", pronunciation: "GOO-ten AH-bent" },
          { word: "Tschüss", translation: "Goodbye (informal)", pronunciation: "CHÜSS" },
          { word: "Auf Wiedersehen", translation: "Goodbye (formal)", pronunciation: "owf VEE-der-zayn" },
        ],
      },
      {
        id: "de-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          { phrase: "Wie geht es Ihnen?", translation: "How are you? (formal)", pronunciation: "VEE gayt ehs EE-nen" },
          { phrase: "Mir geht es gut, danke.", translation: "I am fine, thank you.", pronunciation: "MEER gayt ehs GOOT, DAHN-keh" },
          { phrase: "Freut mich.", translation: "Nice to meet you.", pronunciation: "FROYT mikh" },
        ],
      },
    ],
  },
  {
    id: "de-u1-l2",
    unitId: "de-u1",
    languageId: "de",
    title: "Introductions",
    description: "Introduce yourself in German.",
    order: 2,
    xpReward: 10,
    goals: [
      "Say your name in German",
      "Ask someone for their name",
    ],
    aiTeacherPrompt:
      "You are a clear and patient German teacher. Help the student practice 'Ich heiße', 'Wie heißen Sie?', and 'Ich komme aus'. Focus on correct pronunciation.",
    activities: [
      {
        id: "de-u1-l2-a1",
        type: "vocabulary",
        title: "Introduction Words",
        vocabulary: [
          { word: "Name", translation: "Name", pronunciation: "NAH-meh" },
          { word: "Land", translation: "Country", pronunciation: "LAHNT" },
          { word: "Stadt", translation: "City", pronunciation: "SHTAHT" },
          { word: "Ich bin", translation: "I am", pronunciation: "IKH BIN" },
        ],
      },
      {
        id: "de-u1-l2-a2",
        type: "phrase",
        title: "Introducing Yourself",
        phrases: [
          { phrase: "Ich heiße Lena.", translation: "My name is Lena.", pronunciation: "IKH HY-seh LAY-nah" },
          { phrase: "Wie heißen Sie?", translation: "What is your name?", pronunciation: "VEE HY-sen ZEE" },
          { phrase: "Ich komme aus Deutschland.", translation: "I am from Germany.", pronunciation: "IKH KOM-eh ows DOYTSH-lahnt" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // GERMAN — Unit 2: Basics 2
  // ─────────────────────────────────────────
  {
    id: "de-u2-l1",
    unitId: "de-u2",
    languageId: "de",
    title: "Numbers 1–10",
    description: "Count from one to ten in German.",
    order: 1,
    xpReward: 10,
    goals: ["Count from 1 to 10 in German"],
    aiTeacherPrompt:
      "You are an enthusiastic German teacher. Teach numbers 1 to 10 in German using repetition and simple examples. Encourage the student to count things around them.",
    activities: [
      {
        id: "de-u2-l1-a1",
        type: "vocabulary",
        title: "Numbers 1–10",
        vocabulary: [
          { word: "Eins", translation: "One", pronunciation: "AYNS" },
          { word: "Zwei", translation: "Two", pronunciation: "TSVY" },
          { word: "Drei", translation: "Three", pronunciation: "DRY" },
          { word: "Vier", translation: "Four", pronunciation: "FEER" },
          { word: "Fünf", translation: "Five", pronunciation: "FÜNF" },
          { word: "Sechs", translation: "Six", pronunciation: "ZEKS" },
          { word: "Sieben", translation: "Seven", pronunciation: "ZEE-ben" },
          { word: "Acht", translation: "Eight", pronunciation: "AKHT" },
          { word: "Neun", translation: "Nine", pronunciation: "NOYN" },
          { word: "Zehn", translation: "Ten", pronunciation: "TSAYN" },
        ],
      },
    ],
  },
  {
    id: "de-u2-l2",
    unitId: "de-u2",
    languageId: "de",
    title: "Colors",
    description: "Learn basic colors in German.",
    order: 2,
    xpReward: 10,
    goals: ["Name common colors in German", "Describe objects using colors"],
    aiTeacherPrompt:
      "You are a fun German teacher. Teach basic colors in German and ask the student to describe things they can see using the new words.",
    activities: [
      {
        id: "de-u2-l2-a1",
        type: "vocabulary",
        title: "Basic Colors",
        vocabulary: [
          { word: "Rot", translation: "Red", pronunciation: "ROHT" },
          { word: "Blau", translation: "Blue", pronunciation: "BLOW" },
          { word: "Grün", translation: "Green", pronunciation: "GRÜN" },
          { word: "Gelb", translation: "Yellow", pronunciation: "GELP" },
          { word: "Weiß", translation: "White", pronunciation: "VYS" },
          { word: "Schwarz", translation: "Black", pronunciation: "SHVARTS" },
        ],
      },
      {
        id: "de-u2-l2-a2",
        type: "phrase",
        title: "Describing with Colors",
        phrases: [
          { phrase: "Der Himmel ist blau.", translation: "The sky is blue.", pronunciation: "dehr HIM-el ist BLOW" },
          { phrase: "Der Apfel ist rot.", translation: "The apple is red.", pronunciation: "dehr AHP-fel ist ROHT" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // MANDARIN — Unit 1: Basics 1
  // ─────────────────────────────────────────
  {
    id: "zh-u1-l1",
    unitId: "zh-u1",
    languageId: "zh",
    title: "Greetings",
    description: "Learn how to greet people in Mandarin Chinese.",
    order: 1,
    xpReward: 10,
    goals: [
      "Say hello and goodbye in Mandarin",
      "Ask how someone is doing",
    ],
    aiTeacherPrompt:
      "You are a patient Mandarin teacher for beginners. Teach essential greetings like 'nǐ hǎo', 'zàijiàn', and 'nǐ hǎo ma?'. Use pinyin alongside Chinese characters to help beginners.",
    activities: [
      {
        id: "zh-u1-l1-a1",
        type: "vocabulary",
        title: "Greeting Words",
        vocabulary: [
          { word: "你好", translation: "Hello", pronunciation: "Nǐ hǎo" },
          { word: "早上好", translation: "Good morning", pronunciation: "Zǎoshang hǎo" },
          { word: "晚上好", translation: "Good evening", pronunciation: "Wǎnshang hǎo" },
          { word: "再见", translation: "Goodbye", pronunciation: "Zàijiàn" },
        ],
      },
      {
        id: "zh-u1-l1-a2",
        type: "phrase",
        title: "Common Phrases",
        phrases: [
          { phrase: "你好吗？", translation: "How are you?", pronunciation: "Nǐ hǎo ma?" },
          { phrase: "我很好，谢谢。", translation: "I am fine, thank you.", pronunciation: "Wǒ hěn hǎo, xièxiè." },
          { phrase: "很高兴认识你。", translation: "Nice to meet you.", pronunciation: "Hěn gāoxìng rènshi nǐ." },
        ],
      },
    ],
  },
  {
    id: "zh-u1-l2",
    unitId: "zh-u1",
    languageId: "zh",
    title: "Introductions",
    description: "Introduce yourself in Mandarin.",
    order: 2,
    xpReward: 10,
    goals: [
      "Say your name in Mandarin",
      "Ask someone for their name",
    ],
    aiTeacherPrompt:
      "You are a friendly Mandarin teacher. Help the student practice 'wǒ jiào', 'nǐ jiào shénme míngzi?'. Always provide pinyin alongside Chinese characters for beginners.",
    activities: [
      {
        id: "zh-u1-l2-a1",
        type: "vocabulary",
        title: "Introduction Words",
        vocabulary: [
          { word: "名字", translation: "Name", pronunciation: "Míngzi" },
          { word: "我", translation: "I / Me", pronunciation: "Wǒ" },
          { word: "你", translation: "You", pronunciation: "Nǐ" },
          { word: "国家", translation: "Country", pronunciation: "Guójiā" },
        ],
      },
      {
        id: "zh-u1-l2-a2",
        type: "phrase",
        title: "Introducing Yourself",
        phrases: [
          { phrase: "我叫小明。", translation: "My name is Xiaoming.", pronunciation: "Wǒ jiào Xiǎomíng." },
          { phrase: "你叫什么名字？", translation: "What is your name?", pronunciation: "Nǐ jiào shénme míngzi?" },
          { phrase: "我来自中国。", translation: "I am from China.", pronunciation: "Wǒ lái zì Zhōngguó." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // MANDARIN — Unit 2: Basics 2
  // ─────────────────────────────────────────
  {
    id: "zh-u2-l1",
    unitId: "zh-u2",
    languageId: "zh",
    title: "Numbers 1–10",
    description: "Count from one to ten in Mandarin.",
    order: 1,
    xpReward: 10,
    goals: ["Count from 1 to 10 in Mandarin"],
    aiTeacherPrompt:
      "You are a cheerful Mandarin teacher. Teach numbers 1 to 10 using both Chinese characters and pinyin. Use fun counting exercises to reinforce learning.",
    activities: [
      {
        id: "zh-u2-l1-a1",
        type: "vocabulary",
        title: "Numbers 1–10",
        vocabulary: [
          { word: "一", translation: "One", pronunciation: "Yī" },
          { word: "二", translation: "Two", pronunciation: "Èr" },
          { word: "三", translation: "Three", pronunciation: "Sān" },
          { word: "四", translation: "Four", pronunciation: "Sì" },
          { word: "五", translation: "Five", pronunciation: "Wǔ" },
          { word: "六", translation: "Six", pronunciation: "Liù" },
          { word: "七", translation: "Seven", pronunciation: "Qī" },
          { word: "八", translation: "Eight", pronunciation: "Bā" },
          { word: "九", translation: "Nine", pronunciation: "Jiǔ" },
          { word: "十", translation: "Ten", pronunciation: "Shí" },
        ],
      },
    ],
  },
  {
    id: "zh-u2-l2",
    unitId: "zh-u2",
    languageId: "zh",
    title: "Colors",
    description: "Learn basic colors in Mandarin.",
    order: 2,
    xpReward: 10,
    goals: ["Name common colors in Mandarin"],
    aiTeacherPrompt:
      "You are a fun Mandarin teacher. Teach basic colors using Chinese characters with pinyin. Ask the student to describe things they can see.",
    activities: [
      {
        id: "zh-u2-l2-a1",
        type: "vocabulary",
        title: "Basic Colors",
        vocabulary: [
          { word: "红色", translation: "Red", pronunciation: "Hóngsè" },
          { word: "蓝色", translation: "Blue", pronunciation: "Lánsè" },
          { word: "绿色", translation: "Green", pronunciation: "Lǜsè" },
          { word: "黄色", translation: "Yellow", pronunciation: "Huángsè" },
          { word: "白色", translation: "White", pronunciation: "Báisè" },
          { word: "黑色", translation: "Black", pronunciation: "Hēisè" },
        ],
      },
      {
        id: "zh-u2-l2-a2",
        type: "phrase",
        title: "Describing with Colors",
        phrases: [
          { phrase: "天空是蓝色的。", translation: "The sky is blue.", pronunciation: "Tiānkōng shì lánsè de." },
          { phrase: "苹果是红色的。", translation: "The apple is red.", pronunciation: "Píngguǒ shì hóngsè de." },
        ],
      },
    ],
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.languageId === languageId);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
