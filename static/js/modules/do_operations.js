// ========================================================
// Delivery Order (DO) Operations & Table Controller
// ========================================================
let allInternalDoRecords = (typeof INTERNAL_DO_DATA !== 'undefined') ? INTERNAL_DO_DATA : [];
let currentDoSearchQuery = '';
let currentDoAreaFilter = 'all';
let currentDoGradeFilter = 'all';
let currentDoPage = 1;
let currentDoPageSize = 50;
let currentDoSortColumn = '';
let currentDoSortAsc = true;
let isDoInitialized = false;

window.showViewInternalDO = function() {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');
    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    // Highlight DO Operations dropdown and sub-item
    const doOpsNavItem = document.getElementById('doOpsNavItem');
    const doOpsSubList = document.getElementById('doOpsSubList');
    const doOpsArrow = document.getElementById('doOpsArrow');

    if (doOpsSubList) doOpsSubList.style.display = 'block';
    if (doOpsArrow) doOpsArrow.className = 'fa-solid fa-chevron-down arrow-icon';

    // Clear active states on sidebar items
    document.querySelectorAll('.sub-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (doOpsNavItem) doOpsNavItem.classList.add('active');

    const activeItem = document.getElementById('subNavItemViewInternalDo');
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.querySelector('.sub-nav-link')?.classList.add('active');
    }

    updateHeaderMainTitle('INTERNAL DELIVERY ORDER (DO) OPERATIONS');

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === 'view-internal-do-view') {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    window.location.hash = '#view-internal-do';
    initInternalDoData();
};

window.showAddInternalDO = function() {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');
    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    const doOpsNavItem = document.getElementById('doOpsNavItem');
    const doOpsSubList = document.getElementById('doOpsSubList');
    const doOpsArrow = document.getElementById('doOpsArrow');
    if (doOpsSubList) doOpsSubList.style.display = 'block';
    if (doOpsArrow) doOpsArrow.className = 'fa-solid fa-chevron-down arrow-icon';

    document.querySelectorAll('.sub-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (doOpsNavItem) doOpsNavItem.classList.add('active');

    const activeItem = document.getElementById('subNavItemAddInternalDo');
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.querySelector('.sub-nav-link')?.classList.add('active');
    }

    updateHeaderMainTitle('ADD INTERNAL DO DATA');

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === 'add-internal-do-view') {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    window.location.hash = '#add-internal-do';
};

