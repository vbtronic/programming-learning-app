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
    messages: [],

    // Check if WebGPU is available
    checkSupport() {
        this.supported = !!(navigator.gpu);
        return this.supported;
    },

    // Initialize with lesson context
    init(lessonTitle, lessonContent, lang) {
        this.lessonContext = { title: lessonTitle, content: lessonContent, lang: lang };
        this.messages = [];
        this.updateStatus('');
        const body = document.getElementById('ai-chat-body');
        if (body) body.classList.add('hidden');
        const toggle = document.getElementById('ai-chat-toggle');
        if (toggle) toggle.innerHTML = '&#x25BC;';
        const messagesEl = document.getElementById('ai-chat-messages');
        if (messagesEl) messagesEl.innerHTML = '';
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
        this.updateStatus(I18n.currentLang === 'cz' ? 'Načítání AI modelu...' : 'Loading AI model...');

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
            this.updateStatus(I18n.currentLang === 'cz' ? 'AI připraveno' : 'AI ready');
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

    // Build system prompt with lesson context
    buildSystemPrompt() {
        const ctx = this.lessonContext;
        const lang = I18n.currentLang === 'cz' ? 'Czech' : 'English';
        return `You are a helpful programming tutor. The student is studying "${ctx.title}" in ${ctx.lang}. Answer in ${lang}. Keep responses short (2-3 sentences). Use code examples when helpful.`;
    },

    // Fallback: keyword-based responses
    getFallbackResponse(userMsg) {
        const msg = userMsg.toLowerCase();
        const cz = I18n.currentLang === 'cz';
        const ctx = this.lessonContext;

        // Greeting
        if (/^(hi|hello|hey|ahoj|čau|zdravím)/i.test(msg)) {
            return cz
                ? 'Ahoj! Jsem tvůj AI asistent pro tuto lekci. Zeptej se mě na cokoliv o tématu "' + ctx.title + '".'
                : 'Hi! I\'m your AI assistant for this lesson. Ask me anything about "' + ctx.title + '".';
        }

        // Help / explain
        if (/help|pomoc|explain|vysvětli|jak|how/i.test(msg)) {
            return cz
                ? 'Tato lekce se zabývá tématem "' + ctx.title + '". Zkus si projít příklady kódu v lekci a experimentovat s nimi v testu. Pokud něčemu nerozumíš, zeptej se mě konkrétněji!'
                : 'This lesson covers "' + ctx.title + '". Try going through the code examples and experimenting with them in the test. If you need help with something specific, ask me!';
        }

        // Error / bug / chyba
        if (/error|chyba|bug|nefunguje|doesn.t work|fix/i.test(msg)) {
            return cz
                ? 'Zkontroluj si: 1) Správnou syntaxi (závorky, uvozovky, odsazení), 2) Názvy proměnných (velká/malá písmena), 3) Typy dat. Zkopíruj sem chybovou hlášku a pomůžu ti.'
                : 'Check: 1) Correct syntax (brackets, quotes, indentation), 2) Variable names (case-sensitive), 3) Data types. Share the error message and I can help more.';
        }

        // Example / příklad
        if (/example|příklad|ukaz|show|sample/i.test(msg)) {
            return cz
                ? 'Podívej se na příklady kódu v lekci výše - jsou interaktivní. Můžeš je zkopírovat do testu a experimentovat s nimi.'
                : 'Check the code examples in the lesson above - they are interactive. You can copy them to the test editor and experiment.';
        }

        // Tip / rada
        if (/tip|rada|advice|suggest|doporuč/i.test(msg)) {
            const tips = cz ? [
                'Piš kód po malých krocích a testuj po každé změně.',
                'Čti chybové hlášky pozorně - většinou ti přesně řeknou, co je špatně.',
                'Neboj se experimentovat - nejlepší způsob učení je praxe!',
                'Pokud nevíš jak začít, zkus nejdřív napsat komentáře s plánem.'
            ] : [
                'Write code in small steps and test after each change.',
                'Read error messages carefully - they usually tell you exactly what\'s wrong.',
                'Don\'t be afraid to experiment - the best way to learn is by doing!',
                'If you\'re stuck, try writing comments with your plan first.'
            ];
            return tips[Math.floor(Math.random() * tips.length)];
        }

        // Default
        return cz
            ? 'Dobrá otázka! Téma "' + ctx.title + '" je důležité. Projdi si lekci a zkus příklady. Pokud potřebuješ konkrétní pomoc, napiš mi podrobněji co potřebuješ.'
            : 'Good question! The topic "' + ctx.title + '" is important. Review the lesson and try the examples. If you need specific help, tell me more about what you need.';
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
            loading.textContent = text;
        }
        this.messages.push({ sender: 'ai', text });
    }
};
