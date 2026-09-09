/**
 * TRACE Command Center - Internationalization (i18n) Engine
 * Seamless Dual-Language Support (English 🇬🇧 / हिन्दी 🇮🇳)
 */

(function() {
    'use strict';

    const TRANSLATIONS = {
        en: {
            // Header
            "TRACE DIGITAL DASHBOARD": "TRACE DIGITAL DASHBOARD",
            "Full Screen": "Full Screen",
            "Exit Full Screen": "Exit Full Screen",
            "Time Filter": "Time Filter",
            "Live (Real-time)": "Live (Real-time)",
            "Past 1 Hour": "Past 1 Hour",
            "Today (24h)": "Today (24h)",
            "Past 7 Days": "Past 7 Days",
            "Dark": "Dark",
            "Light": "Light",
            "Sign Out": "Sign Out",
            "Active Prototype": "Active Prototype",
            "Enterprise Node": "Enterprise Node",
            
            // Sidebar Main Navigation
            "HOME": "HOME",
            "Summary": "Summary",
            "Weighbridge summary": "Weighbridge summary",
            "Checkpost summary": "Checkpost summary",
            "VTS summary": "VTS summary",
            "Alert Dashboard": "Alert Dashboard",
            "AI Driven Drone Monitoring": "AI Driven Drone Monitoring",
            "Camera View": "Camera View",
            "Grid View": "Grid View",
            "GIS Map View": "GIS Map View",
            "RFID Status & Configuration": "RFID Status & Configuration",
            "Irregular Weighments": "Irregular Weighments",
            "Irregular Trips": "Irregular Trips",
            "Workers Attendance (Mining / Plant)": "Workers Attendance (Mining / Plant)",
            "Workers Attendance": "Workers Attendance",
            "Blacklisted Vehicles": "Blacklisted Vehicles",
            "View": "View",
            "Add Blacklisted Vehicle": "Add Blacklisted Vehicle",
            "Remove / Unblacklist Vehicle": "Remove / Unblacklist Vehicle",
            "Contract Management": "Contract Management",
            "Area Master": "Area Master",
            "Plant Master": "Plant Master",
            "WeighBridge Master": "WeighBridge Master",
            "Checkpost Master": "Checkpost Master",
            "Transporter Master": "Transporter Master",
            "Maintenance Master": "Maintenance Master",
            "Reports & Analytics": "Reports & Analytics",
            "ANALYTICS": "ANALYTICS",
            "DASHBOARDS & OPERATIONS": "DASHBOARDS & OPERATIONS",
            "SECURITY & SURVEILLANCE": "SECURITY & SURVEILLANCE",
            "SYSTEM CONFIGURATION": "SYSTEM CONFIGURATION",
            
            // Blacklisted Vehicles Module
            "Blacklisted Vehicles Master Registry": "Blacklisted Vehicles Master Registry",
            "Total Blacklisted": "Total Blacklisted",
            "Recent Violations": "Recent Violations",
            "Security Escalations": "Security Escalations",
            "Compliance Actions": "Compliance Actions",
            "Filter by Vehicle Number": "Filter by Vehicle Number",
            "Type to filter...": "Type to filter...",
            "Export CSV": "Export CSV",
            "Vehicle Number": "Vehicle Number",
            "Remarks": "Remarks",
            "Blacklisted By": "Blacklisted By",
            "Blacklisted On": "Blacklisted On",
            "Action": "Action",
            "Unblacklist": "Unblacklist",
            "ADD BLACKLISTED VEHICLE": "ADD BLACKLISTED VEHICLE",
            "REMOVE / UNBLACKLIST VEHICLE": "REMOVE / UNBLACKLIST VEHICLE",
            "Approver (OTP)": "Approver (OTP)",
            "Select Approver": "Select Approver",
            "Send OTP": "Send OTP",
            "Enter OTP": "Enter OTP",
            "Blacklist Vehicle": "Blacklist Vehicle",
            "Unblacklist Vehicle": "Unblacklist Vehicle",
            "Reason / Violation Details": "Reason / Violation Details",
            "Enter reasons for blacklisting (e.g. boom barrier damage, tampering)...": "Enter reasons for blacklisting (e.g. boom barrier damage, tampering)...",
            "Reason / Justification for Removal": "Reason / Justification for Removal",
            "Enter justification for removing vehicle from blacklist...": "Enter justification for removing vehicle from blacklist...",
            "Enter vehicle number (e.g. JH02BZ8562)...": "Enter vehicle number (e.g. JH02BZ8562)...",
            
            // Summary Tabs & Dashboard
            "Weighbridge Status": "Weighbridge Status",
            "Checkpost Status": "Checkpost Status",
            "VTS Fleet Summary": "VTS Fleet Summary",
            "Operational Total": "Operational Total",
            "Operational %": "Operational %",
            "Road Dispatch": "Road Dispatch",
            "Internal Movement": "Internal Movement",
            "Total Transactions": "Total Transactions",
            "Bypassing Detected": "Bypassing Detected",
            "Boom Violations": "Boom Violations",
            "ANPR Accuracy": "ANPR Accuracy",
            "Search Area or Project...": "Search Area or Project...",
            "All Areas": "All Areas",
            "Live": "Live",
            "Operational": "Operational",
            "Offline": "Offline",
            "Maintenance": "Maintenance",
            
            // Common Actions & Notifications
            "Search": "Search",
            "Filter": "Filter",
            "Export": "Export",
            "Print": "Print",
            "Close": "Close",
            "Submit": "Submit",
            "Cancel": "Cancel",
            "Confirm": "Confirm",
            "Success": "Success",
            "Error": "Error",
            "Warning": "Warning",
            "Information": "Information"
        },
        hi: {
            // Header
            "TRACE DIGITAL DASHBOARD": "ट्रेस डिजिटल डैशबोर्ड",
            "Full Screen": "फुल स्क्रीन",
            "Exit Full Screen": "फुल स्क्रीन बंद करें",
            "Time Filter": "समय फ़िल्टर",
            "Live (Real-time)": "लाइव (वास्तविक समय)",
            "Past 1 Hour": "पिछला 1 घंटा",
            "Today (24h)": "आज (24 घंटे)",
            "Past 7 Days": "पिछले 7 दिन",
            "Dark": "डार्क",
            "Light": "लाइट",
            "Sign Out": "लॉग आउट",
            "Active Prototype": "सक्रिय प्रोटोटाइप",
            "Enterprise Node": "एंटरप्राइज नोड",
            
            // Sidebar Main Navigation
            "HOME": "होम",
            "Summary": "सारांश",
            "Weighbridge summary": "वेब्रिज सारांश",
            "Checkpost summary": "चेकपोस्ट सारांश",
            "VTS summary": "वीटीएस सारांश",
            "Alert Dashboard": "अलर्ट डैशबोर्ड",
            "AI Driven Drone Monitoring": "एआई ड्रोन निगरानी",
            "Camera View": "कैमरा दृश्य",
            "Grid View": "ग्रिड दृश्य",
            "GIS Map View": "जीआईएस मानचित्र दृश्य",
            "RFID Status & Configuration": "आरएफआईडी स्थिति एवं विन्यास",
            "Irregular Weighments": "अनियमित वजन",
            "Irregular Trips": "अनियमित ट्रिप",
            "Workers Attendance (Mining / Plant)": "श्रमिक उपस्थिति (खनन / संयंत्र)",
            "Workers Attendance": "श्रमिक उपस्थिति",
            "Blacklisted Vehicles": "ब्लैकलिस्टेड वाहन",
            "View": "देखें",
            "Add Blacklisted Vehicle": "ब्लैकलिस्टेड वाहन जोड़ें",
            "Remove / Unblacklist Vehicle": "वाहन हटाएं / अनब्लैकलिस्ट करें",
            "Contract Management": "अनुबंध प्रबंधन",
            "Area Master": "क्षेत्र मास्टर",
            "Plant Master": "संयंत्र मास्टर",
            "WeighBridge Master": "वेब्रिज मास्टर",
            "Checkpost Master": "चेकपोस्ट मास्टर",
            "Transporter Master": "ट्रांसपोर्टर मास्टर",
            "Maintenance Master": "रखरखाव मास्टर",
            "Reports & Analytics": "रिपोर्ट्स एवं एनालिटिक्स",
            "ANALYTICS": "एनालिटिक्स",
            "DASHBOARDS & OPERATIONS": "डैशबोर्ड एवं संचालन",
            "SECURITY & SURVEILLANCE": "सुरक्षा एवं निगरानी",
            "SYSTEM CONFIGURATION": "सिस्टम विन्यास",
            
            // Blacklisted Vehicles Module
            "Blacklisted Vehicles Master Registry": "ब्लैकलिस्टेड वाहन मास्टर रजिस्ट्री",
            "Total Blacklisted": "कुल ब्लैकलिस्टेड",
            "Recent Violations": "हालिया उल्लंघन",
            "Security Escalations": "सुरक्षा अलर्ट",
            "Compliance Actions": "अनुपालन कार्रवाइयां",
            "Filter by Vehicle Number": "वाहन संख्या द्वारा फ़िल्टर करें",
            "Type to filter...": "फ़िल्टर करने के लिए लिखें...",
            "Export CSV": "सीएसवी निर्यात करें",
            "Vehicle Number": "वाहन संख्या",
            "Remarks": "टिप्पणियां",
            "Blacklisted By": "किसके द्वारा ब्लैकलिस्टेड",
            "Blacklisted On": "ब्लैकलिस्ट की तिथि",
            "Action": "कार्रवाई",
            "Unblacklist": "अनब्लैकलिस्ट करें",
            "ADD BLACKLISTED VEHICLE": "ब्लैकलिस्टेड वाहन जोड़ें",
            "REMOVE / UNBLACKLIST VEHICLE": "वाहन हटाएं / अनब्लैकलिस्ट करें",
            "Approver (OTP)": "स्वीकृतिकर्ता (ओटीपी)",
            "Select Approver": "स्वीकृतिकर्ता चुनें",
            "Send OTP": "ओटीपी भेजें",
            "Enter OTP": "ओटीपी दर्ज करें",
            "Blacklist Vehicle": "वाहन ब्लैकलिस्ट करें",
            "Unblacklist Vehicle": "वाहन अनब्लैकलिस्ट करें",
            "Reason / Violation Details": "कारण / उल्लंघन का विवरण",
            "Enter reasons for blacklisting (e.g. boom barrier damage, tampering)...": "ब्लैकलिस्ट करने का कारण दर्ज करें (जैसे बूम बैरियर क्षति, जीपीएस छेड़छाड़)...",
            "Reason / Justification for Removal": "हटाने का कारण / औचित्य",
            "Enter justification for removing vehicle from blacklist...": "वाहन को ब्लैकलिस्ट से हटाने का औचित्य दर्ज करें...",
            "Enter vehicle number (e.g. JH02BZ8562)...": "वाहन संख्या दर्ज करें (जैसे JH02BZ8562)...",
            
            // Summary Tabs & Dashboard
            "Weighbridge Status": "वेब्रिज स्थिति",
            "Checkpost Status": "चेकपोस्ट स्थिति",
            "VTS Fleet Summary": "वीटीएस फ्लीट सारांश",
            "Operational Total": "कुल संचालित",
            "Operational %": "संचालन %",
            "Road Dispatch": "सड़क प्रेषण",
            "Internal Movement": "आंतरिक आवागमन",
            "Total Transactions": "कुल लेनदेन",
            "Bypassing Detected": "बायपास का पता चला",
            "Boom Violations": "बूम उल्लंघन",
            "ANPR Accuracy": "एएनपीआर सटीकता",
            "Search Area or Project...": "क्षेत्र या परियोजना खोजें...",
            "All Areas": "सभी क्षेत्र",
            "Live": "लाइव",
            "Operational": "सक्रिय",
            "Offline": "ऑफलाइन",
            "Maintenance": "रखरखाव",
            
            // Common Actions & Notifications
            "Search": "खोजें",
            "Filter": "फ़िल्टर",
            "Export": "निर्यात",
            "Print": "प्रिंट",
            "Close": "बंद करें",
            "Submit": "सबमिट करें",
            "Cancel": "रद्द करें",
            "Confirm": "पुष्टि करें",
            "Success": "सफलता",
            "Error": "त्रुटि",
            "Warning": "चेतावनी",
            "Information": "जानकारी"
        }
    };

    let currentLang = 'en';

    // Reverse lookup map for restoring original English text
    const hiToEnMap = {};
    for (const [enKey, hiVal] of Object.entries(TRANSLATIONS.hi)) {
        hiToEnMap[hiVal.trim()] = enKey.trim();
    }

    /**
     * Translates a single text string
     */
    function t(key, lang) {
        lang = lang || currentLang;
        const cleanKey = (key || '').trim();
        if (lang === 'hi') {
            return TRANSLATIONS.hi[cleanKey] || cleanKey;
        } else {
            return TRANSLATIONS.en[cleanKey] || hiToEnMap[cleanKey] || cleanKey;
        }
    }

    /**
     * Translates DOM text nodes throughout the page
     */
    function translateDOM(root, lang) {
        if (!root) root = document.body;
        
        // 1. Elements with explicit data-i18n attribute
        const i18nElements = root.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const trans = t(key, lang);
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = trans;
                } else {
                    el.textContent = trans;
                }
            }
        });

        // 2. Specific selectors across Nav, Headers, Buttons, and Forms
        const targets = root.querySelectorAll(
            '.nav-text, .sub-nav-text, .nav-section-title, .header-main-title, ' +
            '.tab-btn, .form-view-header h2, .bl-form-header h2, .bl-form-label-cell label, ' +
            '.bl-stat-label, .bl-filter-box label, .bl-btn-submit-action span, .bl-btn-send-otp, ' +
            '.theme-pill-btn span, #fullscreenBtnText, .btn-logout span, .badge'
        );

        targets.forEach(el => {
            // Check if element has direct text
            const directText = Array.from(el.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join(' ');

            const textToLookup = directText || el.textContent.trim();
            if (textToLookup) {
                const translation = t(textToLookup, lang);
                if (translation && translation !== textToLookup) {
                    // If element has only text child
                    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
                        el.textContent = translation;
                    } else {
                        // Replace only text nodes without destroying child icons/badges
                        el.childNodes.forEach(child => {
                            if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
                                child.textContent = ' ' + t(child.textContent.trim(), lang) + ' ';
                            }
                        });
                    }
                }
            }
        });

        // 3. Placeholders for inputs
        const inputs = root.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            const ph = input.getAttribute('placeholder');
            if (ph) {
                const translatedPh = t(ph, lang);
                if (translatedPh) input.setAttribute('placeholder', translatedPh);
            }
        });
    }

    /**
     * Sets the application language (en / hi)
     */
    window.setLanguage = function(lang) {
        currentLang = lang === 'hi' ? 'hi' : 'en';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('data-lang', currentLang);

        try {
            localStorage.setItem('trace_lang', currentLang);
        } catch(e) {}

        // Update UI Pill buttons
        const btnEn = document.getElementById('langPillEn');
        const btnHi = document.getElementById('langPillHi');
        if (btnEn && btnHi) {
            if (currentLang === 'hi') {
                btnHi.classList.add('active');
                btnEn.classList.remove('active');
            } else {
                btnEn.classList.add('active');
                btnHi.classList.remove('active');
            }
        }

        // Apply DOM Translations
        translateDOM(document.body, currentLang);

        // Dispatch custom event for widgets or dynamic tables
        window.dispatchEvent(new CustomEvent('traceLanguageChanged', { detail: { lang: currentLang } }));
    };

    /**
     * Toggles between English and Hindi
     */
    window.toggleLanguageMode = function() {
        const nextLang = currentLang === 'en' ? 'hi' : 'en';
        window.setLanguage(nextLang);
    };

    /**
     * Helper to expose translation method globally
     */
    window.__t = function(text) {
        return t(text, currentLang);
    };

    /**
     * Initialize on DOM Ready
     */
    function initLanguage() {
        let savedLang = 'en';
        try {
            savedLang = localStorage.getItem('trace_lang') || 'en';
        } catch(e) {}
        
        window.setLanguage(savedLang);

        const btnEn = document.getElementById('langPillEn');
        const btnHi = document.getElementById('langPillHi');
        if (btnEn) {
            btnEn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.setLanguage('en');
            });
        }
        if (btnHi) {
            btnHi.addEventListener('click', (e) => {
                e.stopPropagation();
                window.setLanguage('hi');
            });
        }
        window.addEventListener('hashchange', () => {
            if (currentLang === 'hi') {
                setTimeout(() => translateDOM(document.body, 'hi'), 50);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }
})();
