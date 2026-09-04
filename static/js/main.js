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

    // Function to show Alert Dashboard View Mode
    function showAlertDashboard(detectionType = 'All Types') {
        document.body.classList.add('alert-mode-active');
        if (mainSidebarMenu) mainSidebarMenu.style.display = 'none';
        if (alertSidebarMenu) alertSidebarMenu.style.display = 'block';
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

        setAlertDetectionType(detectionType);
    }

    // Function to show VTS Dashboard View Mode
    function showVTSDashboard() {
        document.body.classList.remove('alert-mode-active');
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
    }

    // Function to show RFID Dashboard View Mode
    function showRFIDDashboard() {
        document.body.classList.remove('alert-mode-active');
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
    }

    // Function to show Irregular Weighments View Mode
    function showIrregularWeighments() {
        document.body.classList.remove('alert-mode-active');
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
    }

    // Function to show Irregular Trips View Mode
    function showIrregularTrips() {
        document.body.classList.remove('alert-mode-active');
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
    }

    // Function to show AI Driven Drone Monitoring Dashboard Mode
    function showDroneDashboard() {
        document.body.classList.remove('alert-mode-active');
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
    }

    // Function to show Workers Attendance View Mode
    function showWorkersAttendance() {
        document.body.classList.remove('alert-mode-active');
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
    }

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

    // Function to set detection view (All Types Overview vs Specific Detail view)
    function setAlertDetectionType(type) {
        if (detectionSelect) detectionSelect.value = type;

        alertSubNavItems.forEach(item => {
            const itemType = item.getAttribute('data-detection');
            if (itemType === type) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        if (type === 'All Types' || !type) {
            if (alertOverviewContainer) alertOverviewContainer.style.display = 'block';
            if (alertDetailContainer) alertDetailContainer.style.display = 'none';
            if (headerBadgeCount) headerBadgeCount.textContent = '6';
            return;
        }

        if (alertOverviewContainer) alertOverviewContainer.style.display = 'none';
        if (alertDetailContainer) alertDetailContainer.style.display = 'grid';

        vaCards.forEach(c => c.classList.remove('card-highlight-teal', 'active-card'));

        if (type === 'Unauthorized stoppage') {
            if (headerBadgeCount) headerBadgeCount.textContent = '37';

            if (detailIcon) detailIcon.className = 'fa-solid fa-triangle-exclamation detail-icon-orange';
            if (detailTitle) detailTitle.innerHTML = `Unauthorized stoppage <span class="detail-tag" style="color: #f59e0b;">(Vehicle Alerts)</span>`;

            if (detailSubtitleText) {
                detailSubtitleText.textContent = '• SHOWING 12 OF 12 EVENTS';
                detailSubtitleText.className = 'subtitle-events-text';
            }

            if (detailEventsBody) {
                detailEventsBody.innerHTML = `
                    <div class="event-row-card">
                        <div class="event-row-info"><span class="event-row-title">MSRCR (SAKANDRA/BIHAR) (3 alerts, 3 vehicles)</span></div>
                        <div class="event-row-meta"><span class="event-timestamp">23:54:34</span><i class="fa-solid fa-chevron-down arrow-icon"></i></div>
                    </div>
                    <div class="event-row-card">
                        <div class="event-row-info"><span class="event-row-title">MSRCR (MONET/ALOK) (1 alerts, 1 vehicles)</span></div>
                        <div class="event-row-meta"><span class="event-timestamp">23:53:57</span><i class="fa-solid fa-chevron-down arrow-icon"></i></div>
                    </div>
                    <div class="event-row-card">
                        <div class="event-row-info"><span class="event-row-title">MSRCR (MUKESH/ROSHAN/HND) (2 alerts, 2 vehicles)</span></div>
                        <div class="event-row-meta"><span class="event-timestamp">23:53:00</span><i class="fa-solid fa-chevron-down arrow-icon"></i></div>
                    </div>
                    <div class="event-row-card">
                        <div class="event-row-info"><span class="event-row-title">LALITPUR POWER GENERATION COMPANY (2 alerts, 2 vehicles)</span></div>
                        <div class="event-row-meta"><span class="event-timestamp">23:52:41</span><i class="fa-solid fa-chevron-down arrow-icon"></i></div>
                    </div>
                `;
            }

            if (cardStoppage) {
                cardStoppage.className = 'metric-card dark-card card-highlight-teal active-card';
                cardStoppage.querySelector('.metric-number').textContent = '12';
                cardStoppage.querySelector('.metric-number').className = 'metric-number highlight-teal-text';
                cardStoppage.querySelector('.metric-icon-circle').className = 'metric-icon-circle highlight-teal-icon';
            }

        } else if (type === 'Vehicle Detection') {
            if (headerBadgeCount) headerBadgeCount.textContent = '40';

            if (detailIcon) detailIcon.className = 'fa-solid fa-car detail-icon-teal';
            if (detailTitle) detailTitle.innerHTML = `Vehicle Detection`;

            if (detailSubtitleText) {
                detailSubtitleText.textContent = '• SHOWING 0 OF 0 EVENTS';
                detailSubtitleText.className = 'subtitle-events-text subtitle-events-teal';
            }

            if (detailEventsBody) {
                detailEventsBody.innerHTML = `<div class="no-events-empty-msg">No events to display</div>`;
            }

            if (vaCardVehicle) {
                vaCardVehicle.classList.add('card-highlight-teal', 'active-card');
            }

            if (cardStoppage) {
                cardStoppage.className = 'metric-card dark-card card-highlight-orange';
                cardStoppage.querySelector('.metric-number').textContent = '14';
                cardStoppage.querySelector('.metric-number').className = 'metric-number highlight-orange-text';
                cardStoppage.querySelector('.metric-icon-circle').className = 'metric-icon-circle highlight-orange-icon';
            }

        } else {
            if (headerBadgeCount) headerBadgeCount.textContent = '35';
            if (detailIcon) detailIcon.className = 'fa-solid fa-triangle-exclamation detail-icon-teal';
            if (detailTitle) detailTitle.innerHTML = type;
            if (detailSubtitleText) {
                detailSubtitleText.textContent = '• SHOWING 0 OF 0 EVENTS';
                detailSubtitleText.className = 'subtitle-events-text subtitle-events-teal';
            }
            if (detailEventsBody) {
                detailEventsBody.innerHTML = `<div class="no-events-empty-msg">No events to display</div>`;
            }
        }
    }

    // Close detail view button listener
    if (btnCloseDetail) {
        btnCloseDetail.addEventListener('click', (e) => {
            e.preventDefault();
            setAlertDetectionType('All Types');
        });
    }

    // Dropdown change listener
    if (detectionSelect) {
        detectionSelect.addEventListener('change', (e) => {
            setAlertDetectionType(e.target.value);
        });
    }

    // Sub-nav detection items click listeners
    alertSubNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const type = item.getAttribute('data-detection');
            if (type) setAlertDetectionType(type);
        });
    });

    // Overview metric cards click listeners
    overviewCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-card-type');
            if (cardType) {
                setAlertDetectionType(cardType);
            }
        });
    });

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

    setupDropdownToggle('blacklistedNavLink', 'blacklistedSubList', 'blacklistedArrow');
    setupDropdownToggle('doOpsNavLink', 'doOpsSubList', 'doOpsArrow');
    setupDropdownToggle('configNavLink', 'configSubList', 'configArrow');
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
            if (window.initGisLeafletMap) window.initGisLeafletMap();
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
        } else if (hash === '#vts-dashboard') {
            showVTSDashboard();
        } else if (hash === '#alert-dashboard') {
            showAlertDashboard('All Types');
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

// Drone Surveillance & Still Inspection Modal Logic
const DRONE_SURVEILLANCE_DATA = {
    nk_mines: {
        locationName: "NK Mines",
        reportFile: "NK_19-08-2026.pdf",
        reportDate: "Aug 19, 2026",
        videos: [
            {
                camId: "CAM-01",
                camName: "CAM-01: Pit Extraction & Haul Road",
                feedLabel: "Video 1: CAM-01 (Pit Extraction)",
                hudTitle: "CAM-01 [NK-MINES] 4K UHD",
                hudTimestamp: "2026-08-19 10:14:22 UTC",
                detectionTag: "AI: Bench Clearance (98.4%)",
                stillFile: "/static/media_screenshots/SS-1.png",
                stillName: "SS-1.png",
                droneId: "DRONE-NK-01",
                sensor: "Optical 4K + FLIR Boson",
                altitude: "85.4 meters",
                gps: "23.7842° N, 85.3421° E",
                target: "Haul Truck Clearance",
                safety: "98.4% Compliant"
            },
            {
                camId: "CAM-02",
                camName: "CAM-02: Coal Stockpile & Loading Bench",
                feedLabel: "Video 2: CAM-02 (Stockpile Bench)",
                hudTitle: "CAM-02 [NK-STOCKPILE] 4K UHD",
                hudTimestamp: "2026-08-19 11:32:05 UTC",
                detectionTag: "AI: Boundary Perimeter Safe (99.1%)",
                stillFile: "/static/media_screenshots/SS-2.png",
                stillName: "SS-2.png",
                droneId: "DRONE-NK-02",
                sensor: "Optical 4K Zoom 30x",
                altitude: "92.1 meters",
                gps: "23.7850° N, 85.3435° E",
                target: "Stockpile Spillage & Feeder",
                safety: "99.1% Compliant"
            }
        ]
    },
    amrapali: {
        locationName: "Amrapali",
        reportFile: "AMRAPALI_18-08-2026.pdf",
        reportDate: "Aug 18, 2026",
        videos: [
            {
                camId: "CAM-01",
                camName: "CAM-01: North Quarry Highwall & Shovel Grid",
                feedLabel: "Video 1: CAM-01 (North Highwall)",
                hudTitle: "CAM-01 [AMRAPALI-NORTH] 4K UHD",
                hudTimestamp: "2026-08-18 09:45:10 UTC",
                detectionTag: "AI: Highwall Stability Checked",
                stillFile: "/static/media_screenshots/SS-3.png",
                stillName: "SS-3.png",
                droneId: "DRONE-AMR-04",
                sensor: "LiDAR + High-Resolution RGB",
                altitude: "110.0 meters",
                gps: "23.8210° N, 85.2014° E",
                target: "Highwall Rock Strata & Shovel",
                safety: "100% Stable"
            },
            {
                camId: "CAM-02",
                camName: "CAM-02: Central Incline & Haulage Corridor",
                feedLabel: "Video 2: CAM-02 (Central Incline)",
                hudTitle: "CAM-02 [AMRAPALI-INCLINE] 4K UHD",
                hudTimestamp: "2026-08-18 14:18:40 UTC",
                detectionTag: "AI: Heavy Hauler Spacing Normal",
                stillFile: "/static/media_screenshots/SS-4.png",
                stillName: "SS-4.png",
                droneId: "DRONE-AMR-02",
                sensor: "Dual-Lens Optical PTZ",
                altitude: "78.5 meters",
                gps: "23.8245° N, 85.2050° E",
                target: "Dumper Incline Speed (18 km/h)",
                safety: "99.5% Compliant"
            }
        ]
    },
    magadh: {
        locationName: "Magadh",
        reportFile: "MAGHA_17-08-2026.pdf",
        reportDate: "Aug 17, 2026",
        videos: [
            {
                camId: "CAM-01",
                camName: "CAM-01: Coal Seam 04 Heavy Machinery Face",
                feedLabel: "Video 1: CAM-01 (Seam 04 Machinery)",
                hudTitle: "CAM-01 [MAGADH-SEAM4] 4K UHD",
                hudTimestamp: "2026-08-17 08:30:15 UTC",
                detectionTag: "AI: Machinery Radius Safe",
                stillFile: "/static/media_screenshots/SS-5.png",
                stillName: "SS-5.png",
                droneId: "DRONE-MGD-01",
                sensor: "Optical 4K 60FPS",
                altitude: "88.0 meters",
                gps: "23.8512° N, 85.1245° E",
                target: "Excavator Swing Circle",
                safety: "98.8% Compliant"
            },
            {
                camId: "CAM-02",
                camName: "CAM-02: Outer Haul Road Junction & Checkpoint",
                feedLabel: "Video 2: CAM-02 (Haul Road Junction)",
                hudTitle: "CAM-02 [MAGADH-CHECKPOINT] 4K UHD",
                hudTimestamp: "2026-08-17 13:50:22 UTC",
                detectionTag: "AI: ANPR & Trip Verified (100%)",
                stillFile: "/static/media_screenshots/SS-6.png",
                stillName: "SS-6.png",
                droneId: "DRONE-MGD-03",
                sensor: "Stationary CCTV + Drone Relay",
                altitude: "65.0 meters",
                gps: "23.8560° N, 85.1290° E",
                target: "ANPR Plate & Gross Weighment",
                safety: "100% Verified"
            }
        ]
    },
    giridih: {
        locationName: "Giridih Kabribad",
        reportFile: "GIRDIH_13-08-2026.pdf",
        reportDate: "Aug 13, 2026",
        videos: [
            {
                camId: "CAM-01",
                camName: "CAM-01: Waste Dump Slope & Embankment Edge",
                feedLabel: "Video 1: CAM-01 (Waste Dump Slope)",
                hudTitle: "CAM-01 [GIRIDIH-DUMP] 4K UHD",
                hudTimestamp: "2026-08-13 11:05:33 UTC",
                detectionTag: "AI: Embankment Slope Monitoring",
                stillFile: "/static/media_screenshots/SS-7.png",
                stillName: "SS-7.png",
                droneId: "DRONE-GRD-02",
                sensor: "Photogrammetry 4K Sensor",
                altitude: "95.0 meters",
                gps: "24.1840° N, 86.3021° E",
                target: "Overburden Slope Berms",
                safety: "99.2% Nominal"
            },
            {
                camId: "CAM-02",
                camName: "CAM-02: Primary Feeder & Personnel Safety Perimeter",
                feedLabel: "Video 2: CAM-02 (Feeder Perimeter)",
                hudTitle: "CAM-02 [GIRIDIH-FEEDER] 4K UHD",
                hudTimestamp: "2026-08-13 16:22:18 UTC",
                detectionTag: "AI: PPE & Safety Zone Compliant",
                stillFile: "/static/media_screenshots/SS-8.png",
                stillName: "SS-8.png",
                droneId: "DRONE-GRD-01",
                sensor: "AI Edge Smart Cam 4K",
                altitude: "72.0 meters",
                gps: "24.1865° N, 86.3055° E",
                target: "PPE Vest / Helmet & Proximity",
                safety: "100% Compliant"
            }
        ]
    },
    bukaro: {
        locationName: "Bukaro",
        reportFile: "BUKARO_12-08-2026.pdf",
        reportDate: "Aug 12, 2026",
        videos: [
            {
                camId: "CAM-01",
                camName: "CAM-01: Rail Loading Terminal & Yard Cam",
                feedLabel: "Video 1: CAM-01 (Rail Terminal)",
                hudTitle: "CAM-01 [BUKARO-RAIL] 4K UHD",
                hudTimestamp: "2026-08-12 10:10:45 UTC",
                detectionTag: "AI: Rake Wagon Loading Clear",
                stillFile: "/static/media_screenshots/SS-9.png",
                stillName: "SS-9.png",
                droneId: "DRONE-BKR-01",
                sensor: "Aerial Drone PTZ Optical",
                altitude: "84.0 meters",
                gps: "23.7920° N, 85.9840° E",
                target: "Train Rake Wagon Volumetric",
                safety: "99.7% Nominal"
            },
            {
                camId: "CAM-02",
                camName: "CAM-02: Western Exit Gate & Drainage Sump",
                feedLabel: "Video 2: CAM-02 (Exit Gate & Sump)",
                hudTitle: "CAM-02 [BUKARO-GATE] 4K UHD",
                hudTimestamp: "2026-08-12 15:40:55 UTC",
                detectionTag: "AI: Sump Drainage & Gate Nominal",
                stillFile: "/static/media_screenshots/SS-10.png",
                stillName: "SS-10.png",
                droneId: "DRONE-BKR-05",
                sensor: "Environmental Multispectral",
                altitude: "90.0 meters",
                gps: "23.7965° N, 85.9890° E",
                target: "Water Sump Drainage Level",
                safety: "100% Compliant"
            }
        ]
    }
};

let currentModalLocation = 'nk_mines';
let currentModalFeedIndex = 0;

window.openDroneVideoModal = function(locationKey, videoIndex = 0) {
    if (!DRONE_SURVEILLANCE_DATA[locationKey]) locationKey = 'nk_mines';
    currentModalLocation = locationKey;
    currentModalFeedIndex = videoIndex;

    const modal = document.getElementById('droneVideoModal');
    if (modal) {
        modal.style.display = 'flex';
        renderDroneModalContent();
    }
};

window.closeDroneVideoModalDirect = function() {
    const modal = document.getElementById('droneVideoModal');
    if (modal) modal.style.display = 'none';
};

window.closeDroneVideoModal = function(e) {
    if (e && e.target && e.target.id === 'droneVideoModal') {
        closeDroneVideoModalDirect();
    }
};

window.switchDroneModalLocation = function(locationKey) {
    currentModalLocation = locationKey;
    currentModalFeedIndex = 0;
    renderDroneModalContent();
};

window.switchDroneModalFeed = function(feedIndex) {
    currentModalFeedIndex = feedIndex;
    renderDroneModalContent();
};

function renderDroneModalContent() {
    const locData = DRONE_SURVEILLANCE_DATA[currentModalLocation];
    if (!locData) return;

    // Update location pills
    document.querySelectorAll('.drone-loc-pill').forEach(pill => {
        if (pill.getAttribute('data-loc') === currentModalLocation) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });

    const activeVideo = locData.videos[currentModalFeedIndex] || locData.videos[0];

    // Header
    const headingEl = document.getElementById('modalLocationHeading');
    if (headingEl) {
        headingEl.innerHTML = `${locData.locationName} — ${activeVideo.camName}`;
    }

    // Feed buttons
    const btnFeed0 = document.getElementById('modalBtnFeed0');
    const btnFeed1 = document.getElementById('modalBtnFeed1');
    const label0 = document.getElementById('modalFeed0Label');
    const label1 = document.getElementById('modalFeed1Label');

    if (label0 && locData.videos[0]) label0.innerText = locData.videos[0].feedLabel;
    if (label1 && locData.videos[1]) label1.innerText = locData.videos[1].feedLabel;

    if (btnFeed0) btnFeed0.classList.toggle('active', currentModalFeedIndex === 0);
    if (btnFeed1) btnFeed1.classList.toggle('active', currentModalFeedIndex === 1);

    // Image & HUD
    const mainImg = document.getElementById('modalMainStillImg');
    if (mainImg) mainImg.src = activeVideo.stillFile;

    const hudCamTitle = document.getElementById('modalHudCamTitle');
    if (hudCamTitle) hudCamTitle.innerText = activeVideo.hudTitle;

    const hudTimestamp = document.getElementById('modalHudTimestamp');
    if (hudTimestamp) hudTimestamp.innerText = activeVideo.hudTimestamp;

    const hudTag = document.getElementById('modalHudDetectionTag');
    if (hudTag) hudTag.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${activeVideo.detectionTag}`;

    const activeStillBadge = document.getElementById('modalActiveStillBadge');
    if (activeStillBadge) activeStillBadge.innerText = `Still Photo: ${activeVideo.stillName}`;

    const downloadLink = document.getElementById('modalDownloadLink');
    if (downloadLink) {
        downloadLink.href = activeVideo.stillFile;
        downloadLink.download = `${locData.locationName.replace(/\s+/g, '_')}_${activeVideo.camId}_${activeVideo.stillName}`;
    }

    // Metadata sidebar
    const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    };
    setTxt('modalMetaDroneId', activeVideo.droneId);
    setTxt('modalMetaSensor', activeVideo.sensor);
    setTxt('modalMetaAlt', activeVideo.altitude);
    setTxt('modalMetaGps', activeVideo.gps);
    setTxt('modalMetaTarget', activeVideo.target);
    setTxt('modalMetaSafety', activeVideo.safety);
    setTxt('modalMetaReport', locData.reportFile);
}

window.openStillInNewTab = function() {
    const locData = DRONE_SURVEILLANCE_DATA[currentModalLocation];
    if (locData) {
        const activeVideo = locData.videos[currentModalFeedIndex] || locData.videos[0];
        window.open(activeVideo.stillFile, '_blank');
    }
};

window.toggleLocationStills = function(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (!drawer) return;

    const btnKey = drawerId.replace('stills-drawer-', '');
    const toggleBtn = document.getElementById(`btn-toggle-${btnKey}`);

    const isHidden = drawer.style.display === 'none';
    drawer.style.display = isHidden ? 'table-row' : 'none';

    if (toggleBtn) {
        toggleBtn.classList.toggle('active', isHidden);
    }
};
