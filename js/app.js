/* ============================
   App Module - Main router, state, initialization
   ============================ */

const App = {
    state: {
        selectedProgLang: null,
        assessmentIndex: 0,
        assessmentScores: [],
        currentTestId: null
    },

    // Initialize app
    init() {
        // Merge extra lessons and tests (21-50)
        Lessons.mergeExtras();
        Tests.mergeExtras();

        // Load saved theme
        const savedTheme = localStorage.getItem('codelearn_theme') || 'dark';
        this.applyTheme(savedTheme);

        // Auto-detect browser language for first-time / pre-assessment users
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        const detectedLang = browserLang.startsWith('cs') || browserLang.startsWith('cz') ? 'cz' : 'en';

        // Check for existing profile
        if (Storage.hasProfile()) {
            const profile = Storage.getProfile();
            // If assessment not done yet, apply browser language detection
            if (!profile.assessmentDone && !profile.uiLangChosen) {
                profile.uiLang = detectedLang;
                Storage.saveProfile(profile);
            }
            I18n.init(profile.uiLang || detectedLang);
            this.updateNav();

            if (!profile.assessmentDone) {
                this.showPage('welcome');
            } else {
                this.route();
            }
        } else {
            I18n.init(detectedLang);
            // Pre-create profile with detected language
            const newProfile = Storage.getProfile();
            newProfile.uiLang = detectedLang;
            Storage.saveProfile(newProfile);
            this.showPage('welcome');
        }

        // Hash router
        window.addEventListener('hashchange', () => this.route());

        // Hide loading after a moment
        setTimeout(() => {
            document.getElementById('page-loading').classList.remove('active');
            if (!location.hash || location.hash === '#') {
                if (Storage.hasProfile() && Storage.getProfile().assessmentDone) {
                    location.hash = '#home';
                }
            }
        }, 300);
    },

    // Router
    route() {
        const hash = location.hash || '#';
        const profile = Storage.getProfile();

        // If no profile, show welcome
        if (!Storage.hasProfile() || !profile.assessmentDone) {
            if (hash !== '#assessment') {
                this.showPage('welcome');
                return;
            }
        }

        if (hash.startsWith('#lesson/')) {
            const id = parseInt(hash.split('/')[1]);
            this.showLesson(id);
        } else if (hash.startsWith('#test/')) {
            const id = parseInt(hash.split('/')[1]);
            this.showTest(id);
        } else if (hash === '#home') {
            this.showHome();
        } else if (hash === '#lessons') {
            this.showLessons();
        } else if (hash === '#badges') {
            this.showBadges();
        } else if (hash === '#history') {
            this.showHistory();
        } else if (hash === '#hackathons') {
            this.showHackathons();
        } else if (hash.startsWith('#hackathon/')) {
            const id = parseInt(hash.split('/')[1]);
            this.showHackathon(id);
        } else if (hash === '#help') {
            this.showHelp();
        } else if (hash === '#settings') {
            this.showSettings();
        } else if (hash === '#assessment') {
            this.showPage('assessment');
        } else {
            if (profile.assessmentDone) {
                this.showHome();
            } else {
                this.showPage('welcome');
            }
        }

        this.updateNav();
    },

    // Show/hide pages
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const page = document.getElementById('page-' + pageId);
        if (page) page.classList.add('active');
        // Hide mobile nav on welcome/assessment, show on other pages
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
            mobileNav.style.display = (pageId === 'welcome' || pageId === 'assessment') ? 'none' : '';
        }
        window.scrollTo(0, 0);
    },

    // Update navigation
    updateNav() {
        const progress = Storage.getProgress();
        document.getElementById('nav-points').textContent = progress.totalPoints + ' pts';

        const profile = Storage.getProfile();
        const langBtn = document.getElementById('nav-lang-toggle');
        // Show the OTHER language (the one you'd switch to)
        const otherLang = (profile.uiLang || 'en') === 'cz' ? 'EN' : 'CZ';
        langBtn.textContent = otherLang;

        // Active nav link
        const hash = location.hash || '#lessons';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
        // Active mobile nav
        document.querySelectorAll('.mobile-nav-item').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === hash);
        });
    },

    // Toggle UI language
    toggleLang() {
        const profile = Storage.getProfile();
        const newLang = profile.uiLang === 'cz' ? 'en' : 'cz';
        profile.uiLang = newLang;
        Storage.saveProfile(profile);
        I18n.setLanguage(newLang);
        this.updateNav();
        // Re-render current page
        this.route();
    },

    // Set UI language from welcome
    setUiLang(lang) {
        const profile = Storage.getProfile();
        profile.uiLang = lang;
        profile.uiLangChosen = true;
        Storage.saveProfile(profile);
        I18n.setLanguage(lang);
        this.updateNav();

        // Update button states
        document.querySelectorAll('.welcome-card:last-of-type .choice-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    },

    // Choose programming language
    chooseProgrammingLang(lang) {
        this.state.selectedProgLang = lang;
        const profile = Storage.getProfile();
        profile.progLang = lang;
        Storage.saveProfile(profile);

        // Update button states
        document.querySelectorAll('.lang-choice .choice-btn:not(.small)').forEach(btn => btn.classList.remove('selected'));
        event.currentTarget.classList.add('selected');

        document.getElementById('welcome-start-btn').disabled = false;
    },

    // Start assessment
    startAssessment() {
        if (!this.state.selectedProgLang && !Storage.getProfile().progLang) return;

        this.state.assessmentIndex = 0;
        this.state.assessmentScores = [];
        this.showPage('assessment');
        location.hash = '#assessment';
        this.loadAssessmentTask(0);
    },

    // Load assessment task
    loadAssessmentTask(index) {
        const profile = Storage.getProfile();
        const lang = profile.progLang;
        const uiLang = profile.uiLang || 'en';
        const task = Tests.getAssessmentTask(index, lang);

        if (!task) {
            this.showAssessmentResults();
            return;
        }

        const prefix = lang === 'csharp' ? 'cs' : 'py';

        document.getElementById('assessment-task-title').textContent =
            I18n.t(`assess.${prefix}.${task.id}.title`);
        document.getElementById('assessment-task-description').textContent =
            I18n.t(`assess.${prefix}.${task.id}.desc`);

        const diffEl = document.getElementById('assessment-task-difficulty');
        diffEl.textContent = I18n.t('difficulty.' + task.difficulty);
        diffEl.className = 'task-difficulty ' + task.difficulty;

        // Progress
        const total = Tests.getAssessmentCount();
        document.getElementById('assessment-progress-fill').style.width = ((index / total) * 100) + '%';
        document.getElementById('assessment-progress-text').textContent =
            I18n.t('assessment.taskOf', { current: index + 1, total: total });

        // Editor
        CodeEditor.destroy('assessment-editor');
        CodeEditor.create('assessment-editor', { lang: lang, value: task.starter || '' });

        // Clear output
        document.getElementById('assessment-output-content').textContent = '';

        // Show/hide back button
        const backBtn = document.getElementById('assessment-back-btn');
        if (backBtn) {
            if (index > 0) {
                backBtn.classList.remove('hidden');
            } else {
                backBtn.classList.add('hidden');
            }
        }

        // Show task, hide results
        document.getElementById('assessment-task').classList.remove('hidden');
        document.getElementById('assessment-results').classList.add('hidden');
    },

    // Run assessment code
    async runAssessmentCode() {
        const profile = Storage.getProfile();
        const code = CodeEditor.getCode('assessment-editor');
        const outputEl = document.getElementById('assessment-output-content');

        let inputValues = null;
        if (CodeEditor.needsInput(code, profile.progLang)) {
            inputValues = await CodeEditor.collectInputs(code, profile.progLang, 'assessment-output-content');
        } else {
            outputEl.innerHTML = '<span class="success">' + I18n.t('editor.running') + '</span>';
            if (profile.progLang === 'python') {
                outputEl.innerHTML = '<span class="success">' + I18n.t('editor.loadingPyodide') + '</span>';
            }
        }

        const result = await CodeEditor.run(code, profile.progLang, inputValues);
        CodeEditor.displayOutput('assessment-output-content', result);
    },

    // Submit assessment task
    async submitAssessmentTask() {
        const profile = Storage.getProfile();
        const code = CodeEditor.getCode('assessment-editor');
        const task = Tests.getAssessmentTask(this.state.assessmentIndex, profile.progLang);

        // Block empty submissions
        const trimmedCode = code.trim();
        const starterTrimmed = (task && task.starter || '').trim();
        if (!trimmedCode || trimmedCode === starterTrimmed) {
            this.showToast(I18n.t('test.emptyCode'), 'error');
            return;
        }

        // Run the code first
        const result = await CodeEditor.run(code, profile.progLang);
        CodeEditor.displayOutput('assessment-output-content', result);

        // Evaluate
        const score = Tests.evaluateAssessment(code, result.output, this.state.assessmentIndex, profile.progLang);
        this.state.assessmentScores.push(score);

        // Move to next
        this.state.assessmentIndex++;
        if (this.state.assessmentIndex >= Tests.getAssessmentCount()) {
            this.showAssessmentResults();
        } else {
            this.loadAssessmentTask(this.state.assessmentIndex);
        }
    },

    // Skip assessment task
    skipAssessmentTask() {
        this.state.assessmentScores.push(0);
        this.state.assessmentIndex++;
        if (this.state.assessmentIndex >= Tests.getAssessmentCount()) {
            this.showAssessmentResults();
        } else {
            this.loadAssessmentTask(this.state.assessmentIndex);
        }
    },

    // Go back to previous assessment task
    prevAssessmentTask() {
        if (this.state.assessmentIndex > 0) {
            this.state.assessmentIndex--;
            this.state.assessmentScores.pop();
            this.loadAssessmentTask(this.state.assessmentIndex);
        }
    },

    // Skip entire assessment
    skipAssessment() {
        this.state.assessmentScores = [0];
        this.showAssessmentResults();
    },

    // Show assessment results
    showAssessmentResults() {
        const totalScore = this.state.assessmentScores.reduce((a, b) => a + b, 0);
        const levelInfo = Tests.determineLevel(totalScore);
        const uiLang = Storage.getProfile().uiLang || 'en';

        // Update progress
        document.getElementById('assessment-progress-fill').style.width = '100%';

        // Hide task, show results
        document.getElementById('assessment-task').classList.add('hidden');
        document.getElementById('assessment-results').classList.remove('hidden');

        // Score display
        const scoreEl = document.getElementById('assessment-result-score');
        scoreEl.textContent = totalScore;
        scoreEl.className = 'result-score ' + (totalScore > 500 ? 'good' : totalScore > 200 ? 'medium' : 'low');

        // Level
        document.getElementById('assessment-result-level').textContent = I18n.t('level.' + levelInfo.level);
        document.getElementById('assessment-result-start').textContent = I18n.t('level.startFrom', { num: levelInfo.startLesson });

        // Save assessment score
        const progress = Storage.getProgress();
        progress.assessmentScore = totalScore;
        progress.currentLesson = levelInfo.startLesson;
        Storage.saveProgress(progress);
    },

    // Finish assessment (save profile and start learning)
    finishAssessment() {
        const profile = Storage.getProfile();
        const progress = Storage.getProgress();

        profile.name = document.getElementById('profile-name').value.trim() || profile.name;
        profile.description = this.sanitize(document.getElementById('profile-description').value.trim()) || profile.description;
        profile.assessmentDone = true;
        profile.level = Tests.determineLevel(progress.assessmentScore || 0).level;
        profile.startLesson = progress.currentLesson || 1;

        // Mark assessment as done for current programming language
        profile[profile.progLang + 'AssessmentDone'] = true;

        // If this was a language switch assessment, stay on new language
        if (profile.origProgLang) {
            delete profile.origProgLang;
            delete profile.secondLangId;
        }

        Storage.saveProfile(profile);

        // Add initial points (30% of assessment score to prevent inflation)
        Storage.addPoints(Math.round((progress.assessmentScore || 0) * 0.3));

        location.hash = '#home';
        this.updateNav();
    },

    // ==================== HOME ====================

    showHome() {
        this.showPage('home');
        const profile = Storage.getProfile();
        const progress = Storage.getProgress();
        const uiLang = profile.uiLang || 'en';
        const total = Lessons.getTotalCount();
        const completedCount = progress.completedLessons.filter(l => l.lang === profile.progLang).length;

        const statsEl = document.getElementById('home-stats');
        statsEl.innerHTML = `
            <div class="home-stat-card">
                <div class="home-stat-value">${completedCount}/${total}</div>
                <div class="home-stat-label">${I18n.t('stats.completed')}</div>
            </div>
            <div class="home-stat-card">
                <div class="home-stat-value">${progress.totalPoints}</div>
                <div class="home-stat-label">${I18n.t('stats.totalPoints')}</div>
            </div>
            <div class="home-stat-card">
                <div class="home-stat-value">${progress.currentLesson}</div>
                <div class="home-stat-label">${I18n.t('home.currentLesson')}</div>
            </div>
            <div class="home-stat-card">
                <div class="home-stat-value">${Storage.getBadges().owned.length}</div>
                <div class="home-stat-label">${I18n.t('home.badgesOwned')}</div>
            </div>
        `;

        // Update greeting
        const subtitleEl = document.querySelector('.home-subtitle');
        if (subtitleEl && profile.name) {
            subtitleEl.textContent = I18n.t('home.welcomeBack', { name: profile.name });
        }
    },

    // ==================== LESSONS ====================

    showLessons() {
        this.showPage('lessons');
        const profile = Storage.getProfile();
        const progress = Storage.getProgress();
        const progLang = profile.progLang;
        const uiLang = profile.uiLang || 'en';
        const cz = uiLang === 'cz';
        const total = Lessons.getTotalCount();

        // Personalized greeting
        const greetingEl = document.getElementById('lessons-greeting');
        if (greetingEl) {
            if (profile.name) {
                greetingEl.textContent = I18n.t('lessons.greeting', { name: profile.name });
                greetingEl.classList.remove('hidden');
            } else {
                greetingEl.classList.add('hidden');
            }
        }

        // Progress text
        const completedCount = progress.completedLessons.filter(l => l.lang === progLang).length;
        document.getElementById('lessons-progress-text').textContent =
            I18n.t('lessons.progress', { done: completedCount, total: total });

        // Render grid
        const grid = document.getElementById('lessons-grid');
        grid.innerHTML = '';

        for (const lesson of Lessons.list) {
            const isHackathon = lesson.hackathon === true;
            // Hackathon lessons: show generic title/desc instead of topic
            const title = isHackathon
                ? ('Hackathon #' + lesson.id)
                : Lessons.getTitle(lesson, progLang, uiLang);
            const desc = isHackathon
                ? (cz ? 'Volné programování — ukaž své dovednosti!' : 'Free coding — show your skills!')
                : Lessons.getDescription(lesson, progLang, uiLang);
            const isCompleted = Storage.isLessonCompleted(lesson.id, progLang);
            const isLocked = lesson.id > progress.currentLesson && !isCompleted;
            const testScore = Storage.getTestScore(lesson.id, progLang);

            let classes = 'lesson-card';
            if (isCompleted) classes += ' completed';
            if (isLocked) classes += ' locked';
            if (isHackathon) classes += ' hackathon';

            const diffDots = Array.from({ length: 5 }, (_, i) =>
                `<span class="diff-dot ${i < lesson.difficulty ? 'filled' : ''}"></span>`
            ).join('');

            let scoreHtml = '';
            if (testScore > 0) {
                const cls = testScore >= 50 ? 'passed' : 'failed';
                scoreHtml = `<span class="lesson-card-score ${cls}">${testScore}/100</span>`;
            }

            const card = document.createElement('div');
            card.className = classes;
            card.innerHTML =
                (isHackathon ? '<span class="lesson-card-hackathon-badge">&#x1F680;</span>' : '') +
                `<div class="lesson-card-number">${I18n.t('lesson.lessonN', { n: lesson.id })}</div>
                <div class="lesson-card-title">${title}</div>
                <div class="lesson-card-desc">${desc}</div>
                <div class="lesson-card-meta">
                    <div class="lesson-card-difficulty">${diffDots}</div>
                    ${scoreHtml}
                </div>`;

            if (!isLocked) {
                card.addEventListener('click', () => {
                    location.hash = '#lesson/' + lesson.id;
                });
            } else {
                card.title = I18n.t('lessons.locked');
            }

            grid.appendChild(card);
        }
    },

    // Show single lesson
    showLesson(id) {
        const lesson = Lessons.getLesson(id);
        if (!lesson) { location.hash = '#lessons'; return; }

        // Hackathon lessons → show as free hackathon (no tips, no topic)
        if (lesson.hackathon) {
            this.showHackathonLesson(id, lesson);
            return;
        }

        this.showPage('lesson');
        const profile = Storage.getProfile();
        const progLang = profile.progLang;
        const uiLang = profile.uiLang || 'en';

        document.getElementById('lesson-number').textContent = I18n.t('lesson.lessonN', { n: id });

        const content = Lessons.getContent(lesson, progLang, uiLang);
        const contentEl = document.getElementById('lesson-content');
        contentEl.innerHTML = content;

        // Append practice section based on test keywords to reinforce tested concepts
        try {
            const test = Tests.getLessonTest(id, progLang) || (typeof TestsExtra !== 'undefined' ? TestsExtra[progLang === 'csharp' ? 'csharp' : 'python'].find(function(t) { return t.id === id; }) : null);
            if (test && test.keywords && test.keywords.length > 0) {
                const cz = uiLang === 'cz';
                const heading = cz ? 'Procvič si' : 'Practice';
                const intro = cz
                    ? 'Zkus si tyto koncepty v editoru, než přejdeš k testu:'
                    : 'Try these concepts in the editor before taking the test:';
                const kwList = test.keywords.map(function(kw) { return '<code>' + kw + '</code>'; }).join(', ');
                const hint = cz
                    ? 'V testu budeš potřebovat: ' + kwList
                    : 'In the test you will need: ' + kwList;
                contentEl.innerHTML += '<div class="practice-section"><h3>' + heading + '</h3><p>' + intro + '</p><p>' + hint + '</p></div>';
            }
        } catch (e) { console.warn('Practice section error:', e); }

        // Highlight code blocks
        contentEl.querySelectorAll('pre code').forEach(block => {
            if (window.hljs) hljs.highlightElement(block);
        });

        // Go to test button
        document.getElementById('lesson-go-test').onclick = () => {
            location.hash = '#test/' + id;
        };

        // Initialize AI chat with full lesson context
        const title = lesson.title[progLang][uiLang] || lesson.title[progLang].en;
        AIChat.init(title, content, progLang, null);
        AIChat.renderPanel('lesson-ai-chat-container');
    },

    // Show hackathon-type lesson as free coding (no tips, no topic)
    showHackathonLesson(id, lesson) {
        this.showPage('hackathon');
        const profile = Storage.getProfile();
        const progLang = profile.progLang;

        // Just title, no description or hints
        const challengeEl = document.getElementById('hackathon-challenge');
        var title = 'Hackathon #' + id;
        challengeEl.innerHTML = '<h1>' + title + '</h1>';

        // Empty editor (no starter code)
        var starter = '';
        CodeEditor.destroy('hackathon-editor');
        CodeEditor.create('hackathon-editor', { lang: progLang, value: starter });

        // Clear output/results
        document.getElementById('hackathon-output-content').textContent = '';
        document.getElementById('hackathon-results').classList.add('hidden');
        var controls = document.querySelector('#page-hackathon .editor-controls');
        if (controls) controls.classList.remove('hidden');

        // Create a temporary hackathon object so submit works
        var hackathons = Storage.getHackathons();
        if (!hackathons.active || hackathons.active.lessonId !== id) {
            hackathons.active = {
                id: hackathons.nextId,
                type: 'lesson',
                lessonId: id,
                title: { en: 'Hackathon #' + id, cz: 'Hackathon #' + id },
                description: { en: 'Free coding challenge', cz: 'Voln\u00e1 programovac\u00ed v\u00fdzva' },
                challenge: { en: '', cz: '' },
                starter: starter,
                keywords: [],
                maxScore: 100,
                createdAt: new Date().toISOString(),
                completedAt: null,
                score: null,
                code: null,
                output: null,
                aiCommentary: null
            };
            hackathons.nextId++;
            Storage.saveHackathons(hackathons);
        } else {
            // Resume existing lesson hackathon
            starter = hackathons.active.code || starter;
            CodeEditor.setCode('hackathon-editor', starter);
        }

        // Back button → lessons
        var backBtn = document.querySelector('#page-hackathon .btn-back');
        if (backBtn) backBtn.href = '#lessons';

        // AI Chat
        AIChat.init(title, '', progLang, 'hackathon-editor');
        AIChat.renderPanel('hackathon-ai-chat-container');
    },

    // Toggle AI chat panel
    toggleAIChat(prefix) {
        if (!prefix) prefix = AIChat.activePrefix || 'test';
        AIChat.activePrefix = prefix;
        var body = document.getElementById(prefix + '-ai-body');
        if (!body) {
            console.error('[AI] body not found:', prefix + '-ai-body');
            return;
        }
        var toggle = body.parentElement.querySelector('.ai-chat-toggle');

        if (body.style.display === 'flex') {
            // Hide
            body.style.display = 'none';
            if (toggle) toggle.innerHTML = '&#x25BC;';
        } else {
            // Show
            body.style.display = 'flex';
            body.classList.remove('hidden');
            if (toggle) toggle.innerHTML = '&#x25B2;';
            AIChat.loadEngine();
            var inputEl = document.getElementById(prefix + '-ai-input');
            if (inputEl) inputEl.focus();
        }
    },

    // Send AI chat message
    async sendAIMessage(prefix) {
        if (!prefix) prefix = AIChat.activePrefix || 'test';
        const input = document.getElementById(prefix + '-ai-input');
        if (!input) return;
        const msg = input.value.trim();
        if (!msg) return;
        await AIChat.sendMessage(msg);
    },

    // ==================== TESTS ====================

    showTest(id) {
        this.showPage('test');
        this.state.currentTestId = id;
        const profile = Storage.getProfile();
        const progLang = profile.progLang;
        const uiLang = profile.uiLang || 'en';
        const test = Tests.getLessonTest(id, progLang);

        if (!test) { location.hash = '#lessons'; return; }

        const title = test.title[uiLang] || test.title.en;
        const desc = test.desc[uiLang] || test.desc.en;

        document.getElementById('test-title').textContent =
            I18n.t('lesson.lessonN', { n: id }) + ': ' + title;
        document.getElementById('test-description').innerHTML = desc;

        // Create editor
        CodeEditor.destroy('test-editor');
        CodeEditor.create('test-editor', { lang: progLang, value: test.starter || '' });

        // Clear output and results, show controls
        document.getElementById('test-output-content').textContent = '';
        document.getElementById('test-results').classList.add('hidden');
        document.querySelector('#page-test .editor-controls').classList.remove('hidden');

        // Initialize AI chat with full test context (can see user's code)
        AIChat.init(title, desc, progLang, 'test-editor');
        AIChat.renderPanel('test-ai-chat-container');
    },

    // Run test code
    async runTestCode() {
        const profile = Storage.getProfile();
        const code = CodeEditor.getCode('test-editor');
        const outputEl = document.getElementById('test-output-content');

        // Check if code needs input
        let inputValues = null;
        if (CodeEditor.needsInput(code, profile.progLang)) {
            inputValues = await CodeEditor.collectInputs(code, profile.progLang, 'test-output-content');
        } else {
            outputEl.innerHTML = '<span class="success">' + I18n.t('editor.running') + '</span>';
            if (profile.progLang === 'python') {
                outputEl.innerHTML = '<span class="success">' + I18n.t('editor.loadingPyodide') + '</span>';
            }
        }

        const result = await CodeEditor.run(code, profile.progLang, inputValues);
        CodeEditor.displayOutput('test-output-content', result);
    },

    // Reset test code
    resetTestCode() {
        const profile = Storage.getProfile();
        const test = Tests.getLessonTest(this.state.currentTestId, profile.progLang);
        if (test) {
            CodeEditor.setCode('test-editor', test.starter || '');
        }
        document.getElementById('test-output-content').textContent = '';
        document.getElementById('test-results').classList.add('hidden');
    },

    // Submit test
    async submitTest() {
        const profile = Storage.getProfile();
        const progLang = profile.progLang;
        const code = CodeEditor.getCode('test-editor');
        const test = Tests.getLessonTest(this.state.currentTestId, progLang);

        if (!test) return;

        // Block empty submissions
        const trimmedCode = code.trim();
        const starterTrimmed = (test.starter || '').trim();
        if (!trimmedCode || trimmedCode === starterTrimmed) {
            this.showToast(I18n.t('test.emptyCode'), 'error');
            return;
        }

        // Hide editor controls to prevent double submission
        document.querySelector('#page-test .editor-controls').classList.add('hidden');

        // Collect inputs if needed
        let inputValues = null;
        if (CodeEditor.needsInput(code, progLang)) {
            inputValues = await CodeEditor.collectInputs(code, progLang, 'test-output-content');
        }

        // Run code
        const result = await CodeEditor.run(code, progLang, inputValues);
        CodeEditor.displayOutput('test-output-content', result);

        // Evaluate
        const score = Tests.evaluate(code, result.output, test, progLang);
        const passed = score >= 50;

        // Record score
        const record = Storage.recordTestScore(this.state.currentTestId, progLang, score);

        // Show results
        const resultsEl = document.getElementById('test-results');
        resultsEl.classList.remove('hidden');

        const scoreEl = document.getElementById('test-score-display');
        scoreEl.textContent = I18n.t('test.score', { score: score });
        scoreEl.className = 'test-score ' + (passed ? 'passed' : 'failed');

        const feedbackEl = document.getElementById('test-feedback');
        feedbackEl.textContent = passed
            ? I18n.t('test.passed', { points: record.pointsEarned })
            : I18n.t('test.failed');

        const actionsEl = document.getElementById('test-actions');
        actionsEl.innerHTML = '';

        if (passed && this.state.currentTestId < Lessons.getTotalCount()) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn btn-primary';
            nextBtn.textContent = I18n.t('test.nextLesson');
            nextBtn.onclick = () => { location.hash = '#lesson/' + (this.state.currentTestId + 1); };
            actionsEl.appendChild(nextBtn);
        }

        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-secondary';
        retryBtn.textContent = I18n.t('test.retryTest');
        retryBtn.onclick = () => { this.showTest(this.state.currentTestId); };
        actionsEl.appendChild(retryBtn);

        const backBtn = document.createElement('button');
        backBtn.className = 'btn btn-secondary';
        backBtn.textContent = I18n.t('test.backToLessons');
        backBtn.onclick = () => { location.hash = '#lessons'; };
        actionsEl.appendChild(backBtn);

        // Hackathon badge: auto-award when lesson 50 is passed
        if (passed && this.state.currentTestId === 50) {
            const badges = Storage.getBadges();
            if (!badges.owned.includes('hackathon_hero')) {
                badges.owned.push('hackathon_hero');
                Storage.saveBadges(badges);
                const uiLang = (Storage.getProfile().uiLang || 'en');
                const badge = Badges.getById('hackathon_hero');
                if (badge) {
                    const name = badge.name[uiLang] || badge.name.en;
                    this.showToast((uiLang === 'cz' ? 'Odznak udělen: ' : 'Badge awarded: ') + name + ' ' + badge.icon, 'success');
                }
            }
        }

        this.updateNav();
    },

    // ==================== BADGES ====================

    showBadges(filter) {
        this.showPage('badges');
        const profile = Storage.getProfile();
        const uiLang = profile.uiLang || 'en';
        const progress = Storage.getProgress();
        const badges = Storage.getBadges();

        document.getElementById('badges-points-display').textContent =
            I18n.t('badges.points', { pts: progress.totalPoints });
        const ownedEl = document.getElementById('badges-owned-count');
        ownedEl.textContent = this.formatBadgeCount(badges.owned.length);
        ownedEl.style.cursor = badges.owned.length > 0 ? 'pointer' : 'default';
        ownedEl.onclick = badges.owned.length > 0 ? () => this.showOwnedBadges() : null;

        // Restore filter buttons (in case we came back from owned view)
        const filterEl = document.querySelector('.badges-filter');
        filterEl.innerHTML =
            '<button class="filter-btn" onclick="App.filterBadges(\'all\')">' + I18n.t('badges.all') + '</button>' +
            '<button class="filter-btn" onclick="App.filterBadges(\'basic\')">' + I18n.t('badges.basic') + '</button>' +
            '<button class="filter-btn" onclick="App.filterBadges(\'intermediate\')">' + I18n.t('badges.intermediate') + '</button>' +
            '<button class="filter-btn" onclick="App.filterBadges(\'advanced\')">' + I18n.t('badges.advanced') + '</button>' +
            '<button class="filter-btn" onclick="App.filterBadges(\'legendary\')">' + I18n.t('badges.legendary') + '</button>';

        const currentFilter = filter || 'all';
        const filtered = Badges.getByCategory(currentFilter);
        const grid = document.getElementById('badges-grid');
        grid.innerHTML = filtered.map(b => Badges.renderCard(b, uiLang)).join('');

        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const cat = btn.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
            btn.classList.toggle('active', cat === currentFilter);
        });
    },

    filterBadges(category) {
        this.showBadges(category);
    },

    formatBadgeCount(count) {
        const uiLang = (Storage.getProfile().uiLang || 'en');
        if (uiLang === 'cz') {
            if (count === 0) return 'Vlastn\u00ed\u0161: 0 odznak\u016f';
            if (count === 1) return 'Vlastn\u00ed\u0161: 1 odznak';
            if (count >= 2 && count <= 4) return 'Vlastn\u00ed\u0161: ' + count + ' odznaky';
            return 'Vlastn\u00ed\u0161: ' + count + ' odznak\u016f';
        }
        if (count === 1) return 'Owned: 1 badge';
        return 'Owned: ' + count + ' badges';
    },

    showOwnedBadges() {
        this.showPage('badges');
        const profile = Storage.getProfile();
        const uiLang = profile.uiLang || 'en';
        const progress = Storage.getProgress();
        const badges = Storage.getBadges();
        const ownedBadges = Badges.getOwned();

        document.getElementById('badges-points-display').textContent =
            I18n.t('badges.points', { pts: progress.totalPoints });
        const ownedEl = document.getElementById('badges-owned-count');
        ownedEl.textContent = this.formatBadgeCount(badges.owned.length);
        ownedEl.style.cursor = 'default';
        ownedEl.onclick = null;

        // Replace filter bar with "My Badges" title + back button
        const filterEl = document.querySelector('.badges-filter');
        const myBadgesLabel = uiLang === 'cz' ? 'Moje odznaky' : 'My Badges';
        const backLabel = uiLang === 'cz' ? '\u2190 Zp\u011bt na v\u0161echny' : '\u2190 Back to all';
        filterEl.innerHTML = '<button class="filter-btn" onclick="App.showBadges()">' + backLabel + '</button>' +
            '<button class="filter-btn active">' + myBadgesLabel + '</button>';

        // Show only owned badges
        const grid = document.getElementById('badges-grid');
        if (ownedBadges.length === 0) {
            grid.innerHTML = '<p style="color:var(--text-muted);font-style:italic">' +
                I18n.t('settings.noBadges') + '</p>';
        } else {
            grid.innerHTML = ownedBadges.map(b => Badges.renderCard(b, uiLang)).join('');
        }
    },

    buyBadge(id) {
        const result = Badges.buy(id);
        const badge = Badges.getById(id);
        const uiLang = Storage.getProfile().uiLang || 'en';

        if (result.success) {
            const name = badge.name[uiLang] || badge.name.en;
            this.showToast(I18n.t('toast.badgeBought', { name: name }), 'success');
            this.showBadges();
            this.updateNav();
        } else if (result.reason === 'notEnoughPoints') {
            this.showToast(I18n.t('toast.notEnoughPoints'), 'error');
        } else if (result.reason === 'alreadyOwned') {
            this.showToast(I18n.t('toast.alreadyOwned'), 'error');
        }
    },

    // ==================== HISTORY ====================

    showHistory() {
        this.showPage('history');
        const profile = Storage.getProfile();
        const progress = Storage.getProgress();
        const uiLang = profile.uiLang || 'en';
        const progLang = profile.progLang;
        const hackathons = Storage.getHackathons();
        const cz = uiLang === 'cz';

        let html = '';

        // Completed Lessons
        const completedLessons = progress.completedLessons.filter(l => l.lang === progLang);
        html += '<div class="history-section"><h2>' + I18n.t('history.lessons') + ' (' + completedLessons.length + ')</h2>';
        if (completedLessons.length === 0) {
            html += '<p class="history-empty">' + I18n.t('history.noLessons') + '</p>';
        } else {
            html += '<div class="history-list">';
            completedLessons.sort(function(a, b) { return a.id - b.id; }).forEach(function(l) {
                const lesson = Lessons.getLesson(l.id);
                const title = lesson ? Lessons.getTitle(lesson, progLang, uiLang) : (cz ? 'Lekce' : 'Lesson');
                const score = Storage.getTestScore(l.id, progLang);
                html += '<a href="#lesson/' + l.id + '" class="history-item">' +
                    '<span class="history-item-icon">&#x1F4DA;</span>' +
                    '<span class="history-item-title">' + I18n.t('lesson.lessonN', { n: l.id }) + ': ' + title + '</span>' +
                    (score > 0 ? '<span class="history-item-score">' + score + '/100</span>' : '') +
                '</a>';
            });
            html += '</div>';
        }
        html += '</div>';

        // Test Scores (only show tests NOT already in completed lessons to avoid duplicates)
        const completedIds = new Set(completedLessons.map(function(l) { return l.id; }));
        const testKeys = Object.keys(progress.testScores).filter(function(k) {
            return k.endsWith('_' + progLang) && !completedIds.has(parseInt(k));
        });
        const testLabel = cz ? 'Neúspěšné testy' : 'Failed Tests';
        html += '<div class="history-section"><h2>' + testLabel + ' (' + testKeys.length + ')</h2>';
        if (testKeys.length === 0) {
            html += '<p class="history-empty">' + (cz ? 'Žádné neúspěšné testy.' : 'No failed tests.') + '</p>';
        } else {
            html += '<div class="history-list">';
            testKeys.sort(function(a, b) { return parseInt(a) - parseInt(b); }).forEach(function(k) {
                const lessonId = parseInt(k);
                const score = progress.testScores[k];
                const lesson = Lessons.getLesson(lessonId);
                const title = lesson ? Lessons.getTitle(lesson, progLang, uiLang) : (cz ? 'Test' : 'Test');
                html += '<a href="#test/' + lessonId + '" class="history-item">' +
                    '<span class="history-item-icon">&#x1F4DD;</span>' +
                    '<span class="history-item-title">' + I18n.t('lesson.lessonN', { n: lessonId }) + ': ' + title + '</span>' +
                    '<span class="history-item-score failed">' + score + '/100 — ' + (cz ? 'Zkusit znovu' : 'Retry') + '</span>' +
                '</a>';
            });
            html += '</div>';
        }
        html += '</div>';

        // Hackathon History
        html += '<div class="history-section"><h2>' + I18n.t('history.hackathons') + ' (' + hackathons.history.length + ')</h2>';
        if (hackathons.history.length === 0) {
            html += '<p class="history-empty">' + I18n.t('history.noHackathons') + '</p>';
        } else {
            html += '<div class="history-list">';
            hackathons.history.slice().reverse().forEach(function(h) {
                const title = h.title[uiLang] || h.title.en;
                const date = new Date(h.completedAt).toLocaleDateString();
                const passed = h.score >= 50;
                html += '<a href="#hackathon/' + h.id + '" class="history-item">' +
                    '<span class="history-item-icon">&#x1F680;</span>' +
                    '<span class="history-item-title">' + title + '</span>' +
                    '<span class="history-item-score ' + (passed ? 'passed' : 'failed') + '">' + h.score + '/100</span>' +
                    '<span class="history-item-date">' + date + '</span>' +
                '</a>';
            });
            html += '</div>';
        }
        html += '</div>';

        document.getElementById('history-content').innerHTML = html;
    },

    // ==================== HELP ====================

    showHelp() {
        this.showPage('help');
        const cz = I18n.currentLang === 'cz';
        const el = document.getElementById('help-content');

        if (cz) {
            el.innerHTML =
                '<div class="help-section">' +
                    '<h2>Jak aplikace funguje</h2>' +
                    '<p>Learn Coding je interaktivní aplikace pro výuku programování. Projdi 50 lekcí, splň testy a sbírej odznaky.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Lekce</h2>' +
                    '<p>Každá lekce obsahuje teorii a příklady kódu. Po prostudování lekce spusť test pro ověření znalostí.</p>' +
                    '<p>Lekce se odemykají postupně — musíš splnit test předchozí lekce (skóre alespoň 50/100).</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Testy</h2>' +
                    '<p>Každý test ti dá programovací úkol. Napiš kód, spusť ho tlačítkem "Spustit" a pak odešli. Skóre 50+ znamená splněno.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Hackathony</h2>' +
                    '<p>Hackathony jsou volné programovací výzvy — žádné předepsané téma, programuj co chceš! AI ohodnotí tvůj kód podle kvality a kreativity.</p>' +
                    '<p>Každá 10. lekce (10, 20, 30, 40, 50) je také hackathon.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>AI Asistent</h2>' +
                    '<p>AI asistent ti pomáhá s kódem — vidí co píšeš a může poradit. Můžeš ho zapnout/vypnout v Nastavení.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Odznaky</h2>' +
                    '<p>Za body z testů a hackathonů si můžeš kupovat odznaky v obchodě. Sbírej všech 50+!</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Tipy</h2>' +
                    '<ul>' +
                        '<li>Pravidelně procvičuj — i 15 minut denně pomůže</li>' +
                        '<li>Neboj se experimentovat s kódem v editoru</li>' +
                        '<li>Využij AI asistenta když si nevíš rady</li>' +
                        '<li>Opakuj starší lekce přes sekci Historie</li>' +
                    '</ul>' +
                '</div>';
        } else {
            el.innerHTML =
                '<div class="help-section">' +
                    '<h2>How the App Works</h2>' +
                    '<p>Learn Coding is an interactive programming learning app. Complete 50 lessons, pass tests, and collect badges.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Lessons</h2>' +
                    '<p>Each lesson contains theory and code examples. After studying, take the test to verify your knowledge.</p>' +
                    '<p>Lessons unlock progressively — you must pass the previous test (score 50+/100).</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Tests</h2>' +
                    '<p>Each test gives you a coding task. Write code, run it with "Run", then submit. Score 50+ means passed.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Hackathons</h2>' +
                    '<p>Hackathons are free coding challenges — no prescribed topic, code whatever you want! AI evaluates your code based on quality and creativity.</p>' +
                    '<p>Every 10th lesson (10, 20, 30, 40, 50) is also a hackathon.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>AI Assistant</h2>' +
                    '<p>The AI assistant helps with your code — it sees what you write and can advise. Toggle it on/off in Settings.</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Badges</h2>' +
                    '<p>Use points from tests and hackathons to buy badges in the shop. Collect all 50+!</p>' +
                '</div>' +
                '<div class="help-section">' +
                    '<h2>Tips</h2>' +
                    '<ul>' +
                        '<li>Practice regularly — even 15 minutes a day helps</li>' +
                        '<li>Don\'t be afraid to experiment with code in the editor</li>' +
                        '<li>Use the AI assistant when you\'re stuck</li>' +
                        '<li>Repeat older lessons via the History section</li>' +
                    '</ul>' +
                '</div>';
        }
    },

    // ==================== HACKATHONS ====================

    showHackathons() {
        this.showPage('hackathons');
        const profile = Storage.getProfile();
        const uiLang = profile.uiLang || 'en';
        const hackathons = Storage.getHackathons();

        // Active hackathon card
        const activeEl = document.getElementById('hackathon-active-card');
        if (hackathons.active) {
            activeEl.classList.remove('hidden');
            const h = hackathons.active;
            const title = h.title[uiLang] || h.title.en;
            activeEl.innerHTML =
                '<div class="hackathon-card active-hackathon">' +
                    '<span class="hackathon-icon">&#x1F525;</span>' +
                    '<h3>' + title + '</h3>' +
                    '<p>' + I18n.t('hackathons.continueChallenge') + '</p>' +
                    '<button class="btn btn-primary" onclick="location.hash=\'#hackathon/' + h.id + '\'">' + I18n.t('hackathons.continue') + '</button>' +
                '</div>';
        } else {
            activeEl.classList.add('hidden');
        }

        // History
        const historyEl = document.getElementById('hackathons-history');
        if (hackathons.history.length === 0) {
            historyEl.innerHTML = '<p class="no-hackathons">' + I18n.t('hackathons.noHistory') + '</p>';
        } else {
            historyEl.innerHTML = hackathons.history.slice().reverse().map(function(h) {
                const title = h.title[uiLang] || h.title.en;
                const date = new Date(h.completedAt).toLocaleDateString();
                return '<div class="hackathon-history-item">' +
                    '<span class="hackathon-history-title">' + title + '</span>' +
                    '<span class="hackathon-history-score">' + h.score + '/100</span>' +
                    '<span class="hackathon-history-date">' + date + '</span>' +
                '</div>';
            }).join('');
        }
    },

    createHackathon() {
        const hackathons = Storage.getHackathons();

        if (hackathons.active) {
            location.hash = '#hackathon/' + hackathons.active.id;
            return;
        }

        const num = hackathons.nextId;

        const newHackathon = {
            id: num,
            type: 'generated',
            lessonId: null,
            title: { en: 'Free Hackathon #' + num, cz: 'Voln\u00fd hackathon #' + num },
            description: { en: '', cz: '' },
            challenge: { en: '', cz: '' },
            starter: '',
            keywords: [],
            maxScore: 100,
            createdAt: new Date().toISOString(),
            completedAt: null,
            score: null,
            code: null,
            output: null,
            aiCommentary: null
        };

        hackathons.active = newHackathon;
        hackathons.nextId++;
        Storage.saveHackathons(hackathons);
        location.hash = '#hackathon/' + newHackathon.id;
    },

    showHackathon(id) {
        this.showPage('hackathon');
        const profile = Storage.getProfile();
        const progLang = profile.progLang;
        const uiLang = profile.uiLang || 'en';
        const hackathons = Storage.getHackathons();

        const hackathon = (hackathons.active && hackathons.active.id == id)
            ? hackathons.active
            : hackathons.history.find(function(h) { return h.id == id; });

        if (!hackathon) { location.hash = '#hackathons'; return; }

        // Back button → lessons for lesson hackathons, hackathons for regular
        var backBtn = document.querySelector('#page-hackathon .btn-back');
        if (backBtn) {
            backBtn.href = hackathon.lessonId ? '#lessons' : '#hackathons';
        }

        // Render just title, no description or hints
        const challengeEl = document.getElementById('hackathon-challenge');
        const title = hackathon.title[uiLang] || hackathon.title.en;
        challengeEl.innerHTML = '<h1>' + title + '</h1>';

        // Editor
        CodeEditor.destroy('hackathon-editor');
        CodeEditor.create('hackathon-editor', { lang: progLang, value: hackathon.code || hackathon.starter || '' });

        // Clear output/results
        document.getElementById('hackathon-output-content').textContent = '';
        document.getElementById('hackathon-results').classList.add('hidden');

        // Show/hide controls based on whether it's completed
        const controls = document.querySelector('#page-hackathon .editor-controls');
        if (hackathon.completedAt) {
            controls.classList.add('hidden');
            // Show results
            this.showHackathonResults(hackathon, uiLang);
        } else {
            controls.classList.remove('hidden');
        }

        // AI Chat
        AIChat.init(title, 'Free coding hackathon', progLang, 'hackathon-editor');
        AIChat.renderPanel('hackathon-ai-chat-container');
    },

    async runHackathonCode() {
        const profile = Storage.getProfile();
        const code = CodeEditor.getCode('hackathon-editor');
        const outputEl = document.getElementById('hackathon-output-content');

        let inputValues = null;
        if (CodeEditor.needsInput(code, profile.progLang)) {
            inputValues = await CodeEditor.collectInputs(code, profile.progLang, 'hackathon-output-content');
        } else {
            outputEl.innerHTML = '<span class="success">' + I18n.t('editor.running') + '</span>';
        }

        const result = await CodeEditor.run(code, profile.progLang, inputValues);
        CodeEditor.displayOutput('hackathon-output-content', result);
    },

    async submitHackathon() {
        const profile = Storage.getProfile();
        const code = CodeEditor.getCode('hackathon-editor');
        const hackathons = Storage.getHackathons();
        const hackathon = hackathons.active;
        if (!hackathon) return;

        // Block empty submissions or starter-only code
        const trimmedCode = code.trim();
        const starterTrimmed = (hackathon.starter || '').trim();
        if (!trimmedCode || trimmedCode === starterTrimmed) {
            this.showToast(I18n.t('test.emptyCode'), 'error');
            return;
        }

        // Hide controls
        document.querySelector('#page-hackathon .editor-controls').classList.add('hidden');

        // Run code
        const result = await CodeEditor.run(code, profile.progLang);
        CodeEditor.displayOutput('hackathon-output-content', result);

        // Evaluate
        const score = Hackathons.evaluate(code, result.output, hackathon, profile.progLang);
        const uiLang = profile.uiLang || 'en';
        const cz = uiLang === 'cz';

        // Generate commentary
        var commentary;
        if (score >= 80) {
            commentary = cz ? 'V\u00fdborn\u00e1 pr\u00e1ce! Tv\u016fj k\u00f3d je dob\u0159e strukturovan\u00fd a kreativn\u00ed.' : 'Excellent work! Your code is well-structured and creative.';
        } else if (score >= 50) {
            commentary = cz ? 'Dobr\u00fd z\u00e1klad! Zkus p\u0159idat o\u0161et\u0159en\u00ed chyb a v\u00edce funkc\u00ed.' : 'Good foundation! Try adding error handling and more functions.';
        } else {
            commentary = cz ? 'Dobr\u00fd za\u010d\u00e1tek! Zkus roz\u0161\u00ed\u0159it k\u00f3d o t\u0159\u00eddy, funkce a o\u0161et\u0159en\u00ed chyb.' : 'Good start! Try expanding with classes, functions, and error handling.';
        }

        // Save to history
        hackathon.completedAt = new Date().toISOString();
        hackathon.score = score;
        hackathon.code = code;
        hackathon.output = result.output;
        hackathon.aiCommentary = commentary;
        hackathons.history.push(hackathon);
        hackathons.active = null;
        Storage.saveHackathons(hackathons);

        // For lesson-based hackathons, record test score to unlock next lesson
        if (hackathon.lessonId) {
            Storage.recordTestScore(hackathon.lessonId, profile.progLang, score);
        }

        // Award points (50% of hackathon score to prevent inflation)
        Storage.addPoints(Math.round(score * 0.5));
        this.updateNav();

        // Show results
        this.showHackathonResults(hackathon, uiLang);
    },

    showHackathonResults(hackathon, uiLang) {
        const cz = uiLang === 'cz';
        const resultsEl = document.getElementById('hackathon-results');
        resultsEl.classList.remove('hidden');

        const passed = hackathon.score >= 50;
        document.getElementById('hackathon-score-display').innerHTML =
            '<div class="score-circle ' + (passed ? 'pass' : 'fail') + '">' +
                '<span class="score-number">' + hackathon.score + '</span>' +
                '<span class="score-label">/100</span>' +
            '</div>' +
            '<p class="score-status">' + (passed
                ? (cz ? 'Hackathon dokon\u010den!' : 'Hackathon completed!')
                : (cz ? 'Zkus to znovu!' : 'Try again!')) + '</p>';

        document.getElementById('hackathon-feedback').innerHTML =
            '<p class="ai-commentary">' + (hackathon.aiCommentary || '') + '</p>' +
            '<p class="points-earned">+' + hackathon.score + ' ' + (cz ? 'bod\u016f' : 'points') + '</p>';

        document.getElementById('hackathon-actions').innerHTML =
            '<a href="#hackathons" class="btn btn-primary">' + (cz ? 'Zp\u011bt na hackathony' : 'Back to Hackathons') + '</a>';
    },

    // ==================== SETTINGS ====================

    showSettings() {
        this.showPage('settings');
        const profile = Storage.getProfile();
        const progress = Storage.getProgress();
        const uiLang = profile.uiLang || 'en';

        // Profile fields
        document.getElementById('settings-name').value = profile.name || '';
        document.getElementById('settings-description').value = profile.description || '';

        // Language selects
        document.getElementById('settings-ui-lang').value = profile.uiLang || 'en';
        document.getElementById('settings-prog-lang').value = profile.progLang || 'python';
        document.getElementById('settings-ai-toggle').checked = !profile.aiDisabled;

        // Stats (include hackathon scores)
        const completedCount = progress.completedLessons.length;
        const scores = Object.values(progress.testScores);
        const hackathonData = Storage.getHackathons();
        if (hackathonData.history) {
            hackathonData.history.forEach(function(h) {
                if (h.score !== null && h.score !== undefined) scores.push(h.score);
            });
        }
        const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
        const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

        document.getElementById('settings-stats').innerHTML = `
            <div class="stat-item"><div class="stat-value">${completedCount}</div><div class="stat-label">${I18n.t('stats.completed')}</div></div>
            <div class="stat-item"><div class="stat-value">${progress.totalPoints}</div><div class="stat-label">${I18n.t('stats.totalPoints')}</div></div>
            <div class="stat-item"><div class="stat-value">${bestScore}</div><div class="stat-label">${I18n.t('stats.bestScore')}</div></div>
            <div class="stat-item"><div class="stat-value">${avgScore}</div><div class="stat-label">${I18n.t('stats.avgScore')}</div></div>
        `;

        // My badges
        const ownedBadges = Badges.getOwned();
        const badgesEl = document.getElementById('settings-badges');
        if (ownedBadges.length === 0) {
            badgesEl.innerHTML = `<span class="no-badges">${I18n.t('settings.noBadges')}</span>`;
        } else {
            badgesEl.innerHTML = ownedBadges.map(b => Badges.renderMini(b, uiLang)).join('');
        }

        // Dashboard
        this.renderDashboard(progress, profile);
    },

    renderDashboard(progress, profile) {
        const uiLang = profile.uiLang || 'en';
        const cz = uiLang === 'cz';
        const chartEl = document.getElementById('dashboard-chart');
        const analysisEl = document.getElementById('dashboard-analysis');
        const totalLessons = Lessons.getTotalCount();

        // Get all test scores as array of {id, label, score}
        const testData = [];
        for (let i = 1; i <= totalLessons; i++) {
            const key = i + '_' + profile.progLang;
            const score = progress.testScores[key];
            if (score !== undefined) {
                testData.push({ id: i, label: 'L' + i, score: score, type: 'lesson' });
            }
        }

        // Include hackathon scores from hackathon history
        const hackathons = Storage.getHackathons();
        if (hackathons.history && hackathons.history.length > 0) {
            hackathons.history.forEach(function(h, idx) {
                if (h.score !== null && h.score !== undefined) {
                    testData.push({ id: 'h' + (idx + 1), label: 'H' + (idx + 1), score: h.score, type: 'hackathon' });
                }
            });
        }

        if (testData.length === 0) {
            chartEl.innerHTML = '<p class="dashboard-empty">' +
                (cz ? 'Zatím žádné výsledky. Dokonči několik lekcí nebo hackathonů!' : 'No results yet. Complete some lessons or hackathons!') + '</p>';
            analysisEl.innerHTML = '';
            return;
        }

        // Build enhanced bar chart with reference lines
        const avgScore = Math.round(testData.reduce((a, d) => a + d.score, 0) / testData.length);
        const maxBars = Math.min(testData.length, 25);
        const displayData = testData.slice(-maxBars);

        let barsHtml = '<div class="chart-container">';
        // Reference lines
        barsHtml += '<div class="chart-ref-line" style="bottom:80%"><span class="chart-ref-label">80</span></div>';
        barsHtml += '<div class="chart-ref-line chart-ref-pass" style="bottom:50%"><span class="chart-ref-label">50</span></div>';
        barsHtml += '<div class="chart-avg-line" style="bottom:' + avgScore + '%"><span class="chart-avg-label">' + (cz ? 'Pr.' : 'Avg') + ' ' + avgScore + '</span></div>';
        // Bars
        displayData.forEach(d => {
            const color = d.score >= 80 ? 'var(--success)' : d.score >= 50 ? 'var(--warning)' : 'var(--danger)';
            const tipLabel = d.type === 'hackathon' ? 'Hackathon' : (cz ? 'Lekce' : 'Lesson');
            barsHtml += '<div class="chart-bar-wrapper" title="' + tipLabel + ' ' + d.id + ': ' + d.score + '%">' +
                '<span class="chart-bar-value">' + d.score + '</span>' +
                '<div class="chart-bar" style="height:' + d.score + '%;background:' + color + '"></div>' +
                '<span class="chart-bar-label">' + d.label + '</span></div>';
        });
        barsHtml += '</div>';
        chartEl.innerHTML = barsHtml;

        // Analysis: strengths and weaknesses
        const strong = testData.filter(d => d.score >= 80).length;
        const weak = testData.filter(d => d.score < 50).length;
        const completion = Math.round((progress.completedLessons.length / totalLessons) * 100);

        let html = '<div class="dashboard-stats-row">';
        html += '<div class="dashboard-stat"><span class="dashboard-stat-value">' + completion + '%</span><span class="dashboard-stat-label">' + (cz ? 'Dokončení' : 'Completion') + '</span></div>';
        html += '<div class="dashboard-stat"><span class="dashboard-stat-value">' + avgScore + '</span><span class="dashboard-stat-label">' + (cz ? 'Průměr' : 'Average') + '</span></div>';
        html += '<div class="dashboard-stat"><span class="dashboard-stat-value" style="color:var(--success)">' + strong + '</span><span class="dashboard-stat-label">' + (cz ? 'Silné (80+)' : 'Strong (80+)') + '</span></div>';
        html += '<div class="dashboard-stat"><span class="dashboard-stat-value" style="color:var(--danger)">' + weak + '</span><span class="dashboard-stat-label">' + (cz ? 'Slabé (<50)' : 'Weak (<50)') + '</span></div>';
        html += '</div>';

        // Find weakest topics for improvement suggestions
        const weakTopics = testData.filter(d => d.score < 60).sort((a, b) => a.score - b.score).slice(0, 3);
        if (weakTopics.length > 0) {
            html += '<div class="dashboard-suggestion"><strong>' + (cz ? 'Zaměř se na:' : 'Focus on:') + '</strong> ';
            html += weakTopics.map(d => {
                const lesson = Lessons.getLesson(d.id);
                const title = lesson ? (lesson.title[profile.progLang][uiLang] || lesson.title[profile.progLang].en) : (cz ? 'Lekce' : 'Lesson') + ' ' + d.id;
                return '<a href="#lesson/' + d.id + '" class="dashboard-link">' + title + ' (' + d.score + '%)</a>';
            }).join(', ');
            html += '</div>';
        }

        analysisEl.innerHTML = html;
    },

    saveProfile() {
        const profile = Storage.getProfile();
        profile.name = document.getElementById('settings-name').value.trim();
        profile.description = this.sanitize(document.getElementById('settings-description').value.trim());
        Storage.saveProfile(profile);
        this.showToast(I18n.t('settings.saved'), 'success');
    },

    changeUiLang(lang) {
        const profile = Storage.getProfile();
        profile.uiLang = lang;
        Storage.saveProfile(profile);
        I18n.setLanguage(lang);
        this.updateNav();
        this.showSettings();
    },

    changeProgLang(lang) {
        const profile = Storage.getProfile();
        if (lang === profile.progLang) return;

        // Check if assessment done for this language
        const assessmentKey = lang + 'AssessmentDone';
        if (!profile[assessmentKey]) {
            // Need assessment for new language
            profile.origProgLang = profile.progLang;
            profile.progLang = lang;
            Storage.saveProfile(profile);
            this.state.assessmentIndex = 0;
            this.state.assessmentScores = [];
            location.hash = '#assessment';
            this.showPage('assessment');
            this.loadAssessmentTask(0);
            return;
        }

        profile.progLang = lang;
        Storage.saveProfile(profile);
    },

    toggleAI(enabled) {
        const profile = Storage.getProfile();
        profile.aiDisabled = !enabled;
        Storage.saveProfile(profile);
        this.route(); // Re-render current page to show/hide AI panel
    },

    fullReset() {
        const msg = I18n.currentLang === 'cz'
            ? 'Opravdu chceš smazat VŠECHNA data? Profil, pokrok, body, odznaky - vše bude ztraceno. Tato akce je nevratná.'
            : 'Really delete ALL data? Profile, progress, points, badges - everything will be lost. This cannot be undone.';
        if (confirm(msg)) {
            Storage.clearAll();
            localStorage.removeItem('codelearn_theme');
            location.hash = '';
            location.reload();
        }
    },

    retakeAssessment() {
        if (confirm(I18n.currentLang === 'cz'
            ? 'Opravdu chceš zopakovat test? Body a odznaky zůstanou.'
            : 'Really retake assessment? Points and badges will be kept.')) {
            Storage.resetLevel();
            this.state.assessmentIndex = 0;
            this.state.assessmentScores = [];
            location.hash = '#assessment';
            this.showPage('assessment');
            this.loadAssessmentTask(0);
        }
    },

    // ==================== THEME ====================

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('codelearn_theme', newTheme);
    },

    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        // Update Ace editor themes if any exist
        const aceTheme = theme === 'light' ? 'ace/theme/chrome' : 'ace/theme/one_dark';
        Object.values(CodeEditor.editors).forEach(editor => {
            editor.setTheme(aceTheme);
        });
        // Update highlight.js theme
        const hljsLink = document.getElementById('hljs-theme');
        if (hljsLink) {
            const hljsTheme = theme === 'light' ? 'atom-one-light' : 'atom-one-dark';
            hljsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/' + hljsTheme + '.min.css';
        }
    },

    // ==================== UTILITIES ====================

    showToast(message, type) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || '');
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    },

    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
