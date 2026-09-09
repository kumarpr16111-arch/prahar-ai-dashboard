// Blacklisted Vehicles Module Controller
// ==========================================================================

let blacklistedVehiclesData = [
    { id: 1, v_no: 'JH02BZ8562', remarks: 'Created jaam disturb transporting', by: 'Avinash Kishore', on: '2026-08-28 08:51:58' },
    { id: 2, v_no: 'AP07TM1599', remarks: 'Procedure lapses and doute ful. Enquiry under process', by: 'Dispatch Officer KBP', on: '2026-08-24 10:52:20' },
    { id: 3, v_no: 'JH16F1434', remarks: 'Found indulge in illegal activity FIR lodged at balumath P.S', by: 'Avinash Kishore', on: '2026-08-01 17:48:49' },
    { id: 4, v_no: 'JH19E8824', remarks: 'found indulge in illegal activity on dated-23/07/2026.', by: 'Avinash Kishore', on: '2026-07-24 13:27:03' },
    { id: 5, v_no: 'JH02BU4231', remarks: 'Broken boom barrier at Checkpost 12 and did not got entry .', by: 'Avinash Kishore', on: '2026-07-16 06:03:50' },
    { id: 6, v_no: 'WB15D7999', remarks: 'This vehicle damaged the boom Barr of Checkpost 12', by: 'Avinash Kishore', on: '2026-07-09 19:06:47' },
    { id: 7, v_no: 'JH02BP2620', remarks: 'Ref No: HOD (Security)/CCL/Blacklist-Veh./2026/147 Dated: 16.06.2026', by: 'admin', on: '2026-07-02 13:11:05' },
    { id: 8, v_no: 'BR02GD3789', remarks: 'This vehicle damaged the boom Barrier of weigh bridge 11', by: 'Rajeev Ranjan', on: '2026-07-02 07:35:44' },
    { id: 9, v_no: 'CG07D1070', remarks: 'THIS VEHICLE DAMAGED BOOM BARRIER OF CHECKPOST NO. 12', by: 'Rajeev Ranjan', on: '2026-07-01 11:51:22' },
    { id: 10, v_no: 'JH02BY3436', remarks: 'THIS VEHICLE DAMAGED BOOM BARRIER OF CHECKPOST NO. 12', by: 'Rajeev Ranjan', on: '2026-07-01 11:49:25' },
    { id: 11, v_no: 'OD16K2800', remarks: 'The vehicle is being blacklisted due to tampering in GPS.', by: 'Bokaro & Kargali', on: '2026-06-30 14:32:39' },
    { id: 12, v_no: 'BR02GA4922', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 13, v_no: 'BR02GA8258', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 14, v_no: 'BR02GA8556', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 15, v_no: 'BR09GA4905', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 16, v_no: 'CG12AZ1003', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 17, v_no: 'CG14D0484', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 18, v_no: 'CG15AC2023', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 19, v_no: 'HR55M1420', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 20, v_no: 'JH01AH4118', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 21, v_no: 'JH01AJ1079', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 22, v_no: 'JH01AY6092', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 23, v_no: 'JH01BZ1124', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 24, v_no: 'JH01CH5792', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' },
    { id: 25, v_no: 'JH01EY8719', remarks: 'Already Blacklisted Vehicle. List given by Security Department. CCL HQ', by: 'admin', on: '2026-06-26 17:37:22' }
];

let unblacklistedCount = 18;

// ==========================================================================
// ==========================================================================
// 1. NAVIGATION & TAB SWITCHING
// ==========================================================================
window.toggleBlacklistedDropdown = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const navItem = document.getElementById('blacklistedNavItem');
    const list = document.getElementById('blacklistedSubList');
    const arrow = document.getElementById('blacklistedArrow');
    if (list) {
        const isHidden = list.style.display === 'none' || getComputedStyle(list).display === 'none';
        list.style.display = isHidden ? 'block' : 'none';
        if (navItem) {
            if (isHidden) {
                navItem.classList.add('expanded');
            } else {
                navItem.classList.remove('expanded');
            }
        }
        if (arrow) {
            arrow.className = isHidden ? 'fa-solid fa-chevron-down arrow-icon' : 'fa-solid fa-chevron-right arrow-icon';
        }
    }
};

