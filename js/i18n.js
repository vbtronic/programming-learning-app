/* ============================
   i18n Module
   Czech/English translations
   ============================ */

const I18n = {
    currentLang: 'en',

    translations: {
        en: {
            // Nav
            'nav.title': 'Learn Coding',
            'nav.home': 'Home',
            'nav.lessons': 'Lessons',
            'nav.badges': 'Badges',
            'nav.history': 'History',
            'nav.hackathons': 'Hackathons',
            'nav.help': 'Help',
            'nav.settings': 'Settings',

            // Home
            'home.subtitle': 'Your interactive programming journey',
            'home.welcomeBack': 'Welcome back, {name}!',
            'home.continueLearning': 'Continue Learning',
            'home.viewBadges': 'Badge Shop',
            'home.currentLesson': 'Current Lesson',
            'home.badgesOwned': 'Badges',
            'home.madeBy': 'Made by Viktor Brunclík and Claude Code',
            'home.description': 'Learn Python or C# from scratch through 50 interactive lessons, coding challenges, and collectible badges.',
            'home.nav.lessons': 'Interactive Lessons',
            'home.nav.lessonsDesc': '50 progressive lessons with hands-on coding',
            'home.nav.badges': 'Badge Shop',
            'home.nav.badgesDesc': 'Collect 50+ badges with your earned points',
            'home.nav.history': 'Activity History',
            'home.nav.historyDesc': 'Review and repeat completed activities',
            'home.nav.hackathons': 'Hackathons',
            'home.nav.hackathonsDesc': 'Creative coding challenges with AI evaluation',
            'home.nav.help': 'Help',
            'home.nav.helpDesc': 'How to use the app and tips',
            'home.nav.settings': 'Settings & Profile',
            'home.nav.settingsDesc': 'Manage language, profile, and progress',

            // Hackathons
            'hackathons.title': 'Hackathons',
            'hackathons.subtitle': 'Creative coding challenges to test your skills',
            'hackathons.create': 'New Hackathon',
            'hackathons.continue': 'Continue',
            'hackathons.continueChallenge': 'You have an active hackathon',
            'hackathons.lessonHackathons': 'Lesson Hackathons',
            'hackathons.history': 'Completed Hackathons',
            'hackathons.noHistory': 'No completed hackathons yet.',
            'hackathons.lockedText': 'Complete this lesson first',
            'hackathon.backToList': '\u2190 Back to Hackathons',
            'hackathon.submit': 'Submit Hackathon',

            // Help
            'help.title': 'Help',

            // History
            'history.title': 'Activity History',
            'history.subtitle': 'Your completed lessons, tests, and hackathons',
            'history.lessons': 'Completed Lessons',
            'history.tests': 'Test Scores',
            'history.hackathons': 'Hackathon History',
            'history.noLessons': 'No completed lessons yet.',
            'history.noTests': 'No test scores yet.',
            'history.noHackathons': 'No completed hackathons yet.',

            // Loading
            'loading.text': 'Loading...',

            // Welcome
            'welcome.title': 'Learn Programming',
            'welcome.subtitle': 'From complete beginner to junior developer in one month',
            'welcome.chooseLang': 'Choose your programming language',
            'welcome.pythonDesc': 'Easy to learn, versatile, great for beginners',
            'welcome.csharpDesc': 'Powerful, used in games and enterprise apps',
            'welcome.chooseUiLang': 'Interface language',
            'welcome.start': 'Start Assessment',

            // Assessment
            'assessment.title': 'Initial Assessment',
            'assessment.subtitle': 'Complete coding challenges to determine your level. You can skip if you\'re a complete beginner.',
            'assessment.skipBtn': 'I don\'t know anything yet — start from scratch',
            'assessment.submit': 'Submit & Next',
            'assessment.skip': 'Skip',
            'assess.back': '\u2190 Back',
            'assessment.resultsTitle': 'Your Results',
            'assessment.aboutYou': 'Tell us about yourself (optional)',
            'assessment.namePlaceholder': 'Your name',
            'assessment.descPlaceholder': 'Describe your experience, goals, interests...',
            'assessment.startLearning': 'Start Learning!',
            'assessment.taskOf': 'Task {current} of {total}',

            // Assessment levels
            'level.complete_beginner': 'Complete Beginner',
            'level.beginner': 'Beginner',
            'level.elementary': 'Elementary',
            'level.intermediate': 'Intermediate',
            'level.upper_intermediate': 'Upper Intermediate',
            'level.advanced': 'Advanced',
            'level.senior': 'Senior',
            'level.startFrom': 'You will start from Lesson {num}',

            // Editor
            'editor.run': 'Run',
            'editor.reset': 'Reset',
            'editor.output': 'Output',
            'editor.running': 'Running...',
            'editor.loadingPyodide': 'Loading Python runtime...',

            // Lessons
            'lessons.title': 'Lessons',
            'lessons.progress': '{done} of {total} completed',
            'lessons.greeting': 'Welcome back, {name}!',
            'lessons.locked': 'Complete previous lessons first',

            // Lesson
            'lesson.backToList': '← Back to Lessons',
            'lesson.goToTest': 'Take the Test →',
            'lesson.lessonN': 'Lesson {n}',

            // Test
            'test.backToList': '← Back',
            'test.submit': 'Submit Test',
            'test.score': '{score} / 100',
            'test.passed': 'Passed! You earned {points} points.',
            'test.failed': 'Score below 50. Review the lesson and try again.',
            'test.nextLesson': 'Next Lesson →',
            'test.retryTest': 'Try Again',
            'test.backToLessons': 'Back to Lessons',
            'test.emptyCode': 'Write some code before submitting!',

            // AI Chat
            'ai.chatTitle': 'AI Assistant',
            'ai.placeholder': 'Chat with AI... (try /search to search the web)',
            'ai.send': 'Send',

            // Badges
            'badges.title': 'Badge Shop',
            'badges.points': 'Your points: {pts}',
            'badges.owned': 'Owned: {count} badges',
            'badges.all': 'All',
            'badges.basic': 'Basic',
            'badges.intermediate': 'Intermediate',
            'badges.advanced': 'Advanced',
            'badges.legendary': 'Legendary',
            'badges.buy': 'Buy',
            'badges.ownedLabel': 'Owned ✓',
            'badges.cantAfford': 'Not enough points',
            'badges.cost': '{cost} pts',

            // Settings
            'settings.title': 'Settings',
            'settings.profile': 'Profile',
            'settings.name': 'Name',
            'settings.description': 'About you',
            'settings.saveProfile': 'Save Profile',
            'settings.languages': 'Languages',
            'settings.uiLanguage': 'Interface Language',
            'settings.progLanguage': 'Programming Language',
            'settings.aiAssistant': 'AI Assistant',
            'settings.progress': 'Progress & Stats',
            'dashboard.title': 'Performance Dashboard',
            'settings.myBadges': 'My Badges',
            'settings.resetLevel': 'Reset Level',
            'settings.resetDesc': 'Retake the initial assessment to change your level. Your badges and points will be kept.',
            'settings.retakeBtn': 'Retake Assessment',
            'settings.fullReset': 'Full Reset',
            'settings.fullResetDesc': 'Delete all data including progress, badges, points, and profile. This cannot be undone.',
            'settings.fullResetBtn': 'Delete Everything',
            'settings.saved': 'Profile saved!',
            'settings.noBadges': 'No badges yet. Earn points from tests to buy badges!',

            // Stats
            'stats.completed': 'Completed',
            'stats.totalPoints': 'Total Points',
            'stats.bestScore': 'Best Score',
            'stats.avgScore': 'Avg Score',

            // Difficulty
            'difficulty.beginner': 'Beginner',
            'difficulty.intermediate': 'Intermediate',
            'difficulty.advanced': 'Advanced',

            // Toast
            'toast.badgeBought': 'Badge "{name}" purchased!',
            'toast.notEnoughPoints': 'Not enough points!',
            'toast.alreadyOwned': 'You already own this badge!',

            // Assessment tasks (Python)
            'assess.py.1.title': 'Hello World',
            'assess.py.1.desc': 'Write a program that prints "Hello World"',
            'assess.py.2.title': 'Sum Two Numbers',
            'assess.py.2.desc': 'Write a program that prints the sum of 15 and 27',
            'assess.py.3.title': 'Even or Odd',
            'assess.py.3.desc': 'Write a program that prints "even" if number 42 is even, otherwise "odd"',
            'assess.py.4.title': 'Count to 10',
            'assess.py.4.desc': 'Print numbers from 1 to 10, each on a new line',
            'assess.py.5.title': 'Factorial Function',
            'assess.py.5.desc': 'Write a function factorial(n) that returns the factorial of n. Print factorial(5).',
            'assess.py.6.title': 'List Operations',
            'assess.py.6.desc': 'Create a list [3,1,4,1,5,9], sort it, and print the sorted list',
            'assess.py.7.title': 'Dictionary',
            'assess.py.7.desc': 'Create a dictionary with keys "name","age","city" and values "Alice",30,"Prague". Print each key-value pair.',
            'assess.py.8.title': 'Class with Methods',
            'assess.py.8.desc': 'Create a class Rectangle with width and height. Add method area() that returns the area. Create a 5x3 rectangle and print its area.',
            'assess.py.9.title': 'Inheritance',
            'assess.py.9.desc': 'Create class Animal with method speak(). Create class Dog(Animal) that overrides speak() to return "Woof!". Create a Dog and print its speak().',
            'assess.py.10.title': 'Bubble Sort',
            'assess.py.10.desc': 'Implement bubble sort function that sorts a list. Sort [64, 34, 25, 12, 22, 11, 90] and print the result.',

            // Assessment tasks (C#)
            'assess.cs.1.title': 'Hello World',
            'assess.cs.1.desc': 'Write a program that prints "Hello World"',
            'assess.cs.2.title': 'Sum Two Numbers',
            'assess.cs.2.desc': 'Write a program that prints the sum of 15 and 27',
            'assess.cs.3.title': 'Even or Odd',
            'assess.cs.3.desc': 'Write a program that prints "even" if number 42 is even, otherwise "odd"',
            'assess.cs.4.title': 'Count to 10',
            'assess.cs.4.desc': 'Print numbers from 1 to 10, each on a new line',
            'assess.cs.5.title': 'Factorial Method',
            'assess.cs.5.desc': 'Write a static method Factorial(int n) that returns the factorial. Print Factorial(5).',
            'assess.cs.6.title': 'List Operations',
            'assess.cs.6.desc': 'Create a List<int> with {3,1,4,1,5,9}, sort it, and print all elements',
            'assess.cs.7.title': 'Dictionary',
            'assess.cs.7.desc': 'Create a Dictionary with keys "name","age","city" and values "Alice","30","Prague". Print each key-value pair.',
            'assess.cs.8.title': 'Class with Methods',
            'assess.cs.8.desc': 'Create a class Rectangle with Width and Height properties. Add method Area() that returns the area. Create a 5x3 rectangle and print its area.',
            'assess.cs.9.title': 'Inheritance',
            'assess.cs.9.desc': 'Create class Animal with virtual method Speak(). Create class Dog : Animal that overrides Speak() to return "Woof!". Create a Dog and print its Speak().',
            'assess.cs.10.title': 'Bubble Sort',
            'assess.cs.10.desc': 'Implement a BubbleSort method that sorts an int array. Sort {64, 34, 25, 12, 22, 11, 90} and print the result.',
        },

        cz: {
            // Nav
            'nav.title': 'Learn Coding',
            'nav.home': 'Domů',
            'nav.lessons': 'Lekce',
            'nav.badges': 'Odznaky',
            'nav.history': 'Historie',
            'nav.help': 'N\u00e1pov\u011bda',
            // Home
            'home.subtitle': 'Tvá interaktivní cesta programováním',
            'home.welcomeBack': 'Vítej zpět, {name}!',
            'home.continueLearning': 'Pokračovat v učení',
            'home.viewBadges': 'Obchod s odznaky',
            'home.currentLesson': 'Aktuální lekce',
            'home.badgesOwned': 'Odznaky',
            'home.madeBy': 'Vytvořil Viktor Brunclík a Claude Code',
            'home.description': 'Nauč se Python nebo C# od nuly přes 50 interaktivních lekcí, programovacích výzev a sběratelských odznaků.',
            'home.nav.lessons': 'Interaktivní lekce',
            'home.nav.lessonsDesc': '50 postupných lekcí s praktickým kódováním',
            'home.nav.badges': 'Obchod s odznaky',
            'home.nav.badgesDesc': 'Sbírej 50+ odznaků za získané body',
            'home.nav.history': 'Historie aktivit',
            'home.nav.historyDesc': 'Prohlížej a opakuj dokončené aktivity',
            'home.nav.hackathons': 'Hackathony',
            'home.nav.hackathonsDesc': 'Kreativní výzvy s AI hodnocením',
            'home.nav.help': 'Nápověda',
            'home.nav.helpDesc': 'Jak používat aplikaci a tipy',
            'home.nav.settings': 'Nastavení a profil',
            'home.nav.settingsDesc': 'Spravuj jazyk, profil a pokrok',
            'nav.hackathons': 'Hackathony',
            'nav.settings': 'Nastavení',

            // Hackathons
            'hackathons.title': 'Hackathony',
            'hackathons.subtitle': 'Kreativní programovací výzvy pro ověření dovedností',
            'hackathons.create': 'Nový hackathon',
            'hackathons.continue': 'Pokračovat',
            'hackathons.continueChallenge': 'Máš aktivní hackathon',
            'hackathons.lessonHackathons': 'Hackathony z lekcí',
            'hackathons.history': 'Dokončené hackathony',
            'hackathons.noHistory': 'Zatím žádné dokončené hackathony.',
            'hackathons.lockedText': 'Nejdříve dokonči tuto lekci',
            'hackathon.backToList': '\u2190 Zpět na hackathony',
            'hackathon.submit': 'Odevzdat hackathon',

            // Help
            'help.title': 'Nápověda',

            // History
            'history.title': 'Historie aktivit',
            'history.subtitle': 'Tvoje dokončené lekce, testy a hackathony',
            'history.lessons': 'Dokončené lekce',
            'history.tests': 'Výsledky testů',
            'history.hackathons': 'Historie hackathonů',
            'history.noLessons': 'Zatím žádné dokončené lekce.',
            'history.noTests': 'Zatím žádné výsledky testů.',
            'history.noHackathons': 'Zatím žádné dokončené hackathony.',

            // Loading
            'loading.text': 'Načítání...',

            // Welcome
            'welcome.title': 'Nauč se programovat',
            'welcome.subtitle': 'Od úplného začátečníka po junior developera za jeden měsíc',
            'welcome.chooseLang': 'Vyber si programovací jazyk',
            'welcome.pythonDesc': 'Snadný na naučení, univerzální, skvělý pro začátečníky',
            'welcome.csharpDesc': 'Výkonný, používaný ve hrách a enterprise aplikacích',
            'welcome.chooseUiLang': 'Jazyk rozhraní',
            'welcome.start': 'Začít test',

            // Assessment
            'assessment.title': 'Úvodní test',
            'assessment.subtitle': 'Splň programovací úkoly pro určení tvé úrovně. Pokud jsi úplný začátečník, můžeš přeskočit.',
            'assessment.skipBtn': 'Ještě nic neumím — začít od nuly',
            'assessment.submit': 'Odeslat a další',
            'assessment.skip': 'Přeskočit',
            'assess.back': '\u2190 Zpět',
            'assessment.resultsTitle': 'Tvé výsledky',
            'assessment.aboutYou': 'Řekni nám o sobě (nepovinné)',
            'assessment.namePlaceholder': 'Tvé jméno',
            'assessment.descPlaceholder': 'Popiš své zkušenosti, cíle, zájmy...',
            'assessment.startLearning': 'Začít se učit!',
            'assessment.taskOf': 'Úkol {current} z {total}',

            // Assessment levels
            'level.complete_beginner': 'Úplný začátečník',
            'level.beginner': 'Začátečník',
            'level.elementary': 'Mírně pokročilý',
            'level.intermediate': 'Středně pokročilý',
            'level.upper_intermediate': 'Pokročilý',
            'level.advanced': 'Velmi pokročilý',
            'level.senior': 'Senior',
            'level.startFrom': 'Začneš od lekce {num}',

            // Editor
            'editor.run': 'Spustit',
            'editor.reset': 'Resetovat',
            'editor.output': 'Výstup',
            'editor.running': 'Spouštím...',
            'editor.loadingPyodide': 'Načítám Python runtime...',

            // Lessons
            'lessons.title': 'Lekce',
            'lessons.progress': '{done} z {total} dokončeno',
            'lessons.greeting': 'Vítej zpět, {name}!',
            'lessons.locked': 'Nejdříve dokonči předchozí lekce',

            // Lesson
            'lesson.backToList': '← Zpět na lekce',
            'lesson.goToTest': 'Spustit test →',
            'lesson.lessonN': 'Lekce {n}',

            // Test
            'test.backToList': '← Zpět',
            'test.submit': 'Odevzdat test',
            'test.score': '{score} / 100',
            'test.passed': 'Prošel! Získal jsi {points} bodů.',
            'test.failed': 'Skóre pod 50. Projdi si lekci a zkus to znovu.',
            'test.nextLesson': 'Další lekce →',
            'test.retryTest': 'Zkusit znovu',
            'test.backToLessons': 'Zpět na lekce',
            'test.emptyCode': 'Napiš kód před odesláním!',

            // AI Chat
            'ai.chatTitle': 'AI Asistent',
            'ai.placeholder': 'Piš AI... (/search pro hledání na webu)',
            'ai.send': 'Odeslat',

            // Badges
            'badges.title': 'Obchod s odznaky',
            'badges.points': 'Tvé body: {pts}',
            'badges.owned': 'Vlastníš: {count} odznaků',
            'badges.all': 'Vše',
            'badges.basic': 'Základní',
            'badges.intermediate': 'Střední',
            'badges.advanced': 'Pokročilé',
            'badges.legendary': 'Legendární',
            'badges.buy': 'Koupit',
            'badges.ownedLabel': 'Vlastníš ✓',
            'badges.cantAfford': 'Málo bodů',
            'badges.cost': '{cost} b.',

            // Settings
            'settings.title': 'Nastavení',
            'settings.profile': 'Profil',
            'settings.name': 'Jméno',
            'settings.description': 'O tobě',
            'settings.saveProfile': 'Uložit profil',
            'settings.languages': 'Jazyky',
            'settings.uiLanguage': 'Jazyk rozhraní',
            'settings.progLanguage': 'Programovací jazyk',
            'settings.aiAssistant': 'AI Asistent',
            'settings.progress': 'Pokrok a statistiky',
            'dashboard.title': 'Dashboard výkonu',
            'settings.myBadges': 'Moje odznaky',
            'settings.resetLevel': 'Reset úrovně',
            'settings.resetDesc': 'Zopakuj úvodní test pro změnu úrovně. Odznaky a body ti zůstanou.',
            'settings.retakeBtn': 'Zopakovat test',
            'settings.fullReset': 'Smazat v\u0161e',
            'settings.fullResetDesc': 'Sma\u017ee v\u0161echna data v\u010detn\u011b pokroku, odznak\u016f, bod\u016f a profilu. Tuto akci nelze vr\u00e1tit.',
            'settings.fullResetBtn': 'Smazat v\u0161echna data',
            'settings.saved': 'Profil uložen!',
            'settings.noBadges': 'Zatím žádné odznaky. Získej body z testů a kup si odznaky!',

            // Stats
            'stats.completed': 'Dokončeno',
            'stats.totalPoints': 'Celkem bodů',
            'stats.bestScore': 'Nejlepší',
            'stats.avgScore': 'Průměr',

            // Difficulty
            'difficulty.beginner': 'Začátečník',
            'difficulty.intermediate': 'Střední',
            'difficulty.advanced': 'Pokročilý',

            // Toast
            'toast.badgeBought': 'Odznak "{name}" zakoupen!',
            'toast.notEnoughPoints': 'Nedostatek bodů!',
            'toast.alreadyOwned': 'Tento odznak již vlastníš!',

            // Assessment tasks (Python)
            'assess.py.1.title': 'Hello World',
            'assess.py.1.desc': 'Napiš program, který vypíše "Hello World"',
            'assess.py.2.title': 'Součet dvou čísel',
            'assess.py.2.desc': 'Napiš program, který vypíše součet čísel 15 a 27',
            'assess.py.3.title': 'Sudé nebo liché',
            'assess.py.3.desc': 'Napiš program, který vypíše "even" pokud je číslo 42 sudé, jinak "odd"',
            'assess.py.4.title': 'Počítej do 10',
            'assess.py.4.desc': 'Vypiš čísla od 1 do 10, každé na nový řádek',
            'assess.py.5.title': 'Funkce faktoriál',
            'assess.py.5.desc': 'Napiš funkci factorial(n), která vrátí faktoriál čísla n. Vypiš factorial(5).',
            'assess.py.6.title': 'Operace se seznamem',
            'assess.py.6.desc': 'Vytvoř seznam [3,1,4,1,5,9], seřaď ho a vypiš seřazený seznam',
            'assess.py.7.title': 'Slovník',
            'assess.py.7.desc': 'Vytvoř slovník s klíči "name","age","city" a hodnotami "Alice",30,"Prague". Vypiš každý pár klíč-hodnota.',
            'assess.py.8.title': 'Třída s metodami',
            'assess.py.8.desc': 'Vytvoř třídu Rectangle s šířkou a výškou. Přidej metodu area() vracející obsah. Vytvoř obdélník 5x3 a vypiš jeho obsah.',
            'assess.py.9.title': 'Dědičnost',
            'assess.py.9.desc': 'Vytvoř třídu Animal s metodou speak(). Vytvoř třídu Dog(Animal), která přepíše speak() a vrátí "Woof!". Vytvoř Dog a vypiš speak().',
            'assess.py.10.title': 'Bubble Sort',
            'assess.py.10.desc': 'Implementuj funkci bubble sort pro seřazení seznamu. Seřaď [64, 34, 25, 12, 22, 11, 90] a vypiš výsledek.',

            // Assessment tasks (C#)
            'assess.cs.1.title': 'Hello World',
            'assess.cs.1.desc': 'Napiš program, který vypíše "Hello World"',
            'assess.cs.2.title': 'Součet dvou čísel',
            'assess.cs.2.desc': 'Napiš program, který vypíše součet čísel 15 a 27',
            'assess.cs.3.title': 'Sudé nebo liché',
            'assess.cs.3.desc': 'Napiš program, který vypíše "even" pokud je číslo 42 sudé, jinak "odd"',
            'assess.cs.4.title': 'Počítej do 10',
            'assess.cs.4.desc': 'Vypiš čísla od 1 do 10, každé na nový řádek',
            'assess.cs.5.title': 'Metoda faktoriál',
            'assess.cs.5.desc': 'Napiš statickou metodu Factorial(int n) vracející faktoriál. Vypiš Factorial(5).',
            'assess.cs.6.title': 'Operace se seznamem',
            'assess.cs.6.desc': 'Vytvoř List<int> s {3,1,4,1,5,9}, seřaď ho a vypiš všechny prvky',
            'assess.cs.7.title': 'Slovník',
            'assess.cs.7.desc': 'Vytvoř Dictionary s klíči "name","age","city" a hodnotami "Alice","30","Prague". Vypiš každý pár.',
            'assess.cs.8.title': 'Třída s metodami',
            'assess.cs.8.desc': 'Vytvoř třídu Rectangle s vlastnostmi Width a Height. Přidej metodu Area(). Vytvoř obdélník 5x3 a vypiš jeho obsah.',
            'assess.cs.9.title': 'Dědičnost',
            'assess.cs.9.desc': 'Vytvoř třídu Animal s virtuální metodou Speak(). Vytvoř třídu Dog : Animal přepisující Speak() na "Woof!". Vypiš Speak().',
            'assess.cs.10.title': 'Bubble Sort',
            'assess.cs.10.desc': 'Implementuj metodu BubbleSort pro seřazení pole. Seřaď {64, 34, 25, 12, 22, 11, 90} a vypiš výsledek.',
        }
    },

    // Initialize
    init(lang) {
        this.currentLang = lang || 'en';
        this.updateAll();
    },

    // Get translation
    t(key, params) {
        const dict = this.translations[this.currentLang] || this.translations.en;
        let text = dict[key] || this.translations.en[key] || key;

        if (params) {
            Object.keys(params).forEach(k => {
                text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
            });
        }
        return text;
    },

    // Set language and update all elements
    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.setAttribute('data-lang', lang);
        this.updateAll();
    },

    // Update all elements with data-i18n attribute
    updateAll() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        // Update page title
        document.title = this.t('nav.title') + ' - ' + this.t('welcome.title');
    }
};
