/* ============================
   i18n Module
   Czech/English translations
   ============================ */

const I18n = {
    currentLang: 'en',

    translations: {
        en: {
            // Nav
            'nav.title': 'CodeLearn',
            'nav.home': 'Home',
            'nav.lessons': 'Lessons',
            'nav.badges': 'Badges',
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
            'home.nav.help': 'How It Works',
            'home.nav.helpDesc': 'Learn about scoring, tests, and features',
            'home.nav.settings': 'Settings & Profile',
            'home.nav.settingsDesc': 'Manage language, profile, and progress',

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
            'ai.placeholder': 'Ask about this lesson...',
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
            'settings.addSecondLang': 'Learn both languages',
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

            // Help
            'help.title': 'How It Works',
            'help.content': `
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F3AF;</span> What is CodeLearn?</h2>
                    <p>CodeLearn is an interactive programming learning app. It teaches you the basics of <strong>Python</strong> or <strong>C#</strong> through 50 progressive lessons with hands-on coding exercises.</p>
                    <p>Your goal: go from complete beginner to junior developer level!</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4DD;</span> Initial Assessment</h2>
                    <p>When you first start, you take an initial assessment (10 coding challenges). Based on your score, the app determines your starting level:</p>
                    <ul>
                        <li><strong>0–50 points</strong> → Lesson 1 (Complete Beginner)</li>
                        <li><strong>51–150</strong> → Lesson 5 (Beginner)</li>
                        <li><strong>151–300</strong> → Lesson 11 (Elementary)</li>
                        <li><strong>301–450</strong> → Lesson 21 (Intermediate)</li>
                        <li><strong>451–600</strong> → Lesson 31 (Upper Intermediate)</li>
                        <li><strong>601–750</strong> → Lesson 40 (Advanced)</li>
                        <li><strong>751+</strong> → Lesson 46 (Senior)</li>
                    </ul>
                    <p>You can also skip the assessment and start from scratch if you have zero programming experience.</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4DA;</span> Lessons</h2>
                    <p>There are 50 lessons covering topics from "Hello World" to advanced algorithms, design patterns, and capstone projects. Each lesson contains:</p>
                    <ul>
                        <li>Explanation of the concept with code examples</li>
                        <li>Tips and best practices</li>
                        <li>A test you must pass to proceed</li>
                    </ul>
                    <p>Lessons unlock sequentially — complete the test for the current lesson to unlock the next one.</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x2705;</span> Tests & Scoring</h2>
                    <p>Each lesson has a coding test. Write your code in the editor and click <strong>Submit Test</strong>. Your code is evaluated on:</p>
                    <ul>
                        <li><strong>Output correctness</strong> — does your program produce the expected output? (40 points)</li>
                        <li><strong>Key concepts</strong> — did you use the required programming concepts? (30 points)</li>
                        <li><strong>Code quality</strong> — clean code, proper naming, comments (30 points)</li>
                    </ul>
                    <div class="help-score-bar">
                        <span class="help-score-example pass">50+ = Pass</span>
                        <span class="help-score-example fail">&lt;50 = Try Again</span>
                    </div>
                    <p>You earn points from tests that you can spend in the Badge Shop!</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x25B6;</span> Code Editor</h2>
                    <p>The built-in code editor lets you write and run code directly in your browser:</p>
                    <ul>
                        <li><strong>Run button</strong> — executes your code and shows output</li>
                        <li><strong>Reset button</strong> — restores the original starter code</li>
                        <li><strong>Python</strong> runs via Pyodide (real Python in your browser via WebAssembly)</li>
                        <li><strong>C#</strong> is transpiled and executed in a safe sandbox</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F3C5;</span> Badges</h2>
                    <p>Earn points from tests and buy collectible badges in the Badge Shop! There are 50+ badges in 4 categories:</p>
                    <ul>
                        <li><strong>Basic</strong> (10–50 pts) — First steps badges</li>
                        <li><strong>Intermediate</strong> (100–300 pts) — Skill badges</li>
                        <li><strong>Advanced</strong> (500–1000 pts) — Expert badges</li>
                        <li><strong>Legendary</strong> (1500–5000 pts) — Ultimate achievements</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x2699;</span> Settings</h2>
                    <p>In Settings you can:</p>
                    <ul>
                        <li>Edit your profile (name, description)</li>
                        <li>Switch interface language (English / Čeština)</li>
                        <li>Switch programming language (Python / C#)</li>
                        <li>Enable learning both languages</li>
                        <li>View your stats and owned badges</li>
                        <li>Retake the assessment (your badges and points are kept)</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4BE;</span> Your Data</h2>
                    <p>All your progress, badges, and settings are saved in your browser's LocalStorage. No account needed, no data sent anywhere. Your data stays on your device.</p>
                    <p><strong>Tip:</strong> Use the same browser to keep your progress. Clearing browser data will reset everything.</p>
                </div>`,

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
            'nav.title': 'CodeLearn',
            'nav.home': 'Domů',
            'nav.lessons': 'Lekce',
            'nav.badges': 'Odznaky',
            'nav.help': 'Nápověda',

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
            'home.nav.help': 'Jak to funguje',
            'home.nav.helpDesc': 'Poznej bodování, testy a funkce',
            'home.nav.settings': 'Nastavení a profil',
            'home.nav.settingsDesc': 'Spravuj jazyk, profil a pokrok',
            'nav.settings': 'Nastavení',

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
            'ai.placeholder': 'Zeptej se na tuto lekci...',
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
            'settings.addSecondLang': 'Učit se oba jazyky',
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

            // Help
            'help.title': 'Jak to funguje',
            'help.content': `
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F3AF;</span> Co je CodeLearn?</h2>
                    <p>CodeLearn je interaktivní aplikace pro výuku programování. Naučí tě základy <strong>Pythonu</strong> nebo <strong>C#</strong> přes 50 postupných lekcí s praktickými cvičeními.</p>
                    <p>Tvůj cíl: dostat se od úplného začátečníka na úroveň junior developera!</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4DD;</span> Úvodní test</h2>
                    <p>Na začátku absolvuješ úvodní test (10 programovacích úkolů). Podle skóre se určí tvá startovní úroveň:</p>
                    <ul>
                        <li><strong>0–50 bodů</strong> → Lekce 1 (Úplný začátečník)</li>
                        <li><strong>51–150</strong> → Lekce 5 (Začátečník)</li>
                        <li><strong>151–300</strong> → Lekce 11 (Mírně pokročilý)</li>
                        <li><strong>301–450</strong> → Lekce 21 (Středně pokročilý)</li>
                        <li><strong>451–600</strong> → Lekce 31 (Pokročilý)</li>
                        <li><strong>601–750</strong> → Lekce 40 (Velmi pokročilý)</li>
                        <li><strong>751+</strong> → Lekce 46 (Senior)</li>
                    </ul>
                    <p>Test můžeš přeskočit a začít od nuly, pokud nemáš žádné zkušenosti s programováním.</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4DA;</span> Lekce</h2>
                    <p>Celkem je 50 lekcí od "Hello World" až po pokročilé algoritmy, návrhové vzory a závěrečné projekty. Každá lekce obsahuje:</p>
                    <ul>
                        <li>Vysvětlení konceptu s příklady kódu</li>
                        <li>Tipy a osvědčené postupy</li>
                        <li>Test, který musíš splnit pro postup dál</li>
                    </ul>
                    <p>Lekce se odemykají postupně — splň test aktuální lekce pro odemknutí další.</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x2705;</span> Testy a bodování</h2>
                    <p>Každá lekce má programovací test. Napiš kód v editoru a klikni na <strong>Odevzdat test</strong>. Tvůj kód se vyhodnotí podle:</p>
                    <ul>
                        <li><strong>Správnost výstupu</strong> — vypisuje tvůj program očekávaný výstup? (40 bodů)</li>
                        <li><strong>Klíčové koncepty</strong> — použil jsi požadované programovací koncepty? (30 bodů)</li>
                        <li><strong>Kvalita kódu</strong> — čistý kód, správné pojmenování, komentáře (30 bodů)</li>
                    </ul>
                    <div class="help-score-bar">
                        <span class="help-score-example pass">50+ = Prošel</span>
                        <span class="help-score-example fail">&lt;50 = Zkus znovu</span>
                    </div>
                    <p>Za testy získáváš body, za které si můžeš koupit odznaky v obchodě!</p>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x25B6;</span> Editor kódu</h2>
                    <p>Vestavěný editor ti umožní psát a spouštět kód přímo v prohlížeči:</p>
                    <ul>
                        <li><strong>Tlačítko Spustit</strong> — spustí tvůj kód a zobrazí výstup</li>
                        <li><strong>Tlačítko Resetovat</strong> — obnoví původní kód zadání</li>
                        <li><strong>Python</strong> běží přes Pyodide (skutečný Python ve tvém prohlížeči přes WebAssembly)</li>
                        <li><strong>C#</strong> se transpiluje a bezpečně spustí v sandboxu</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F3C5;</span> Odznaky</h2>
                    <p>Získej body z testů a nakupuj sběratelské odznaky v obchodě! Je tu 50+ odznaků ve 4 kategoriích:</p>
                    <ul>
                        <li><strong>Základní</strong> (10–50 b.) — Odznaky prvních kroků</li>
                        <li><strong>Střední</strong> (100–300 b.) — Odznaky dovedností</li>
                        <li><strong>Pokročilé</strong> (500–1000 b.) — Expertní odznaky</li>
                        <li><strong>Legendární</strong> (1500–5000 b.) — Ultimátní úspěchy</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x2699;</span> Nastavení</h2>
                    <p>V nastavení můžeš:</p>
                    <ul>
                        <li>Upravit profil (jméno, popis)</li>
                        <li>Přepnout jazyk rozhraní (English / Čeština)</li>
                        <li>Přepnout programovací jazyk (Python / C#)</li>
                        <li>Zapnout učení obou jazyků</li>
                        <li>Zobrazit statistiky a vlastněné odznaky</li>
                        <li>Zopakovat úvodní test (odznaky a body zůstávají)</li>
                    </ul>
                </div>
                <div class="help-card">
                    <h2><span class="help-icon">&#x1F4BE;</span> Tvoje data</h2>
                    <p>Veškerý pokrok, odznaky a nastavení se ukládají do LocalStorage tvého prohlížeče. Nepotřebuješ účet, žádná data se nikam neodesílají. Tvoje data zůstávají na tvém zařízení.</p>
                    <p><strong>Tip:</strong> Používej stejný prohlížeč pro zachování pokroku. Smazání dat prohlížeče resetuje vše.</p>
                </div>`,

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
