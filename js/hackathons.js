/* ============================
   Hackathons Module
   Challenge templates, generation, evaluation
   ============================ */

const Hackathons = {

    // ─── Challenge Templates ────────────────────────────────────────────

    templates: {

        // ═══════════════════════════════════════════════════════════════
        //  PYTHON
        // ═══════════════════════════════════════════════════════════════

        python: {

            // ── Beginner ────────────────────────────────────────────
            beginner: [
                {
                    title: { en: 'Number Guessing Game', cz: 'Hra na hádání čísel' },
                    description: { en: 'Build a simple number guessing game', cz: 'Vytvoř jednoduchou hru na hádání čísel' },
                    challenge: {
                        en: '<p>Create a <strong>Number Guessing Game</strong> where the computer picks a random number and the player tries to guess it.</p><ul><li>Generate a random number between 1 and 100</li><li>Ask the player for their guess in a loop</li><li>Tell the player if their guess is too high or too low</li><li>Count the number of attempts and display the result when they guess correctly</li><li>Allow the player to quit by typing "quit"</li></ul>',
                        cz: '<p>Vytvoř <strong>hru na hádání čísel</strong>, kde počítač zvolí náhodné číslo a hráč se ho pokouší uhodnout.</p><ul><li>Vygeneruj náhodné číslo mezi 1 a 100</li><li>V cyklu se ptej hráče na jeho tip</li><li>Řekni hráči, zda je jeho tip příliš vysoký nebo příliš nízký</li><li>Počítej počet pokusů a zobraz výsledek, když hráč uhodne</li><li>Umožni hráči ukončit hru zadáním "quit"</li></ul>'
                    },
                    starter: '# Number Guessing Game\nimport random\n\nsecret = random.randint(1, 100)\nattempts = 0\n\n# Write your game loop here\n',
                    keywords: ['while', 'if', 'random', 'print'],
                    maxScore: 100
                },
                {
                    title: { en: 'Shopping List Manager', cz: 'Správce nákupního seznamu' },
                    description: { en: 'Manage a shopping list with add/remove features', cz: 'Spravuj nákupní seznam s funkcemi přidání a odebrání' },
                    challenge: {
                        en: '<p>Create a <strong>Shopping List Manager</strong> that lets the user manage their shopping list.</p><ul><li>Start with an empty list</li><li>Let the user add items to the list</li><li>Let the user remove items from the list</li><li>Display the current shopping list after each action</li><li>Number each item in the displayed list</li></ul>',
                        cz: '<p>Vytvoř <strong>správce nákupního seznamu</strong>, který umožní uživateli spravovat nákupní seznam.</p><ul><li>Začni s prázdným seznamem</li><li>Umožni uživateli přidávat položky do seznamu</li><li>Umožni uživateli odebírat položky ze seznamu</li><li>Po každé akci zobraz aktuální nákupní seznam</li><li>Očísluj každou položku v zobrazeném seznamu</li></ul>'
                    },
                    starter: '# Shopping List Manager\nshopping_list = []\n\ndef show_list():\n    # Display all items\n    pass\n\n# Write your menu loop here\n',
                    keywords: ['list', 'append', 'remove', 'for', 'print'],
                    maxScore: 100
                },
                {
                    title: { en: 'Temperature Converter', cz: 'Převodník teplot' },
                    description: { en: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin', cz: 'Převáděj teploty mezi stupni Celsia, Fahrenheita a Kelviny' },
                    challenge: {
                        en: '<p>Create a <strong>Temperature Converter</strong> with functions for each conversion.</p><ul><li>Write a function to convert Celsius to Fahrenheit</li><li>Write a function to convert Fahrenheit to Celsius</li><li>Write a function to convert Celsius to Kelvin</li><li>Ask the user which conversion they want</li><li>Display the result rounded to 2 decimal places</li></ul>',
                        cz: '<p>Vytvoř <strong>převodník teplot</strong> s funkcemi pro každý převod.</p><ul><li>Napiš funkci pro převod Celsia na Fahrenheita</li><li>Napiš funkci pro převod Fahrenheita na Celsia</li><li>Napiš funkci pro převod Celsia na Kelviny</li><li>Zeptej se uživatele, jaký převod chce</li><li>Zobraz výsledek zaokrouhlený na 2 desetinná místa</li></ul>'
                    },
                    starter: '# Temperature Converter\n\ndef celsius_to_fahrenheit(c):\n    pass\n\ndef fahrenheit_to_celsius(f):\n    pass\n\ndef celsius_to_kelvin(c):\n    pass\n\n# Write your menu here\n',
                    keywords: ['def', 'return', 'float', 'if'],
                    maxScore: 100
                },
                {
                    title: { en: 'Simple Calculator', cz: 'Jednoduchá kalkulačka' },
                    description: { en: 'Build a calculator with basic arithmetic operations', cz: 'Vytvoř kalkulačku se základními aritmetickými operacemi' },
                    challenge: {
                        en: '<p>Create a <strong>Simple Calculator</strong> that performs basic math operations.</p><ul><li>Support addition, subtraction, multiplication, and division</li><li>Create a separate function for each operation</li><li>Handle division by zero with an error message</li><li>Let the user enter two numbers and choose an operation</li><li>Display the result clearly</li></ul>',
                        cz: '<p>Vytvoř <strong>jednoduchou kalkulačku</strong>, která provádí základní matematické operace.</p><ul><li>Podporuj sčítání, odčítání, násobení a dělení</li><li>Vytvoř samostatnou funkci pro každou operaci</li><li>Ošetři dělení nulou chybovou zprávou</li><li>Nech uživatele zadat dvě čísla a vybrat operaci</li><li>Přehledně zobraz výsledek</li></ul>'
                    },
                    starter: '# Simple Calculator\n\ndef add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\n# Add more operations and a menu\n',
                    keywords: ['def', 'if', 'elif', 'return', 'input'],
                    maxScore: 100
                },
                {
                    title: { en: 'Word Counter', cz: 'Počítadlo slov' },
                    description: { en: 'Analyze text and count word frequencies', cz: 'Analyzuj text a počítej četnost slov' },
                    challenge: {
                        en: '<p>Create a <strong>Word Counter</strong> that analyzes text input.</p><ul><li>Accept a block of text from the user</li><li>Count total number of words</li><li>Count the frequency of each unique word</li><li>Display the top 5 most common words</li><li>Ignore case differences (treat "The" and "the" as the same word)</li></ul>',
                        cz: '<p>Vytvoř <strong>počítadlo slov</strong>, které analyzuje textový vstup.</p><ul><li>Přijmi od uživatele blok textu</li><li>Spočítej celkový počet slov</li><li>Spočítej četnost každého unikátního slova</li><li>Zobraz 5 nejčastějších slov</li><li>Ignoruj rozdíly ve velikosti písmen ("The" a "the" jsou stejné slovo)</li></ul>'
                    },
                    starter: '# Word Counter\n\ntext = input("Enter your text: ")\nword_counts = {}\n\n# Count the words and display results\n',
                    keywords: ['split', 'len', 'for', 'dict'],
                    maxScore: 100
                }
            ],

            // ── Intermediate ────────────────────────────────────────
            intermediate: [
                {
                    title: { en: 'Student Grade System', cz: 'Systém hodnocení studentů' },
                    description: { en: 'Build a class-based student grade management system', cz: 'Vytvoř třídový systém pro správu hodnocení studentů' },
                    challenge: {
                        en: '<p>Create a <strong>Student Grade System</strong> using object-oriented programming.</p><ul><li>Create a <code>Student</code> class with name, ID, and grades</li><li>Add methods to add grades and calculate the average</li><li>Add a method that returns a letter grade (A-F)</li><li>Create a <code>Classroom</code> class that manages multiple students</li><li>Display a summary of all students with their averages and letter grades</li></ul>',
                        cz: '<p>Vytvoř <strong>systém hodnocení studentů</strong> pomocí objektově orientovaného programování.</p><ul><li>Vytvoř třídu <code>Student</code> se jménem, ID a známkami</li><li>Přidej metody pro přidání známek a výpočet průměru</li><li>Přidej metodu, která vrátí písmenné hodnocení (A–F)</li><li>Vytvoř třídu <code>Classroom</code>, která spravuje více studentů</li><li>Zobraz přehled všech studentů s jejich průměry a hodnoceními</li></ul>'
                    },
                    starter: '# Student Grade System\n\nclass Student:\n    def __init__(self, name, student_id):\n        self.name = name\n        self.student_id = student_id\n        self.grades = []\n\n    def add_grade(self, grade):\n        pass\n\n    def average(self):\n        pass\n\n# Build the Classroom class and test it\n',
                    keywords: ['class', 'def', 'dict', 'for'],
                    maxScore: 100
                },
                {
                    title: { en: 'File Line Analyzer', cz: 'Analyzátor řádků souboru' },
                    description: { en: 'Read and analyze text files line by line', cz: 'Čti a analyzuj textové soubory řádek po řádku' },
                    challenge: {
                        en: '<p>Create a <strong>File Line Analyzer</strong> that processes text content.</p><ul><li>Read text input (simulating a file) and split it into lines</li><li>Count total lines, blank lines, and non-blank lines</li><li>Find the longest and shortest lines</li><li>Calculate the average line length</li><li>Handle errors gracefully with try/except blocks</li></ul>',
                        cz: '<p>Vytvoř <strong>analyzátor řádků souboru</strong>, který zpracovává textový obsah.</p><ul><li>Přečti textový vstup (simulující soubor) a rozděl ho na řádky</li><li>Spočítej celkový počet řádků, prázdné řádky a neprázdné řádky</li><li>Najdi nejdelší a nejkratší řádek</li><li>Vypočítej průměrnou délku řádku</li><li>Ošetři chyby elegantně pomocí bloků try/except</li></ul>'
                    },
                    starter: '# File Line Analyzer\n\ndef analyze_lines(text):\n    lines = text.split("\\n")\n    results = {}\n    try:\n        # Analyze the lines here\n        pass\n    except Exception as e:\n        print(f"Error: {e}")\n    return results\n\n# Test with sample text\n',
                    keywords: ['open', 'split', 'strip', 'try', 'except'],
                    maxScore: 100
                },
                {
                    title: { en: 'JSON Contact Book', cz: 'JSON kontaktní kniha' },
                    description: { en: 'Manage contacts stored as JSON data', cz: 'Spravuj kontakty uložené jako JSON data' },
                    challenge: {
                        en: '<p>Create a <strong>JSON Contact Book</strong> to store and manage contacts.</p><ul><li>Store contacts as a list of dictionaries with name, phone, and email</li><li>Add new contacts with validation (non-empty name required)</li><li>Search contacts by name (partial match)</li><li>Delete contacts by name</li><li>Export all contacts to a JSON-formatted string</li></ul>',
                        cz: '<p>Vytvoř <strong>JSON kontaktní knihu</strong> pro ukládání a správu kontaktů.</p><ul><li>Ukládej kontakty jako seznam slovníků se jménem, telefonem a e-mailem</li><li>Přidávej nové kontakty s validací (vyžadováno neprázdné jméno)</li><li>Vyhledávej kontakty podle jména (částečná shoda)</li><li>Maž kontakty podle jména</li><li>Exportuj všechny kontakty do JSON formátovaného řetězce</li></ul>'
                    },
                    starter: '# JSON Contact Book\nimport json\n\ncontacts = []\n\ndef add_contact(name, phone, email):\n    pass\n\ndef search_contact(query):\n    pass\n\ndef delete_contact(name):\n    pass\n\ndef export_contacts():\n    return json.dumps(contacts, indent=2)\n\n# Build the menu and test\n',
                    keywords: ['json', 'dict', 'list', 'def'],
                    maxScore: 100
                },
                {
                    title: { en: 'Password Validator', cz: 'Validátor hesel' },
                    description: { en: 'Validate passwords against security rules using regex', cz: 'Ověřuj hesla podle bezpečnostních pravidel pomocí regulárních výrazů' },
                    challenge: {
                        en: '<p>Create a <strong>Password Validator</strong> with configurable rules.</p><ul><li>Check minimum length (at least 8 characters)</li><li>Require at least one uppercase and one lowercase letter</li><li>Require at least one digit</li><li>Require at least one special character (!@#$%^&*)</li><li>Return a strength score (weak / medium / strong) and list of issues</li></ul>',
                        cz: '<p>Vytvoř <strong>validátor hesel</strong> s nastavitelnými pravidly.</p><ul><li>Kontroluj minimální délku (alespoň 8 znaků)</li><li>Vyžaduj alespoň jedno velké a jedno malé písmeno</li><li>Vyžaduj alespoň jednu číslici</li><li>Vyžaduj alespoň jeden speciální znak (!@#$%^&*)</li><li>Vrať skóre síly (slabé / střední / silné) a seznam problémů</li></ul>'
                    },
                    starter: '# Password Validator\nimport re\n\ndef validate_password(password):\n    issues = []\n    score = 0\n    # Add your validation rules here\n    return {"valid": len(issues) == 0, "score": score, "issues": issues}\n\n# Test with different passwords\n',
                    keywords: ['re', 'def', 'len', 'return', 'bool'],
                    maxScore: 100
                },
                {
                    title: { en: 'Matrix Calculator', cz: 'Maticová kalkulačka' },
                    description: { en: 'Perform basic matrix operations', cz: 'Prováděj základní maticové operace' },
                    challenge: {
                        en: '<p>Create a <strong>Matrix Calculator</strong> using nested lists.</p><ul><li>Represent matrices as lists of lists</li><li>Add two matrices together</li><li>Multiply a matrix by a scalar value</li><li>Transpose a matrix (swap rows and columns)</li><li>Display matrices in a formatted grid</li></ul>',
                        cz: '<p>Vytvoř <strong>maticovou kalkulačku</strong> pomocí vnořených seznamů.</p><ul><li>Reprezentuj matice jako seznamy seznamů</li><li>Sečti dvě matice</li><li>Vynásob matici skalárem</li><li>Transponuj matici (prohoď řádky a sloupce)</li><li>Zobraz matice ve formátované mřížce</li></ul>'
                    },
                    starter: '# Matrix Calculator\n\ndef create_matrix(rows, cols, fill=0):\n    return [[fill for _ in range(cols)] for _ in range(rows)]\n\ndef add_matrices(a, b):\n    pass\n\ndef scalar_multiply(matrix, scalar):\n    pass\n\ndef transpose(matrix):\n    pass\n\ndef display(matrix):\n    pass\n\n# Test your functions\n',
                    keywords: ['list', 'for', 'range', 'def', 'return'],
                    maxScore: 100
                }
            ],

            // ── Advanced ────────────────────────────────────────────
            advanced: [
                {
                    title: { en: 'Mini REST API Simulator', cz: 'Mini simulátor REST API' },
                    description: { en: 'Simulate a REST API with routes and handlers', cz: 'Simuluj REST API s cestami a handlery' },
                    challenge: {
                        en: '<p>Create a <strong>Mini REST API Simulator</strong> that mimics how web APIs work.</p><ul><li>Create a router class that registers routes with HTTP methods (GET, POST, PUT, DELETE)</li><li>Use decorators to register handler functions for each route</li><li>Support URL parameters (e.g., /users/:id)</li><li>Store data in an in-memory dictionary acting as a database</li><li>Return response objects with status codes and JSON bodies</li></ul>',
                        cz: '<p>Vytvoř <strong>mini simulátor REST API</strong>, který napodobuje fungování webových API.</p><ul><li>Vytvoř třídu routeru, která registruje cesty s HTTP metodami (GET, POST, PUT, DELETE)</li><li>Použij dekorátory k registraci handler funkcí pro každou cestu</li><li>Podporuj URL parametry (např. /users/:id)</li><li>Ukládej data do slovníku v paměti jako do databáze</li><li>Vracuj odpovědi se stavovými kódy a JSON tělem</li></ul>'
                    },
                    starter: '# Mini REST API Simulator\nimport json\n\nclass APIRouter:\n    def __init__(self):\n        self.routes = {}\n        self.db = {}\n\n    def route(self, path, method="GET"):\n        def decorator(func):\n            self.routes[(method, path)] = func\n            return func\n        return decorator\n\n    def handle_request(self, method, path, body=None):\n        pass\n\napi = APIRouter()\n\n# Register your routes and test\n',
                    keywords: ['class', 'dict', 'decorator', 'lambda'],
                    maxScore: 100
                },
                {
                    title: { en: 'Binary Search Tree', cz: 'Binární vyhledávací strom' },
                    description: { en: 'Implement a binary search tree with traversals', cz: 'Implementuj binární vyhledávací strom s průchody' },
                    challenge: {
                        en: '<p>Create a <strong>Binary Search Tree</strong> implementation from scratch.</p><ul><li>Create a <code>Node</code> class with value, left, and right attributes</li><li>Implement insert, search, and delete operations</li><li>Implement in-order, pre-order, and post-order traversals</li><li>Add a method to find the minimum and maximum values</li><li>Add a method to calculate the height of the tree</li></ul>',
                        cz: '<p>Vytvoř implementaci <strong>binárního vyhledávacího stromu</strong> od nuly.</p><ul><li>Vytvoř třídu <code>Node</code> s hodnotou, levým a pravým atributem</li><li>Implementuj operace vkládání, vyhledávání a mazání</li><li>Implementuj in-order, pre-order a post-order průchody</li><li>Přidej metodu pro nalezení minimální a maximální hodnoty</li><li>Přidej metodu pro výpočet výšky stromu</li></ul>'
                    },
                    starter: '# Binary Search Tree\n\nclass Node:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n\n    def insert(self, value):\n        pass\n\n    def search(self, value):\n        pass\n\n    def inorder(self, node=None):\n        pass\n\n# Build and test your BST\n',
                    keywords: ['class', 'def', 'self', 'None', 'recursive'],
                    maxScore: 100
                },
                {
                    title: { en: 'Task Scheduler with Priority Queue', cz: 'Plánovač úloh s prioritní frontou' },
                    description: { en: 'Schedule tasks using a priority queue system', cz: 'Plánuj úlohy pomocí systému prioritních front' },
                    challenge: {
                        en: '<p>Create a <strong>Task Scheduler</strong> that manages tasks using a priority queue.</p><ul><li>Create a <code>Task</code> class with name, priority, deadline, and status</li><li>Use <code>heapq</code> to maintain a priority queue of tasks</li><li>Support adding, executing (pop highest priority), and listing tasks</li><li>Add deadline tracking using <code>datetime</code></li><li>Implement a method to show overdue tasks</li></ul>',
                        cz: '<p>Vytvoř <strong>plánovač úloh</strong>, který spravuje úlohy pomocí prioritní fronty.</p><ul><li>Vytvoř třídu <code>Task</code> se jménem, prioritou, termínem a stavem</li><li>Použij <code>heapq</code> pro udržování prioritní fronty úloh</li><li>Podporuj přidávání, vykonávání (pop nejvyšší priority) a výpis úloh</li><li>Přidej sledování termínů pomocí <code>datetime</code></li><li>Implementuj metodu pro zobrazení úloh po termínu</li></ul>'
                    },
                    starter: '# Task Scheduler with Priority Queue\nimport heapq\nfrom datetime import datetime, timedelta\n\nclass Task:\n    def __init__(self, name, priority, deadline=None):\n        self.name = name\n        self.priority = priority\n        self.deadline = deadline\n        self.status = "pending"\n\n    def __lt__(self, other):\n        return self.priority < other.priority\n\nclass Scheduler:\n    def __init__(self):\n        self.queue = []\n\n    def add_task(self, task):\n        pass\n\n    def execute_next(self):\n        pass\n\n# Build and test\n',
                    keywords: ['class', 'heapq', 'datetime'],
                    maxScore: 100
                },
                {
                    title: { en: 'Plugin System', cz: 'Systém pluginů' },
                    description: { en: 'Build a dynamic plugin architecture', cz: 'Vytvoř dynamickou architekturu pluginů' },
                    challenge: {
                        en: '<p>Create a <strong>Plugin System</strong> that supports dynamic loading and execution.</p><ul><li>Create a <code>PluginManager</code> class that registers and manages plugins</li><li>Each plugin must implement a standard interface (name, version, execute method)</li><li>Use decorators to register plugins automatically</li><li>Support enabling/disabling plugins at runtime</li><li>Add a hook system that plugins can subscribe to (e.g., "on_start", "on_data")</li></ul>',
                        cz: '<p>Vytvoř <strong>systém pluginů</strong>, který podporuje dynamické načítání a spouštění.</p><ul><li>Vytvoř třídu <code>PluginManager</code>, která registruje a spravuje pluginy</li><li>Každý plugin musí implementovat standardní rozhraní (jméno, verze, metoda execute)</li><li>Použij dekorátory pro automatickou registraci pluginů</li><li>Podporuj zapínání a vypínání pluginů za běhu</li><li>Přidej systém hooků, ke kterým se pluginy mohou přihlásit (např. "on_start", "on_data")</li></ul>'
                    },
                    starter: '# Plugin System\n\nclass PluginManager:\n    def __init__(self):\n        self.plugins = {}\n        self.hooks = {}\n\n    def register(self, plugin_class):\n        \"\"\"Decorator to register a plugin\"\"\"\n        pass\n\n    def enable(self, name):\n        pass\n\n    def disable(self, name):\n        pass\n\n    def trigger_hook(self, hook_name, *args):\n        pass\n\n# Define plugins and test\n',
                    keywords: ['class', 'dict', 'importlib', 'decorator'],
                    maxScore: 100
                },
                {
                    title: { en: 'Data Pipeline', cz: 'Datový pipeline' },
                    description: { en: 'Build a data processing pipeline using generators', cz: 'Vytvoř datový zpracovatelský pipeline pomocí generátorů' },
                    challenge: {
                        en: '<p>Create a <strong>Data Pipeline</strong> that processes data through chained stages.</p><ul><li>Create a <code>Pipeline</code> class that chains processing stages together</li><li>Each stage is a generator that yields transformed data</li><li>Include built-in stages: filter, map, sort, and limit</li><li>Support custom stages via user-defined generator functions</li><li>Add error handling so a failing stage does not crash the pipeline</li></ul>',
                        cz: '<p>Vytvoř <strong>datový pipeline</strong>, který zpracovává data přes zřetězené fáze.</p><ul><li>Vytvoř třídu <code>Pipeline</code>, která řetězí zpracovatelské fáze dohromady</li><li>Každá fáze je generátor, který produkuje transformovaná data</li><li>Zahrň vestavěné fáze: filter, map, sort a limit</li><li>Podporuj vlastní fáze přes uživatelem definované generátorové funkce</li><li>Přidej ošetření chyb, aby selhávající fáze neshodila celý pipeline</li></ul>'
                    },
                    starter: '# Data Pipeline\n\nclass Pipeline:\n    def __init__(self, data):\n        self.data = data\n        self.stages = []\n\n    def add_stage(self, stage_func):\n        self.stages.append(stage_func)\n        return self  # allow chaining\n\n    def execute(self):\n        result = self.data\n        for stage in self.stages:\n            try:\n                result = list(stage(result))\n            except Exception as e:\n                print(f"Stage failed: {e}")\n        return result\n\n# Define stages and test\n',
                    keywords: ['class', 'generator', 'yield', 'filter', 'map'],
                    maxScore: 100
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════
        //  C#
        // ═══════════════════════════════════════════════════════════════

        csharp: {

            // ── Beginner ────────────────────────────────────────────
            beginner: [
                {
                    title: { en: 'Number Guessing Game', cz: 'Hra na hádání čísel' },
                    description: { en: 'Build a simple number guessing game', cz: 'Vytvoř jednoduchou hru na hádání čísel' },
                    challenge: {
                        en: '<p>Create a <strong>Number Guessing Game</strong> where the computer picks a random number and the player tries to guess it.</p><ul><li>Generate a random number between 1 and 100 using <code>Random</code></li><li>Ask the player for their guess in a while loop</li><li>Tell the player if their guess is too high or too low</li><li>Count the number of attempts and display the result</li><li>Allow the player to quit by typing "quit"</li></ul>',
                        cz: '<p>Vytvoř <strong>hru na hádání čísel</strong>, kde počítač zvolí náhodné číslo a hráč se ho pokouší uhodnout.</p><ul><li>Vygeneruj náhodné číslo mezi 1 a 100 pomocí <code>Random</code></li><li>V cyklu while se ptej hráče na jeho tip</li><li>Řekni hráči, zda je jeho tip příliš vysoký nebo příliš nízký</li><li>Počítej počet pokusů a zobraz výsledek</li><li>Umožni hráči ukončit hru zadáním "quit"</li></ul>'
                    },
                    starter: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Random rng = new Random();\n        int secret = rng.Next(1, 101);\n        int attempts = 0;\n\n        // Write your game loop here\n    }\n}\n',
                    keywords: ['while', 'if', 'Console.WriteLine', 'Random'],
                    maxScore: 100
                },
                {
                    title: { en: 'Shopping List Manager', cz: 'Správce nákupního seznamu' },
                    description: { en: 'Manage a shopping list with add/remove features', cz: 'Spravuj nákupní seznam s funkcemi přidání a odebrání' },
                    challenge: {
                        en: '<p>Create a <strong>Shopping List Manager</strong> using a List.</p><ul><li>Start with an empty <code>List&lt;string&gt;</code></li><li>Let the user add items to the list</li><li>Let the user remove items by name</li><li>Display the numbered list after each action</li><li>Use a menu loop with options: add, remove, show, quit</li></ul>',
                        cz: '<p>Vytvoř <strong>správce nákupního seznamu</strong> pomocí Listu.</p><ul><li>Začni s prázdným <code>List&lt;string&gt;</code></li><li>Umožni uživateli přidávat položky do seznamu</li><li>Umožni uživateli odebírat položky podle názvu</li><li>Po každé akci zobraz očíslovaný seznam</li><li>Použij smyčku menu s možnostmi: přidat, odebrat, zobrazit, ukončit</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static List<string> shoppingList = new List<string>();\n\n    static void ShowList()\n    {\n        // Display all items\n    }\n\n    static void Main()\n    {\n        // Write your menu loop here\n    }\n}\n',
                    keywords: ['List', 'Add', 'Remove', 'foreach', 'Console.WriteLine'],
                    maxScore: 100
                },
                {
                    title: { en: 'Temperature Converter', cz: 'Převodník teplot' },
                    description: { en: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin', cz: 'Převáděj teploty mezi stupni Celsia, Fahrenheita a Kelviny' },
                    challenge: {
                        en: '<p>Create a <strong>Temperature Converter</strong> with methods for each conversion.</p><ul><li>Write a method to convert Celsius to Fahrenheit</li><li>Write a method to convert Fahrenheit to Celsius</li><li>Write a method to convert Celsius to Kelvin</li><li>Ask the user which conversion they want</li><li>Display the result rounded to 2 decimal places using <code>Math.Round</code></li></ul>',
                        cz: '<p>Vytvoř <strong>převodník teplot</strong> s metodami pro každý převod.</p><ul><li>Napiš metodu pro převod Celsia na Fahrenheita</li><li>Napiš metodu pro převod Fahrenheita na Celsia</li><li>Napiš metodu pro převod Celsia na Kelviny</li><li>Zeptej se uživatele, jaký převod chce</li><li>Zobraz výsledek zaokrouhlený na 2 desetinná místa pomocí <code>Math.Round</code></li></ul>'
                    },
                    starter: 'using System;\n\nclass Program\n{\n    static double CelsiusToFahrenheit(double c)\n    {\n        return 0; // TODO\n    }\n\n    static double FahrenheitToCelsius(double f)\n    {\n        return 0; // TODO\n    }\n\n    static double CelsiusToKelvin(double c)\n    {\n        return 0; // TODO\n    }\n\n    static void Main()\n    {\n        // Write your menu here\n    }\n}\n',
                    keywords: ['static', 'double', 'return', 'if', 'Console.ReadLine'],
                    maxScore: 100
                },
                {
                    title: { en: 'Simple Calculator', cz: 'Jednoduchá kalkulačka' },
                    description: { en: 'Build a calculator with basic arithmetic operations', cz: 'Vytvoř kalkulačku se základními aritmetickými operacemi' },
                    challenge: {
                        en: '<p>Create a <strong>Simple Calculator</strong> using static methods.</p><ul><li>Support addition, subtraction, multiplication, and division</li><li>Create a separate static method for each operation</li><li>Handle division by zero with a try/catch block</li><li>Let the user enter two numbers and choose an operation</li><li>Display the result using <code>Console.WriteLine</code></li></ul>',
                        cz: '<p>Vytvoř <strong>jednoduchou kalkulačku</strong> pomocí statických metod.</p><ul><li>Podporuj sčítání, odčítání, násobení a dělení</li><li>Vytvoř samostatnou statickou metodu pro každou operaci</li><li>Ošetři dělení nulou pomocí bloku try/catch</li><li>Nech uživatele zadat dvě čísla a vybrat operaci</li><li>Zobraz výsledek pomocí <code>Console.WriteLine</code></li></ul>'
                    },
                    starter: 'using System;\n\nclass Calculator\n{\n    static double Add(double a, double b)\n    {\n        return a + b;\n    }\n\n    static double Subtract(double a, double b)\n    {\n        return a - b;\n    }\n\n    // Add more operations\n\n    static void Main()\n    {\n        // Write your menu here\n    }\n}\n',
                    keywords: ['static', 'if', 'else', 'return', 'Console.ReadLine'],
                    maxScore: 100
                },
                {
                    title: { en: 'Word Counter', cz: 'Počítadlo slov' },
                    description: { en: 'Analyze text and count word frequencies', cz: 'Analyzuj text a počítej četnost slov' },
                    challenge: {
                        en: '<p>Create a <strong>Word Counter</strong> using a Dictionary.</p><ul><li>Accept a block of text from the user</li><li>Split the text into words and count total words</li><li>Use a <code>Dictionary&lt;string, int&gt;</code> to count word frequencies</li><li>Display the top 5 most common words</li><li>Ignore case differences using <code>ToLower()</code></li></ul>',
                        cz: '<p>Vytvoř <strong>počítadlo slov</strong> pomocí Dictionary.</p><ul><li>Přijmi od uživatele blok textu</li><li>Rozděl text na slova a spočítej celkový počet slov</li><li>Použij <code>Dictionary&lt;string, int&gt;</code> pro počítání četnosti slov</li><li>Zobraz 5 nejčastějších slov</li><li>Ignoruj rozdíly ve velikosti písmen pomocí <code>ToLower()</code></li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.Write("Enter your text: ");\n        string text = Console.ReadLine();\n        var wordCounts = new Dictionary<string, int>();\n\n        // Count the words and display results\n    }\n}\n',
                    keywords: ['Dictionary', 'Split', 'foreach', 'Console.WriteLine'],
                    maxScore: 100
                }
            ],

            // ── Intermediate ────────────────────────────────────────
            intermediate: [
                {
                    title: { en: 'Student Grade System', cz: 'Systém hodnocení studentů' },
                    description: { en: 'Build a class-based student grade management system', cz: 'Vytvoř třídový systém pro správu hodnocení studentů' },
                    challenge: {
                        en: '<p>Create a <strong>Student Grade System</strong> using object-oriented programming.</p><ul><li>Create a <code>Student</code> class with Name, Id, and a List of grades</li><li>Add methods to add grades and calculate the average</li><li>Add a method that returns a letter grade (A-F)</li><li>Create a <code>Classroom</code> class that manages a List of students</li><li>Display a summary of all students with their averages and letter grades</li></ul>',
                        cz: '<p>Vytvoř <strong>systém hodnocení studentů</strong> pomocí objektově orientovaného programování.</p><ul><li>Vytvoř třídu <code>Student</code> se jménem, Id a Listem známek</li><li>Přidej metody pro přidání známek a výpočet průměru</li><li>Přidej metodu, která vrátí písmenné hodnocení (A–F)</li><li>Vytvoř třídu <code>Classroom</code>, která spravuje List studentů</li><li>Zobraz přehled všech studentů s jejich průměry a hodnoceními</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass Student\n{\n    public string Name { get; set; }\n    public int Id { get; set; }\n    public List<double> Grades { get; set; } = new List<double>();\n\n    public void AddGrade(double grade)\n    {\n        // TODO\n    }\n\n    public double Average()\n    {\n        return 0; // TODO\n    }\n}\n\n// Build the Classroom class and test it\n',
                    keywords: ['class', 'List', 'public', 'foreach'],
                    maxScore: 100
                },
                {
                    title: { en: 'File Line Analyzer', cz: 'Analyzátor řádků souboru' },
                    description: { en: 'Read and analyze text content line by line', cz: 'Čti a analyzuj textový obsah řádek po řádku' },
                    challenge: {
                        en: '<p>Create a <strong>File Line Analyzer</strong> that processes text content.</p><ul><li>Read text input (simulating a file) and split it into lines</li><li>Count total lines, blank lines, and non-blank lines</li><li>Find the longest and shortest lines</li><li>Calculate the average line length</li><li>Wrap everything in try/catch for error handling</li></ul>',
                        cz: '<p>Vytvoř <strong>analyzátor řádků souboru</strong>, který zpracovává textový obsah.</p><ul><li>Přečti textový vstup (simulující soubor) a rozděl ho na řádky</li><li>Spočítej celkový počet řádků, prázdné řádky a neprázdné řádky</li><li>Najdi nejdelší a nejkratší řádek</li><li>Vypočítej průměrnou délku řádku</li><li>Zabal vše do try/catch pro ošetření chyb</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass LineAnalyzer\n{\n    public static Dictionary<string, object> Analyze(string text)\n    {\n        var results = new Dictionary<string, object>();\n        try\n        {\n            string[] lines = text.Split(\'\\n\');\n            // Analyze the lines here\n        }\n        catch (Exception e)\n        {\n            Console.WriteLine($"Error: {e.Message}");\n        }\n        return results;\n    }\n\n    static void Main()\n    {\n        // Test with sample text\n    }\n}\n',
                    keywords: ['Split', 'try', 'catch', 'Dictionary', 'string'],
                    maxScore: 100
                },
                {
                    title: { en: 'JSON Contact Book', cz: 'JSON kontaktní kniha' },
                    description: { en: 'Manage contacts using Dictionary and List structures', cz: 'Spravuj kontakty pomocí struktur Dictionary a List' },
                    challenge: {
                        en: '<p>Create a <strong>Contact Book</strong> to store and manage contacts.</p><ul><li>Create a <code>Contact</code> class with Name, Phone, and Email properties</li><li>Use a <code>List&lt;Contact&gt;</code> to store all contacts</li><li>Add new contacts with validation (non-empty name required)</li><li>Search contacts by name (case-insensitive partial match)</li><li>Delete contacts by name and display the updated list</li></ul>',
                        cz: '<p>Vytvoř <strong>kontaktní knihu</strong> pro ukládání a správu kontaktů.</p><ul><li>Vytvoř třídu <code>Contact</code> s vlastnostmi Name, Phone a Email</li><li>Použij <code>List&lt;Contact&gt;</code> pro uložení všech kontaktů</li><li>Přidávej nové kontakty s validací (vyžadováno neprázdné jméno)</li><li>Vyhledávej kontakty podle jména (částečná shoda bez ohledu na velikost písmen)</li><li>Maž kontakty podle jména a zobraz aktualizovaný seznam</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass Contact\n{\n    public string Name { get; set; }\n    public string Phone { get; set; }\n    public string Email { get; set; }\n}\n\nclass ContactBook\n{\n    private List<Contact> contacts = new List<Contact>();\n\n    public void AddContact(string name, string phone, string email)\n    {\n        // TODO\n    }\n\n    public List<Contact> Search(string query)\n    {\n        return null; // TODO\n    }\n\n    static void Main()\n    {\n        // Build the menu and test\n    }\n}\n',
                    keywords: ['class', 'List', 'Dictionary', 'public'],
                    maxScore: 100
                },
                {
                    title: { en: 'Password Validator', cz: 'Validátor hesel' },
                    description: { en: 'Validate passwords against security rules using Regex', cz: 'Ověřuj hesla podle bezpečnostních pravidel pomocí Regex' },
                    challenge: {
                        en: '<p>Create a <strong>Password Validator</strong> with configurable rules.</p><ul><li>Check minimum length (at least 8 characters)</li><li>Require at least one uppercase and one lowercase letter</li><li>Require at least one digit</li><li>Require at least one special character (!@#$%^&*)</li><li>Return a strength rating (Weak / Medium / Strong) and a list of issues</li></ul>',
                        cz: '<p>Vytvoř <strong>validátor hesel</strong> s nastavitelnými pravidly.</p><ul><li>Kontroluj minimální délku (alespoň 8 znaků)</li><li>Vyžaduj alespoň jedno velké a jedno malé písmeno</li><li>Vyžaduj alespoň jednu číslici</li><li>Vyžaduj alespoň jeden speciální znak (!@#$%^&*)</li><li>Vrať hodnocení síly (Slabé / Střední / Silné) a seznam problémů</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\nusing System.Text.RegularExpressions;\n\nclass PasswordValidator\n{\n    public static (bool valid, string strength, List<string> issues) Validate(string password)\n    {\n        var issues = new List<string>();\n        int score = 0;\n        // Add your validation rules here\n        return (issues.Count == 0, "Weak", issues);\n    }\n\n    static void Main()\n    {\n        // Test with different passwords\n    }\n}\n',
                    keywords: ['Regex', 'static', 'List', 'return', 'bool'],
                    maxScore: 100
                },
                {
                    title: { en: 'Matrix Calculator', cz: 'Maticová kalkulačka' },
                    description: { en: 'Perform basic matrix operations using 2D arrays', cz: 'Prováděj základní maticové operace pomocí 2D polí' },
                    challenge: {
                        en: '<p>Create a <strong>Matrix Calculator</strong> using 2D arrays.</p><ul><li>Represent matrices as <code>int[,]</code> or <code>double[,]</code> arrays</li><li>Add two matrices together</li><li>Multiply a matrix by a scalar value</li><li>Transpose a matrix (swap rows and columns)</li><li>Display matrices in a formatted grid with <code>Console.WriteLine</code></li></ul>',
                        cz: '<p>Vytvoř <strong>maticovou kalkulačku</strong> pomocí 2D polí.</p><ul><li>Reprezentuj matice jako pole <code>int[,]</code> nebo <code>double[,]</code></li><li>Sečti dvě matice</li><li>Vynásob matici skalárem</li><li>Transponuj matici (prohoď řádky a sloupce)</li><li>Zobraz matice ve formátované mřížce pomocí <code>Console.WriteLine</code></li></ul>'
                    },
                    starter: 'using System;\n\nclass MatrixCalc\n{\n    static double[,] AddMatrices(double[,] a, double[,] b)\n    {\n        return null; // TODO\n    }\n\n    static double[,] ScalarMultiply(double[,] matrix, double scalar)\n    {\n        return null; // TODO\n    }\n\n    static double[,] Transpose(double[,] matrix)\n    {\n        return null; // TODO\n    }\n\n    static void Display(double[,] matrix)\n    {\n        // TODO\n    }\n\n    static void Main()\n    {\n        // Test your methods\n    }\n}\n',
                    keywords: ['static', 'for', 'GetLength', 'double', 'return'],
                    maxScore: 100
                }
            ],

            // ── Advanced ────────────────────────────────────────────
            advanced: [
                {
                    title: { en: 'Mini REST API Simulator', cz: 'Mini simulátor REST API' },
                    description: { en: 'Simulate a REST API with routes and handlers', cz: 'Simuluj REST API s cestami a handlery' },
                    challenge: {
                        en: '<p>Create a <strong>Mini REST API Simulator</strong> using C# classes and interfaces.</p><ul><li>Create a <code>Router</code> class that registers routes with HTTP methods (GET, POST, PUT, DELETE)</li><li>Use <code>Func&lt;Request, Response&gt;</code> delegates to register handler functions</li><li>Support URL parameters (e.g., /users/{id})</li><li>Store data in a <code>Dictionary</code> acting as an in-memory database</li><li>Return response objects with status codes and JSON-like bodies</li></ul>',
                        cz: '<p>Vytvoř <strong>mini simulátor REST API</strong> pomocí tříd a rozhraní C#.</p><ul><li>Vytvoř třídu <code>Router</code>, která registruje cesty s HTTP metodami (GET, POST, PUT, DELETE)</li><li>Použij delegáty <code>Func&lt;Request, Response&gt;</code> k registraci handler funkcí</li><li>Podporuj URL parametry (např. /users/{id})</li><li>Ukládej data do <code>Dictionary</code> jako do databáze v paměti</li><li>Vracej odpovědi se stavovými kódy a JSON-like tělem</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass Request\n{\n    public string Method { get; set; }\n    public string Path { get; set; }\n    public string Body { get; set; }\n    public Dictionary<string, string> Params { get; set; } = new Dictionary<string, string>();\n}\n\nclass Response\n{\n    public int StatusCode { get; set; }\n    public string Body { get; set; }\n}\n\nclass Router\n{\n    private Dictionary<string, Func<Request, Response>> routes = new Dictionary<string, Func<Request, Response>>();\n    private Dictionary<string, string> db = new Dictionary<string, string>();\n\n    public void Register(string method, string path, Func<Request, Response> handler)\n    {\n        routes[$"{method}:{path}"] = handler;\n    }\n\n    public Response HandleRequest(Request req)\n    {\n        return null; // TODO\n    }\n}\n\n// Register routes and test\n',
                    keywords: ['class', 'interface', 'Func', 'Dictionary'],
                    maxScore: 100
                },
                {
                    title: { en: 'Binary Search Tree', cz: 'Binární vyhledávací strom' },
                    description: { en: 'Implement a binary search tree with traversals', cz: 'Implementuj binární vyhledávací strom s průchody' },
                    challenge: {
                        en: '<p>Create a <strong>Binary Search Tree</strong> implementation using generics.</p><ul><li>Create a <code>Node&lt;T&gt;</code> class with Value, Left, and Right</li><li>Implement Insert, Search, and Delete operations</li><li>Implement InOrder, PreOrder, and PostOrder traversals</li><li>Add methods to find the minimum and maximum values</li><li>Add a method to calculate the height of the tree</li></ul>',
                        cz: '<p>Vytvoř implementaci <strong>binárního vyhledávacího stromu</strong> pomocí generik.</p><ul><li>Vytvoř třídu <code>Node&lt;T&gt;</code> s hodnotou, levým a pravým potomkem</li><li>Implementuj operace Insert, Search a Delete</li><li>Implementuj průchody InOrder, PreOrder a PostOrder</li><li>Přidej metody pro nalezení minimální a maximální hodnoty</li><li>Přidej metodu pro výpočet výšky stromu</li></ul>'
                    },
                    starter: 'using System;\n\nclass Node<T> where T : IComparable<T>\n{\n    public T Value { get; set; }\n    public Node<T> Left { get; set; }\n    public Node<T> Right { get; set; }\n\n    public Node(T value)\n    {\n        Value = value;\n        Left = null;\n        Right = null;\n    }\n}\n\nclass BST<T> where T : IComparable<T>\n{\n    public Node<T> Root { get; private set; }\n\n    public void Insert(T value) { /* TODO */ }\n    public bool Search(T value) { return false; /* TODO */ }\n    public void InOrder(Node<T> node) { /* TODO */ }\n}\n\n// Build and test your BST\n',
                    keywords: ['class', 'generic', 'IComparable', 'null', 'recursive'],
                    maxScore: 100
                },
                {
                    title: { en: 'Task Scheduler with Priority Queue', cz: 'Plánovač úloh s prioritní frontou' },
                    description: { en: 'Schedule tasks using a sorted priority system', cz: 'Plánuj úlohy pomocí systému řazených priorit' },
                    challenge: {
                        en: '<p>Create a <strong>Task Scheduler</strong> that manages tasks with priorities.</p><ul><li>Create a <code>Task</code> class implementing <code>IComparable</code> with Name, Priority, Deadline, and Status</li><li>Use a <code>SortedSet</code> or sorted <code>List</code> to maintain task order</li><li>Support adding, executing (pop highest priority), and listing tasks</li><li>Add deadline tracking using <code>DateTime</code></li><li>Implement a method to show overdue tasks</li></ul>',
                        cz: '<p>Vytvoř <strong>plánovač úloh</strong>, který spravuje úlohy s prioritami.</p><ul><li>Vytvoř třídu <code>Task</code> implementující <code>IComparable</code> se jménem, prioritou, termínem a stavem</li><li>Použij <code>SortedSet</code> nebo řazený <code>List</code> pro udržování pořadí úloh</li><li>Podporuj přidávání, vykonávání (pop nejvyšší priority) a výpis úloh</li><li>Přidej sledování termínů pomocí <code>DateTime</code></li><li>Implementuj metodu pro zobrazení úloh po termínu</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\nclass TaskItem : IComparable<TaskItem>\n{\n    public string Name { get; set; }\n    public int Priority { get; set; }\n    public DateTime Deadline { get; set; }\n    public string Status { get; set; } = "Pending";\n\n    public int CompareTo(TaskItem other)\n    {\n        return Priority.CompareTo(other.Priority);\n    }\n}\n\nclass Scheduler\n{\n    private List<TaskItem> queue = new List<TaskItem>();\n\n    public void AddTask(TaskItem task) { /* TODO */ }\n    public TaskItem ExecuteNext() { return null; /* TODO */ }\n}\n\n// Build and test\n',
                    keywords: ['class', 'IComparable', 'DateTime', 'List'],
                    maxScore: 100
                },
                {
                    title: { en: 'Plugin System', cz: 'Systém pluginů' },
                    description: { en: 'Build a dynamic plugin architecture using interfaces', cz: 'Vytvoř dynamickou architekturu pluginů pomocí rozhraní' },
                    challenge: {
                        en: '<p>Create a <strong>Plugin System</strong> using interfaces and dynamic registration.</p><ul><li>Define an <code>IPlugin</code> interface with Name, Version, and Execute method</li><li>Create a <code>PluginManager</code> class that registers and manages plugins</li><li>Implement at least two sample plugins implementing <code>IPlugin</code></li><li>Support enabling/disabling plugins at runtime</li><li>Add an event hook system using <code>Action</code> delegates (e.g., "OnStart", "OnData")</li></ul>',
                        cz: '<p>Vytvoř <strong>systém pluginů</strong> pomocí rozhraní a dynamické registrace.</p><ul><li>Definuj rozhraní <code>IPlugin</code> s vlastnostmi Name, Version a metodou Execute</li><li>Vytvoř třídu <code>PluginManager</code>, která registruje a spravuje pluginy</li><li>Implementuj alespoň dva ukázkové pluginy implementující <code>IPlugin</code></li><li>Podporuj zapínání a vypínání pluginů za běhu</li><li>Přidej systém hooků pomocí delegátů <code>Action</code> (např. "OnStart", "OnData")</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\n\ninterface IPlugin\n{\n    string Name { get; }\n    string Version { get; }\n    void Execute(string input);\n}\n\nclass PluginManager\n{\n    private Dictionary<string, IPlugin> plugins = new Dictionary<string, IPlugin>();\n    private Dictionary<string, List<Action<string>>> hooks = new Dictionary<string, List<Action<string>>>();\n\n    public void Register(IPlugin plugin) { /* TODO */ }\n    public void Enable(string name) { /* TODO */ }\n    public void Disable(string name) { /* TODO */ }\n    public void TriggerHook(string hookName, string data) { /* TODO */ }\n}\n\n// Define plugins and test\n',
                    keywords: ['interface', 'class', 'Action', 'Dictionary'],
                    maxScore: 100
                },
                {
                    title: { en: 'Data Pipeline', cz: 'Datový pipeline' },
                    description: { en: 'Build a data processing pipeline using LINQ and delegates', cz: 'Vytvoř datový zpracovatelský pipeline pomocí LINQ a delegátů' },
                    challenge: {
                        en: '<p>Create a <strong>Data Pipeline</strong> that processes data through chained stages using LINQ.</p><ul><li>Create a <code>Pipeline&lt;T&gt;</code> class that chains processing stages</li><li>Each stage is a <code>Func&lt;IEnumerable&lt;T&gt;, IEnumerable&lt;T&gt;&gt;</code></li><li>Include built-in stages: Where (filter), Select (map), OrderBy, and Take (limit)</li><li>Support custom stages via user-defined functions</li><li>Add error handling so a failing stage does not crash the pipeline</li></ul>',
                        cz: '<p>Vytvoř <strong>datový pipeline</strong>, který zpracovává data přes zřetězené fáze pomocí LINQ.</p><ul><li>Vytvoř třídu <code>Pipeline&lt;T&gt;</code>, která řetězí zpracovatelské fáze</li><li>Každá fáze je <code>Func&lt;IEnumerable&lt;T&gt;, IEnumerable&lt;T&gt;&gt;</code></li><li>Zahrň vestavěné fáze: Where (filtr), Select (mapa), OrderBy a Take (limit)</li><li>Podporuj vlastní fáze přes uživatelem definované funkce</li><li>Přidej ošetření chyb, aby selhávající fáze neshodila celý pipeline</li></ul>'
                    },
                    starter: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Pipeline<T>\n{\n    private IEnumerable<T> data;\n    private List<Func<IEnumerable<T>, IEnumerable<T>>> stages = new List<Func<IEnumerable<T>, IEnumerable<T>>>();\n\n    public Pipeline(IEnumerable<T> data)\n    {\n        this.data = data;\n    }\n\n    public Pipeline<T> AddStage(Func<IEnumerable<T>, IEnumerable<T>> stage)\n    {\n        stages.Add(stage);\n        return this; // allow chaining\n    }\n\n    public IEnumerable<T> Execute()\n    {\n        var result = data;\n        foreach (var stage in stages)\n        {\n            try { result = stage(result); }\n            catch (Exception e) { Console.WriteLine($"Stage failed: {e.Message}"); }\n        }\n        return result;\n    }\n}\n\n// Define stages and test\n',
                    keywords: ['class', 'generic', 'LINQ', 'Func', 'IEnumerable'],
                    maxScore: 100
                }
            ]
        }
    },

    // ─── Methods ────────────────────────────────────────────────────────

    /**
     * Map a user profile level to a tier name.
     * Levels 1-3 = beginner, 4-7 = intermediate, 8+ = advanced
     */
    levelToTier(level) {
        if (!level || level <= 3) return 'beginner';
        if (level <= 7) return 'intermediate';
        return 'advanced';
    },

    /**
     * Generate a hackathon challenge for the given language and level.
     * Avoids repeating the last 5 completed challenge titles.
     */
    generateChallenge(progLang, level) {
        const tier = this.levelToTier(level);
        const lang = progLang === 'csharp' ? 'csharp' : 'python';
        const pool = this.templates[lang][tier];

        if (!pool || pool.length === 0) return null;

        // Get recent history to avoid repetition
        const hackathonData = Storage.getHackathons();
        const history = hackathonData.history || [];
        const recentTitles = history
            .slice(-5)
            .map(h => h.title);

        // Filter out recently completed challenges
        let available = pool.filter(t => !recentTitles.includes(t.title.en));

        // If all have been done recently, allow any
        if (available.length === 0) {
            available = pool;
        }

        // Pick a random template
        const index = Math.floor(Math.random() * available.length);
        return available[index];
    },

    /**
     * Evaluate a hackathon submission.
     * Returns a score from 0 to 100 based on three categories:
     *   - Keywords (30 pts): proportion of expected keywords found in code
     *   - Code quality (40 pts): length, lines, output, functions/classes
     *   - Creativity (30 pts): comments, multiple functions, error handling
     */
    evaluate(code, output, challenge, progLang) {
        if (!code || typeof code !== 'string') return 0;

        const codeLower = code.toLowerCase();
        let totalScore = 0;

        // ── 1. Keywords (30 points) ─────────────────────────────
        const keywords = challenge.keywords || [];
        if (keywords.length > 0) {
            let found = 0;
            keywords.forEach(kw => {
                if (codeLower.includes(kw.toLowerCase())) {
                    found++;
                }
            });
            totalScore += Math.round((found / keywords.length) * 30);
        }

        // ── 2. Code Quality (40 points) ─────────────────────────
        // 10 pts: code length > 20 characters
        if (code.length > 20) {
            totalScore += 10;
        }

        // 10 pts: at least 5 lines of code
        const lines = code.split('\n').filter(l => l.trim().length > 0);
        if (lines.length >= 5) {
            totalScore += 10;
        }

        // 10 pts: produced any output
        if (output && output.trim().length > 0) {
            totalScore += 10;
        }

        // 10 pts: defines functions or classes
        let hasFuncOrClass = false;
        if (progLang === 'python') {
            hasFuncOrClass = /\bdef\s+\w+/.test(code) || /\bclass\s+\w+/.test(code);
        } else {
            // C#: look for method or class declarations
            hasFuncOrClass = /\b(void|int|string|double|bool|static)\s+\w+\s*\(/.test(code) || /\bclass\s+\w+/.test(code);
        }
        if (hasFuncOrClass) {
            totalScore += 10;
        }

        // ── 3. Creativity (30 points) ───────────────────────────
        // 10 pts: 2+ comments
        let commentCount = 0;
        if (progLang === 'python') {
            commentCount = (code.match(/#[^\n]*/g) || []).length;
        } else {
            commentCount = (code.match(/\/\/[^\n]*/g) || []).length + (code.match(/\/\*[\s\S]*?\*\//g) || []).length;
        }
        if (commentCount >= 2) {
            totalScore += 10;
        }

        // 10 pts: 2+ functions/methods
        let funcCount = 0;
        if (progLang === 'python') {
            funcCount = (code.match(/\bdef\s+\w+/g) || []).length;
        } else {
            funcCount = (code.match(/\b(void|int|string|double|bool|static|public|private|protected)\s+\w+\s*\(/g) || []).length;
        }
        if (funcCount >= 2) {
            totalScore += 10;
        }

        // 10 pts: error handling (try/except or try/catch)
        let hasErrorHandling = false;
        if (progLang === 'python') {
            hasErrorHandling = /\btry\s*:/.test(code) && /\bexcept\b/.test(code);
        } else {
            hasErrorHandling = /\btry\s*\{/.test(code) && /\bcatch\s*\(/.test(code);
        }
        if (hasErrorHandling) {
            totalScore += 10;
        }

        // Clamp to 0-100
        return Math.max(0, Math.min(100, totalScore));
    }
};
