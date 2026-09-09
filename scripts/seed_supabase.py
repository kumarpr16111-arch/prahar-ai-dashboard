import asyncio
import httpx
import sys
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from backend.core.config import config
SUPABASE_URL = config.SUPABASE_URL
def get_headers():
    return config.headers

USERS_LIST = [
    {"username": "gm", "password": "gm@trace2026", "name": "Rajeshwar Prasad Singh", "designation": "General Manager (Operations)", "role": "gm", "email": "gm@trace.gov.in"},
    {"username": "vigilance", "password": "vigilance@trace2026", "name": "Amitabh Roy", "designation": "Chief Vigilance Officer", "role": "vigilance", "email": "vigilance@trace.gov.in"},
    {"username": "surveillance", "password": "surveillance@trace2026", "name": "Sunil Verma", "designation": "Mining Surveillance Incharge", "role": "surveillance", "email": "surveillance@trace.gov.in"},
    {"username": "dispatch", "password": "dispatch@trace2026", "name": "Rakesh Kumar", "designation": "Central Dispatch Officer", "role": "dispatch", "email": "dispatch@trace.gov.in"},
    {"username": "operator", "password": "operator@trace2026", "name": "Vikas Mahto", "designation": "Command Control Operator", "role": "operator", "email": "operator@trace.gov.in"},
    {"username": "admin", "password": "password123", "name": "System Administrator", "designation": "Command Center Chief", "role": "admin", "email": "admin@prahar.ai"}
]

WEIGHBRIDGE_STATUS_DATA = [
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

ADVANCED_ANALYTICS_DATA = [
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

CHECKPOST_STATUS_DATA = [
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

CHECKPOST_ANALYTICS_DATA = [
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

VTS_ALERT_DATA = [
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

RFID_LIST = [
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

IRREGULAR_VEHICLES_DATA = [
    {"veh_no": "JH02-CC-4019", "unit": "Amrapali OCP", "do_no": "DO-2026-8819", "irr_trips": 4, "src_co": "CO07", "src_wb": "WB-01", "dst_co": "CO02", "dst_wb": "WB-04"},
    {"veh_no": "JH01-DY-7721", "unit": "Piparwar Washery", "do_no": "DO-2026-9042", "irr_trips": 6, "src_co": "CO01", "src_wb": "WB-03", "dst_co": "CO09", "dst_wb": "WB-02"},
    {"veh_no": "JH05-BK-3390", "unit": "Ashoka Siding", "do_no": "DO-2026-7731", "irr_trips": 3, "src_co": "CO02", "src_wb": "WB-02", "dst_co": "CO07", "dst_wb": "WB-01"},
    {"veh_no": "JH09-ZZ-1100", "unit": "North Karanpura", "do_no": "DO-2026-9905", "irr_trips": 5, "src_co": "CO09", "src_wb": "WB-01", "dst_co": "CO08", "dst_wb": "WB-03"},
    {"veh_no": "JH10-AB-5542", "unit": "Magadh Open Cast", "do_no": "DO-2026-8120", "irr_trips": 2, "src_co": "CO08", "src_wb": "WB-04", "dst_co": "CO01", "dst_wb": "WB-02"}
]

IRREGULAR_DOS_DATA = [
    {"do_no": "DO-2026-8819", "unit": "Amrapali OCP", "irr_trips": 12, "num_vehicles": 3, "src_co": "CO07", "src_wb": "WB-01", "dst_co": "CO02", "dst_wb": "WB-04"},
    {"do_no": "DO-2026-9042", "unit": "Piparwar Washery", "irr_trips": 18, "num_vehicles": 4, "src_co": "CO01", "src_wb": "WB-03", "dst_co": "CO09", "dst_wb": "WB-02"},
    {"do_no": "DO-2026-7731", "unit": "Ashoka Siding", "irr_trips": 9, "num_vehicles": 2, "src_co": "CO02", "src_wb": "WB-02", "dst_co": "CO07", "dst_wb": "WB-01"},
    {"do_no": "DO-2026-9905", "unit": "North Karanpura", "irr_trips": 14, "num_vehicles": 3, "src_co": "CO09", "src_wb": "WB-01", "dst_co": "CO08", "dst_wb": "WB-03"}
]

async def seed_table(client: httpx.AsyncClient, table_name: str, data_list: list):
    print(f"Seeding {table_name} with {len(data_list)} records...")
    for item in data_list:
        try:
            resp = await client.post(
                f"{SUPABASE_URL}/rest/v1/{table_name}",
                headers=get_headers(),
                json=item
            )
            if resp.status_code not in [200, 201]:
                print(f"  [Warn] {table_name}: HTTP {resp.status_code} - {resp.text}")
        except Exception as e:
            print(f"  [Error] {table_name}: {e}")
    print(f"Finished {table_name}.\n")

async def main():
    print(f"Connecting to Supabase at: {SUPABASE_URL}")
    async with httpx.AsyncClient() as client:
        await seed_table(client, "app_users", USERS_LIST)
        await seed_table(client, "weighbridge_status", WEIGHBRIDGE_STATUS_DATA)
        await seed_table(client, "advanced_analytics", ADVANCED_ANALYTICS_DATA)
        await seed_table(client, "checkpost_status", CHECKPOST_STATUS_DATA)
        await seed_table(client, "checkpost_analytics", CHECKPOST_ANALYTICS_DATA)
        await seed_table(client, "vts_alert_summary", VTS_ALERT_DATA)
        await seed_table(client, "rfid_config", RFID_LIST)
        await seed_table(client, "irregular_vehicles", IRREGULAR_VEHICLES_DATA)
        await seed_table(client, "irregular_dos", IRREGULAR_DOS_DATA)
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(main())