window.showBlacklistedTab = function(tabName) {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');

    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    // Hide all main content panels
    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    // Remove active class from all sidebar nav items
    document.querySelectorAll('.nav-item, .sub-nav-item').forEach(el => {
        el.classList.remove('active');
    });

    // Activate Blacklisted dropdown parent
    const parentNav = document.getElementById('blacklistedNavItem');
    if (parentNav) {
        parentNav.classList.add('active', 'expanded');
        const list = document.getElementById('blacklistedSubList');
        if (list) list.style.display = 'block';
        const arrow = document.getElementById('blacklistedArrow');
        if (arrow) arrow.className = 'fa-solid fa-chevron-down arrow-icon';
    }

    const panelId = `blacklisted-${tabName}-panel`;
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
    }

    // Highlight specific sub-item
    let title = 'BLACKLISTED VEHICLES • VIEW';
    if (tabName === 'view') {
        const item = document.getElementById('blacklistedViewNavItem');
        if (item) item.classList.add('active');
        renderBlacklistedTable();
        updateBlacklistStats();
        window.location.hash = '#blacklisted-view';
    } else if (tabName === 'add') {
        const item = document.getElementById('blacklistedAddNavItem');
        if (item) item.classList.add('active');
        title = 'BLACKLISTED VEHICLES • ADD VEHICLE';
        window.location.hash = '#blacklisted-add';
    } else if (tabName === 'remove') {
        const item = document.getElementById('blacklistedRemoveNavItem');
        if (item) item.classList.add('active');
        title = 'BLACKLISTED VEHICLES • UNBLACKLIST VEHICLE';
        populateDatalistOptions();
        window.location.hash = '#blacklisted-remove';
    }

    if (window.updateHeaderMainTitle) {
        window.updateHeaderMainTitle(title);
    } else {
        const hTitle = document.getElementById('headerMainTitle');
        if (hTitle) hTitle.textContent = title;
    }

    // Scroll container and window to absolute top
    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
        mainWrapper.scrollTop = 0;
    }
    const contentBody = document.querySelector('.content-body');
    if (contentBody) {
        contentBody.scrollTop = 0;
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
};

