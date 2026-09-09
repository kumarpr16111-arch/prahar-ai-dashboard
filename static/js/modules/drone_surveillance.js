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
