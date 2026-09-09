// Drone Surveillance & Analytics Dashboard Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Drone Sub-Tab Navigation Switcher
    const droneTabs = document.querySelectorAll('.drone-tab-btn');
    const subViews = {
        'dashboard': document.getElementById('droneSubViewDashboard'),
        'features': document.getElementById('droneSubViewFeatures'),
        'sites': document.getElementById('droneSubViewSites'),
        'reports': document.getElementById('droneSubViewReports')
    };

    droneTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-drone-tab');
            
            // Update Tab Buttons
            droneTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch Sub-View
            Object.keys(subViews).forEach(k => {
                if (subViews[k]) {
                    subViews[k].style.display = (k === target) ? 'block' : 'none';
                }
            });

            // Re-render / resize charts when switching back to dashboard
            if (target === 'dashboard') {
                setTimeout(initOrResizeDroneCharts, 100);
            }
        });
    });

    // 2. Features Search Filter
    const featureSearch = document.querySelector('#droneSubViewFeatures .drone-search-input');
    if (featureSearch) {
        featureSearch.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.features-cards-grid .feature-card');
            cards.forEach(card => {
                const title = card.querySelector('h3')?.innerText.toLowerCase() || '';
                card.style.display = title.includes(val) ? 'flex' : 'none';
            });
        });
    }

    // 3. Sites Search Filter
    const siteSearch = document.querySelector('#droneSubViewSites .site-search-input');
    if (siteSearch) {
        siteSearch.addEventListener('input', (e) => {
            if (typeof filterSitesCards === 'function') {
                filterSitesCards(e.target.value);
            }
        });
    }

    // 4. Reports Search Filter
    const reportSearch = document.querySelector('.reports-search-input');
    if (reportSearch) {
        reportSearch.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            const rows = document.querySelectorAll('.reports-table tbody tr');
            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(val) ? '' : 'none';
            });
        });
    }

    // 4. Initialize Analytics Charts with Chart.js
    initOrResizeDroneCharts();

    // 5. Dynamic Theme Change Listener
    window.addEventListener('traceThemeChanged', () => {
        initOrResizeDroneCharts();
    });
});

window.initOrResizeDroneCharts = initOrResizeDroneCharts;

let droneTypeChartInstance = null;
let droneBarChartInstance = null;
let droneLineChartInstance = null;

function isDroneDarkMode() {
    const theme = document.documentElement.getAttribute('data-theme') || (localStorage.getItem('trace_theme') || 'dark');
    return theme === 'dark';
}

function initOrResizeDroneCharts() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not yet loaded, retrying...');
        setTimeout(initOrResizeDroneCharts, 300);
        return;
    }

    initViolationTypeDonutChart();
    initViolationsByDroneBarChart();
    initViolationsOverTimeLineChart();
}

