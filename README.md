# TRACE / Prahar AI - Unified Intelligent Mining Command Center

Enterprise Command & Control Center (ICCC) for automated coal haulage surveillance, real-time IoT & VTS telemetry monitoring, RFID access management, AI drone surveillance, blacklisted vehicle enforcement, statutory audit trails, and field mobile companion integration.

---

## 🏛️ System Architecture

The project is structured according to a modern, Object-Oriented (OOP) full-stack architecture with strict separation between backend business services, API controllers, and frontend modular view orchestrators.

```text
Prahar AI/
├── backend/                              # [BACKEND LAYER - OOP Services & Routers]
│   ├── core/                             # Core configuration and security
│   │   ├── config.py                     # [OOP] AppConfig singleton (environment & credentials)
│   │   └── security.py                   # [OOP] SessionManager & cookie-based RBAC
│   │
│   ├── services/                         # [OOP] Encapsulated Business Logic & Database Services
│   │   ├── base_service.py               # [OOP] BaseService (Async HTTP pooling & error handling)
│   │   ├── supabase_service.py           # [OOP] SupabaseService (Weighbridge, Checkposts, Users)
│   │   ├── alert_service.py              # [OOP] AlertService (Live telemetry, simulation, triage)
│   │   ├── fleet_service.py              # [OOP] FleetService (VTS tracking, GPS coordinate steps)
│   │   └── audit_service.py              # [OOP] AuditService (Statutory reports manifest & hashes)
│   │
│   └── routes/                           # Modular FastAPI APIRouters
│       ├── views_routes.py               # HTML Page rendering routes (Home, Login, Logout)
│       ├── auth_routes.py                # Authentication endpoints
│       ├── alerts_routes.py              # Security alerts & simulation endpoints
│       ├── fleet_routes.py               # VTS vehicle fleet endpoints
│       └── audit_routes.py               # Digital audit trail manifest endpoints
│
├── templates/                            # Jinja2 Templates & Modals
│   ├── login.html                        # Authentication gateway
│   ├── index.html                        # Integrated Command Center workspace
│   └── partials/                         # Modular Subsystem Partials
│       ├── summary_view.html             # Weighbridge, Checkpost & VTS analytics
│       ├── alert_dashboard.html          # Tactical ICCC surveillance alerts
│       ├── vts_dashboard.html            # Fleet tracking & vehicle register
│       ├── vts_live_map.html             # Real-time GIS corridor tracking map
│       ├── rfid_dashboard.html           # RFID tag reader & antenna monitors
│       ├── drone_surveillance.html       # AI Drone HUD & Inferred Reports
│       ├── camera_views.html             # CCTV Grid & GIS Camera Feeds
│       ├── irregular_weighments.html     # Tare/gross anomaly analytics
│       ├── irregular_trips.html          # Route deviation & stoppage audit
│       ├── workers_attendance.html       # Shift muster & attendance doughnut
│       ├── blacklisted_vehicles.html     # Vehicle blacklist add/remove & lookup
│       ├── do_operations.html            # Delivery Order (DO) management
│       ├── config_masters.html           # Area, Plant, Weighbridge Master config
│       ├── app_installation_view.html    # TRACE Mobile App Installation Center
│       ├── app_installation_modal.html   # Standalone APK download & QR modal
│       └── user_profile_modal.html       # Officer credentials & access profile
│
├── static/                               # Static assets served to the browser
│   ├── css/
│   │   └── style.css                     # Master theme-adaptive stylesheet (Dark 🌙 / Light ☀️)
│   ├── js/                               # Frontend scripts & master configurations
│   │   ├── main.js                       # Master view switcher & controller
│   │   └── modules/                      # Subsystem controllers (Audit, VTS, Drone, DO)
│   ├── downloads/                        # Distribution packages & APK builds
│   │   └── trace_mobile_app_v2.4.apk     # Standalone TRACE Mobile APK installer
│   ├── media_screenshots/                # UI screenshots & drone telemetry stills
│   └── reports_split/                    # 50-part statutory PDF audit reports & manifest.json
│
├── scripts/                              # Maintenance, Database Seeders & Parser CLIs
│   ├── seed_supabase.py                  # Database seeder for Supabase PostgreSQL
│   ├── parse_do_data.py                  # Delivery Order parser & preprocessor
│   ├── export_masters.py                 # Master configuration exporter
│   └── validate_scripts.py               # Script syntax and dependency validator
│
├── app.py                                # Application Factory & ASGI entry point
├── vercel.json                           # Vercel serverless deployment specification
└── requirements.txt                      # Python dependencies
```

