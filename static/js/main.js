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

    // Back Home button clicks
    if (btnBackHome) {
        btnBackHome.addEventListener('click', (e) => {
            e.preventDefault();
            activateSummaryTab('weighbridge');
        });
    }

    if (vtsBtnHome) {
        vtsBtnHome.addEventListener('click', (e) => {
            e.preventDefault();
            activateSummaryTab('weighbridge');
        });
    }

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

    // Hash routing handler
    function handleHashRoute() {
        const hash = window.location.hash;
        if (hash === '#rfid-dashboard') {
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
