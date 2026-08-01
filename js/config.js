/**
 * ============================================================
 *  RoyalBet — Site Configuration
 *  ============================================================
 *  All customizable placeholder values live here.
 *  Edit this file once to update the entire website.
 *  ============================================================
 */

const SITE_CONFIG = {

    // ----------------------------------------------------------
    // BRAND
    // ----------------------------------------------------------
    siteName:       "RoyalBet",
    tagline:        "India's #1 Trusted Betting Exchange",
    logo:           "assets/images/royalbet_logo_1784818836468.png",

    // ----------------------------------------------------------
    // CONTACT DETAILS
    // ----------------------------------------------------------
    whatsapp:       "+91 98765 43210",       // Replace with your number
    whatsappLink:   "https://wa.me/911234567890", // Format: https://wa.me/<countrycode><number>
    email:          "support@royalbet.com",

    // ----------------------------------------------------------
    // SOCIAL MEDIA LINKS
    // ----------------------------------------------------------
    social: {
        facebook:   "#",    // Replace with full URL e.g. https://facebook.com/yourpage
        instagram:  "#",
        telegram:   "#",
        twitter:    "#",
    },

    // ----------------------------------------------------------
    // STATS / TRUST BADGES
    // ----------------------------------------------------------
    stats: {
        users:          "500K+",
        withdrawalTime: "2 Minutes",
        yearsActive:    "5+",
    },

    // ----------------------------------------------------------
    // PARTNER PLATFORMS
    // ----------------------------------------------------------
    partners: [
        {
            name:     "Sky Exchange",
            label:    "SKY EXCHANGE",
            color:    "#d4a843",
            features: ["Best Cricket Odds", "Live Casino", "24/7 Withdrawal", "Fancy Markets"],
            demoId:   "demo123",
            demoPass: "123456",
        },
        {
            name:     "Lotus Exchange",
            label:    "LOTUS EXCH",
            color:    "#4CAF50",
            features: ["VIP Limits", "Exclusive Tables", "Fast Bet Placement", "Weekly Cashback"],
            demoId:   "lotus77",
            demoPass: "play123",
        },
        {
            name:     "Diamond Exchange",
            label:    "DIAMOND EXCH",
            color:    "#2196F3",
            features: ["VIP Tables", "Weekly Cashback", "Best Odds", "Sports & Casino"],
            demoId:   "dia888",
            demoPass: "winwin",
        },
    ],

    // ----------------------------------------------------------
    // PROMOTIONS
    // ----------------------------------------------------------
    promos: [
        { title: "10% Welcome Bonus", desc: "On your first deposit up to ₹10,000.", type: "red" },
        { title: "5% Refill Bonus",   desc: "On every subsequent deposit you make.", type: "gold" },
        { title: "7% Weekly Cashback",desc: "Get cashback on net losses every Monday.", type: "outline" },
    ],

    // ----------------------------------------------------------
    // FOOTER
    // ----------------------------------------------------------
    copyright: "RoyalBet",
    footerDisclaimer: "Warning: Gambling involves financial risk and can be addictive. Please play responsibly. 18+ only.",
};