// ----------------------------------------------------
// CHART 1: Violation Type Distribution (Donut Chart)
// ----------------------------------------------------
function initViolationTypeDonutChart() {
    const canvas = document.getElementById('droneViolationTypeChart');
    if (!canvas) return;

    if (droneTypeChartInstance) {
        droneTypeChartInstance.destroy();
    }

    const typeData = [
        { label: 'cracks', color: '#ff6b6b', value: 16 },
        { label: 'exit_boom_barrier_open', color: '#38d9a9', value: 9 },
        { label: 'fire', color: '#38bdf8', value: 5 },
        { label: 'light_pole', color: '#8ce99a', value: 14 },
        { label: 'lighting_arrangement', color: '#ffe066', value: 58 },
        { label: 'lmv_tipper_plying_on_same_road', color: '#d0bfff', value: 18 },
        { label: 'overcrowding_person', color: '#fcc419', value: 36 },
        { label: 'overhanging_loose_boulders', color: '#9775fa', value: 15 },
        { label: 'person_near_edge_unsafe_area', color: '#74c0fc', value: 22 },
        { label: 'person_unsafe', color: '#ff8787', value: 26 },
        { label: 'rest_shelter', color: '#20c997', value: 11 },
        { label: 'scrap_management', color: '#22b8cf', value: 19 },
        { label: 'scrap_management_required', color: '#82c91e', value: 15 },
        { label: 'smoke', color: '#ffd43b', value: 8 },
        { label: 'stagnant_water', color: '#e599f7', value: 29 },
        { label: 'tipper_with_water_sprinkling_arrangement', color: '#fab005', value: 13 },
        { label: 'unsafe_movement_lmv_near_shovel_dumper_dozer_drill', color: '#b197fc', value: 24 }
    ];

    const isDark = isDroneDarkMode();
    const ctx = canvas.getContext('2d');
    droneTypeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: typeData.map(d => d.label),
            datasets: [{
                data: typeData.map(d => d.value),
                backgroundColor: typeData.map(d => d.color),
                borderWidth: 2,
                borderColor: isDark ? '#151d2e' : '#ffffff',
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '58%',
            plugins: {
                legend: {
                    display: false // Using custom HTML pill legend
                },
                tooltip: {
                    backgroundColor: isDark ? '#0f172a' : '#1e293b',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderWidth: 1,
                    titleFont: { size: 12, weight: 'bold' },
                    bodyFont: { size: 11 },
                    padding: 8,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw} violations`;
                        }
                    }
                }
            }
        }
    });

    // Populate Custom Legend Pills
    const legendContainer = document.getElementById('droneViolationLegend');
    if (legendContainer) {
        legendContainer.innerHTML = typeData.map(item => `
            <span class="legend-pill" title="${item.label} (${item.value} violations)">
                <span class="dot" style="background:${item.color};"></span>
                <span>${item.label}</span>
            </span>
        `).join('');
    }
}

// ----------------------------------------------------
// CHART 2: Violations by Drone (Bar Chart)
// ----------------------------------------------------
function initViolationsByDroneBarChart() {
    const canvas = document.getElementById('droneViolationsByDroneChart');
    if (!canvas) return;

    if (droneBarChartInstance) {
        droneBarChartInstance.destroy();
    }

    const droneLabels = [
        'JARANGDIH_11-01-2026_2',
        'akk_ocp_2026-05-08_5',
        'amrapali_2026-05-05_7',
        'amrapali_2026-07-09_1',
        'birsa_2026-06-11_1',
        'bukaro_2026-05-07_1',
        'chainpur_2026-05-11_1',
        'dakra_2026-06-10_2',
        'dhori_2026-05-06_9',
        'giddi_a_argada_2026-03-26_3',
        'giddi_c_argada_2026-05-12_5',
        'hazaribagh_2026-07-10_1',
        'kalyani_ocp_(dhori)_2026-03-16_2',
        'karo_2026-01_24_3',
        'kbp_hazaribagh_2026-02-10_2',
        'kuju(karma)_2026-02-08_2',
        'magadh_ocp_2026-03-21_1',
        'piparwar_2026-02-23_2',
        'piparwar_2026-08_08_5',
        'rajrappa_2026-05-14_4',
        'sarubera_argada_2026-05-13_3',
        'sirka_argada_2026-05-12_2',
        'tapin_south_ocp_hazaribagh_2026-03-27_2',
        'tetariakhar_2026-04-14_1',
        'urimari_barkasayal_2026-05-09_6'
    ];

    const droneValues = [
        4, 3, 2, 5, 2, 6, 2, 3, 4, 2, 5, 2, 7, 3, 2, 4, 3, 6, 2, 4, 8, 3, 2, 5, 4
    ];

    const isDark = isDroneDarkMode();
    const ctx = canvas.getContext('2d');
    droneBarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: droneLabels,
            datasets: [{
                label: 'Violations',
                data: droneValues,
                backgroundColor: isDark ? '#38bdf8' : '#0284c7',
                borderRadius: 3,
                barPercentage: 0.55,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#0f172a' : '#1e293b',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderWidth: 1,
                    titleFont: { size: 11, weight: 'bold' },
                    bodyFont: { size: 11 },
                    padding: 8,
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 8,
                    ticks: {
                        stepSize: 2,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 10, weight: 500 }
                    },
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 9, weight: 500 },
                        autoSkip: false
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ----------------------------------------------------
// CHART 3: Violations Over Time (Line Chart)
// ----------------------------------------------------
function initViolationsOverTimeLineChart() {
    const canvas = document.getElementById('droneViolationsOverTimeChart');
    if (!canvas) return;

    if (droneLineChartInstance) {
        droneLineChartInstance.destroy();
    }

    const timeLabels = [
        '2026-01-08', '2026-01-11', '2026-01-24', '2026-01-29', '2026-02-06',
        '2026-02-08', '2026-02-10', '2026-02-23', '2026-03-16', '2026-03-18',
        '2026-03-20', '2026-03-23', '2026-03-26', '2026-03-28', '2026-03-31',
        '2026-05-05', '2026-05-07', '2026-05-11', '2026-05-13', '2026-06-08',
        '2026-06-10', '2026-06-12', '2026-06-16', '2026-06-18', '2026-07-09',
        '2026-07-13', '2026-07-15', '2026-07-17', '2026-08-05', '2026-08-07',
        '2026-08-12', '2026-08-17', '2026-08-19'
    ];

    const timeValues = [
        18, 13, 2, 26, 20, 18, 44, 37, 21, 98,
        21, 41, 22, 39, 20, 33, 60, 48, 13, 68,
        72, 63, 75, 22, 6, 39, 48, 35, 94, 116,
        41, 15, 20
    ];

    const isDark = isDroneDarkMode();
    const ctx = canvas.getContext('2d');
    droneLineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Violations',
                data: timeValues,
                borderColor: isDark ? '#38bdf8' : '#0284c7',
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.04)',
                borderWidth: 2.2,
                pointRadius: 3.5,
                pointHoverRadius: 6,
                pointBackgroundColor: isDark ? '#38bdf8' : '#0284c7',
                pointBorderColor: isDark ? '#151d2e' : '#ffffff',
                pointBorderWidth: 1.5,
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#0f172a' : '#1e293b',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    borderColor: isDark ? '#334155' : '#cbd5e1',
                    borderWidth: 1,
                    titleFont: { size: 11, weight: 'bold' },
                    bodyFont: { size: 11 },
                    padding: 8,
                    cornerRadius: 6,
                    callbacks: {
                        label: function(context) {
                            return ` Violations: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 120,
                    ticks: {
                        stepSize: 20,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 10, weight: 500 }
                    },
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        color: isDark ? '#94a3b8' : '#64748b',
                        font: { size: 9, weight: 500 },
                        autoSkip: true,
                        maxTicksLimit: 16
                    },
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc'
                    }
                }
            }
        }
    });
}

