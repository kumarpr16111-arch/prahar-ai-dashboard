/**
 * TRACE - Workers Attendance & Shift Telemetry Module
 * Handles dynamic date-based attendance metrics, animated doughnut chart,
 * and comprehensive worker roster details with search, multi-filter, pagination & CSV export.
 */

(function(window) {
    'use strict';

    // List of 14 Mining Areas in CCL
    const MINING_AREAS = [
        "Amrapali OCP", "Argada", "Barka Sayal", "Bokaro and Kargali", 
        "Dhori", "Giridih", "Hazaribagh", "Kathara", "Kuju", 
        "Magadh & Sanghmitra", "NK", "Piparwar", "Rajhara", "Rajrappa"
    ];

    // Authentic Indian Mining Trades / Designations
    const WORKER_TRADES = [
        "HEMM Shovel Operator", "Dumper Operator (Heavy Fleet)", "Mining Sirdar (Overman)",
        "Shotfirer & Blasting In-charge", "Drill Rig Operator", "Safety Warden & Gas Tester",
        "Conveyor Belt Superintendent", "Electrical Technician Gr-I", "Mechanical Fitter (Workshop)",
        "Weighbridge Operator", "Underground Continuous Miner Op", "Pit Patrol Security Guard",
        "Washery Plant Operator", "Survey & GIS Assistant", "Locomotive Shunter"
    ];

    // Shifts Definition
    const SHIFTS = [
        { id: "Shift-I", name: "Shift-I (06:00 - 14:00)", startHour: 6 },
        { id: "Shift-II", name: "Shift-II (14:00 - 22:00)", startHour: 14 },
        { id: "Shift-III", name: "Shift-III (22:00 - 06:00)", startHour: 22 },
        { id: "General", name: "General (09:00 - 17:00)", startHour: 9 }
    ];

    // Gate & Biometric Terminals
    const TERMINALS = [
        "Main Gate #1 Biometric Terminal",
        "Pit Entrance #2 Turnstile Scanner",
        "Incline Portal #3 RFID Terminal",
        "Weighbridge #4 Biometric Kiosk",
        "Workshop Ingress Terminal #5",
        "Washery Gate #2 Biometric Scanner",
        "Heavy Equipment Yard Gate #1"
    ];

    // Authentic Mining Worker Names Pool
    const WORKER_NAMES = [
        "Ramesh Kumar Saw", "Manoj Soren", "Sanjay Verma", "Sunita Devi", "Vikram Bahadur Singh",
        "Amit Oraon", "Prakash Mandal", "Deepak Mahato", "Anil Kumar Gupta", "Suresh Yadav",
        "Dharmendra Munda", "Ravi Shankar Prasad", "Pankaj Kumar Mishra", "Manish Karmali",
        "Gopal Chandra Roy", "Sanjay Hansda", "Vijay Kumar Ram", "Santosh Kumar Pandey",
        "Jitendra Prasad", "Naresh Kumar Bauri", "Ashok Kumar Singh", "Binod Kumar Mahto",
        "Rajendra Prasad Yadav", "Kishore Kumar Murmu", "Subhash Chandra Das", "Rajeshwar Soren",
        "Pradeep Kumar Tudu", "Shambhu Nath Singh", "Arun Kumar Gope", "Mukesh Kumar Thakur",
        "Dinesh Chandra Roy", "Ajay Kumar Nayak", "Chandan Kumar Singh", "Sushil Kumar Bedia",
        "Babulal Marandi", "Ranjit Kumar Paswan", "Dilip Kumar Mandal", "Satish Kumar Sinha",
        "Nandlal Prasad", "Birendra Kumar", "Kamlesh Kumar Saw", "Sunil Kumar Hembrom",
        "Gautam Kumar महतो", "Sanjeev Kumar Singh", "Prem Chand Mahto", "Basant Kumar",
        "Anand Kumar Oraon", "Laxman Murmu", "Suraj Kumar Ray", "Tarun Kumar Bauri",
        "Hemant Kumar Soren", "Umesh Kumar Singh", "Shankar Dayal Mahato", "Mithilesh Prasad",
        "Ratan Kumar Karmakar", "Anil Kumar Besra", "Shyam Sundar Pandit", "Tribhuvan Nath",
        "Lalit Mohan Das", "Govind Kumar Saw", "Akhilesh Kumar Yadav", "Ramanuj Prasad"
    ];

    // State object for Attendance Module
    const state = {
        selectedDate: "2026-08-25",
        selectedDateDisplay: "25-08-2026",
        activeCount: 32489,
        presentCount: 28265,
        absentCount: 4224,
        presentPct: 87,
        absentPct: 13,
        shift1Count: 12410,
        shift2Count: 10120,
        shift3Count: 5735,
        rosterList: [],
        filteredRoster: [],
        currentPage: 1,
        pageSize: 10,
        searchQuery: "",
        areaFilter: "all",
        shiftFilter: "all",
        statusFilter: "all"
    };

    /**
     * Compute a deterministic pseudo-random seed from date string
     */
    function seedFromDate(dateStr) {
        let hash = 0;
        for (let i = 0; i < dateStr.length; i++) {
            hash = (hash << 5) - hash + dateStr.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    /**
     * Generate synthetic attendance metrics and roster for the selected date
     */
    function generateAttendanceDataForDate(dateStr) {
        const seed = seedFromDate(dateStr);
        
        // Base active members between 31,500 and 34,500
        const activeMembers = 31500 + (seed % 3000);
        // Present percentage between 83% and 93%
        const presentPct = 83 + ((seed >> 2) % 11);
        const absentPct = 100 - presentPct;
        
        const presentCount = Math.round(activeMembers * (presentPct / 100));
        const absentCount = activeMembers - presentCount;

        // Shift distribution (approx: Shift 1 = 44%, Shift 2 = 36%, Shift 3 = 20%)
        const shift1 = Math.round(presentCount * 0.44);
        const shift2 = Math.round(presentCount * 0.36);
        const shift3 = presentCount - shift1 - shift2;

        state.activeCount = activeMembers;
        state.presentCount = presentCount;
        state.absentCount = absentCount;
        state.presentPct = presentPct;
        state.absentPct = absentPct;
        state.shift1Count = shift1;
        state.shift2Count = shift2;
        state.shift3Count = shift3;

        // Generate full roster table records (120 detailed worker rows)
        const roster = [];
        const totalRows = 120;
        
        for (let i = 0; i < totalRows; i++) {
            const itemSeed = seed + i * 37;
            const workerId = `CCL-WRK-${1000 + (itemSeed % 8999)}`;
            const name = WORKER_NAMES[(itemSeed + i) % WORKER_NAMES.length];
            const trade = WORKER_TRADES[(itemSeed + i * 3) % WORKER_TRADES.length];
            const area = MINING_AREAS[(itemSeed + i * 7) % MINING_AREAS.length];
            const shiftObj = SHIFTS[(itemSeed + i) % SHIFTS.length];
            const terminal = TERMINALS[(itemSeed + i * 5) % TERMINALS.length];
            
            // Determine status based on the day's present percentage
            const isPresent = (itemSeed % 100) < presentPct;
            let status = "Present";
            let checkInTime = "-";

            if (isPresent) {
                status = "Present";
                // Generate realistic check-in time 10-25 mins before shift start
                const minOffset = 35 + (itemSeed % 20); // e.g. 5:35 to 5:55 for 6:00
                const hour = shiftObj.startHour === 6 ? 5 : (shiftObj.startHour === 14 ? 13 : (shiftObj.startHour === 22 ? 21 : 8));
                const sec = (itemSeed % 59).toString().padStart(2, '0');
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const formattedHour = hour > 12 ? (hour - 12).toString().padStart(2, '0') : hour.toString().padStart(2, '0');
                checkInTime = `${formattedHour}:${minOffset}:${sec} ${ampm}`;
            } else {
                // 70% chance Absent, 30% chance On Leave
                status = (itemSeed % 3 === 0) ? "On Leave" : "Absent";
                checkInTime = "N/A - Off Duty";
            }

            roster.push({
                sno: i + 1,
                id: workerId,
                name: name,
                trade: trade,
                area: area,
                shift: shiftObj.id,
                shiftName: shiftObj.name,
                checkIn: checkInTime,
                terminal: isPresent ? terminal : "-",
                status: status
            });
        }

        state.rosterList = roster;
        applyRosterFilters();
    }

    /**
     * Update dashboard summary cards and SVG doughnut chart
     */
    function updateDashboardUI() {
        const activeElem = document.getElementById('attActiveCount');
        const presentElem = document.getElementById('attPresentCount');
        const absentElem = document.getElementById('attAbsentCount');

        if (activeElem) activeElem.textContent = state.activeCount.toLocaleString('en-IN');
        if (presentElem) presentElem.textContent = state.presentCount.toLocaleString('en-IN');
        if (absentElem) absentElem.textContent = state.absentCount.toLocaleString('en-IN');

        // Update Doughnut Chart
        const circleElem = document.getElementById('attDoughnutPresentCircle');
        const absentTextElem = document.getElementById('attDoughnutAbsentText');
        const presentTextElem = document.getElementById('attDoughnutPresentText');

        if (circleElem) {
            // Circumference for r=70 is 2 * PI * 70 = 439.8226
            const circumference = 439.82;
            const presentLength = ((state.presentPct / 100) * circumference).toFixed(2);
            circleElem.style.strokeDasharray = `${presentLength} ${circumference}`;
        }

        if (absentTextElem) absentTextElem.textContent = `${state.absentPct}%`;
        if (presentTextElem) presentTextElem.textContent = `${state.presentPct}%`;

        // Update Date Display
        const dateDisplay = document.getElementById('attendanceDateDisplayInput');
        if (dateDisplay) {
            dateDisplay.value = state.selectedDateDisplay;
        }
    }

    /**
     * Open Native Date Picker
     */
    window.openAttendanceDatePicker = function() {
        const nativeInput = document.getElementById('attendanceNativeDateInput');
        if (nativeInput) {
            if (typeof nativeInput.showPicker === 'function') {
                try {
                    nativeInput.showPicker();
                } catch(e) {
                    nativeInput.focus();
                    nativeInput.click();
                }
            } else {
                nativeInput.focus();
                nativeInput.click();
            }
        }
    };

    /**
     * Handle Native Date Input Change
     */
    window.handleAttendanceDateChange = function(newDateVal) {
        if (!newDateVal) return;
        state.selectedDate = newDateVal;

        // Convert YYYY-MM-DD to DD-MM-YYYY
        const parts = newDateVal.split('-');
        if (parts.length === 3) {
            state.selectedDateDisplay = `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else {
            state.selectedDateDisplay = newDateVal;
        }

        // Generate dynamic numbers for this date
        generateAttendanceDataForDate(state.selectedDate);
        updateDashboardUI();
    };

    /**
     * Trigger "Go" Button Filter Action
     */
    window.triggerAttendanceDateFilter = function() {
        const nativeInput = document.getElementById('attendanceNativeDateInput');
        const dateVal = nativeInput ? nativeInput.value : state.selectedDate;
        
        // Add subtle animation effect to cards
        const cards = document.querySelectorAll('.att-card, .attendance-overview-card');
        cards.forEach(c => {
            c.style.opacity = '0.7';
            c.style.transform = 'scale(0.99)';
            c.style.transition = 'all 0.2s ease';
        });

        setTimeout(() => {
            generateAttendanceDataForDate(dateVal || new Date().toISOString().split('T')[0]);
            updateDashboardUI();
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = 'scale(1)';
            });
        }, 150);
    };

    /**
     * Open Workers Attendance Details Modal
     */
    window.openWorkersDetailModal = function() {
        const modal = document.getElementById('workersDetailModal');
        if (!modal) return;

        // Update modal header subtitle and telemetry chips
        const subtitle = document.getElementById('workerModalSubtitle');
        if (subtitle) {
            subtitle.textContent = `Biometric & RFID Attendance Tracking • Date: ${state.selectedDateDisplay} (Total Active: ${state.activeCount.toLocaleString('en-IN')})`;
        }

        const presVal = document.getElementById('workerModalPresentVal');
        const absVal = document.getElementById('workerModalAbsentVal');
        const s1Val = document.getElementById('workerModalShift1Val');
        const s2Val = document.getElementById('workerModalShift2Val');
        const s3Val = document.getElementById('workerModalShift3Val');

        if (presVal) presVal.textContent = `${state.presentCount.toLocaleString('en-IN')} (${state.presentPct}%)`;
        if (absVal) absVal.textContent = `${state.absentCount.toLocaleString('en-IN')} (${state.absentPct}%)`;
        if (s1Val) s1Val.textContent = state.shift1Count.toLocaleString('en-IN');
        if (s2Val) s2Val.textContent = state.shift2Count.toLocaleString('en-IN');
        if (s3Val) s3Val.textContent = state.shift3Count.toLocaleString('en-IN');

        // Reset search & pagination
        state.currentPage = 1;
        applyRosterFilters();

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    /**
     * Close Workers Attendance Details Modal
     */
    window.closeWorkersDetailModal = function() {
        const modal = document.getElementById('workersDetailModal');
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    /**
     * Live search handler for worker roster
     */
    window.handleWorkerSearch = function(query) {
        state.searchQuery = (query || "").trim().toLowerCase();
        state.currentPage = 1;
        applyRosterFilters();
    };

    /**
     * Filter by Area handler
     */
    window.handleWorkerAreaFilter = function(area) {
        state.areaFilter = area;
        state.currentPage = 1;
        applyRosterFilters();
    };

    /**
     * Filter by Shift handler
     */
    window.handleWorkerShiftFilter = function(shift) {
        state.shiftFilter = shift;
        state.currentPage = 1;
        applyRosterFilters();
    };

    /**
     * Filter by Status handler
     */
    window.handleWorkerStatusFilter = function(status) {
        state.statusFilter = status;
        state.currentPage = 1;
        applyRosterFilters();
    };

    /**
     * Filter by Rows Per Page handler
     */
    window.handleWorkerRowsPerPage = function(rows) {
        if (rows === 'all') {
            state.pageSize = 999999;
        } else {
            state.pageSize = parseInt(rows, 10) || 10;
        }
        state.currentPage = 1;
        applyRosterFilters();
    };

    /**
     * Filter and render worker roster rows
     */
    function applyRosterFilters() {
        let list = state.rosterList || [];

        // Search query filter
        if (state.searchQuery) {
            const q = state.searchQuery;
            list = list.filter(item => 
                item.id.toLowerCase().includes(q) ||
                item.name.toLowerCase().includes(q) ||
                item.trade.toLowerCase().includes(q) ||
                item.area.toLowerCase().includes(q) ||
                item.terminal.toLowerCase().includes(q) ||
                item.status.toLowerCase().includes(q)
            );
        }

        // Area filter
        if (state.areaFilter && state.areaFilter !== "all") {
            list = list.filter(item => item.area === state.areaFilter);
        }

        // Shift filter
        if (state.shiftFilter && state.shiftFilter !== "all") {
            list = list.filter(item => item.shift === state.shiftFilter);
        }

        // Status filter
        if (state.statusFilter && state.statusFilter !== "all") {
            list = list.filter(item => item.status === state.statusFilter);
        }

        state.filteredRoster = list;
        renderRosterTable();
    }

    /**
     * Render the paginated worker roster table
     */
    function renderRosterTable() {
        const tbody = document.getElementById('workerRosterTableBody');
        if (!tbody) return;

        const total = state.filteredRoster.length;
        const totalPages = Math.ceil(total / state.pageSize) || 1;
        if (state.currentPage > totalPages) state.currentPage = totalPages;

        const startIdx = (state.currentPage - 1) * state.pageSize;
        const endIdx = Math.min(startIdx + state.pageSize, total);
        const pageItems = state.filteredRoster.slice(startIdx, endIdx);

        if (pageItems.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 40px; color: #64748b; font-weight: 500;">
                        <i class="fa-solid fa-user-slash" style="font-size: 28px; margin-bottom: 8px; display: block; color: #94a3b8;"></i>
                        No worker attendance records found matching your filters.
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = pageItems.map((item, idx) => {
                let badgeHtml = '';
                if (item.status === 'Present') {
                    badgeHtml = `<span class="badge" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:700; padding:4px 8px; border-radius:4px; font-size:11px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Present</span>`;
                } else if (item.status === 'Absent') {
                    badgeHtml = `<span class="badge" style="background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5; font-weight:700; padding:4px 8px; border-radius:4px; font-size:11px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-xmark"></i> Absent</span>`;
                } else {
                    badgeHtml = `<span class="badge" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-weight:700; padding:4px 8px; border-radius:4px; font-size:11px; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-clock"></i> On Leave</span>`;
                }

                return `
                    <tr>
                        <td style="text-align: center; font-weight: 700; color: #64748b;">${startIdx + idx + 1}</td>
                        <td style="font-weight: 700; color: #0284c7;">${item.id}</td>
                        <td style="font-weight: 600; color: #0f172a;">${item.name}</td>
                        <td style="color: #334155;">${item.trade}</td>
                        <td style="font-weight: 500; color: #1e293b;">${item.area}</td>
                        <td style="color: #475569;"><span style="font-weight: 600;">${item.shift}</span></td>
                        <td style="color: #334155; font-family: monospace; font-weight: 600;">${item.checkIn}</td>
                        <td style="color: #475569; font-size: 12.5px;">${item.terminal}</td>
                        <td style="text-align: center;">${badgeHtml}</td>
                    </tr>
                `;
            }).join('');
        }

        // Update pagination numbers
        const pageStart = document.getElementById('workerPageStart');
        const pageEnd = document.getElementById('workerPageEnd');
        const totalCount = document.getElementById('workerTotalCount');

        if (pageStart) pageStart.textContent = total === 0 ? 0 : startIdx + 1;
        if (pageEnd) pageEnd.textContent = endIdx;
        if (totalCount) totalCount.textContent = total.toLocaleString('en-IN');

        renderPaginationControls(totalPages);
    }

    /**
     * Render pagination controls
     */
    function renderPaginationControls(totalPages) {
        const container = document.getElementById('workerPaginationControls');
        if (!container) return;

        let html = `
            <button class="vts-page-btn" ${state.currentPage <= 1 ? 'disabled' : ''} onclick="changeWorkerPage(${state.currentPage - 1})">
                <i class="fa-solid fa-chevron-left"></i> Prev
            </button>
        `;

        const maxButtons = 5;
        let startPage = Math.max(1, state.currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let p = startPage; p <= endPage; p++) {
            html += `
                <button class="vts-page-btn ${p === state.currentPage ? 'active' : ''}" onclick="changeWorkerPage(${p})">
                    ${p}
                </button>
            `;
        }

        html += `
            <button class="vts-page-btn" ${state.currentPage >= totalPages ? 'disabled' : ''} onclick="changeWorkerPage(${state.currentPage + 1})">
                Next <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        container.innerHTML = html;
    }

    /**
     * Change page handler
     */
    window.changeWorkerPage = function(page) {
        const totalPages = Math.ceil(state.filteredRoster.length / state.pageSize) || 1;
        if (page < 1 || page > totalPages) return;
        state.currentPage = page;
        renderRosterTable();
    };

    /**
     * Export Roster to CSV
     */
    window.exportWorkersAttendanceCSV = function() {
        const rows = state.filteredRoster.length > 0 ? state.filteredRoster : state.rosterList;
        if (!rows || rows.length === 0) {
            alert('No worker records available to export.');
            return;
        }

        const headers = ["S.No", "Worker ID", "Worker Name", "Trade / Designation", "Mining Area", "Shift", "Check-in Time", "Terminal / Gate", "Status", "Date"];
        const csvRows = [headers.join(",")];

        rows.forEach((r, i) => {
            const row = [
                i + 1,
                `"${r.id}"`,
                `"${r.name}"`,
                `"${r.trade}"`,
                `"${r.area}"`,
                `"${r.shift}"`,
                `"${r.checkIn}"`,
                `"${r.terminal}"`,
                `"${r.status}"`,
                `"${state.selectedDateDisplay}"`
            ];
            csvRows.push(row.join(","));
        });

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Workers_Attendance_${state.selectedDateDisplay}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    /**
     * Print Roster Table
     */
    window.printWorkersAttendance = function() {
        window.print();
    };

    /**
     * Initialize on DOM Load
     */
    function initWorkersAttendance() {
        const dateBox = document.getElementById('attendanceDatePickerBox');
        if (dateBox) {
            dateBox.style.cursor = 'pointer';
            dateBox.addEventListener('click', function(e) {
                if (e.target.tagName !== 'INPUT' || e.target.type !== 'date') {
                    window.openAttendanceDatePicker();
                }
            });
        }

        // Initialize with default date 25-08-2026
        generateAttendanceDataForDate(state.selectedDate);
        updateDashboardUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWorkersAttendance);
    } else {
        initWorkersAttendance();
    }

    // Export module to window
    window.WorkersAttendanceModule = {
        init: initWorkersAttendance,
        generate: generateAttendanceDataForDate,
        state: state
    };

})(window);