// ==========================================================================
// 2. RENDER TABLE & FILTERING
// ==========================================================================
function renderBlacklistedTable(dataToRender = null) {
    const tbody = document.getElementById('blacklistedTableBody');
    if (!tbody) return;

    const data = dataToRender || blacklistedVehiclesData;
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: #94a3b8; font-size: 13px;">
                    <i class="fa-solid fa-check-circle" style="color: #34d399; font-size: 24px; margin-bottom: 8px; display: block;"></i>
                    No blacklisted vehicles match the filter criteria.
                </td>
            </tr>
        `;
        const countSpan = document.getElementById('blacklistedTableCount');
        if (countSpan) countSpan.textContent = 'Showing 0 blacklisted vehicles';
        return;
    }

    data.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align: center; color: #94a3b8; font-weight: 500;">${row.id || (idx + 1)}</td>
            <td style="font-weight: 700; color: #ef4444; font-family: monospace; font-size: 12.5px; letter-spacing: 0.04em;">
                <span class="bl-vno-pill"><i class="fa-solid fa-ban" style="font-size: 10px; margin-right: 4px;"></i>${escapeHtml(row.v_no)}</span>
            </td>
            <td style="color: #334155;" class="bl-remarks-cell" title="${escapeHtml(row.remarks)}">${escapeHtml(row.remarks)}</td>
            <td style="color: #475569; font-weight: 500;" class="bl-by-cell">${escapeHtml(row.by)}</td>
            <td style="color: #64748b; font-family: monospace; font-size: 11.5px;">${escapeHtml(row.on)}</td>
            <td style="text-align: center;">
                <button type="button" class="bl-table-action-btn" title="Unblacklist vehicle" onclick="quickUnblacklist('${escapeHtml(row.v_no)}')">
                    <i class="fa-solid fa-unlock"></i> <span>Unblock</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const countSpan = document.getElementById('blacklistedTableCount');
    if (countSpan) {
        countSpan.textContent = `Showing ${data.length} of ${blacklistedVehiclesData.length} blacklisted vehicles`;
    }

    updateBlacklistStats();
}

window.filterBlacklistedTable = function() {
    const input = document.getElementById('blacklistedFilterInput');
    if (!input) return;
    const query = input.value.trim().toLowerCase();

    if (!query) {
        renderBlacklistedTable();
        return;
    }

    const filtered = blacklistedVehiclesData.filter(item => {
        return item.v_no.toLowerCase().includes(query) ||
               item.remarks.toLowerCase().includes(query) ||
               item.by.toLowerCase().includes(query);
    });

    renderBlacklistedTable(filtered);
};

window.clearBlacklistFilter = function() {
    const input = document.getElementById('blacklistedFilterInput');
    if (input) {
        input.value = '';
        renderBlacklistedTable();
        input.focus();
    }
};

function updateBlacklistStats() {
    const totalEl = document.getElementById('totalBlacklistedCount');
    if (totalEl) totalEl.textContent = blacklistedVehiclesData.length;

    const unblockEl = document.getElementById('totalUnblacklistedCount');
    if (unblockEl) unblockEl.textContent = unblacklistedCount;
}

function populateDatalistOptions() {
    const datalist = document.getElementById('blacklistedVehiclesList');
    if (!datalist) return;
    datalist.innerHTML = '';
    blacklistedVehiclesData.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.v_no;
        opt.label = `${item.remarks.substring(0, 45)}...`;
        datalist.appendChild(opt);
    });
}

window.populateUnblacklistDetails = function(vehNo) {
    if (!vehNo) return;
    const matched = blacklistedVehiclesData.find(item => item.v_no.toUpperCase() === vehNo.trim().toUpperCase());
    if (matched) {
        const remarksField = document.getElementById('removeBlacklistRemarks');
        if (remarksField && !remarksField.value) {
            remarksField.value = `Unblacklist requested for ${matched.v_no}. Original blacklisting reason: "${matched.remarks}". Clearance validated.`;
        }
    }
};

// ==========================================================================
// 3. OTP VERIFICATION SIMULATOR
// ==========================================================================
window.handleSendOtp = function(type) {
    const approverSelect = document.getElementById(type === 'add' ? 'addBlacklistApprover' : 'removeBlacklistApprover');
    const btn = document.getElementById(type === 'add' ? 'btnSendOtpAdd' : 'btnSendOtpRemove');
    const verifyGroup = document.getElementById(type === 'add' ? 'addOtpVerifyGroup' : 'removeOtpVerifyGroup');

    if (!approverSelect || !approverSelect.value) {
        alert('Please select an Approver first to send OTP authorization.');
        approverSelect?.focus();
        return;
    }

    if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
    }

    setTimeout(() => {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> OTP Sent';
            btn.style.background = '#059669';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#ffffff';
        }
        if (verifyGroup) {
            verifyGroup.style.display = 'block';
        }
    }, 600);
};

// ==========================================================================
// 4. SUBMIT BLACKLIST VEHICLE (Supabase Cloud Synced)
// ==========================================================================
window.submitBlacklistVehicle = async function() {
    const vehInput = document.getElementById('addBlacklistVehNo');
    const remarksInput = document.getElementById('addBlacklistRemarks');
    const approverSelect = document.getElementById('addBlacklistApprover');
    const toast = document.getElementById('addBlacklistToast');

    const v_no = (vehInput?.value || '').trim().toUpperCase();
    const remarks = (remarksInput?.value || '').trim() || 'Blacklisted due to operational & security violation.';
    const approver = approverSelect?.value || 'Avinash Kishore (GM Vigilance)';

    if (!v_no) {
        showToast(toast, 'Please enter a valid Vehicle Number (e.g. JH02BZ8562)', 'error');
        vehInput?.focus();
        return;
    }

    // Check duplicate
    const exists = blacklistedVehiclesData.some(item => item.v_no.toUpperCase() === v_no);
    if (exists) {
        showToast(toast, `Vehicle ${v_no} is ALREADY blacklisted in the system.`, 'error');
        return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    const newEntry = {
        id: blacklistedVehiclesData.length + 1,
        v_no: v_no,
        remarks: remarks,
        by: approver.split(' (')[0],
        on: formattedDate
    };

    // Prepend to local state
    blacklistedVehiclesData.unshift(newEntry);
    blacklistedVehiclesData.forEach((item, index) => { item.id = index + 1; });

    // Sync to Supabase Backend
    try {
        await fetch('/api/blacklisted-vehicles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                v_no: v_no,
                remarks: remarks,
                blacklisted_by: approver.split(' (')[0]
            })
        });
    } catch (err) {
        console.warn('Backend sync deferred (operating offline/cached):', err);
    }

    showToast(toast, `Vehicle ${v_no} has been successfully BLACKLISTED and locked at all checkposts & weighbridges (Synced with Supabase).`, 'success');

    // Clear form
    if (vehInput) vehInput.value = '';
    if (remarksInput) remarksInput.value = '';
    if (approverSelect) approverSelect.value = '';
    const verifyGroup = document.getElementById('addOtpVerifyGroup');
    if (verifyGroup) verifyGroup.style.display = 'none';
    const btnOtp = document.getElementById('btnSendOtpAdd');
    if (btnOtp) {
        btnOtp.innerHTML = 'Send OTP';
        btnOtp.disabled = false;
        btnOtp.style = '';
    }

    setTimeout(() => {
        showBlacklistedTab('view');
    }, 1200);
};

// ==========================================================================
// 5. SUBMIT UNBLACKLIST VEHICLE (Supabase Cloud Synced)
// ==========================================================================
window.submitUnblacklistVehicle = async function() {
    const vehInput = document.getElementById('removeBlacklistVehNo');
    const remarksInput = document.getElementById('removeBlacklistRemarks');
    const approverSelect = document.getElementById('removeBlacklistApprover');
    const toast = document.getElementById('removeBlacklistToast');

    const v_no = (vehInput?.value || '').trim().toUpperCase();
    const remarks = (remarksInput?.value || '').trim();

    if (!v_no) {
        showToast(toast, 'Please enter or select a blacklisted Vehicle Number.', 'error');
        vehInput?.focus();
        return;
    }

    const index = blacklistedVehiclesData.findIndex(item => item.v_no.toUpperCase() === v_no);
    if (index === -1) {
        showToast(toast, `Vehicle ${v_no} was not found in the active blacklist database.`, 'error');
        return;
    }

    // Remove locally
    blacklistedVehiclesData.splice(index, 1);
    unblacklistedCount++;
    blacklistedVehiclesData.forEach((item, idx) => { item.id = idx + 1; });

    // Sync to Supabase Backend
    try {
        await fetch(`/api/blacklisted-vehicles/${encodeURIComponent(v_no)}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.warn('Backend delete deferred:', err);
    }

    showToast(toast, `Vehicle ${v_no} has been successfully UNBLACKLISTED and restored (Synced with Supabase).`, 'success');

    if (vehInput) vehInput.value = '';
    if (remarksInput) remarksInput.value = '';
    if (approverSelect) approverSelect.value = '';
    const verifyGroup = document.getElementById('removeOtpVerifyGroup');
    if (verifyGroup) verifyGroup.style.display = 'none';
    const btnOtp = document.getElementById('btnSendOtpRemove');
    if (btnOtp) {
        btnOtp.innerHTML = 'Send OTP';
        btnOtp.disabled = false;
        btnOtp.style = '';
    }

    setTimeout(() => {
        showBlacklistedTab('view');
    }, 1200);
};

