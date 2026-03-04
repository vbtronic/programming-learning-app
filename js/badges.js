/* ============================
   Badges Module
   Badge catalog, purchase, display
   ============================ */

const Badges = {
    // Badge catalog - separate badges for Python and C# with shared basics
    catalog: [
        // ============================================================
        // === SHARED BASIC (10-50 points) - both languages ===
        // ============================================================
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
        { id: 'persistent', icon: '\u{1F4AA}', category: 'basic', cost: 30,
          name: { en: 'Persistent', cz: 'Vytrvalý' },
          desc: { en: 'Never give up attitude', cz: 'Nikdy se nevzdávej' }},
        { id: 'coffee_coder', icon: '\u{2615}', category: 'basic', cost: 50,
          name: { en: 'Coffee Coder', cz: 'Kávový kodér' },
          desc: { en: 'Fueled by coffee', cz: 'Poháněný kávou' }},
        { id: 'rubber_duck', icon: '\u{1F986}', category: 'basic', cost: 25,
          name: { en: 'Rubber Duck', cz: 'Gumová kachna' },
          desc: { en: 'Your debugging companion', cz: 'Tvůj debugovací společník' }},

        // === SHARED INTERMEDIATE (100-300 points) ===
        { id: 'perfectionist', icon: '\u{1F48E}', category: 'intermediate', cost: 250,
          name: { en: 'Perfectionist', cz: 'Perfekcionista' },
          desc: { en: 'Got 100 points on a test', cz: 'Získal 100 bodů v testu' }},
        { id: 'half_way', icon: '\u{1F3AF}', category: 'intermediate', cost: 200,
          name: { en: 'Halfway There', cz: 'V půlce cesty' },
          desc: { en: 'Completed 25 lessons', cz: 'Dokončil 25 lekcí' }},
        { id: 'night_owl', icon: '\u{1F989}', category: 'intermediate', cost: 200,
          name: { en: 'Night Owl', cz: 'Noční sova' },
          desc: { en: 'Coding into the night', cz: 'Kóduješ do noci' }},

        // === SHARED LEGENDARY ===
        { id: 'hackathon_hero', icon: '\u{1F680}', category: 'legendary', cost: 1500,
          name: { en: 'Hackathon Hero', cz: 'Hrdina hackathonu' },
          desc: { en: 'Completed the final hackathon challenge!', cz: 'Dokončil jsi finální hackathonovou výzvu!' }},

        // ============================================================
        // === PYTHON-SPECIFIC BADGES ===
        // ============================================================

        // Python Basic (10-50)
        { id: 'py_bug_finder', icon: '\u{1F41B}', category: 'basic', cost: 25, lang: 'python',
          name: { en: 'Bug Hunter', cz: 'Lovec bugů' },
          desc: { en: 'Found your first Python bug', cz: 'Našel jsi svůj první Python bug' }},
        { id: 'py_curious', icon: '\u{1F50D}', category: 'basic', cost: 30, lang: 'python',
          name: { en: 'Curious Pythonista', cz: 'Zvědavý Pythonista' },
          desc: { en: 'Always exploring Python', cz: 'Vždy zkoumáš Python' }},
        { id: 'py_keyboard', icon: '\u{2328}', category: 'basic', cost: 40, lang: 'python',
          name: { en: 'Indentation Master', cz: 'Mistr odsazení' },
          desc: { en: 'Tabs vs spaces? You know the answer', cz: 'Taby vs mezery? Znáš odpověď' }},
        { id: 'py_variable', icon: '\u{1F4E6}', category: 'basic', cost: 40, lang: 'python',
          name: { en: 'Variable Juggler', cz: 'Žonglér proměnných' },
          desc: { en: 'Dynamic typing is your friend', cz: 'Dynamické typování je tvůj přítel' }},
        { id: 'py_loop', icon: '\u{1F504}', category: 'basic', cost: 45, lang: 'python',
          name: { en: 'For-In Runner', cz: 'For-In běžec' },
          desc: { en: 'Pythonic loops mastered', cz: 'Pythonické cykly zvládnuty' }},
        { id: 'py_condition', icon: '\u{2753}', category: 'basic', cost: 45, lang: 'python',
          name: { en: 'If-Elif-Else Pro', cz: 'If-Elif-Else profík' },
          desc: { en: 'Conditions the Python way', cz: 'Podmínky po pythonovsku' }},

        // Python Intermediate (100-300)
        { id: 'python_tamer', icon: '\u{1F40D}', category: 'intermediate', cost: 100, lang: 'python',
          name: { en: 'Python Tamer', cz: 'Krotitel Pythonu' },
          desc: { en: 'Python bends to your will', cz: 'Python se podvoluje tvé vůli' }},
        { id: 'py_def_master', icon: '\u{1F9E9}', category: 'intermediate', cost: 110, lang: 'python',
          name: { en: 'Def Master', cz: 'Mistr def' },
          desc: { en: 'Functions with def are your power', cz: 'Funkce s def jsou tvá síla' }},
        { id: 'py_string_wizard', icon: '\u{1FA84}', category: 'intermediate', cost: 120, lang: 'python',
          name: { en: 'F-String Wizard', cz: 'Čaroděj f-stringů' },
          desc: { en: 'f"Mastered {formatting}!"', cz: 'f"Zvládl {formatování}!"' }},
        { id: 'py_list_ninja', icon: '\u{1F977}', category: 'intermediate', cost: 130, lang: 'python',
          name: { en: 'List Ninja', cz: 'Ninja listů' },
          desc: { en: 'Slicing lists like a pro', cz: 'Řežeš listy jako profík' }},
        { id: 'py_dict_master', icon: '\u{1F4D6}', category: 'intermediate', cost: 140, lang: 'python',
          name: { en: 'Dict Master', cz: 'Mistr slovníků' },
          desc: { en: 'Key-value pairs are your world', cz: 'Klíč-hodnota je tvůj svět' }},
        { id: 'py_comprehension', icon: '\u{1F4CB}', category: 'intermediate', cost: 160, lang: 'python',
          name: { en: 'Comprehension Pro', cz: 'Profík na comprehension' },
          desc: { en: 'One-liners that pack a punch', cz: 'Jednořádky plné síly' }},
        { id: 'py_error_handler', icon: '\u{1F6E1}', category: 'intermediate', cost: 150, lang: 'python',
          name: { en: 'Try-Except Hero', cz: 'Hrdina Try-Except' },
          desc: { en: 'Catching exceptions like a pro', cz: 'Chytáš výjimky jako profík' }},
        { id: 'py_debug', icon: '\u{1F575}', category: 'intermediate', cost: 170, lang: 'python',
          name: { en: 'PDB Detective', cz: 'PDB detektiv' },
          desc: { en: 'Debugging with Python debugger', cz: 'Debuguješ s Python debuggerem' }},
        { id: 'py_clean', icon: '\u{2728}', category: 'intermediate', cost: 180, lang: 'python',
          name: { en: 'PEP8 Champion', cz: 'PEP8 šampion' },
          desc: { en: 'Clean Pythonic code', cz: 'Čistý pythonický kód' }},
        { id: 'py_lambda', icon: '\u{03BB}', category: 'intermediate', cost: 190, lang: 'python',
          name: { en: 'Lambda Lover', cz: 'Milovník lambd' },
          desc: { en: 'Anonymous functions are elegant', cz: 'Anonymní funkce jsou elegantní' }},
        { id: 'py_tuple', icon: '\u{1F4E6}', category: 'intermediate', cost: 200, lang: 'python',
          name: { en: 'Tuple Packer', cz: 'Balič tuplů' },
          desc: { en: 'Immutable and proud of it', cz: 'Neměnné a hrdé na to' }},
        { id: 'py_oop', icon: '\u{1F3D7}', category: 'intermediate', cost: 220, lang: 'python',
          name: { en: 'Class Creator', cz: 'Tvůrce tříd' },
          desc: { en: 'self is your best friend', cz: 'self je tvůj nejlepší přítel' }},
        { id: 'py_pip', icon: '\u{1F4E6}', category: 'intermediate', cost: 250, lang: 'python',
          name: { en: 'Pip Master', cz: 'Mistr Pipu' },
          desc: { en: 'Managing packages like a pro', cz: 'Spravuješ balíčky jako profík' }},
        { id: 'py_git', icon: '\u{1F500}', category: 'intermediate', cost: 220, lang: 'python',
          name: { en: 'Git + Python', cz: 'Git + Python' },
          desc: { en: 'Version controlling your Python projects', cz: 'Verzuješ své Python projekty' }},
        { id: 'py_data', icon: '\u{1F4CA}', category: 'intermediate', cost: 300, lang: 'python',
          name: { en: 'Data Wrangler', cz: 'Krotitel dat' },
          desc: { en: 'Taming data with Python', cz: 'Krotíš data s Pythonem' }},

        // Python Advanced (500-1000)
        { id: 'py_decorator', icon: '\u{1F3AD}', category: 'advanced', cost: 500, lang: 'python',
          name: { en: 'Decorator Wizard', cz: 'Čaroděj dekorátorů' },
          desc: { en: '@mastered decorators', cz: '@zvládl dekorátory' }},
        { id: 'py_generator', icon: '\u{1F504}', category: 'advanced', cost: 550, lang: 'python',
          name: { en: 'Generator Guru', cz: 'Guru generátorů' },
          desc: { en: 'Yield is your superpower', cz: 'Yield je tvá superschopnost' }},
        { id: 'py_algorithm', icon: '\u{1F9EE}', category: 'advanced', cost: 600, lang: 'python',
          name: { en: 'Pythonic Algorithm', cz: 'Pythonický algoritmus' },
          desc: { en: 'Elegant algorithms in Python', cz: 'Elegantní algoritmy v Pythonu' }},
        { id: 'py_venv', icon: '\u{1F4E6}', category: 'advanced', cost: 650, lang: 'python',
          name: { en: 'Virtualenv Pro', cz: 'Virtualenv profík' },
          desc: { en: 'Isolated environments mastered', cz: 'Izolovaná prostředí zvládnuta' }},
        { id: 'py_pytest', icon: '\u{2705}', category: 'advanced', cost: 700, lang: 'python',
          name: { en: 'Pytest Hero', cz: 'Pytest hrdina' },
          desc: { en: 'Testing with pytest like a pro', cz: 'Testuješ s pytest jako profík' }},
        { id: 'py_pythonic', icon: '\u{1F40D}', category: 'advanced', cost: 750, lang: 'python',
          name: { en: 'The Pythonic Way', cz: 'Pythonický způsob' },
          desc: { en: 'Writing idiomatic Python', cz: 'Píšeš idiomatický Python' }},
        { id: 'py_inheritance', icon: '\u{1F451}', category: 'advanced', cost: 800, lang: 'python',
          name: { en: 'Inheritance Master', cz: 'Mistr dědičnosti' },
          desc: { en: 'OOP inheritance in Python', cz: 'OOP dědičnost v Pythonu' }},
        { id: 'py_jupyter', icon: '\u{1F4D3}', category: 'advanced', cost: 850, lang: 'python',
          name: { en: 'Jupyter Explorer', cz: 'Průzkumník Jupyteru' },
          desc: { en: 'Interactive notebooks mastered', cz: 'Interaktivní notebooky zvládnuty' }},
        { id: 'py_junior', icon: '\u{1F468}\u{200D}\u{1F4BB}', category: 'advanced', cost: 1000, lang: 'python',
          name: { en: 'Python Junior Dev', cz: 'Python Junior Dev' },
          desc: { en: 'Junior Python developer level!', cz: 'Úroveň junior Python developer!' }},

        // Python Legendary (1500-5000)
        { id: 'py_full_stack', icon: '\u{1F310}', category: 'legendary', cost: 1500, lang: 'python',
          name: { en: 'Django/Flask Vision', cz: 'Django/Flask vize' },
          desc: { en: 'Web development with Python', cz: 'Webový vývoj v Pythonu' }},
        { id: 'py_artist', icon: '\u{1F3A8}', category: 'legendary', cost: 1800, lang: 'python',
          name: { en: 'Python Artist', cz: 'Python umělec' },
          desc: { en: 'Beautiful Pythonic code', cz: 'Krásný pythonický kód' }},
        { id: 'py_mentor', icon: '\u{1F393}', category: 'legendary', cost: 2000, lang: 'python',
          name: { en: 'Python Mentor', cz: 'Python mentor' },
          desc: { en: 'Ready to teach Python', cz: 'Připraven učit Python' }},
        { id: 'py_pandas', icon: '\u{1F43C}', category: 'legendary', cost: 2500, lang: 'python',
          name: { en: 'Pandas Wrangler', cz: 'Krotitel Pandas' },
          desc: { en: 'Data analysis with Pandas', cz: 'Datová analýza s Pandas' }},
        { id: 'py_architect', icon: '\u{1F3DB}', category: 'legendary', cost: 3000, lang: 'python',
          name: { en: 'Python Architect', cz: 'Python architekt' },
          desc: { en: 'Designing systems in Python', cz: 'Navrhuje systémy v Pythonu' }},
        { id: 'py_grandmaster', icon: '\u{1F3C6}', category: 'legendary', cost: 4000, lang: 'python',
          name: { en: 'Python Grandmaster', cz: 'Python velmistr' },
          desc: { en: 'The pinnacle of Python mastery', cz: 'Vrchol mistrovství v Pythonu' }},
        { id: 'py_legend', icon: '\u{2B50}', category: 'legendary', cost: 5000, lang: 'python',
          name: { en: 'Python Legend', cz: 'Python legenda' },
          desc: { en: 'A true Python legend', cz: 'Skutečná Python legenda' }},

        // ============================================================
        // === C#-SPECIFIC BADGES ===
        // ============================================================

        // C# Basic (10-50)
        { id: 'cs_bug_finder', icon: '\u{1F41B}', category: 'basic', cost: 25, lang: 'csharp',
          name: { en: 'Bug Squasher', cz: 'Drtič bugů' },
          desc: { en: 'Found your first C# bug', cz: 'Našel jsi svůj první C# bug' }},
        { id: 'cs_curious', icon: '\u{1F50D}', category: 'basic', cost: 30, lang: 'csharp',
          name: { en: 'Curious Developer', cz: 'Zvědavý developer' },
          desc: { en: 'Always exploring C#', cz: 'Vždy zkoumáš C#' }},
        { id: 'cs_keyboard', icon: '\u{2328}', category: 'basic', cost: 40, lang: 'csharp',
          name: { en: 'Brace Master', cz: 'Mistr závorek' },
          desc: { en: 'Curly braces are your friends', cz: 'Složené závorky jsou tvůj přítel' }},
        { id: 'cs_variable', icon: '\u{1F4E6}', category: 'basic', cost: 40, lang: 'csharp',
          name: { en: 'Type Safety Pro', cz: 'Profík typové bezpečnosti' },
          desc: { en: 'Static typing mastered', cz: 'Statické typování zvládnuto' }},
        { id: 'cs_loop', icon: '\u{1F504}', category: 'basic', cost: 45, lang: 'csharp',
          name: { en: 'Foreach Runner', cz: 'Foreach běžec' },
          desc: { en: 'Loops the C# way', cz: 'Cykly po céšarpovsku' }},
        { id: 'cs_condition', icon: '\u{2753}', category: 'basic', cost: 45, lang: 'csharp',
          name: { en: 'Switch-Case Pro', cz: 'Switch-Case profík' },
          desc: { en: 'Conditions and pattern matching', cz: 'Podmínky a pattern matching' }},

        // C# Intermediate (100-300)
        { id: 'csharp_smith', icon: '\u{1F528}', category: 'intermediate', cost: 100, lang: 'csharp',
          name: { en: 'C# Smith', cz: 'C# kovář' },
          desc: { en: 'Forging code in C#', cz: 'Kováš kód v C#' }},
        { id: 'cs_method_master', icon: '\u{1F9E9}', category: 'intermediate', cost: 110, lang: 'csharp',
          name: { en: 'Method Master', cz: 'Mistr metod' },
          desc: { en: 'Methods with proper signatures', cz: 'Metody se správnými signaturami' }},
        { id: 'cs_string_wizard', icon: '\u{1FA84}', category: 'intermediate', cost: 120, lang: 'csharp',
          name: { en: 'String Interpolation Wizard', cz: 'Čaroděj interpolace' },
          desc: { en: '$"Mastered {interpolation}!"', cz: '$"Zvládl {interpolaci}!"' }},
        { id: 'cs_array_ninja', icon: '\u{1F977}', category: 'intermediate', cost: 130, lang: 'csharp',
          name: { en: 'Array & List Ninja', cz: 'Ninja polí a listů' },
          desc: { en: 'Collections mastered', cz: 'Kolekce zvládnuty' }},
        { id: 'cs_struct', icon: '\u{1F4D0}', category: 'intermediate', cost: 140, lang: 'csharp',
          name: { en: 'Struct Builder', cz: 'Stavitel structů' },
          desc: { en: 'Value types mastered', cz: 'Hodnotové typy zvládnuty' }},
        { id: 'cs_linq', icon: '\u{1F517}', category: 'intermediate', cost: 160, lang: 'csharp',
          name: { en: 'LINQ Master', cz: 'Mistr LINQ' },
          desc: { en: 'Querying data with elegance', cz: 'Dotazuješ data s elegancí' }},
        { id: 'cs_error_handler', icon: '\u{1F6E1}', category: 'intermediate', cost: 150, lang: 'csharp',
          name: { en: 'Try-Catch Guardian', cz: 'Strážce Try-Catch' },
          desc: { en: 'Exception handling mastered', cz: 'Zpracování výjimek zvládnuto' }},
        { id: 'cs_debug', icon: '\u{1F575}', category: 'intermediate', cost: 170, lang: 'csharp',
          name: { en: 'VS Debugger Pro', cz: 'VS Debugger profík' },
          desc: { en: 'Breakpoints are your best friend', cz: 'Breakpointy jsou tvůj přítel' }},
        { id: 'cs_clean', icon: '\u{2728}', category: 'intermediate', cost: 180, lang: 'csharp',
          name: { en: 'Clean C# Code', cz: 'Čistý C# kód' },
          desc: { en: 'Following C# conventions', cz: 'Dodržuješ C# konvence' }},
        { id: 'cs_property', icon: '\u{1F3E0}', category: 'intermediate', cost: 190, lang: 'csharp',
          name: { en: 'Property Pro', cz: 'Profík properties' },
          desc: { en: 'Get; set; mastered', cz: 'Get; set; zvládnuto' }},
        { id: 'cs_oop', icon: '\u{1F3D7}', category: 'intermediate', cost: 220, lang: 'csharp',
          name: { en: 'OOP Builder', cz: 'OOP stavitel' },
          desc: { en: 'Classes and objects everywhere', cz: 'Třídy a objekty všude' }},
        { id: 'cs_delegate', icon: '\u{1F4DE}', category: 'intermediate', cost: 240, lang: 'csharp',
          name: { en: 'Delegate Pro', cz: 'Profík delegátů' },
          desc: { en: 'Callbacks the C# way', cz: 'Callbacky po céšarpovsku' }},
        { id: 'cs_nuget', icon: '\u{1F4E6}', category: 'intermediate', cost: 250, lang: 'csharp',
          name: { en: 'NuGet Hunter', cz: 'Lovec NuGetů' },
          desc: { en: 'Managing NuGet packages', cz: 'Spravuješ NuGet balíčky' }},
        { id: 'cs_git', icon: '\u{1F500}', category: 'intermediate', cost: 220, lang: 'csharp',
          name: { en: 'Git + C#', cz: 'Git + C#' },
          desc: { en: 'Version controlling your C# projects', cz: 'Verzuješ své C# projekty' }},
        { id: 'cs_data', icon: '\u{1F4CA}', category: 'intermediate', cost: 300, lang: 'csharp',
          name: { en: 'Data Structure Master', cz: 'Mistr datových struktur' },
          desc: { en: 'Dictionary, HashSet, Queue...', cz: 'Dictionary, HashSet, Queue...' }},

        // C# Advanced (500-1000)
        { id: 'cs_async', icon: '\u{23F3}', category: 'advanced', cost: 500, lang: 'csharp',
          name: { en: 'Async Awaiter', cz: 'Asynchronní čekatel' },
          desc: { en: 'async/await is second nature', cz: 'async/await je tvá druhá přirozenost' }},
        { id: 'cs_generic', icon: '\u{1F9EC}', category: 'advanced', cost: 550, lang: 'csharp',
          name: { en: 'Generic Genius', cz: 'Génius generiků' },
          desc: { en: 'Generics<T> hold no secrets', cz: 'Generics<T> nemají tajemství' }},
        { id: 'cs_algorithm', icon: '\u{1F9EE}', category: 'advanced', cost: 600, lang: 'csharp',
          name: { en: 'C# Algorithm Pro', cz: 'C# algoritmus profík' },
          desc: { en: 'Efficient algorithms in C#', cz: 'Efektivní algoritmy v C#' }},
        { id: 'cs_interface', icon: '\u{1F4D0}', category: 'advanced', cost: 650, lang: 'csharp',
          name: { en: 'Interface Designer', cz: 'Návrhář rozhraní' },
          desc: { en: 'Designing with interfaces', cz: 'Navrhuje s rozhraními' }},
        { id: 'cs_event', icon: '\u{1F514}', category: 'advanced', cost: 700, lang: 'csharp',
          name: { en: 'Event Handler Pro', cz: 'Profík na eventy' },
          desc: { en: 'Events and delegates mastered', cz: 'Eventy a delegáty zvládnuty' }},
        { id: 'cs_pattern', icon: '\u{1F3A8}', category: 'advanced', cost: 750, lang: 'csharp',
          name: { en: 'Pattern Matcher', cz: 'Pattern Matcher' },
          desc: { en: 'C# pattern matching mastery', cz: 'Mistrovství v pattern matchingu' }},
        { id: 'cs_inheritance', icon: '\u{1F451}', category: 'advanced', cost: 800, lang: 'csharp',
          name: { en: 'Inheritance King', cz: 'Král dědičnosti' },
          desc: { en: 'OOP inheritance in C#', cz: 'OOP dědičnost v C#' }},
        { id: 'cs_nullable', icon: '\u{2754}', category: 'advanced', cost: 850, lang: 'csharp',
          name: { en: 'Nullable Ninja', cz: 'Nullable ninja' },
          desc: { en: 'Null safety mastered', cz: 'Null bezpečnost zvládnuta' }},
        { id: 'cs_junior', icon: '\u{1F468}\u{200D}\u{1F4BB}', category: 'advanced', cost: 1000, lang: 'csharp',
          name: { en: 'C# Junior Dev', cz: 'C# Junior Dev' },
          desc: { en: 'Junior C# developer level!', cz: 'Úroveň junior C# developer!' }},

        // C# Legendary (1500-5000)
        { id: 'cs_dotnet', icon: '\u{1F310}', category: 'legendary', cost: 1500, lang: 'csharp',
          name: { en: '.NET Knight', cz: '.NET rytíř' },
          desc: { en: 'A true .NET warrior', cz: 'Skutečný .NET bojovník' }},
        { id: 'cs_artist', icon: '\u{1F3A8}', category: 'legendary', cost: 1800, lang: 'csharp',
          name: { en: 'C# Artist', cz: 'C# umělec' },
          desc: { en: 'Beautiful C# code', cz: 'Krásný C# kód' }},
        { id: 'cs_mentor', icon: '\u{1F393}', category: 'legendary', cost: 2000, lang: 'csharp',
          name: { en: 'C# Mentor', cz: 'C# mentor' },
          desc: { en: 'Ready to teach C#', cz: 'Připraven učit C#' }},
        { id: 'cs_entity', icon: '\u{1F4BE}', category: 'legendary', cost: 2500, lang: 'csharp',
          name: { en: 'Entity Expert', cz: 'Expert na Entity' },
          desc: { en: 'Entity Framework mastered', cz: 'Entity Framework zvládnut' }},
        { id: 'cs_architect', icon: '\u{1F3DB}', category: 'legendary', cost: 3000, lang: 'csharp',
          name: { en: 'C# Architect', cz: 'C# architekt' },
          desc: { en: 'Designing .NET systems', cz: 'Navrhuje .NET systémy' }},
        { id: 'cs_grandmaster', icon: '\u{1F3C6}', category: 'legendary', cost: 4000, lang: 'csharp',
          name: { en: 'C# Grandmaster', cz: 'C# velmistr' },
          desc: { en: 'The pinnacle of C# mastery', cz: 'Vrchol mistrovství v C#' }},
        { id: 'cs_legend', icon: '\u{2B50}', category: 'legendary', cost: 5000, lang: 'csharp',
          name: { en: 'C# Legend', cz: 'C# legenda' },
          desc: { en: 'A true C# legend', cz: 'Skutečná C# legenda' }},
    ],

    // Get badges filtered by current programming language
    getFiltered() {
        const profile = Storage.getProfile();
        const progLang = profile.progLang || 'python';
        return this.catalog.filter(b => !b.lang || b.lang === progLang);
    },

    // Get all badges (filtered by language)
    getAll() {
        return this.getFiltered();
    },

    // Get badges by category (filtered by language)
    getByCategory(category) {
        const filtered = this.getFiltered();
        if (category === 'all') return filtered;
        return filtered.filter(b => b.category === category);
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