window.showEditInternalDO = function() {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');
    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    const doOpsNavItem = document.getElementById('doOpsNavItem');
    const doOpsSubList = document.getElementById('doOpsSubList');
    const doOpsArrow = document.getElementById('doOpsArrow');
    if (doOpsSubList) doOpsSubList.style.display = 'block';
    if (doOpsArrow) doOpsArrow.className = 'fa-solid fa-chevron-down arrow-icon';

    document.querySelectorAll('.sub-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-nav-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (doOpsNavItem) doOpsNavItem.classList.add('active');

    const activeItem = document.getElementById('subNavItemEditInternalDo');
    if (activeItem) {
        activeItem.classList.add('active');
        activeItem.querySelector('.sub-nav-link')?.classList.add('active');
    }

    updateHeaderMainTitle('EDIT DO OR MAP TO WEIGHBRIDGE');

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === 'edit-internal-do-view') {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    window.location.hash = '#edit-internal-do';
    populateEditDoSelector();
};

window.showRoadDispatchView = function() {
    document.body.classList.remove('alert-mode-active');
    document.body.classList.remove('gis-mode-active');
    const mainSidebar = document.getElementById('mainSidebarMenu');
    const alertSidebar = document.getElementById('alertSidebarMenu');
    const topTabs = document.getElementById('topTabsCard') || document.querySelector('.tabs-card');
    if (mainSidebar) mainSidebar.style.display = 'block';
    if (alertSidebar) alertSidebar.style.display = 'none';
    if (topTabs) topTabs.style.display = 'none';

    document.querySelectorAll('.sub-sub-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-sub-nav-link').forEach(el => el.classList.remove('active'));
    document.getElementById('roadDispatchNavItem')?.classList.add('active');

    updateHeaderMainTitle('ROAD DISPATCH OPERATIONS');

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === 'road-dispatch-view') {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    window.location.hash = '#road-dispatch';
};

window.initInternalDoData = async function() {
    if (!allInternalDoRecords || allInternalDoRecords.length === 0) {
        if (typeof INTERNAL_DO_DATA !== 'undefined' && INTERNAL_DO_DATA.length > 0) {
            allInternalDoRecords = INTERNAL_DO_DATA;
        } else {
            try {
                const res = await fetch('https://prahar-ai-dashboard.vercel.app/static/do_data.json');
                if (res.ok) {
                    allInternalDoRecords = await res.json();
                }
            } catch (e) {
                console.warn('DO data load error:', e);
            }
        }
    }

    populateDoFilterDropdowns();
    updateDoKpis();
    renderInternalDoTable();
    isDoInitialized = true;
};

function populateDoFilterDropdowns() {
    const areaSelect = document.getElementById('doAreaFilter');
    const gradeSelect = document.getElementById('doGradeFilter');
    if (!areaSelect || !gradeSelect || !allInternalDoRecords) return;

    // Collect Unique Areas
    const areas = new Set();
    const grades = new Set();

    allInternalDoRecords.forEach(r => {
        if (r.from_area && r.from_area !== 'NA') areas.add(r.from_area.trim());
        if (r.to_area && r.to_area !== 'NA') areas.add(r.to_area.trim());
        if (r.grade && r.grade !== 'NA') {
            r.grade.split(',').forEach(g => {
                const gt = g.trim();
                if (gt) grades.add(gt);
            });
        }
    });

    const sortedAreas = Array.from(areas).sort();
    const sortedGrades = Array.from(grades).sort();

    areaSelect.innerHTML = '<option value="all">All Areas (' + sortedAreas.length + ')</option>' + 
        sortedAreas.map(a => `<option value="${a}">${a}</option>`).join('');

    gradeSelect.innerHTML = '<option value="all">All Coal Grades (' + sortedGrades.length + ')</option>' + 
        sortedGrades.map(g => `<option value="${g}">${g}</option>`).join('');
}

function updateDoKpis() {
    if (!allInternalDoRecords) return;
    const totalCountEl = document.getElementById('doKpiTotalCount');
    const totalOrderEl = document.getElementById('doKpiTotalOrderQty');
    const totalBalEl = document.getElementById('doKpiTotalBalanceQty');

    let sumOrder = 0;
    let sumBal = 0;

    allInternalDoRecords.forEach(r => {
        const o = parseFloat(r.order_qty) || 0;
        const b = parseFloat(r.balance_qty) || 0;
        sumOrder += o;
        sumBal += b;
    });

    if (totalCountEl) totalCountEl.textContent = allInternalDoRecords.length;
    if (totalOrderEl) totalOrderEl.textContent = (sumOrder / 1000000).toFixed(2) + 'M';
    if (totalBalEl) totalBalEl.textContent = (sumBal / 1000000).toFixed(2) + 'M';
}

function getFilteredDoRecords() {
    if (!allInternalDoRecords) return [];

    return allInternalDoRecords.filter(item => {
        // Search query filter
        let matchQuery = true;
        if (currentDoSearchQuery) {
            const q = currentDoSearchQuery.toLowerCase();
            matchQuery = (
                (item.do_no && item.do_no.toLowerCase().includes(q)) ||
                (item.contractor && item.contractor.toLowerCase().includes(q)) ||
                (item.grade && item.grade.toLowerCase().includes(q)) ||
                (item.from_area && item.from_area.toLowerCase().includes(q)) ||
                (item.from_plant && item.from_plant.toLowerCase().includes(q)) ||
                (item.from_checkposts && item.from_checkposts.toLowerCase().includes(q)) ||
                (item.from_wbs && item.from_wbs.toLowerCase().includes(q)) ||
                (item.from_locations && item.from_locations.toLowerCase().includes(q)) ||
                (item.to_area && item.to_area.toLowerCase().includes(q)) ||
                (item.to_plant && item.to_plant.toLowerCase().includes(q)) ||
                (item.to_checkposts && item.to_checkposts.toLowerCase().includes(q)) ||
                (item.to_wbs && item.to_wbs.toLowerCase().includes(q)) ||
                (item.to_locations && item.to_locations.toLowerCase().includes(q)) ||
                (item.created_user && item.created_user.toLowerCase().includes(q)) ||
                (item.created_on && item.created_on.toLowerCase().includes(q))
            );
        }

        // Area filter
        let matchArea = true;
        if (currentDoAreaFilter !== 'all') {
            matchArea = (item.from_area === currentDoAreaFilter || item.to_area === currentDoAreaFilter);
        }

        // Grade filter
        let matchGrade = true;
        if (currentDoGradeFilter !== 'all') {
            matchGrade = item.grade && item.grade.includes(currentDoGradeFilter);
        }

        return matchQuery && matchArea && matchGrade;
    }).sort((a, b) => {
        if (!currentDoSortColumn) return 0;
        let valA = a[currentDoSortColumn] || '';
        let valB = b[currentDoSortColumn] || '';

        if (currentDoSortColumn === 'order_qty' || currentDoSortColumn === 'balance_qty' || currentDoSortColumn === 's_no') {
            const numA = parseFloat(valA) || 0;
            const numB = parseFloat(valB) || 0;
            return currentDoSortAsc ? (numA - numB) : (numB - numA);
        }

        return currentDoSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
}

window.renderInternalDoTable = function() {
    const tbody = document.getElementById('internalDoTableBody');
    const counterEl = document.getElementById('doResultsCounter');
    const paginationEl = document.getElementById('doPaginationControls');
    const pageInfoEl = document.getElementById('doPageInfoText');
    const filteredNotice = document.getElementById('doFilteredNotice');
    if (!tbody) return;

    const filtered = getFilteredDoRecords();
    const totalRecords = filtered.length;

    // Filter indicator
    if (filteredNotice) {
        filteredNotice.style.display = (currentDoSearchQuery || currentDoAreaFilter !== 'all' || currentDoGradeFilter !== 'all') ? 'inline-block' : 'none';
    }

    if (totalRecords === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="19" style="text-align: center; padding: 48px 20px; color: #64748b; background: #0f131a;">
                    <i class="fa-solid fa-file-circle-xmark" style="font-size: 32px; color: #475569; margin-bottom: 8px;"></i>
                    <div style="font-size: 14px; font-weight: 600; color: #94a3b8;">No Delivery Orders Matched</div>
                    <div style="font-size: 12px; margin-top: 4px;">Try modifying your search or clearing active filters.</div>
                </td>
            </tr>
        `;
        if (counterEl) counterEl.innerHTML = `Showing <strong>0</strong> of <strong>${allInternalDoRecords.length}</strong> Delivery Orders`;
        if (paginationEl) paginationEl.innerHTML = '';
        if (pageInfoEl) pageInfoEl.textContent = 'No records';
        return;
    }

    // Pagination calculations
    const pageSize = currentDoPageSize === 'all' ? totalRecords : parseInt(currentDoPageSize, 10);
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;
    if (currentDoPage > totalPages) currentDoPage = totalPages;
    if (currentDoPage < 1) currentDoPage = 1;

    const startIndex = (currentDoPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalRecords);
    const pageRows = filtered.slice(startIndex, endIndex);

    if (counterEl) {
        counterEl.innerHTML = `Showing <strong>${startIndex + 1}–${endIndex}</strong> of <strong>${totalRecords}</strong> Delivery Orders (Total Database: ${allInternalDoRecords.length})`;
    }

    if (pageInfoEl) {
        pageInfoEl.innerHTML = `Page <strong>${currentDoPage}</strong> of <strong>${totalPages}</strong> • ${totalRecords} matching allocations`;
    }

    // Helper for NA formatting
    const formatCell = (val) => {
        if (!val || val.trim() === '' || val.trim() === 'NA') {
            return `<span class="na-cell">NA</span>`;
        }
        return val;
    };

    const formatNum = (val) => {
        if (!val) return '0.000';
        const num = parseFloat(val);
        if (isNaN(num)) return val;
        const cls = num === 0 ? 'qty-zero' : '';
        return `<span class="${cls}">${num.toLocaleString('en-IN', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</span>`;
    };

    tbody.innerHTML = pageRows.map(row => {
        return `
            <tr>
                <td class="sno-col">${row.s_no}</td>
                <td class="dono-cell" onclick="openDoDetailModal('${row.do_no}')" title="Click to view full DO routing details">${row.do_no}</td>
                <td style="max-width: 240px; overflow: hidden; text-overflow: ellipsis;" title="${row.contractor}">${row.contractor}</td>
                <td><span style="background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 2px 6px; border-radius: 3px; font-weight: 500;">${row.grade || 'NA'}</span></td>
                <td class="qty-cell">${formatNum(row.order_qty)}</td>
                <td class="qty-cell">${formatNum(row.balance_qty)}</td>
                <td class="date-cell">${row.validity || 'NA'}</td>
                <!-- From Group -->
                <td><strong>${formatCell(row.from_area)}</strong></td>
                <td>${formatCell(row.from_plant)}</td>
                <td>${formatCell(row.from_checkposts)}</td>
                <td>${formatCell(row.from_wbs)}</td>
                <td>${formatCell(row.from_locations)}</td>
                <!-- To Group -->
                <td><strong>${formatCell(row.to_area)}</strong></td>
                <td>${formatCell(row.to_plant)}</td>
                <td>${formatCell(row.to_checkposts)}</td>
                <td>${formatCell(row.to_wbs)}</td>
                <td>${formatCell(row.to_locations)}</td>
                <!-- Created Group -->
                <td class="user-cell"><i class="fa-regular fa-user" style="font-size: 10px; color: #94a3b8; margin-right: 4px;"></i>${formatCell(row.created_user)}</td>
                <td class="date-cell">${formatCell(row.created_on)}</td>
            </tr>
        `;
    }).join('');

    // Render Pagination Controls
    if (paginationEl) {
        if (totalPages <= 1) {
            paginationEl.innerHTML = '';
        } else {
            let html = '';
            html += `<button class="do-page-btn" onclick="changeDoPage(1)" ${currentDoPage === 1 ? 'disabled' : ''} title="First Page"><i class="fa-solid fa-angles-left"></i></button>`;
            html += `<button class="do-page-btn" onclick="changeDoPage(${currentDoPage - 1})" ${currentDoPage === 1 ? 'disabled' : ''} title="Previous Page"><i class="fa-solid fa-angle-left"></i> Prev</button>`;

            // Dynamic Window of Pages
            let startPage = Math.max(1, currentDoPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }

            for (let p = startPage; p <= endPage; p++) {
                html += `<button class="do-page-btn ${p === currentDoPage ? 'active' : ''}" onclick="changeDoPage(${p})">${p}</button>`;
            }

            html += `<button class="do-page-btn" onclick="changeDoPage(${currentDoPage + 1})" ${currentDoPage === totalPages ? 'disabled' : ''} title="Next Page">Next <i class="fa-solid fa-angle-right"></i></button>`;
            html += `<button class="do-page-btn" onclick="changeDoPage(${totalPages})" ${currentDoPage === totalPages ? 'disabled' : ''} title="Last Page"><i class="fa-solid fa-angles-right"></i></button>`;
            paginationEl.innerHTML = html;
        }
    }
};

window.handleDoSearch = function() {
    const input = document.getElementById('doSearchInput');
    const clearBtn = document.getElementById('btnClearDoSearch');
    if (!input) return;

    currentDoSearchQuery = input.value.trim();
    if (clearBtn) {
        clearBtn.style.display = currentDoSearchQuery ? 'block' : 'none';
    }
    currentDoPage = 1;
    renderInternalDoTable();
};

window.clearDoSearch = function() {
    const input = document.getElementById('doSearchInput');
    const clearBtn = document.getElementById('btnClearDoSearch');
    if (input) input.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    currentDoSearchQuery = '';
    currentDoPage = 1;
    renderInternalDoTable();
};

window.handleDoFilter = function() {
    currentDoAreaFilter = document.getElementById('doAreaFilter')?.value || 'all';
    currentDoGradeFilter = document.getElementById('doGradeFilter')?.value || 'all';
    currentDoPage = 1;
    renderInternalDoTable();
};

window.handleDoPageSize = function() {
    currentDoPageSize = document.getElementById('doPageSizeSelect')?.value || '50';
    currentDoPage = 1;
    renderInternalDoTable();
};

window.changeDoPage = function(page) {
    currentDoPage = page;
    renderInternalDoTable();
    const wrapper = document.querySelector('.do-table-wrapper');
    if (wrapper) wrapper.scrollTop = 0;
};

window.sortDoTable = function(col) {
    if (currentDoSortColumn === col) {
        currentDoSortAsc = !currentDoSortAsc;
    } else {
        currentDoSortColumn = col;
        currentDoSortAsc = true;
    }
    renderInternalDoTable();
    showAuditToast(`Sorted table by ${col.toUpperCase()} (${currentDoSortAsc ? 'Ascending' : 'Descending'})`);
};

window.exportDoDataCsv = function() {
    if (!allInternalDoRecords || allInternalDoRecords.length === 0) {
        showAuditToast('No DO records to export.');
        return;
    }

    const filtered = getFilteredDoRecords();
    const headers = [
        "S.No", "DO Number", "Contractor", "Grade", "Order Qty", "Balance Qty", "Validity",
        "From Area", "From Plant", "From Checkposts", "From WBs", "From Locations",
        "To Area", "To Plant", "To Checkposts", "To WBs", "To Locations",
        "Created User", "Created On"
    ];

    const escapeCsv = (str) => {
        if (!str) return '""';
        const s = String(str).replace(/"/g, '""');
        return `"${s}"`;
    };

    let csvContent = "data:text/csv;charset=utf-8," + headers.map(escapeCsv).join(",") + "\n";

    filtered.forEach(r => {
        const row = [
            r.s_no, r.do_no, r.contractor, r.grade, r.order_qty, r.balance_qty, r.validity,
            r.from_area, r.from_plant, r.from_checkposts, r.from_wbs, r.from_locations,
            r.to_area, r.to_plant, r.to_checkposts, r.to_wbs, r.to_locations,
            r.created_user, r.created_on
        ];
        csvContent += row.map(escapeCsv).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CCL_Internal_Delivery_Orders_Register_${filtered.length}_records.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showAuditToast(`Exported ${filtered.length} DO records to CSV.`);
};

window.printDoTable = function() {
    window.print();
};

window.openDoDetailModal = function(doNo) {
    const doRec = allInternalDoRecords.find(r => r.do_no === doNo);
    if (!doRec) return;

    showAuditToast(`DO #${doRec.do_no}: ${doRec.contractor} (${doRec.from_plant} → ${doRec.to_plant || 'Local Siding'})`);
};

window.populateEditDoSelector = function() {
    const select = document.getElementById('editDoSelector');
    if (!select || !allInternalDoRecords) return;

    select.innerHTML = '<option value="">-- Choose DO to configure --</option>' + 
        allInternalDoRecords.map(r => `<option value="${r.do_no}">DO #${r.do_no} — ${r.contractor} (${r.from_plant})</option>`).join('');
};

window.populateEditDoForm = function(doNo) {
    if (!doNo) return;
    const r = allInternalDoRecords.find(item => item.do_no === doNo);
    if (!r) return;

    const fromWbs = document.getElementById('editFromWbs');
    const toWbs = document.getElementById('editToWbs');
    const fromCps = document.getElementById('editFromCheckposts');
    const toCps = document.getElementById('editToCheckposts');

    if (fromWbs) fromWbs.value = r.from_wbs || '';
    if (toWbs) toWbs.value = r.to_wbs || '';
    if (fromCps) fromCps.value = r.from_checkposts || '';
    if (toCps) toCps.value = r.to_checkposts || '';
};

window.handleSaveDoMapping = function() {
    const doNo = document.getElementById('editDoSelector')?.value;
    if (!doNo) {
        showAuditToast('Please select a DO to configure.');
        return;
    }

    const r = allInternalDoRecords.find(item => item.do_no === doNo);
    if (r) {
        r.from_wbs = document.getElementById('editFromWbs')?.value || 'NA';
        r.to_wbs = document.getElementById('editToWbs')?.value || 'NA';
        r.from_checkposts = document.getElementById('editFromCheckposts')?.value || 'NA';
        r.to_checkposts = document.getElementById('editToCheckposts')?.value || 'NA';
        showAuditToast(`✅ Mapping saved for DO #${doNo}`);
        setTimeout(showViewInternalDO, 400);
    }
};

window.handleCreateDoSubmit = function(e) {
    e.preventDefault();
    const newDo = {
        s_no: String(allInternalDoRecords.length + 1),
        do_no: document.getElementById('addDoNumber')?.value || 'DO-' + Date.now(),
        contractor: document.getElementById('addDoContractor')?.value || 'Internal Contractor',
        grade: document.getElementById('addDoGrade')?.value || 'Washery Grade IV',
        order_qty: parseFloat(document.getElementById('addDoOrderQty')?.value || '0').toFixed(3),
        balance_qty: parseFloat(document.getElementById('addDoBalanceQty')?.value || document.getElementById('addDoOrderQty')?.value || '0').toFixed(3),
        validity: document.getElementById('addDoValidity')?.value || '31-12-2027',
        from_area: document.getElementById('addDoFromArea')?.value || 'Kathara',
        from_plant: document.getElementById('addDoFromPlant')?.value || 'Local Mine',
        from_checkposts: document.getElementById('addDoFromCheckposts')?.value || 'NA',
        from_wbs: document.getElementById('addDoFromWbs')?.value || 'NA',
        from_locations: document.getElementById('addDoFromLocations')?.value || 'NA',
        to_area: document.getElementById('addDoToArea')?.value || 'Kathara',
        to_plant: document.getElementById('addDoToPlant')?.value || 'Washery Siding',
        to_checkposts: document.getElementById('addDoToCheckposts')?.value || 'NA',
        to_wbs: document.getElementById('addDoToWbs')?.value || 'NA',
        to_locations: document.getElementById('addDoToLocations')?.value || 'NA',
        created_user: 'Central DO Dispatch Officer',
        created_on: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB')
    };

    allInternalDoRecords.unshift(newDo);
    showAuditToast(`✅ Delivery Order #${newDo.do_no} created successfully!`);
    document.getElementById('formAddInternalDo')?.reset();
    setTimeout(showViewInternalDO, 400);
};