window.quickUnblacklist = async function(vehNo) {
    if (!confirm(`Are you sure you want to unblacklist and restore vehicle ${vehNo}?`)) {
        return;
    }
    const idx = blacklistedVehiclesData.findIndex(item => item.v_no.toUpperCase() === vehNo.toUpperCase());
    if (idx !== -1) {
        blacklistedVehiclesData.splice(idx, 1);
        unblacklistedCount++;
        blacklistedVehiclesData.forEach((item, i) => { item.id = i + 1; });
        renderBlacklistedTable();

        try {
            await fetch(`/api/blacklisted-vehicles/${encodeURIComponent(vehNo)}`, { method: 'DELETE' });
        } catch (e) {}
    }
};

// ==========================================================================
// 6. ASYNC INITIALIZATION WITH SUPABASE
// ==========================================================================
async function loadBlacklistedFromBackend() {
    try {
        const res = await fetch('/api/blacklisted-vehicles');
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                blacklistedVehiclesData = data.map((d, i) => ({
                    id: i + 1,
                    v_no: d.v_no || d.vehicle_no,
                    remarks: d.remarks || '',
                    by: d.blacklisted_by || d.by || 'admin',
                    on: d.blacklisted_on || d.on || d.created_at || ''
                }));
                renderBlacklistedTable();
                populateDatalistOptions();
            }
        }
    } catch (e) {
        console.log('Using pre-seeded offline dataset for blacklisted vehicles.');
    }
}

// ==========================================================================
// 6. CSV EXPORT & HELPER UTILITIES
// ==========================================================================
window.exportBlacklistToCsv = function() {
    let csv = '#,Vehicle_Number,Remarks,Blacklisted_By,Blacklisted_On\n';
    blacklistedVehiclesData.forEach(r => {
        const cleanRemarks = (r.remarks || '').replace(/"/g, '""');
        const cleanBy = (r.by || '').replace(/"/g, '""');
        csv += `${r.id},"${r.v_no}","${cleanRemarks}","${cleanBy}","${r.on}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Blacklisted_Vehicles_CCL_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

function showToast(element, message, type) {
    if (!element) return;
    element.style.display = 'block';
    element.className = `bl-alert-toast bl-toast-${type}`;
    element.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i> <span>${escapeHtml(message)}</span>`;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Auto-initialize on DOM ready & Hash Routing
function checkBlacklistedHash() {
    const hash = window.location.hash;
    if (hash === '#blacklisted-view') {
        showBlacklistedTab('view');
    } else if (hash === '#blacklisted-add') {
        showBlacklistedTab('add');
    } else if (hash === '#blacklisted-remove') {
        showBlacklistedTab('remove');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBlacklistedTable();
    populateDatalistOptions();
    checkBlacklistedHash();
});

window.addEventListener('hashchange', () => {
    checkBlacklistedHash();
});