// =========================================================================
// INTERACTIVE FEATURE DETAILS MODAL LOGIC & BREAKDOWN ENGINE
// =========================================================================

// Pool of Camera View Mines
const ALL_CAMERA_MINES = [
    { name: 'Amrapali Coal Mine', lat: 23.834, lng: 85.042 },
    { name: 'NK Mines (BNK Pit 01)', lat: 23.791, lng: 85.128 },
    { name: 'Magadh Opencast Project', lat: 23.864, lng: 84.986 },
    { name: 'Giridih Kabribad Colliery', lat: 24.183, lng: 86.301 },
    { name: 'Bukaro Railway Siding', lat: 23.778, lng: 85.912 },
    { name: 'Argada Incline Mine', lat: 23.633, lng: 85.522 },
    { name: 'Barkasayal Coal Complex', lat: 23.689, lng: 85.344 },
    { name: 'Chandrgupt Quarry', lat: 23.805, lng: 85.089 },
    { name: 'Dhori Central Mine', lat: 23.766, lng: 85.984 },
    { name: 'Hazaribagh West Area', lat: 23.992, lng: 85.362 },
    { name: 'Jarangdih Deep Pit', lat: 23.784, lng: 85.894 },
    { name: 'Jharkhand Open Pit', lat: 23.712, lng: 85.456 },
    { name: 'KHASMAHAL Colliery', lat: 23.771, lng: 85.942 },
    { name: 'Karo Project', lat: 23.781, lng: 85.961 },
    { name: 'Kathara Coal Washery', lat: 23.754, lng: 85.882 },
    { name: 'Kuju Incline Portal', lat: 23.719, lng: 85.503 },
    { name: 'Piparwar OCP', lat: 23.728, lng: 85.029 },
    { name: 'Rajrappa Highwall Area', lat: 23.619, lng: 85.704 }
];

