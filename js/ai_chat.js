/* ============================
   AI Chat Module
   WebLLM (WebGPU) with keyword-based fallback
   ============================ */

const AIChat = {
    engine: null,
    loading: false,
    ready: false,
    supported: false,
    lessonContext: null,
    editorId: null,
    messages: [],

    // Check if WebGPU is available
    checkSupport() {
        this.supported = !!(navigator.gpu);
        return this.supported;
    },

    // Initialize with lesson/test/hackathon context
    init(title, content, lang, editorId) {
        this.lessonContext = { title: title, content: content, lang: lang };
        this.editorId = editorId || null;
        this.messages = [];
    },

    // Render AI chat panel into any container
    renderPanel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Check if AI is disabled
        const profile = Storage.getProfile();
        if (profile.aiDisabled) {
            container.innerHTML = '';
            return;
        }

        // Clear other AI chat containers to avoid duplicate IDs in the DOM
        ['lesson-ai-chat-container', 'test-ai-chat-container', 'hackathon-ai-chat-container'].forEach(function(id) {
            if (id !== containerId) {
                var el = document.getElementById(id);
                if (el) el.innerHTML = '';
            }
        });

        container.innerHTML =
            '<div class="ai-chat-panel" id="ai-chat-panel">' +
                '<div class="ai-chat-header" onclick="App.toggleAIChat()">' +
                    '<span class="ai-chat-icon">&#x1F916;</span>' +
                    '<span data-i18n="ai.chatTitle">' + I18n.t('ai.chatTitle') + '</span>' +
                    '<span class="ai-chat-status" id="ai-chat-status"></span>' +
                    '<span class="ai-chat-toggle" id="ai-chat-toggle">&#x25BC;</span>' +
                '</div>' +
                '<div class="ai-chat-body hidden" id="ai-chat-body">' +
                    '<div class="ai-chat-messages" id="ai-chat-messages"></div>' +
                    '<div class="ai-chat-input-row">' +
                        '<input type="text" class="input ai-chat-input" id="ai-chat-input" ' +
                            'placeholder="' + I18n.t('ai.placeholder') + '" ' +
                            'onkeydown="if(event.key===\'Enter\')App.sendAIMessage()">' +
                        '<button class="btn btn-primary ai-chat-send" onclick="App.sendAIMessage()">' + I18n.t('ai.send') + '</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
    },

    // Load WebLLM engine (lazy)
    async loadEngine() {
        if (this.ready) return true;
        if (this.loading) return false;

        if (!this.checkSupport()) {
            this.updateStatus('');
            return false;
        }

        this.loading = true;
        this.updateStatus(I18n.currentLang === 'cz' ? 'Nac\u030ci\u0301ta\u0301ni\u0301 AI modelu...' : 'Loading AI model...');

        try {
            const webllm = await import('https://cdn.jsdelivr.net/npm/@anthropic-ai/web-llm@0.2.73/+esm');
            this.engine = await webllm.CreateMLCEngine('SmolLM2-135M-Instruct-q4f16_1-MLC', {
                initProgressCallback: (progress) => {
                    if (progress.text) {
                        this.updateStatus(progress.text);
                    }
                }
            });
            this.ready = true;
            this.loading = false;
            this.updateStatus(I18n.currentLang === 'cz' ? 'AI pr\u030ci\u0301praveno' : 'AI ready');
            return true;
        } catch (e) {
            console.warn('WebLLM failed to load:', e);
            this.loading = false;
            this.ready = false;
            this.updateStatus('');
            return false;
        }
    },

    // Update status display
    updateStatus(text) {
        const el = document.getElementById('ai-chat-status');
        if (el) el.textContent = text;
    },

    // Send message to AI
    async sendMessage(userMsg) {
        if (!userMsg.trim()) return;

        // Add user message
        this.addMessage('user', userMsg);

        const input = document.getElementById('ai-chat-input');
        if (input) input.value = '';

        // Try WebLLM first
        if (this.ready && this.engine) {
            try {
                this.addMessage('ai', '...', true);
                const systemPrompt = this.buildSystemPrompt();
                const msgs = [
                    { role: 'system', content: systemPrompt },
                    ...this.messages.filter(m => m.role !== 'system').slice(-6).map(m => ({
                        role: m.sender === 'user' ? 'user' : 'assistant',
                        content: m.text
                    }))
                ];
                const response = await this.engine.chat.completions.create({
                    messages: msgs,
                    max_tokens: 300,
                    temperature: 0.7
                });
                const aiText = response.choices[0].message.content;
                this.replaceLastMessage(aiText);
                return;
            } catch (e) {
                console.warn('WebLLM chat error:', e);
                this.replaceLastMessage(this.getFallbackResponse(userMsg));
                return;
            }
        }

        // Fallback: keyword-based response
        const response = this.getFallbackResponse(userMsg);
        this.addMessage('ai', response);
    },

    // Build system prompt with context + user code
    buildSystemPrompt() {
        const ctx = this.lessonContext;
        const lang = I18n.currentLang === 'cz' ? 'Czech' : 'English';
        let prompt = 'You are a collaborative programming assistant. You work together with the student on "' + ctx.title + '" in ' + ctx.lang + '. Answer in ' + lang + '. Keep responses short (2-3 sentences). Always wrap code examples in triple backtick code blocks (```' + ctx.lang + ' ... ```). Help improve their code, suggest ideas, and collaborate on solutions.';

        // Include lesson/test content if available
        if (ctx.content && ctx.content.length > 0) {
            // Strip HTML tags for plain text context, truncate to 800 chars
            var plainContent = ctx.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            if (plainContent.length > 800) plainContent = plainContent.substring(0, 800) + '...';
            prompt += '\n\nLesson/task content: ' + plainContent;
        }

        // Include current editor code if available
        if (this.editorId && typeof CodeEditor !== 'undefined') {
            try {
                const code = CodeEditor.getCode(this.editorId);
                if (code && code.trim().length > 0) {
                    const truncated = code.substring(0, 500);
                    prompt += '\n\nStudent\'s current code:\n```\n' + truncated + '\n```';
                }
            } catch (e) { /* editor not available */ }
        }

        return prompt;
    },

    // Fallback: keyword-based responses with code blocks for editor insertion
    getFallbackResponse(userMsg) {
        const msg = userMsg.toLowerCase();
        const cz = I18n.currentLang === 'cz';
        const ctx = this.lessonContext;
        const isPython = ctx.lang === 'python';

        // Get user code for context-aware fallback
        let userCode = '';
        if (this.editorId && typeof CodeEditor !== 'undefined') {
            try { userCode = CodeEditor.getCode(this.editorId) || ''; } catch (e) {}
        }

        // Greeting
        if (/^(hi|hello|hey|ahoj|\u010dau|zdrav\u00edm)/i.test(msg)) {
            return cz
                ? 'Ahoj! Jsem tv\u016fj AI asistent. Spolupracujme na "' + ctx.title + '" \u2014 jak ti m\u016f\u017eu pomoct?'
                : 'Hi! I\'m your AI assistant. Let\'s collaborate on "' + ctx.title + '" \u2014 how can I help?';
        }

        // Code review request — return improved code in code block
        if (/review|zkontroluj|check.*code|pod\u00edvej.*k\u00f3d/i.test(msg) && userCode.trim()) {
            var lines = userCode.trim().split('\n').length;
            var hasFunctions = /def |function |class /i.test(userCode);
            var hasComments = /#|\/\//.test(userCode);
            var feedback = '';
            if (cz) {
                feedback = 'Tv\u016fj k\u00f3d m\u00e1 ' + lines + ' \u0159\u00e1dk\u016f. ';
                feedback += hasFunctions ? 'Pou\u017e\u00edv\u00e1\u0161 funkce - dob\u0159e! ' : 'Zkus rozd\u011blit k\u00f3d do funkc\u00ed. ';
                feedback += hasComments ? '' : 'P\u0159idej koment\u00e1\u0159e. ';
                feedback += 'Zde je vylep\u0161en\u00e1 verze:\n';
            } else {
                feedback = 'Your code has ' + lines + ' lines. ';
                feedback += hasFunctions ? 'Uses functions - good! ' : 'Try splitting into functions. ';
                feedback += hasComments ? '' : 'Add comments. ';
                feedback += 'Here\'s an improved version:\n';
            }
            // Add commented version of their code
            var commented = userCode.trim().split('\n').slice(0, 15).join('\n');
            if (!hasComments) {
                if (isPython) {
                    commented = '# ' + (cz ? 'Vylep\u0161en\u00fd k\u00f3d s koment\u00e1\u0159i' : 'Improved code with comments') + '\n' + commented;
                } else {
                    commented = '// ' + (cz ? 'Vylep\u0161en\u00fd k\u00f3d s koment\u00e1\u0159i' : 'Improved code with comments') + '\n' + commented;
                }
            }
            return feedback + '```' + ctx.lang + '\n' + commented + '\n```';
        }

        // Write/code/program request — generate example code
        if (/write|napi\u0161|code|k\u00f3d|program|vytvo\u0159|create|make|ud\u011blej/i.test(msg)) {
            if (isPython) {
                return (cz ? 'Zde je p\u0159\u00edklad k\u00f3du:\n' : 'Here\'s a code example:\n') +
                    '```python\n' +
                    '# ' + (cz ? 'P\u0159\u00edklad programu' : 'Example program') + '\n' +
                    'def main():\n' +
                    '    name = input("' + (cz ? 'Zadej jm\u00e9no: ' : 'Enter name: ') + '")\n' +
                    '    print(f"' + (cz ? 'Ahoj, {name}!' : 'Hello, {name}!') + '")\n' +
                    '    \n' +
                    '    numbers = [1, 2, 3, 4, 5]\n' +
                    '    total = sum(numbers)\n' +
                    '    print(f"' + (cz ? 'Sou\u010det: {total}' : 'Sum: {total}') + '")\n\n' +
                    'main()\n' +
                    '```\n' +
                    (cz ? 'M\u016f\u017ee\u0161 ho vlo\u017eit do editoru a upravit!' : 'You can insert it into the editor and modify it!');
            } else {
                return (cz ? 'Zde je p\u0159\u00edklad k\u00f3du:\n' : 'Here\'s a code example:\n') +
                    '```csharp\n' +
                    '// ' + (cz ? 'P\u0159\u00edklad programu' : 'Example program') + '\n' +
                    'Console.Write("' + (cz ? 'Zadej jm\u00e9no: ' : 'Enter name: ') + '");\n' +
                    'string name = Console.ReadLine();\n' +
                    'Console.WriteLine($"' + (cz ? 'Ahoj, {name}!' : 'Hello, {name}!') + '");\n\n' +
                    'int[] numbers = {1, 2, 3, 4, 5};\n' +
                    'int total = numbers.Sum();\n' +
                    'Console.WriteLine($"' + (cz ? 'Sou\u010det: {total}' : 'Sum: {total}') + '");\n' +
                    '```\n' +
                    (cz ? 'M\u016f\u017ee\u0161 ho vlo\u017eit do editoru a upravit!' : 'You can insert it into the editor and modify it!');
            }
        }

        // Help / explain — include a short code example
        if (/help|pomoc|explain|vysv\u011btli|jak|how/i.test(msg)) {
            if (isPython) {
                return (cz
                    ? 'Toto t\u00e9ma se t\u00fdk\u00e1 "' + ctx.title + '". Zde je z\u00e1kladn\u00ed p\u0159\u00edklad:\n'
                    : 'This topic covers "' + ctx.title + '". Here\'s a basic example:\n') +
                    '```python\n' +
                    '# ' + ctx.title + '\n' +
                    'print("Hello, World!")\n\n' +
                    'x = 10\n' +
                    'if x > 5:\n' +
                    '    print(f"x is {x}")\n' +
                    '```\n' +
                    (cz ? 'Zeptej se konkr\u00e9tn\u011bji pro podrobn\u011bj\u0161\u00ed pomoc!' : 'Ask more specifically for detailed help!');
            } else {
                return (cz
                    ? 'Toto t\u00e9ma se t\u00fdk\u00e1 "' + ctx.title + '". Zde je z\u00e1kladn\u00ed p\u0159\u00edklad:\n'
                    : 'This topic covers "' + ctx.title + '". Here\'s a basic example:\n') +
                    '```csharp\n' +
                    '// ' + ctx.title + '\n' +
                    'Console.WriteLine("Hello, World!");\n\n' +
                    'int x = 10;\n' +
                    'if (x > 5) {\n' +
                    '    Console.WriteLine($"x is {x}");\n' +
                    '}\n' +
                    '```\n' +
                    (cz ? 'Zeptej se konkr\u00e9tn\u011bji pro podrobn\u011bj\u0161\u00ed pomoc!' : 'Ask more specifically for detailed help!');
            }
        }

        // Error / bug — suggest fix with code block
        if (/error|chyba|bug|nefunguje|doesn.t work|fix/i.test(msg)) {
            if (userCode.trim()) {
                var codeLines = userCode.trim().split('\n');
                if (isPython) {
                    return (cz ? 'Pod\u00edv\u00e1m se na tv\u016fj k\u00f3d. Zkus toto:\n' : 'Looking at your code. Try this:\n') +
                        '```python\n' +
                        'try:\n' +
                        '    ' + (codeLines[0] || 'pass') + '\n' +
                        (codeLines.length > 1 ? '    ' + codeLines[1] + '\n' : '') +
                        'except Exception as e:\n' +
                        '    print(f"Error: {e}")\n' +
                        '```\n' +
                        (cz ? 'P\u0159idej try/except pro lep\u0161\u00ed o\u0161et\u0159en\u00ed chyb.' : 'Add try/except for better error handling.');
                } else {
                    return (cz ? 'Pod\u00edv\u00e1m se na tv\u016fj k\u00f3d. Zkus toto:\n' : 'Looking at your code. Try this:\n') +
                        '```csharp\n' +
                        'try {\n' +
                        '    ' + (codeLines[0] || '') + '\n' +
                        (codeLines.length > 1 ? '    ' + codeLines[1] + '\n' : '') +
                        '} catch (Exception e) {\n' +
                        '    Console.WriteLine($"Error: {e.Message}");\n' +
                        '}\n' +
                        '```\n' +
                        (cz ? 'P\u0159idej try/catch pro lep\u0161\u00ed o\u0161et\u0159en\u00ed chyb.' : 'Add try/catch for better error handling.');
                }
            }
            return cz
                ? 'Zkontroluj si: 1) Spr\u00e1vnou syntaxi, 2) N\u00e1zvy prom\u011bnn\u00fdch, 3) Typy dat.'
                : 'Check: 1) Syntax, 2) Variable names (case-sensitive), 3) Data types.';
        }

        // Example — return code example in code block
        if (/example|p\u0159\u00edklad|ukaz|show|sample/i.test(msg)) {
            if (isPython) {
                return (cz ? 'Zde je p\u0159\u00edklad:\n' : 'Here\'s an example:\n') +
                    '```python\n' +
                    '# ' + ctx.title + '\n' +
                    'for i in range(5):\n' +
                    '    print(f"' + (cz ? '\u010c\u00edslo' : 'Number') + ' {i}: {i * i}")\n\n' +
                    'data = ["a", "b", "c"]\n' +
                    'for item in data:\n' +
                    '    print(item.upper())\n' +
                    '```\n' +
                    (cz ? 'M\u016f\u017ee\u0161 ho vlo\u017eit do editoru tla\u010d\u00edtkem n\u00ed\u017ee!' : 'You can insert it into the editor with the button below!');
            } else {
                return (cz ? 'Zde je p\u0159\u00edklad:\n' : 'Here\'s an example:\n') +
                    '```csharp\n' +
                    '// ' + ctx.title + '\n' +
                    'for (int i = 0; i < 5; i++) {\n' +
                    '    Console.WriteLine($"' + (cz ? '\u010c\u00edslo' : 'Number') + ' {i}: {i * i}");\n' +
                    '}\n\n' +
                    'string[] data = {"a", "b", "c"};\n' +
                    'foreach (string item in data) {\n' +
                    '    Console.WriteLine(item.ToUpper());\n' +
                    '}\n' +
                    '```\n' +
                    (cz ? 'M\u016f\u017ee\u0161 ho vlo\u017eit do editoru tla\u010d\u00edtkem n\u00ed\u017ee!' : 'You can insert it into the editor with the button below!');
            }
        }

        // Tip
        if (/tip|rada|advice|suggest|doporu\u010d/i.test(msg)) {
            var tips = cz ? [
                'Pi\u0161 k\u00f3d po mal\u00fdch kroc\u00edch a testuj po ka\u017ed\u00e9 zm\u011bn\u011b.',
                '\u010cti chybov\u00e9 hl\u00e1\u0161ky pozorn\u011b - v\u011bt\u0161inou ti p\u0159esn\u011b \u0159eknou, co je \u0161patn\u011b.',
                'Neboj se experimentovat - nejlep\u0161\u00ed zp\u016fsob u\u010den\u00ed je praxe!',
                'Pokud nev\u00ed\u0161 jak za\u010d\u00edt, zkus nejd\u0159\u00edv napsat koment\u00e1\u0159e s pl\u00e1nem.'
            ] : [
                'Write code in small steps and test after each change.',
                'Read error messages carefully - they tell you what\'s wrong.',
                'Don\'t be afraid to experiment - learning by doing is the best!',
                'If you\'re stuck, try writing comments with your plan first.'
            ];
            return tips[Math.floor(Math.random() * tips.length)];
        }

        // Default — include a small code example
        if (isPython) {
            return (cz
                ? 'T\u00e9ma "' + ctx.title + '" je d\u016fle\u017eit\u00e9. Zde je mal\u00fd p\u0159\u00edklad:\n'
                : 'The topic "' + ctx.title + '" is important. Here\'s a small example:\n') +
                '```python\n' +
                'print("Hello!")\nx = 42\nprint(f"Answer: {x}")\n' +
                '```\n' +
                (cz ? 'Napi\u0161 mi v\u00edce o tom, co pot\u0159ebuje\u0161!' : 'Tell me more about what you need!');
        } else {
            return (cz
                ? 'T\u00e9ma "' + ctx.title + '" je d\u016fle\u017eit\u00e9. Zde je mal\u00fd p\u0159\u00edklad:\n'
                : 'The topic "' + ctx.title + '" is important. Here\'s a small example:\n') +
                '```csharp\n' +
                'Console.WriteLine("Hello!");\nint x = 42;\nConsole.WriteLine($"Answer: {x}");\n' +
                '```\n' +
                (cz ? 'Napi\u0161 mi v\u00edce o tom, co pot\u0159ebuje\u0161!' : 'Tell me more about what you need!');
        }
    },

    // Format AI message HTML - detect code blocks and add insert buttons
    formatMessageHTML(text) {
        const codeBlockRegex = /```(?:\w*\n?)([\s\S]*?)```/g;
        let hasCode = false;
        let firstCode = null;

        const formatted = text.replace(codeBlockRegex, function(match, code) {
            hasCode = true;
            if (!firstCode) firstCode = code.trim();
            var escaped = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return '<pre class="ai-code-block"><code>' + escaped + '</code></pre>';
        });

        if (hasCode && this.editorId) {
            var cz = I18n.currentLang === 'cz';
            return formatted +
                '<div class="ai-code-actions">' +
                    '<button class="ai-insert-code" onclick="AIChat.insertCodeToEditor(\'replace\')">' +
                        (cz ? '\u2B07 Nahradit v editoru' : '\u2B07 Replace in editor') +
                    '</button>' +
                    '<button class="ai-insert-code" onclick="AIChat.insertCodeToEditor(\'insert\')">' +
                        (cz ? '\u2B07 Vlo\u017Eit na kurzor' : '\u2B07 Insert at cursor') +
                    '</button>' +
                '</div>';
        }

        // Escape any remaining HTML for non-code text
        if (!hasCode) {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        return formatted;
    },

    // Insert code from last AI message into editor
    insertCodeToEditor(mode) {
        if (!this.editorId || !this.messages.length) return;
        // Find last AI message with code block
        for (var i = this.messages.length - 1; i >= 0; i--) {
            if (this.messages[i].sender === 'ai') {
                var match = /```(?:\w*\n?)([\s\S]*?)```/.exec(this.messages[i].text);
                if (match) {
                    var code = match[1].trim();
                    if (mode === 'replace') {
                        CodeEditor.setCode(this.editorId, code);
                    } else if (mode === 'insert') {
                        var editor = CodeEditor.get(this.editorId);
                        if (editor) {
                            editor.session.insert(editor.getCursorPosition(), code);
                        }
                    }
                    return;
                }
            }
        }
    },

    // Add message to chat UI
    addMessage(sender, text, isLoading) {
        const messagesEl = document.getElementById('ai-chat-messages');
        if (!messagesEl) return;

        if (!isLoading) {
            this.messages.push({ sender, text });
        }

        const bubble = document.createElement('div');
        bubble.className = 'ai-chat-bubble ai-chat-' + sender;
        if (isLoading) {
            bubble.classList.add('ai-chat-loading');
            bubble.innerHTML = '<span class="ai-dots"><span>.</span><span>.</span><span>.</span></span>';
        } else if (sender === 'ai') {
            bubble.innerHTML = this.formatMessageHTML(text);
        } else {
            bubble.textContent = text;
        }
        messagesEl.appendChild(bubble);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    },

    // Replace last message (for streaming / loading)
    replaceLastMessage(text) {
        const messagesEl = document.getElementById('ai-chat-messages');
        if (!messagesEl) return;
        const loading = messagesEl.querySelector('.ai-chat-loading');
        if (loading) {
            loading.classList.remove('ai-chat-loading');
            loading.innerHTML = this.formatMessageHTML(text);
        }
        this.messages.push({ sender: 'ai', text });
    }
};
