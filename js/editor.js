/* ============================
   Editor Module
   Ace Editor + Pyodide (Python) + C# transpiler
   ============================ */

const CodeEditor = {
    editors: {},       // multiple editor instances
    pyodide: null,     // Pyodide runtime
    pyodideLoading: false,
    pyodideReady: false,

    // Create an Ace editor instance
    create(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return null;

        const lang = options.lang || 'python';
        const mode = lang === 'python' ? 'ace/mode/python' : 'ace/mode/csharp';

        const editor = ace.edit(containerId);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        editor.setTheme(isLight ? 'ace/theme/chrome' : 'ace/theme/one_dark');
        editor.session.setMode(mode);
        editor.setFontSize(15);
        editor.setOptions({
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showPrintMargin: false,
            tabSize: 4,
            useSoftTabs: true,
            behavioursEnabled: true,
            wrap: true,
            minLines: 8,
            maxLines: 25
        });

        if (options.value) {
            editor.setValue(options.value, -1);
        }

        if (options.readOnly) {
            editor.setReadOnly(true);
        }

        this.editors[containerId] = editor;
        return editor;
    },

    // Get editor instance
    get(containerId) {
        return this.editors[containerId] || null;
    },

    // Get code from editor
    getCode(containerId) {
        const editor = this.get(containerId);
        return editor ? editor.getValue() : '';
    },

    // Set code in editor
    setCode(containerId, code) {
        const editor = this.get(containerId);
        if (editor) {
            editor.setValue(code, -1);
        }
    },

    // Set editor mode
    setMode(containerId, lang) {
        const editor = this.get(containerId);
        if (editor) {
            const mode = lang === 'python' ? 'ace/mode/python' : 'ace/mode/csharp';
            editor.session.setMode(mode);
        }
    },

    // Destroy editor
    destroy(containerId) {
        const editor = this.get(containerId);
        if (editor) {
            editor.destroy();
            delete this.editors[containerId];
        }
    },

    // Load Pyodide (Python WASM runtime)
    async loadPyodide() {
        if (this.pyodideReady) return this.pyodide;
        if (this.pyodideLoading) {
            // Wait for it to finish loading
            return new Promise(resolve => {
                const check = setInterval(() => {
                    if (this.pyodideReady) {
                        clearInterval(check);
                        resolve(this.pyodide);
                    }
                }, 200);
            });
        }

        this.pyodideLoading = true;
        try {
            // Load Pyodide script dynamically
            if (!window.loadPyodide) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            this.pyodide = await window.loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
            });
            this.pyodideReady = true;
            return this.pyodide;
        } catch (e) {
            console.error('Failed to load Pyodide:', e);
            this.pyodideLoading = false;
            throw e;
        }
    },

    // Pending input values for input() calls
    inputQueue: [],

    // Check if code uses input() or Console.ReadLine()
    needsInput(code, lang) {
        if (lang === 'python') return /\binput\s*\(/.test(code);
        return /Console\.ReadLine\s*\(/.test(code);
    },

    // Show input prompt before running code
    async collectInputs(code, lang, outputContainerId) {
        const outputEl = document.getElementById(outputContainerId);
        if (!outputEl) return [];

        // Count approximate input() calls
        let regex = lang === 'python' ? /\binput\s*\(/g : /Console\.ReadLine\s*\(/g;
        let matches = code.match(regex) || [];
        let count = Math.min(matches.length, 5); // max 5 inputs
        if (count === 0) count = 1;

        // Extract prompt texts from input("prompt") calls
        let prompts = [];
        if (lang === 'python') {
            let promptRegex = /\binput\s*\(\s*(?:["']([^"']*)["']|f["']([^"']*)["'])\s*\)/g;
            let m;
            while ((m = promptRegex.exec(code)) !== null) {
                prompts.push(m[1] || m[2] || '');
            }
        }

        return new Promise(resolve => {
            const form = document.createElement('div');
            form.className = 'input-prompt-form';
            form.innerHTML = '<div class="input-prompt-title">' +
                (I18n.currentLang === 'cz' ? 'Program vyžaduje vstup:' : 'Program requires input:') + '</div>';

            const inputs = [];
            for (let i = 0; i < count; i++) {
                const row = document.createElement('div');
                row.className = 'input-prompt-row';
                const label = prompts[i] || (I18n.currentLang === 'cz' ? 'Vstup ' + (i+1) : 'Input ' + (i+1));
                row.innerHTML = '<label>' + label + '</label>';
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'input input-prompt-field';
                inp.placeholder = label;
                row.appendChild(inp);
                form.appendChild(row);
                inputs.push(inp);
            }

            const btnRow = document.createElement('div');
            btnRow.className = 'input-prompt-actions';
            const runBtn = document.createElement('button');
            runBtn.className = 'btn btn-run';
            runBtn.textContent = I18n.currentLang === 'cz' ? '▶ Spustit' : '▶ Run';
            btnRow.appendChild(runBtn);
            form.appendChild(btnRow);

            outputEl.innerHTML = '';
            outputEl.appendChild(form);

            // Focus first input
            if (inputs[0]) inputs[0].focus();

            // Submit on enter in last field or button click
            const submit = () => {
                const values = inputs.map(inp => inp.value);
                outputEl.innerHTML = '';
                resolve(values);
            };
            runBtn.onclick = submit;
            inputs.forEach((inp, i) => {
                inp.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        if (i < inputs.length - 1) inputs[i+1].focus();
                        else submit();
                    }
                };
            });
        });
    },

    // Run Python code via Pyodide
    async runPython(code, inputValues) {
        try {
            const pyodide = await this.loadPyodide();

            // Setup input queue
            const inputSetup = inputValues && inputValues.length > 0
                ? `\n_input_queue = ${JSON.stringify(inputValues)}\n_input_index = 0\ndef input(prompt=""):\n    global _input_index\n    if _input_index < len(_input_queue):\n        val = _input_queue[_input_index]\n        _input_index += 1\n        print(str(prompt) + str(val))\n        return val\n    return ""\n`
                : '';

            // Capture stdout
            pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
${inputSetup}
            `);

            try {
                pyodide.runPython(code);
            } catch (pyErr) {
                const stderr = pyodide.runPython('sys.stderr.getvalue()');
                return { output: '', error: stderr || pyErr.message, success: false };
            }

            const stdout = pyodide.runPython('sys.stdout.getvalue()');
            const stderr = pyodide.runPython('sys.stderr.getvalue()');

            // Reset stdout/stderr
            pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
            `);

            if (stderr) {
                return { output: stdout, error: stderr, success: false };
            }
            return { output: stdout, error: '', success: true };
        } catch (e) {
            return { output: '', error: e.message || 'Unknown error', success: false };
        }
    },

    // Transpile C# to JavaScript (simplified)
    transpileCSharp(code) {
        let js = code;

        // Remove using statements
        js = js.replace(/^\s*using\s+[^;]+;\s*$/gm, '');

        // Remove namespace blocks (keep content)
        js = js.replace(/namespace\s+\w+[\w.]*\s*\{/g, '');

        // Remove class Program wrapper (keep content)
        js = js.replace(/class\s+Program\s*\{/g, '');
        js = js.replace(/static\s+void\s+Main\s*\([^)]*\)\s*\{/g, '');

        // Console.WriteLine -> console.log
        js = js.replace(/Console\.WriteLine\s*\(/g, 'console.log(');
        js = js.replace(/Console\.Write\s*\(/g, 'process.stdout.write(');
        // Console.ReadLine() -> read from input queue
        js = js.replace(/Console\.ReadLine\s*\(\s*\)/g, '(typeof _inputQueue !== "undefined" && _inputIdx < _inputQueue.length ? _inputQueue[_inputIdx++] : "")');

        // Type declarations: int x = 5; -> let x = 5;
        js = js.replace(/\b(int|long|float|double|decimal|string|bool|char|var)\s+(\w+)\s*=/g, 'let $2 =');
        js = js.replace(/\b(int|long|float|double|decimal|string|bool|char|var)\s+(\w+)\s*;/g, 'let $2;');

        // string interpolation: $"text {var}" -> `text ${var}`
        js = js.replace(/\$"([^"]*)"/g, (match, content) => {
            return '`' + content.replace(/\{/g, '${') + '`';
        });

        // List<T> -> array
        js = js.replace(/new\s+List<[^>]+>\s*\{([^}]*)\}/g, '[$1]');
        js = js.replace(/List<[^>]+>\s+(\w+)\s*=\s*new\s+List<[^>]+>\(\)/g, 'let $1 = []');

        // Dictionary<K,V> -> object
        js = js.replace(/new\s+Dictionary<[^>]+>\s*\{/g, '({');
        js = js.replace(/\{(\s*"[^"]+"\s*),\s*("[^"]*"|[\d.]+)\s*\}/g, '[$1]: $2');

        // .Count -> .length
        js = js.replace(/\.Count\b/g, '.length');
        js = js.replace(/\.Length\b/g, '.length');

        // .Add( -> .push(
        js = js.replace(/\.Add\s*\(/g, '.push(');

        // .Sort() -> .sort()
        js = js.replace(/\.Sort\s*\(\)/g, '.sort((a,b) => a-b)');

        // .ToUpper() -> .toUpperCase()
        js = js.replace(/\.ToUpper\s*\(\)/g, '.toUpperCase()');
        js = js.replace(/\.ToLower\s*\(\)/g, '.toLowerCase()');

        // .Contains( -> .includes(
        js = js.replace(/\.Contains\s*\(/g, '.includes(');

        // .ToString() -> .toString()
        js = js.replace(/\.ToString\s*\(\)/g, '.toString()');

        // foreach (var x in arr) -> for (let x of arr)
        js = js.replace(/foreach\s*\(\s*(var|int|string|char|float|double)\s+(\w+)\s+in\s+(\w+)\s*\)/g,
            'for (let $2 of $3)');

        // for (int i = 0; i < n; i++) -> for (let i = 0; i < n; i++)
        js = js.replace(/for\s*\(\s*(int|long)\s+/g, 'for (let ');

        // Convert class definitions (simplified)
        js = js.replace(/\bpublic\s+/g, '');
        js = js.replace(/\bprivate\s+/g, '');
        js = js.replace(/\bprotected\s+/g, '');
        js = js.replace(/\bstatic\s+/g, '');
        js = js.replace(/\bvirtual\s+/g, '');
        js = js.replace(/\boverride\s+/g, '');
        js = js.replace(/\babstract\s+/g, '');
        js = js.replace(/\bsealed\s+/g, '');
        js = js.replace(/\bvoid\s+/g, 'function ');
        js = js.replace(/\b(int|long|float|double|decimal|bool|string|char)\s+(\w+)\s*\(/g, 'function $2(');

        // Clean up class bodies - convert to JS class syntax
        js = js.replace(/class\s+(\w+)\s*:\s*(\w+)\s*\{/g, 'class $1 extends $2 {');

        // Properties: int X { get; set; } -> just remove them (use constructor)
        js = js.replace(/\b(int|string|bool|float|double)\s+\w+\s*\{\s*get;\s*set;\s*\}/g, '');

        // new ClassName() -> new ClassName()  (already valid JS if class exists)

        // Remove trailing closing braces for namespace/class wrappers
        // (this is approximate - removes unmatched closing braces)
        let braceCount = 0;
        for (let i = 0; i < js.length; i++) {
            if (js[i] === '{') braceCount++;
            if (js[i] === '}') braceCount--;
        }
        while (braceCount < 0) {
            const lastBrace = js.lastIndexOf('}');
            if (lastBrace >= 0) {
                js = js.substring(0, lastBrace) + js.substring(lastBrace + 1);
                braceCount++;
            } else break;
        }

        // Clean up empty lines
        js = js.replace(/\n{3,}/g, '\n\n');

        return js.trim();
    },

    // Run C# code (transpile to JS and execute in sandbox)
    async runCSharp(code, inputValues) {
        try {
            let jsCode = this.transpileCSharp(code);
            // Inject input queue for Console.ReadLine
            if (inputValues && inputValues.length > 0) {
                const queueCode = `const _inputQueue = ${JSON.stringify(inputValues)}; let _inputIdx = 0;\n`;
                jsCode = queueCode + jsCode;
            }
            return this.runJavaScript(jsCode);
        } catch (e) {
            return { output: '', error: 'Transpilation error: ' + e.message, success: false };
        }
    },

    // Run JavaScript in a sandboxed iframe
    runJavaScript(code) {
        return new Promise(resolve => {
            const iframe = document.createElement('iframe');
            iframe.sandbox = 'allow-scripts';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            let output = '';
            let error = '';
            let resolved = false;

            const cleanup = () => {
                if (!resolved) {
                    resolved = true;
                    window.removeEventListener('message', handler);
                    document.body.removeChild(iframe);
                }
            };

            const handler = (event) => {
                if (event.source !== iframe.contentWindow) return;
                const data = event.data;
                if (data.type === 'console') {
                    output += data.args.join(' ') + '\n';
                } else if (data.type === 'error') {
                    error = data.message;
                } else if (data.type === 'done') {
                    cleanup();
                    resolve({ output: output.trimEnd(), error, success: !error });
                }
            };

            window.addEventListener('message', handler);

            const html = `<!DOCTYPE html><html><body><script>
                const origLog = console.log;
                const origError = console.error;
                console.log = function() {
                    parent.postMessage({ type: 'console', args: Array.from(arguments).map(String) }, '*');
                };
                console.error = function() {
                    parent.postMessage({ type: 'console', args: Array.from(arguments).map(String) }, '*');
                };
                // Polyfill process.stdout.write for C# Console.Write
                const process = { stdout: { write: function(s) {
                    parent.postMessage({ type: 'console', args: [String(s)] }, '*');
                }}};
                try {
                    ${code}
                    parent.postMessage({ type: 'done' }, '*');
                } catch(e) {
                    parent.postMessage({ type: 'error', message: e.toString() }, '*');
                    parent.postMessage({ type: 'done' }, '*');
                }
            <\/script></body></html>`;

            iframe.srcdoc = html;

            // Timeout after 5 seconds
            setTimeout(() => {
                if (!resolved) {
                    cleanup();
                    resolve({ output: output.trimEnd(), error: 'Execution timed out (5s limit)', success: false });
                }
            }, 5000);
        });
    },

    // Run code based on language
    async run(code, lang, inputValues) {
        if (lang === 'python') {
            return this.runPython(code, inputValues);
        } else {
            return this.runCSharp(code, inputValues);
        }
    },

    // Display output in output panel
    displayOutput(containerId, result) {
        const el = document.getElementById(containerId);
        if (!el) return;

        el.innerHTML = '';

        if (result.output) {
            const outputSpan = document.createElement('span');
            outputSpan.textContent = result.output;
            el.appendChild(outputSpan);
        }

        if (result.error) {
            if (result.output) el.appendChild(document.createTextNode('\n'));
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error';
            errorSpan.textContent = result.error;
            el.appendChild(errorSpan);
        }

        if (!result.output && !result.error) {
            const emptySpan = document.createElement('span');
            emptySpan.className = 'success';
            emptySpan.textContent = '(no output)';
            el.appendChild(emptySpan);
        }
    }
};
