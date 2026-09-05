-- =========================================================================
-- PRAHAR AI / TRACE DIGITAL MINING - SUPABASE DATABASE SCHEMA & SEED DATA
-- =========================================================================

-- Drop existing tables if re-running
DROP TABLE IF EXISTS security_alerts CASCADE;
DROP TABLE IF EXISTS vts_fleet CASCADE;
DROP TABLE IF EXISTS checkpost_logs CASCADE;
DROP TABLE IF EXISTS weighbridge_records CASCADE;

-- 1. WEIGHBRIDGE RECORDS TABLE
CREATE TABLE weighbridge_records (
    id SERIAL PRIMARY KEY,
    s_no INT NOT NULL,
    name TEXT NOT NULL,
    road_dispatch TEXT NOT NULL,
    internal_sending TEXT NOT NULL,
    internal_receiving TEXT NOT NULL,
    total TEXT NOT NULL,
    status TEXT DEFAULT 'Operational',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CHECKPOST LOGS TABLE
CREATE TABLE checkpost_logs (
    id SERIAL PRIMARY KEY,
    checkpost_name TEXT NOT NULL,
    vehicle_no TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    rfid_tag TEXT NOT NULL,
    entry_time TEXT NOT NULL,
    exit_time TEXT NOT NULL,
    status TEXT NOT NULL,
    payload_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VTS FLEET (GPS & TELEMETRY) TABLE
CREATE TABLE vts_fleet (
    id SERIAL PRIMARY KEY,
    vehicle_no TEXT NOT NULL UNIQUE,
    driver_name TEXT NOT NULL,
    speed INT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    route_status TEXT NOT NULL,
    fuel_level INT NOT NULL,
    battery_status TEXT NOT NULL,
    destination TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SECURITY & SURVEILLANCE ALERTS TABLE
CREATE TABLE security_alerts (
    id SERIAL PRIMARY KEY,
    alert_type TEXT NOT NULL,
    vehicle_no TEXT NOT NULL,
    location TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    confidence_score INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- SEED DATA (Realistic Central Coalfields Ltd / CCL Mining Datasets)
-- =========================================================================

-- Seed Weighbridge Summary Records
INSERT INTO weighbridge_records (s_no, name, road_dispatch, internal_sending, internal_receiving, total, status) VALUES
(1, 'Amrapali & Chandragupta (CO07)', '18,708.55 T', '10,826.24 T', '0.00 T', '29,534.79 T', 'Operational'),
(2, 'Ashoka OCP (CO02)', '14,320.10 T', '8,410.50 T', '1,200.00 T', '23,930.60 T', 'Operational'),
(3, 'Piparwar Washery (CO01)', '12,940.80 T', '6,150.20 T', '0.00 T', '19,091.00 T', 'Operational'),
(4, 'Magadh Open Cast (CO08)', '22,450.00 T', '14,200.00 T', '0.00 T', '36,650.00 T', 'Operational'),
(5, 'North Karanpura Siding (CO09)', '9,810.25 T', '4,320.10 T', '3,110.00 T', '17,240.35 T', 'Operational'),
(6, 'Tetricon Weighbridge #03', '7,450.60 T', '2,900.40 T', '0.00 T', '10,351.00 T', 'Operational');

-- Seed Checkpost Clearance Logs
INSERT INTO checkpost_logs (checkpost_name, vehicle_no, driver_name, rfid_tag, entry_time, exit_time, status, payload_type) VALUES
('Checkpost #01 - North Siding', 'JH01-AX-9912', 'Rajesh Kumar Soren', 'RFID-8829-CCL', '21:15:20', '21:18:40', 'Cleared', 'Raw Coal Grade G11'),
('Checkpost #02 - Main Quarry Exit', 'JH02-CC-4019', 'Sunil Mahto', 'RFID-1920-CCL', '21:22:10', '21:26:05', 'Cleared', 'Grade G13 Clean Coal'),
('Checkpost #03 - Weighbridge Siding', 'JH01-DY-7721', 'Manoj Tirkey', 'RFID-5541-CCL', '21:30:15', '21:34:50', 'Cleared', 'Overburden Material'),
('Checkpost #01 - North Siding', 'JH05-BK-3390', 'Ramesh Yadav', 'RFID-7712-CCL', '21:38:00', '--:--:--', 'Inspecting', 'Raw Coal Grade G9'),
('Checkpost #04 - Rail Silo Ingate', 'JH02-ER-6102', 'Vikram Singh', 'RFID-4002-CCL', '21:40:12', '21:43:00', 'Cleared', 'Washed Coal');

-- Seed VTS Vehicle Telemetry
INSERT INTO vts_fleet (vehicle_no, driver_name, speed, latitude, longitude, route_status, fuel_level, battery_status, destination) VALUES
('JH01-AX-9912', 'Rajesh Kumar Soren', 38, 23.8542, 85.0512, 'On Approved Corridor', 82, 'Good (98%)', 'Tori Siding Silo #2'),
('JH02-CC-4019', 'Sunil Mahto', 42, 23.8610, 85.0645, 'On Approved Corridor', 74, 'Good (95%)', 'Piparwar Coal Washery'),
('JH01-DY-7721', 'Manoj Tirkey', 0, 23.8470, 85.0420, 'Halted (>12m)', 61, 'Normal (88%)', 'Dakra Central Weighbridge'),
('JH05-BK-3390', 'Ramesh Yadav', 29, 23.8720, 85.0780, 'Route Deviation (280m)', 90, 'Good (99%)', 'Ashoka Siding Platform #4'),
('JH02-ER-6102', 'Vikram Singh', 35, 23.8590, 85.0560, 'On Approved Corridor', 68, 'Good (92%)', 'Amrapali Siding Berth #1');

-- Seed Live Security Surveillance Alerts
INSERT INTO security_alerts (alert_type, vehicle_no, location, severity, status, confidence_score, description) VALUES
('Unauthorized Stoppage', 'JH01-DY-7721', 'Karkatta Mining Road (KM 4.2)', 'CRITICAL', 'ACTIVE', 96, 'Vehicle halted stationary in unauthorized corridor zone for > 15 minutes with active coal payload.'),
('Geofence Route Breach', 'JH05-BK-3390', 'Amrapali Sector 4 Western Perimeter', 'HIGH', 'ACTIVE', 92, 'Commercial coal tipper deviated 280 meters outside designated geo-fenced coal transport route.'),
('Weight Variance Detected', 'JH02-CC-4019', 'Piparwar Ingate Weighbridge WB-02', 'WARNING', 'ACTIVE', 88, 'Gross weight registered 2.4 Tons higher than e-Way Bill pre-clearance declaration.'),
('Unregistered RFID Tag', 'JH09-ZZ-1100', 'North Karanpura Checkpost Gate 3', 'HIGH', 'ACTIVE', 99, 'RFID tag mismatch: Vehicle attempted gate passage without matching dispatch record in TRACE ERP.');
