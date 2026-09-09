// VTS Fleet Management & Interactive Vehicle Report Module
// Driven by real CCL VTS fleet dataset (2,242 records)

let currentFleetFilter = 'all';
let currentAreaFilter = 'all';
let currentSearchQuery = '';
let currentFleetPage = 1;
let rowsPerPage = 50;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initVtsFleetAreaOptions();
});

// Populate Distinct Mining Areas in Modal Filter
function initVtsFleetAreaOptions() {
    const areaSelect = document.getElementById('vtsFleetAreaFilter');
    if (!areaSelect || !window.VTS_FLEET_DATA) return;

    const areas = Array.from(new Set(window.VTS_FLEET_DATA.map(d => d.area).filter(Boolean))).sort();
    
    // Clear old dynamic options, keep 'All Areas'
    areaSelect.innerHTML = '<option value="all">All Mining Areas (14 Areas)</option>';
    areas.forEach(area => {
        const count = window.VTS_FLEET_DATA.filter(d => d.area === area).length;
        const opt = document.createElement('option');
        opt.value = area;
        opt.textContent = `${area} (${count})`;
        areaSelect.appendChild(opt);
    });
}

// Open VTS Fleet Master Modal
window.openFleetModal = function(statusFilter = 'all') {
    const modal = document.getElementById('vtsFleetMasterModal');
    if (!modal) return;

    currentFleetFilter = statusFilter;
    currentFleetPage = 1;

    // Reset inputs
    const searchInput = document.getElementById('vtsFleetSearchInput');
    if (searchInput) searchInput.value = '';
    currentSearchQuery = '';

    const areaSelect = document.getElementById('vtsFleetAreaFilter');
    if (areaSelect) areaSelect.value = 'all';
    currentAreaFilter = 'all';

    // Update Status Pill UI
    updateFleetStatusPillsUI(statusFilter);

    // Render Table
    renderFleetTable();

    // Show Modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// Close VTS Fleet Master Modal
window.closeFleetModal = function() {
    const modal = document.getElementById('vtsFleetMasterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Update Active Status Tab Pill in Modal
function updateFleetStatusPillsUI(status) {
    const pills = document.querySelectorAll('.vts-fleet-tab-btn');
    pills.forEach(pill => {
        const pillStatus = pill.getAttribute('data-status');
        if (pillStatus === status) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Switch Status Filter from Pill click
window.setFleetStatusFilter = function(status, btnEl) {
    currentFleetFilter = status;
    currentFleetPage = 1;
    updateFleetStatusPillsUI(status);
    renderFleetTable();
};

// Handle Search Input Filter
window.handleFleetSearch = function(query) {
    currentSearchQuery = (query || '').toLowerCase().trim();
    currentFleetPage = 1;
    renderFleetTable();
};

// Handle Area Dropdown Filter
window.handleFleetAreaFilter = function(area) {
    currentAreaFilter = area;
    currentFleetPage = 1;
    renderFleetTable();
};

// Handle Rows Per Page Change
window.handleFleetRowsPerPage = function(val) {
    rowsPerPage = val === 'all' ? 999999 : parseInt(val, 10);
    currentFleetPage = 1;
    renderFleetTable();
};

// Filter Data based on current state
function getFilteredFleetData() {
    if (!window.VTS_FLEET_DATA) return [];

    return window.VTS_FLEET_DATA.filter(item => {
        // 1. Status Filter
        if (currentFleetFilter !== 'all') {
            if (item.status.toLowerCase() !== currentFleetFilter.toLowerCase()) {
                return false;
            }
        }

        // 2. Area Filter
        if (currentAreaFilter !== 'all') {
            if (item.area !== currentAreaFilter) {
                return false;
            }
        }

        // 3. Search Query
        if (currentSearchQuery) {
            const matchVehicle = item.vehicle_no.toLowerCase().includes(currentSearchQuery);
            const matchTransporter = item.transporter.toLowerCase().includes(currentSearchQuery);
            const matchDevice = item.device_id.toLowerCase().includes(currentSearchQuery);
            const matchArea = item.area.toLowerCase().includes(currentSearchQuery);
            const matchProject = item.project.toLowerCase().includes(currentSearchQuery);
            if (!matchVehicle && !matchTransporter && !matchDevice && !matchArea && !matchProject) {
                return false;
            }
        }

        return true;
    });
}

// Render Table Rows and Pagination
function renderFleetTable() {
    const tableBody = document.getElementById('vtsFleetTableBody');
    const countBadge = document.getElementById('vtsFleetFilteredCount');
    const paginationText = document.getElementById('vtsFleetPaginationText');
    const prevBtn = document.getElementById('vtsFleetPrevBtn');
    const nextBtn = document.getElementById('vtsFleetNextBtn');

    if (!tableBody) return;

    const filtered = getFilteredFleetData();
    const totalRecords = filtered.length;

    if (countBadge) {
        countBadge.textContent = `${totalRecords.toLocaleString()} Vehicles`;
    }

    if (totalRecords === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #94a3b8;">
                    <i class="fa-solid fa-truck-slash" style="font-size: 32px; color: #cbd5e1; margin-bottom: 12px; display: block;"></i>
                    <strong style="font-size: 15px; color: #64748b;">No matching vehicles found</strong>
                    <div style="font-size: 12.5px; margin-top: 4px;">Try changing the search query or filter criteria.</div>
                </td>
            </tr>
        `;
        if (paginationText) paginationText.textContent = 'Showing 0 of 0';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
    }

    // Pagination calculations
    const totalPages = Math.ceil(totalRecords / rowsPerPage) || 1;
    if (currentFleetPage > totalPages) currentFleetPage = totalPages;
    if (currentFleetPage < 1) currentFleetPage = 1;

    const startIndex = (currentFleetPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalRecords);
    const pageItems = filtered.slice(startIndex, endIndex);

    // Build Rows HTML
    let html = '';
    pageItems.forEach((item, index) => {
        const rowNum = startIndex + index + 1;
        const statusClass = item.status === 'Online' ? 'vts-status-online' : (item.status === 'Offline' ? 'vts-status-offline' : 'vts-status-workshop');
        const statusIcon = item.status === 'Online' ? 'fa-circle-check' : (item.status === 'Offline' ? 'fa-circle-xmark' : 'fa-wrench');

        html += `
            <tr>
                <td style="text-align: center; color: #64748b; font-weight: 600; font-size: 12px;">${rowNum}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-truck" style="color: #0284c7; font-size: 13px;"></i>
                        <a href="javascript:void(0)" onclick="closeFleetModal(); openVtsLiveTrackingView('${escapeHtml(item.vehicle_no)}');" class="vts-vehicle-plate" style="text-decoration: none; cursor: pointer;" title="Click to track live on Satellite Map">
                            ${escapeHtml(item.vehicle_no)} <i class="fa-solid fa-location-crosshairs" style="font-size: 11px; margin-left: 4px; color: #0284c7;"></i>
                        </a>
                    </div>
                </td>
                <td>
                    <span class="vts-status-pill ${statusClass}">
                        <i class="fa-solid ${statusIcon}"></i> ${item.status}
                    </span>
                </td>
                <td><strong>${escapeHtml(item.area)}</strong></td>
                <td><span style="color: #475569;">${escapeHtml(item.project)}</span></td>
                <td><code class="vts-device-code">${escapeHtml(item.device_id)}</code></td>
                <td><span style="font-size: 12.5px; color: #334155;">${escapeHtml(item.transporter)}</span></td>
                <td style="text-align: center; white-space: nowrap;">
                    <button type="button" onclick="closeFleetModal(); openVtsModifyModal('${escapeHtml(item.vehicle_no)}');" style="padding: 4px 10px; font-size: 11.5px; font-weight: 700; color: #b45309; background: #fef3c7; border: 1px solid #fde68a; border-radius: 4px; cursor: pointer; transition: all 0.15s;" title="Modify vehicle details">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;

    // Update Pagination UI
    if (paginationText) {
        paginationText.innerHTML = `Showing <strong>${startIndex + 1}–${endIndex}</strong> of <strong>${totalRecords.toLocaleString()}</strong> records (Page ${currentFleetPage} of ${totalPages})`;
    }
    if (prevBtn) prevBtn.disabled = currentFleetPage <= 1;
    if (nextBtn) nextBtn.disabled = currentFleetPage >= totalPages;
}

// Pagination Controls
window.fleetPagePrev = function() {
    if (currentFleetPage > 1) {
        currentFleetPage--;
        renderFleetTable();
    }
};

window.fleetPageNext = function() {
    const filtered = getFilteredFleetData();
    const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
    if (currentFleetPage < totalPages) {
        currentFleetPage++;
        renderFleetTable();
    }
};

// Export to CSV
window.exportFleetCSV = function() {
    const data = getFilteredFleetData();
    if (!data || data.length === 0) {
        alert('No data available to export.');
        return;
    }

    const headers = ['#', 'Vehicle Number', 'Status', 'Area', 'Project', 'Device ID', 'Transporter'];
    const csvRows = [headers.join(',')];

    data.forEach((item, idx) => {
        const row = [
            idx + 1,
            `"${item.vehicle_no.replace(/"/g, '""')}"`,
            `"${item.status}"`,
            `"${item.area.replace(/"/g, '""')}"`,
            `"${item.project.replace(/"/g, '""')}"`,
            `"\t${item.device_id}"`, // format device id to preserve leading zeros in Excel
            `"${item.transporter.replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
    });

    const csvString = '\uFEFF' + csvRows.join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filterTag = currentFleetFilter === 'all' ? 'TOTAL' : currentFleetFilter.toUpperCase();
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `CCL_VTS_Fleet_Report_${filterTag}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Export to PDF / Print Report
window.exportFleetPDF = function() {
    const data = getFilteredFleetData();
    if (!data || data.length === 0) {
        alert('No data available to export.');
        return;
    }

    const filterTag = currentFleetFilter === 'all' ? 'All Vehicles' : `${currentFleetFilter} Fleet`;
    const printWindow = window.open('', '_blank', 'width=1100,height=850');
    if (!printWindow) {
        alert('Please allow popups to generate the printable PDF report.');
        return;
    }

    let rowsHtml = '';
    data.slice(0, 1000).forEach((item, idx) => {
        const statusColor = item.status === 'Online' ? '#059669' : (item.status === 'Offline' ? '#dc2626' : '#d97706');
        rowsHtml += `
            <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td><strong>${escapeHtml(item.vehicle_no)}</strong></td>
                <td><span style="color:${statusColor}; font-weight:700;">${item.status}</span></td>
                <td>${escapeHtml(item.area)}</td>
                <td>${escapeHtml(item.project)}</td>
                <td>${escapeHtml(item.device_id)}</td>
                <td>${escapeHtml(item.transporter)}</td>
            </tr>
        `;
    });

    const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>CCL VTS Fleet Report - ${filterTag}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; color: #1e293b; }
                .header { border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; }
                .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
                .meta { font-size: 11px; color: #475569; text-align: right; }
                table { width: 100%; border-collapse: collapse; font-size: 11px; }
                th { background-color: #f1f5f9; color: #0f172a; padding: 8px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700; }
                td { padding: 6px 8px; border: 1px solid #e2e8f0; }
                tr:nth-child(even) { background-color: #f8fafc; }
                @media print {
                    @page { margin: 12mm; }
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1 class="title">CENTRAL COALFIELDS LIMITED (CCL)</h1>
                    <div class="subtitle">Vehicle Tracking System (VTS) — Fleet Master Report (${filterTag})</div>
                </div>
                <div class="meta">
                    <div>Generated: ${new Date().toLocaleString()}</div>
                    <div>Total Records: <strong>${data.length}</strong></div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 35px; text-align: center;">#</th>
                        <th>Vehicle Number</th>
                        <th>Status</th>
                        <th>Mining Area</th>
                        <th>Project</th>
                        <th>Device ID</th>
                        <th>Transporter</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            ${data.length > 1000 ? '<p style="font-size:11px; color:#64748b; margin-top:10px;">* Showing first 1,000 records in print preview. Use CSV export for full dataset.</p>' : ''}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
};

// Escape HTML utility
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ESC Key listener to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFleetModal();
        closeAlertsModal();
    }
});

// ========================================================
// VTS LIVE ALERTS MODAL LOGIC (Off-Route, Off-Area, Tamper)
// ========================================================
let currentAlertFilter = 'all';
let currentAlertAreaFilter = 'all';
let currentAlertSearchQuery = '';
let currentAlertPage = 1;
let alertRowsPerPage = 50;

// Initialize Alert Area Dropdown Options
function initVtsAlertAreaOptions() {
    const areaSelect = document.getElementById('vtsAlertAreaFilter');
    if (!areaSelect || !window.VTS_ALERTS_DATA) return;

    const areas = Array.from(new Set(window.VTS_ALERTS_DATA.map(d => d.area).filter(Boolean))).sort();
    areaSelect.innerHTML = '<option value="all">All Mining Areas</option>';
    areas.forEach(area => {
        const count = window.VTS_ALERTS_DATA.filter(d => d.area === area).length;
        const opt = document.createElement('option');
        opt.value = area;
        opt.textContent = `${area} (${count})`;
        areaSelect.appendChild(opt);
    });
}

// Open VTS Live Alerts Master Modal
window.openAlertsModal = function(alertType = 'all') {
    const modal = document.getElementById('vtsAlertsMasterModal');
    if (!modal) return;

    currentAlertFilter = alertType;
    currentAlertPage = 1;

    // Reset search & area
    const searchInput = document.getElementById('vtsAlertSearchInput');
    if (searchInput) searchInput.value = '';
    currentAlertSearchQuery = '';

    const areaSelect = document.getElementById('vtsAlertAreaFilter');
    if (areaSelect) {
        initVtsAlertAreaOptions();
        areaSelect.value = 'all';
    }
    currentAlertAreaFilter = 'all';

    // Update Status Pill UI
    updateAlertStatusPillsUI(alertType);

    // Render Table
    renderAlertsTable();

    // Show Modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

// Close VTS Live Alerts Modal
window.closeAlertsModal = function() {
    const modal = document.getElementById('vtsAlertsMasterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Update Tab Pills in Live Alerts Modal
function updateAlertStatusPillsUI(alertType) {
    const pills = document.querySelectorAll('.vts-alert-tab-btn');
    pills.forEach(pill => {
        const pillType = pill.getAttribute('data-alert-type');
        if (pillType === alertType) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Set Alert Filter
window.setAlertsFilter = function(alertType, btnEl) {
    currentAlertFilter = alertType;
    currentAlertPage = 1;
    updateAlertStatusPillsUI(alertType);
    renderAlertsTable();
};

// Search Filter
window.handleAlertsSearch = function(query) {
    currentAlertSearchQuery = (query || '').toLowerCase().trim();
    currentAlertPage = 1;
    renderAlertsTable();
};

// Area Filter
window.handleAlertsAreaFilter = function(area) {
    currentAlertAreaFilter = area;
    currentAlertPage = 1;
    renderAlertsTable();
};

// Rows Per Page
window.handleAlertsRowsPerPage = function(val) {
    alertRowsPerPage = val === 'all' ? 999999 : parseInt(val, 10);
    currentAlertPage = 1;
    renderAlertsTable();
};

// Filtered Alerts Data
function getFilteredAlertsData() {
    if (!window.VTS_ALERTS_DATA) return [];

    return window.VTS_ALERTS_DATA.filter(item => {
        // 1. Type Filter
        if (currentAlertFilter !== 'all') {
            if (item.type.toLowerCase() !== currentAlertFilter.toLowerCase()) {
                return false;
            }
        }

        // 2. Area Filter
        if (currentAlertAreaFilter !== 'all') {
            if (item.area !== currentAlertAreaFilter) {
                return false;
            }
        }

        // 3. Search Query
        if (currentAlertSearchQuery) {
            const matchVehicle = item.vehicle_no.toLowerCase().includes(currentAlertSearchQuery);
            const matchTransporter = item.transporter.toLowerCase().includes(currentAlertSearchQuery);
            const matchDevice = item.device_id.toLowerCase().includes(currentAlertSearchQuery);
            const matchArea = item.area.toLowerCase().includes(currentAlertSearchQuery);
            const matchProject = item.project.toLowerCase().includes(currentAlertSearchQuery);
            const matchDeviation = (item.deviation || '').toLowerCase().includes(currentAlertSearchQuery);
            if (!matchVehicle && !matchTransporter && !matchDevice && !matchArea && !matchProject && !matchDeviation) {
                return false;
            }
        }

        return true;
    });
}

// Render Alerts Table
function renderAlertsTable() {
    const tableBody = document.getElementById('vtsAlertsTableBody');
    const countBadge = document.getElementById('vtsAlertsFilteredCount');
    const paginationText = document.getElementById('vtsAlertsPaginationText');
    const prevBtn = document.getElementById('vtsAlertsPrevBtn');
    const nextBtn = document.getElementById('vtsAlertsNextBtn');

    if (!tableBody) return;

    const filtered = getFilteredAlertsData();
    const totalRecords = filtered.length;

    if (countBadge) {
        countBadge.textContent = `${totalRecords} Alerts`;
    }

    if (totalRecords === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #94a3b8;">
                    <i class="fa-solid fa-shield-halved" style="font-size: 32px; color: #10b981; margin-bottom: 12px; display: block;"></i>
                    <strong style="font-size: 15px; color: #64748b;">No active violation alerts found</strong>
                    <div style="font-size: 12.5px; margin-top: 4px;">All vehicles operating within geofenced parameters for the selected filters.</div>
                </td>
            </tr>
        `;
        if (paginationText) paginationText.textContent = 'Showing 0 of 0';
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
    }

    // Pagination calculations
    const totalPages = Math.ceil(totalRecords / alertRowsPerPage) || 1;
    if (currentAlertPage > totalPages) currentAlertPage = totalPages;
    if (currentAlertPage < 1) currentAlertPage = 1;

    const startIndex = (currentAlertPage - 1) * alertRowsPerPage;
    const endIndex = Math.min(startIndex + alertRowsPerPage, totalRecords);
    const pageItems = filtered.slice(startIndex, endIndex);

    // Build Rows HTML
    let html = '';
    pageItems.forEach((item, index) => {
        const rowNum = startIndex + index + 1;
        const typeClass = item.type === 'Off-Route' ? 'alert-pill-off-route' : (item.type === 'Off-Area' ? 'alert-pill-off-area' : 'alert-pill-tamper');
        const typeIcon = item.type === 'Off-Route' ? 'fa-route' : (item.type === 'Off-Area' ? 'fa-location-dot' : 'fa-triangle-exclamation');

        html += `
            <tr>
                <td style="text-align: center; color: #64748b; font-weight: 600; font-size: 12px;">${rowNum}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-truck" style="color: #0284c7; font-size: 13px;"></i>
                        <a href="javascript:void(0)" onclick="closeAlertsModal(); openVtsLiveTrackingView('${escapeHtml(item.vehicle_no)}');" class="vts-vehicle-plate" style="text-decoration: none; cursor: pointer;" title="Click to track live on Satellite Map">
                            ${escapeHtml(item.vehicle_no)} <i class="fa-solid fa-location-crosshairs" style="font-size: 11px; margin-left: 4px; color: #0284c7;"></i>
                        </a>
                    </div>
                </td>
                <td>
                    <span class="vts-alert-pill ${typeClass}">
                        <i class="fa-solid ${typeIcon}"></i> ${item.type}
                    </span>
                </td>
                <td>
                    <strong style="color: #0f172a;">${escapeHtml(item.deviation)}</strong>
                    <div style="font-size: 11px; color: #64748b;">${escapeHtml(item.location || '')}</div>
                </td>
                <td>
                    <strong>${escapeHtml(item.area)}</strong>
                    <div style="font-size: 11px; color: #64748b;">${escapeHtml(item.project)}</div>
                </td>
                <td><code class="vts-device-code">${escapeHtml(item.device_id)}</code></td>
                <td><span style="font-size: 12px; color: #334155;">${escapeHtml(item.transporter)}</span></td>
                <td style="font-size: 11.5px; color: #64748b; white-space: nowrap;">
                    <span class="vts-severity-badge severity-${(item.severity||'high').toLowerCase()}">${item.severity}</span>
                    <div style="margin-top: 2px;">${item.timestamp}</div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;

    // Update Pagination UI
    if (paginationText) {
        paginationText.innerHTML = `Showing <strong>${startIndex + 1}–${endIndex}</strong> of <strong>${totalRecords}</strong> alerts (Page ${currentAlertPage} of ${totalPages})`;
    }
    if (prevBtn) prevBtn.disabled = currentAlertPage <= 1;
    if (nextBtn) nextBtn.disabled = currentAlertPage >= totalPages;
}

// Alerts Pagination Controls
window.alertsPagePrev = function() {
    if (currentAlertPage > 1) {
        currentAlertPage--;
        renderAlertsTable();
    }
};

window.alertsPageNext = function() {
    const filtered = getFilteredAlertsData();
    const totalPages = Math.ceil(filtered.length / alertRowsPerPage) || 1;
    if (currentAlertPage < totalPages) {
        currentAlertPage++;
        renderAlertsTable();
    }
};

// Export Alerts to CSV
window.exportAlertsCSV = function() {
    const data = getFilteredAlertsData();
    if (!data || data.length === 0) {
        alert('No alert data available to export.');
        return;
    }

    const headers = ['#', 'Vehicle Number', 'Alert Type', 'Breach / Deviation', 'Mining Area', 'Project', 'Device ID', 'Transporter', 'Severity', 'Timestamp'];
    const csvRows = [headers.join(',')];

    data.forEach((item, idx) => {
        const row = [
            idx + 1,
            `"${item.vehicle_no.replace(/"/g, '""')}"`,
            `"${item.type}"`,
            `"${(item.deviation || '').replace(/"/g, '""')}"`,
            `"${item.area.replace(/"/g, '""')}"`,
            `"${item.project.replace(/"/g, '""')}"`,
            `"\t${item.device_id}"`,
            `"${item.transporter.replace(/"/g, '""')}"`,
            `"${item.severity}"`,
            `"${item.timestamp}"`
        ];
        csvRows.push(row.join(','));
    });

    const csvString = '\uFEFF' + csvRows.join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filterTag = currentAlertFilter === 'all' ? 'ALL_ALERTS' : currentAlertFilter.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `CCL_VTS_Live_Alerts_${filterTag}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Export Alerts to PDF / Print
window.exportAlertsPDF = function() {
    const data = getFilteredAlertsData();
    if (!data || data.length === 0) {
        alert('No alert data available to export.');
        return;
    }

    const filterTag = currentAlertFilter === 'all' ? 'All Live Alerts' : `${currentAlertFilter} Alerts`;
    const printWindow = window.open('', '_blank', 'width=1100,height=850');
    if (!printWindow) {
        alert('Please allow popups to generate the printable PDF report.');
        return;
    }

    let rowsHtml = '';
    data.forEach((item, idx) => {
        const typeColor = item.type === 'Off-Route' ? '#d97706' : (item.type === 'Off-Area' ? '#ea580c' : '#dc2626');
        rowsHtml += `
            <tr>
                <td style="text-align:center;">${idx + 1}</td>
                <td><strong>${escapeHtml(item.vehicle_no)}</strong></td>
                <td><span style="color:${typeColor}; font-weight:700;">${item.type}</span></td>
                <td>${escapeHtml(item.deviation)}</td>
                <td>${escapeHtml(item.area)} (${escapeHtml(item.project)})</td>
                <td>${escapeHtml(item.device_id)}</td>
                <td>${escapeHtml(item.transporter)}</td>
                <td>${escapeHtml(item.timestamp)}</td>
            </tr>
        `;
    });

    const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>CCL VTS Live Alerts Report - ${filterTag}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; color: #1e293b; }
                .header { border-bottom: 2px solid #ea580c; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; }
                .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
                .meta { font-size: 11px; color: #475569; text-align: right; }
                table { width: 100%; border-collapse: collapse; font-size: 11px; }
                th { background-color: #f1f5f9; color: #0f172a; padding: 8px; border: 1px solid #cbd5e1; text-align: left; font-weight: 700; }
                td { padding: 6px 8px; border: 1px solid #e2e8f0; }
                tr:nth-child(even) { background-color: #f8fafc; }
                @media print {
                    @page { margin: 12mm; }
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1 class="title">CENTRAL COALFIELDS LIMITED (CCL)</h1>
                    <div class="subtitle">Vehicle Tracking System (VTS) — Live Violation Alerts Report (${filterTag})</div>
                </div>
                <div class="meta">
                    <div>Generated: ${new Date().toLocaleString()}</div>
                    <div>Total Active Alerts: <strong>${data.length}</strong></div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style="width: 35px; text-align: center;">#</th>
                        <th>Vehicle Number</th>
                        <th>Alert Type</th>
                        <th>Breach Details</th>
                        <th>Mining Area & Project</th>
                        <th>Device ID</th>
                        <th>Transporter</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                    }, 500);
                };
            </script>
        </body>
        </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
};

// ========================================================
// VTS CONFIGURATION ACTIONS (Register, Modify, Routes, Devices)
// ========================================================

// 1. REGISTER NEW VEHICLE / DEVICE
window.openVtsRegisterModal = function() {
    const modal = document.getElementById('vtsRegisterModal');
    if (!modal) return;
    const form = document.getElementById('vtsRegisterForm');
    if (form) form.reset();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeVtsRegisterModal = function() {
    const modal = document.getElementById('vtsRegisterModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

window.handleVtsRegisterSubmit = function(e) {
    e.preventDefault();
    const vehicleNo = (document.getElementById('regVehicleNo')?.value || '').trim().toUpperCase();
    const area = document.getElementById('regArea')?.value || 'Amrapali & Chandragupta';
    const project = (document.getElementById('regProject')?.value || '').trim();
    const deviceId = (document.getElementById('regDeviceId')?.value || '').trim();
    const transporter = (document.getElementById('regTransporter')?.value || '').trim();
    const status = document.getElementById('regStatus')?.value || 'Online';

    if (!vehicleNo || !deviceId) {
        alert('Please fill in required fields (Vehicle Number & Device ID).');
        return;
    }

    if (!window.VTS_FLEET_DATA) window.VTS_FLEET_DATA = [];

    // Create new fleet entry
    const newEntry = {
        sno: String(window.VTS_FLEET_DATA.length + 1),
        vehicle_no: vehicleNo,
        area: area,
        project: project || area,
        device_id: deviceId,
        transporter: transporter || 'CCL Contract Carrier',
        status: status
    };

    window.VTS_FLEET_DATA.unshift(newEntry);

    showVtsToast(`✅ Registered ${vehicleNo} (${deviceId}) successfully!`, '#16a34a');
    closeVtsRegisterModal();

    // Refresh tables if open
    if (typeof renderFleetTable === 'function') renderFleetTable();
    initVtsFleetAreaOptions();
};

// 2. MODIFY EXISTING VEHICLE RECORD
window.openVtsModifyModal = function(targetVehNo = null) {
    const modal = document.getElementById('vtsModifyModal');
    if (!modal || !window.VTS_FLEET_DATA) return;

    const select = document.getElementById('modVehicleSelect');
    if (select) {
        select.innerHTML = '';
        window.VTS_FLEET_DATA.slice(0, 300).forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.vehicle_no;
            opt.textContent = `${v.vehicle_no} — ${v.area} (${v.status})`;
            select.appendChild(opt);
        });

        if (targetVehNo) {
            select.value = targetVehNo;
        }
        onModifyVehicleSelect(select.value);
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeVtsModifyModal = function() {
    const modal = document.getElementById('vtsModifyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

window.onModifyVehicleSelect = function(vehNo) {
    if (!window.VTS_FLEET_DATA) return;
    const v = window.VTS_FLEET_DATA.find(item => item.vehicle_no === vehNo);
    if (!v) return;

    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };

    setVal('modVehicleNo', v.vehicle_no);
    setVal('modArea', v.area);
    setVal('modProject', v.project);
    setVal('modDeviceId', v.device_id);
    setVal('modTransporter', v.transporter);
    setVal('modStatus', v.status);
};

window.handleVtsModifySubmit = function(e) {
    e.preventDefault();
    const origVehNo = document.getElementById('modVehicleSelect')?.value;
    const newVehNo = (document.getElementById('modVehicleNo')?.value || '').trim().toUpperCase();
    const area = document.getElementById('modArea')?.value;
    const project = (document.getElementById('modProject')?.value || '').trim();
    const deviceId = (document.getElementById('modDeviceId')?.value || '').trim();
    const transporter = (document.getElementById('modTransporter')?.value || '').trim();
    const status = document.getElementById('modStatus')?.value || 'Online';

    if (!window.VTS_FLEET_DATA) return;
    const v = window.VTS_FLEET_DATA.find(item => item.vehicle_no === origVehNo);
    if (v) {
        v.vehicle_no = newVehNo;
        v.area = area;
        v.project = project;
        v.device_id = deviceId;
        v.transporter = transporter;
        v.status = status;

        showVtsToast(`✏️ Updated record for ${newVehNo} successfully!`, '#d97706');
        closeVtsModifyModal();

        if (typeof renderFleetTable === 'function') renderFleetTable();
    }
};

// 3. ROUTE & WORKSHOP ASSIGNMENT
window.openVtsRouteWorkshopModal = function() {
    const modal = document.getElementById('vtsRouteWorkshopModal');
    if (!modal || !window.VTS_FLEET_DATA) return;

    const select = document.getElementById('rwVehicleSelect');
    if (select) {
        select.innerHTML = '';
        window.VTS_FLEET_DATA.slice(0, 200).forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.vehicle_no;
            opt.textContent = `${v.vehicle_no} — ${v.area} (${v.status})`;
            select.appendChild(opt);
        });
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeVtsRouteWorkshopModal = function() {
    const modal = document.getElementById('vtsRouteWorkshopModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

window.handleVtsRouteWorkshopSubmit = function(e) {
    e.preventDefault();
    const vehNo = document.getElementById('rwVehicleSelect')?.value;
    const route = document.getElementById('rwRouteSelect')?.value;
    const state = document.getElementById('rwStateSelect')?.value;

    const v = window.VTS_FLEET_DATA?.find(item => item.vehicle_no === vehNo);
    if (v) {
        v.status = state;
    }

    showVtsToast(`🛣️ Assigned route & set status to ${state} for ${vehNo}!`, '#0284c7');
    closeVtsRouteWorkshopModal();
    if (typeof renderFleetTable === 'function') renderFleetTable();
};

// 4. DEVICE ACTIONS (REMOVE / REINSTALL)
window.openVtsDeviceActionModal = function() {
    const modal = document.getElementById('vtsDeviceActionModal');
    if (!modal || !window.VTS_FLEET_DATA) return;

    const select = document.getElementById('daVehicleSelect');
    if (select) {
        select.innerHTML = '';
        window.VTS_FLEET_DATA.slice(0, 200).forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.vehicle_no;
            opt.textContent = `${v.vehicle_no} (Device: ${v.device_id})`;
            select.appendChild(opt);
        });
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeVtsDeviceActionModal = function() {
    const modal = document.getElementById('vtsDeviceActionModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

window.handleVtsDeviceActionSubmit = function(e) {
    e.preventDefault();
    const vehNo = document.getElementById('daVehicleSelect')?.value;
    const action = document.getElementById('daActionType')?.value;
    const notes = document.getElementById('daNotes')?.value;

    const v = window.VTS_FLEET_DATA?.find(item => item.vehicle_no === vehNo);
    if (v && action === 'deactivate') {
        v.status = 'Offline';
    }

    showVtsToast(`📡 Device action applied for ${vehNo} successfully!`, '#0284c7');
    closeVtsDeviceActionModal();
    if (typeof renderFleetTable === 'function') renderFleetTable();
};

// Sleek Toast Utility
function showVtsToast(message, bgColor = '#0284c7') {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.right = '28px';
    toast.style.background = bgColor;
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
    toast.style.zIndex = '999999';
    toast.style.fontWeight = '700';
    toast.style.fontSize = '13px';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

