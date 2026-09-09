document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Collapse/Expand Toggle
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Elements
    const topTabBtns = document.querySelectorAll('.tab-btn');
    const sidebarSummaryItems = document.querySelectorAll('[data-tab]');
    const tabPanels = document.querySelectorAll('.tab-content-panel');
    const tabsCard = document.querySelector('.tabs-card');
    const alertDashboardItem = document.querySelector('[data-view="alert-dashboard"]');
    const vtsDashboardItem = document.querySelector('[data-view="vts-dashboard"]');
    const rfidDashboardItem = document.querySelector('[data-view="rfid-dashboard"]');
    const irregularWeighmentsItem = document.querySelector('[data-view="irregular-weighments"]');
    const irregularTripsItem = document.querySelector('[data-view="irregular-trips"]');
    const droneDashboardItem = document.querySelector('[data-view="drone-dashboard"]');
    const workersAttendanceItem = document.querySelector('[data-view="workers-attendance"]');
    const digitalAuditTrailsItem = document.querySelector('[data-view="digital-audit-trails"]');
    const mainSidebarMenu = document.getElementById('mainSidebarMenu');
    const alertSidebarMenu = document.getElementById('alertSidebarMenu');
    const btnBackHome = document.getElementById('btnBackHome');
    const vtsBtnHome = document.getElementById('vtsBtnHome');

    // Dynamic Alert Dashboard Elements
    const detectionSelect = document.getElementById('detectionTypeSelect');
    const alertSubNavItems = document.querySelectorAll('.alert-sub-list .sub-nav-item');
    const alertOverviewContainer = document.getElementById('alertOverviewContainer');
    const alertDetailContainer = document.getElementById('alertDetailContainer');
    const detailTitle = document.getElementById('detailTitle');
    const detailIcon = document.getElementById('detailIcon');
    const detailSubtitleText = document.getElementById('detailSubtitleText');
    const detailEventsBody = document.getElementById('detailEventsBody');
    const headerBadgeCount = document.getElementById('headerBadgeCount');
    const btnCloseDetail = document.getElementById('btnCloseDetail');
    const cardStoppage = document.getElementById('cardStoppage');
    const vaCardVehicle = document.getElementById('vaCardVehicle');
    const vaCards = document.querySelectorAll('.va-sidebar-cards-list .mini-card');
    const overviewCards = document.querySelectorAll('#alertOverviewContainer .metric-card');

    // Dynamic Header Title Updater
    window.updateHeaderMainTitle = function(title) {
        const headerTitle = document.getElementById('headerMainTitle') || document.querySelector('.header-main-title');
        if (headerTitle) {
            headerTitle.textContent = title;
        }
    };

    // Helper to update active state in sidebar navigation
    function setActiveSidebarNav(activeItem) {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
            link.classList.remove('active-link');
        });
        if (activeItem) {
            activeItem.classList.add('active');
            const link = activeItem.querySelector('.nav-link');
            if (link) link.classList.add('active-link');
        }
    }

    // Function to activate Summary sub-tabs (Weighbridge, Checkpost, VTS)
    function activateSummaryTab(tabKey) {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'block';

        const summaryNavItem = document.getElementById('summaryNavItem');
        setActiveSidebarNav(summaryNavItem);

        if (tabKey === 'weighbridge') updateHeaderMainTitle('WEIGHBRIDGE SUMMARY');
        else if (tabKey === 'checkpost') updateHeaderMainTitle('CHECKPOST SUMMARY');
        else if (tabKey === 'vts') updateHeaderMainTitle('VTS SUMMARY');
        else updateHeaderMainTitle('SUMMARY DASHBOARD');

        topTabBtns.forEach(btn => {
            if (btn.getAttribute('data-content') === `${tabKey}-view`) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        sidebarSummaryItems.forEach(item => {
            if (item.getAttribute('data-tab') === tabKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        tabPanels.forEach(panel => {
            if (panel.id === `${tabKey}-view`) {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    }
    window.showSummaryTab = activateSummaryTab;

    // Function to show Alert Dashboard View Mode (Full Widescreen - No Sidebar)
    window.showAlertDashboard = function(detectionType = 'All Types') {
        document.body.classList.add('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'none';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(alertDashboardItem);
        updateHeaderMainTitle('ALERT DASHBOARD');

        tabPanels.forEach(panel => {
            if (panel.id === 'alert-dashboard-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });

        if (window.setAlertDetectionType) {
            window.setAlertDetectionType(detectionType);
        }
    };

    // Function to show VTS Dashboard View Mode
    window.showVTSDashboard = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(vtsDashboardItem);
        updateHeaderMainTitle('VTS DASHBOARD');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'vts-dashboard-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show RFID Dashboard View Mode
    window.showRFIDDashboard = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(rfidDashboardItem);
        updateHeaderMainTitle('RFID DASHBOARD');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'rfid-dashboard-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show Irregular Weighments View Mode
    window.showIrregularWeighments = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(irregularWeighmentsItem);
        updateHeaderMainTitle('IRREGULAR WEIGHMENTS');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'irregular-weighments-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show Irregular Trips View Mode
    window.showIrregularTrips = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(irregularTripsItem);
        updateHeaderMainTitle('IRREGULAR TRIPS');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'irregular-trips-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show AI Driven Drone Monitoring Dashboard Mode
    window.showDroneDashboard = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(droneDashboardItem);
        updateHeaderMainTitle('AI DRIVEN DRONE MONITORING');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'drone-dashboard-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show Workers Attendance View Mode
    window.showWorkersAttendance = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        setActiveSidebarNav(workersAttendanceItem);
        updateHeaderMainTitle('WORKERS ATTENDANCE');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'workers-attendance-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Function to show Digital Audit Trails View Mode (50 Split Yearly Reports)
    window.showDigitalAuditTrails = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';
        
        const digitalAuditItem = document.getElementById('digitalAuditTrailsNavItem');
        setActiveSidebarNav(digitalAuditItem);
        updateHeaderMainTitle('DIGITAL AUDIT TRAILS & STATUTORY LEDGERS');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));

        tabPanels.forEach(panel => {
            if (panel.id === 'digital-audit-trails-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });

        initAuditTrailsData();
    };

    // Drone Sub-Tabs Switcher (Dashboard, Features, Sites, Inferred Reports)
    const droneTabBtns = document.querySelectorAll('.drone-tab-btn');
    const droneSubViews = document.querySelectorAll('.drone-sub-view');

    droneTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-drone-tab');

            droneTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            droneSubViews.forEach(view => {
                if (view.id === `droneSubView${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`) {
                    view.style.display = 'block';
                } else {
                    view.style.display = 'none';
                }
            });
        });
    });

    // Global alerts storage initialized with server-side live dataset
    window.ALL_LIVE_ALERTS = window.INITIAL_LIVE_ALERTS || window.ALL_LIVE_ALERTS || [];
    window.CURRENT_ALERT_CATEGORY = 'All Types';
    window.CURRENT_ALERT_SEVERITY_FILTER = 'ALL';
    window.CURRENT_ALERT_STATUS_FILTER = 'ALL';
    window.CURRENT_ALERT_AREA_FILTER = 'all';
    window.CURRENT_ALERT_SEARCH_QUERY = '';

    // Comprehensive category mapping helper for all 15 operational alert categories
    function getAlertCategoryKey(alert) {
        const type = (alert.alert_type || '').toLowerCase();
        const desc = (alert.description || '').toLowerCase();
        if (type.includes('stoppage') || type.includes('halt') || desc.includes('stationary')) return 'stoppage';
        if (type.includes('off route') || type.includes('route') || type.includes('geofence') || desc.includes('deviated')) return 'off_route';
        if (type.includes('off area') || type.includes('area') || type.includes('blasting') || desc.includes('restricted')) return 'off_area';
        if (type.includes('tamper alerts') || type.includes('device tamper') || type.includes('seal') || type.includes('tamper')) return 'tamper';
        if (type.includes('speed') || type.includes('velocity') || desc.includes('km/h')) return 'over_speed';
        if (type.includes('barrier') || type.includes('boom') || type.includes('gate')) return 'boom_barrier';
        if (type.includes('crowd') || desc.includes('congregation')) return 'crowd';
        if (type.includes('person') || desc.includes('pedestrian')) return 'person';
        if (type.includes('intrusion') || type.includes('tripwire') || desc.includes('perimeter')) return 'intrusion';
        if (type.includes('traffic') || type.includes('congestion') || desc.includes('queue')) return 'traffic';
        if (type.includes('load') || type.includes('unload') || type.includes('weight') || type.includes('variance') || type.includes('tare')) return 'load_unload';
        if (type.includes('camera') || desc.includes('occlusion')) return 'camera_tamper';
        if (type.includes('hazard') || type.includes('safety') || desc.includes('helmet') || desc.includes('vest')) return 'safety_hazard';
        if (type.includes('illumination') || type.includes('light') || desc.includes('lux')) return 'illumination';
        if (type.includes('vehicle') || desc.includes('light motor vehicle') || desc.includes('unregistered')) return 'vehicle';
        return 'stoppage';
    }

    function matchCategory(typeStr, alert) {
        const cat = getAlertCategoryKey(alert);
        const norm = (typeStr || '').toLowerCase().trim();
        if (norm === 'all types' || !norm) return true;
        if (norm.includes('unauthorized stoppage') || norm.includes('stoppage')) return cat === 'stoppage';
        if (norm.includes('off route') || norm.includes('off-route') || norm.includes('geofence')) return cat === 'off_route';
        if (norm.includes('off area') || norm.includes('off-area')) return cat === 'off_area';
        if (norm.includes('tamper alerts') || norm.includes('tamper')) return cat === 'tamper' || cat === 'camera_tamper';
        if (norm.includes('over speed') || norm.includes('over-speed')) return cat === 'over_speed';
        if (norm.includes('boom') || norm.includes('barrier')) return cat === 'boom_barrier';
        if (norm.includes('vehicle')) return cat === 'vehicle';
        if (norm.includes('crowd')) return cat === 'crowd';
        if (norm.includes('person')) return cat === 'person';
        if (norm.includes('intrusion')) return cat === 'intrusion';
        if (norm.includes('traffic')) return cat === 'traffic';
        if (norm.includes('loaded') || norm.includes('weight')) return cat === 'load_unload';
        if (norm.includes('camera')) return cat === 'camera_tamper';
        if (norm.includes('safety') || norm.includes('hazard')) return cat === 'safety_hazard';
        if (norm.includes('illumination')) return cat === 'illumination';
        return cat === norm;
    }

    // Function to set detection view (All Types Overview vs Specific Detail view)
    window.setAlertDetectionType = function(type) {
        window.CURRENT_ALERT_CATEGORY = type || 'All Types';
        const detSelect = document.getElementById('detectionTypeSelect');
        if (detSelect) detSelect.value = window.CURRENT_ALERT_CATEGORY;

        // Reset triage chips to All when explicitly selecting a category from sidebar or card
        window.CURRENT_ALERT_SEVERITY_FILTER = 'ALL';
        window.CURRENT_ALERT_STATUS_FILTER = 'ALL';
        document.querySelectorAll('.alert-triage-bar .chip-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('chipFilterAll')?.classList.add('active');

        const alertSubItems = document.querySelectorAll('.sub-nav-item[data-detection]');
        alertSubItems.forEach(item => {
            const itemType = item.getAttribute('data-detection');
            if (itemType === window.CURRENT_ALERT_CATEGORY) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const overviewCon = document.getElementById('alertOverviewContainer');
        const detailCon = document.getElementById('alertDetailContainer');

        if (window.CURRENT_ALERT_CATEGORY === 'All Types' || !window.CURRENT_ALERT_CATEGORY) {
            if (overviewCon) overviewCon.style.display = 'block';
            if (detailCon) detailCon.style.display = 'none';
        } else {
            if (overviewCon) overviewCon.style.display = 'none';
            if (detailCon) detailCon.style.display = 'grid';
            const mainContent = document.querySelector('.main-content') || window;
            if (mainContent.scrollTo) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }

        renderDetailEventsForCategory(window.CURRENT_ALERT_CATEGORY);
        if (typeof updateAlertsDashboardUI === 'function') {
            updateAlertsDashboardUI();
        }
    };

    // Sub-nav detection items click listeners
    document.querySelectorAll('.sub-nav-item[data-detection]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const type = item.getAttribute('data-detection');
            if (type) window.setAlertDetectionType(type);
        });
    });

    const detSelectEl = document.getElementById('detectionTypeSelect');
    if (detSelectEl) {
        detSelectEl.addEventListener('change', (e) => {
            window.setAlertDetectionType(e.target.value);
        });
    }

    // View Binding Click Helper
    function bindViewClick(item, showFn) {
        if (!item) return;
        const handler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showFn();
        };
        item.addEventListener('click', handler);
        const link = item.querySelector('a');
        if (link) link.addEventListener('click', handler);
    }

    bindViewClick(alertDashboardItem, () => showAlertDashboard('All Types'));
    bindViewClick(vtsDashboardItem, showVTSDashboard);
    bindViewClick(rfidDashboardItem, showRFIDDashboard);
    bindViewClick(irregularWeighmentsItem, showIrregularWeighments);
    bindViewClick(irregularTripsItem, showIrregularTrips);
    bindViewClick(droneDashboardItem, showDroneDashboard);
    bindViewClick(workersAttendanceItem, showWorkersAttendance);
    bindViewClick(digitalAuditTrailsItem, showDigitalAuditTrails);

    // Home navigation link
    const homeNavLink = document.querySelector('.nav-item-home a');
    if (homeNavLink) {
        homeNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            const homeItem = document.querySelector('.nav-item-home');
            setActiveSidebarNav(homeItem);
            activateSummaryTab('weighbridge');
            updateHeaderMainTitle('TRACE DIGITAL DASHBOARD');
        });
    }

    // Back Home button clicks
    if (btnBackHome) {
        btnBackHome.addEventListener('click', (e) => {
            e.preventDefault();
            activateSummaryTab('weighbridge');
            updateHeaderMainTitle('TRACE DIGITAL DASHBOARD');
        });
    }

    if (vtsBtnHome) {
        vtsBtnHome.addEventListener('click', (e) => {
            e.preventDefault();
            activateSummaryTab('weighbridge');
            updateHeaderMainTitle('TRACE DIGITAL DASHBOARD');
        });
    }

    // Sub-nav items click handler (Blacklisted, DO Ops, Config, Reports)
    document.querySelectorAll('.sub-nav-item a').forEach(subLink => {
        subLink.addEventListener('click', function(e) {
            const parentSubItem = this.closest('.sub-nav-item');
            if (parentSubItem && (parentSubItem.hasAttribute('data-tab') || parentSubItem.hasAttribute('data-view') || parentSubItem.id === 'cameraGridNavItem' || parentSubItem.id === 'cameraGisNavItem')) {
                return;
            }
            e.preventDefault();
            const subText = this.querySelector('.sub-nav-text')?.textContent?.trim();
            const parentNav = this.closest('.nav-item');
            const parentText = parentNav?.querySelector('.nav-text')?.textContent?.trim();
            if (subText && parentText) {
                updateHeaderMainTitle(`${parentText.toUpperCase()} - ${subText.toUpperCase()}`);
            } else if (subText) {
                updateHeaderMainTitle(subText.toUpperCase());
            }
        });
    });

    // Top Tab button clicks
    topTabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contentId = btn.getAttribute('data-content');
            if (contentId) {
                const tabKey = contentId.replace('-view', '');
                activateSummaryTab(tabKey);
            }
        });
    });

    // Sidebar Summary Sub-item clicks
    sidebarSummaryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const tabKey = item.getAttribute('data-tab');
            if (tabKey) {
                activateSummaryTab(tabKey);
            }
        });
    });

    // Summary dropdown toggle (collapsed by default)
    const summaryNavLink = document.getElementById('summaryNavLink');
    const summarySubList = document.getElementById('summarySubList');
    const summaryArrow = document.getElementById('summaryArrow');

    if (summaryNavLink && summarySubList) {
        summarySubList.style.display = 'none';
        if (summaryArrow) summaryArrow.className = 'fa-solid fa-chevron-right arrow-icon';

        summaryNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof activateSummaryTab === 'function') {
                activateSummaryTab('weighbridge');
            }
            const isHidden = summarySubList.style.display === 'none' || getComputedStyle(summarySubList).display === 'none';
            summarySubList.style.display = isHidden ? 'block' : 'none';
            if (summaryArrow) {
                summaryArrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
            }
        });
    }

    // Reports dropdown toggle (collapsed by default)
    const reportsNavLink = document.getElementById('reportsNavLink');
    const reportsSubList = document.getElementById('reportsSubList');
    const reportsArrow = document.getElementById('reportsArrow');

    if (reportsNavLink && reportsSubList) {
        reportsSubList.style.display = 'none';
        if (reportsArrow) reportsArrow.className = 'fa-solid fa-chevron-right arrow-icon';

        reportsNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = reportsSubList.style.display === 'none' || getComputedStyle(reportsSubList).display === 'none';
            reportsSubList.style.display = isHidden ? 'block' : 'none';
            if (reportsArrow) {
                reportsArrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
            }
        });
    }

    // Generic Dropdown Toggle Helper
    function setupDropdownToggle(navLinkId, subListId, arrowId) {
        const link = document.getElementById(navLinkId);
        const list = document.getElementById(subListId);
        const arrow = document.getElementById(arrowId);
        if (link && list) {
            list.style.display = 'none';
            if (arrow) arrow.className = 'fa-solid fa-chevron-right arrow-icon';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const isHidden = list.style.display === 'none' || getComputedStyle(list).display === 'none';
                list.style.display = isHidden ? 'block' : 'none';
                if (arrow) {
                    arrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
                }
            });
        }
    }

    // DO Operations Dropdown Toggle (Collapsed by default)
    window.toggleDoOpsDropdown = function(e) {
        if (e) e.preventDefault();
        const list = document.getElementById('doOpsSubList');
        const arrow = document.getElementById('doOpsArrow');
        if (list) {
            const isHidden = list.style.display === 'none' || getComputedStyle(list).display === 'none';
            list.style.display = isHidden ? 'block' : 'none';
            if (arrow) {
                arrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
            }
        }
    };

    // Internal DO Dropdown Toggle (Keep expanded by default)
    window.toggleInternalDoDropdown = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const list = document.getElementById('internalDoSubList');
        const arrow = document.getElementById('internalDoArrow');
        if (list) {
            const isHidden = list.style.display === 'none' || getComputedStyle(list).display === 'none';
            list.style.display = isHidden ? 'block' : 'none';
            if (arrow) {
                arrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
            }
        }
    };

    setupDropdownToggle('blacklistedNavLink', 'blacklistedSubList', 'blacklistedArrow');
    setupDropdownToggle('cameraViewNavLink', 'cameraViewSubList', 'cameraViewArrow');

    // Camera Grid & GIS elements
    const cameraGridNavItem = document.getElementById('cameraGridNavItem');
    const cameraGisNavItem = document.getElementById('cameraGisNavItem');

    // Show Camera Grid View Mode
    window.showCameraGridView = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.remove('gis-mode-active');
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';

        const cameraViewNavItem = document.getElementById('cameraViewNavItem');
        setActiveSidebarNav(cameraViewNavItem);
        updateHeaderMainTitle('CAMERA VIEW (GRID)');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));
        if (cameraGridNavItem) cameraGridNavItem.classList.add('active');
        if (cameraGisNavItem) cameraGisNavItem.classList.remove('active');

        tabPanels.forEach(panel => {
            if (panel.id === 'camera-grid-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });
    };

    // Show Camera GIS View Mode
    window.showCameraGISView = function() {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.add('gis-mode-active');
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'block';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'none';
        if (tabsCard) tabsCard.style.display = 'none';

        const cameraViewNavItem = document.getElementById('cameraViewNavItem');
        setActiveSidebarNav(cameraViewNavItem);
        updateHeaderMainTitle('GIS CAMERA VIEW');

        sidebarSummaryItems.forEach(item => item.classList.remove('active'));
        if (cameraGisNavItem) cameraGisNavItem.classList.add('active');
        if (cameraGridNavItem) cameraGridNavItem.classList.remove('active');

        tabPanels.forEach(panel => {
            if (panel.id === 'camera-gis-view') {
                panel.classList.add('active');
                panel.style.display = 'block';
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
            }
        });

        // Initialize or invalidate size for Leaflet GIS map
        setTimeout(() => {
            initGisLeafletMap();
        }, 100);
    };

    if (cameraGridNavItem) {
        cameraGridNavItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.hash = '#camera-grid';
            showCameraGridView();
        });
    }

    if (cameraGisNavItem) {
        cameraGisNavItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.hash = '#camera-gis';
            showCameraGISView();
        });
    }

    // Grid Filter by Area & Zone
    window.filterCameraFeeds = function() {
        const area = document.getElementById('camAreaFilter')?.value || 'all';
        const zone = document.getElementById('camZoneFilter')?.value || 'all';
        const cards = document.querySelectorAll('#cameraStreamsGrid .cam-card');

        cards.forEach(card => {
            const cardArea = card.getAttribute('data-area');
            const cardZone = card.getAttribute('data-zone');
            const matchArea = (area === 'all' || cardArea === area);
            const matchZone = (zone === 'all' || cardZone === zone);
            card.style.display = (matchArea && matchZone) ? 'flex' : 'none';
        });
    };

    // Set Grid Layout (1x1, 2x2, 3x3, 4x4)
    window.setGridLayout = function(layout) {
        const grid = document.getElementById('cameraStreamsGrid');
        if (!grid) return;
        grid.className = `camera-streams-grid layout-${layout}`;
        document.querySelectorAll('.grid-layout-buttons .layout-btn').forEach(btn => {
            if (btn.getAttribute('data-layout') === layout) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Camera Snapshot Simulation
    window.takeGridSnapshot = function() {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = '#0284c7';
        toast.style.color = '#ffffff';
        toast.style.padding = '12px 18px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
        toast.style.zIndex = '99999';
        toast.style.fontWeight = '600';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '8px';
        toast.innerHTML = '<i class="fa-solid fa-camera"></i> Snapshot saved: CCTV_GRID_' + Date.now() + '.png';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };

    window.saveCamFrame = function(camId) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.right = '24px';
        toast.style.background = '#10b981';
        toast.style.color = '#ffffff';
        toast.style.padding = '10px 16px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
        toast.style.zIndex = '99999';
        toast.style.fontWeight = '600';
        toast.innerHTML = `<i class="fa-solid fa-download"></i> Frame captured from ${camId}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    };

    window.focusCamera = function(btn) {
        const card = btn.closest('.cam-card');
        if (!card) return;
        const grid = document.getElementById('cameraStreamsGrid');
        if (grid.classList.contains('layout-1x1')) {
            setGridLayout('2x2');
            document.querySelectorAll('#cameraStreamsGrid .cam-card').forEach(c => c.style.display = 'flex');
        } else {
            setGridLayout('1x1');
            document.querySelectorAll('#cameraStreamsGrid .cam-card').forEach(c => {
                c.style.display = (c === card) ? 'flex' : 'none';
            });
        }
    };

    // PTZ Controls
    window.toggleCamPTZ = function(camId) {
        document.getElementById('ptzCamId').textContent = camId;
        document.getElementById('ptzModalBackdrop').style.display = 'flex';
    };

    window.closeCamPTZDirect = function() {
        document.getElementById('ptzModalBackdrop').style.display = 'none';
    };

    window.closeCamPTZ = function(e) {
        if (e.target.id === 'ptzModalBackdrop') {
            closeCamPTZDirect();
        }
    };

    window.sendPTZCommand = function(cmd) {
        console.log('PTZ Command sent:', cmd);
    };

    window.toggleIRMode = function() {
        const btn = document.getElementById('btnIrToggle');
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="fa-solid fa-moon"></i> Auto IR ON';
            btn.style.background = '#1e293b';
        } else {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fa-solid fa-sun"></i> IR Filter OFF';
            btn.style.background = '#0284c7';
        }
    };

    window.triggerTestAlarm = function() {
        alert('⚠️ CCTV Alarm Broadcast Sent: Security & Control Room Notified.');
    };

    // Real-Time Live Clock Updater for All Cameras
    setInterval(() => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        const timeStr = `${y}-${m}-${d} ${hh}:${mm}:${ss}.${ms}`;

        document.querySelectorAll('.live-clock').forEach(el => {
            el.textContent = timeStr;
        });
        const pipTime = document.getElementById('pipTimestamp');
        if (pipTime) {
            if (activeGisCam && activeGisCam.status === 'offline') {
                pipTime.textContent = '[OFFLINE] NO RTSP STREAM';
                pipTime.style.color = '#ef4444';
            } else {
                pipTime.textContent = timeStr.slice(0, 19);
                pipTime.style.color = '#38bdf8';
            }
        }
    }, 1000);

    // ========================================================
    // Leaflet GIS Map & High-Resolution Satellite Surveillance
    // ========================================================
    let gisMapInstance = null;
    let cameraMarkersGroup = null;
    let checkpostMarkersGroup = null;
    let satTileLayer = null;
    let labelsTileLayer = null;
    let osmTileLayer = null;
    let activeGisCam = null;
    let gisPipZoomLevel = 1.0;
    let connectingTimeout = null;

    const MINE_SECTORS = {
        all: { name: 'Jharkhand Coalfield Overview', center: [23.85, 85.50], zoom: 9, gps: '±0.4m RTK Dual-Band', fleet: '2,279 Vehicles', telemetry: 'ALL SECTORS SECURE' },
        giridih: { name: 'Giridih Area (CO15)', center: [24.1840, 86.3021], zoom: 15, gps: '±0.18m RTK (19 Sats Locked)', fleet: '12 Active Haulers • 4 Shovels (CO15)', telemetry: 'SLOPE STABILITY: 99.4% • FASTPASS ON' },
        argada: { name: 'Argada Area (CO02)', center: [23.6702, 85.4520], zoom: 15, gps: '±0.31m Dual-Band RTK', fleet: '57 Heavy Vehicles • 6 Dozers (CO02)', telemetry: 'GIDDI ROAD WEIGHBRIDGE: NORMAL FLOW' },
        barka: { name: 'Barka Sayal Mine Complex (CO01)', center: [23.6934, 85.3450], zoom: 15, gps: '±0.22m High-Accuracy GNSS', fleet: '112 Heavy Dumpers (CO01)', telemetry: 'NEW BIRSA GATE: 0 QUEUE (FastPass)' },
        bokaro: { name: 'Bokaro & Kargali Basin (CO04)', center: [23.7920, 85.9840], zoom: 15, gps: '±0.26m Dual-Band RTK', fleet: '246 Rake Logistics (CO04)', telemetry: 'RAIL SIDING: RAKE LOADING ACTIVE' },
        dhori: { name: 'Dhori Area (CO12)', center: [23.7712, 85.9421], zoom: 15, gps: '±0.29m Dual-Band RTK', fleet: '136 Pit Vehicles (CO12)', telemetry: 'AAD OCM WEIGHBRIDGE: SYNCED' },
        hazaribagh: { name: 'Hazaribagh Area (CO10)', center: [23.9850, 85.3520], zoom: 15, gps: '±0.34m Dual-Band RTK', fleet: '193 Active Fleet (CO10)', telemetry: 'KBP FEEDER: 100% OPERATIONAL' },
        kathara: { name: 'Kathara Washery (CO05)', center: [23.7650, 85.8820], zoom: 15, gps: '±0.25m Dual-Band RTK', fleet: '86 Active Dumpers (CO05)', telemetry: 'WASHERY CONVEYOR: 3.4 m/s NOMINAL' },
        kuju: { name: 'Kuju Area (CO09)', center: [23.7210, 85.5120], zoom: 15, gps: '±0.38m Dual-Band RTK', fleet: '88 Active Vehicles (CO09)', telemetry: 'TOPA HAUL CORRIDOR: CLEAR' },
        magadh: { name: 'Magadh Open Cast Sector (CO06)', center: [23.8512, 85.1245], zoom: 15, gps: '±0.16m RTK (22 Sats Locked)', fleet: '732 Trippers • 28 Excavators (CO06)', telemetry: 'SEAM 04 FACE: HEAVY MACHINERY OK' },
        nk: { name: 'North Karanpura (CO03)', center: [23.7842, 85.3421], zoom: 15, gps: '±0.21m High-Precision RTK', fleet: '21 Heavy Dumpers • Bench Pit (CO03)', telemetry: 'PIT EXTRACTION: SPEED 19 KM/H' },
        piparwar: { name: 'Piparwar & Ashoka Basin (CO13)', center: [23.8430, 85.0430], zoom: 15, gps: '±0.23m Dual-Band RTK', fleet: '157 Active Dumpers (CO13)', telemetry: 'CHP WB 10: AUTO WEIGHMENT ON' },
        rajhara: { name: 'Rajhara Area (CO08)', center: [23.9120, 84.0210], zoom: 15, gps: '±0.45m Differential GPS', fleet: '23 Active Vehicles (CO08)', telemetry: 'MINING BOUNDARY GATE: LOCKED' },
        rajrappa: { name: 'Rajrappa Washery (CO11)', center: [23.6320, 85.7140], zoom: 15, gps: '±0.27m Dual-Band RTK', fleet: '30 Active Vehicles (CO11)', telemetry: 'WASHERY INBOUND WB: VERIFIED' },
        amrapali: { name: 'Amrapali & Chandragupta (CO07)', center: [23.8210, 85.2014], zoom: 15, gps: '±0.15m Dual-Band RTK (24 Sats)', fleet: '386 Haul Trucks • Shovel Grid 4 (CO07)', telemetry: 'CENTRAL INCLINE: 18 KM/H SPACING OK' }
    };

    const GIS_CAMERAS = [
        // Giridih Area (CO15)
        { 
            id: 'CAM-GIR-01', name: 'GIRIDIH CHECKPOST ENTRY (Camera 1)', area: 'Giridih', camNum: 'Camera 1', status: 'online', lat: 24.1845, lng: 86.3015, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.18m RTK (19 Sats Locked)', fleet: '12 Active Haulers (Giridih Gate)', telemetry: 'ANPR BARRIER: 0 QUEUE (Verified)', bitrate: '4.8 Mbps • Latency: 21ms'
        },
        { 
            id: 'CAM-GIR-02', name: 'GIRIDIH CHECKPOST ENTRY (Camera 2)', area: 'Giridih', camNum: 'Camera 2', status: 'online', lat: 24.1848, lng: 86.3018, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.19m RTK (18 Sats Locked)', fleet: '14 Active Haulers (Giridih Lane 2)', telemetry: 'ANPR RECOGNITION: 99.8% OK', bitrate: '4.6 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-GIR-03', name: 'GIRIDIH CHECKPOST EXIT (Camera 1)', area: 'Giridih', camNum: 'Camera 1', status: 'online', lat: 24.1835, lng: 86.3025, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.21m RTK (17 Sats Locked)', fleet: '8 Outbound Trippers', telemetry: 'RFID SCAN: SYNCED (FastPass)', bitrate: '5.1 Mbps • Latency: 19ms'
        },
        { 
            id: 'CAM-GIR-04', name: 'GIRIDIH : GIRIDIH CHECKPOST EXIT (Camera 2)', area: 'Giridih', camNum: 'Camera 2', status: 'online', lat: 24.1838, lng: 86.3028, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.22m RTK (17 Sats Locked)', fleet: '9 Outbound Trippers (Weigh Line)', telemetry: 'OVERBURDEN CLEARANCE: 100%', bitrate: '4.9 Mbps • Latency: 20ms'
        },
        { 
            id: 'CAM-GIR-05', name: 'Road WB no 2 NEAR CP (RD1502) (Camera 1)', area: 'Giridih', camNum: 'Camera 1', status: 'offline', lat: 24.1820, lng: 86.2990, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.45m Differential GPS (Sensor Offline)', fleet: '0 Vehicles in Queue (Offline)', telemetry: 'MAINTENANCE MODE: CALIBRATION IN PROGRESS', bitrate: '0.0 Mbps (Cached Frame)'
        },
        { 
            id: 'CAM-GIR-06', name: 'Road WB no 2 NEAR CP (RD1502) (Camera 2)', area: 'Giridih', camNum: 'Camera 2', status: 'offline', lat: 24.1822, lng: 86.2995, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.44m Differential GPS (Sensor Offline)', fleet: '0 Vehicles in Queue (Offline)', telemetry: 'MAINTENANCE MODE: CABIN POWER CYCLE', bitrate: '0.0 Mbps (Cached Frame)'
        },
        { 
            id: 'CAM-GIR-07', name: 'Kabribad Road WB No 3 (RD1503) (Camera 1)', area: 'Giridih', camNum: 'Camera 1', status: 'online', lat: 24.1860, lng: 86.3060, still: '/static/media_screenshots/SS-7.png',
            gps: '±0.16m RTK Dual-Band', fleet: '16 Heavy Dumpers (RD1503 Queue)', telemetry: 'SLOPE MONITOR: 99.2% BERM STABLE', bitrate: '5.4 Mbps • Latency: 18ms'
        },
        { 
            id: 'CAM-GIR-08', name: 'Kabribad Road WB No 3 (RD1503) (Camera 2)', area: 'Giridih', camNum: 'Camera 2', status: 'online', lat: 24.1865, lng: 86.3065, still: '/static/media_screenshots/SS-8.png',
            gps: '±0.17m RTK Dual-Band', fleet: '14 Heavy Dumpers (RD1503 Platform)', telemetry: 'PERSONNEL PPE: 100% COMPLIANT', bitrate: '5.2 Mbps • Latency: 19ms'
        },
        { 
            id: 'CAM-GIR-09', name: 'Giridih ICCC Control Room (Camera 9)', area: 'Giridih', camNum: 'Camera 9', status: 'online', lat: 24.1852, lng: 86.3032, still: '/static/media_screenshots/SS-1.png',
            gps: '±0.12m RTK Fixed Base Station', fleet: 'Command Control Center (All Feeds Live)', telemetry: 'ICCC TELEMETRY: 100% OPERATIONAL', bitrate: '6.2 Mbps • Latency: 14ms'
        },

        // Argada Area (CO02)
        { 
            id: 'CAM-ARG-01', name: 'ARGADA : Giddi Road WB (RD0401)', area: 'Argada', camNum: 'Camera 1', status: 'online', lat: 23.6702, lng: 85.4520, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.24m RTK Dual-Band', fleet: '57 Active Fleet (Giddi Corridor)', telemetry: 'WEIGHMENT SCALE: 59.84 T NOMINAL', bitrate: '4.7 Mbps • Latency: 25ms'
        },
        { 
            id: 'CAM-ARG-02', name: 'ARGADA : Giddi Sector Checkpost Entry', area: 'Argada', camNum: 'Camera 2', status: 'online', lat: 23.6710, lng: 85.4530, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.25m RTK Dual-Band', fleet: '18 Trucks (Argada North Route)', telemetry: 'BOOM BARRIER: FASTPASS ACTIVE', bitrate: '4.8 Mbps • Latency: 24ms'
        },
        { 
            id: 'CAM-ARG-03', name: 'Religara WB 60 MT (RD0402)', area: 'Argada', camNum: 'Camera 1', status: 'online', lat: 23.6680, lng: 85.4490, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.28m RTK Dual-Band', fleet: '12 Active Dumpers (Religara Pit)', telemetry: 'COAL STOCKYARD: GRID 2 NOMINAL', bitrate: '4.5 Mbps • Latency: 27ms'
        },
        { 
            id: 'CAM-ARG-04', name: 'Sirka 50 MT Road WB (RD0403)', area: 'Argada', camNum: 'Camera 1', status: 'offline', lat: 23.6730, lng: 85.4580, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.48m Differential GPS (Offline)', fleet: '0 Vehicles Active (Sirka)', telemetry: 'CALIBRATION SCHEDULED (Offline)', bitrate: '0.0 Mbps (Offline)'
        },

        // Barka Sayal Mine Complex (CO01)
        { 
            id: 'CAM-BS-01', name: 'Saunda B 60 MT WB (RD0305)', area: 'Barka Sayal', camNum: 'Camera 1', status: 'online', lat: 23.6934, lng: 85.3450, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.20m RTK Dual-Band', fleet: '112 Active Vehicles (Saunda B Pit)', telemetry: 'HAULAGE FLOW: 22 TRIPS/HR (Nominal)', bitrate: '5.0 Mbps • Latency: 22ms'
        },
        { 
            id: 'CAM-BS-02', name: 'New Birsa Checkpost Entry (CP0111)', area: 'Barka Sayal', camNum: 'Camera 1', status: 'online', lat: 23.6950, lng: 85.3470, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.21m RTK Dual-Band', fleet: '32 Inbound Dumpers', telemetry: 'CHECKPOST GATE: 0 QUEUE (FastPass)', bitrate: '4.8 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-BS-03', name: 'Urimari Hesabeda Road WB (RD0302)', area: 'Barka Sayal', camNum: 'Camera 1', status: 'online', lat: 23.6910, lng: 85.3420, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.23m RTK Dual-Band', fleet: '24 Mining Dumpers (Urimari Route)', telemetry: 'ANPR OVERBURDEN: 100% MATCH', bitrate: '4.6 Mbps • Latency: 25ms'
        },
        { 
            id: 'CAM-BS-04', name: 'Sayal D 100MT WB (RD0311)', area: 'Barka Sayal', camNum: 'Camera 1', status: 'online', lat: 23.6960, lng: 85.3500, still: '/static/media_screenshots/SS-1.png',
            gps: '±0.19m RTK (19 Sats)', fleet: '42 Heavy Haulers (Sayal D Face)', telemetry: 'BENCH STABILITY: 99.3% SAFE', bitrate: '5.3 Mbps • Latency: 19ms'
        },

        // Bokaro & Kargali (CO04)
        { 
            id: 'CAM-BK-01', name: 'Bokaro Rail Loading Terminal', area: 'Bokaro', camNum: 'Camera 1', status: 'online', lat: 23.7920, lng: 85.9840, still: '/static/media_screenshots/SS-9.png',
            gps: '±0.22m RTK (18 Sats Locked)', fleet: '246 Logistics Units (Rake Track 2)', telemetry: 'RAKE DISPATCH: 58 WAGONS LOADED', bitrate: '5.5 Mbps • Latency: 18ms'
        },
        { 
            id: 'CAM-BK-02', name: 'Bokaro West Exit Sump Gate', area: 'Bokaro', camNum: 'Camera 1', status: 'online', lat: 23.7965, lng: 85.9890, still: '/static/media_screenshots/SS-10.png',
            gps: '±0.24m RTK Dual-Band', fleet: '48 Perimeter Vehicles', telemetry: 'SUMP PUMP: LEVEL 1.2m (Normal Drainage)', bitrate: '4.7 Mbps • Latency: 24ms'
        },
        { 
            id: 'CAM-BK-03', name: 'Karo Checkpost Entry (CP0411)', area: 'Bokaro', camNum: 'Camera 1', status: 'online', lat: 23.7940, lng: 85.9860, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.20m RTK Dual-Band', fleet: '62 Inbound Trucks', telemetry: 'ANPR SECURITY: ALL PASSES CLEARED', bitrate: '4.9 Mbps • Latency: 22ms'
        },

        // Dhori (CO12)
        { 
            id: 'CAM-DH-01', name: 'Dhori SD OC Mine Haul Road (RD1603)', area: 'Dhori', camNum: 'Camera 1', status: 'online', lat: 23.7712, lng: 85.9421, still: '/static/media_screenshots/SS-3.png',
            gps: '±0.25m RTK Dual-Band', fleet: '136 Active Vehicles (SD OC Mine)', telemetry: 'HAUL SPEED: 19.1 KM/H (Normal)', bitrate: '5.1 Mbps • Latency: 20ms'
        },
        { 
            id: 'CAM-DH-02', name: 'Dhori Central Checkpost Exit', area: 'Dhori', camNum: 'Camera 1', status: 'online', lat: 23.7730, lng: 85.9450, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.23m RTK Dual-Band', fleet: '28 Outbound Trucks', telemetry: 'GATE ANPR: SYNCED (0 Breaches)', bitrate: '4.8 Mbps • Latency: 22ms'
        },
        { 
            id: 'CAM-DH-03', name: 'AAD OCM Weighbridge (RD1610)', area: 'Dhori', camNum: 'Camera 1', status: 'online', lat: 23.7690, lng: 85.9390, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.26m RTK Dual-Band', fleet: '18 Dumpers on Scale', telemetry: 'CALIBRATION: ±0.02% ACCURACY', bitrate: '4.6 Mbps • Latency: 25ms'
        },

        // Hazaribagh (CO10)
        { 
            id: 'CAM-HZ-01', name: 'Kedla Washery Feeder Plant', area: 'Hazaribagh', camNum: 'Camera 1', status: 'online', lat: 23.9850, lng: 85.3520, still: '/static/media_screenshots/SS-8.png',
            gps: '±0.34m Dual-Band RTK', fleet: '193 Active Fleet (KBP Feeder)', telemetry: 'KBP FEEDER: 100% OPERATIONAL', bitrate: '5.2 Mbps • Latency: 20ms'
        },
        { 
            id: 'CAM-HZ-02', name: 'Tapin South Quarry Face', area: 'Hazaribagh', camNum: 'Camera 2', status: 'online', lat: 23.9880, lng: 85.3560, still: '/static/media_screenshots/SS-5.png',
            gps: '±0.31m RTK (18 Sats Locked)', fleet: '44 Coal Dumpers (Tapin South Face)', telemetry: 'GEO-FENCE: 100% ON-ROUTE (0 Breaches)', bitrate: '4.9 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-HZ-03', name: 'Parej East Road WB (RD1004)', area: 'Hazaribagh', camNum: 'Camera 1', status: 'online', lat: 23.9820, lng: 85.3480, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.29m RTK Dual-Band', fleet: '26 Trucks in Transit (Parej East)', telemetry: 'HAULAGE VELOCITY: 21.4 KM/H (Normal)', bitrate: '4.7 Mbps • Latency: 24ms'
        },

        // Kathara Washery (CO05)
        { 
            id: 'CAM-KT-01', name: 'Kathara Washery Central Siding', area: 'Kathara', camNum: 'Camera 1', status: 'online', lat: 23.7650, lng: 85.8820, still: '/static/media_screenshots/SS-7.png',
            gps: '±0.25m Dual-Band RTK', fleet: '86 Active Dumpers (Kathara Pit)', telemetry: 'WASHERY CONVEYOR: 3.4 m/s NOMINAL', bitrate: '5.0 Mbps • Latency: 21ms'
        },
        { 
            id: 'CAM-KT-02', name: 'Jarangdih OC Coal Extraction', area: 'Kathara', camNum: 'Camera 1', status: 'online', lat: 23.7680, lng: 85.8860, still: '/static/media_screenshots/SS-3.png',
            gps: '±0.22m RTK (20 Sats Locked)', fleet: '34 Heavy Haulers (Jarangdih OC)', telemetry: 'WASHERY INFEED: 1,450 T/HR SYNC', bitrate: '5.3 Mbps • Latency: 19ms'
        },
        { 
            id: 'CAM-KT-03', name: 'Govindpur Road WB No 2 (RD0502)', area: 'Kathara', camNum: 'Camera 1', status: 'online', lat: 23.7620, lng: 85.8780, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.27m RTK Dual-Band', fleet: '18 Trucks (Kathara Siding Gate)', telemetry: 'RAKE HOPPER: ACTIVE LOADING', bitrate: '4.8 Mbps • Latency: 22ms'
        },

        // Kuju Area (CO09)
        { 
            id: 'CAM-KJ-01', name: 'Topa Open Cast Extraction Bench', area: 'Kuju', camNum: 'Camera 1', status: 'online', lat: 23.7210, lng: 85.5120, still: '/static/media_screenshots/SS-1.png',
            gps: '±0.38m Dual-Band RTK', fleet: '88 Active Vehicles (Topa Face)', telemetry: 'TOPA HAUL CORRIDOR: CLEAR', bitrate: '5.1 Mbps • Latency: 20ms'
        },
        { 
            id: 'CAM-KJ-02', name: 'Pindra OC Main Haul Barrier', area: 'Kuju', camNum: 'Camera 1', status: 'online', lat: 23.7240, lng: 85.5160, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.32m RTK (17 Sats)', fleet: '31 Dumpers (Pindra OC Route)', telemetry: 'RFID SCAN: PASS RATE 100%', bitrate: '4.7 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-KJ-03', name: 'Sarubera 50 MT WB (RD0901)', area: 'Kuju', camNum: 'Camera 1', status: 'online', lat: 23.7180, lng: 85.5080, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.30m RTK Dual-Band', fleet: '24 Heavy Haulers (Sarubera WB)', telemetry: 'WEIGHBRIDGE AUTO-CALIB: PASSED', bitrate: '4.9 Mbps • Latency: 22ms'
        },

        // Magadh & Sanghmitra (CO06)
        { 
            id: 'CAM-MG-01', name: 'Magadh Coal Seam 04 Face', area: 'Magadh', camNum: 'Camera 1', status: 'online', lat: 23.8512, lng: 85.1245, still: '/static/media_screenshots/SS-5.png',
            gps: '±0.15m RTK (22 Sats Locked)', fleet: '732 Active Trippers • 28 Shovels', telemetry: 'SEAM 04 EXTRACTION: 41,980 T/DAY', bitrate: '5.8 Mbps • Latency: 16ms'
        },
        { 
            id: 'CAM-MG-02', name: 'Magadh Outer Haul Road Junction', area: 'Magadh', camNum: 'Camera 1', status: 'online', lat: 23.8560, lng: 85.1290, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.17m RTK Dual-Band', fleet: '142 Haulage Trucks/Hour (Junction)', telemetry: 'GEO-FENCE: 100% ON-ROUTE (0 Offarea)', bitrate: '5.2 Mbps • Latency: 19ms'
        },
        { 
            id: 'CAM-MG-03', name: 'Magadh Checkpost 1 (CP0651)', area: 'Magadh', camNum: 'Camera 1', status: 'online', lat: 23.8490, lng: 85.1200, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.18m RTK Dual-Band', fleet: '88 Inbound Vehicles (Magadh CP1)', telemetry: 'FASTPASS RFID: ACTIVE (100% Rate)', bitrate: '5.0 Mbps • Latency: 21ms'
        },

        // North Karanpura (CO03)
        { 
            id: 'CAM-NK-01', name: 'NK Mines Pit Extraction', area: 'North Karanpura', camNum: 'Camera 1', status: 'online', lat: 23.7842, lng: 85.3421, still: '/static/media_screenshots/SS-1.png',
            gps: '±0.18m RTK (20 Sats Locked)', fleet: '21 Heavy Pit Dumpers (Bench 4)', telemetry: 'BENCH CLEARANCE: 98.4% (Safe)', bitrate: '5.3 Mbps • Latency: 19ms'
        },
        { 
            id: 'CAM-NK-02', name: 'NK Mines Stockpile Platform', area: 'North Karanpura', camNum: 'Camera 2', status: 'online', lat: 23.7850, lng: 85.3435, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.19m RTK (20 Sats Locked)', fleet: '18 Stockpile Haulers (NK Mines)', telemetry: 'PERIMETER SENSORS: 99.1% SAFE', bitrate: '5.0 Mbps • Latency: 21ms'
        },
        { 
            id: 'CAM-NK-03', name: 'Dakra WB No 1 (RD0608)', area: 'North Karanpura', camNum: 'Camera 1', status: 'online', lat: 23.7820, lng: 85.3390, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.23m RTK Dual-Band', fleet: '14 Active Dumpers (Dakra WB 1)', telemetry: 'RFID FASTPASS: VERIFIED', bitrate: '4.8 Mbps • Latency: 22ms'
        },

        // Piparwar & Ashoka (CO13)
        { 
            id: 'CAM-PIP-01', name: 'Piparwar Ashoka OC Coal Handling', area: 'Piparwar', camNum: 'Camera 1', status: 'online', lat: 23.8430, lng: 85.0430, still: '/static/media_screenshots/SS-3.png',
            gps: '±0.21m RTK Dual-Band', fleet: '157 Dumpers (Ashoka OC Basin)', telemetry: 'CONVEYOR FEED: 4.1 m/s (Highflow)', bitrate: '5.4 Mbps • Latency: 18ms'
        },
        { 
            id: 'CAM-PIP-02', name: 'CHP WB 10 (RD0101)', area: 'Piparwar', camNum: 'Camera 1', status: 'online', lat: 23.8450, lng: 85.0460, still: '/static/media_screenshots/SS-2.png',
            gps: '±0.22m RTK Dual-Band', fleet: '22 Trucks on Siding Scale (CHP 10)', telemetry: 'AUTOMATED WEIGHMENT: ONLINE', bitrate: '4.7 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-PIP-03', name: 'Bachra Railway Dispatch Gate', area: 'Piparwar', camNum: 'Camera 1', status: 'online', lat: 23.8410, lng: 85.0390, still: '/static/media_screenshots/SS-9.png',
            gps: '±0.20m RTK (19 Sats)', fleet: '44 Rail Shunt Trucks (Bachra Gate)', telemetry: 'RAKE LOGISTICS: 48,200 T DISPATCHED', bitrate: '5.1 Mbps • Latency: 20ms'
        },

        // Rajhara Area (CO08)
        { 
            id: 'CAM-RJ-01', name: 'Rajhara Border Entry Checkpost', area: 'Rajhara', camNum: 'Camera 1', status: 'online', lat: 23.9120, lng: 84.0210, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.45m Differential GPS', fleet: '23 Active Vehicles (Rajhara Border)', telemetry: 'MINING BOUNDARY GATE: LOCKED', bitrate: '4.4 Mbps • Latency: 28ms'
        },
        { 
            id: 'CAM-RJ-02', name: 'Tetariakhar OC Haul Corridor', area: 'Rajhara', camNum: 'Camera 1', status: 'online', lat: 23.9150, lng: 84.0250, still: '/static/media_screenshots/SS-3.png',
            gps: '±0.41m Multi-GNSS (16 Sats)', fleet: '11 Coal Haulers (Tetariakhar OC)', telemetry: 'ANPR ENTRY: 100% VERIFIED', bitrate: '4.6 Mbps • Latency: 26ms'
        },

        // Rajrappa Area (CO11)
        { 
            id: 'CAM-RR-01', name: 'Rajrappa Washery Inbound Siding', area: 'Rajrappa', camNum: 'Camera 1', status: 'online', lat: 23.6320, lng: 85.7140, still: '/static/media_screenshots/SS-7.png',
            gps: '±0.27m Dual-Band RTK', fleet: '30 Active Vehicles (Rajrappa Washery)', telemetry: 'WASHERY INBOUND WB: VERIFIED', bitrate: '4.9 Mbps • Latency: 23ms'
        },
        { 
            id: 'CAM-RR-02', name: 'Rajrappa OC Dam Perimeter', area: 'Rajrappa', camNum: 'Camera 1', status: 'online', lat: 23.6350, lng: 85.7180, still: '/static/media_screenshots/SS-10.png',
            gps: '±0.25m RTK (19 Sats Locked)', fleet: '22 Heavy Trippers (Rajrappa OC)', telemetry: 'RIVER DAM PERIMETER: SECURE', bitrate: '4.8 Mbps • Latency: 24ms'
        },

        // Amrapali & Chandragupta (CO07)
        { 
            id: 'CAM-AMR-01', name: 'Amrapali North Highwall & Shovel', area: 'Amrapali', camNum: 'Camera 1', status: 'online', lat: 23.8210, lng: 85.2014, still: '/static/media_screenshots/SS-3.png',
            gps: '±0.14m Dual-Band RTK (24 Sats)', fleet: '386 Haul Trucks • Shovel Grid 4', telemetry: 'HIGHWALL STRATA: STABLE (0 Shift)', bitrate: '5.9 Mbps • Latency: 15ms'
        },
        { 
            id: 'CAM-AMR-02', name: 'Amrapali Central Incline Corridor', area: 'Amrapali', camNum: 'Camera 1', status: 'online', lat: 23.8245, lng: 85.2050, still: '/static/media_screenshots/SS-4.png',
            gps: '±0.16m Dual-Band RTK', fleet: '128 Haul Trucks in Transit (Incline)', telemetry: 'HAUL SPEED: 18.2 KM/H (Optimal)', bitrate: '5.4 Mbps • Latency: 18ms'
        },
        { 
            id: 'CAM-AMR-03', name: 'Tandwa Dispatch Gate ANPR', area: 'Amrapali', camNum: 'Camera 1', status: 'online', lat: 23.8190, lng: 85.1980, still: '/static/media_screenshots/SS-6.png',
            gps: '±0.15m RTK Dual-Band', fleet: '94 Outbound Coal Haulers (Tandwa Gate)', telemetry: 'ANPR SECURITY: 100% VERIFIED', bitrate: '5.6 Mbps • Latency: 17ms'
        }
    ];

    const GIS_CHECKPOSTS = [
        { id: 'CP-GIR-01', name: 'Giridih Main Security Gate 1', area: 'Giridih', lat: 24.1830, lng: 86.3010, status: 'Online / ANPR Verified', gps: '±0.18m RTK (19 Sats)', fleet: '12 Haulers (Giridih CP01)', telemetry: 'BOOM BARRIER: FASTPASS ACTIVE' },
        { id: 'CP-ARG-01', name: 'Argada Giddi North Barrier', area: 'Argada', lat: 23.6705, lng: 85.4525, status: 'Online / FastPass Active', gps: '±0.25m RTK Dual-Band', fleet: '57 Vehicles (Argada Gate)', telemetry: 'BOOM BARRIER: AUTOMATED SYNC' },
        { id: 'CP-BS-01', name: 'New Birsa Checkpost Entry Gate', area: 'Barka Sayal', lat: 23.6948, lng: 85.3468, status: 'Online / 0 Queue', gps: '±0.20m High-Precision RTK', fleet: '112 Dumpers (Barka Sayal)', telemetry: '0 QUEUE • HIGH SPEED PASS' },
        { id: 'CP-BK-01', name: 'Bokaro Siding Outbound Checkpost', area: 'Bokaro', lat: 23.7935, lng: 85.9855, status: 'Online / High Clearance', gps: '±0.22m RTK (18 Sats)', fleet: '246 Logistics Units', telemetry: 'RAKE LOGISTICS: CLEAR' },
        { id: 'CP-DH-01', name: 'Dhori SD OC Mine Main Checkpost', area: 'Dhori', lat: 23.7725, lng: 85.9445, status: 'Online / RFID Active', gps: '±0.23m RTK Dual-Band', fleet: '136 Vehicles (Dhori CP)', telemetry: 'RFID VERIFIED: 100%' },
        { id: 'CP-HZ-01', name: 'Kedla Washery Inbound Barrier', area: 'Hazaribagh', lat: 23.9840, lng: 85.3510, status: 'Online / FastPass Active', gps: '±0.32m Dual-Band RTK', fleet: '193 Fleet (Hazaribagh CP)', telemetry: 'KBP BARRIER: 0 QUEUE' },
        { id: 'CP-KT-01', name: 'Kathara Central Siding Gate', area: 'Kathara', lat: 23.7640, lng: 85.8810, status: 'Online / ANPR Verified', gps: '±0.24m RTK Dual-Band', fleet: '86 Dumpers (Kathara Gate)', telemetry: 'ANPR SECURITY: SYNCED' },
        { id: 'CP-KJ-01', name: 'Topa Haul Main Security Gate', area: 'Kuju', lat: 23.7200, lng: 85.5110, status: 'Online / RFID Active', gps: '±0.35m Dual-Band RTK', fleet: '88 Vehicles (Kuju Sector)', telemetry: 'RFID SCAN: PASS RATE 100%' },
        { id: 'CP-MG-01', name: 'Magadh Outbound Haul Gate CP0651', area: 'Magadh', lat: 23.8555, lng: 85.1285, status: 'Online / ANPR Verified', gps: '±0.16m RTK (22 Sats)', fleet: '732 Trippers (Magadh CP)', telemetry: 'ANPR SECURITY: SYNCED' },
        { id: 'CP-NK-01', name: 'NK Mines Western Haul Checkpost', area: 'North Karanpura', lat: 23.7845, lng: 85.3425, status: 'Online / 1 Truck Queue', gps: '±0.18m RTK (20 Sats)', fleet: '21 Pit Dumpers (NK)', telemetry: 'WEIGHT TICKET: VERIFIED' },
        { id: 'CP-PIP-01', name: 'Piparwar CHP Security Checkpost', area: 'Piparwar', lat: 23.8445, lng: 85.0455, status: 'Online / Gate Verified', gps: '±0.21m RTK Dual-Band', fleet: '157 Active Dumpers', telemetry: 'CHP GATE: FASTPASS ACTIVE' },
        { id: 'CP-RJ-01', name: 'Rajhara Border Security Barrier', area: 'Rajhara', lat: 23.9110, lng: 84.0200, status: 'Online / Boundary Lock', gps: '±0.44m Differential GPS', fleet: '23 Vehicles (Rajhara Gate)', telemetry: 'BOUNDARY GATE: SECURE' },
        { id: 'CP-RR-01', name: 'Rajrappa Siding Outbound Gate', area: 'Rajrappa', lat: 23.6310, lng: 85.7130, status: 'Online / ANPR Verified', gps: '±0.26m Dual-Band RTK', fleet: '30 Trucks (Rajrappa Gate)', telemetry: 'SIDING SCALE: ONLINE' },
        { id: 'CP-AMR-01', name: 'Amrapali Tandwa FastPass Inbound', area: 'Amrapali', lat: 23.8205, lng: 85.2005, status: 'Online / High Speed ANPR', gps: '±0.14m RTK (24 Sats)', fleet: '386 Haul Trucks (Tandwa)', telemetry: 'HIGH SPEED ANPR: ACTIVE' }
    ];

    // Dynamic HUD updater with subtle visual pulse
    let hudPulseTimer = null;
    function updateGisMapHud(gpsText, fleetText, telemetryText) {
        const hudGps = document.getElementById('hudGpsPrecision');
        const hudFleet = document.getElementById('hudActiveFleet');
        const hudGeo = document.getElementById('hudGeoFence');
        const overlay = document.getElementById('gisMapHudOverlay');

        if (hudGps && gpsText) {
            hudGps.textContent = gpsText;
        }
        if (hudFleet && fleetText) {
            hudFleet.textContent = fleetText;
        }
        if (hudGeo && telemetryText) {
            hudGeo.textContent = telemetryText;
        }

        // Trigger dynamic glowing animation on update
        if (overlay) {
            overlay.classList.add('hud-updated');
            if (hudPulseTimer) clearTimeout(hudPulseTimer);
            hudPulseTimer = setTimeout(() => {
                overlay.classList.remove('hud-updated');
            }, 600);
        }
    }

    window.initGisLeafletMap = function() {
        const container = document.getElementById('gisLeafletMap');
        if (!container || typeof L === 'undefined') return;

        if (!gisMapInstance) {
            // Initialize Leaflet map over Jharkhand Mining Belt
            gisMapInstance = L.map('gisLeafletMap', {
                center: [23.85, 85.50],
                zoom: 9,
                zoomControl: false,
                attributionControl: false
            });

            L.control.zoom({ position: 'topleft' }).addTo(gisMapInstance);

            // 1. High-Resolution Esri World Imagery Satellite Tiles (Real-world aerial terrain)
            satTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '&copy; Esri, Maxar, Earthstar Geographics',
                maxZoom: 19
            }).addTo(gisMapInstance);

            // 2. Esri World Boundaries and Places (Labels Overlay)
            labelsTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 19
            }).addTo(gisMapInstance);

            // 3. OpenStreetMap fallback
            osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19
            });

            cameraMarkersGroup = L.layerGroup().addTo(gisMapInstance);
            checkpostMarkersGroup = L.layerGroup().addTo(gisMapInstance);

            renderGisMapFeatures();
            renderGisCamSidebarList(GIS_CAMERAS);

            // Invalidate size on load to ensure full viewport rendering
            setTimeout(() => {
                if (gisMapInstance) gisMapInstance.invalidateSize();
            }, 250);
        } else {
            gisMapInstance.invalidateSize();
        }
    };

    function renderGisMapFeatures() {
        if (!gisMapInstance) return;

        cameraMarkersGroup.clearLayers();
        checkpostMarkersGroup.clearLayers();

        // Add Camera Markers (Screenshot 2 style: circular white pin with green/red camera icon)
        GIS_CAMERAS.forEach(cam => {
            const isOnline = cam.status === 'online';
            const iconHtml = `
                <div class="leaflet-gis-cam-pin ${isOnline ? 'online' : 'offline'}" id="pin-${cam.id}" title="${cam.name}">
                    <i class="fa-solid fa-camera"></i>
                </div>
            `;
            const camIcon = L.divIcon({
                className: 'custom-gis-leaflet-icon',
                html: iconHtml,
                iconSize: [34, 34],
                iconAnchor: [17, 17]
            });

            const marker = L.marker([cam.lat, cam.lng], { icon: camIcon }).addTo(cameraMarkersGroup);
            
            // Tooltip label on hover
            marker.bindTooltip(`<strong>${cam.name}</strong><br><span style="color:${isOnline ? '#22c55e' : '#ef4444'}; font-size:10px;">● ${cam.area} (${isOnline ? 'Live Online' : 'Offline / Maintenance'})</span>`, {
                className: 'leaflet-gis-cam-label',
                direction: 'top',
                offset: [0, -18]
            });

            // Update HUD on mouseover preview
            marker.on('mouseover', () => {
                updateGisMapHud(cam.gps, cam.fleet, cam.telemetry);
            });

            // Open camera stream on click
            marker.on('click', () => {
                openGisPipCamera(cam);
            });
        });

        // Add Checkpost Markers
        GIS_CHECKPOSTS.forEach(cp => {
            const cpIcon = L.divIcon({
                className: 'custom-leaflet-cp-icon',
                html: `<div style="width:28px; height:28px; background:#0284c7; border:2px solid #ffffff; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:0 3px 10px rgba(2,132,199,0.7); cursor:pointer;">
                        <i class="fa-solid fa-shield-cat" style="font-size:12px;"></i>
                       </div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });

            const marker = L.marker([cp.lat, cp.lng], { icon: cpIcon }).addTo(checkpostMarkersGroup);
            marker.bindTooltip(`<strong>${cp.id} - ${cp.name}</strong><br><span style="color:#38bdf8; font-size:10px;">● ${cp.status}</span>`, {
                className: 'leaflet-gis-cam-label',
                direction: 'top',
                offset: [0, -14]
            });

            marker.on('mouseover', () => {
                updateGisMapHud(cp.gps, cp.fleet, cp.telemetry);
            });

            marker.on('click', () => {
                updateGisMapHud(cp.gps, cp.fleet, cp.telemetry);
                if (gisMapInstance) {
                    gisMapInstance.flyTo([cp.lat, cp.lng], Math.max(gisMapInstance.getZoom(), 16), { duration: 1.0 });
                }
                marker.openTooltip();
            });
        });
    }

    // Render left camera list in sidebar (matching Screenshot 2)
    function renderGisCamSidebarList(cameras) {
        const listEl = document.getElementById('gisCamSidebarList');
        const badgeEl = document.getElementById('gisCamCountBadge');
        if (!listEl) return;

        if (badgeEl) badgeEl.textContent = cameras.length;

        if (cameras.length === 0) {
            listEl.innerHTML = `<div style="padding: 24px 16px; text-align: center; color: #64748b; font-size: 12px;">No cameras match your search filter.</div>`;
            return;
        }

        listEl.innerHTML = cameras.map(cam => {
            const isOnline = cam.status === 'online';
            const isActive = activeGisCam && activeGisCam.id === cam.id ? 'active' : '';
            return `
                <div class="gis-cam-card-item ${isActive}" id="cam-item-${cam.id}" onclick="selectGisCamFromSidebar('${cam.id}')" onmouseenter="previewGisCamTelemetry('${cam.id}')">
                    <div class="gis-cam-card-icon ${isOnline ? 'online' : 'offline'}">
                        <i class="fa-solid fa-camera"></i>
                    </div>
                    <div class="gis-cam-card-details">
                        <div class="gis-cam-card-title" title="${cam.name}">${cam.name}</div>
                        <div class="gis-cam-card-sub">
                            <span>Area : ${cam.area}</span>
                            <span>•</span>
                            <span>${cam.camNum || 'Camera 1'}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.previewGisCamTelemetry = function(camId) {
        const cam = GIS_CAMERAS.find(c => c.id === camId);
        if (cam) {
            updateGisMapHud(cam.gps, cam.fleet, cam.telemetry);
        }
    };

    window.filterGisCamSidebar = function() {
        const searchVal = (document.getElementById('gisCamSearchInput')?.value || '').trim().toLowerCase();
        const areaVal = document.getElementById('gisCamAreaFilter')?.value || 'all';

        const filtered = GIS_CAMERAS.filter(cam => {
            const matchesSearch = !searchVal || cam.name.toLowerCase().includes(searchVal) || cam.area.toLowerCase().includes(searchVal) || cam.id.toLowerCase().includes(searchVal);
            const matchesArea = areaVal === 'all' || cam.area.toLowerCase() === areaVal.toLowerCase();
            return matchesSearch && matchesArea;
        });

        renderGisCamSidebarList(filtered);
    };

    window.selectGisCamFromSidebar = function(camId) {
        const cam = GIS_CAMERAS.find(c => c.id === camId);
        if (cam) {
            openGisPipCamera(cam);
        }
    };

    // Open Floating Live Camera Window with authentic simulated connection delay & dynamic telemetry
    window.openGisPipCamera = function(cam) {
        activeGisCam = cam;
        const isOnline = cam.status === 'online';
        const pipBox = document.getElementById('gisPipCameraBox');
        if (!pipBox) return;

        // 1. Update HUD with this specific camera's real telemetry
        updateGisMapHud(cam.gps, cam.fleet, cam.telemetry);

        // 2. Highlight camera in sidebar list
        document.querySelectorAll('.gis-cam-card-item').forEach(item => item.classList.remove('active'));
        const activeItem = document.getElementById(`cam-item-${cam.id}`);
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // 3. Highlight map pin
        document.querySelectorAll('.leaflet-gis-cam-pin').forEach(pin => pin.classList.remove('active-pin'));
        const activePin = document.getElementById(`pin-${cam.id}`);
        if (activePin) activePin.classList.add('active-pin');

        // 4. Smooth flyTo map position
        if (gisMapInstance) {
            gisMapInstance.flyTo([cam.lat, cam.lng], Math.max(gisMapInstance.getZoom(), 16), { duration: 1.2 });
        }

        // 5. Open PiP box and configure UI based on Online vs Offline status
        pipBox.style.display = 'block';
        
        // Header Icon & Title
        const camIcon = document.getElementById('pipCamIcon');
        const camTitle = document.getElementById('pipCamTitle');
        if (camIcon) {
            camIcon.className = isOnline ? 'fa-solid fa-video' : 'fa-solid fa-video-slash';
            camIcon.style.color = isOnline ? '#10b981' : '#ef4444';
        }
        if (camTitle) {
            camTitle.textContent = cam.name + (isOnline ? '' : ' [OFFLINE]');
        }

        // Live vs Offline Badge
        const pipBadge = document.getElementById('pipBadgeLive');
        if (pipBadge) {
            if (isOnline) {
                pipBadge.className = 'pip-badge-live';
                pipBadge.innerHTML = '<span class="live-dot"></span> Live';
            } else {
                pipBadge.className = 'pip-badge-live offline';
                pipBadge.innerHTML = '<span class="live-dot"></span> Offline';
            }
        }

        // Footer Meta Info & FPS Badge
        const pipMeta = document.getElementById('pipMetaInfo');
        const fpsBadge = document.getElementById('pipFpsBadge');
        if (pipMeta) {
            pipMeta.textContent = `Lat: ${cam.lat.toFixed(4)}° N, Lon: ${cam.lng.toFixed(4)}° E • ${cam.bitrate || (isOnline ? 'Bitrate: 4.8 Mbps' : '0.0 Mbps (Offline)')}`;
        }
        if (fpsBadge) {
            if (isOnline) {
                fpsBadge.style.color = '#10b981';
                fpsBadge.textContent = '● 60 FPS H.265';
            } else {
                fpsBadge.style.color = '#ef4444';
                fpsBadge.textContent = '● 0 FPS • OFFLINE';
            }
        }

        const connectingOverlay = document.getElementById('pipConnectingOverlay');
        const offlineOverlay = document.getElementById('pipOfflineOverlay');
        const connectingTitle = document.getElementById('pipConnectingTitle');
        const connectingLog = document.getElementById('pipConnectingLog');
        const pipImg = document.getElementById('pipStillImg');
        const pipTime = document.getElementById('pipTimestamp');
        const zoomCtrl = document.querySelector('.pip-zoom-control');

        if (offlineOverlay) offlineOverlay.style.display = 'none';
        if (connectingTimeout) clearTimeout(connectingTimeout);

        if (isOnline) {
            // ONLINE CAMERA - Show live feed image
            if (pipImg) {
                pipImg.style.display = 'block';
                pipImg.style.filter = 'none';
                if (cam.still) pipImg.src = cam.still;
            }
            if (pipTime) {
                pipTime.style.display = 'block';
                pipTime.style.color = '#38bdf8';
            }
            if (zoomCtrl) zoomCtrl.style.display = 'flex';

            if (connectingOverlay) {
                connectingOverlay.style.display = 'flex';
                connectingTitle.textContent = `Connecting to ${cam.id}...`;
                connectingLog.textContent = `[SYS] Initiating RTSP Handshake with Edge Gateway [10.42.18.91]...`;

                setTimeout(() => {
                    if (connectingLog) connectingLog.textContent = `[NET] TLS 1.3 Key Exchange Verified. Authenticating Stream Token...`;
                }, 600);

                setTimeout(() => {
                    if (connectingLog) connectingLog.textContent = `[CODEC] Negotiating 1080p H.264 Live Stream Buffer & Edge Sync...`;
                }, 1200);

                connectingTimeout = setTimeout(() => {
                    if (connectingOverlay) connectingOverlay.style.display = 'none';
                }, 1800);
            }
        } else {
            // OFFLINE CAMERA (RED MARKER) - Completely hide footage, show black screen with "Camera Offline"
            if (pipImg) {
                pipImg.style.display = 'none';
                pipImg.src = '';
            }
            if (pipTime) {
                pipTime.style.display = 'none';
            }
            if (zoomCtrl) zoomCtrl.style.display = 'none';

            if (connectingOverlay) {
                connectingOverlay.style.display = 'flex';
                connectingTitle.textContent = `Connecting to ${cam.id} [OFFLINE]...`;
                connectingLog.textContent = `[SYS] Initiating RTSP Handshake with Node [10.42.18.91:554]...`;

                setTimeout(() => {
                    if (connectingLog) connectingLog.textContent = `[WARN] Edge node unresponsive at port 554. Retrying handshake (Attempt 2/3)...`;
                }, 600);

                setTimeout(() => {
                    if (connectingLog) connectingLog.textContent = `[ERR] RTSP Connection Timeout: Host 10.42.18.91 Unreachable (ERR_CONN_TIMEDOUT)`;
                }, 1200);

                connectingTimeout = setTimeout(() => {
                    if (connectingOverlay) connectingOverlay.style.display = 'none';
                    if (offlineOverlay) offlineOverlay.style.display = 'flex';
                }, 1800);
            } else {
                if (offlineOverlay) offlineOverlay.style.display = 'flex';
            }
        }
    };

    window.closeGisPipCamera = function() {
        const pipBox = document.getElementById('gisPipCameraBox');
        const offlineOverlay = document.getElementById('pipOfflineOverlay');
        const pipImg = document.getElementById('pipStillImg');
        const zoomCtrl = document.querySelector('.pip-zoom-control');
        const pipTime = document.getElementById('pipTimestamp');

        if (pipBox) {
            pipBox.style.display = 'none';
            pipBox.classList.remove('fullscreen');
        }
        if (offlineOverlay) offlineOverlay.style.display = 'none';
        if (pipImg) pipImg.style.display = 'block';
        if (pipTime) pipTime.style.display = 'block';
        if (zoomCtrl) zoomCtrl.style.display = 'flex';
        if (connectingTimeout) clearTimeout(connectingTimeout);
        activeGisCam = null;
        document.querySelectorAll('.leaflet-gis-cam-pin').forEach(pin => pin.classList.remove('active-pin'));
        document.querySelectorAll('.gis-cam-card-item').forEach(item => item.classList.remove('active'));
    };

    window.reconnectGisPipCamera = function() {
        if (activeGisCam) {
            openGisPipCamera(activeGisCam);
        }
    };

    window.takeGisPipSnapshot = function() {
        const toast = document.getElementById('pipSnapshotToast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        }
    };

    window.toggleGisPipFullscreen = function() {
        const pipBox = document.getElementById('gisPipCameraBox');
        if (pipBox) {
            pipBox.classList.toggle('fullscreen');
        }
    };

    window.adjustGisPipZoom = function(delta) {
        gisPipZoomLevel = Math.max(1.0, Math.min(2.5, gisPipZoomLevel + delta));
        const img = document.getElementById('pipStillImg');
        const zoomText = document.getElementById('pipZoomLevel');
        if (img) {
            img.style.transform = `scale(${gisPipZoomLevel})`;
        }
        if (zoomText) {
            zoomText.textContent = `${Math.round(gisPipZoomLevel * 100)}%`;
        }
    };

    // Sector & Basemap Switchers
    window.switchGisMineSector = function() {
        const sectorKey = document.getElementById('gisMineSectorSelect')?.value || 'all';
        const sector = MINE_SECTORS[sectorKey] || MINE_SECTORS.all;
        if (gisMapInstance) {
            gisMapInstance.flyTo(sector.center, sector.zoom, { duration: 1.4 });
        }

        // Update HUD for sector
        updateGisMapHud(sector.gps, sector.fleet, sector.telemetry);
        
        // Also update sidebar filter if a specific area is chosen
        const areaSelect = document.getElementById('gisCamAreaFilter');
        if (areaSelect) {
            if (sectorKey === 'all') {
                areaSelect.value = 'all';
            } else {
                for (let i = 0; i < areaSelect.options.length; i++) {
                    if (areaSelect.options[i].text.toLowerCase().includes(sectorKey) || sectorKey.includes(areaSelect.options[i].text.toLowerCase())) {
                        areaSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            filterGisCamSidebar();
        }
    };

    window.setMapBaseLayer = function(layerType) {
        if (!gisMapInstance) return;

        document.getElementById('layerSatToggle')?.classList.remove('active');
        document.getElementById('layerOsmToggle')?.classList.remove('active');

        if (layerType === 'satellite') {
            if (osmTileLayer && gisMapInstance.hasLayer(osmTileLayer)) gisMapInstance.removeLayer(osmTileLayer);
            if (satTileLayer && !gisMapInstance.hasLayer(satTileLayer)) gisMapInstance.addLayer(satTileLayer);
            if (labelsTileLayer && !gisMapInstance.hasLayer(labelsTileLayer)) gisMapInstance.addLayer(labelsTileLayer);
            document.getElementById('layerSatToggle')?.classList.add('active');
        } else {
            if (satTileLayer && gisMapInstance.hasLayer(satTileLayer)) gisMapInstance.removeLayer(satTileLayer);
            if (labelsTileLayer && gisMapInstance.hasLayer(labelsTileLayer)) gisMapInstance.removeLayer(labelsTileLayer);
            if (osmTileLayer && !gisMapInstance.hasLayer(osmTileLayer)) gisMapInstance.addLayer(osmTileLayer);
            document.getElementById('layerOsmToggle')?.classList.add('active');
        }
    };

    window.toggleLabelsLayer = function() {
        if (!gisMapInstance || !labelsTileLayer) return;
        const btn = document.getElementById('layerLabelsToggle');
        if (gisMapInstance.hasLayer(labelsTileLayer)) {
            gisMapInstance.removeLayer(labelsTileLayer);
            btn?.classList.remove('active');
        } else {
            gisMapInstance.addLayer(labelsTileLayer);
            btn?.classList.add('active');
        }
    };

    window.toggleCameraMarkers = function() {
        if (!gisMapInstance || !cameraMarkersGroup) return;
        const btn = document.getElementById('layerCamsToggle');
        if (gisMapInstance.hasLayer(cameraMarkersGroup)) {
            gisMapInstance.removeLayer(cameraMarkersGroup);
            btn?.classList.remove('active');
        } else {
            gisMapInstance.addLayer(cameraMarkersGroup);
            btn?.classList.add('active');
        }
    };

    window.toggleCheckpostMarkers = function() {
        if (!gisMapInstance || !checkpostMarkersGroup) return;
        const btn = document.getElementById('layerCheckpostsToggle');
        if (gisMapInstance.hasLayer(checkpostMarkersGroup)) {
            gisMapInstance.removeLayer(checkpostMarkersGroup);
            btn?.classList.remove('active');
        } else {
            gisMapInstance.addLayer(checkpostMarkersGroup);
            btn?.classList.add('active');
        }
    };

    // Hash routing handler
    function handleHashRoute() {
        const hash = window.location.hash;
        if (hash === '#camera-grid') {
            showCameraGridView();
        } else if (hash === '#camera-gis') {
            showCameraGISView();
        } else if (hash === '#rfid-dashboard') {
            showRFIDDashboard();
        } else if (hash === '#irregular-weighments') {
            showIrregularWeighments();
        } else if (hash === '#irregular-trips') {
            showIrregularTrips();
        } else if (hash === '#drone-dashboard') {
            showDroneDashboard();
        } else if (hash === '#workers-attendance') {
            showWorkersAttendance();
        } else if (hash === '#digital-audit-trails') {
            showDigitalAuditTrails();
        } else if (hash === '#vts-dashboard') {
            showVTSDashboard();
        } else if (hash === '#alert-dashboard') {
            showAlertDashboard('All Types');
        } else if (hash === '#view-internal-do') {
            showViewInternalDO();
        } else if (hash === '#add-internal-do') {
            showAddInternalDO();
        } else if (hash === '#edit-internal-do') {
            showEditInternalDO();
        } else if (hash === '#road-dispatch') {
            showRoadDispatchView();
        } else if (hash === '#checkpost' || hash === '#vts' || hash === '#weighbridge') {
            activateSummaryTab(hash.replace('#', ''));
        }
    }

    window.addEventListener('hashchange', handleHashRoute);
    if (window.location.hash) {
        handleHashRoute();
    }

    // Fullscreen Toggle
    const btnFullscreen = document.getElementById('btnFullscreen');
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }
});

// Top Header Action Interactive Controls
// ========================================================

// 1. Full Screen Toggle
window.toggleFullScreenMode = function() {
    const icon = document.getElementById('fullscreenIcon');
    const text = document.getElementById('fullscreenBtnText');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (icon) icon.className = 'fa-solid fa-compress';
            if (text) text.textContent = 'Exit Fullscreen';
            showAuditToast('🖥️ Fullscreen Command Center View Activated');
        }).catch(err => {
            console.warn(`Fullscreen error: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                if (icon) icon.className = 'fa-solid fa-expand';
                if (text) text.textContent = 'Full Screen';
                showAuditToast('Exited Fullscreen View');
            });
        }
    }
};

