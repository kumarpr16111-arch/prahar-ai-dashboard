// Contract Management Masters Controller (6 Interactive Masters)
// ==========================================================================

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

// ==========================================================================
// 1. DATASETS FOR ALL 6 MASTERS
// ==========================================================================
let masterDatasets = {
    area: [
        { id: 'AR-01', name: 'North Karanpura Area', zone: 'North Karanpura', hq: 'Dakra HQ', mines: 6, target: '42.5 MT', gm: 'Er. R. K. Mishra', status: 'Active' },
        { id: 'AR-02', name: 'Piparwar Area', zone: 'North Karanpura', hq: 'Bachra HQ', mines: 5, target: '38.0 MT', gm: 'Er. S. Sengupta', status: 'Active' },
        { id: 'AR-03', name: 'Magadh & Amrapali Area', zone: 'North Karanpura', hq: 'Tandwa HQ', mines: 4, target: '56.2 MT', gm: 'Er. Alok Sharma', status: 'Active' },
        { id: 'AR-04', name: 'Barka Sayal Area', zone: 'South Karanpura', hq: 'Sayal HQ', mines: 4, target: '24.6 MT', gm: 'Er. P. B. Verma', status: 'Active' },
        { id: 'AR-05', name: 'Argada Area', zone: 'South Karanpura', hq: 'Sirka HQ', mines: 4, target: '18.4 MT', gm: 'Er. Amitav Roy', status: 'Active' },
        { id: 'AR-06', name: 'Dhori Area', zone: 'Bokaro Basin', hq: 'Dhori Complex', mines: 4, target: '26.8 MT', gm: 'Er. B. K. Jha', status: 'Active' },
        { id: 'AR-07', name: 'Bokaro & Kargali (B&K)', zone: 'Bokaro Basin', hq: 'Bermo HQ', mines: 5, target: '31.2 MT', gm: 'Er. Sanjay Sinha', status: 'Active' },
        { id: 'AR-08', name: 'Kuju Area', zone: 'South Karanpura', hq: 'Kuju HQ', mines: 4, target: '19.5 MT', gm: 'Er. Neeraj Anand', status: 'Active' },
        { id: 'AR-09', name: 'Hazaribagh Area', zone: 'North Karanpura', hq: 'Charhi HQ', mines: 3, target: '16.8 MT', gm: 'Er. Manoj Pandey', status: 'Active' },
        { id: 'AR-10', name: 'Kathara Area', zone: 'Bokaro Basin', hq: 'Kathara HQ', mines: 3, target: '15.4 MT', gm: 'Er. Arvind Prasad', status: 'Active' },
        { id: 'AR-11', name: 'Rajrappa Area', zone: 'Rajrappa Region', hq: 'Rajrappa Project', mines: 3, target: '14.9 MT', gm: 'Er. Rajesh Kumar', status: 'Active' },
        { id: 'AR-12', name: 'Giridih Area', zone: 'Bokaro Basin', hq: 'Beniadih HQ', mines: 2, target: '8.6 MT', gm: 'Er. D. K. Murmu', status: 'Active' },
        { id: 'AR-13', name: 'Chandragupta Project', zone: 'North Karanpura', hq: 'Balumath HQ', mines: 2, target: '14.0 MT', gm: 'Er. V. K. Tiwary', status: 'Operational' },
        { id: 'AR-14', name: 'M&A Extension Phase 2', zone: 'North Karanpura', hq: 'Tandwa North', mines: 1, target: '7.0 MT', gm: 'Er. S. K. Choudhury', status: 'Operational' }
    ],
    plant: [
        { id: 'PL-101', name: 'Amrapali Opencast Pit #1', area: 'North Karanpura', type: 'Opencast Pit (OCP)', capacity: '35,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-102', name: 'Ashoka Opencast Project (CO02)', area: 'Piparwar', type: 'Opencast Pit (OCP)', capacity: '28,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-103', name: 'Piparwar Heavy Washery', area: 'Piparwar', type: 'Heavy Washery', capacity: '20,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-104', name: 'Magadh Opencast Pit (CO08)', area: 'Magadh', type: 'Opencast Pit (OCP)', capacity: '32,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-105', name: 'Barka Sayal Urimari Colliery', area: 'Barka Sayal', type: 'Opencast Pit (OCP)', capacity: '16,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-106', name: 'Argada Sirka Deep Pit', area: 'Argada', type: 'Opencast Pit (OCP)', capacity: '14,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-107', name: 'Dhori Khas Colliery & Siding', area: 'Dhori', type: 'Railway Siding', capacity: '18,500 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-108', name: 'Kathara Heavy Coal Washery', area: 'Dhori', type: 'Heavy Washery', capacity: '15,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-109', name: 'Bokaro Kargali Coal Siding (CO09)', area: 'North Karanpura', type: 'Railway Siding', capacity: '22,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-110', name: 'Kuju Karma Underground Colliery', area: 'Barka Sayal', type: 'Underground (UG)', capacity: '6,500 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-111', name: 'Rajrappa Washery & Pit', area: 'Argada', type: 'Heavy Washery', capacity: '12,000 TPD', scada: 'Connected (Live)', status: 'Active' },
        { id: 'PL-112', name: 'Tetariakhar Opencast Pit', area: 'North Karanpura', type: 'Opencast Pit (OCP)', capacity: '11,000 TPD', scada: 'Connected (Live)', status: 'Active' }
    ],
    weighbridge: [
        { id: 'WB-01', name: 'Amrapali Siding WB #01', area: 'Amrapali / North Karanpura', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Front & Top', lastCal: '2026-08-15', status: 'Online' },
        { id: 'WB-02', name: 'Ashoka Inbound Weighbridge', area: 'Piparwar Area', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Front & Top', lastCal: '2026-08-10', status: 'Online' },
        { id: 'WB-03', name: 'Piparwar Washery Outbound Scale', area: 'Piparwar Area', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Dual ANPR', lastCal: '2026-08-20', status: 'Online' },
        { id: 'WB-04', name: 'Magadh OCP Weighbridge #02', area: 'Magadh Project', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Front & Top', lastCal: '2026-07-28', status: 'Online' },
        { id: 'WB-05', name: 'North Karanpura Siding Scale #01', area: 'North Karanpura', capacity: '80 MT', cell: '4x 25T Compression Cells', anpr: '2x HD Optical ANPR', lastCal: '2026-06-18', status: 'Calibration' },
        { id: 'WB-06', name: 'Tetricon Weighbridge #03', area: 'Barka Sayal Area', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Dual ANPR', lastCal: '2026-08-05', status: 'Online' },
        { id: 'WB-07', name: 'Sayal D Inbound Bridge', area: 'Barka Sayal Area', capacity: '80 MT', cell: '4x 25T Compression Cells', anpr: '2x HD ANPR Camera', lastCal: '2026-07-14', status: 'Online' },
        { id: 'WB-08', name: 'Sirka Colliery Weighbridge', area: 'Argada Area', capacity: '60 MT', cell: '4x 20T Compression Cells', anpr: '1x Front ANPR', lastCal: '2026-05-30', status: 'Calibration' },
        { id: 'WB-09', name: 'Dhori Central Weighbridge #01', area: 'Dhori Area', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Dual ANPR', lastCal: '2026-08-22', status: 'Online' },
        { id: 'WB-10', name: 'Kathara Washery Weighbridge #02', area: 'Kathara Area', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Front & Top', lastCal: '2026-08-12', status: 'Online' },
        { id: 'WB-11', name: 'Rajrappa Main Exit Scale', area: 'Rajrappa Region', capacity: '100 MT', cell: '4x 30T Digital Compression', anpr: '2x HD Dual ANPR', lastCal: '2026-08-18', status: 'Online' },
        { id: 'WB-12', name: 'Kuju Karma Weighbridge #01', area: 'Kuju Area', capacity: '80 MT', cell: '4x 25T Compression Cells', anpr: '2x HD Front & Top', lastCal: '2026-06-02', status: 'Offline' }
    ],
    checkpost: [
        { id: 'CP-101', name: 'Amrapali Siding Checkpost A1', area: 'North Karanpura', lane: 'Dedicated Dual Lane', rfid: 'Impinj Speedway UHF Gen2', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-102', name: 'Ashoka West Perimeter Gate #02', area: 'Piparwar', lane: 'Inbound / Outbound Split', rfid: 'Impinj Speedway UHF Gen2', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-103', name: 'Piparwar Washery Security Gate', area: 'Piparwar', lane: 'Single Reversible Lane', rfid: 'Zebra FX9600 Fixed RFID', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-104', name: 'Magadh South Haulage Checkpost', area: 'Amrapali', lane: 'Dedicated Dual Lane', rfid: 'Impinj Speedway UHF Gen2', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-105', name: 'Barka Sayal Urimari Gate #01', area: 'Barka Sayal', lane: 'Inbound Dedicated', rfid: 'Zebra FX9600 Fixed RFID', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-106', name: 'Sirka Argada Main Perimeter Checkpost', area: 'Argada', lane: 'Dedicated Dual Lane', rfid: 'Impinj Speedway UHF Gen2', mode: 'MANUAL', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-107', name: 'Dhori Siding Security Barrier #04', area: 'Amrapali', lane: 'Dedicated Dual Lane', rfid: 'Impinj Speedway UHF Gen2', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-108', name: 'Kathara Rail Interlock Gate', area: 'Piparwar', lane: 'Single Reversible Lane', rfid: 'Zebra FX9600 Fixed RFID', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-109', name: 'Rajrappa Quarry Entry Gate #02', area: 'Argada', lane: 'Dedicated Dual Lane', rfid: 'Impinj Speedway UHF Gen2', mode: 'AUTO', cctv: 'Online (HD 4K)', status: 'Active' },
        { id: 'CP-110', name: 'Kuju Karma Haulage Barrier #01', area: 'Barka Sayal', lane: 'Single Reversible Lane', rfid: 'Zebra FX9600 Fixed RFID', mode: 'MAINTENANCE', cctv: 'Standby Feed', status: 'Maintenance' }
    ],
    transporter: [
        { id: 'TR-501', name: 'Shree Balaji Coal Logistics Pvt Ltd', gstin: '20AAACS7842N1Z4', wo: 'CIL/CCL/WO-2026/892', trucks: 142, corridors: 'Amrapali to Siding Corridor #1 & #3', expiry: '2027-03-31', status: 'Active' },
        { id: 'TR-502', name: 'Karanpura Road Transport Co.', gstin: '20AABCK1049P1Z8', wo: 'CIL/CCL/WO-2026/741', trucks: 118, corridors: 'Piparwar Washery to Railway Wharf', expiry: '2027-06-30', status: 'Active' },
        { id: 'TR-503', name: 'Magadh Heavy Movers Logistics', gstin: '20AACCM3392R1ZG', wo: 'CIL/CCL/WO-2026/623', trucks: 165, corridors: 'Magadh Pit to Bachra Coal Siding', expiry: '2026-12-31', status: 'Active' },
        { id: 'TR-504', name: 'Jharkhand Mining Freight Carriers', gstin: '20AAEFJ8821M1ZX', wo: 'CIL/CCL/WO-2026/512', trucks: 95, corridors: 'Barka Sayal to Urimari Weighbridge', expiry: '2026-10-15', status: 'Renewal Due' },
        { id: 'TR-505', name: 'Ranchi Express Fleet Services', gstin: '20AAECR4412Q1ZW', wo: 'CIL/CCL/WO-2026/418', trucks: 84, corridors: 'Argada Sirka to Central Depot', expiry: '2027-04-30', status: 'Active' },
        { id: 'TR-506', name: 'Bokaro Basin Coal Haulers LLP', gstin: '20AABCB9901A1ZV', wo: 'CIL/CCL/WO-2026/309', trucks: 130, corridors: 'Dhori & Kathara Washery Corridor', expiry: '2027-01-31', status: 'Active' },
        { id: 'TR-507', name: 'Coalfield Multi-Axle Fleet Corp', gstin: '20AAACM1192B1ZT', wo: 'CIL/CCL/WO-2026/280', trucks: 110, corridors: 'Rajrappa Mine to Plant Siding', expiry: '2027-08-31', status: 'Active' },
        { id: 'TR-508', name: 'Damodar Valley Tipper Carriers', gstin: '20AACCD7782K1ZS', wo: 'CIL/CCL/WO-2026/194', trucks: 72, corridors: 'Kuju Area Internal Haulage Routes', expiry: '2026-09-28', status: 'Renewal Due' }
    ],
    maintenance: [
        { id: 'MNT-8821', asset: 'WB-05 (Scale Load Cell #3)', category: 'Weighbridge Scale', issue: 'Zero-Drift Variance (+18kg detected on tare cycle)', date: '2026-09-11', tech: 'Avery India Tech Support', priority: 'Critical', status: 'In Progress' },
        { id: 'MNT-8822', asset: 'CP-106 (Boom Barrier Arm #1)', category: 'Boom Barrier', issue: 'Optical IR Beam Sensor Intermittent Trip', date: '2026-09-11', tech: 'Honeywell Security SLA', priority: 'High', status: 'In Progress' },
        { id: 'MNT-8823', asset: 'WB-08 (Static Load Cell #1)', category: 'Weighbridge Scale', issue: 'Quarterly DGMS Precision Re-Calibration Cycle', date: '2026-09-12', tech: 'Legal Metrology Inspector', priority: 'Routine', status: 'Scheduled' },
        { id: 'MNT-8824', asset: 'CP-110 (RFID Antenna #2)', category: 'RFID Scanner', issue: 'Tag Read Range Degradation (<4 meters)', date: '2026-09-12', tech: 'Impinj System Integrator', priority: 'High', status: 'In Progress' },
        { id: 'MNT-8825', asset: 'CAM-ANPR-09 (Lens Hood)', category: 'ANPR Optical Camera', issue: 'Coal Dust Occlusion on Front Plate Camera', date: '2026-09-13', tech: 'Matrix CCTV Maintenance', priority: 'Routine', status: 'Scheduled' },
        { id: 'MNT-8826', asset: 'GPS-TRK-1049 (GPS Device #44)', category: 'GPS Telemetry Unit', issue: 'Tamper Switch Actuation Alarm Triggered', date: '2026-09-13', tech: 'TRACE Telematics Engineering', priority: 'Critical', status: 'In Progress' },
        { id: 'MNT-8827', asset: 'WB-12 (Mechanical Deck Platform)', category: 'Weighbridge Scale', issue: 'Deck Cleaning & Debris Extraction Under Load Pit', date: '2026-09-14', tech: 'CCL Mechanical Cell', priority: 'Routine', status: 'Scheduled' }
    ]
};

// ==========================================================================
// 2. RENDERING FUNCTIONS FOR ALL 6 MASTERS
// ==========================================================================

function renderAreaTable(data) {
    const tbody = document.getElementById('areaMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #38bdf8;">${item.id}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.zone}</td>
            <td>${item.hq}</td>
            <td class="text-right" style="font-weight: 700; color: #38bdf8;">${item.mines} Mines</td>
            <td class="text-right" style="font-weight: 700; color: #10b981;">${item.target}</td>
            <td><i class="fa-solid fa-user-shield" style="color: #94a3b8; margin-right: 6px;"></i>${item.gm}</td>
            <td><span class="badge ${item.status === 'Active' ? 'badge-teal' : 'badge-blue'}">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('area', '${item.id}')" title="Edit Area"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('area', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('area', '${item.id}')" title="Delete Area"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPlantTable(data) {
    const tbody = document.getElementById('plantMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #34d399;">${item.id}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.area}</td>
            <td><span class="badge ${item.type.includes('Washery') ? 'badge-purple' : 'badge-blue'}">${item.type}</span></td>
            <td class="text-right" style="font-weight: 700; color: #38bdf8;">${item.capacity}</td>
            <td><span style="color: #10b981; font-weight: 600;"><i class="fa-solid fa-circle-check" style="margin-right: 5px;"></i>${item.scada}</span></td>
            <td><span class="badge badge-teal">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('plant', '${item.id}')" title="Edit Plant"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('plant', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('plant', '${item.id}')" title="Delete Plant"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderWeighbridgeTable(data) {
    const tbody = document.getElementById('wbMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #a855f7;">${item.id}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.area}</td>
            <td><span class="badge badge-blue">${item.capacity}</span></td>
            <td><small style="color: #94a3b8;">${item.cell}</small></td>
            <td><span style="color: #38bdf8;"><i class="fa-solid fa-camera" style="margin-right: 5px;"></i>${item.anpr}</span></td>
            <td>${item.lastCal}</td>
            <td><span class="badge ${item.status === 'Online' ? 'badge-teal' : (item.status === 'Calibration' ? 'badge-gold' : 'badge-red')}">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('weighbridge', '${item.id}')" title="Edit Weighbridge"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('weighbridge', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('weighbridge', '${item.id}')" title="Delete Weighbridge"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderCheckpostTable(data) {
    const tbody = document.getElementById('cpMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #f87171;">${item.id}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.area}</td>
            <td>${item.lane}</td>
            <td><small style="color: #38bdf8;">${item.rfid}</small></td>
            <td><span class="badge ${item.mode === 'AUTO' ? 'badge-teal' : 'badge-gold'}">${item.mode}</span></td>
            <td><span style="color: #10b981;"><i class="fa-solid fa-video" style="margin-right: 5px;"></i>${item.cctv}</span></td>
            <td><span class="badge ${item.status === 'Active' ? 'badge-teal' : 'badge-gold'}">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('checkpost', '${item.id}')" title="Edit Checkpost"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('checkpost', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('checkpost', '${item.id}')" title="Delete Checkpost"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderTransporterTable(data) {
    const tbody = document.getElementById('transporterMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #38bdf8;">${item.id}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td><code style="color: #94a3b8; font-size: 11px;">${item.gstin}</code></td>
            <td><span class="badge badge-blue">${item.wo}</span></td>
            <td class="text-right" style="font-weight: 700; color: #10b981;"><i class="fa-solid fa-truck" style="margin-right: 5px;"></i>${item.trucks}</td>
            <td><small style="color: #cbd5e1;">${item.corridors}</small></td>
            <td>${item.expiry}</td>
            <td><span class="badge ${item.status === 'Active' ? 'badge-teal' : (item.status === 'Renewal Due' ? 'badge-gold' : 'badge-red')}">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('transporter', '${item.id}')" title="Edit Transporter"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('transporter', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('transporter', '${item.id}')" title="Delete Transporter"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderMaintenanceTable(data) {
    const tbody = document.getElementById('maintMasterTableBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(item => `
        <tr>
            <td><strong style="color: #fbbf24;">${item.id}</strong></td>
            <td><strong>${item.asset}</strong></td>
            <td><span class="badge badge-blue">${item.category}</span></td>
            <td>${item.issue}</td>
            <td><i class="fa-regular fa-calendar-days" style="margin-right: 5px; color: #94a3b8;"></i>${item.date}</td>
            <td><i class="fa-solid fa-wrench" style="margin-right: 5px; color: #38bdf8;"></i>${item.tech}</td>
            <td><span class="badge ${item.priority === 'Critical' ? 'badge-red' : (item.priority === 'High' ? 'badge-gold' : 'badge-blue')}">${item.priority}</span></td>
            <td><span class="badge ${item.status === 'In Progress' ? 'badge-teal' : 'badge-purple'}">${item.status}</span></td>
            <td class="text-center">
                <div class="action-btn-group">
                    <button type="button" class="btn-table-icon" onclick="openEditMasterModal('maintenance', '${item.id}')" title="Edit Ticket"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button type="button" class="btn-table-icon" onclick="toggleMasterRecordStatus('maintenance', '${item.id}')" title="Toggle Status"><i class="fa-solid fa-rotate"></i></button>
                    <button type="button" class="btn-table-icon btn-table-del" onclick="deleteMasterRecord('maintenance', '${item.id}')" title="Delete Ticket"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderAllMasterTables() {
    renderAreaTable(masterDatasets.area);
    renderPlantTable(masterDatasets.plant);
    renderWeighbridgeTable(masterDatasets.weighbridge);
    renderCheckpostTable(masterDatasets.checkpost);
    renderTransporterTable(masterDatasets.transporter);
    renderMaintenanceTable(masterDatasets.maintenance);
}

// ==========================================================================
// 3. FILTER & SEARCH HANDLER
// ==========================================================================
window.filterMasterTable = function(type) {
    let filtered = [...masterDatasets[type]];

    if (type === 'area') {
        const query = (document.getElementById('searchAreaInput')?.value || '').toLowerCase().trim();
        const zone = document.getElementById('filterAreaZone')?.value || 'all';
        const status = document.getElementById('filterAreaStatus')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.gm.toLowerCase().includes(query) || item.hq.toLowerCase().includes(query);
            const matchesZone = (zone === 'all') || item.zone.includes(zone);
            const matchesStatus = (status === 'all') || item.status === status;
            return matchesQuery && matchesZone && matchesStatus;
        });
        renderAreaTable(filtered);
    } 
    else if (type === 'plant') {
        const query = (document.getElementById('searchPlantInput')?.value || '').toLowerCase().trim();
        const pType = document.getElementById('filterPlantType')?.value || 'all';
        const area = document.getElementById('filterPlantArea')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.area.toLowerCase().includes(query);
            const matchesType = (pType === 'all') || item.type === pType;
            const matchesArea = (area === 'all') || item.area.includes(area);
            return matchesQuery && matchesType && matchesArea;
        });
        renderPlantTable(filtered);
    }
    else if (type === 'weighbridge') {
        const query = (document.getElementById('searchWbInput')?.value || '').toLowerCase().trim();
        const status = document.getElementById('filterWbStatus')?.value || 'all';
        const capacity = document.getElementById('filterWbCapacity')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.area.toLowerCase().includes(query);
            const matchesStatus = (status === 'all') || item.status === status;
            const matchesCapacity = (capacity === 'all') || item.capacity === capacity;
            return matchesQuery && matchesStatus && matchesCapacity;
        });
        renderWeighbridgeTable(filtered);
    }
    else if (type === 'checkpost') {
        const query = (document.getElementById('searchCpInput')?.value || '').toLowerCase().trim();
        const mode = document.getElementById('filterCpMode')?.value || 'all';
        const area = document.getElementById('filterCpArea')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.area.toLowerCase().includes(query);
            const matchesMode = (mode === 'all') || item.mode === mode;
            const matchesArea = (area === 'all') || item.area.includes(area);
            return matchesQuery && matchesMode && matchesArea;
        });
        renderCheckpostTable(filtered);
    }
    else if (type === 'transporter') {
        const query = (document.getElementById('searchTransporterInput')?.value || '').toLowerCase().trim();
        const status = document.getElementById('filterTransporterStatus')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.name.toLowerCase().includes(query) || item.gstin.toLowerCase().includes(query) || item.wo.toLowerCase().includes(query);
            const matchesStatus = (status === 'all') || item.status === status;
            return matchesQuery && matchesStatus;
        });
        renderTransporterTable(filtered);
    }
    else if (type === 'maintenance') {
        const query = (document.getElementById('searchMaintInput')?.value || '').toLowerCase().trim();
        const category = document.getElementById('filterMaintCategory')?.value || 'all';
        const priority = document.getElementById('filterMaintPriority')?.value || 'all';

        filtered = filtered.filter(item => {
            const matchesQuery = !query || item.id.toLowerCase().includes(query) || item.asset.toLowerCase().includes(query) || item.issue.toLowerCase().includes(query) || item.tech.toLowerCase().includes(query);
            const matchesCategory = (category === 'all') || item.category === category;
            const matchesPriority = (priority === 'all') || item.priority === priority;
            return matchesQuery && matchesCategory && matchesPriority;
        });
        renderMaintenanceTable(filtered);
    }
};

// ==========================================================================
// 4. ACTION HANDLERS: TOGGLE STATUS & DELETE
// ==========================================================================
window.toggleMasterRecordStatus = function(type, id) {
    const list = masterDatasets[type];
    const item = list.find(x => x.id === id);
    if (!item) return;

    if (type === 'weighbridge') {
        item.status = item.status === 'Online' ? 'Calibration' : (item.status === 'Calibration' ? 'Offline' : 'Online');
    } else if (type === 'maintenance') {
        item.status = item.status === 'In Progress' ? 'Resolved' : 'In Progress';
    } else if (type === 'transporter') {
        item.status = item.status === 'Active' ? 'Suspended' : 'Active';
    } else {
        item.status = item.status === 'Active' ? 'Inactive' : 'Active';
    }

    filterMasterTable(type);
};

window.deleteMasterRecord = function(type, id) {
    if (confirm(`Are you sure you want to remove ${type.toUpperCase()} record [${id}] from TRACE Masters?`)) {
        masterDatasets[type] = masterDatasets[type].filter(x => x.id !== id);
        filterMasterTable(type);
    }
};

// ==========================================================================
// 5. INTERACTIVE MODAL DIALOGS (ADD / EDIT)
// ==========================================================================
let currentModalContext = { type: 'area', mode: 'add', editId: null };

window.closeMasterModal = function() {
    const modal = document.getElementById('configMasterModal');
    if (modal) modal.style.display = 'none';
};

window.openAddMasterModal = function(type) {
    currentModalContext = { type, mode: 'add', editId: null };
    setupMasterModal(type, 'add');
};

window.openEditMasterModal = function(type, id) {
    currentModalContext = { type, mode: 'edit', editId: id };
    setupMasterModal(type, 'edit', id);
};

function setupMasterModal(type, mode, id = null) {
    const modal = document.getElementById('configMasterModal');
    const titleEl = document.getElementById('masterModalTitle');
    const bodyEl = document.getElementById('masterModalBody');
    const submitBtn = document.getElementById('masterModalSubmitBtn');
    if (!modal || !bodyEl) return;

    let item = null;
    if (mode === 'edit' && id) {
        item = masterDatasets[type].find(x => x.id === id);
    }

    const titles = {
        area: mode === 'add' ? 'Add Mining Area' : `Edit Mining Area (${id})`,
        plant: mode === 'add' ? 'Add Coal Plant / Colliery' : `Edit Plant (${id})`,
        weighbridge: mode === 'add' ? 'Register Weighbridge Scale' : `Edit Weighbridge (${id})`,
        checkpost: mode === 'add' ? 'Add Security Checkpost' : `Edit Checkpost (${id})`,
        transporter: mode === 'add' ? 'Register Transporter Agency' : `Edit Transporter (${id})`,
        maintenance: mode === 'add' ? 'Log Service / Repair Ticket' : `Edit Maintenance Ticket (${id})`
    };

    if (titleEl) titleEl.textContent = titles[type] || 'Master Record';
    if (submitBtn) submitBtn.innerHTML = mode === 'add' ? '<i class="fa-solid fa-plus"></i> Save Record' : '<i class="fa-solid fa-check"></i> Update Record';

    // Generate fields based on Master Type
    if (type === 'area') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Area Code</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'AR-' + Math.floor(10 + Math.random()*90)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Area Name</label>
                    <input type="text" name="name" class="form-input" value="${item ? item.name : ''}" placeholder="e.g. North Karanpura Area" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Mining Zone / Region</label>
                    <select name="zone" class="form-input">
                        <option ${item?.zone === 'North Karanpura' ? 'selected' : ''}>North Karanpura</option>
                        <option ${item?.zone === 'South Karanpura' ? 'selected' : ''}>South Karanpura</option>
                        <option ${item?.zone === 'Bokaro Basin' ? 'selected' : ''}>Bokaro Basin</option>
                        <option ${item?.zone === 'Rajrappa Region' ? 'selected' : ''}>Rajrappa Region</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Regional Headquarters</label>
                    <input type="text" name="hq" class="form-input" value="${item ? item.hq : 'Dakra HQ'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Annual Production Target</label>
                    <input type="text" name="target" class="form-input" value="${item ? item.target : '25.0 MT'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">General Manager In-Charge</label>
                    <input type="text" name="gm" class="form-input" value="${item ? item.gm : 'Er. R. K. Sharma'}" required>
                </div>
            </div>
        `;
    } else if (type === 'plant') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Plant Code</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'PL-' + Math.floor(100 + Math.random()*900)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Plant / Mine Name</label>
                    <input type="text" name="name" class="form-input" value="${item ? item.name : ''}" placeholder="e.g. Amrapali Opencast Pit #2" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Parent Mining Area</label>
                    <input type="text" name="area" class="form-input" value="${item ? item.area : 'North Karanpura'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Classification Type</label>
                    <select name="type" class="form-input">
                        <option ${item?.type === 'Opencast Pit (OCP)' ? 'selected' : ''}>Opencast Pit (OCP)</option>
                        <option ${item?.type === 'Heavy Washery' ? 'selected' : ''}>Heavy Washery</option>
                        <option ${item?.type === 'Underground (UG)' ? 'selected' : ''}>Underground (UG)</option>
                        <option ${item?.type === 'Railway Siding' ? 'selected' : ''}>Railway Siding</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Daily Rated Capacity (TPD)</label>
                    <input type="text" name="capacity" class="form-input" value="${item ? item.capacity : '25,000 TPD'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">SCADA Integration</label>
                    <input type="text" name="scada" class="form-input" value="${item ? item.scada : 'Connected (Live)'}" required>
                </div>
            </div>
        `;
    } else if (type === 'weighbridge') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Weighbridge Code</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'WB-' + Math.floor(10 + Math.random()*90)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Weighbridge Name</label>
                    <input type="text" name="name" class="form-input" value="${item ? item.name : ''}" placeholder="e.g. Amrapali Siding WB #04" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Colliery / Area Location</label>
                    <input type="text" name="area" class="form-input" value="${item ? item.area : 'Amrapali Area'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Gross Capacity Rating</label>
                    <select name="capacity" class="form-input">
                        <option ${item?.capacity === '100 MT' ? 'selected' : ''}>100 MT</option>
                        <option ${item?.capacity === '80 MT' ? 'selected' : ''}>80 MT</option>
                        <option ${item?.capacity === '60 MT' ? 'selected' : ''}>60 MT</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Load Cell Architecture</label>
                    <input type="text" name="cell" class="form-input" value="${item ? item.cell : '4x 30T Digital Compression'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">ANPR Optical Cameras</label>
                    <input type="text" name="anpr" class="form-input" value="${item ? item.anpr : '2x HD Front & Top'}" required>
                </div>
            </div>
        `;
    } else if (type === 'checkpost') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Gate Code</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'CP-' + Math.floor(100 + Math.random()*900)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Checkpost Name</label>
                    <input type="text" name="name" class="form-input" value="${item ? item.name : ''}" placeholder="e.g. Amrapali Siding Checkpost A2" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Mining Sector</label>
                    <input type="text" name="area" class="form-input" value="${item ? item.area : 'North Karanpura'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Lane Topology</label>
                    <input type="text" name="lane" class="form-input" value="${item ? item.lane : 'Dedicated Dual Lane'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Barrier Operating Mode</label>
                    <select name="mode" class="form-input">
                        <option ${item?.mode === 'AUTO' ? 'selected' : ''}>AUTO</option>
                        <option ${item?.mode === 'MANUAL' ? 'selected' : ''}>MANUAL</option>
                        <option ${item?.mode === 'MAINTENANCE' ? 'selected' : ''}>MAINTENANCE</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">RFID Reader IP / Model</label>
                    <input type="text" name="rfid" class="form-input" value="${item ? item.rfid : 'Impinj Speedway UHF Gen2'}" required>
                </div>
            </div>
        `;
    } else if (type === 'transporter') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Transporter Agency Code</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'TR-' + Math.floor(500 + Math.random()*400)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Transporter Agency Name</label>
                    <input type="text" name="name" class="form-input" value="${item ? item.name : ''}" placeholder="e.g. Royal Coal Logistics Pvt Ltd" required>
                </div>
                <div class="form-group">
                    <label class="form-label">GSTIN Number</label>
                    <input type="text" name="gstin" class="form-input" value="${item ? item.gstin : '20AAACR' + Math.floor(1000 + Math.random()*9000) + 'A1Z5'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Work Order Reference</label>
                    <input type="text" name="wo" class="form-input" value="${item ? item.wo : 'CIL/CCL/WO-2026/' + Math.floor(100 + Math.random()*900)}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Allocated Fleet Trucks</label>
                    <input type="number" name="trucks" class="form-input" value="${item ? item.trucks : 85}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Contract Expiry Date</label>
                    <input type="date" name="expiry" class="form-input" value="${item ? item.expiry : '2027-03-31'}" required>
                </div>
            </div>
        `;
    } else if (type === 'maintenance') {
        bodyEl.innerHTML = `
            <div class="modal-form-grid">
                <div class="form-group">
                    <label class="form-label">Ticket Reference #</label>
                    <input type="text" name="id" class="form-input" value="${item ? item.id : 'MNT-' + Math.floor(8800 + Math.random()*200)}" required ${mode === 'edit' ? 'readonly' : ''}>
                </div>
                <div class="form-group">
                    <label class="form-label">Asset / Machine ID</label>
                    <input type="text" name="asset" class="form-input" value="${item ? item.asset : 'WB-01 (Load Cell #2)'}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Asset Category</label>
                    <select name="category" class="form-input">
                        <option ${item?.category === 'Weighbridge Scale' ? 'selected' : ''}>Weighbridge Scale</option>
                        <option ${item?.category === 'Boom Barrier' ? 'selected' : ''}>Boom Barrier</option>
                        <option ${item?.category === 'RFID Scanner' ? 'selected' : ''}>RFID Scanner</option>
                        <option ${item?.category === 'ANPR Optical Camera' ? 'selected' : ''}>ANPR Optical Camera</option>
                        <option ${item?.category === 'GPS Telemetry Unit' ? 'selected' : ''}>GPS Telemetry Unit</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Priority Level</label>
                    <select name="priority" class="form-input">
                        <option ${item?.priority === 'Critical' ? 'selected' : ''}>Critical</option>
                        <option ${item?.priority === 'High' ? 'selected' : ''}>High</option>
                        <option ${item?.priority === 'Routine' ? 'selected' : ''}>Routine</option>
                    </select>
                </div>
                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Reported Issue / Task Description</label>
                    <input type="text" name="issue" class="form-input" value="${item ? item.issue : ''}" placeholder="e.g. Zero-drift error recalibration required" required>
                </div>
            </div>
        `;
    }

    modal.style.display = 'flex';
}

window.handleMasterFormSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { type, mode, editId } = currentModalContext;

    const record = {};
    formData.forEach((value, key) => {
        record[key] = value;
    });

    if (!record.status) {
        record.status = type === 'maintenance' ? 'In Progress' : (type === 'weighbridge' ? 'Online' : 'Active');
    }
    if (record.mines) record.mines = parseInt(record.mines) || 4;
    if (record.trucks) record.trucks = parseInt(record.trucks) || 50;

    if (mode === 'add') {
        masterDatasets[type].unshift(record);
    } else if (mode === 'edit' && editId) {
        const idx = masterDatasets[type].findIndex(x => x.id === editId);
        if (idx !== -1) {
            masterDatasets[type][idx] = { ...masterDatasets[type][idx], ...record };
        }
    }

    closeMasterModal();
    filterMasterTable(type);
};

// ==========================================================================
// 6. CSV EXPORT ENGINE
// ==========================================================================
window.exportMasterTableToCsv = function(type) {
    const data = masterDatasets[type];
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','),
        ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `TRACE_Master_${type.toUpperCase()}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// ==========================================================================
// 7. ROUTING & NAVIGATION HANDLERS
// ==========================================================================
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

    if (window.updateHeaderMainTitle) {
        window.updateHeaderMainTitle(title);
    }

    document.querySelectorAll('.tab-content-panel').forEach(panel => {
        if (panel.id === viewId) {
            panel.classList.add('active');
            panel.style.display = 'block';
        } else {
            panel.classList.remove('active');
            panel.style.display = 'none';
        }
    });

    renderAllMasterTables();
}

window.showConfigArea = function() {
    showConfigMaster('config-area-view', 'configAreaNavItem', 'CONTRACT MANAGEMENT • AREA MASTER');
    window.location.hash = '#config-area';
};
window.showConfigPlant = function() {
    showConfigMaster('config-plant-view', 'configPlantNavItem', 'CONTRACT MANAGEMENT • PLANT MASTER');
    window.location.hash = '#config-plant';
};
window.showConfigWeighbridge = function() {
    showConfigMaster('config-weighbridge-view', 'configWeighbridgeNavItem', 'CONTRACT MANAGEMENT • WEIGHBRIDGE MASTER');
    window.location.hash = '#config-weighbridge';
};
window.showConfigCheckpost = function() {
    showConfigMaster('config-checkpost-view', 'configCheckpostNavItem', 'CONTRACT MANAGEMENT • CHECKPOST MASTER');
    window.location.hash = '#config-checkpost';
};
window.showConfigTransporter = function() {
    showConfigMaster('config-transporter-view', 'configTransporterNavItem', 'CONTRACT MANAGEMENT • TRANSPORTER MASTER');
    window.location.hash = '#config-transporter';
};
window.showConfigMaintenance = function() {
    showConfigMaster('config-maintenance-view', 'configMaintenanceNavItem', 'CONTRACT MANAGEMENT • MAINTENANCE MASTER');
    window.location.hash = '#config-maintenance';
};

// Initial auto-load & hash router for sub-views
function handleConfigHashRoute() {
    const hash = window.location.hash;
    if (hash === '#config-area') {
        showConfigArea();
    } else if (hash === '#config-plant') {
        showConfigPlant();
    } else if (hash === '#config-weighbridge') {
        showConfigWeighbridge();
    } else if (hash === '#config-checkpost') {
        showConfigCheckpost();
    } else if (hash === '#config-transporter') {
        showConfigTransporter();
    } else if (hash === '#config-maintenance') {
        showConfigMaintenance();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllMasterTables();
    handleConfigHashRoute();
    window.addEventListener('hashchange', handleConfigHashRoute);
});
