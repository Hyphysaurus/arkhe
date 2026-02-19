export const XP_CONFIG = {
    CHECKLIST_ITEM: 50,
    LOG_COST: 20,
    LOG_REVENUE: 100,
    SHIP_PROJECT: 1000,
    CODE_REVIEW: 200,
    FIRST_SALE: 500
};

export const LEVELS = [
    { level: 1, minXp: 0, title: "Newbie" },
    { level: 2, minXp: 1000, title: "Hobbyist" },
    { level: 3, minXp: 3000, title: "Shipping" },
    { level: 4, minXp: 7000, title: "Vibecoder" },
    { level: 5, minXp: 15000, title: "SaaS Lord" },
    { level: 6, minXp: 31000, title: "Founder" },
    { level: 7, minXp: 63000, title: "Vibe God" }
];

export const SHIP_CHECKLIST = [
    { category: "Core", items: ["Landing page", "Auth system", "Database connection", "Local dev setup"] },
    { category: "Visuals", items: ["Logo/Favicon", "Dark mode", "Responsive layout", "Glassmorphism"] },
    { category: "Finance", items: ["Budget set", "P&L tracking", "Stripe integration"] },
    { category: "Quality", items: ["Linting", "Build check", "Error boundaries"] }
];

export const ACHIEVEMENTS = [
    { key: "first_ship", name: "First Ship 🚀", description: "Completed your first project checklist." },
    { key: "budget_hawk", name: "Budget Hawk 🦅", description: "Log 5 costs while staying under budget." },
    { key: "profit_mode", name: "Profit Mode 💰", description: "First project revenue exceeding costs." },
    { key: "streak_lord", name: "Streak Lord 🔥", description: "7-day shipping streak." }
];