document.addEventListener('fullscreenchange', () => {
    const icon = document.getElementById('fullscreenIcon');
    const text = document.getElementById('fullscreenBtnText');
    if (!document.fullscreenElement) {
        if (icon) icon.className = 'fa-solid fa-expand';
        if (text) text.textContent = 'Full Screen';
    } else {
        if (icon) icon.className = 'fa-solid fa-compress';
        if (text) text.textContent = 'Exit Fullscreen';
    }
});

// 2. Time Filter Preset Dropdown
window.toggleTimeFilterDropdown = function(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('timeFilterDropdown');
    if (dropdown) {
        const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
        dropdown.style.display = isHidden ? 'block' : 'none';
    }
};

window.setTimeFilterPreset = function(preset) {
    const dropdown = document.getElementById('timeFilterDropdown');
    if (dropdown) dropdown.style.display = 'none';

    document.querySelectorAll('.time-dropdown-item').forEach(item => {
        item.classList.remove('active');
        const check = item.querySelector('.check-icn');
        if (check) check.style.display = 'none';
    });

    const activeItem = document.getElementById(`timePreset${preset.charAt(0).toUpperCase() + preset.slice(1)}`);
    if (activeItem) {
        activeItem.classList.add('active');
        const check = activeItem.querySelector('.check-icn');
        if (check) check.style.display = 'inline-block';
    }

    const labels = {
        'live': 'Live (Real-time Telemetry)',
        '1h': 'Past 1 Hour',
        'today': 'Today (Past 24 Hours)',
        '7d': 'Past 7 Days'
    };
    showAuditToast(`⏱ Telemetry filter set to: ${labels[preset] || preset}`);
    playAlertChime('test');
    if (typeof fetchLiveAlerts === 'function') fetchLiveAlerts();
};

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('timeFilterDropdown');
    const btn = document.getElementById('btnTimeFilter');
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// 3. Analytics View Button
window.toggleAnalyticsView = function() {
    const btn = document.getElementById('btnAnalyticsView');
    if (btn) btn.classList.toggle('active');
    
    // If in Alert Dashboard, highlight category cards & Defcon summary
    const threatBadge = document.getElementById('threatLevelBadge');
    if (threatBadge) {
        threatBadge.scrollIntoView({ behavior: 'smooth', block: 'center' });
        threatBadge.style.transition = 'transform 0.3s ease';
        threatBadge.style.transform = 'scale(1.03)';
        setTimeout(() => { threatBadge.style.transform = 'scale(1)'; }, 600);
    }
    showAuditToast('📊 Visual Analytics & Corridor Performance Metrics Displayed');
    playAlertChime('high');
};