---

## 🚀 Running Locally

### 1. Prerequisites
- Python 3.10+
- Virtual environment (`.venv`)

### 2. Start the Development Server
```bash
# Using uvicorn directly
uvicorn app:app --reload --port 8000 --host 127.0.0.1

# Or with python launcher
python app.py
```

### 3. Open in Browser
Visit **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🔑 Key Features & Subsystems

1. **Summary Analytics Dashboard**:
   - High-throughput analytics for Weighbridges, Checkposts, and VTS transit vehicles.
   - Real-time gross tonnage, vehicle turnaround times, and corridor passage rates.

2. **Tactical ICCC Alert Dashboard**:
   - Real-time 15-category anomaly detection (Unauthorized Stoppages, Off-Route Deviations, Tampering, Over-speeding, Intrusion, Congestion, Load Variance).
   - Audio chime synthesizer (Web Audio API) with mute and auto-pitch modes.
   - Incident drilldown modal with Quick Reaction Team (QRT) dispatch and checkpost boom-barrier lock triggers.

3. **AI-Driven Drone Surveillance**:
   - Multi-tab drone intelligence HUD (Mission Dashboard, AI Features, Mining Sites, Inferred Anomaly Reports).
   - Orthomosaic thermal imagery and photographic violation audits.

4. **Camera Matrix & GIS Mapping**:
   - Multi-camera CCTV surveillance grid with live timestamp feeds.
   - Interactive Leaflet.js GIS map with geofenced corridor polylines and live vehicle beacons.

5. **VTS & RFID Fleet Tracking**:
   - Continuous GPS telemetry simulation with dynamic waypoint advancement.
   - Vehicle registration, route re-assignment, and telematics health monitoring.

6. **Irregular Weighments & Trips**:
   - Automated detection of tare/gross discrepancy, weight manipulation, route deviations, and excessive stoppage times.

7. **Workers Attendance & Safety Muster**:
   - Real-time biometric attendance metrics, active vs absent ratios, and shifts logging.

8. **Digital Forensic Audit Trails**:
   - Cryptographic SHA-256 blockchain hash verification of 50 statutory PDF annual mining reports.
   - One-click checksum verification and structured JSON audit manifest generation.

9. **Blacklisted Vehicles Registry**:
   - Centralized enforcement module with instant vehicle number lookup.
   - 1-click blacklisting/unblacklisting synchronized with Supabase cloud database to lock barrier access across all weighbridges and checkposts.

10. **Delivery Order (DO) Operations**:
    - Comprehensive DO ledger, contractor allocation, status tracking, and dynamic weighbridge mapping.

11. **Contract Management & Master Data Governance**:
    - Centralized master records for Areas, Plants, Weighbridges, Checkposts, Transporters, and Maintenance Logs.

12. **TRACE Mobile™ Field Application (APK)**:
    - **Geo-tagged mobile application for field inspections, safety observations, attendance, and incident reporting with offline support.**
    - Interactive download hub with direct APK package installer (`trace_mobile_app_v2.4.apk`), stylized QR code scanner, 1-click download link sharing, and 3-step Android setup guide.

13. **Theme & Internationalization Engine**:
    - Universal **Dark Mode (Obsidian Slate 🌙)** & **Light Mode (Azure White ☀️)** support with uniform font contrast across all components.
    - Real-time language toggle supporting **English (EN)** and **हिन्दी (Hindi)**.