const MINE_ZONES_POOL = [
    'North Highwall Strata Face',
    'Pit Bench 04 Extraction Zone',
    'Main Haulage Corridor Junction 2',
    'Weighbridge Ingress & Boom Barrier',
    'Overburden Dump Slope Terrace',
    'Primary Crusher Hopper Perimeter',
    'Stockpile Platform & Conveyor',
    'Western Gate & Drainage Sump',
    'Rake Wagon Loading Track',
    'Coal Seam 04 Heavy Machinery Face'
];

let currentModalFeatureData = {
    title: '',
    violations: 0,
    drones: 0,
    locations: 0,
    lastDate: '',
    items: [],
    activeFilter: 'ALL',
    searchQuery: ''
};

// Open Feature Details Modal with realistic mine breakdown
window.openFeatureDetailsModal = function(featureTitle, violations, drones, locations, lastDate) {
    const modal = document.getElementById('featureDetailsModal');
    if (!modal) return;

    // Set Header & Metrics
    document.getElementById('featModalTitle').innerText = featureTitle;
    document.getElementById('featModalViolations').innerText = violations;
    document.getElementById('featModalDrones').innerText = drones;
    document.getElementById('featModalLocations').innerText = locations;
    document.getElementById('featModalLastDate').innerText = lastDate || 'Recent Flight';

    // Generate deterministic dataset for this feature
    currentModalFeatureData.title = featureTitle;
    currentModalFeatureData.violations = violations;
    currentModalFeatureData.drones = drones;
    currentModalFeatureData.locations = locations;
    currentModalFeatureData.lastDate = lastDate;
    currentModalFeatureData.activeFilter = 'ALL';
    currentModalFeatureData.searchQuery = '';

    // Reset UI Inputs
    const searchInput = document.getElementById('featModalSearchInput');
    if (searchInput) searchInput.value = '';

    const filterPills = document.querySelectorAll('.feature-modal-pills .feat-filter-pill');
    filterPills.forEach((p, idx) => {
        p.classList.toggle('active', idx === 0);
    });

    currentModalFeatureData.items = generateFeatureMineRecords(featureTitle, violations, drones, locations, lastDate);

    // Render Table
    renderFeatureBreakdownTable();

    // Show Modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// Close Feature Details Modal
window.closeFeatureDetailsModal = function() {
    const modal = document.getElementById('featureDetailsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Generate deterministic records based on feature name and numbers
function generateFeatureMineRecords(title, totalViolations, totalDrones, locationCount, dateStr) {
    const records = [];
    const count = Math.min(locationCount || 4, ALL_CAMERA_MINES.length);
    
    // Simple pseudo-random seed from string hash
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = (hash << 5) - hash + title.charCodeAt(i);
        hash |= 0;
    }
    const seed = Math.abs(hash);

    // Pick unique mines using hash offset
    const shuffledMines = [...ALL_CAMERA_MINES].sort((a, b) => {
        const hA = (a.name.charCodeAt(0) * 17 + seed) % 100;
        const hB = (b.name.charCodeAt(0) * 17 + seed) % 100;
        return hA - hB;
    });

    const selectedMines = shuffledMines.slice(0, count);

    // Distribute total violations across mines
    let remainingViolations = totalViolations;
    const violationDistribution = [];

    for (let i = 0; i < count; i++) {
        if (i === count - 1) {
            violationDistribution.push(Math.max(1, remainingViolations));
        } else {
            const portion = Math.max(1, Math.round(remainingViolations / (count - i + 0.5)));
            violationDistribution.push(portion);
            remainingViolations -= portion;
        }
    }

    const statuses = ['ACTIVE', 'REVIEW', 'RESOLVED'];

    selectedMines.forEach((mine, idx) => {
        const zoneIndex = (seed + idx * 3) % MINE_ZONES_POOL.length;
        const droneNum = ((seed + idx * 7) % Math.min(totalDrones, 48)) + 1;
        const droneCode = `DRONE-${String(droneNum).padStart(2, '0')}`;
        const alt = 85 + ((seed + idx * 11) % 45); // 85m to 130m AGL
        const confidence = 88 + ((seed + idx * 13) % 11); // 88% - 98%
        const status = idx === 0 ? 'ACTIVE' : (idx === 1 ? 'REVIEW' : (idx % 2 === 0 ? 'ACTIVE' : 'RESOLVED'));
        const latOffset = ((seed % 50) - 25) * 0.001;
        const lngOffset = (((seed + idx) % 50) - 25) * 0.001;

        records.push({
            id: idx + 1,
            mine: mine.name,
            zone: MINE_ZONES_POOL[zoneIndex],
            drone: droneCode,
            altitude: `${alt}m AGL`,
            gps: `${(mine.lat + latOffset).toFixed(4)}° N, ${(mine.lng + lngOffset).toFixed(4)}° E`,
            violations: violationDistribution[idx] || 1,
            confidence: confidence,
            status: status,
            timestamp: dateStr || '8/15/2026'
        });
    });

    return records;
}

// Render dynamic table rows
function renderFeatureBreakdownTable() {
    const tbody = document.getElementById('featModalTableBody');
    if (!tbody) return;

    const { items, activeFilter, searchQuery } = currentModalFeatureData;
    const query = (searchQuery || '').toLowerCase().trim();

    const filtered = items.filter(item => {
        const matchesStatus = (activeFilter === 'ALL') || (item.status === activeFilter);
        const matchesSearch = !query || 
            item.mine.toLowerCase().includes(query) || 
            item.zone.toLowerCase().includes(query) || 
            item.drone.toLowerCase().includes(query);
        return matchesStatus && matchesSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 36px 16px; color: #64748b;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 24px; color: #94a3b8; margin-bottom: 8px; display: block;"></i>
                    <span style="font-size: 14px; font-weight: 500;">No detection records match the current filter criteria</span>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(row => {
        let statusBadge = '';
        if (row.status === 'ACTIVE') {
            statusBadge = '<span class="badge-status-alert"><i class="fa-solid fa-triangle-exclamation"></i> Active Alert</span>';
        } else if (row.status === 'REVIEW') {
            statusBadge = '<span class="badge-status-review"><i class="fa-solid fa-clock"></i> In Review</span>';
        } else {
            statusBadge = '<span class="badge-status-resolved"><i class="fa-solid fa-check"></i> Resolved</span>';
        }

        const confColor = row.confidence >= 94 ? '#10b981' : (row.confidence >= 90 ? '#0284c7' : '#f59e0b');

        return `
            <tr>
                <td style="font-weight: 600; color: #64748b; text-align: center; width: 40px;">${row.id}</td>
                <td>
                    <div class="mine-name-cell">
                        <i class="fa-solid fa-mountain-sun" style="color: #0284c7; font-size: 14px; flex-shrink: 0;"></i>
                        <div>
                            <div style="font-weight: 600; color: #0f172a;">${row.mine}</div>
                            <div class="mine-zone-text"><i class="fa-solid fa-map-pin" style="font-size: 10px; margin-right: 4px;"></i>${row.zone}</div>
                        </div>
                    </div>
                </td>
                <td style="white-space: nowrap;">
                    <span class="drone-pill-tag"><i class="fa-solid fa-paper-plane"></i> ${row.drone}</span>
                    <div style="font-size: 11px; color: #64748b; margin-top: 3px;">Alt: ${row.altitude}</div>
                </td>
                <td style="font-family: monospace; font-size: 12px; color: #475569; white-space: nowrap;">
                    <i class="fa-solid fa-location-crosshairs" style="color: #0284c7; margin-right: 4px;"></i>${row.gps}
                </td>
                <td style="white-space: nowrap; text-align: center;">
                    <span style="display: inline-flex; align-items: center; background: #fee2e2; color: #dc2626; font-weight: 700; padding: 3px 10px; border-radius: 6px; font-size: 11.5px; white-space: nowrap;">
                        ${row.violations} events
                    </span>
                </td>
                <td style="white-space: nowrap;">
                    <div class="confidence-bar-wrap">
                        <span style="min-width: 28px;">${row.confidence}%</span>
                        <div class="confidence-progress">
                            <div class="confidence-progress-fill" style="width: ${row.confidence}%; background: ${confColor};"></div>
                        </div>
                    </div>
                </td>
                <td style="white-space: nowrap; text-align: center;">
                    ${statusBadge}
                </td>
                <td class="text-center" style="white-space: nowrap;">
                    <button class="btn-mini-telemetry" onclick="viewDroneTelemetryLog('${row.mine.replace(/'/g, "\\'")}', '${row.drone}', '${row.zone.replace(/'/g, "\\'")}')" title="Inspect Telemetry Log">
                        <i class="fa-solid fa-wave-square"></i> Telemetry
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Live Search Filter for Modal
window.filterFeatureLocations = function(query) {
    currentModalFeatureData.searchQuery = query;
    renderFeatureBreakdownTable();
};

// Status Filter Pill Selector
window.setFeatureModalFilter = function(filterType, btn) {
    currentModalFeatureData.activeFilter = filterType;
    const pills = document.querySelectorAll('.feature-modal-pills .feat-filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderFeatureBreakdownTable();
};

// Interactive Telemetry Inspection Toast / Action
window.viewDroneTelemetryLog = function(mine, droneId, zone) {
    if (typeof showActionNotice === 'function') {
        showActionNotice(`Syncing live flight telemetry for ${droneId} at ${mine} (${zone})`);
    } else {
        alert(`Telemetry Log:\n• Drone: ${droneId}\n• Location: ${mine}\n• Sector: ${zone}\n• Telemetry Status: Connected & Calibrated`);
    }
};

// CSV Data Export Functionality
window.exportFeatureDataCSV = function() {
    const { title, items } = currentModalFeatureData;
    if (!items || items.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Feature,Mine Location,Mining Zone,Patrol Drone,Altitude,GPS Coordinates,Violations Detected,AI Confidence,Status,Date\n";

    items.forEach(r => {
        csvContent += `"${r.id}","${title}","${r.mine}","${r.zone}","${r.drone}","${r.altitude}","${r.gps}","${r.violations}","${r.confidence}%","${r.status}","${r.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Drone_Detection_${title.replace(/\s+/g, '_')}_Breakdown.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Close modal on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('featureDetailsModal');
        if (modal && modal.style.display !== 'none') {
            closeFeatureDetailsModal();
        }
    }
});

// Live Site Search & Risk Filter
window.filterSitesCards = function(query) {
    const val = (query || '').toLowerCase().trim();
    const cards = document.querySelectorAll('.sites-cards-grid .site-card');
    cards.forEach(card => {
        const siteName = card.getAttribute('data-site-name') || '';
        const risk = card.getAttribute('data-risk') || '';
        const cardText = card.innerText.toLowerCase();
        const matches = !val || siteName.includes(val) || risk.includes(val) || cardText.includes(val);
        card.style.display = matches ? 'flex' : 'none';
    });
};

// ==========================================
// 8. Action Taken Report (ATR) Modal View
// ==========================================
window.openAtrModal = function(siteName, reportDate, docName, refId) {
    const modal = document.getElementById('atrViewModal');
    if (!modal) return;

    const titleEl = document.getElementById('atrModalTitle');
    const subtitleEl = document.getElementById('atrModalSubtitle');
    const refEl = document.getElementById('atrModalRef');
    const docNameEl = document.getElementById('atrModalDocName');

    if (titleEl) titleEl.innerText = `Action Taken Report (ATR) - ${siteName}`;
    if (subtitleEl) subtitleEl.innerText = `Verified Safety & Aerial Compliance Record (${reportDate})`;
    if (refEl) refEl.innerText = refId || `ATR-2026-${Math.floor(100 + Math.random() * 900)}`;
    if (docNameEl) docNameEl.innerText = docName.replace('.pdf', '_Signed_ATR.pdf');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeAtrModal = function() {
    const modal = document.getElementById('atrViewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('atrViewModal');
        if (modal && modal.style.display !== 'none') {
            closeAtrModal();
        }
    }
});

