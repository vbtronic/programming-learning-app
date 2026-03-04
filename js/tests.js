/* Tests Module - 20 tests + assessment + evaluation */
const Tests = {
// Assessment tasks (10 tasks per language)
assessment: {
python: [
{id:1,difficulty:'beginner',starter:'\n',expected:'Hello World',keywords:['print']},
{id:2,difficulty:'beginner',starter:'\n',expected:'42',keywords:['print','+']},
{id:3,difficulty:'beginner',starter:'\n',expected:'even',keywords:['if','%']},
{id:4,difficulty:'intermediate',starter:'\n',expected:'1\n2\n3\n4\n5\n6\n7\n8\n9\n10',keywords:['for','range','print']},
{id:5,difficulty:'intermediate',starter:'def factorial(n):\n    pass\n',expected:'120',keywords:['def','factorial','return']},
{id:6,difficulty:'intermediate',starter:'nums = [3, 1, 4, 1, 5, 9]\n',expected:'[1, 1, 3, 4, 5, 9]',keywords:['sort','print']},
{id:7,difficulty:'advanced',starter:'\n',expected:null,keywords:['dict',':','for','print']},
{id:8,difficulty:'advanced',starter:'class Rectangle:\n    pass\n',expected:'15',keywords:['class','def','self','area']},
{id:9,difficulty:'advanced',starter:'class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n',expected:'Woof!',keywords:['class','def','speak','Dog','Animal']},
{id:10,difficulty:'advanced',starter:'def bubble_sort(arr):\n    pass\n',expected:'[11, 12, 22, 25, 34, 64, 90]',keywords:['def','for','if','swap']}
],
csharp: [
{id:1,difficulty:'beginner',starter:'\n',expected:'Hello World',keywords:['Console.WriteLine']},
{id:2,difficulty:'beginner',starter:'\n',expected:'42',keywords:['Console.WriteLine','+']},
{id:3,difficulty:'beginner',starter:'\n',expected:'even',keywords:['if','%']},
{id:4,difficulty:'intermediate',starter:'\n',expected:'1\n2\n3\n4\n5\n6\n7\n8\n9\n10',keywords:['for','Console.WriteLine']},
{id:5,difficulty:'intermediate',starter:'int Factorial(int n) {\n    return 0;\n}\n',expected:'120',keywords:['Factorial','return']},
{id:6,difficulty:'intermediate',starter:'var nums = new List<int> {3, 1, 4, 1, 5, 9};\n',expected:null,keywords:['List','Sort','Console']},
{id:7,difficulty:'advanced',starter:'\n',expected:null,keywords:['Dictionary','foreach','Console']},
{id:8,difficulty:'advanced',starter:'class Rectangle {\n}\n',expected:'15',keywords:['class','Rectangle','Area']},
{id:9,difficulty:'advanced',starter:'class Animal {\n}\n\nclass Dog : Animal {\n}\n',expected:'Woof!',keywords:['class','override','Speak','Dog']},
{id:10,difficulty:'advanced',starter:'void BubbleSort(int[] arr) {\n}\n',expected:null,keywords:['BubbleSort','for','if']}
]},

// Lesson tests (20 tests)
lessonTests: {
python: [
{id:1,title:{en:'Print Basics',cz:'Základy výpisu'},desc:{en:'Print "Hello World" on line 1, then print the result of 7 * 6 on line 2.',cz:'Vypiš "Hello World" na řádek 1, pak výsledek 7 * 6 na řádek 2.'},starter:'# Your code here\n',expected:'Hello World\n42',keywords:['print'],maxScore:100},
{id:2,title:{en:'Variable Operations',cz:'Operace s proměnnými'},desc:{en:'Create variables a=10, b=3. Print their sum, difference, and product on separate lines.',cz:'Vytvoř proměnné a=10, b=3. Vypiš jejich součet, rozdíl a součin na samostatné řádky.'},starter:'a = 10\nb = 3\n# Print sum, difference, product\n',expected:'13\n7\n30',keywords:['print','+','-','*'],maxScore:100},
{id:3,title:{en:'String Formatting',cz:'Formátování řetězců'},desc:{en:'Create name="Alice", age=25. Print: "Alice is 25 years old" using f-string.',cz:'Vytvoř name="Alice", age=25. Vypiš: "Alice is 25 years old" pomocí f-stringu.'},starter:'name = "Alice"\nage = 25\n# Print formatted string\n',expected:'Alice is 25 years old',keywords:['print','f"'],maxScore:100},
{id:4,title:{en:'Grade Checker',cz:'Kontrola známek'},desc:{en:'Write code: if score=85, print "A" for >=90, "B" for >=80, "C" for >=70, else "F".',cz:'Napiš kód: pokud score=85, vypiš "A" pro >=90, "B" pro >=80, "C" pro >=70, jinak "F".'},starter:'score = 85\n# Check grade and print\n',expected:'B',keywords:['if','elif','print'],maxScore:100},
{id:5,title:{en:'Sum 1 to N',cz:'Součet 1 až N'},desc:{en:'Calculate and print the sum of numbers from 1 to 100 using a loop.',cz:'Vypočítej a vypiš součet čísel od 1 do 100 pomocí cyklu.'},starter:'# Sum 1 to 100\n',expected:'5050',keywords:['for','range','print'],maxScore:100},
{id:6,title:{en:'Reverse String',cz:'Obrať řetězec'},desc:{en:'Reverse the string "Python" and print it.',cz:'Obrať řetězec "Python" a vypiš ho.'},starter:'text = "Python"\n# Reverse and print\n',expected:'nohtyP',keywords:['print'],maxScore:100},
{id:7,title:{en:'List Average',cz:'Průměr seznamu'},desc:{en:'Calculate and print the average of [10, 20, 30, 40, 50].',cz:'Vypočítej a vypiš průměr seznamu [10, 20, 30, 40, 50].'},starter:'numbers = [10, 20, 30, 40, 50]\n# Calculate and print average\n',expected:'30.0',keywords:['sum','len','print'],maxScore:100},
{id:8,title:{en:'Max Finder Function',cz:'Funkce pro maximum'},desc:{en:'Write a function find_max(lst) that returns the maximum. Test with [3,7,1,9,4].',cz:'Napiš funkci find_max(lst) vracející maximum. Otestuj s [3,7,1,9,4].'},starter:'def find_max(lst):\n    # Your code\n    pass\n\nprint(find_max([3, 7, 1, 9, 4]))\n',expected:'9',keywords:['def','return','max'],maxScore:100},
{id:9,title:{en:'Word Counter',cz:'Počítadlo slov'},desc:{en:'Count how many times each word appears in "the cat sat on the mat the cat". Print the counts.',cz:'Spočítej kolikrát se každé slovo vyskytuje v "the cat sat on the mat the cat". Vypiš počty.'},starter:'text = "the cat sat on the mat the cat"\n# Count words\n',expected:null,keywords:['split','dict','for','print'],maxScore:100},
{id:10,title:{en:'File Simulator',cz:'Simulátor souborů'},desc:{en:'Given content="Name: Alice\\nAge: 25\\nCity: Prague", parse each line and print key-value pairs.',cz:'Z content="Name: Alice\\nAge: 25\\nCity: Prague" parsuj řádky a vypiš páry.'},starter:'content = "Name: Alice\\nAge: 25\\nCity: Prague"\n# Parse and print\n',expected:'Name: Alice\nAge: 25\nCity: Prague',keywords:['split','for','print'],maxScore:100},
{id:11,title:{en:'Safe Division',cz:'Bezpečné dělení'},desc:{en:'Write safe_divide(a,b) that returns result or "Error" for zero division. Test: 10/2 and 10/0.',cz:'Napiš safe_divide(a,b) vracející výsledek nebo "Error" pro dělení nulou. Test: 10/2 a 10/0.'},starter:'def safe_divide(a, b):\n    # Your code\n    pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\n',expected:'5.0\nError',keywords:['try','except','return'],maxScore:100},
{id:12,title:{en:'Animal Classes',cz:'Třídy zvířat'},desc:{en:'Create class Dog with name and bark() returning "Woof!". Create rex = Dog("Rex"), print name and bark.',cz:'Vytvoř třídu Dog s name a bark() vracející "Woof!". Vytvoř rex = Dog("Rex"), vypiš jméno a bark.'},starter:'# Create Dog class\n\n',expected:null,keywords:['class','def','self','__init__'],maxScore:100},
{id:13,title:{en:'Shape Hierarchy',cz:'Hierarchie tvarů'},desc:{en:'Create Shape base class, Circle(Shape) with area(). Print area of circle with radius 5.',cz:'Vytvoř základní třídu Shape, Circle(Shape) s area(). Vypiš obsah kruhu s poloměrem 5.'},starter:'import math\n\n# Create classes\n',expected:null,keywords:['class','def','area','Circle'],maxScore:100},
{id:14,title:{en:'Property & Magic',cz:'Property a magic'},desc:{en:'Create class Temperature with celsius property. Add __str__ returning "X°C". Test with 100.',cz:'Vytvoř třídu Temperature s property celsius. Přidej __str__ vracející "X°C". Testuj se 100.'},starter:'# Create Temperature class\n',expected:null,keywords:['class','@property','__str__'],maxScore:100},
{id:15,title:{en:'Comprehension Challenge',cz:'Comprehension výzva'},desc:{en:'Using list comprehension: create squares of even numbers from 1-20. Print the list.',cz:'Pomocí list comprehension: vytvoř čtverce sudých čísel z 1-20. Vypiš seznam.'},starter:'# List comprehension\n',expected:'[4, 16, 36, 64, 100, 144, 196, 256, 324, 400]',keywords:['for','if','**'],maxScore:100},
{id:16,title:{en:'Module Usage',cz:'Použití modulů'},desc:{en:'Import math. Print sqrt(144), pi rounded to 2 decimals, and factorial(6).',cz:'Importuj math. Vypiš sqrt(144), pi zaokrouhlené na 2 desetinná místa a factorial(6).'},starter:'import math\n# Your code\n',expected:'12.0\n3.14\n720',keywords:['math','sqrt','pi','factorial'],maxScore:100},
{id:17,title:{en:'Implement Selection Sort',cz:'Implementuj Selection Sort'},desc:{en:'Implement selection_sort(arr). Sort [64,25,12,22,11] and print result.',cz:'Implementuj selection_sort(arr). Seřaď [64,25,12,22,11] a vypiš výsledek.'},starter:'def selection_sort(arr):\n    # Your code\n    pass\n\nprint(selection_sort([64, 25, 12, 22, 11]))\n',expected:'[11, 12, 22, 25, 64]',keywords:['def','for','min'],maxScore:100},
{id:18,title:{en:'Stack Implementation',cz:'Implementace zásobníku'},desc:{en:'Implement Stack class with push, pop, peek, size. Push 1,2,3 then pop and print.',cz:'Implementuj Stack s push, pop, peek, size. Push 1,2,3, pak pop a vypiš.'},starter:'class Stack:\n    # Your code\n    pass\n\ns = Stack()\ns.push(1)\ns.push(2)\ns.push(3)\nprint(s.pop())\nprint(s.peek())\nprint(s.size())\n',expected:'3\n2\n2',keywords:['class','def','append','pop'],maxScore:100},
{id:19,title:{en:'Calculator Function',cz:'Funkce kalkulačky'},desc:{en:'Write calc(expr) that evaluates "10 + 5", "8 * 3", "20 / 4". Print results.',cz:'Napiš calc(expr) vyhodnocující "10 + 5", "8 * 3", "20 / 4". Vypiš výsledky.'},starter:'def calc(expr):\n    # Your code\n    pass\n\nprint(calc("10 + 5"))\nprint(calc("8 * 3"))\nprint(calc("20 / 4"))\n',expected:'15.0\n24.0\n5.0',keywords:['def','split','float','return'],maxScore:100},
{id:20,title:{en:'Task Manager',cz:'Správce úkolů'},desc:{en:'Create TaskManager with add(title), complete(i), show(). Add 2 tasks, complete first, show all.',cz:'Vytvoř TaskManager s add(title), complete(i), show(). Přidej 2 úkoly, dokonči první, zobraz.'},starter:'class TaskManager:\n    # Your code\n    pass\n\ntm = TaskManager()\ntm.add("Learn Python")\ntm.add("Build project")\ntm.complete(0)\ntm.show()\n',expected:null,keywords:['class','def','self','append'],maxScore:100}
],
csharp: [
{id:1,title:{en:'Print Basics',cz:'Základy výpisu'},desc:{en:'Print "Hello World" then print 7 * 6.',cz:'Vypiš "Hello World" a pak 7 * 6.'},starter:'// Your code here\n',expected:'Hello World\n42',keywords:['Console.WriteLine'],maxScore:100},
{id:2,title:{en:'Variable Operations',cz:'Operace s proměnnými'},desc:{en:'Create a=10, b=3. Print sum, difference, product.',cz:'Vytvoř a=10, b=3. Vypiš součet, rozdíl, součin.'},starter:'int a = 10;\nint b = 3;\n// Print sum, diff, product\n',expected:'13\n7\n30',keywords:['Console.WriteLine','+','-','*'],maxScore:100},
{id:3,title:{en:'String Formatting',cz:'Formátování'},desc:{en:'Create name="Alice", age=25. Print "Alice is 25 years old" using interpolation.',cz:'Vytvoř name="Alice", age=25. Vypiš "Alice is 25 years old".'},starter:'string name = "Alice";\nint age = 25;\n// Print\n',expected:'Alice is 25 years old',keywords:['Console.WriteLine','$"'],maxScore:100},
{id:4,title:{en:'Grade Checker',cz:'Kontrola známek'},desc:{en:'Score=85: print "A" >=90, "B" >=80, "C" >=70, else "F".',cz:'Score=85: vypiš "A" >=90, "B" >=80, "C" >=70, jinak "F".'},starter:'int score = 85;\n// Check and print\n',expected:'B',keywords:['if','else','Console'],maxScore:100},
{id:5,title:{en:'Sum 1 to N',cz:'Součet 1 až N'},desc:{en:'Print sum of 1 to 100 using a loop.',cz:'Vypiš součet 1 až 100 cyklem.'},starter:'// Sum 1 to 100\n',expected:'5050',keywords:['for','Console.WriteLine'],maxScore:100},
{id:6,title:{en:'Reverse String',cz:'Obrať řetězec'},desc:{en:'Reverse "CSharp" and print.',cz:'Obrať "CSharp" a vypiš.'},starter:'string text = "CSharp";\n// Reverse and print\n',expected:'prahSC',keywords:['Console.WriteLine'],maxScore:100},
{id:7,title:{en:'List Average',cz:'Průměr seznamu'},desc:{en:'Calculate average of {10,20,30,40,50} and print.',cz:'Vypočítej průměr {10,20,30,40,50} a vypiš.'},starter:'int[] numbers = {10, 20, 30, 40, 50};\n// Calculate and print average\n',expected:'30',keywords:['Console.WriteLine'],maxScore:100},
{id:8,title:{en:'Max Finder',cz:'Hledač maxima'},desc:{en:'Write FindMax method for array. Test with {3,7,1,9,4}.',cz:'Napiš metodu FindMax pro pole. Testuj s {3,7,1,9,4}.'},starter:'// FindMax method\n\nint[] arr = {3, 7, 1, 9, 4};\n// Print max\n',expected:'9',keywords:['FindMax','return','Console'],maxScore:100},
{id:9,title:{en:'Word Counter',cz:'Počítadlo slov'},desc:{en:'Count words in "the cat sat on the mat the cat". Print counts.',cz:'Spočítej slova v "the cat sat on the mat the cat".'},starter:'string text = "the cat sat on the mat the cat";\n// Count and print\n',expected:null,keywords:['Split','Dictionary','foreach'],maxScore:100},
{id:10,title:{en:'Line Parser',cz:'Parsování řádků'},desc:{en:'Parse "Name: Alice\\nAge: 25\\nCity: Prague" and print each line.',cz:'Parsuj "Name: Alice\\nAge: 25\\nCity: Prague" a vypiš.'},starter:'string content = "Name: Alice\\nAge: 25\\nCity: Prague";\n// Parse and print\n',expected:'Name: Alice\nAge: 25\nCity: Prague',keywords:['Split','foreach','Console'],maxScore:100},
{id:11,title:{en:'Safe Division',cz:'Bezpečné dělení'},desc:{en:'SafeDivide(a,b) returning string. Test 10/2 and 10/0.',cz:'SafeDivide(a,b) vracející string. Test 10/2 a 10/0.'},starter:'// SafeDivide method\n',expected:'5\nError',keywords:['try','catch','Console'],maxScore:100},
{id:12,title:{en:'Dog Class',cz:'Třída Pes'},desc:{en:'Create Dog class with Name and Bark(). Print rex.Bark().',cz:'Vytvoř třídu Dog s Name a Bark(). Vypiš rex.Bark().'},starter:'// Dog class\n',expected:null,keywords:['class','public','Bark'],maxScore:100},
{id:13,title:{en:'Shape Hierarchy',cz:'Hierarchie tvarů'},desc:{en:'Shape base, Circle : Shape with Area(). Print area r=5.',cz:'Základní Shape, Circle : Shape s Area(). Vypiš obsah r=5.'},starter:'// Create classes\n',expected:null,keywords:['class','override','Area','Circle'],maxScore:100},
{id:14,title:{en:'Generic Box',cz:'Generická krabice'},desc:{en:'Create Box<T> with Value property. Test with int and string.',cz:'Vytvoř Box<T> s Value property. Testuj s int a string.'},starter:'// Generic Box class\n',expected:null,keywords:['class','Box','<T>','Value'],maxScore:100},
{id:15,title:{en:'LINQ Challenge',cz:'LINQ výzva'},desc:{en:'From {1..20}, get even numbers squared. Print.',cz:'Z {1..20} získej sudá čísla na druhou. Vypiš.'},starter:'int[] nums = Enumerable.Range(1, 20).ToArray();\n// LINQ query\n',expected:null,keywords:['Where','Select','Console'],maxScore:100},
{id:16,title:{en:'Namespace Usage',cz:'Použití jmenných prostorů'},desc:{en:'Print Math.Sqrt(144), Math.PI rounded to 2 dec, Math.Pow(2,10).',cz:'Vypiš Math.Sqrt(144), Math.PI na 2 des., Math.Pow(2,10).'},starter:'// Your code\n',expected:'12\n3.14\n1024',keywords:['Math','Console.WriteLine'],maxScore:100},
{id:17,title:{en:'Selection Sort',cz:'Selection Sort'},desc:{en:'Implement SelectionSort for int[]. Sort {64,25,12,22,11}.',cz:'Implementuj SelectionSort. Seřaď {64,25,12,22,11}.'},starter:'// SelectionSort method\n\nint[] arr = {64, 25, 12, 22, 11};\n// Sort and print\n',expected:'11 12 22 25 64',keywords:['SelectionSort','for','if'],maxScore:100},
{id:18,title:{en:'Stack Usage',cz:'Použití zásobníku'},desc:{en:'Use Stack<int>. Push 1,2,3. Pop and print, Peek and print, Count.',cz:'Použij Stack<int>. Push 1,2,3. Pop, Peek, Count.'},starter:'var stack = new Stack<int>();\n// Push 1,2,3 and test\n',expected:'3\n2\n2',keywords:['Push','Pop','Peek','Count'],maxScore:100},
{id:19,title:{en:'Calculator',cz:'Kalkulačka'},desc:{en:'Write Calc(string expr) for "10 + 5", "8 * 3", "20 / 4".',cz:'Napiš Calc(string expr) pro "10 + 5", "8 * 3", "20 / 4".'},starter:'// Calc method\n',expected:'15\n24\n5',keywords:['Split','switch','Console'],maxScore:100},
{id:20,title:{en:'Todo App',cz:'Todo aplikace'},desc:{en:'TodoApp with Add, Complete, Show. Add 2 items, complete first, show.',cz:'TodoApp s Add, Complete, Show. Přidej 2, dokonči první, zobraz.'},starter:'// TodoApp class\n',expected:null,keywords:['class','List','Add'],maxScore:100}
]},

// Get assessment task
getAssessmentTask(index, progLang) {
    const lang = progLang === 'csharp' ? 'csharp' : 'python';
    return this.assessment[lang][index] || null;
},

getAssessmentCount() { return 10; },

// Get lesson test
getLessonTest(lessonId, progLang) {
    const lang = progLang === 'csharp' ? 'csharp' : 'python';
    return this.lessonTests[lang].find(t => t.id === lessonId) || null;
},

// Evaluate code output against expected
evaluate(code, output, test, progLang) {
    let score = 0;
    const maxScore = test.maxScore || 100;
    const codeStr = code.toLowerCase();

    // 1. Output check (50 points)
    if (test.expected) {
        const expectedNorm = test.expected.trim().toLowerCase();
        const outputNorm = (output || '').trim().toLowerCase();
        if (outputNorm === expectedNorm) {
            score += 50;
        } else if (outputNorm.includes(expectedNorm) || expectedNorm.includes(outputNorm)) {
            score += 25;
        } else {
            // Partial match - check line by line
            const expLines = expectedNorm.split('\n');
            const outLines = outputNorm.split('\n');
            let matchedLines = 0;
            for (const el of expLines) {
                if (outLines.some(ol => ol.trim() === el.trim())) matchedLines++;
            }
            if (expLines.length > 0) {
                score += Math.round(50 * (matchedLines / expLines.length));
            }
        }
    } else {
        // No expected output - give points if there IS any output
        if (output && output.trim().length > 0) score += 35;
    }

    // 2. Keyword check (35 points)
    if (test.keywords && test.keywords.length > 0) {
        let found = 0;
        for (const kw of test.keywords) {
            if (codeStr.includes(kw.toLowerCase())) found++;
        }
        score += Math.round(35 * (found / test.keywords.length));
    }

    // 3. Code quality bonus (15 points - harder thresholds)
    // Has meaningful code (not trivial)
    if (code.trim().length > 30) score += 5;
    // Has some structure (multiple lines)
    if (code.trim().split('\n').length >= 3) score += 5;
    // No syntax errors (code ran without error)
    if (output !== undefined && output !== null) score += 5;

    return Math.min(Math.round(score), maxScore);
},

// Evaluate assessment task
evaluateAssessment(code, output, taskIndex, progLang) {
    const task = this.getAssessmentTask(taskIndex, progLang);
    if (!task) return 0;

    let score = 0;
    const codeStr = code.toLowerCase();

    // Output match (50 points)
    if (task.expected) {
        const exp = task.expected.trim().toLowerCase();
        const out = (output || '').trim().toLowerCase();
        if (out === exp) score += 50;
        else if (out.includes(exp)) score += 25;
    } else {
        if (output && output.trim().length > 0) score += 30;
    }

    // Keywords (30 points)
    if (task.keywords) {
        let found = 0;
        for (const kw of task.keywords) {
            if (codeStr.includes(kw.toLowerCase())) found++;
        }
        score += Math.round(30 * (found / task.keywords.length));
    }

    // Has code (20 points)
    if (code.trim().length > 5) score += 10;
    if (code.trim().split('\n').length >= 2) score += 10;

    return Math.min(score, 100);
},

mergeExtras() {
    if (typeof TestsExtra !== 'undefined') {
        if (TestsExtra.python) this.lessonTests.python.push(...TestsExtra.python);
        if (TestsExtra.csharp) this.lessonTests.csharp.push(...TestsExtra.csharp);
    }
},

// Determine level from assessment total score (calibrated for 50 lessons)
// 10 tasks × max 100 pts = 1000 max. Thresholds set conservatively so users
// don't skip too many lessons — it's better to review easy material than miss fundamentals.
determineLevel(totalScore) {
    if (totalScore <= 100) return { level: 'complete_beginner', startLesson: 1 };
    if (totalScore <= 250) return { level: 'beginner', startLesson: 3 };
    if (totalScore <= 450) return { level: 'elementary', startLesson: 6 };
    if (totalScore <= 650) return { level: 'intermediate', startLesson: 11 };
    if (totalScore <= 800) return { level: 'upper_intermediate', startLesson: 21 };
    if (totalScore <= 900) return { level: 'advanced', startLesson: 31 };
    return { level: 'senior', startLesson: 41 };
}
};
