/* ============================
   Badges Module
   Badge catalog, purchase, display
   ============================ */

const Badges = {
    // Badge catalog - nearly unlimited collection
    catalog: [
        // === BASIC (10-50 points) ===
        { id: 'first_step', icon: '\u{1F463}', category: 'basic', cost: 10,
          name: { en: 'First Step', cz: 'První krok' },
          desc: { en: 'You started your journey!', cz: 'Začal jsi svou cestu!' }},
        { id: 'hello_world', icon: '\u{1F44B}', category: 'basic', cost: 15,
          name: { en: 'Hello World', cz: 'Hello World' },
          desc: { en: 'The classic first program', cz: 'Klasický první program' }},
        { id: 'quick_learner', icon: '\u{26A1}', category: 'basic', cost: 20,
          name: { en: 'Quick Learner', cz: 'Rychlý student' },
          desc: { en: 'Completed your first lesson', cz: 'Dokončil jsi první lekci' }},
        { id: 'code_newbie', icon: '\u{1F331}', category: 'basic', cost: 20,
          name: { en: 'Code Newbie', cz: 'Nováček' },
          desc: { en: 'Welcome to the coding world', cz: 'Vítej ve světě kódu' }},
        { id: 'bug_finder', icon: '\u{1F41B}', category: 'basic', cost: 25,
          name: { en: 'Bug Finder', cz: 'Lovec bugů' },
          desc: { en: 'Found your first bug', cz: 'Našel jsi svůj první bug' }},
        { id: 'persistent', icon: '\u{1F4AA}', category: 'basic', cost: 30,
          name: { en: 'Persistent', cz: 'Vytrvalý' },
          desc: { en: 'Never give up attitude', cz: 'Nikdy se nevzdávej' }},
        { id: 'curious_mind', icon: '\u{1F50D}', category: 'basic', cost: 30,
          name: { en: 'Curious Mind', cz: 'Zvědavá mysl' },
          desc: { en: 'Always eager to learn more', cz: 'Vždy dychtivý učit se více' }},
        { id: 'early_bird', icon: '\u{1F426}', category: 'basic', cost: 35,
          name: { en: 'Early Bird', cz: 'Ranní ptáče' },
          desc: { en: 'Starting strong', cz: 'Silný start' }},
        { id: 'keyboard_warrior', icon: '\u{2328}', category: 'basic', cost: 40,
          name: { en: 'Keyboard Warrior', cz: 'Klávesnicový válečník' },
          desc: { en: 'Your keyboard is your weapon', cz: 'Klávesnice je tvá zbraň' }},
        { id: 'variable_master', icon: '\u{1F4E6}', category: 'basic', cost: 40,
          name: { en: 'Variable Master', cz: 'Pán proměnných' },
          desc: { en: 'Mastered variables and types', cz: 'Zvládl proměnné a typy' }},
        { id: 'loop_runner', icon: '\u{1F504}', category: 'basic', cost: 45,
          name: { en: 'Loop Runner', cz: 'Cyklový běžec' },
          desc: { en: 'Loops are your friend', cz: 'Cykly jsou tvůj přítel' }},
        { id: 'condition_check', icon: '\u{2753}', category: 'basic', cost: 45,
          name: { en: 'Decision Maker', cz: 'Rozhodovač' },
          desc: { en: 'If this, then that', cz: 'Pokud toto, pak tamto' }},
        { id: 'coffee_coder', icon: '\u{2615}', category: 'basic', cost: 50,
          name: { en: 'Coffee Coder', cz: 'Kávový kodér' },
          desc: { en: 'Fueled by coffee', cz: 'Poháněný kávou' }},

        // === INTERMEDIATE (100-300 points) ===
        { id: 'function_guru', icon: '\u{1F9E9}', category: 'intermediate', cost: 100,
          name: { en: 'Function Guru', cz: 'Guru funkcí' },
          desc: { en: 'Functions are second nature', cz: 'Funkce jsou tvá druhá přirozenost' }},
        { id: 'string_wizard', icon: '\u{1FA84}', category: 'intermediate', cost: 110,
          name: { en: 'String Wizard', cz: 'Čaroděj řetězců' },
          desc: { en: 'String manipulation master', cz: 'Mistr manipulace s řetězci' }},
        { id: 'array_ninja', icon: '\u{1F977}', category: 'intermediate', cost: 120,
          name: { en: 'Array Ninja', cz: 'Ninja polí' },
          desc: { en: 'Slicing and dicing arrays', cz: 'Řežeš a krájíš pole' }},
        { id: 'oop_beginner', icon: '\u{1F3D7}', category: 'intermediate', cost: 150,
          name: { en: 'OOP Explorer', cz: 'OOP průzkumník' },
          desc: { en: 'Started object-oriented journey', cz: 'Začal cestu objektového programování' }},
        { id: 'error_handler', icon: '\u{1F6E1}', category: 'intermediate', cost: 150,
          name: { en: 'Error Handler', cz: 'Zpracovatel chyb' },
          desc: { en: 'Try-catch is your safety net', cz: 'Try-catch je tvá záchranná síť' }},
        { id: 'debug_detective', icon: '\u{1F575}', category: 'intermediate', cost: 160,
          name: { en: 'Debug Detective', cz: 'Debugovací detektiv' },
          desc: { en: 'Finding bugs like Sherlock', cz: 'Hledáš bugy jako Sherlock' }},
        { id: 'clean_coder', icon: '\u{2728}', category: 'intermediate', cost: 170,
          name: { en: 'Clean Coder', cz: 'Čistý kodér' },
          desc: { en: 'Your code is beautiful', cz: 'Tvůj kód je krásný' }},
        { id: 'python_tamer', icon: '\u{1F40D}', category: 'intermediate', cost: 180,
          name: { en: 'Python Tamer', cz: 'Krotitel Pythonu' },
          desc: { en: 'Python bends to your will', cz: 'Python se podvoluje tvé vůli' }},
        { id: 'csharp_smith', icon: '\u{1F528}', category: 'intermediate', cost: 180,
          name: { en: 'C# Smith', cz: 'C# kovář' },
          desc: { en: 'Forging code in C#', cz: 'Kováš kód v C#' }},
        { id: 'logic_master', icon: '\u{1F9E0}', category: 'intermediate', cost: 200,
          name: { en: 'Logic Master', cz: 'Mistr logiky' },
          desc: { en: 'Thinking in algorithms', cz: 'Myslíš v algoritmech' }},
        { id: 'half_way', icon: '\u{1F3AF}', category: 'intermediate', cost: 200,
          name: { en: 'Halfway There', cz: 'V půlce cesty' },
          desc: { en: 'Completed 10 lessons', cz: 'Dokončil 10 lekcí' }},
        { id: 'night_owl', icon: '\u{1F989}', category: 'intermediate', cost: 200,
          name: { en: 'Night Owl', cz: 'Noční sova' },
          desc: { en: 'Coding into the night', cz: 'Kóduješ do noci' }},
        { id: 'perfectionist', icon: '\u{1F48E}', category: 'intermediate', cost: 250,
          name: { en: 'Perfectionist', cz: 'Perfekcionista' },
          desc: { en: 'Got 100 points on a test', cz: 'Získal 100 bodů v testu' }},
        { id: 'bilingual', icon: '\u{1F30D}', category: 'intermediate', cost: 250,
          name: { en: 'Bilingual Coder', cz: 'Dvojjazyčný kodér' },
          desc: { en: 'Learning in two languages', cz: 'Učíš se ve dvou jazycích' }},
        { id: 'class_architect', icon: '\u{1F3E0}', category: 'intermediate', cost: 280,
          name: { en: 'Class Architect', cz: 'Architekt tříd' },
          desc: { en: 'Designing with classes', cz: 'Navrhuje s třídami' }},
        { id: 'data_wrangler', icon: '\u{1F4CA}', category: 'intermediate', cost: 300,
          name: { en: 'Data Wrangler', cz: 'Krotitel dat' },
          desc: { en: 'Taming data structures', cz: 'Krotíš datové struktury' }},

        // === ADVANCED (500-1000 points) ===
        { id: 'algorithm_pro', icon: '\u{1F9EE}', category: 'advanced', cost: 500,
          name: { en: 'Algorithm Pro', cz: 'Profesionál algoritmů' },
          desc: { en: 'Algorithms are your playground', cz: 'Algoritmy jsou tvé hřiště' }},
        { id: 'pattern_master', icon: '\u{1F3A8}', category: 'advanced', cost: 550,
          name: { en: 'Pattern Master', cz: 'Mistr vzorů' },
          desc: { en: 'Design patterns expert', cz: 'Expert na návrhové vzory' }},
        { id: 'senior_path', icon: '\u{1F6E4}', category: 'advanced', cost: 600,
          name: { en: 'Senior Path', cz: 'Cesta seniora' },
          desc: { en: 'On the road to senior', cz: 'Na cestě k seniorovi' }},
        { id: 'code_reviewer', icon: '\u{1F440}', category: 'advanced', cost: 650,
          name: { en: 'Code Reviewer', cz: 'Revizor kódu' },
          desc: { en: 'Can spot issues anywhere', cz: 'Najde problém kdekoliv' }},
        { id: 'speed_runner', icon: '\u{1F3C3}', category: 'advanced', cost: 700,
          name: { en: 'Speed Runner', cz: 'Rychlý běžec' },
          desc: { en: 'Fast and efficient coder', cz: 'Rychlý a efektivní kodér' }},
        { id: 'polyglot', icon: '\u{1F4DA}', category: 'advanced', cost: 750,
          name: { en: 'Polyglot', cz: 'Polyglot' },
          desc: { en: 'Master of multiple languages', cz: 'Mistr více jazyků' }},
        { id: 'good_programming', icon: '\u{1F4DD}', category: 'advanced', cost: 800,
          name: { en: 'Good Programming', cz: 'Dobré programování' },
          desc: { en: 'Writing quality code consistently', cz: 'Konzistentně píšeš kvalitní kód' }},
        { id: 'inheritance_king', icon: '\u{1F451}', category: 'advanced', cost: 850,
          name: { en: 'Inheritance King', cz: 'Král dědičnosti' },
          desc: { en: 'OOP inheritance mastery', cz: 'Mistrovství v OOP dědičnosti' }},
        { id: 'junior_dev', icon: '\u{1F468}\u{200D}\u{1F4BB}', category: 'advanced', cost: 1000,
          name: { en: 'Junior Developer', cz: 'Junior Developer' },
          desc: { en: 'You made it! Junior level reached!', cz: 'Dokázal jsi to! Úroveň junior dosažena!' }},

        // === LEGENDARY (1500-5000 points) ===
        { id: 'full_stack', icon: '\u{1F310}', category: 'legendary', cost: 1500,
          name: { en: 'Full Stack Vision', cz: 'Full Stack vize' },
          desc: { en: 'Seeing the whole picture', cz: 'Vidíš celý obrázek' }},
        { id: 'code_artist', icon: '\u{1F3A8}', category: 'legendary', cost: 1800,
          name: { en: 'Code Artist', cz: 'Umělec kódu' },
          desc: { en: 'Code is your canvas', cz: 'Kód je tvé plátno' }},
        { id: 'mentor', icon: '\u{1F393}', category: 'legendary', cost: 2000,
          name: { en: 'Mentor', cz: 'Mentor' },
          desc: { en: 'Ready to teach others', cz: 'Připraven učit ostatní' }},
        { id: 'open_source', icon: '\u{1F4E2}', category: 'legendary', cost: 2500,
          name: { en: 'Open Source Champion', cz: 'Šampion open source' },
          desc: { en: 'The spirit of open source', cz: 'Duch open source' }},
        { id: 'code_architect', icon: '\u{1F3DB}', category: 'legendary', cost: 3000,
          name: { en: 'Code Architect', cz: 'Architekt kódu' },
          desc: { en: 'Designing systems from scratch', cz: 'Navrhuje systémy od nuly' }},
        { id: 'grandmaster', icon: '\u{1F3C6}', category: 'legendary', cost: 4000,
          name: { en: 'Grandmaster', cz: 'Velmistr' },
          desc: { en: 'The pinnacle of coding mastery', cz: 'Vrchol mistrovství v kódování' }},
        { id: 'legend', icon: '\u{2B50}', category: 'legendary', cost: 5000,
          name: { en: 'Legend', cz: 'Legenda' },
          desc: { en: 'Your name echoes through the codebase', cz: 'Tvé jméno rezonuje kódem' }},

        // === EXTRA FUN BADGES ===
        { id: 'rubber_duck', icon: '\u{1F986}', category: 'basic', cost: 25,
          name: { en: 'Rubber Duck', cz: 'Gumová kachna' },
          desc: { en: 'Your debugging companion', cz: 'Tvůj debugovací společník' }},
        { id: 'stack_overflow', icon: '\u{1F4DA}', category: 'intermediate', cost: 200,
          name: { en: 'Stack Overflow Survivor', cz: 'Přeživší Stack Overflow' },
          desc: { en: 'Survived the recursion', cz: 'Přežil rekurzi' }},
        { id: 'git_guru', icon: '\u{1F500}', category: 'intermediate', cost: 220,
          name: { en: 'Git Guru', cz: 'Git guru' },
          desc: { en: 'Version control master', cz: 'Mistr verzování' }},
        { id: 'pixel_perfect', icon: '\u{1F3AF}', category: 'advanced', cost: 600,
          name: { en: 'Pixel Perfect', cz: 'Pixel perfektní' },
          desc: { en: 'Attention to every detail', cz: 'Pozornost na každý detail' }},
        { id: 'zen_coder', icon: '\u{1F9D8}', category: 'advanced', cost: 900,
          name: { en: 'Zen Coder', cz: 'Zen kodér' },
          desc: { en: 'Calm and focused coding', cz: 'Klidné a soustředěné kódování' }},
        { id: 'infinite_loop', icon: '\u{267E}', category: 'legendary', cost: 2200,
          name: { en: 'Infinite Passion', cz: 'Nekonečná vášeň' },
          desc: { en: 'Your love for coding never ends', cz: 'Tvá láska ke kódu nikdy nekončí' }},
        { id: 'matrix', icon: '\u{1F7E2}', category: 'legendary', cost: 3500,
          name: { en: 'The Matrix', cz: 'Matrix' },
          desc: { en: 'You see the code everywhere', cz: 'Vidíš kód všude' }},

        // Hackathon (auto-awarded, cost 0)
        { id: 'hackathon_hero', icon: '\u{1F680}', category: 'legendary', cost: 0,
          name: { en: 'Hackathon Hero', cz: 'Hrdina hackathonu' },
          desc: { en: 'Completed the final hackathon challenge!', cz: 'Dokončil jsi finální hackathonovou výzvu!' }},
    ],

    // Get all badges
    getAll() {
        return this.catalog;
    },

    // Get badges by category
    getByCategory(category) {
        if (category === 'all') return this.catalog;
        return this.catalog.filter(b => b.category === category);
    },

    // Get badge by ID
    getById(id) {
        return this.catalog.find(b => b.id === id);
    },

    // Check if owned
    isOwned(id) {
        const badges = Storage.getBadges();
        return badges.owned.includes(id);
    },

    // Buy a badge
    buy(id) {
        const badge = this.getById(id);
        if (!badge) return { success: false, reason: 'notFound' };
        if (this.isOwned(id)) return { success: false, reason: 'alreadyOwned' };

        const success = Storage.buyBadge(id, badge.cost);
        if (!success) return { success: false, reason: 'notEnoughPoints' };
        return { success: true };
    },

    // Get owned badges
    getOwned() {
        const badges = Storage.getBadges();
        return badges.owned.map(id => this.getById(id)).filter(Boolean);
    },

    // Render badge card HTML
    renderCard(badge, lang) {
        const owned = this.isOwned(badge.id);
        const progress = Storage.getProgress();
        const canAfford = progress.totalPoints >= badge.cost;
        const name = badge.name[lang] || badge.name.en;
        const desc = badge.desc[lang] || badge.desc.en;

        let statusHtml;
        if (owned) {
            statusHtml = `<span class="badge-owned-label">${I18n.t('badges.ownedLabel')}</span>`;
        } else if (canAfford) {
            statusHtml = `<button class="badge-buy-btn" onclick="App.buyBadge('${badge.id}')">${I18n.t('badges.buy')} (${badge.cost})</button>`;
        } else {
            statusHtml = `<button class="badge-buy-btn" disabled>${badge.cost} pts</button>`;
        }

        const classes = ['badge-card'];
        if (owned) classes.push('owned');
        else if (canAfford) classes.push('affordable');

        return `
            <div class="${classes.join(' ')}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${name}</div>
                <div class="badge-desc">${desc}</div>
                ${statusHtml}
            </div>
        `;
    },

    // Render mini badge (for settings)
    renderMini(badge, lang) {
        const name = badge.name[lang] || badge.name.en;
        return `
            <span class="badge-mini">
                <span class="badge-mini-icon">${badge.icon}</span>
                ${name}
            </span>
        `;
    }
};
