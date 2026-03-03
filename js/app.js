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

        // Check if this was a second language assessment
        if (profile.origProgLang) {
            const secondLang = profile.progLang;
            profile[secondLang + 'AssessmentDone'] = true;
            profile.progLang = profile.origProgLang;
            delete profile.origProgLang;
            delete profile.secondLangId;
        }

        Storage.saveProfile(profile);

        // Add initial points
        Storage.addPoints(progress.assessmentScore || 0);

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
            const title = Lessons.getTitle(lesson, progLang, uiLang);
            const desc = Lessons.getDescription(lesson, progLang, uiLang);
            const isCompleted = Storage.isLessonCompleted(lesson.id, progLang);
            const isLocked = lesson.id > progress.currentLesson && !isCompleted;
            const testScore = Storage.getTestScore(lesson.id, progLang);

            let classes = 'lesson-card';
            if (isCompleted) classes += ' completed';
            if (isLocked) classes += ' locked';

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
            card.innerHTML = `
                <div class="lesson-card-number">${I18n.t('lesson.lessonN', { n: lesson.id })}</div>
                <div class="lesson-card-title">${title}</div>
                <div class="lesson-card-desc">${desc}</div>
                <div class="lesson-card-meta">
                    <div class="lesson-card-difficulty">${diffDots}</div>
                    ${scoreHtml}
                </div>
            `;

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

        this.showPage('lesson');
        const profile = Storage.getProfile();
        const progLang = profile.progLang;
        const uiLang = profile.uiLang || 'en';

        document.getElementById('lesson-number').textContent = I18n.t('lesson.lessonN', { n: id });

        const content = Lessons.getContent(lesson, progLang, uiLang);
        const contentEl = document.getElementById('lesson-content');
        contentEl.innerHTML = content;

        // Highlight code blocks
        contentEl.querySelectorAll('pre code').forEach(block => {
            if (window.hljs) hljs.highlightElement(block);
        });

        // Go to test button
        document.getElementById('lesson-go-test').onclick = () => {
            location.hash = '#test/' + id;
        };

        // Initialize AI chat with lesson context
        const title = lesson.title[progLang][uiLang] || lesson.title[progLang].en;
        AIChat.init(title, '', progLang);
    },

    // Toggle AI chat panel
    toggleAIChat() {
        const body = document.getElementById('ai-chat-body');
        const toggle = document.getElementById('ai-chat-toggle');
        if (!body) return;

        const isHidden = body.classList.contains('hidden');
        body.classList.toggle('hidden');
        toggle.innerHTML = isHidden ? '&#x25B2;' : '&#x25BC;';

        if (isHidden) {
            // Try loading engine on first open
            AIChat.loadEngine();
            document.getElementById('ai-chat-input').focus();
        }
    },

    // Send AI chat message
    async sendAIMessage() {
        const input = document.getElementById('ai-chat-input');
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
        document.getElementById('settings-second-lang').checked = profile.secondLang || false;

        // Stats
        const completedCount = progress.completedLessons.length;
        const scores = Object.values(progress.testScores);
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

        // Get all test scores as array of {id, score}
        const testData = [];
        for (let i = 1; i <= totalLessons; i++) {
            const key = profile.progLang + '_' + i;
            const score = progress.testScores[key];
            if (score !== undefined) {
                testData.push({ id: i, score: score });
            }
        }

        if (testData.length === 0) {
            chartEl.innerHTML = '<p class="dashboard-empty">' +
                (cz ? 'Zatím žádné výsledky testů. Dokonči několik lekcí!' : 'No test results yet. Complete some lessons!') + '</p>';
            analysisEl.innerHTML = '';
            return;
        }

        // Build bar chart
        let barsHtml = '<div class="chart-container">';
        const maxBars = Math.min(testData.length, 20); // Show last 20
        const displayData = testData.slice(-maxBars);
        displayData.forEach(d => {
            const color = d.score >= 80 ? 'var(--success)' : d.score >= 50 ? 'var(--warning)' : 'var(--danger)';
            barsHtml += '<div class="chart-bar-wrapper" title="' + (cz ? 'Lekce' : 'Lesson') + ' ' + d.id + ': ' + d.score + '%">' +
                '<div class="chart-bar" style="height:' + d.score + '%;background:' + color + '"></div>' +
                '<span class="chart-bar-label">' + d.id + '</span></div>';
        });
        barsHtml += '</div>';
        chartEl.innerHTML = barsHtml;

        // Analysis: strengths and weaknesses
        const avgScore = Math.round(testData.reduce((a, d) => a + d.score, 0) / testData.length);
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
        profile.progLang = lang;
        Storage.saveProfile(profile);
    },

    toggleSecondLang(enabled) {
        const profile = Storage.getProfile();
        if (enabled) {
            const otherLang = profile.progLang === 'python' ? 'csharp' : 'python';
            const progressKey = otherLang + 'AssessmentDone';
            if (!profile[progressKey]) {
                // Need assessment for the second language
                const cz = (profile.uiLang || 'en') === 'cz';
                const msg = cz
                    ? 'Pro přidání druhého jazyka musíš absolvovat úvodní test. Chceš ho začít teď?'
                    : 'To add a second language, you need to take the initial assessment. Start now?';
                if (confirm(msg)) {
                    profile.secondLang = true;
                    profile.secondLangId = otherLang;
                    profile.origProgLang = profile.progLang;
                    profile.progLang = otherLang;
                    profile.assessmentDone = false;
                    Storage.saveProfile(profile);
                    this.state.assessmentIndex = 0;
                    this.state.assessmentScores = [];
                    this.showPage('assessment');
                    this.loadAssessmentTask(0);
                } else {
                    document.getElementById('settings-second-lang').checked = false;
                }
                return;
            }
        }
        profile.secondLang = enabled;
        Storage.saveProfile(profile);
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
