/**
 * TRACE Command Center - Comprehensive Internationalization (i18n) Engine
 * Dual-Language System (English 🇬🇧 / हिन्दी 🇮🇳)
 */

(function() {
    'use strict';

    const TRANSLATIONS = {
        en: {
            // Header & Profile
            "TRACE DIGITAL DASHBOARD": "TRACE DIGITAL DASHBOARD",
            "Full Screen": "Full Screen",
            "Exit Fullscreen": "Exit Fullscreen",
            "Exit Full Screen": "Exit Full Screen",
            "Visual Analytics": "Visual Analytics",
            "Export PDF": "Export PDF",
            "Export Excel": "Export Excel",
            "Dark": "Dark",
            "Light": "Light",
            "Sign Out": "Sign Out",
            "GENERAL MANAGER (MINING & OPS)": "GENERAL MANAGER (MINING & OPS)",
            "VIGILANCE OFFICER": "VIGILANCE OFFICER",
            "SURVEILLANCE COMMANDER": "SURVEILLANCE COMMANDER",
            "DISPATCH CONTROLLER": "DISPATCH CONTROLLER",
            "WEIGHBRIDGE OPERATOR": "WEIGHBRIDGE OPERATOR",
            
            // Sidebar Navigation
            "HOME": "HOME",
            "Summary": "Summary",
            "Weighbridge summary": "Weighbridge summary",
            "Checkpost summary": "Checkpost summary",
            "VTS summary": "VTS summary",
            "Alert Dashboard": "Alert Dashboard",
            "AI Driven Drone Monitoring": "AI Driven Drone Monitoring",
            "Camera View": "Camera View",
            "Grid View": "Grid View",
            "GIS View": "GIS View",
            "GIS Map View": "GIS Map View",
            "VTS Dashboard": "VTS Dashboard",
            "RFID Dashboard": "RFID Dashboard",
            "RFID Status & Configuration": "RFID Status & Configuration",
            "Irregular Weighments": "Irregular Weighments",
            "Irregular Trips": "Irregular Trips",
            "Workers Attendance": "Workers Attendance",
            "Workers Attendance (Mining / Plant)": "Workers Attendance (Mining / Plant)",
            "Digital Audit Trails": "Digital Audit Trails",
            "Blacklisted Vehicles": "Blacklisted Vehicles",
            "View": "View",
            "Add": "Add",
            "Remove": "Remove",
            "Add Blacklisted Vehicle": "Add Blacklisted Vehicle",
            "Remove / Unblacklist Vehicle": "Remove / Unblacklist Vehicle",
            "DO Operations": "DO Operations",
            "View Internal DO Data": "View Internal DO Data",
            "Add Internal DO Data": "Add Internal DO Data",
            "Edit DO or Map to WB": "Edit DO or Map to WB",
            "Reports": "Reports",
            "Road Dispatch": "Road Dispatch",
            "Internal Transport": "Internal Transport",
            "Checkpost Report": "Checkpost Report",
            "Active Vehicle": "Active Vehicle",
            "Reconcile Report": "Reconcile Report",
            "Manual Operations": "Manual Operations",
            "Manual Boom Operations": "Manual Boom Operations",
            "Contract Management": "Contract Management",
            "Area Master": "Area Master",
            "Plant Master": "Plant Master",
            "WeighBridge Master": "WeighBridge Master",
            "Checkpost Master": "Checkpost Master",
            "Transporter Master": "Transporter Master",
            "Maintenance Master": "Maintenance Master",
            "App Installation": "App Installation",
            "DASHBOARD": "DASHBOARD",
            "ANALYTICS": "ANALYTICS",
            "Reports & Analytics": "Reports & Analytics",
            "Live Dashboard": "Live Dashboard",
            "MOBILE APP": "MOBILE APP",

            // App Installation Center
            "TRACE Mobile App Installation Center": "TRACE Mobile App Installation Center",
            "TRACE Mobile Field Assistant™": "TRACE Mobile Field Assistant™",
            "TRACE Mobile Field Assistant": "TRACE Mobile Field Assistant",
            "TRACE MOBILE™ APP INSTALLATION": "TRACE MOBILE™ APP INSTALLATION",
            "Geo-tagged mobile application for field inspections, safety observations, attendance, and incident reporting with offline support.": "Geo-tagged mobile application for field inspections, safety observations, attendance, and incident reporting with offline support.",
            "Geo-Tagged Field Inspections": "Geo-Tagged Field Inspections",
            "Safety Observations": "Safety Observations",
            "Workers Attendance": "Workers Attendance",
            "Incident Reporting (Offline Support)": "Incident Reporting (Offline Support)",
            "Incident Reporting (Offline)": "Incident Reporting (Offline)",
            "Incident Reporting": "Incident Reporting",
            "Download APK (42.8 MB)": "Download APK (42.8 MB)",
            "Download TRACE APK (42.8 MB)": "Download TRACE APK (42.8 MB)",
            "Download TRACE APK File": "Download TRACE APK File",
            "Scan with Android Camera": "Scan with Android Camera",
            "Installation Instructions": "Installation Instructions",
            "Quick 3-Step Setup Instructions": "Quick 3-Step Setup Instructions",
            "Core Application Modules": "Core Application Modules",
            "Offline Sync Ready": "Offline Sync Ready",
            "Offline First Sync": "Offline First Sync",
            "Direct Installation": "Direct Installation",
            "Direct Package Installation": "Direct Package Installation",
            "Copy URL": "Copy URL",
            "Copy": "Copy",
            "Copied! ✅": "Copied! ✅",

            // Alert Dashboard & Tactical ICCC
            "Unauthorized stoppage": "Unauthorized stoppage",
            "Vehicle Detection": "Vehicle Detection",
            "Person Detection": "Person Detection",
            "Intrusion Detection": "Intrusion Detection",
            "Traffic Congestion": "Traffic Congestion",
            "Loaded-Unloaded Alerts": "Loaded-Unloaded Alerts",
            "Off-Route Movement": "Off-Route Movement",
            "Speed Violation": "Speed Violation",
            "Boom Barrier Force": "Boom Barrier Force",
            "Crowd Formation": "Crowd Formation",
            "Camera Tampering": "Camera Tampering",
            "Safety Gear Violation": "Safety Gear Violation",
            "Illumination Alert": "Illumination Alert",
            "All Types": "All Types",
            "ALL": "ALL",
            "Critical": "Critical",
            "High": "High",
            "Medium": "Medium",
            "Low": "Low",
            "Active": "Active",
            "Resolved": "Resolved",
            "Acknowledged": "Acknowledged",
            "Filter by Type": "Filter by Type",
            "Filter by Severity": "Filter by Severity",
            "Filter by Status": "Filter by Status",
            "Filter by Area": "Filter by Area",
            "Search alerts by vehicle, location, or anomaly keyword...": "Search alerts by vehicle, location, or anomaly keyword...",
            "INCIDENT FORENSICS & TELEMETRY": "INCIDENT FORENSICS & TELEMETRY",
            "Dispatch QRT Unit": "Dispatch QRT Unit",
            "Lock Boom Barrier": "Lock Boom Barrier",
            "Acknowledge": "Acknowledge",
            "Resolve": "Resolve",

            // Summary View Cards & Tables
            "Weighbridge Status": "Weighbridge Status",
            "Checkpost Status": "Checkpost Status",
            "VTS Fleet Summary": "VTS Fleet Summary",
            "Operational Total": "Operational Total",
            "Operational %": "Operational %",
            "Total Transactions": "Total Transactions",
            "Gross Weight": "Gross Weight",
            "Tare Weight": "Tare Weight",
            "Net Weight": "Net Weight",
            "Overload Violations": "Overload Violations",
            "Bypassing Detected": "Bypassing Detected",
            "Boom Violations": "Boom Violations",
            "ANPR Accuracy": "ANPR Accuracy",
            "Active Vehicles": "Active Vehicles",
            "Idle Vehicles": "Idle Vehicles",
            "Transit Delayed": "Transit Delayed",
            "Geofence Compliance": "Geofence Compliance",
            "Search Area or Project...": "Search Area or Project...",
            "All Areas": "All Areas",
            "North Karanpura": "North Karanpura",
            "Piprawar": "Piprawar",
            "Rajrappa": "Rajrappa",
            "BarkaSayana": "BarkaSayana",
            "Kathara": "Kathara",
            "B&K": "B&K",
            "Dhori": "Dhori",
            "Kuju": "Kuju",
            "Hazaribagh": "Hazaribagh",
            "Operational": "Operational",
            "Offline": "Offline",
            "Maintenance": "Maintenance",
            "Live": "Live",

            // Workers Attendance
            "Location Attendance Dashboard": "Location Attendance Dashboard",
            "Active Member": "Active Member",
            "Present": "Present",
            "Absent": "Absent",
            "Attendance Overview": "Attendance Overview",
            "Go": "Go",

            // Common Actions & Form Controls
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
            "Information": "Information",
            "Status": "Status",
            "Action": "Action",
            "Actions": "Actions",
            "Vehicle Number": "Vehicle Number",
            "Transporter": "Transporter",
            "Driver Name": "Driver Name",
            "Location": "Location",
            "Timestamp": "Timestamp",
            "Date": "Date",
            "Time": "Time",
            "Description": "Description",
            "Confidence": "Confidence",
            "Remarks": "Remarks",
            "Add New Record": "Add New Record",
            "Save Changes": "Save Changes",
            "OFFICER CREDENTIALS & ACCESS": "OFFICER CREDENTIALS & ACCESS",
            "ACTIVE SESSION": "ACTIVE SESSION",
            "TIER-1 CLEARANCE": "TIER-1 CLEARANCE",
            "Command Station:": "Command Station:",
            "Access Role:": "Access Role:",
            "Encryption & Telemetry:": "Encryption & Telemetry:",
            "Live Database:": "Live Database:"
        },
        hi: {
            // Header & Profile
            "TRACE DIGITAL DASHBOARD": "ट्रेस डिजिटल डैशबोर्ड",
            "Full Screen": "पूर्ण स्क्रीन",
            "Exit Fullscreen": "फुल स्क्रीन बंद करें",
            "Exit Full Screen": "फुल स्क्रीन बंद करें",
            "Visual Analytics": "दृश्य विश्लेषिकी",
            "Export PDF": "पीडीएफ निर्यात",
            "Export Excel": "एक्सेल निर्यात",
            "Dark": "डार्क",
            "Light": "लाइट",
            "Sign Out": "लॉग आउट",
            "GENERAL MANAGER (MINING & OPS)": "महाप्रबंधक (खनन एवं संचालन)",
            "VIGILANCE OFFICER": "सतर्कता अधिकारी",
            "SURVEILLANCE COMMANDER": "निगरानी कमांडर",
            "DISPATCH CONTROLLER": "प्रेषण नियंत्रक",
            "WEIGHBRIDGE OPERATOR": "वेब्रिज ऑपरेटर",
            
            // Sidebar Navigation
            "HOME": "होम",
            "Summary": "सारांश",
            "Weighbridge summary": "वेब्रिज सारांश",
            "Checkpost summary": "चेकपोस्ट सारांश",
            "VTS summary": "वीटीएस सारांश",
            "Alert Dashboard": "अलर्ट डैशबोर्ड",
            "AI Driven Drone Monitoring": "एआई ड्रोन निगरानी",
            "Camera View": "कैमरा दृश्य",
            "Grid View": "ग्रिड दृश्य",
            "GIS View": "जीआईएस दृश्य",
            "GIS Map View": "जीआईएस मानचित्र दृश्य",
            "VTS Dashboard": "वीटीएस डैशबोर्ड",
            "RFID Dashboard": "आरएफआईडी डैशबोर्ड",
            "RFID Status & Configuration": "आरएफआईडी स्थिति एवं विन्यास",
            "Irregular Weighments": "अनियमित वजन",
            "Irregular Trips": "अनियमित ट्रिप",
            "Workers Attendance": "श्रमिक उपस्थिति",
            "Workers Attendance (Mining / Plant)": "श्रमिक उपस्थिति (खनन / संयंत्र)",
            "Digital Audit Trails": "डिजिटल ऑडिट ट्रेल्स",
            "Blacklisted Vehicles": "ब्लैकलिस्टेड वाहन",
            "View": "देखें",
            "Add": "जोड़ें",
            "Remove": "हटाएं",
            "Add Blacklisted Vehicle": "ब्लैकलिस्टेड वाहन जोड़ें",
            "Remove / Unblacklist Vehicle": "वाहन हटाएं / अनब्लैकलिस्ट करें",
            "DO Operations": "डीओ संचालन",
            "View Internal DO Data": "आंतरिक डीओ डेटा देखें",
            "Add Internal DO Data": "आंतरिक डीओ डेटा जोड़ें",
            "Edit DO or Map to WB": "डीओ संपादित करें / वेब्रिज मैप करें",
            "Reports": "रिपोर्ट्स",
            "Road Dispatch": "सड़क प्रेषण",
            "Internal Transport": "आंतरिक परिवहन",
            "Checkpost Report": "चेकपोस्ट रिपोर्ट",
            "Active Vehicle": "सक्रिय वाहन",
            "Reconcile Report": "समाधान रिपोर्ट",
            "Manual Operations": "मैनुअल संचालन",
            "Manual Boom Operations": "मैनुअल बूम संचालन",
            "Contract Management": "अनुबंध प्रबंधन",
            "Area Master": "क्षेत्र मास्टर",
            "Plant Master": "संयंत्र मास्टर",
            "WeighBridge Master": "वेब्रिज मास्टर",
            "Checkpost Master": "Checkpost Master",
            "Transporter Master": "ट्रांसपोर्टर मास्टर",
            "Maintenance Master": "रखरखाव मास्टर",
            "App Installation": "ऐप इंस्टॉलेशन",
            "DASHBOARD": "डैशबोर्ड",
            "ANALYTICS": "एनालिटिक्स",
            "Reports & Analytics": "रिपोर्ट्स एवं एनालिटिक्स",
            "Live Dashboard": "लाइव डैशबोर्ड",
            "MOBILE APP": "मोबाइल ऐप",

            // App Installation Center
            "TRACE Mobile App Installation Center": "ट्रेस मोबाइल ऐप इंस्टॉलेशन केंद्र",
            "TRACE Mobile Field Assistant™": "ट्रेस मोबाइल फील्ड सहायक™",
            "TRACE Mobile Field Assistant": "ट्रेस मोबाइल फील्ड सहायक",
            "TRACE MOBILE™ APP INSTALLATION": "ट्रेस मोबाइल™ ऐप इंस्टॉलेशन",
            "Geo-tagged mobile application for field inspections, safety observations, attendance, and incident reporting with offline support.": "फील्ड निरीक्षण, सुरक्षा अवलोकन, उपस्थिति और ऑफलाइन सहायता के साथ घटना रिपोर्टिंग के लिए जियो-टैग्ड मोबाइल एप्लिकेशन।",
            "Geo-Tagged Field Inspections": "जियो-टैग्ड फील्ड निरीक्षण",
            "Safety Observations": "सुरक्षा अवलोकन",
            "Workers Attendance": "श्रमिक उपस्थिति",
            "Incident Reporting (Offline Support)": "घटना रिपोर्टिंग (ऑफलाइन सहायता)",
            "Incident Reporting (Offline)": "घटना रिपोर्टिंग (ऑफलाइन)",
            "Incident Reporting": "घटना रिपोर्टिंग",
            "Download APK (42.8 MB)": "एपीके डाउनलोड करें (42.8 MB)",
            "Download TRACE APK (42.8 MB)": "ट्रेस एपीके डाउनलोड करें (42.8 MB)",
            "Download TRACE APK File": "ट्रेस एपीके फाइल डाउनलोड करें",
            "Scan with Android Camera": "एंड्रॉयड कैमरे से स्कैन करें",
            "Installation Instructions": "इंस्टॉलेशन निर्देश",
            "Quick 3-Step Setup Instructions": "त्वरित 3-चरणीय सेटअप निर्देश",
            "Core Application Modules": "मुख्य एप्लिकेशन मॉड्यूल",
            "Offline Sync Ready": "ऑफलाइन सिंक तैयार",
            "Offline First Sync": "ऑफलाइन फर्स्ट सिंक",
            "Direct Installation": "प्रत्यक्ष इंस्टॉलेशन",
            "Direct Package Installation": "प्रत्यक्ष पैकेज इंस्टॉलेशन",
            "Copy URL": "यूआरएल कॉपी करें",
            "Copy": "कॉपी करें",
            "Copied! ✅": "कॉपी हो गया! ✅",

            // Alert Dashboard & Tactical ICCC
            "Unauthorized stoppage": "अनधिकृत ठहराव",
            "Vehicle Detection": "वाहन पहचान",
            "Person Detection": "व्यक्ति पहचान",
            "Intrusion Detection": "अनधिकृत प्रवेश",
            "Traffic Congestion": "यातायात जाम",
            "Loaded-Unloaded Alerts": "लोड-अनलोड अलर्ट",
            "Off-Route Movement": "मार्ग से विचलन",
            "Speed Violation": "गति सीमा उल्लंघन",
            "Boom Barrier Force": "बूम बैरियर क्षति",
            "Crowd Formation": "भीड़ का जमाव",
            "Camera Tampering": "कैमरा छेड़छाड़",
            "Safety Gear Violation": "सुरक्षा उपकरण उल्लंघन",
            "Illumination Alert": "प्रकाश व्यवस्था अलर्ट",
            "All Types": "सभी प्रकार",
            "ALL": "सभी",
            "Critical": "गंभीर",
            "High": "उच्च",
            "Medium": "मध्यम",
            "Low": "निम्न",
            "Active": "सक्रिय",
            "Resolved": "समाधानित",
            "Acknowledged": "स्वीकृत",
            "Filter by Type": "प्रकार द्वारा फ़िल्टर",
            "Filter by Severity": "गंभीरता द्वारा फ़िल्टर",
            "Filter by Status": "स्थिति द्वारा फ़िल्टर",
            "Filter by Area": "क्षेत्र द्वारा फ़िल्टर",
            "Search alerts by vehicle, location, or anomaly keyword...": "वाहन, स्थान या विसंगति द्वारा अलर्ट खोजें...",
            "INCIDENT FORENSICS & TELEMETRY": "घटना फोरेंसिक एवं टेलीमेट्री",
            "Dispatch QRT Unit": "क्यूआरटी यूनिट भेजें",
            "Lock Boom Barrier": "बूम बैरियर लॉक करें",
            "Acknowledge": "स्वीकार करें",
            "Resolve": "समाधान करें",

            // Summary View Cards & Tables
            "Weighbridge Status": "वेब्रिज स्थिति",
            "Checkpost Status": "चेकपोस्ट स्थिति",
            "VTS Fleet Summary": "वीटीएस फ्लीट सारांश",
            "Operational Total": "कुल संचालित",
            "Operational %": "संचालन %",
            "Total Transactions": "कुल लेनदेन",
            "Gross Weight": "सकल वजन (Gross)",
            "Tare Weight": "खाली वजन (Tare)",
            "Net Weight": "शुद्ध वजन (Net)",
            "Overload Violations": "ओवरलोड उल्लंघन",
            "Bypassing Detected": "बायपास का पता चला",
            "Boom Violations": "बूम उल्लंघन",
            "ANPR Accuracy": "एएनपीआर सटीकता",
            "Active Vehicles": "सक्रिय वाहन",
            "Idle Vehicles": "निष्क्रिय वाहन",
            "Transit Delayed": "पारगमन में देरी",
            "Geofence Compliance": "जियोफेंस अनुपालन",
            "Search Area or Project...": "क्षेत्र या परियोजना खोजें...",
            "All Areas": "सभी क्षेत्र",
            "North Karanpura": "उत्तरी कर्णपुरा",
            "Piprawar": "पिपरावार",
            "Rajrappa": "रजरप्पा",
            "BarkaSayana": "बरका सयाना",
            "Kathara": "कथारा",
            "B&K": "बी एंड के",
            "Dhori": "ढोरी",
            "Kuju": "कुजू",
            "Hazaribagh": "हजारीबाग",
            "Operational": "सक्रिय",
            "Offline": "ऑफलाइन",
            "Maintenance": "रखरखाव",
            "Live": "लाइव",

            // Workers Attendance
            "Location Attendance Dashboard": "स्थान उपस्थिति डैशबोर्ड",
            "Active Member": "सक्रिय सदस्य",
            "Present": "उपस्थित",
            "Absent": "अनुपस्थित",
            "Attendance Overview": "उपस्थिति अवलोकन",
            "Go": "जाएं",

            // Common Actions & Form Controls
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
            "Information": "जानकारी",
            "Status": "स्थिति",
            "Action": "कार्रवाई",
            "Actions": "कार्रवाइयां",
            "Vehicle Number": "वाहन संख्या",
            "Transporter": "ट्रांसपोर्टर",
            "Driver Name": "चालक का नाम",
            "Location": "स्थान",
            "Timestamp": "समय",
            "Date": "दिनांक",
            "Time": "समय",
            "Description": "विवरण",
            "Confidence": "सटीकता",
            "Remarks": "टिप्पणियां",
            "Add New Record": "नया रिकॉर्ड जोड़ें",
            "Save Changes": "परिवर्तन सहेजें",
            "OFFICER CREDENTIALS & ACCESS": "अधिकारी क्रेडेंशियल्स एवं पहुंच",
            "ACTIVE SESSION": "सक्रिय सत्र",
            "TIER-1 CLEARANCE": "टियर-1 क्लीयरेंस",
            "Command Station:": "कमांड स्टेशन:",
            "Access Role:": "एक्सेस भूमिका:",
            "Encryption & Telemetry:": "एन्क्रिप्शन एवं टेलीमेट्री:",
            "Live Database:": "लाइव डेटाबेस:"
        }
    };

    let currentLang = 'en';

    /**
     * Translates a single text string
     */
    function t(key, lang) {
        lang = lang || currentLang;
        if (!key) return key;
        const cleanKey = key.toString().trim();
        if (lang === 'hi') {
            return TRANSLATIONS.hi[cleanKey] || cleanKey;
        } else {
            return TRANSLATIONS.en[cleanKey] || cleanKey;
        }
    }

    /**
     * Traverses all elements safely and applies translations
     */
    function translateDOM(root, lang) {
        if (!root) root = document.body;

        // 1. Explicit data-i18n attributes
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

        // 2. Comprehensive selector targets across all UI modules
        const selectors = [
            '.header-main-title',
            '.nav-text',
            '.sub-nav-text',
            '.nav-section-title',
            '.tab-btn',
            '.tab-btn span',
            '.user-name',
            '.user-role-badge',
            '.btn-logout span',
            '#fullscreenBtnText',
            '.theme-pill-btn span',
            '.card-title',
            '.alert-title',
            '.metric-label',
            '.metric-card-label',
            '.stat-title',
            '.stat-card-title',
            '.attendance-title',
            '.overview-section-title',
            '.att-card-label',
            '.rfid-page-title',
            '.trips-main-title',
            '.table th',
            '.table-header th',
            '.threat-badge-pill',
            '.app-install-header-title',
            '.app-install-header-subtitle',
            '.app-install-card-title',
            '.app-install-card-desc',
            '.app-feature-title',
            '.app-feature-text',
            '.app-side-card-title',
            '.app-side-card-heading',
            '.app-side-card-text',
            '.btn-action span',
            '.btn-action',
            '.form-label',
            '.bl-stat-label',
            '.bl-form-header h2',
            '.config-modal-title span',
            '.drone-tab-btn'
        ];

        const elements = root.querySelectorAll(selectors.join(', '));
        elements.forEach(el => {
            // Ignore script or style tags
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;

            // Cache original English text on the element
            if (!el.hasAttribute('data-orig-en')) {
                const initialText = Array.from(el.childNodes)
                    .filter(n => n.nodeType === Node.TEXT_NODE)
                    .map(n => n.textContent.trim())
                    .filter(Boolean)
                    .join(' ') || el.textContent.trim();
                if (initialText) {
                    el.setAttribute('data-orig-en', initialText);
                }
            }

            const sourceText = el.getAttribute('data-orig-en') || el.textContent.trim();
            if (!sourceText) return;

            const translated = lang === 'hi' ? (TRANSLATIONS.hi[sourceText] || sourceText) : sourceText;
            
            // Only update text nodes to preserve icons like <i> or <svg>
            const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
            if (textNodes.length > 0) {
                textNodes.forEach(node => {
                    const clean = node.textContent.trim();
                    const lookup = el.getAttribute('data-orig-en') || clean;
                    const nodeTrans = lang === 'hi' ? (TRANSLATIONS.hi[lookup] || TRANSLATIONS.hi[clean] || clean) : lookup;
                    node.textContent = node.textContent.startsWith(' ') ? ' ' + nodeTrans : nodeTrans;
                    if (node.textContent.endsWith(' ')) node.textContent += ' ';
                });
            } else if (el.children.length === 0) {
                el.textContent = translated;
            }
        });

        // 3. Placeholders for inputs and textareas
        const inputs = root.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            if (!input.hasAttribute('data-orig-ph')) {
                input.setAttribute('data-orig-ph', input.getAttribute('placeholder'));
            }
            const origPh = input.getAttribute('data-orig-ph');
            if (origPh) {
                input.setAttribute('placeholder', lang === 'hi' ? (TRANSLATIONS.hi[origPh] || origPh) : origPh);
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
        
        // Re-translate upon tab navigation or dynamic view switching
        window.addEventListener('hashchange', () => {
            if (currentLang === 'hi') {
                setTimeout(() => translateDOM(document.body, 'hi'), 60);
            }
        });
        
        document.addEventListener('click', () => {
            if (currentLang === 'hi') {
                setTimeout(() => translateDOM(document.body, 'hi'), 80);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }
})();
