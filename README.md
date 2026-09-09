# Prahar AI - Unified Intelligent Mining Command Center

Enterprise Command & Control Center for automated coal haulage surveillance, telemetry monitoring, RFID access management, AI drone surveillance, and immutable statutory audit trail verification.

---

## 🏛️ System Architecture

The project is structured according to a modern, Object-Oriented (OOP) full-stack architecture with strict separation between backend business services, API controllers, and frontend view orchestrators.

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
├── templates/                            # Jinja2 Templates
│   ├── login.html                        # Authentication gateway
│   └── index.html                        # Integrated Command Center workspace
│
├── static/                               # Static assets served to the browser
│   ├── css/
│   │   └── style.css                     # Primary stylesheet
│   ├── js/                               # Frontend scripts & master configurations
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

1. **Summary Dashboard**: Weighbridge, Checkpost, and VTS real-time summary cards and throughput tables.
2. **Tactical ICCC Alert Dashboard**: Real-time anomaly telemetry, audio alerts (Web Audio API), live threat level badges, triage quick-filters, and incident drilldown modal with QRT dispatch actions.
3. **AI Drone Surveillance**: Interactive drone surveillance HUD and still image inspection modal.
4. **Camera View & GIS Mapping**: Grid view and interactive Leaflet.js GIS map with real-time checkpost & weighbridge marker layers.
5. **VTS Fleet Tracking**: Real-time GPS coordinate telemetry and vehicle live-step simulation.
6. **Digital Audit Trails**: Cryptographic SHA-256 blockchain hash verification of statutory annual mining reports.
7. **Delivery Order (DO) Operations**: Comprehensive internal delivery order management, status tracking, and weighbridge mapping.
