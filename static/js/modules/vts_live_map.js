// ========================================================
// VTS LIVE TRACKING MODULE (Leaflet Satellite & Multi-Mine Fleet)
// Real-time GPS vehicle tracking spread across CCL Coalfields
// ========================================================

(function() {
    'use strict';

    let map = null;
    let mapLayers = {};
    let currentLayerIndex = 0;
    let geofenceLayerGroup = null;
    let routesLayerGroup = null;
    let vehicleMarkersGroup = null;
    let activeRoutePolyline = null;

    let allLiveVehicles = [];
    let activeMineSectorKey = 'amrapali';
    let selectedVehicleId = 'JH02BC9171'; // Default selected vehicle
    let liveFilterStatus = 'Online';
    let liveSearchQuery = '';
    let isReplayActive = false;
    let replayTimer = null;
    let replaySpeed = 1;
    let replayProgress = 0;
    let animationFrameId = null;
    let lastAnimTime = 0;

    // All 14 CCL Mining Sectors with Coordinates strictly placed over REAL Open-Cast Coal Quarry Pits
    const MINE_SECTORS = {
        all: {
            name: 'All Coalfields Overview',
            code: 'ALL',
            center: [23.78, 85.35],
            zoom: 9
        },
        amrapali: {
            name: 'Amrapali Open Cast Project',
            code: 'CO07',
            center: [23.8265, 85.0482], // Real Amrapali Mega Pit Benches
            zoom: 15
        },
        magadh: {
            name: 'Magadh Open Cast Project',
            code: 'CO06',
            center: [23.8680, 84.9820], // Real Magadh Mega Open Cast Pit
            zoom: 15
        },
        piparwar: {
            name: 'Ashoka & Piparwar OCP',
            code: 'CO13',
            center: [23.7380, 85.0350], // Real Ashoka Open Cast Pit
            zoom: 15
        },
        nk: {
            name: 'Dakra & Rohini OCP (NK Area)',
            code: 'CO03',
            center: [23.6880, 85.0320], // Real Dakra Quarry Pit Face
            zoom: 15
        },
        barka: {
            name: 'Urimari & Birsa OCP (Barka-Sayal)',
            code: 'CO01',
            center: [23.6850, 85.2950], // Real Urimari Open Cast Pit
            zoom: 15
        },
        argada: {
            name: 'Giddi-A & Religara OCP (Argada)',
            code: 'CO02',
            center: [23.7080, 85.3850], // Real Giddi Open Cast Pit
            zoom: 15
        },
        kuju: {
            name: 'Karma & Topa OCP (Kuju Area)',
            code: 'CO09',
            center: [23.7250, 85.5550], // Real Karma Open Cast Pit
            zoom: 15
        },
        hazaribagh: {
            name: 'Tapin & Kedla OCP (Hazaribagh Area)',
            code: 'CO10',
            center: [23.8180, 85.5780], // Real Tapin/Kedla Open Cast Pit (NOT Hazaribagh town!)
            zoom: 15
        },
        bokaro: {
            name: 'Karo & Kargali OCP (B&K Area)',
            code: 'CO04',
            center: [23.7780, 85.9250], // Real Karo Open Cast Pit
            zoom: 15
        },
        kathara: {
            name: 'Kathara & Jarangdih OCP',
            code: 'CO05',
            center: [23.7620, 85.8650], // Real Kathara Open Cast Pit
            zoom: 15
        },
        dhori: {
            name: 'Selected Dhori & SD OCM',
            code: 'CO12',
            center: [23.7680, 85.9650], // Real Dhori Open Cast Pit
            zoom: 15
        },
        rajrappa: {
            name: 'Rajrappa Open Cast Project',
            code: 'CO11',
            center: [23.6150, 85.7020], // Real Rajrappa Open Cast Pit
            zoom: 15
        },
        giridih: {
            name: 'Kabribad OCP (Giridih Area)',
            code: 'CO15',
            center: [24.1620, 86.2750], // Real Kabribad Open Cast Pit (NOT Giridih town!)
            zoom: 15
        },
        rajhara: {
            name: 'Rajhara Colliery OCP',
            code: 'CO08',
            center: [24.1580, 84.2180], // Real Rajhara Open Cast Pit (NOT residential area!)
            zoom: 15
        }
    };

    // Helper: Generate local routes & geofences strictly inside the open quarry pit cuts
    function generateMineGeodata(sectorKey, center) {
        const [cLat, cLng] = center;
        const d = 0.0045; // Tightened scale offset to stay strictly inside open pit quarry benches

        // 1. Boundary Polygon wrapping quarry rim
        const boundary = [
            [cLat + d * 1.1, cLng - d * 1.3],
            [cLat + d * 1.3, cLng + d * 0.4],
            [cLat + d * 0.7, cLng + d * 1.4],
            [cLat - d * 0.3, cLng + d * 1.5],
            [cLat - d * 1.1, cLng + d * 0.9],
            [cLat - d * 1.2, cLng - d * 0.4],
            [cLat - d * 0.7, cLng - d * 1.2],
            [cLat + d * 0.3, cLng - d * 1.4],
            [cLat + d * 1.1, cLng - d * 1.3]
        ];

        // 2. Stockpiles & Weighbridge POIs inside mine lease
        const zones = [
            { name: `${MINE_SECTORS[sectorKey].name} Stockpile 01`, color: '#38bdf8', coords: [
                [cLat + d * 0.4, cLng - d * 0.5], [cLat + d * 0.4, cLng - d * 0.2],
                [cLat + d * 0.15, cLng - d * 0.2], [cLat + d * 0.15, cLng - d * 0.5]
            ], labelPos: [cLat + d * 0.28, cLng - d * 0.35] },
            { name: `${MINE_SECTORS[sectorKey].name} Stockpile 02`, color: '#38bdf8', coords: [
                [cLat - d * 0.2, cLng + d * 0.3], [cLat - d * 0.2, cLng + d * 0.6],
                [cLat - d * 0.45, cLng + d * 0.6], [cLat - d * 0.45, cLng + d * 0.3]
            ], labelPos: [cLat - d * 0.32, cLng + d * 0.45] },
            { name: `${MINE_SECTORS[sectorKey].name} Pit Office`, color: '#fbbf24', coords: [
                [cLat + d * 0.8, cLng + d * 0.1], [cLat + d * 0.8, cLng + d * 0.35],
                [cLat + d * 0.6, cLng + d * 0.35], [cLat + d * 0.6, cLng + d * 0.1]
            ], labelPos: [cLat + d * 0.7, cLng + d * 0.22] },
            { name: `${MINE_SECTORS[sectorKey].name} Workshop`, color: '#fbbf24', coords: [
                [cLat + d * 0.7, cLng + d * 0.5], [cLat + d * 0.7, cLng + d * 0.75],
                [cLat + d * 0.5, cLng + d * 0.75], [cLat + d * 0.5, cLng + d * 0.5]
            ], labelPos: [cLat + d * 0.6, cLng + d * 0.62] }
        ];

        const pois = [
            { name: `Checkpost No. 1`, pos: [cLat + d * 0.95, cLng - d * 0.95], icon: "fa-solid fa-shield-halved", color: "#38bdf8" },
            { name: `Pit Weighbridge 01`, pos: [cLat + d * 0.75, cLng - d * 0.6], icon: "fa-solid fa-scale-balanced", color: "#4ade80" },
            { name: `Incline Weighbridge 02`, pos: [cLat + d * 0.55, cLng - d * 0.3], icon: "fa-solid fa-scale-balanced", color: "#4ade80" },
            { name: `Coal Siding Terminal`, pos: [cLat - d * 0.75, cLng + d * 1.0], icon: "fa-solid fa-train-subway", color: "#f97316" }
        ];

        // 3. Local Haul Network strictly along quarry haul roads
        const routes = [
            // Main Haul Pit Incline (Orange)
            [
                [cLat + d * 0.95, cLng - d * 0.95],
                [cLat + d * 0.75, cLng - d * 0.6],
                [cLat + d * 0.55, cLng - d * 0.3],
                [cLat + d * 0.25, cLng - d * 0.1],
                [cLat, cLng],
                [cLat - d * 0.25, cLng + d * 0.35],
                [cLat - d * 0.55, cLng + d * 0.75],
                [cLat - d * 0.75, cLng + d * 1.0]
            ],
            // Deep Bench Excavation Loop (Cyan)
            [
                [cLat + d * 0.25, cLng - d * 0.1],
                [cLat + d * 0.05, cLng + d * 0.25],
                [cLat - d * 0.15, cLng + d * 0.5],
                [cLat - d * 0.45, cLng + d * 0.8],
                [cLat - d * 0.75, cLng + d * 1.0]
            ],
            // Stockpile Feeder Route (Yellow)
            [
                [cLat + d * 0.95, cLng - d * 0.95],
                [cLat + d * 0.85, cLng + d * 0.15],
                [cLat + d * 0.65, cLng + d * 0.6],
                [cLat + d * 0.25, cLng + d * 1.1],
                [cLat - d * 0.4, cLng + d * 1.2],
                [cLat - d * 0.75, cLng + d * 1.0]
            ]
        ];

        return { boundary, zones, pois, routes };
    }

    // ==========================================
    // INITIALIZATION & VIEW CONTROLS
    // ==========================================

    window.openVtsLiveTrackingView = function(targetVehicleNo = null) {
        document.body.classList.remove('alert-mode-active');
        document.body.classList.add('gis-mode-active');

        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = 'none';

        const tabsCard = document.querySelector('.tabs-card');
        if (tabsCard) tabsCard.style.display = 'none';

        if (window.updateHeaderMainTitle) {
            window.updateHeaderMainTitle('VTS LIVE FLEET TRACKING — REAL-TIME GPS');
        }

        document.querySelectorAll('.tab-content-panel').forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none';
        });

        const liveMapPanel = document.getElementById('vts-live-map-view');
        if (liveMapPanel) {
            liveMapPanel.classList.add('active');
            liveMapPanel.style.display = 'block';
        }

        setTimeout(() => {
            initLeafletLiveMap();
            initDistributedVehiclesSwarm();
            
            if (targetVehicleNo) {
                const found = allLiveVehicles.find(v => v.vehicle_no === targetVehicleNo);
                if (found) {
                    activeMineSectorKey = found.mineSectorKey;
                }
                selectedVehicleId = targetVehicleNo;
            } else if (!selectedVehicleId) {
                selectedVehicleId = 'JH02BC9171';
            }

            selectMineSector(activeMineSectorKey, false);
            startAnimationLoop();
        }, 80);
    };

    window.closeVtsLiveTrackingView = function() {
        stopAnimationLoop();
        document.body.classList.remove('gis-mode-active');
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.style.display = '';

        const liveMapPanel = document.getElementById('vts-live-map-view');
        if (liveMapPanel) {
            liveMapPanel.classList.remove('active');
            liveMapPanel.style.display = 'none';
        }

        if (window.showVTSDashboard) {
            window.showVTSDashboard();
        } else if (window.showSummaryTab) {
            window.showSummaryTab('vts');
        }
    };

    // ==========================================
    // LEAFLET SATELLITE MAP INITIALIZATION
    // ==========================================

    function initLeafletLiveMap() {
        const container = document.getElementById('vtsLiveMapContainer');
        if (!container) return;

        if (map) {
            map.invalidateSize();
            return;
        }

        // Esri Satellite Imagery
        const esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Esri World Imagery, DigitalGlobe, GeoEye, CCL VTS',
            maxZoom: 19,
            subdomains: ['server', 'services']
        });

        // OpenStreetMap Standard
        const osmStandard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        });

        // CartoDB Dark Matter
        const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CartoDB Dark Matter',
            maxZoom: 19
        });

        mapLayers = {
            'satellite': esriSatellite,
            'osm': osmStandard,
            'dark': cartoDark
        };

        const initCenter = MINE_SECTORS.amrapali.center;
        map = L.map('vtsLiveMapContainer', {
            center: initCenter,
            zoom: MINE_SECTORS.amrapali.zoom,
            zoomControl: false,
            layers: [esriSatellite]
        });

        L.control.scale({ position: 'bottomright', imperial: false, maxWidth: 120 }).addTo(map);

        geofenceLayerGroup = L.layerGroup().addTo(map);
        routesLayerGroup = L.layerGroup().addTo(map);
        vehicleMarkersGroup = L.layerGroup().addTo(map);
    }

    // ==========================================
    // MULTI-MINE VEHICLE SWARM (Spread ~10 Trucks Per Mine)
    // ==========================================

    function initDistributedVehiclesSwarm() {
        if (allLiveVehicles.length > 0) return;

        const rawData = window.VTS_FLEET_DATA || [];
        const sectorKeys = Object.keys(MINE_SECTORS).filter(k => k !== 'all');
        const trucksPerMine = 10;

        let globalIndex = 0;
        sectorKeys.forEach(sectorKey => {
            const sectorMeta = MINE_SECTORS[sectorKey];
            const geodata = generateMineGeodata(sectorKey, sectorMeta.center);

            // Filter vehicles that match area name, or allocate real vehicles
            let areaVehicles = rawData.filter(d => 
                (d.area || '').toLowerCase().includes(sectorKey) || 
                (d.project || '').toLowerCase().includes(sectorKey)
            );

            // If not enough records matching exactly, take slice from total fleet
            if (areaVehicles.length < trucksPerMine) {
                const sliceStart = (globalIndex * trucksPerMine) % rawData.length;
                areaVehicles = rawData.slice(sliceStart, sliceStart + trucksPerMine);
            }

            // Exactly ~10-12 trucks per mine
            const mineFleet = areaVehicles.slice(0, trucksPerMine + 2);

            mineFleet.forEach((item, localIdx) => {
                const isOnline = localIdx < trucksPerMine ? (localIdx % 6 !== 5) : false; // ~85% online, 15% offline
                const routePoints = geodata.routes[localIdx % geodata.routes.length];
                const routeProgress = (localIdx * 0.23) % 1.0;
                const startCoord = interpolateRoutePosition(routePoints, routeProgress);

                // Realistic slow dumper speed (2.5 to 7.0 km/h)
                const speed = isOnline ? (2.2 + (localIdx % 5) * 0.9).toFixed(2) : '0.00';
                const tareWt = (14.20 + (localIdx % 4) * 0.5).toFixed(2);
                const grossWt = isOnline && (localIdx % 2 === 0) ? (32.80 + (localIdx % 5) * 0.7).toFixed(2) : tareWt;
                const loadState = parseFloat(grossWt) > parseFloat(tareWt) + 5 ? 'Loaded' : 'Empty';
                const operator = (localIdx % 3 === 0) ? 'airtel' : (localIdx % 3 === 1 ? 'jio' : 'vodafone');
                const voltage = (24.80 + (localIdx % 3) * 0.7).toFixed(2);

                allLiveVehicles.push({
                    id: item.vehicle_no,
                    vehicle_no: item.vehicle_no,
                    area: sectorMeta.name,
                    project: item.project || sectorMeta.name,
                    transporter: item.transporter || 'M/s Logistics Operator Ltd',
                    status: isOnline ? 'Online' : 'Offline',
                    isOnline: isOnline,
                    mineSectorKey: sectorKey,
                    routePoints: routePoints,
                    routeProgress: routeProgress,
                    direction: (localIdx % 2 === 0) ? 1 : -1,
                    lat: startCoord.lat,
                    lng: startCoord.lng,
                    bearing: startCoord.bearing || 0,
                    speed: speed,
                    tareWt: tareWt,
                    grossWt: grossWt,
                    loadState: loadState,
                    operator: operator,
                    voltage: voltage,
                    power: 'Yes',
                    charge: 'Yes',
                    lastUpdate: getFormattedTimestamp(),
                    marker: null
                });
            });

            globalIndex++;
        });

        // Ensure key screenshot vehicle is in Amrapali
        const keyVeh = allLiveVehicles.find(v => v.vehicle_no === 'JH02BC9171');
        if (keyVeh) {
            keyVeh.mineSectorKey = 'amrapali';
            keyVeh.status = 'Online';
            keyVeh.isOnline = true;
            keyVeh.speed = '3.80';
            keyVeh.tareWt = '15.90';
            keyVeh.grossWt = '33.86';
            keyVeh.loadState = 'Loaded';
            keyVeh.voltage = '26.87';
        }
    }

    // ==========================================
    // MINE SECTOR SWITCHING (Smooth FlyTo & Auto Zoom)
    // ==========================================

    window.selectMineSector = function(sectorKey, flyToLocation = true) {
        if (!MINE_SECTORS[sectorKey]) sectorKey = 'amrapali';
        activeMineSectorKey = sectorKey;

        // Update UI Dropdown & Chip Buttons
        const areaSelect = document.getElementById('vtsLiveAreaSelect');
        if (areaSelect) areaSelect.value = sectorKey;

        document.querySelectorAll('.vts-mine-chips-bar .vts-mine-chip').forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-mine') === sectorKey);
        });

        // Render Geofences and Haul Routes for this Mine
        renderMineGeofencesAndRoutes(sectorKey);

        // Spawn / Filter Vehicle Markers on Map
        spawnFilteredVehicleMarkers();

        // Render Sidebar List for this Mine
        renderVehicleSidebarList();

        // Smooth Auto Zoom-out and Pan to Mine Location (Just like GIS Camera View)
        if (flyToLocation && map) {
            const targetMeta = MINE_SECTORS[sectorKey];
            map.flyTo(targetMeta.center, targetMeta.zoom, {
                animate: true,
                duration: 1.2,
                easeLinearity: 0.25
            });
        }

        // Auto select first online vehicle in this mine
        const firstVeh = allLiveVehicles.find(v => (sectorKey === 'all' || v.mineSectorKey === sectorKey) && v.isOnline);
        if (firstVeh) {
            selectVehicle(firstVeh.vehicle_no, false);
        }
    };

    window.handleVtsAreaSelect = function(sectorKey) {
        selectMineSector(sectorKey, true);
    };

    window.recenterActiveMine = function() {
        if (!map || !MINE_SECTORS[activeMineSectorKey]) return;
        const targetMeta = MINE_SECTORS[activeMineSectorKey];
        map.flyTo(targetMeta.center, targetMeta.zoom, { duration: 1.0 });
    };

    // Render Geofences, Stockyards, and Haul Corridors
    function renderMineGeofencesAndRoutes(sectorKey) {
        if (!map || !geofenceLayerGroup || !routesLayerGroup) return;
        geofenceLayerGroup.clearLayers();
        routesLayerGroup.clearLayers();

        const sectorsToRender = (sectorKey === 'all') ? Object.keys(MINE_SECTORS).filter(k => k !== 'all') : [sectorKey];

        sectorsToRender.forEach(sKey => {
            const meta = MINE_SECTORS[sKey];
            const geodata = generateMineGeodata(sKey, meta.center);

            // Neon Green Mining Lease Boundary
            L.polygon(geodata.boundary, {
                color: '#22c55e',
                weight: 3,
                opacity: 0.9,
                fillColor: '#22c55e',
                fillOpacity: 0.04,
                dashArray: '4, 8'
            }).addTo(geofenceLayerGroup);

            // Sector Title Tag
            L.marker([meta.center[0] + 0.007, meta.center[1]], {
                icon: L.divIcon({
                    className: 'vts-geofence-title-tag',
                    html: `<span class="vts-geo-badge">${meta.name}</span>`,
                    iconSize: [160, 24],
                    iconAnchor: [80, 12]
                })
            }).addTo(geofenceLayerGroup);

            // Zone Polygons
            geodata.zones.forEach(zone => {
                L.polygon(zone.coords, {
                    color: zone.color,
                    weight: 2,
                    opacity: 0.85,
                    fillColor: zone.color,
                    fillOpacity: 0.15
                }).addTo(geofenceLayerGroup);

                if (zone.labelPos) {
                    L.marker(zone.labelPos, {
                        icon: L.divIcon({
                            className: 'vts-zone-label',
                            html: `<div class="vts-zone-tag" style="border-color: ${zone.color}">${zone.name}</div>`,
                            iconSize: [160, 20],
                            iconAnchor: [80, 10]
                        })
                    }).addTo(geofenceLayerGroup);
                }
            });

            // POIs (Weighbridges & Checkposts)
            geodata.pois.forEach(poi => {
                L.marker(poi.pos, {
                    icon: L.divIcon({
                        className: 'vts-poi-marker',
                        html: `
                            <div class="vts-poi-badge" style="border-color: ${poi.color}">
                                <i class="${poi.icon}" style="color: ${poi.color}"></i>
                                <span>${poi.name}</span>
                            </div>
                        `,
                        iconSize: [150, 24],
                        iconAnchor: [75, 12]
                    })
                }).addTo(geofenceLayerGroup);
            });

            // Glowing Haul Corridors
            const routeColors = ['#f97316', '#06b6d4', '#eab308'];
            geodata.routes.forEach((routePts, rIdx) => {
                L.polyline(routePts, {
                    color: routeColors[rIdx % routeColors.length],
                    weight: 4.5,
                    opacity: 0.8,
                    lineCap: 'round',
                    lineJoin: 'round'
                }).addTo(routesLayerGroup);
            });
        });
    }

    // ==========================================
    // SPAWN VEHICLE MARKERS (Distributed & Filtered)
    // ==========================================

    function spawnFilteredVehicleMarkers() {
        if (!map || !vehicleMarkersGroup) return;
        vehicleMarkersGroup.clearLayers();

        const visibleVehicles = allLiveVehicles.filter(v => {
            if (activeMineSectorKey !== 'all' && v.mineSectorKey !== activeMineSectorKey) return false;
            return true;
        });

        visibleVehicles.forEach(v => {
            const isSelected = v.vehicle_no === selectedVehicleId;
            const iconHtml = createVehicleMarkerHtml(v, isSelected);

            const customIcon = L.divIcon({
                className: 'vts-vehicle-marker-wrapper',
                html: iconHtml,
                iconSize: [80, 50],
                iconAnchor: [40, 25]
            });

            const marker = L.marker([v.lat, v.lng], {
                icon: customIcon,
                zIndexOffset: isSelected ? 1000 : (v.isOnline ? 100 : 10)
            }).addTo(vehicleMarkersGroup);

            marker.on('click', () => {
                selectVehicle(v.vehicle_no, true);
            });

            v.marker = marker;
        });
    }

    function createVehicleMarkerHtml(vehicle, isSelected) {
        const isOnline = vehicle.isOnline;
        const statusColor = isOnline ? '#22c55e' : '#ef4444';
        const pulseRing = isSelected ? '<div class="vts-marker-pulse-radar"></div>' : '';
        const selectedClass = isSelected ? 'is-active-truck' : '';

        return `
            <div class="vts-truck-node ${selectedClass}">
                ${pulseRing}
                <div class="vts-truck-badge" style="border-color: ${statusColor}">
                    <span class="vts-truck-tag">${vehicle.vehicle_no}</span>
                </div>
                <div class="vts-truck-icon-circle" style="background: ${isOnline ? '#0f172a' : '#1e293b'}; border: 2px solid ${statusColor}; transform: rotate(${vehicle.bearing || 0}deg)">
                    <i class="fa-solid fa-truck-moving" style="color: ${statusColor}"></i>
                </div>
            </div>
        `;
    }

    // ==========================================
    // REAL-TIME MOVEMENT (Smooth & Calm Slow Crawl)
    // ==========================================

    function startAnimationLoop() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        lastAnimTime = performance.now();

        function loop(now) {
            const deltaSec = Math.min((now - lastAnimTime) / 1000, 0.1);
            lastAnimTime = now;

            updateVehiclePositions(deltaSec);

            animationFrameId = requestAnimationFrame(loop);
        }

        animationFrameId = requestAnimationFrame(loop);
    }

    function stopAnimationLoop() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function updateVehiclePositions(deltaSec) {
        if (!map || isReplayActive) return;

        allLiveVehicles.forEach(v => {
            if (!v.isOnline || !v.marker) return;

            // Slow, realistic dumper speed (~2-5 km/h on mining haul road)
            const speedFactor = parseFloat(v.speed) || 3.0;
            const progressDelta = (speedFactor / 5500) * deltaSec * v.direction; // Calm, slow pace as requested
            v.routeProgress += progressDelta;

            if (v.routeProgress >= 1.0) {
                v.routeProgress = 1.0;
                v.direction = -1;
            } else if (v.routeProgress <= 0.0) {
                v.routeProgress = 0.0;
                v.direction = 1;
            }

            const newPos = interpolateRoutePosition(v.routePoints, v.routeProgress);
            v.lat = newPos.lat;
            v.lng = newPos.lng;
            v.bearing = newPos.bearing;

            v.marker.setLatLng([v.lat, v.lng]);

            if (v.vehicle_no === selectedVehicleId) {
                updateSelectedVehicleTrail(v);
                updateTelemetryHudValues(v);
            }
        });
    }

    function interpolateRoutePosition(points, progress) {
        if (!points || points.length === 0) return { lat: 23.8265, lng: 85.0482, bearing: 0 };
        if (points.length === 1) return { lat: points[0][0], lng: points[0][1], bearing: 0 };

        const totalSegments = points.length - 1;
        const scaledProgress = Math.max(0, Math.min(1, progress)) * totalSegments;
        const segmentIndex = Math.min(Math.floor(scaledProgress), totalSegments - 1);
        const segmentFraction = scaledProgress - segmentIndex;

        const p1 = points[segmentIndex];
        const p2 = points[segmentIndex + 1];

        const lat = p1[0] + (p2[0] - p1[0]) * segmentFraction;
        const lng = p1[1] + (p2[1] - p1[1]) * segmentFraction;

        const dLat = p2[0] - p1[0];
        const dLng = p2[1] - p1[1];
        let bearing = Math.atan2(dLng, dLat) * (180 / Math.PI);
        if (bearing < 0) bearing += 360;

        return { lat, lng, bearing: Math.round(bearing) };
    }

    function updateSelectedVehicleTrail(vehicle) {
        if (!map) return;

        if (!activeRoutePolyline) {
            activeRoutePolyline = L.polyline(vehicle.routePoints, {
                color: '#38bdf8',
                weight: 6,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round',
                className: 'vts-active-tracking-glow-corridor'
            }).addTo(map);
        } else {
            activeRoutePolyline.setLatLngs(vehicle.routePoints);
        }
    }

    // ==========================================
    // VEHICLE SELECTION & TELEMETRY HUD
    // ==========================================

    window.selectVehicle = function(vehicleNo, panMap = true) {
        selectedVehicleId = vehicleNo;
        const vehicle = allLiveVehicles.find(v => v.vehicle_no === vehicleNo);
        if (!vehicle) return;

        // If vehicle is in another mine sector, auto-switch to that mine sector
        if (activeMineSectorKey !== 'all' && vehicle.mineSectorKey !== activeMineSectorKey) {
            activeMineSectorKey = vehicle.mineSectorKey;
            const areaSelect = document.getElementById('vtsLiveAreaSelect');
            if (areaSelect) areaSelect.value = activeMineSectorKey;
            document.querySelectorAll('.vts-mine-chips-bar .vts-mine-chip').forEach(chip => {
                chip.classList.toggle('active', chip.getAttribute('data-mine') === activeMineSectorKey);
            });
            renderMineGeofencesAndRoutes(activeMineSectorKey);
            spawnFilteredVehicleMarkers();
            renderVehicleSidebarList();
        }

        // Pan / Fly to Vehicle
        if (panMap && map) {
            map.flyTo([vehicle.lat, vehicle.lng], 16, {
                animate: true,
                duration: 1.0
            });
        }

        // Update markers to refresh radar pulse
        spawnFilteredVehicleMarkers();

        // Update Active Route Corridor
        updateSelectedVehicleTrail(vehicle);

        // Highlight in Sidebar
        highlightSidebarVehicle(vehicleNo);

        // Update Bottom Telemetry HUD
        renderTelemetryHud(vehicle);
    };

    function highlightSidebarVehicle(vehicleNo) {
        const items = document.querySelectorAll('.vts-map-vehicle-item');
        items.forEach(item => {
            if (item.getAttribute('data-veh') === vehicleNo) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    function renderTelemetryHud(vehicle) {
        const hud = document.getElementById('vtsVehicleTelemetryHud');
        if (!hud) return;

        hud.style.display = 'block';
        updateTelemetryHudValues(vehicle);
    }

    function updateTelemetryHudValues(vehicle) {
        const setElText = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        };

        setElText('hudVehicleNo', vehicle.vehicle_no);
        setElText('hudArea', vehicle.area);
        setElText('hudTransporter', vehicle.transporter);
        setElText('hudLastUpdate', getFormattedTimestamp());
        setElText('hudSpeed', vehicle.isOnline ? `${vehicle.speed} km/h` : '0.00 km/h');
        setElText('hudMotion', vehicle.isOnline && parseFloat(vehicle.speed) > 0 ? 'Yes' : 'No');
        setElText('hudPower', `${vehicle.voltage} V`);
        setElText('hudCharge', vehicle.charge || 'Yes');
        setElText('hudOperator', vehicle.operator || 'airtel');
        setElText('hudTareWt', `${vehicle.tareWt} Mt`);
        setElText('hudGrossWt', `${vehicle.grossWt} Mt`);
        setElText('hudLoadState', vehicle.loadState || 'Loaded');
    }

    window.closeVtsTelemetryHud = function() {
        const hud = document.getElementById('vtsVehicleTelemetryHud');
        if (hud) hud.style.display = 'none';

        if (activeRoutePolyline && map) {
            map.removeLayer(activeRoutePolyline);
            activeRoutePolyline = null;
        }
    };

    // ==========================================
    // SIDEBAR VEHICLE LIST & SEARCH
    // ==========================================

    function renderVehicleSidebarList() {
        const listContainer = document.getElementById('vtsMapVehicleList');
        if (!listContainer) return;

        const activeFleet = allLiveVehicles.filter(v => {
            if (activeMineSectorKey !== 'all' && v.mineSectorKey !== activeMineSectorKey) return false;
            return true;
        });

        const onlineCount = activeFleet.filter(v => v.isOnline).length;
        const offlineCount = activeFleet.length - onlineCount;

        document.getElementById('vtsCountOnline')?.replaceChildren(document.createTextNode(onlineCount));
        document.getElementById('vtsCountOffline')?.replaceChildren(document.createTextNode(offlineCount));
        document.getElementById('vtsCountAll')?.replaceChildren(document.createTextNode(activeFleet.length));

        let filtered = activeFleet.filter(v => {
            if (liveFilterStatus === 'Online' && !v.isOnline) return false;
            if (liveFilterStatus === 'Offline' && v.isOnline) return false;
            if (liveSearchQuery) {
                const q = liveSearchQuery.toLowerCase();
                const matchVeh = (v.vehicle_no || '').toLowerCase().includes(q);
                const matchTrans = (v.transporter || '').toLowerCase().includes(q);
                const matchArea = (v.area || '').toLowerCase().includes(q);
                if (!matchVeh && !matchTrans && !matchArea) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            listContainer.innerHTML = `<div style="padding: 24px; text-align: center; color: #64748b; font-size: 12px;">No vehicles in this status filter.</div>`;
            return;
        }

        let html = '';
        filtered.forEach(v => {
            const isOnline = v.isOnline;
            const isSelected = v.vehicle_no === selectedVehicleId;
            const activeClass = isSelected ? 'active' : '';
            const statusDotClass = isOnline ? 'online-dot' : 'offline-dot';
            const batteryIcon = isOnline ? 'fa-battery-full' : 'fa-battery-empty';
            const batteryColor = isOnline ? '#22c55e' : '#ef4444';

            html += `
                <div class="vts-map-vehicle-item ${activeClass}" data-veh="${v.vehicle_no}" onclick="selectVehicle('${v.vehicle_no}', true)">
                    <div class="veh-status-indicator ${statusDotClass}">
                        <i class="fa-solid fa-truck"></i>
                    </div>
                    <div class="veh-details-col">
                        <div class="veh-top-row">
                            <span class="veh-reg-number">${v.vehicle_no}</span>
                            <div class="veh-telemetry-icons">
                                <i class="fa-solid ${batteryIcon}" style="color: ${batteryColor}; font-size: 12px;"></i>
                                <i class="fa-solid fa-signal" style="color: ${isOnline ? '#38bdf8' : '#64748b'}; font-size: 11px;"></i>
                            </div>
                        </div>
                        <div class="veh-meta-row">
                            <span class="veh-meta-label">Area :</span>
                            <span class="veh-meta-val">${v.area}</span>
                        </div>
                        <div class="veh-transporter-row">
                            <span>${truncateText(v.transporter, 28)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        listContainer.innerHTML = html;
    }

    window.setVtsLiveStatusFilter = function(status) {
        liveFilterStatus = status;

        document.getElementById('vtsPillOnline')?.classList.toggle('active', status === 'Online');
        document.getElementById('vtsPillOffline')?.classList.toggle('active', status === 'Offline');
        document.getElementById('vtsPillAll')?.classList.toggle('active', status === 'all');

        renderVehicleSidebarList();
    };

    window.handleVtsLiveSearch = function(query) {
        liveSearchQuery = (query || '').trim();
        renderVehicleSidebarList();
    };

    // ==========================================
    // REPLAY MODE & HISTORICAL PLAYBACK
    // ==========================================

    window.toggleVtsReplayMode = function() {
        isReplayActive = !isReplayActive;
        const hud = document.getElementById('vtsReplayHud');
        const btn = document.getElementById('vtsBtnToggleReplay');

        if (isReplayActive) {
            if (hud) hud.style.display = 'block';
            if (btn) btn.classList.add('active');
            const vehTag = document.getElementById('vtsReplayVehicleTag');
            if (vehTag) vehTag.textContent = selectedVehicleId;
            startReplayPlayback();
        } else {
            if (hud) hud.style.display = 'none';
            if (btn) btn.classList.remove('active');
            stopReplayPlayback();
            startAnimationLoop();
        }
    };

    function startReplayPlayback() {
        stopReplayPlayback();
        const v = allLiveVehicles.find(item => item.vehicle_no === selectedVehicleId);
        if (!v) return;

        replayProgress = 0;
        const scrubber = document.getElementById('vtsReplayScrubber');
        const playIcon = document.getElementById('vtsReplayPlayIcon');
        if (playIcon) playIcon.className = 'fa-solid fa-pause';

        replayTimer = setInterval(() => {
            replayProgress += 0.005 * replaySpeed;
            if (replayProgress > 1.0) replayProgress = 0;

            if (scrubber) scrubber.value = Math.round(replayProgress * 100);

            const pos = interpolateRoutePosition(v.routePoints, replayProgress);
            v.lat = pos.lat;
            v.lng = pos.lng;
            v.bearing = pos.bearing;
            if (v.marker) v.marker.setLatLng([pos.lat, pos.lng]);

            updateSelectedVehicleTrail(v);
            updateTelemetryHudValues(v);
        }, 100);
    }

    function stopReplayPlayback() {
        if (replayTimer) {
            clearInterval(replayTimer);
            replayTimer = null;
        }
        const playIcon = document.getElementById('vtsReplayPlayIcon');
        if (playIcon) playIcon.className = 'fa-solid fa-play';
    }

    window.toggleReplayPlayPause = function() {
        if (replayTimer) {
            stopReplayPlayback();
        } else {
            startReplayPlayback();
        }
    };

    window.handleReplayScrub = function(val) {
        replayProgress = parseFloat(val) / 100;
        const v = allLiveVehicles.find(item => item.vehicle_no === selectedVehicleId);
        if (!v) return;

        const pos = interpolateRoutePosition(v.routePoints, replayProgress);
        v.lat = pos.lat;
        v.lng = pos.lng;
        v.bearing = pos.bearing;
        if (v.marker) v.marker.setLatLng([pos.lat, pos.lng]);
        updateSelectedVehicleTrail(v);
        updateTelemetryHudValues(v);
    };

    window.setReplaySpeed = function(speed, btnEl) {
        replaySpeed = speed;
        document.querySelectorAll('.replay-speed-selector .speed-btn').forEach(btn => btn.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');
        if (replayTimer) startReplayPlayback();
    };

    // ==========================================
    // FLOATING MAP CONTROL ACTIONS
    // ==========================================

    window.vtsMapZoomIn = function() {
        if (map) map.zoomIn();
    };

    window.vtsMapZoomOut = function() {
        if (map) map.zoomOut();
    };

    window.toggleVtsMapLayer = function() {
        if (!map) return;
        const layerKeys = Object.keys(mapLayers);
        const currentKey = layerKeys[currentLayerIndex];
        map.removeLayer(mapLayers[currentKey]);

        currentLayerIndex = (currentLayerIndex + 1) % layerKeys.length;
        const nextKey = layerKeys[currentLayerIndex];
        mapLayers[nextKey].addTo(map);

        if (geofenceLayerGroup) geofenceLayerGroup.bringToFront();
    };

    window.toggleVtsGeofences = function() {
        if (!map || !geofenceLayerGroup) return;
        if (map.hasLayer(geofenceLayerGroup)) {
            map.removeLayer(geofenceLayerGroup);
        } else {
            geofenceLayerGroup.addTo(map);
        }
    };

    window.toggleMapFullscreen = function() {
        const container = document.getElementById('vtsMapCanvasContainer');
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.log(err));
            document.getElementById('vtsMapFsIcon')?.classList.replace('fa-expand', 'fa-compress');
        } else {
            document.exitFullscreen();
            document.getElementById('vtsMapFsIcon')?.classList.replace('fa-compress', 'fa-expand');
        }
    };

    // Utilities
    function getFormattedTimestamp() {
        const now = new Date();
        const pad = n => String(n).padStart(2, '0');
        return `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    function truncateText(str, maxLen) {
        if (!str) return '';
        return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
    }

})();