// 4. Export PDF Action (Official Report Generator)
window.handleHeaderExportPdf = function() {
    showAuditToast('📄 Preparing Official TRACE PDF Audit Report...');
    playAlertChime('test');

    setTimeout(() => {
        window.print();
    }, 400);
};

// 5. Export Excel Action (Universal CSV / Spreadsheet Generator)
window.handleHeaderExportExcel = function() {
    showAuditToast('📗 Compiling active dataset into Excel spreadsheet...');
    playAlertChime('test');

    // Find visible table on screen
    const visibleTable = document.querySelector('.content-view:not([style*="display: none"]) table, .table-wrapper table, table');
    let csvData = [];
    let filename = `TRACE_Export_${new Date().toISOString().slice(0,10)}.csv`;

    if (visibleTable) {
        const rows = visibleTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cols = row.querySelectorAll('th, td');
            let rowData = [];
            cols.forEach(col => {
                let text = col.innerText.replace(/(\r\n|\n|\r)/gm, ' ').replace(/"/g, '""').trim();
                rowData.push(`"${text}"`);
            });
            if (rowData.length > 0) csvData.push(rowData.join(','));
        });
    }

    // Fallback to active alerts dataset if no table visible
    if (csvData.length === 0 && window.ALL_LIVE_ALERTS && window.ALL_LIVE_ALERTS.length > 0) {
        csvData.push('"ID","SEVERITY","ALERT TYPE","STATUS","VEHICLE NO","LOCATION","CONFIDENCE","DESCRIPTION","TIMESTAMP"');
        window.ALL_LIVE_ALERTS.forEach(a => {
            csvData.push(`"${a.id}","${a.severity}","${a.alert_type}","${a.status}","${a.vehicle_no || ''}","${a.location || ''}","${a.confidence_score || 95}%","${(a.description || '').replace(/"/g, '""')}","${a.created_at || 'Live'}"`);
        });
        filename = `TRACE_Surveillance_Alerts_${new Date().toISOString().slice(0,10)}.csv`;
    }

    if (csvData.length > 0) {
        const csvContent = "\uFEFF" + csvData.join("\n"); // UTF-8 BOM for Microsoft Excel
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAuditToast(`✅ Exported ${csvData.length - 1} records to ${filename}`);
    } else {
        showAuditToast('⚠️ No active tabular dataset found to export.');
    }
};

