"""
Supabase Database Service
Encapsulates all Supabase PostgREST data interactions.
"""

from typing import List, Dict, Any, Optional
from backend.services.base_service import BaseService


class SupabaseService(BaseService):
    """
    Core Database Service managing persistence and retrieval of mining telemetries,
    user credentials, RFID configurations, and operational logs.
    """

    DEFAULT_USERS: List[Dict[str, Any]] = [
        {
            "id": 1,
            "username": "gm",
            "password": "gm@trace2026",
            "name": "Dr. Rajeshwar Sharma",
            "designation": "General Manager (Mining & Ops)",
            "role": "gm",
            "email": "gm@trace.gov.in"
        },
        {
            "id": 2,
            "username": "vigilance",
            "password": "vigilance@trace2026",
            "name": "Col. Ajay Singh (Retd.)",
            "designation": "Chief Vigilance Officer",
            "role": "vigilance",
            "email": "vigilance@trace.gov.in"
        },
        {
            "id": 3,
            "username": "surveillance",
            "password": "surveillance@trace2026",
            "name": "Vikramaditya Bose",
            "designation": "Surveillance Commander",
            "role": "surveillance",
            "email": "surveillance@trace.gov.in"
        },
        {
            "id": 4,
            "username": "dispatch",
            "password": "dispatch@trace2026",
            "name": "Sunil Kumar Meena",
            "designation": "Dispatch Officer (DO)",
            "role": "dispatch",
            "email": "dispatch@trace.gov.in"
        },
        {
            "id": 5,
            "username": "operator",
            "password": "operator@trace2026",
            "name": "Manoj Verma",
            "designation": "Control Room Operator",
            "role": "operator",
            "email": "operator@trace.gov.in"
        },
        {
            "id": 6,
            "username": "admin",
            "password": "password123",
            "name": "System Administrator",
            "designation": "Command Center Chief",
            "role": "admin",
            "email": "admin@prahar.ai"
        }
    ]

    FALLBACK_WEIGHBRIDGE: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "road_dispatch": "18,708.55 T", "internal_sending": "10,826.24 T", "internal_receiving": "0.00 T", "total": "29,534.79 T", "status": "Operational"},
        {"s_no": 2, "name": "Argada", "road_dispatch": "4,320.10 T", "internal_sending": "2,410.50 T", "internal_receiving": "1,200.00 T", "total": "7,930.60 T", "status": "Operational"},
        {"s_no": 3, "name": "Barka Sayal", "road_dispatch": "6,940.80 T", "internal_sending": "6,150.20 T", "internal_receiving": "0.00 T", "total": "13,091.00 T", "status": "Operational"},
        {"s_no": 4, "name": "Bokaro and Kargali", "road_dispatch": "12,450.00 T", "internal_sending": "14,200.00 T", "internal_receiving": "0.00 T", "total": "26,650.00 T", "status": "Operational"},
        {"s_no": 5, "name": "Dhori", "road_dispatch": "7,810.25 T", "internal_sending": "4,320.10 T", "internal_receiving": "3,110.00 T", "total": "15,240.35 T", "status": "Operational"},
        {"s_no": 6, "name": "Giridih", "road_dispatch": "2,450.60 T", "internal_sending": "1,900.40 T", "internal_receiving": "0.00 T", "total": "4,351.00 T", "status": "Operational"},
        {"s_no": 7, "name": "Hazaribagh", "road_dispatch": "5,120.40 T", "internal_sending": "3,280.15 T", "internal_receiving": "850.00 T", "total": "9,250.55 T", "status": "Operational"},
        {"s_no": 8, "name": "Kathara", "road_dispatch": "6,410.20 T", "internal_sending": "5,640.80 T", "internal_receiving": "1,100.00 T", "total": "13,151.00 T", "status": "Operational"},
        {"s_no": 9, "name": "Kuju", "road_dispatch": "4,820.50 T", "internal_sending": "3,110.20 T", "internal_receiving": "640.00 T", "total": "8,570.70 T", "status": "Operational"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "road_dispatch": "22,110.80 T", "internal_sending": "16,420.50 T", "internal_receiving": "0.00 T", "total": "38,531.30 T", "status": "Operational"},
        {"s_no": 11, "name": "NK", "road_dispatch": "8,240.30 T", "internal_sending": "5,980.40 T", "internal_receiving": "2,400.00 T", "total": "16,620.70 T", "status": "Operational"},
        {"s_no": 12, "name": "Piparwar", "road_dispatch": "14,350.60 T", "internal_sending": "9,840.20 T", "internal_receiving": "0.00 T", "total": "24,190.80 T", "status": "Operational"},
        {"s_no": 13, "name": "Rajhara", "road_dispatch": "3,120.10 T", "internal_sending": "1,850.40 T", "internal_receiving": "400.00 T", "total": "5,370.50 T", "status": "Operational"},
        {"s_no": 14, "name": "Rajrappa", "road_dispatch": "5,800.40 T", "internal_sending": "4,120.30 T", "internal_receiving": "900.00 T", "total": "10,820.70 T", "status": "Operational"}
    ]

    FALLBACK_CHECKPOST: List[Dict[str, Any]] = [
        {"checkpost_name": "Checkpost #01 - North Siding", "vehicle_no": "JH01-AX-9912", "driver_name": "Rajesh Kumar Soren", "rfid_tag": "RFID-8829-CCL", "entry_time": "21:15:20", "exit_time": "21:18:40", "status": "Cleared", "payload_type": "Raw Coal Grade G11"},
        {"checkpost_name": "Checkpost #02 - Main Quarry Exit", "vehicle_no": "JH02-CC-4019", "driver_name": "Sunil Mahto", "rfid_tag": "RFID-1920-CCL", "entry_time": "21:22:10", "exit_time": "21:26:05", "status": "Cleared", "payload_type": "Grade G13 Clean Coal"},
        {"checkpost_name": "Checkpost #03 - Weighbridge Siding", "vehicle_no": "JH01-DY-7721", "driver_name": "Manoj Tirkey", "rfid_tag": "RFID-5541-CCL", "entry_time": "21:30:15", "exit_time": "21:34:50", "status": "Cleared", "payload_type": "Overburden Material"},
        {"checkpost_name": "Checkpost #01 - North Siding", "vehicle_no": "JH05-BK-3390", "driver_name": "Ramesh Yadav", "rfid_tag": "RFID-7712-CCL", "entry_time": "21:38:00", "exit_time": "--:--:--", "status": "Inspecting", "payload_type": "Raw Coal Grade G9"},
        {"checkpost_name": "Checkpost #04 - Rail Silo Ingate", "vehicle_no": "JH02-ER-6102", "driver_name": "Vikram Singh", "rfid_tag": "RFID-4002-CCL", "entry_time": "21:40:12", "exit_time": "21:43:00", "status": "Cleared", "payload_type": "Washed Coal"}
    ]

    FALLBACK_WEIGHBRIDGE_STATUS: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "operational_total": "12 / 12", "operational_pct": "100%"},
        {"s_no": 2, "name": "Argada", "operational_total": "6 / 6", "operational_pct": "100%"},
        {"s_no": 3, "name": "Barka Sayal", "operational_total": "9 / 10", "operational_pct": "90%"},
        {"s_no": 4, "name": "Bokaro and Kargali", "operational_total": "14 / 15", "operational_pct": "93.3%"},
        {"s_no": 5, "name": "Dhori", "operational_total": "11 / 11", "operational_pct": "100%"},
        {"s_no": 6, "name": "Giridih", "operational_total": "4 / 4", "operational_pct": "100%"},
        {"s_no": 7, "name": "Hazaribagh", "operational_total": "8 / 8", "operational_pct": "100%"},
        {"s_no": 8, "name": "Kathara", "operational_total": "10 / 11", "operational_pct": "90.9%"},
        {"s_no": 9, "name": "Kuju", "operational_total": "7 / 7", "operational_pct": "100%"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "operational_total": "16 / 16", "operational_pct": "100%"},
        {"s_no": 11, "name": "NK", "operational_total": "10 / 10", "operational_pct": "100%"},
        {"s_no": 12, "name": "Piparwar", "operational_total": "15 / 15", "operational_pct": "100%"},
        {"s_no": 13, "name": "Rajhara", "operational_total": "5 / 5", "operational_pct": "100%"},
        {"s_no": 14, "name": "Rajrappa", "operational_total": "8 / 8", "operational_pct": "100%"}
    ]

    FALLBACK_ADVANCED_ANALYTICS: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "tx_road": 1420, "tx_internal": 850, "tx_total": 2270, "bypassing": 0, "barrier": 0, "lv_100t": 2270, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.2%", "anpr_internal": "98.7%", "anpr_total": "99.0%"},
        {"s_no": 2, "name": "Argada", "tx_road": 620, "tx_internal": 340, "tx_total": 960, "bypassing": 0, "barrier": 0, "lv_100t": 960, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.5%", "anpr_internal": "97.9%", "anpr_total": "98.3%"},
        {"s_no": 3, "name": "Barka Sayal", "tx_road": 980, "tx_internal": 510, "tx_total": 1490, "bypassing": 1, "barrier": 0, "lv_100t": 1489, "lv_road": "99.8%", "lv_internal": "100%", "lv_total": "99.9%", "anpr_road": "97.8%", "anpr_internal": "98.1%", "anpr_total": "97.9%"},
        {"s_no": 4, "name": "Bokaro and Kargali", "tx_road": 1540, "tx_internal": 920, "tx_total": 2460, "bypassing": 0, "barrier": 0, "lv_100t": 2460, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.1%", "anpr_internal": "99.0%", "anpr_total": "99.1%"},
        {"s_no": 5, "name": "Dhori", "tx_road": 1120, "tx_internal": 680, "tx_total": 1800, "bypassing": 0, "barrier": 0, "lv_100t": 1800, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.9%", "anpr_internal": "98.4%", "anpr_total": "98.7%"},
        {"s_no": 6, "name": "Giridih", "tx_road": 410, "tx_internal": 190, "tx_total": 600, "bypassing": 0, "barrier": 0, "lv_100t": 600, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.4%", "anpr_internal": "99.1%", "anpr_total": "99.3%"},
        {"s_no": 7, "name": "Hazaribagh", "tx_road": 890, "tx_internal": 430, "tx_total": 1320, "bypassing": 0, "barrier": 0, "lv_100t": 1320, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.6%", "anpr_internal": "98.2%", "anpr_total": "98.5%"},
        {"s_no": 8, "name": "Kathara", "tx_road": 1050, "tx_internal": 720, "tx_total": 1770, "bypassing": 0, "barrier": 0, "lv_100t": 1770, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.1%", "anpr_internal": "98.8%", "anpr_total": "98.4%"},
        {"s_no": 9, "name": "Kuju", "tx_road": 780, "tx_internal": 390, "tx_total": 1170, "bypassing": 0, "barrier": 0, "lv_100t": 1170, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.0%", "anpr_internal": "98.5%", "anpr_total": "98.8%"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "tx_road": 1890, "tx_internal": 1100, "tx_total": 2990, "bypassing": 0, "barrier": 0, "lv_100t": 2990, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.5%", "anpr_internal": "99.3%", "anpr_total": "99.4%"},
        {"s_no": 11, "name": "NK", "tx_road": 1210, "tx_internal": 670, "tx_total": 1880, "bypassing": 0, "barrier": 0, "lv_100t": 1880, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.7%", "anpr_internal": "98.3%", "anpr_total": "98.6%"},
        {"s_no": 12, "name": "Piparwar", "tx_road": 1650, "tx_internal": 980, "tx_total": 2630, "bypassing": 0, "barrier": 0, "lv_100t": 2630, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.3%", "anpr_internal": "99.1%", "anpr_total": "99.2%"},
        {"s_no": 13, "name": "Rajhara", "tx_road": 530, "tx_internal": 210, "tx_total": 740, "bypassing": 0, "barrier": 0, "lv_100t": 740, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "99.0%", "anpr_internal": "98.9%", "anpr_total": "99.0%"},
        {"s_no": 14, "name": "Rajrappa", "tx_road": 910, "tx_internal": 540, "tx_total": 1450, "bypassing": 0, "barrier": 0, "lv_100t": 1450, "lv_road": "100%", "lv_internal": "100%", "lv_total": "100%", "anpr_road": "98.8%", "anpr_internal": "98.6%", "anpr_total": "98.7%"}
    ]

    FALLBACK_CHECKPOST_STATUS: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "operational_total": "8 / 8", "operational_pct": "100%"},
        {"s_no": 2, "name": "Argada", "operational_total": "4 / 4", "operational_pct": "100%"},
        {"s_no": 3, "name": "Barka Sayal", "operational_total": "6 / 6", "operational_pct": "100%"},
        {"s_no": 4, "name": "Bokaro and Kargali", "operational_total": "9 / 9", "operational_pct": "100%"},
        {"s_no": 5, "name": "Dhori", "operational_total": "7 / 7", "operational_pct": "100%"},
        {"s_no": 6, "name": "Giridih", "operational_total": "3 / 3", "operational_pct": "100%"},
        {"s_no": 7, "name": "Hazaribagh", "operational_total": "5 / 5", "operational_pct": "100%"},
        {"s_no": 8, "name": "Kathara", "operational_total": "7 / 7", "operational_pct": "100%"},
        {"s_no": 9, "name": "Kuju", "operational_total": "5 / 5", "operational_pct": "100%"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "operational_total": "10 / 10", "operational_pct": "100%"},
        {"s_no": 11, "name": "NK", "operational_total": "6 / 6", "operational_pct": "100%"},
        {"s_no": 12, "name": "Piparwar", "operational_total": "9 / 9", "operational_pct": "100%"},
        {"s_no": 13, "name": "Rajhara", "operational_total": "3 / 3", "operational_pct": "100%"},
        {"s_no": 14, "name": "Rajrappa", "operational_total": "5 / 5", "operational_pct": "100%"}
    ]

    FALLBACK_CHECKPOST_ANALYTICS: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "entry_total": 2150, "entry_anpr": "99.1%", "exit_total": 2145, "exit_anpr": "99.3%", "boom_total": 4295, "boom_others": 42, "boom_dept": 4253, "boom_pct": "99.0%"},
        {"s_no": 2, "name": "Argada", "entry_total": 910, "entry_anpr": "98.4%", "exit_total": 905, "exit_anpr": "98.7%", "boom_total": 1815, "boom_others": 21, "boom_dept": 1794, "boom_pct": "98.8%"},
        {"s_no": 3, "name": "Barka Sayal", "entry_total": 1410, "entry_anpr": "98.0%", "exit_total": 1400, "exit_anpr": "98.2%", "boom_total": 2810, "boom_others": 35, "boom_dept": 2775, "boom_pct": "98.8%"},
        {"s_no": 4, "name": "Bokaro and Kargali", "entry_total": 2340, "entry_anpr": "99.0%", "exit_total": 2330, "exit_anpr": "99.2%", "boom_total": 4670, "boom_others": 48, "boom_dept": 4622, "boom_pct": "99.0%"},
        {"s_no": 5, "name": "Dhori", "entry_total": 1710, "entry_anpr": "98.8%", "exit_total": 1705, "exit_anpr": "99.0%", "boom_total": 3415, "boom_others": 30, "boom_dept": 3385, "boom_pct": "99.1%"},
        {"s_no": 6, "name": "Giridih", "entry_total": 570, "entry_anpr": "99.2%", "exit_total": 568, "exit_anpr": "99.4%", "boom_total": 1138, "boom_others": 12, "boom_dept": 1126, "boom_pct": "98.9%"},
        {"s_no": 7, "name": "Hazaribagh", "entry_total": 1260, "entry_anpr": "98.5%", "exit_total": 1250, "exit_anpr": "98.7%", "boom_total": 2510, "boom_others": 26, "boom_dept": 2484, "boom_pct": "99.0%"},
        {"s_no": 8, "name": "Kathara", "entry_total": 1680, "entry_anpr": "98.2%", "exit_total": 1675, "exit_anpr": "98.6%", "boom_total": 3355, "boom_others": 39, "boom_dept": 3316, "boom_pct": "98.8%"},
        {"s_no": 9, "name": "Kuju", "entry_total": 1110, "entry_anpr": "98.9%", "exit_total": 1105, "exit_anpr": "99.1%", "boom_total": 2215, "boom_others": 20, "boom_dept": 2195, "boom_pct": "99.1%"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "entry_total": 2840, "entry_anpr": "99.4%", "exit_total": 2835, "exit_anpr": "99.5%", "boom_total": 5675, "boom_others": 52, "boom_dept": 5623, "boom_pct": "99.1%"},
        {"s_no": 11, "name": "NK", "entry_total": 1790, "entry_anpr": "98.7%", "exit_total": 1780, "exit_anpr": "98.9%", "boom_total": 3570, "boom_others": 34, "boom_dept": 3536, "boom_pct": "99.0%"},
        {"s_no": 12, "name": "Piparwar", "entry_total": 2510, "entry_anpr": "99.3%", "exit_total": 2500, "exit_anpr": "99.4%", "boom_total": 5010, "boom_others": 45, "boom_dept": 4965, "boom_pct": "99.1%"},
        {"s_no": 13, "name": "Rajhara", "entry_total": 700, "entry_anpr": "99.0%", "exit_total": 695, "exit_anpr": "99.1%", "boom_total": 1395, "boom_others": 14, "boom_dept": 1381, "boom_pct": "99.0%"},
        {"s_no": 14, "name": "Rajrappa", "entry_total": 1380, "entry_anpr": "98.8%", "exit_total": 1375, "exit_anpr": "98.9%", "boom_total": 2755, "boom_others": 28, "boom_dept": 2727, "boom_pct": "99.0%"}
    ]

    FALLBACK_VTS_ALERT_SUMMARY: List[Dict[str, Any]] = [
        {"s_no": 1, "name": "Amrapali and Chandragupta", "offroute_closed": "14 / 14", "offroute_pct_closed": "100%", "offroute_pct_total": "12.5%", "offarea_closed": "4 / 4", "offarea_pct_closed": "100%", "offarea_pct_total": "3.5%", "overlap": 0, "tamper_closed": "2 / 2", "tamper_pct_closed": "100%", "tamper_pct_total": "1.8%", "stoppage_closed": "8 / 8", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.1%"},
        {"s_no": 2, "name": "Argada", "offroute_closed": "6 / 6", "offroute_pct_closed": "100%", "offroute_pct_total": "11.2%", "offarea_closed": "2 / 2", "offarea_pct_closed": "100%", "offarea_pct_total": "3.8%", "overlap": 0, "tamper_closed": "1 / 1", "tamper_pct_closed": "100%", "tamper_pct_total": "1.9%", "stoppage_closed": "4 / 4", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.5%"},
        {"s_no": 3, "name": "Barka Sayal", "offroute_closed": "10 / 10", "offroute_pct_closed": "100%", "offroute_pct_total": "13.1%", "offarea_closed": "3 / 3", "offarea_pct_closed": "100%", "offarea_pct_total": "3.9%", "overlap": 0, "tamper_closed": "2 / 2", "tamper_pct_closed": "100%", "tamper_pct_total": "2.6%", "stoppage_closed": "6 / 6", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.8%"},
        {"s_no": 4, "name": "Bokaro and Kargali", "offroute_closed": "18 / 18", "offroute_pct_closed": "100%", "offroute_pct_total": "14.2%", "offarea_closed": "5 / 5", "offarea_pct_closed": "100%", "offarea_pct_total": "4.0%", "overlap": 0, "tamper_closed": "3 / 3", "tamper_pct_closed": "100%", "tamper_pct_total": "2.4%", "stoppage_closed": "11 / 11", "stoppage_pct_closed": "100%", "stoppage_pct_total": "8.7%"},
        {"s_no": 5, "name": "Dhori", "offroute_closed": "12 / 12", "offroute_pct_closed": "100%", "offroute_pct_total": "12.8%", "offarea_closed": "3 / 3", "offarea_pct_closed": "100%", "offarea_pct_total": "3.2%", "overlap": 0, "tamper_closed": "1 / 1", "tamper_pct_closed": "100%", "tamper_pct_total": "1.1%", "stoppage_closed": "7 / 7", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.5%"},
        {"s_no": 6, "name": "Giridih", "offroute_closed": "4 / 4", "offroute_pct_closed": "100%", "offroute_pct_total": "10.5%", "offarea_closed": "1 / 1", "offarea_pct_closed": "100%", "offarea_pct_total": "2.6%", "overlap": 0, "tamper_closed": "0 / 0", "tamper_pct_closed": "100%", "tamper_pct_total": "0.0%", "stoppage_closed": "3 / 3", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.9%"},
        {"s_no": 7, "name": "Hazaribagh", "offroute_closed": "9 / 9", "offroute_pct_closed": "100%", "offroute_pct_total": "12.0%", "offarea_closed": "2 / 2", "offarea_pct_closed": "100%", "offarea_pct_total": "2.7%", "overlap": 0, "tamper_closed": "1 / 1", "tamper_pct_closed": "100%", "tamper_pct_total": "1.3%", "stoppage_closed": "5 / 5", "stoppage_pct_closed": "100%", "stoppage_pct_total": "6.7%"},
        {"s_no": 8, "name": "Kathara", "offroute_closed": "13 / 13", "offroute_pct_closed": "100%", "offroute_pct_total": "13.5%", "offarea_closed": "4 / 4", "offarea_pct_closed": "100%", "offarea_pct_total": "4.1%", "overlap": 0, "tamper_closed": "2 / 2", "tamper_pct_closed": "100%", "tamper_pct_total": "2.1%", "stoppage_closed": "8 / 8", "stoppage_pct_closed": "100%", "stoppage_pct_total": "8.3%"},
        {"s_no": 9, "name": "Kuju", "offroute_closed": "8 / 8", "offroute_pct_closed": "100%", "offroute_pct_total": "11.8%", "offarea_closed": "2 / 2", "offarea_pct_closed": "100%", "offarea_pct_total": "2.9%", "overlap": 0, "tamper_closed": "1 / 1", "tamper_pct_closed": "100%", "tamper_pct_total": "1.5%", "stoppage_closed": "5 / 5", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.4%"},
        {"s_no": 10, "name": "Magadh & Sanghmitra", "offroute_closed": "22 / 22", "offroute_pct_closed": "100%", "offroute_pct_total": "15.1%", "offarea_closed": "6 / 6", "offarea_pct_closed": "100%", "offarea_pct_total": "4.1%", "overlap": 0, "tamper_closed": "4 / 4", "tamper_pct_closed": "100%", "tamper_pct_total": "2.7%", "stoppage_closed": "13 / 13", "stoppage_pct_closed": "100%", "stoppage_pct_total": "8.9%"},
        {"s_no": 11, "name": "NK", "offroute_closed": "14 / 14", "offroute_pct_closed": "100%", "offroute_pct_total": "13.0%", "offarea_closed": "3 / 3", "offarea_pct_closed": "100%", "offarea_pct_total": "2.8%", "overlap": 0, "tamper_closed": "2 / 2", "tamper_pct_closed": "100%", "tamper_pct_total": "1.9%", "stoppage_closed": "8 / 8", "stoppage_pct_closed": "100%", "stoppage_pct_total": "7.4%"},
        {"s_no": 12, "name": "Piparwar", "offroute_closed": "19 / 19", "offroute_pct_closed": "100%", "offroute_pct_total": "14.5%", "offarea_closed": "5 / 5", "offarea_pct_closed": "100%", "offarea_pct_total": "3.8%", "overlap": 0, "tamper_closed": "3 / 3", "tamper_pct_closed": "100%", "tamper_pct_total": "2.3%", "stoppage_closed": "12 / 12", "stoppage_pct_closed": "100%", "stoppage_pct_total": "9.2%"},
        {"s_no": 13, "name": "Rajhara", "offroute_closed": "5 / 5", "offroute_pct_closed": "100%", "offroute_pct_total": "10.9%", "offarea_closed": "1 / 1", "offarea_pct_closed": "100%", "offarea_pct_total": "2.2%", "overlap": 0, "tamper_closed": "1 / 1", "tamper_pct_closed": "100%", "tamper_pct_total": "2.2%", "stoppage_closed": "3 / 3", "stoppage_pct_closed": "100%", "stoppage_pct_total": "6.5%"},
        {"s_no": 14, "name": "Rajrappa", "offroute_closed": "11 / 11", "offroute_pct_closed": "100%", "offroute_pct_total": "12.9%", "offarea_closed": "3 / 3", "offarea_pct_closed": "100%", "offarea_pct_total": "3.5%", "overlap": 0, "tamper_closed": "2 / 2", "tamper_pct_closed": "100%", "tamper_pct_total": "2.3%", "stoppage_closed": "7 / 7", "stoppage_pct_closed": "100%", "stoppage_pct_total": "8.2%"}
    ]

    FALLBACK_RFID_CONFIG: List[Dict[str, Any]] = [
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 1, "area": "Kathara", "name": "Kathara Washery Ingate WB-01"},
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 2, "area": "Barka Sayal", "name": "Sayal Siding Outgate Scale #2"},
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 3, "area": "Dhori", "name": "Dhori Central Pithead WB-04"},
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 4, "area": "Hazaribagh", "name": "Charhi Complex Scale #1"},
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 5, "area": "Piparwar", "name": "Piparwar Rapid Loading Silo WB"},
        {"type": "WEIGHBRIDGE", "is_operational": True, "s_no": 6, "area": "Magadh & Sanghmitra", "name": "Magadh Dispatch Hub WB-03"},
        {"type": "WEIGHBRIDGE", "is_operational": False, "s_no": 1, "area": "Bokaro and Kargali", "name": "B&K Secondary Weighbridge #02 (Sensor Calib)"},
        {"type": "WEIGHBRIDGE", "is_operational": False, "s_no": 2, "area": "Kathara", "name": "Jarangdih Feeder Siding Scale (Network Offline)"},
        {"type": "CHECKPOST", "is_operational": True, "s_no": 1, "area": "Kathara", "name": "Checkpost #01 - North Siding Gate"},
        {"type": "CHECKPOST", "is_operational": True, "s_no": 2, "area": "Barka Sayal", "name": "Checkpost #02 - Main Quarry Exit Gate"},
        {"type": "CHECKPOST", "is_operational": True, "s_no": 3, "area": "Dhori", "name": "Checkpost #03 - Weighbridge Siding Ingate"},
        {"type": "CHECKPOST", "is_operational": True, "s_no": 4, "area": "Piparwar", "name": "Checkpost #04 - Rail Silo Ingate RFID Terminal"},
        {"type": "CHECKPOST", "is_operational": False, "s_no": 1, "area": "Kuju", "name": "Checkpost #07 - Outer Perimeter Gate (RFID Offline)"}
    ]

    FALLBACK_IRREGULAR_VEHICLES: List[Dict[str, Any]] = [
        {"veh_no": "JH09AJ0402", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 3, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
        {"veh_no": "JH09AY3044", "unit": "3054 - AAD OCM", "do_no": "3054260009", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1610", "dst_co": "CO12 - Dhori", "dst_wb": "RD1608"},
        {"veh_no": "JH02BK7883", "unit": "3017 - Sayal D OC", "do_no": "3017250004", "irr_trips": 2, "src_co": "CO01 - Barka Sayal", "src_wb": "RD0311", "dst_co": "CO01 - Barka Sayal", "dst_wb": "RD0305"},
        {"veh_no": "JH09AB3671", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1602", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
        {"veh_no": "JH09AC1223", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"}
    ]

    FALLBACK_IRREGULAR_DOS: List[Dict[str, Any]] = [
        {"do_no": "3005250001", "unit": "3005 - Sirka OC", "irr_trips": 7, "num_vehicles": 7, "src_co": "CO02 - Argada", "src_wb": "RD0403", "dst_co": "CO01 - Barka Sayal", "dst_wb": "RD0305"},
        {"do_no": "3046250002", "unit": "3046 - SD OC Mine", "irr_trips": 7, "num_vehicles": 3, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
        {"do_no": "3054260009", "unit": "3054 - AAD OCM", "irr_trips": 5, "num_vehicles": 4, "src_co": "CO12 - Dhori", "src_wb": "RD1610", "dst_co": "CO12 - Dhori", "dst_wb": "RD1609"},
        {"do_no": "3126250007", "unit": "3126 - Ashoka OC", "irr_trips": 5, "num_vehicles": 5, "src_co": "CO13 - Piparwar", "src_wb": "RD1709", "dst_co": "CO13 - Piparwar", "dst_wb": "RD1740"},
        {"do_no": "3161250002", "unit": "3161 - KBP", "irr_trips": 5, "num_vehicles": 5, "src_co": "CO10 - Hazaribagh", "src_wb": "RD1422", "dst_co": "CO10 - Hazaribagh", "dst_wb": "RD1421"}
    ]

    async def fetch_app_users(self) -> List[Dict[str, Any]]:
        """Retrieves authorized system users for authentication."""
        db_users = await self.get("app_users", {"select": "*"})
        if not db_users:
            return self.DEFAULT_USERS
        
        existing_usernames = {u.get("username") for u in db_users}
        merged = list(db_users)
        for du in self.DEFAULT_USERS:
            if du["username"] not in existing_usernames:
                merged.append(du)
        return merged

    async def fetch_weighbridge_data(self) -> List[Dict[str, Any]]:
        """Retrieves weighbridge summary records."""
        data = await self.get("weighbridge_records", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_WEIGHBRIDGE

    async def fetch_checkpost_data(self) -> List[Dict[str, Any]]:
        """Retrieves live checkpost surveillance logs."""
        data = await self.get("checkpost_logs", {"select": "*", "order": "id.asc"})
        return data if data else self.FALLBACK_CHECKPOST

    async def fetch_weighbridge_status(self) -> List[Dict[str, Any]]:
        """Retrieves weighbridge operational status summaries."""
        data = await self.get("weighbridge_status", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_WEIGHBRIDGE_STATUS

    async def fetch_advanced_analytics(self) -> List[Dict[str, Any]]:
        """Retrieves hourly throughput and anomaly aggregates."""
        data = await self.get("advanced_analytics", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_ADVANCED_ANALYTICS

    async def fetch_checkpost_status(self) -> List[Dict[str, Any]]:
        """Retrieves checkpost health & CCTV uptime indicators."""
        data = await self.get("checkpost_status", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_CHECKPOST_STATUS

    async def fetch_checkpost_analytics(self) -> List[Dict[str, Any]]:
        """Retrieves checkpost traffic analytics."""
        data = await self.get("checkpost_analytics", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_CHECKPOST_ANALYTICS

    async def fetch_vts_alert_summary(self) -> List[Dict[str, Any]]:
        """Retrieves VTS aggregated alert statistics."""
        data = await self.get("vts_alert_summary", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_VTS_ALERT_SUMMARY

    async def fetch_rfid_config(self) -> List[Dict[str, Any]]:
        """Retrieves RFID reader configurations."""
        data = await self.get("rfid_config", {"select": "*", "order": "s_no.asc"})
        return data if data else self.FALLBACK_RFID_CONFIG

    async def fetch_irregular_vehicles(self) -> List[Dict[str, Any]]:
        """Retrieves flagged irregular vehicle registrations."""
        data = await self.get("irregular_vehicles", {"select": "*", "order": "id.asc"})
        return data if data else self.FALLBACK_IRREGULAR_VEHICLES

    async def fetch_irregular_dos(self) -> List[Dict[str, Any]]:
        """Retrieves irregular Delivery Order compliance records."""
        data = await self.get("irregular_dos", {"select": "*", "order": "id.asc"})
        return data if data else self.FALLBACK_IRREGULAR_DOS


# Global Singleton Instance
supabase_service = SupabaseService()

