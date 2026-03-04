/* ============================
   Storage Module
   LocalStorage abstraction layer
   ============================ */

const Storage = {
    PREFIX: 'codelearn_',

    // Default state
    defaults: {
        profile: {
            name: '',
            description: '',
            progLang: null,       // 'python' or 'csharp'
            secondLang: false,    // whether second language is enabled
            uiLang: 'en',        // 'en' or 'cz'
            level: null,          // determined by assessment
            startLesson: 1,
            assessmentDone: false
        },
        progress: {
            currentLesson: 1,
            completedLessons: [],    // [{ id, lang, score }]
            testScores: {},          // { "1_python": 85, "1_csharp": 72 }
            totalPoints: 0,
            assessmentScore: 0
        },
        badges: {
            owned: []   // array of badge IDs
        }
    },

    // Save data to localStorage
    save(key, data) {
        try {
            const fullKey = this.PREFIX + key;
            localStorage.setItem(fullKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },

    // Load data from localStorage
    load(key) {
        try {
            const fullKey = this.PREFIX + key;
            const data = localStorage.getItem(fullKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    },

    // Get profile (with defaults merged for missing keys)
    getProfile() {
        const saved = this.load('profile');
        return saved ? { ...this.defaults.profile, ...saved } : { ...this.defaults.profile };
    },

    // Save profile
    saveProfile(profile) {
        return this.save('profile', profile);
    },

    // Get progress (with defaults merged for missing keys)
    getProgress() {
        const saved = this.load('progress');
        if (!saved) return { ...this.defaults.progress, completedLessons: [], testScores: {} };
        return {
            currentLesson: saved.currentLesson || this.defaults.progress.currentLesson,
            completedLessons: saved.completedLessons || [],
            testScores: saved.testScores || {},
            totalPoints: saved.totalPoints || 0,
            assessmentScore: saved.assessmentScore || 0
        };
    },

    // Save progress
    saveProgress(progress) {
        return this.save('progress', progress);
    },

    // Get badges (per programming language)
    getBadges() {
        const profile = this.getProfile();
        const lang = profile.progLang || 'python';
        var badges = this.load('badges_' + lang);
        if (!badges) {
            // Migrate from old global badges key (one-time)
            var oldBadges = this.load('badges');
            if (oldBadges && oldBadges.owned && oldBadges.owned.length > 0) {
                this.save('badges_' + lang, oldBadges);
                return oldBadges;
            }
            return { owned: [] };
        }
        return badges;
    },

    // Save badges (per programming language)
    saveBadges(badges) {
        const profile = this.getProfile();
        const lang = profile.progLang || 'python';
        return this.save('badges_' + lang, badges);
    },

    // Add points
    addPoints(points) {
        const progress = this.getProgress();
        progress.totalPoints += points;
        this.saveProgress(progress);
        return progress.totalPoints;
    },

    // Spend points (for buying badges)
    spendPoints(points) {
        const progress = this.getProgress();
        if (progress.totalPoints >= points) {
            progress.totalPoints -= points;
            this.saveProgress(progress);
            return true;
        }
        return false;
    },

    // Record test score
    recordTestScore(lessonId, lang, score) {
        const progress = this.getProgress();
        const key = lessonId + '_' + lang;
        const prevScore = progress.testScores[key] || 0;

        progress.testScores[key] = Math.max(prevScore, score);

        // Add points (only the difference if improving)
        const pointsEarned = Math.max(0, score - prevScore);
        progress.totalPoints += pointsEarned;

        // Mark lesson as completed if score >= 50
        if (score >= 50) {
            const existing = progress.completedLessons.find(l => l.id === lessonId && l.lang === lang);
            if (!existing) {
                progress.completedLessons.push({ id: lessonId, lang: lang, score: score });
            } else {
                existing.score = Math.max(existing.score, score);
            }
            // Advance current lesson
            if (lessonId >= progress.currentLesson) {
                progress.currentLesson = lessonId + 1;
            }
        }

        this.saveProgress(progress);
        return { score, pointsEarned, passed: score >= 50 };
    },

    // Buy badge
    buyBadge(badgeId, cost) {
        const progress = this.getProgress();
        if (progress.totalPoints < cost) return false;

        const badges = this.getBadges();
        if (badges.owned.includes(badgeId)) return false;

        progress.totalPoints -= cost;
        badges.owned.push(badgeId);

        this.saveProgress(progress);
        this.saveBadges(badges);
        return true;
    },

    // Check if lesson is completed
    isLessonCompleted(lessonId, lang) {
        const progress = this.getProgress();
        return progress.completedLessons.some(l => l.id === lessonId && l.lang === lang);
    },

    // Get test score for lesson
    getTestScore(lessonId, lang) {
        const progress = this.getProgress();
        return progress.testScores[lessonId + '_' + lang] || 0;
    },

    // Reset level (keep badges and points)
    resetLevel() {
        const progress = this.getProgress();
        const profile = this.getProfile();

        profile.assessmentDone = false;
        profile.level = null;
        profile.startLesson = 1;
        progress.currentLesson = 1;
        progress.completedLessons = [];
        progress.testScores = {};
        // Keep totalPoints and badges

        this.saveProfile(profile);
        this.saveProgress(progress);
    },

    // Check if user exists (has completed setup)
    hasProfile() {
        const profile = this.getProfile();
        return profile.progLang !== null;
    },

    // Get hackathons
    getHackathons() {
        return this.load('hackathons') || { active: null, history: [], nextId: 1 };
    },

    // Save hackathons
    saveHackathons(hackathons) {
        return this.save('hackathons', hackathons);
    },

    // Clear all data
    clearAll() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    }
};