// 6. User Profile Modal Controls
window.openUserProfileModal = function() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        modal.style.display = 'flex';
        playAlertChime('test');
    }
};

window.closeUserProfileModalDirect = function() {
    const modal = document.getElementById('userProfileModal');
    if (modal) modal.style.display = 'none';
};

window.closeUserProfileModal = function(e) {
    if (e && e.target.id === 'userProfileModal') {
        closeUserProfileModalDirect();
    }
};

// Top Header Action Interactive Controls
// ========================================================

// 1. Full Screen Toggle
window.toggleFullScreenMode = function() {
    const icon = document.getElementById('fullscreenIcon');
    const text = document.getElementById('fullscreenBtnText');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (icon) icon.className = 'fa-solid fa-compress';
            if (text) text.textContent = 'Exit Fullscreen';
            showAuditToast('🖥️ Fullscreen Command Center View Activated');
        }).catch(err => {
            console.warn(`Fullscreen error: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                if (icon) icon.className = 'fa-solid fa-expand';
                if (text) text.textContent = 'Full Screen';
                showAuditToast('Exited Fullscreen View');
            });
        }
    }
};

document.addEventListener('fullscreenchange', () => {
    const icon = document.getElementById('fullscreenIcon');
    const text = document.getElementById('fullscreenBtnText');
    if (!document.fullscreenElement) {
        if (icon) icon.className = 'fa-solid fa-expand';
        if (text) text.textContent = 'Full Screen';
    } else {
        if (icon) icon.className = 'fa-solid fa-compress';
        if (text) text.textContent = 'Exit Fullscreen';
    }
});

// 2. Time Filter Preset Dropdown
window.toggleTimeFilterDropdown = function(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('timeFilterDropdown');
    if (dropdown) {
        const isHidden = dropdown.style.display === 'none' || !dropdown.style.display;
        dropdown.style.display = isHidden ? 'block' : 'none';
    }
};

window.setTimeFilterPreset = function(preset) {
    const dropdown = document.getElementById('timeFilterDropdown');
    if (dropdown) dropdown.style.display = 'none';

    document.querySelectorAll('.time-dropdown-item').forEach(item => {
        item.classList.remove('active');
        const check = item.querySelector('.check-icn');
        if (check) check.style.display = 'none';
    });

    const activeItem = document.getElementById(`timePreset${preset.charAt(0).toUpperCase() + preset.slice(1)}`);
    if (activeItem) {
        activeItem.classList.add('active');
        const check = activeItem.querySelector('.check-icn');
        if (check) check.style.display = 'inline-block';
    }

    const labels = {
        'live': 'Live (Real-time Telemetry)',
        '1h': 'Past 1 Hour',
        'today': 'Today (Past 24 Hours)',
        '7d': 'Past 7 Days'
    };
    showAuditToast(`⏱ Telemetry filter set to: ${labels[preset] || preset}`);
    playAlertChime('test');
    if (typeof fetchLiveAlerts === 'function') fetchLiveAlerts();
};

document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('timeFilterDropdown');
    const btn = document.getElementById('btnTimeFilter');
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// 3. Analytics View Button
window.toggleAnalyticsView = function() {
    const btn = document.getElementById('btnAnalyticsView');
    if (btn) btn.classList.toggle('active');
    
    // If in Alert Dashboard, highlight category cards & Defcon summary
    const threatBadge = document.getElementById('threatLevelBadge');
    if (threatBadge) {
        threatBadge.scrollIntoView({ behavior: 'smooth', block: 'center' });
        threatBadge.style.transition = 'transform 0.3s ease';
        threatBadge.style.transform = 'scale(1.03)';
        setTimeout(() => { threatBadge.style.transform = 'scale(1)'; }, 600);
    }
    showAuditToast('📊 Visual Analytics & Corridor Performance Metrics Displayed');
    playAlertChime('high');
};

// 4. Export PDF Action (Official Report Generator)
window.handleHeaderExportPdf = function() {
    showAuditToast('📄 Preparing Official TRACE PDF Audit Report...');
    playAlertChime('test');

    setTimeout(() => {
        window.print();
    }, 400);
};

// 5. Export Excel Action (Universal CSV / Spreadsheet Generator)
window.handleHeaderExportExcel = function() {
    showAuditToast('📗 Compiling active dataset into Excel spreadsheet...');
    playAlertChime('test');

    // Find visible table on screen
    const visibleTable = document.querySelector('.content-view:not([style*="display: none"]) table, .table-wrapper table, table');
    let csvData = [];
    let filename = `TRACE_Export_${new Date().toISOString().slice(0,10)}.csv`;

    if (visibleTable) {
        const rows = visibleTable.querySelectorAll('tr');
        rows.forEach(row => {
            const cols = row.querySelectorAll('th, td');
            let rowData = [];
            cols.forEach(col => {
                let text = col.innerText.replace(/(\r\n|\n|\r)/gm, ' ').replace(/"/g, '""').trim();
                rowData.push(`"${text}"`);
            });
            if (rowData.length > 0) csvData.push(rowData.join(','));
        });
    }

    // Fallback to active alerts dataset if no table visible
    if (csvData.length === 0 && window.ALL_LIVE_ALERTS && window.ALL_LIVE_ALERTS.length > 0) {
        csvData.push('"ID","SEVERITY","ALERT TYPE","STATUS","VEHICLE NO","LOCATION","CONFIDENCE","DESCRIPTION","TIMESTAMP"');
        window.ALL_LIVE_ALERTS.forEach(a => {
            csvData.push(`"${a.id}","${a.severity}","${a.alert_type}","${a.status}","${a.vehicle_no || ''}","${a.location || ''}","${a.confidence_score || 95}%","${(a.description || '').replace(/"/g, '""')}","${a.created_at || 'Live'}"`);
        });
        filename = `TRACE_Surveillance_Alerts_${new Date().toISOString().slice(0,10)}.csv`;
    }

    if (csvData.length > 0) {
        const csvContent = "\uFEFF" + csvData.join("\n"); // UTF-8 BOM for Microsoft Excel
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAuditToast(`✅ Exported ${csvData.length - 1} records to ${filename}`);
    } else {
        showAuditToast('⚠️ No active tabular dataset found to export.');
    }
};

// 6. User Profile Modal Controls
window.openUserProfileModal = function() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        modal.style.display = 'flex';
        playAlertChime('test');
    }
};

window.closeUserProfileModalDirect = function() {
    const modal = document.getElementById('userProfileModal');
    if (modal) modal.style.display = 'none';
};

window.closeUserProfileModal = function(e) {
    if (e && e.target.id === 'userProfileModal') {
        closeUserProfileModalDirect();
    }
};
