/* Knowledge Map Module - Expandable topic map for lessons */
const KnowledgeMap = {
    // Curated tips per lesson ID (both languages)
    tips: {
        1: { en: ['Start with print() to see results immediately', 'Comments help others understand your code'], cz: ['Začni s print() pro okamžité výsledky', 'Komentáře pomáhají ostatním pochopit kód'] },
        2: { en: ['Use meaningful variable names', 'Python is dynamically typed - no need to declare types'], cz: ['Používej smysluplné názvy proměnných', 'Python je dynamicky typovaný - nemusíš deklarovat typy'] },
        3: { en: ['Always convert input() to the right type', 'F-strings are the modern way to format in Python'], cz: ['Vždy převeď input() na správný typ', 'F-stringy jsou moderní způsob formátování'] },
        4: { en: ['Use elif instead of multiple if statements', 'Keep conditions simple and readable'], cz: ['Používej elif místo více if příkazů', 'Podmínky piš jednoduše a čitelně'] },
        5: { en: ['Avoid infinite loops - always update the condition', 'Use for when you know the count, while when you don\'t'], cz: ['Vyhni se nekonečným cyklům - vždy aktualizuj podmínku', 'Používej for když znáš počet, while když ne'] },
        6: { en: ['Strings are immutable - methods return new strings', 'Use slicing for powerful string manipulation'], cz: ['Řetězce jsou neměnné - metody vrací nové', 'Používej řezy pro manipulaci s řetězci'] },
        7: { en: ['Lists are mutable, tuples are immutable', 'Use list comprehension for concise code'], cz: ['Seznamy jsou měnitelné, n-tice ne', 'Používej list comprehension pro stručný kód'] },
        8: { en: ['Functions should do one thing well', 'Use default parameters to make functions flexible'], cz: ['Funkce by měla dělat jednu věc dobře', 'Výchozí parametry dělají funkce flexibilní'] },
        9: { en: ['Dictionaries are fast for lookups by key', 'Sets automatically remove duplicates'], cz: ['Slovníky jsou rychlé pro vyhledávání', 'Množiny automaticky odstraní duplicity'] },
        10: { en: ['Always close files - use "with" statement', 'Handle encoding for international text'], cz: ['Vždy zavři soubory - použij "with"', 'Řeš kódování pro mezinárodní text'] },
        11: { en: ['Catch specific exceptions, not bare except', 'Use finally for cleanup code'], cz: ['Chytej specifické výjimky, ne holý except', 'Používej finally pro úklidový kód'] },
        12: { en: ['__init__ is the constructor, self is the instance', 'Keep classes focused on one responsibility'], cz: ['__init__ je konstruktor, self je instance', 'Třídy by měly mít jednu zodpovědnost'] },
        13: { en: ['Use super() to call parent methods', 'Prefer composition over deep inheritance'], cz: ['Používej super() pro volání rodičovských metod', 'Preferuj kompozici před hlubokou dědičností'] },
        14: { en: ['@property makes attributes look like methods', 'Magic methods customize class behavior'], cz: ['@property dělá z atributů metody', 'Magic metody přizpůsobují chování tříd'] },
        15: { en: ['Generators save memory for large datasets', 'List comprehensions are faster than map+lambda'], cz: ['Generátory šetří paměť u velkých dat', 'Comprehension je rychlejší než map+lambda'] },
        16: { en: ['Use __name__ == "__main__" guard', 'Keep imports at the top of the file'], cz: ['Používej __name__ == "__main__" ochranu', 'Importy dávej na začátek souboru'] },
        17: { en: ['Built-in sort() uses TimSort - very efficient', 'Binary search requires a sorted array'], cz: ['Vestavěný sort() používá TimSort - velmi efektivní', 'Binární hledání vyžaduje seřazené pole'] },
        18: { en: ['Stack = LIFO (last in, first out)', 'Queue = FIFO (first in, first out)'], cz: ['Zásobník = LIFO (poslední dovnitř, první ven)', 'Fronta = FIFO (první dovnitř, první ven)'] },
        19: { en: ['Always handle division by zero', 'Test edge cases: 0, negative numbers, large values'], cz: ['Vždy ošetři dělení nulou', 'Testuj okrajové případy: 0, záporná čísla, velké hodnoty'] },
        20: { en: ['Break big problems into small functions', 'Plan your class structure before coding'], cz: ['Rozděl velké problémy na malé funkce', 'Naplánuj strukturu tříd před kódováním'] },
        21: { en: ['Every recursion needs a base case', 'Watch out for stack overflow with deep recursion'], cz: ['Každá rekurze potřebuje základní případ', 'Pozor na přetečení zásobníku u hluboké rekurze'] },
        22: { en: ['Lambda is best for short, one-line functions', 'reduce() combines all elements into one value'], cz: ['Lambda je nejlepší pro krátké jednořádkové funkce', 'reduce() kombinuje všechny prvky do jedné hodnoty'] },
        23: { en: ['UPPER_CASE signals constants in Python', 'Enums prevent magic numbers in your code'], cz: ['VELKÁ_PÍSMENA signalizují konstanty v Pythonu', 'Enumy zabraňují magickým číslům v kódu'] },
        24: { en: ['Type hints help IDEs catch errors early', 'Use Optional for values that can be None'], cz: ['Typové hinty pomáhají IDE zachytit chyby', 'Používej Optional pro hodnoty co mohou být None'] },
        25: { en: ['Regex is powerful but can be hard to read', 'Use raw strings r"..." for regex patterns'], cz: ['Regex je mocný ale těžko čitelný', 'Používej raw stringy r"..." pro regex vzory'] },
        26: { en: ['Decorators wrap functions without changing them', 'Use @functools.wraps to preserve function metadata'], cz: ['Dekorátory obalují funkce bez jejich změny', 'Používej @functools.wraps pro zachování metadat'] },
        27: { en: ['Use tuple unpacking for multiple return values', 'Named tuples are more readable than plain tuples'], cz: ['Používej rozbalování n-tic pro více návratových hodnot', 'Pojmenované n-tice jsou čitelnější'] },
        28: { en: ['Iterators are memory efficient for large data', 'Use itertools for advanced iteration patterns'], cz: ['Iterátory jsou paměťově efektivní pro velká data', 'Používej itertools pro pokročilé vzory iterace'] },
        29: { en: ['Use json.dumps(indent=2) for readable output', 'Always handle JSONDecodeError for invalid data'], cz: ['Používej json.dumps(indent=2) pro čitelný výstup', 'Vždy ošetři JSONDecodeError pro neplatná data'] },
        30: { en: ['Plan your project structure before coding', 'Version control your hackathon projects'], cz: ['Naplánuj strukturu projektu před kódováním', 'Verzuj své hackathon projekty'] },
        31: { en: ['Factory separates object creation from usage', 'Singleton should be used sparingly'], cz: ['Továrna odděluje vytváření objektů od použití', 'Singleton používej střídmě'] },
        32: { en: ['Observer decouples event producers from consumers', 'Strategy lets you swap algorithms at runtime'], cz: ['Observer odděluje producenty událostí od konzumentů', 'Strategy umožňuje měnit algoritmy za běhu'] },
        33: { en: ['Create custom exceptions for domain-specific errors', 'Context managers prevent resource leaks'], cz: ['Vytváření vlastních výjimek pro specifické chyby', 'Kontextové manažery zabraňují únikům zdrojů'] },
        34: { en: ['Async is best for I/O-bound tasks', 'Don\'t mix sync and async code carelessly'], cz: ['Async je nejlepší pro I/O operace', 'Nemíchej sync a async kód bezhlavě'] },
        35: { en: ['Write tests before fixing bugs (TDD)', 'Test edge cases and error conditions'], cz: ['Piš testy před opravou chyb (TDD)', 'Testuj okrajové případy a chybové stavy'] },
        36: { en: ['Start with O(n) analysis, then optimize', 'Space complexity matters too, not just time'], cz: ['Začni s O(n) analýzou, pak optimalizuj', 'Paměťová složitost je také důležitá'] },
        37: { en: ['Linked lists excel at frequent insertions', 'Trees are great for hierarchical data'], cz: ['Spojové seznamy excelují v častém vkládání', 'Stromy jsou skvělé pro hierarchická data'] },
        38: { en: ['BFS explores level by level, DFS goes deep first', 'Use adjacency list for sparse graphs'], cz: ['BFS prochází po úrovních, DFS jde do hloubky', 'Používej seznam sousedů pro řídké grafy'] },
        39: { en: ['Dynamic programming trades memory for speed', 'Always identify the base case and recurrence'], cz: ['Dynamické programování mění paměť za rychlost', 'Vždy identifikuj základní případ a rekurenci'] },
        40: { en: ['Use OOP to model real-world entities', 'Keep classes small and focused'], cz: ['Použij OOP pro modelování reálných entit', 'Třídy drž malé a zaměřené'] },
        41: { en: ['Use a menu loop pattern for CLI apps', 'Validate all user input at the boundary'], cz: ['Používej vzor menu smyčky pro CLI aplikace', 'Validuj všechny vstupy na hranici systému'] },
        42: { en: ['REST APIs use HTTP verbs for CRUD', 'Always return proper status codes'], cz: ['REST API používá HTTP slovesa pro CRUD', 'Vždy vracej správné stavové kódy'] },
        43: { en: ['SQL injection is a top security threat', 'Use parameterized queries, never string concat'], cz: ['SQL injection je hlavní bezpečnostní hrozba', 'Používej parametrizované dotazy, nikdy string concat'] },
        44: { en: ['Use print() and breakpoints to debug', 'Read error messages carefully - they tell you what\'s wrong'], cz: ['Používej print() a breakpointy pro ladění', 'Čti chybové zprávy pozorně - říkají co je špatně'] },
        45: { en: ['Code review catches bugs before they ship', 'Review for readability, not just correctness'], cz: ['Code review zachytí chyby před nasazením', 'Kontroluj čitelnost, ne jen správnost'] },
        46: { en: ['Start with the simplest solution that works', 'Plan before coding - whiteboard your design'], cz: ['Začni nejjednodušším řešením co funguje', 'Plánuj před kódováním - nakresli si design'] },
        47: { en: ['Follow PEP 8 for Python style', 'Consistent naming makes code more readable'], cz: ['Dodržuj PEP 8 pro styl Pythonu', 'Konzistentní pojmenování zlepšuje čitelnost'] },
        48: { en: ['Git commit often with clear messages', 'Branch for features, merge when done'], cz: ['Commituj často s jasnými zprávami', 'Větev pro funkce, merge po dokončení'] },
        49: { en: ['Security is not optional - build it in from the start', 'Never trust user input'], cz: ['Bezpečnost není volitelná - zabuduj ji od začátku', 'Nikdy nevěř uživatelskému vstupu'] },
        50: { en: ['Build something you\'re passionate about', 'Ship early, iterate often'], cz: ['Postav něco, co tě baví', 'Vypusť brzy, iteruj často'] }
    },

    // Icons per difficulty level
    diffIcons: { 1: '\u{1F331}', 2: '\u{1F33F}', 3: '\u{1F333}', 4: '\u{1F3D4}', 5: '\u{1F680}' },

    // Extract key concepts from lesson HTML content
    extractConcepts(html) {
        if (!html) return [];
        const concepts = [];
        // Extract h2 headings as main topics
        const h2Regex = /<h2>(.*?)<\/h2>/gi;
        let match;
        while ((match = h2Regex.exec(html)) !== null) {
            concepts.push(match[1].replace(/<[^>]*>/g, '').trim());
        }
        // Extract inline code terms
        const codeTerms = new Set();
        const codeRegex = /<code[^>]*>(.*?)<\/code>/gi;
        while ((match = codeRegex.exec(html)) !== null) {
            const term = match[1].replace(/<[^>]*>/g, '').trim();
            if (term.length > 1 && term.length < 30 && !term.includes('\n')) {
                codeTerms.add(term);
            }
        }
        return { headings: concepts, codeTerms: [...codeTerms].slice(0, 12) };
    },

    // Extract a short code example from lesson content
    extractExample(html, lang) {
        if (!html) return null;
        const preRegex = /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i;
        const match = preRegex.exec(html);
        if (!match) return null;
        let code = match[1]
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
            .replace(/\\n/g, '\n').trim();
        // Limit to first 6 lines
        const lines = code.split('\n');
        if (lines.length > 6) code = lines.slice(0, 6).join('\n') + '\n...';
        return code;
    },

    // Get related lesson IDs (prev + next)
    getRelated(lessonId) {
        const related = [];
        if (lessonId > 1) related.push(lessonId - 1);
        const total = typeof Lessons !== 'undefined' ? Lessons.getTotalCount() : 20;
        if (lessonId < total) related.push(lessonId + 1);
        return related;
    },

    render(containerId, lessonId, progLang, uiLang) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const cz = uiLang === 'cz';
        const lesson = typeof Lessons !== 'undefined' ? Lessons.getLesson(lessonId) : null;
        if (!lesson) { container.innerHTML = ''; return; }

        const content = Lessons.getContent(lesson, progLang, uiLang);
        const title = Lessons.getTitle(lesson, progLang, uiLang);
        const { headings, codeTerms } = this.extractConcepts(content);
        const example = this.extractExample(content, progLang);
        const tips = this.tips[lessonId] ? this.tips[lessonId][uiLang] || this.tips[lessonId].en : [];
        const icon = this.diffIcons[lesson.difficulty] || '\u{1F4D6}';

        let html = '<div class="knowledge-map">';
        html += '<div class="knowledge-map-header" onclick="KnowledgeMap.toggle(this)">';
        html += '<span>' + icon + '</span> ';
        html += '<span>' + (cz ? 'Mapa znalostí' : 'Knowledge Map') + ' — ' + this.escHtml(title) + '</span>';
        html += '<span class="knowledge-map-toggle">\u25BC</span>';
        html += '</div>';
        html += '<div class="knowledge-map-body" id="km-body-' + lessonId + '">';

        // Topics section (from h2 headings)
        if (headings.length > 0) {
            html += '<div class="km-topic">';
            html += '<div class="km-topic-header" onclick="KnowledgeMap.toggleTopic(this)">';
            html += '<span class="km-icon">\u{1F4CB}</span> ';
            html += (cz ? 'Témata lekce' : 'Lesson Topics');
            html += '<span class="km-arrow">\u25BC</span></div>';
            html += '<div class="km-topic-body"><div class="km-items">';
            headings.forEach(function(h) {
                html += '<span class="km-chip">' + KnowledgeMap.escHtml(h) + '</span>';
            });
            html += '</div></div></div>';
        }

        // Key concepts / code terms
        if (codeTerms.length > 0) {
            html += '<div class="km-topic">';
            html += '<div class="km-topic-header" onclick="KnowledgeMap.toggleTopic(this)">';
            html += '<span class="km-icon">\u{1F4BB}</span> ';
            html += (cz ? 'Klíčové pojmy' : 'Key Concepts');
            html += '<span class="km-arrow">\u25BC</span></div>';
            html += '<div class="km-topic-body"><div class="km-items">';
            codeTerms.forEach(function(t) {
                html += '<span class="km-chip"><code>' + KnowledgeMap.escHtml(t) + '</code></span>';
            });
            html += '</div></div></div>';
        }

        // Tips section
        if (tips.length > 0) {
            html += '<div class="km-topic">';
            html += '<div class="km-topic-header" onclick="KnowledgeMap.toggleTopic(this)">';
            html += '<span class="km-icon">\u{1F4A1}</span> ';
            html += (cz ? 'Tipy' : 'Tips');
            html += '<span class="km-arrow">\u25BC</span></div>';
            html += '<div class="km-topic-body"><div class="km-items">';
            tips.forEach(function(tip) {
                html += '<span class="km-chip km-chip-tip">' + KnowledgeMap.escHtml(tip) + '</span>';
            });
            html += '</div></div></div>';
        }

        // Code example
        if (example) {
            html += '<div class="km-topic">';
            html += '<div class="km-topic-header" onclick="KnowledgeMap.toggleTopic(this)">';
            html += '<span class="km-icon">\u{1F4DD}</span> ';
            html += (cz ? 'Ukázka kódu' : 'Code Example');
            html += '<span class="km-arrow">\u25BC</span></div>';
            html += '<div class="km-topic-body">';
            html += '<pre class="km-code-example"><code>' + this.escHtml(example) + '</code></pre>';
            html += '</div></div>';
        }

        // Related lessons
        const related = this.getRelated(lessonId);
        if (related.length > 0) {
            html += '<div class="km-topic">';
            html += '<div class="km-topic-header" onclick="KnowledgeMap.toggleTopic(this)">';
            html += '<span class="km-icon">\u{1F517}</span> ';
            html += (cz ? 'Související lekce' : 'Related Lessons');
            html += '<span class="km-arrow">\u25BC</span></div>';
            html += '<div class="km-topic-body"><div class="km-items">';
            related.forEach(function(rid) {
                var rl = typeof Lessons !== 'undefined' ? Lessons.getLesson(rid) : null;
                if (rl) {
                    var rt = Lessons.getTitle(rl, progLang, uiLang);
                    var ri = KnowledgeMap.diffIcons[rl.difficulty] || '';
                    html += '<a href="#lesson/' + rid + '" class="km-chip" style="text-decoration:none">' + ri + ' ' + KnowledgeMap.escHtml(rt) + '</a>';
                }
            });
            html += '</div></div></div>';
        }

        html += '</div></div>';
        container.innerHTML = html;
    },

    toggle(headerEl) {
        const body = headerEl.nextElementSibling;
        const arrow = headerEl.querySelector('.knowledge-map-toggle');
        if (body.classList.contains('open')) {
            body.classList.remove('open');
            if (arrow) arrow.textContent = '\u25BC';
        } else {
            body.classList.add('open');
            if (arrow) arrow.textContent = '\u25B2';
        }
    },

    toggleTopic(headerEl) {
        const topic = headerEl.parentElement;
        topic.classList.toggle('open');
    },

    escHtml(text) {
        return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
};
