// Configuration Masters (Idle Views Controller)
// ========================================================
window.toggleConfigDropdown = function(e) {
    if (e) e.preventDefault();
    const list = document.getElementById('configSubList');
    const arrow = document.getElementById('configArrow');
    if (list) {
        const isHidden = list.style.display === 'none' || getComputedStyle(list).display === 'none';
        list.style.display = isHidden ? 'block' : 'none';
        if (arrow) {
            arrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
        }
    }
};

function showConfigMaster(viewId, navItemId, title) {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');
    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    // Ensure config dropdown is expanded
    const configSubList = document.getElementById('configSubList');
    const configArrow = document.getElementById('configArrow');
    const configNavItem = document.getElementById('configNavItem');
    if (configSubList) configSubList.style.display = 'block';
    if (configArrow) configArrow.className = 'fa-solid fa-chevron-down arrow-icon';

    document.querySelectorAll('.sub-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (configNavItem) configNavItem.classList.add('active');

    const activeItem = document.getElementById(navItemId);
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.querySelector('.sub-nav-link')?.classList.add('active');
    }

    updateHeaderMainTitle(title);

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === viewId) {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });
}

window.showConfigArea = function() {
    showConfigMaster('config-area-view', 'configAreaNavItem', 'CONTRACT MANAGER • AREA MASTER');
    window.location.hash = '#config-area';
};
window.showConfigPlant = function() {
    showConfigMaster('config-plant-view', 'configPlantNavItem', 'CONTRACT MANAGER • PLANT MASTER');
    window.location.hash = '#config-plant';
};
window.showConfigWeighbridge = function() {
    showConfigMaster('config-weighbridge-view', 'configWeighbridgeNavItem', 'CONTRACT MANAGER • WEIGHBRIDGE MASTER');
    window.location.hash = '#config-weighbridge';
};
window.showConfigCheckpost = function() {
    showConfigMaster('config-checkpost-view', 'configCheckpostNavItem', 'CONTRACT MANAGER • CHECKPOST MASTER');
    window.location.hash = '#config-checkpost';
};
window.showConfigMaintenance = function() {
    showConfigMaster('config-maintenance-view', 'configMaintenanceNavItem', 'CONTRACT MANAGER • MAINTENANCE MASTER');
    window.location.hash = '#config-maintenance';
};

// Initial auto-load & hash router for sub-views
function handleHashRoute() {
    const hash = window.location.hash;
    if (hash === '#digital-audit-trails') {
        showDigitalAuditTrails();
    } else if (hash === '#view-internal-do') {
        showViewInternalDO();
    } else if (hash === '#add-internal-do') {
        showAddInternalDO();
    } else if (hash === '#edit-internal-do') {
        showEditInternalDO();
    } else if (hash === '#road-dispatch') {
        showRoadDispatchView();
    } else if (hash === '#config-area') {
        showConfigArea();
    } else if (hash === '#config-plant') {
        showConfigPlant();
    } else if (hash === '#config-weighbridge') {
        showConfigWeighbridge();
    } else if (hash === '#config-checkpost') {
        showConfigCheckpost();
    } else if (hash === '#config-maintenance') {
        showConfigMaintenance();
    }
}
window.addEventListener('hashchange', handleHashRoute);
setTimeout(handleHashRoute, 150);

// ========================================================
