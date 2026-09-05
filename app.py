from fastapi import FastAPI, Request, Form, Response
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
from typing import Optional

app = FastAPI(title="TRACE Dashboard")

# User Accounts & Role-Based Access Control (RBAC) - 5 Core Roles
USERS_DB = {
    "gm": {
        "password": "gm@trace2026",
        "name": "Satish Sharma",
        "designation": "General Manager",
        "role": "gm",
        "email": "gm@trace.gov.in"
    },
    "vigilance": {
        "password": "vigilance@trace2026",
        "name": "Pankaj Kumar Singh",
        "designation": "Vigilance Officer",
        "role": "vigilance",
        "email": "vigilance@trace.gov.in"
    },
    "surveillance": {
        "password": "surveillance@trace2026",
        "name": "Ramesh Gupta",
        "designation": "Surveillance Officer",
        "role": "surveillance",
        "email": "surveillance@trace.gov.in"
    },
    "dispatch": {
        "password": "dispatch@trace2026",
        "name": "Gajender Yadav",
        "designation": "Dispatch Officer (DO)",
        "role": "dispatch",
        "email": "dispatch@trace.gov.in"
    },
    "operator": {
        "password": "operator@trace2026",
        "name": "Manoj Munda",
        "designation": "Control Operator",
        "role": "operator",
        "email": "operator@trace.gov.in"
    }
}


# Setup static files and templates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
app.mount("/media_screenshots", StaticFiles(directory=os.path.join(BASE_DIR, "Media screenshots")), name="media_screenshots")

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))
templates.env.cache = None

# Mock Data for Weighbridge Summary - Section 1: Weighment Data
WEIGHMENT_DATA = [
    {"s_no": 1, "name": "Amrapali and Chandragupta (CO07)", "road_dispatch": "18,708.55 T", "internal_sending": "10,826.24 T", "internal_receiving": "0.00 T", "total": "29,534.79 T"},
    {"s_no": 2, "name": "Argada (CO02)", "road_dispatch": "4,964.34 T", "internal_sending": "3,666.06 T", "internal_receiving": "4.93 T", "total": "8,635.33 T"},
    {"s_no": 3, "name": "Barka Sayal (CO01)", "road_dispatch": "4,705.60 T", "internal_sending": "16,213.83 T", "internal_receiving": "5,489.03 T", "total": "26,408.46 T"},
    {"s_no": 4, "name": "Bokaro and Kargali (CO04)", "road_dispatch": "9,145.20 T", "internal_sending": "16,154.64 T", "internal_receiving": "1,738.82 T", "total": "27,038.66 T"},
    {"s_no": 5, "name": "Dhori (CO12)", "road_dispatch": "204.61 T", "internal_sending": "8,314.51 T", "internal_receiving": "10,599.31 T", "total": "19,118.42 T"},
    {"s_no": 6, "name": "Giridih (CO15)", "road_dispatch": "646.82 T", "internal_sending": "1,231.56 T", "internal_receiving": "5.20 T", "total": "1,883.58 T"},
    {"s_no": 7, "name": "Hazaribagh (CO10)", "road_dispatch": "2,299.77 T", "internal_sending": "14,839.41 T", "internal_receiving": "15,050.52 T", "total": "32,189.70 T"},
    {"s_no": 8, "name": "Kathara (CO05)", "road_dispatch": "2,829.94 T", "internal_sending": "9,435.31 T", "internal_receiving": "4,403.01 T", "total": "16,668.25 T"},
    {"s_no": 9, "name": "Kuju (CO09)", "road_dispatch": "3,462.18 T", "internal_sending": "3,528.83 T", "internal_receiving": "5,524.99 T", "total": "12,516.00 T"},
    {"s_no": 10, "name": "Magadh & Sanghmitra (CO06)", "road_dispatch": "12,017.58 T", "internal_sending": "29,947.78 T", "internal_receiving": "15.29 T", "total": "41,980.65 T"},
    {"s_no": 11, "name": "NK (CO03)", "road_dispatch": "6,232.77 T", "internal_sending": "1,072.31 T", "internal_receiving": "1,101.29 T", "total": "8,406.37 T"},
    {"s_no": 12, "name": "Piparwar (CO13)", "road_dispatch": "5,332.59 T", "internal_sending": "10,764.14 T", "internal_receiving": "12,166.26 T", "total": "28,262.99 T"},
    {"s_no": 13, "name": "Rajhara (CO08)", "road_dispatch": "24.06 T", "internal_sending": "0.00 T", "internal_receiving": "0.00 T", "total": "24.06 T"},
    {"s_no": 14, "name": "Rajrappa (CO11)", "road_dispatch": "587.65 T", "internal_sending": "2,466.24 T", "internal_receiving": "10.13 T", "total": "3,064.02 T"}
]

WEIGHMENT_TOTAL = {
    "road_dispatch": "71,161.66 T",
    "internal_sending": "128,460.86 T",
    "internal_receiving": "56,108.77 T",
    "total": "255,731.28 T"
}

# Mock Data for Weighbridge Summary - Section 2: Weighbridge Status
WEIGHBRIDGE_STATUS_DATA = [
    {"s_no": 1, "name": "Amrapali and Chandragupta (CO07)", "operational_total": "13/16", "operational_pct": "81%"},
    {"s_no": 2, "name": "Argada (CO02)", "operational_total": "5/6", "operational_pct": "83%"},
    {"s_no": 3, "name": "Barka Sayal (CO01)", "operational_total": "8/11", "operational_pct": "73%"},
    {"s_no": 4, "name": "Bokaro and Kargali (CO04)", "operational_total": "11/15", "operational_pct": "73%"},
    {"s_no": 5, "name": "Dhori (CO12)", "operational_total": "7/12", "operational_pct": "58%"},
    {"s_no": 6, "name": "Giridih (CO15)", "operational_total": "2/3", "operational_pct": "67%"},
    {"s_no": 7, "name": "Hazaribagh (CO10)", "operational_total": "15/19", "operational_pct": "79%"},
    {"s_no": 8, "name": "Kathara (CO05)", "operational_total": "8/10", "operational_pct": "80%"},
    {"s_no": 9, "name": "Kuju (CO09)", "operational_total": "6/7", "operational_pct": "86%"},
    {"s_no": 10, "name": "Magadh & Sanghmitra (CO06)", "operational_total": "12/15", "operational_pct": "80%"},
    {"s_no": 11, "name": "NK (CO03)", "operational_total": "6/10", "operational_pct": "60%"},
    {"s_no": 12, "name": "Piparwar (CO13)", "operational_total": "7/14", "operational_pct": "50%"},
    {"s_no": 13, "name": "Rajhara (CO08)", "operational_total": "1/5", "operational_pct": "20%"},
    {"s_no": 14, "name": "Rajrappa (CO11)", "operational_total": "3/3", "operational_pct": "100%"}
]

WEIGHBRIDGE_STATUS_TOTAL = {
    "operational_total": "104/146",
    "operational_pct": "71%"
}

# Mock Data for Weighbridge Summary - Section 3: Advanced Analytics
ADVANCED_ANALYTICS_DATA = [
    {"s_no": 1, "name": "Amrapali and Chandragupta (CO07)", "tx_road": 642, "tx_internal": 357, "tx_total": 999, "bypassing": 0, "barrier": 261, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 2, "name": "Argada (CO02)", "tx_road": 216, "tx_internal": 131, "tx_total": 347, "bypassing": 0, "barrier": 2, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 3, "name": "Barka Sayal (CO01)", "tx_road": 169, "tx_internal": 681, "tx_total": 850, "bypassing": 0, "barrier": 47, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 4, "name": "Bokaro and Kargali (CO04)", "tx_road": 400, "tx_internal": 834, "tx_total": 1234, "bypassing": 0, "barrier": 4, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 5, "name": "Dhori (CO12)", "tx_road": 7, "tx_internal": 994, "tx_total": 1001, "bypassing": 0, "barrier": 27, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 6, "name": "Giridih (CO15)", "tx_road": 25, "tx_internal": 58, "tx_total": 83, "bypassing": 0, "barrier": 4, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 7, "name": "Hazaribagh (CO10)", "tx_road": 90, "tx_internal": 1118, "tx_total": 1208, "bypassing": 0, "barrier": 62, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 8, "name": "Kathara (CO05)", "tx_road": 127, "tx_internal": 703, "tx_total": 830, "bypassing": 0, "barrier": 0, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 9, "name": "Kuju (CO09)", "tx_road": 158, "tx_internal": 308, "tx_total": 466, "bypassing": 0, "barrier": 2, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 10, "name": "Magadh & Sanghmitra (CO06)", "tx_road": 402, "tx_internal": 883, "tx_total": 1285, "bypassing": 0, "barrier": 6, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 11, "name": "NK (CO03)", "tx_road": 231, "tx_internal": 87, "tx_total": 318, "bypassing": 0, "barrier": 7, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 12, "name": "Piparwar (CO13)", "tx_road": 179, "tx_internal": 925, "tx_total": 1104, "bypassing": 0, "barrier": 15, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 13, "name": "Rajhara (CO08)", "tx_road": 1, "tx_internal": 0, "tx_total": 1, "bypassing": 0, "barrier": 2, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"},
    {"s_no": 14, "name": "Rajrappa (CO11)", "tx_road": 26, "tx_internal": 117, "tx_total": 143, "bypassing": 0, "barrier": 3, "lv_100t": 0, "lv_road": "0 (0%)", "lv_internal": "0 (0%)", "lv_total": "0 (0%)", "anpr_road": "0 (0%)", "anpr_internal": "0 (0%)", "anpr_total": "0 (0%)"}
]

ADVANCED_ANALYTICS_TOTAL = {
    "tx_road": 2673,
    "tx_internal": 7196,
    "tx_total": 9869,
    "bypassing": 0,
    "barrier": 442,
    "lv_100t": 0,
    "lv_road": "0 (0%)",
    "lv_internal": "0 (0%)",
    "lv_total": "0 (0%)",
    "anpr_road": "0 (0%)",
    "anpr_internal": "0 (0%)",
    "anpr_total": "0 (0%)"
}

# Mock Data for Checkpost Summary - Section 1: Checkpost Status
CHECKPOST_STATUS_DATA = [
    {"s_no": 1, "name": "Amrapali and Chandragupta (CO07)", "operational_total": "7/9", "operational_pct": "78%"},
    {"s_no": 2, "name": "Argada (CO02)", "operational_total": "8/8", "operational_pct": "100%"},
    {"s_no": 3, "name": "Barka Sayal (CO01)", "operational_total": "10/12", "operational_pct": "83%"},
    {"s_no": 4, "name": "Bokaro and Kargali (CO04)", "operational_total": "6/6", "operational_pct": "100%"},
    {"s_no": 5, "name": "Dhori (CO12)", "operational_total": "8/8", "operational_pct": "100%"},
    {"s_no": 6, "name": "Giridih (CO15)", "operational_total": "2/2", "operational_pct": "100%"},
    {"s_no": 7, "name": "Hazaribagh (CO10)", "operational_total": "10/14", "operational_pct": "71%"},
    {"s_no": 8, "name": "Kathara (CO05)", "operational_total": "6/10", "operational_pct": "60%"},
    {"s_no": 9, "name": "Kuju (CO09)", "operational_total": "8/8", "operational_pct": "100%"},
    {"s_no": 10, "name": "Magadh & Sanghmitra (CO06)", "operational_total": "6/8", "operational_pct": "75%"},
    {"s_no": 11, "name": "Piparwar (CO13)", "operational_total": "6/9", "operational_pct": "67%"},
    {"s_no": 12, "name": "Rajhara (CO08)", "operational_total": "0/6", "operational_pct": "0%"},
    {"s_no": 13, "name": "Rajrappa (CO11)", "operational_total": "2/2", "operational_pct": "100%"}
]

CHECKPOST_STATUS_TOTAL = {
    "operational_total": "79/102",
    "operational_pct": "77%"
}

# Mock Data for Checkpost Summary - Section 2: Checkpost Analytics
CHECKPOST_ANALYTICS_DATA = [
    {"s_no": 1, "name": "Amrapali and Chandragupta (CO07)", "entry_total": 369, "entry_anpr": "3 (0.81%)", "exit_total": 300, "exit_anpr": "3 (1%)", "boom_total": 39, "boom_others": 39, "boom_dept": 0, "boom_pct": "3.55%"},
    {"s_no": 2, "name": "Argada (CO02)", "entry_total": 321, "entry_anpr": "8 (2.49%)", "exit_total": 421, "exit_anpr": "8 (1.9%)", "boom_total": 10, "boom_others": 8, "boom_dept": 2, "boom_pct": "0.91%"},
    {"s_no": 3, "name": "Barka Sayal (CO01)", "entry_total": 501, "entry_anpr": "1 (0.2%)", "exit_total": 505, "exit_anpr": "1 (0.2%)", "boom_total": 376, "boom_others": 238, "boom_dept": 138, "boom_pct": "34.21%"},
    {"s_no": 4, "name": "Bokaro and Kargali (CO04)", "entry_total": 914, "entry_anpr": "2 (0.22%)", "exit_total": 922, "exit_anpr": "2 (0.22%)", "boom_total": 0, "boom_others": 0, "boom_dept": 0, "boom_pct": "0%"},
    {"s_no": 5, "name": "Dhori (CO12)", "entry_total": 492, "entry_anpr": "0 (0%)", "exit_total": 483, "exit_anpr": "0 (0%)", "boom_total": 22, "boom_others": 12, "boom_dept": 10, "boom_pct": "2%"},
    {"s_no": 6, "name": "Giridih (CO15)", "entry_total": 27, "entry_anpr": "0 (0%)", "exit_total": 33, "exit_anpr": "0 (0%)", "boom_total": 8, "boom_others": 8, "boom_dept": 0, "boom_pct": "0.73%"},
    {"s_no": 7, "name": "Hazaribagh (CO10)", "entry_total": 464, "entry_anpr": "0 (0%)", "exit_total": 429, "exit_anpr": "0 (0%)", "boom_total": 2, "boom_others": 2, "boom_dept": 0, "boom_pct": "0.18%"},
    {"s_no": 8, "name": "Kathara (CO05)", "entry_total": 462, "entry_anpr": "0 (0%)", "exit_total": 494, "exit_anpr": "0 (0%)", "boom_total": 447, "boom_others": 409, "boom_dept": 38, "boom_pct": "40.67%"},
    {"s_no": 9, "name": "Kuju (CO09)", "entry_total": 452, "entry_anpr": "4 (0.88%)", "exit_total": 464, "exit_anpr": "4 (0.86%)", "boom_total": 32, "boom_others": 32, "boom_dept": 0, "boom_pct": "2.91%"},
    {"s_no": 10, "name": "Magadh & Sanghmitra (CO06)", "entry_total": 1366, "entry_anpr": "0 (0%)", "exit_total": 1330, "exit_anpr": "0 (0%)", "boom_total": 145, "boom_others": 75, "boom_dept": 70, "boom_pct": "13.19%"},
    {"s_no": 11, "name": "Piparwar (CO13)", "entry_total": 615, "entry_anpr": "0 (0%)", "exit_total": 631, "exit_anpr": "0 (0%)", "boom_total": 14, "boom_others": 14, "boom_dept": 0, "boom_pct": "1.27%"},
    {"s_no": 12, "name": "Rajrappa (CO11)", "entry_total": 39, "entry_anpr": "0 (0%)", "exit_total": 34, "exit_anpr": "0 (0%)", "boom_total": 4, "boom_others": 4, "boom_dept": 0, "boom_pct": "0.36%"}
]

CHECKPOST_ANALYTICS_TOTAL = {
    "entry_total": 6022,
    "entry_anpr": "18 (0.3%)",
    "exit_total": 6046,
    "exit_anpr": "18 (0.3%)",
    "boom_total": 1099,
    "boom_others": 841,
    "boom_dept": 258,
    "boom_pct": "100%"
}

# Mock Data for VTS Summary - Section 1: Alert Summary
VTS_ALERT_DATA = [
    {"s_no": 1, "name": "Amrapali & Chandragupta", "offroute_closed": "2/2", "offroute_pct_closed": "100%", "offroute_pct_total": "3.13%", "offarea_closed": "2/4", "offarea_pct_closed": "50%", "offarea_pct_total": "5.63%", "overlap": 0, "tamper_closed": "92/125", "tamper_pct_closed": "73.6%", "tamper_pct_total": "6.39%", "stoppage_closed": "0/1", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0.06%"},
    {"s_no": 2, "name": "Argada", "offroute_closed": "1/1", "offroute_pct_closed": "100%", "offroute_pct_total": "1.56%", "offarea_closed": "8/8", "offarea_pct_closed": "100%", "offarea_pct_total": "11.27%", "overlap": 1, "tamper_closed": "16/16", "tamper_pct_closed": "100%", "tamper_pct_total": "0.82%", "stoppage_closed": "0/16", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0.93%"},
    {"s_no": 3, "name": "Barka Sayal", "offroute_closed": "15/23", "offroute_pct_closed": "65.22%", "offroute_pct_total": "35.94%", "offarea_closed": "0/2", "offarea_pct_closed": "0%", "offarea_pct_total": "2.82%", "overlap": 1, "tamper_closed": "1/392", "tamper_pct_closed": "0.26%", "tamper_pct_total": "20.04%", "stoppage_closed": "0/10", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0.58%"},
    {"s_no": 4, "name": "Bokaro & Kargali", "offroute_closed": "1/1", "offroute_pct_closed": "100%", "offroute_pct_total": "1.56%", "offarea_closed": "3/3", "offarea_pct_closed": "100%", "offarea_pct_total": "4.23%", "overlap": 0, "tamper_closed": "81/91", "tamper_pct_closed": "89.01%", "tamper_pct_total": "4.65%", "stoppage_closed": "0/29", "stoppage_pct_closed": "0%", "stoppage_pct_total": "1.69%"},
    {"s_no": 5, "name": "Dhori", "offroute_closed": "2/2", "offroute_pct_closed": "100%", "offroute_pct_total": "3.13%", "offarea_closed": "9/9", "offarea_pct_closed": "100%", "offarea_pct_total": "12.68%", "overlap": 2, "tamper_closed": "26/26", "tamper_pct_closed": "100%", "tamper_pct_total": "1.33%", "stoppage_closed": "0/27", "stoppage_pct_closed": "0%", "stoppage_pct_total": "1.57%"},
    {"s_no": 6, "name": "Giridih", "offroute_closed": "0/0", "offroute_pct_closed": "0%", "offroute_pct_total": "0%", "offarea_closed": "0/0", "offarea_pct_closed": "0%", "offarea_pct_total": "0%", "overlap": 0, "tamper_closed": "3/3", "tamper_pct_closed": "100%", "tamper_pct_total": "0.15%", "stoppage_closed": "0/0", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0%"},
    {"s_no": 7, "name": "Hazaribagh", "offroute_closed": "6/6", "offroute_pct_closed": "100%", "offroute_pct_total": "9.38%", "offarea_closed": "33/33", "offarea_pct_closed": "100%", "offarea_pct_total": "46.48%", "overlap": 2, "tamper_closed": "122/139", "tamper_pct_closed": "87.77%", "tamper_pct_total": "7.11%", "stoppage_closed": "18/49", "stoppage_pct_closed": "36.73%", "stoppage_pct_total": "2.86%"},
    {"s_no": 8, "name": "Kathara", "offroute_closed": "0/0", "offroute_pct_closed": "0%", "offroute_pct_total": "0%", "offarea_closed": "1/1", "offarea_pct_closed": "100%", "offarea_pct_total": "1.41%", "overlap": 0, "tamper_closed": "2/2", "tamper_pct_closed": "100%", "tamper_pct_total": "0.1%", "stoppage_closed": "0/8", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0.47%"},
    {"s_no": 9, "name": "Kuju", "offroute_closed": "4/4", "offroute_pct_closed": "100%", "offroute_pct_total": "6.25%", "offarea_closed": "4/4", "offarea_pct_closed": "100%", "offarea_pct_total": "5.63%", "overlap": 2, "tamper_closed": "13/13", "tamper_pct_closed": "100%", "tamper_pct_total": "0.66%", "stoppage_closed": "9/9", "stoppage_pct_closed": "100%", "stoppage_pct_total": "0.52%"},
    {"s_no": 10, "name": "Magadh & Sanghmitra", "offroute_closed": "19/19", "offroute_pct_closed": "100%", "offroute_pct_total": "29.69%", "offarea_closed": "3/3", "offarea_pct_closed": "100%", "offarea_pct_total": "4.23%", "overlap": 1, "tamper_closed": "319/349", "tamper_pct_closed": "91.4%", "tamper_pct_total": "17.84%", "stoppage_closed": "0/1436", "stoppage_pct_closed": "0%", "stoppage_pct_total": "83.73%"},
    {"s_no": 11, "name": "North Karanpura", "offroute_closed": "1/1", "offroute_pct_closed": "100%", "offroute_pct_total": "1.56%", "offarea_closed": "0/0", "offarea_pct_closed": "0%", "offarea_pct_total": "0%", "overlap": 0, "tamper_closed": "18/18", "tamper_pct_closed": "100%", "tamper_pct_total": "0.92%", "stoppage_closed": "0/0", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0%"},
    {"s_no": 12, "name": "Piparwar", "offroute_closed": "3/5", "offroute_pct_closed": "60%", "offroute_pct_total": "7.81%", "offarea_closed": "0/4", "offarea_pct_closed": "0%", "offarea_pct_total": "5.63%", "overlap": 0, "tamper_closed": "0/769", "tamper_pct_closed": "0%", "tamper_pct_total": "39.31%", "stoppage_closed": "0/130", "stoppage_pct_closed": "0%", "stoppage_pct_total": "7.58%"},
    {"s_no": 13, "name": "Rajhara", "offroute_closed": "0/0", "offroute_pct_closed": "0%", "offroute_pct_total": "0%", "offarea_closed": "0/0", "offarea_pct_closed": "0%", "offarea_pct_total": "0%", "overlap": 0, "tamper_closed": "2/2", "tamper_pct_closed": "100%", "tamper_pct_total": "0.1%", "stoppage_closed": "0/0", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0%"},
    {"s_no": 14, "name": "Rajrappa", "offroute_closed": "0/0", "offroute_pct_closed": "0%", "offroute_pct_total": "0%", "offarea_closed": "0/0", "offarea_pct_closed": "0%", "offarea_pct_total": "0%", "overlap": 0, "tamper_closed": "5/11", "tamper_pct_closed": "45.45%", "tamper_pct_total": "0.56%", "stoppage_closed": "0/0", "stoppage_pct_closed": "0%", "stoppage_pct_total": "0%"}
]

VTS_ALERT_TOTAL = {
    "offroute_closed": "54/64", "offroute_pct_closed": "84.38%", "offroute_pct_total": "100.00%",
    "offarea_closed": "63/71", "offarea_pct_closed": "88.73%", "offarea_pct_total": "100.00%",
    "overlap": 9,
    "tamper_closed": "700/1956", "tamper_pct_closed": "35.79%", "tamper_pct_total": "100.00%",
    "stoppage_closed": "27/1715", "stoppage_pct_closed": "1.57%", "stoppage_pct_total": "100.00%"
}

# Mock Data for VTS Summary - Section 2: Fleet Info
VTS_FLEET_DATA = [
    {"s_no": 1, "name": "Amrapali & Chandragupta", "total_vehicle": 386, "online": 241, "pct_online": "62.44%", "offline": 69, "pct_offline": "17.88%", "workshop": 76, "offline_48h": 45, "offline_7d": 12, "no_data": 5, "no_route": 0},
    {"s_no": 2, "name": "Argada", "total_vehicle": 57, "online": 47, "pct_online": "82.46%", "offline": 9, "pct_offline": "15.79%", "workshop": 1, "offline_48h": 5, "offline_7d": 4, "no_data": 0, "no_route": 0},
    {"s_no": 3, "name": "Barka Sayal", "total_vehicle": 112, "online": 74, "pct_online": "66.07%", "offline": 32, "pct_offline": "28.57%", "workshop": 6, "offline_48h": 20, "offline_7d": 16, "no_data": 7, "no_route": 0},
    {"s_no": 4, "name": "Bokaro & Kargali", "total_vehicle": 246, "online": 186, "pct_online": "75.61%", "offline": 44, "pct_offline": "17.89%", "workshop": 16, "offline_48h": 31, "offline_7d": 30, "no_data": 6, "no_route": 1},
    {"s_no": 5, "name": "Dhori", "total_vehicle": 136, "online": 115, "pct_online": "84.56%", "offline": 13, "pct_offline": "9.56%", "workshop": 8, "offline_48h": 7, "offline_7d": 7, "no_data": 1, "no_route": 0},
    {"s_no": 6, "name": "Giridih", "total_vehicle": 12, "online": 12, "pct_online": "100%", "offline": 0, "pct_offline": "0%", "workshop": 0, "offline_48h": 0, "offline_7d": 0, "no_data": 0, "no_route": 0},
    {"s_no": 7, "name": "Hazaribagh", "total_vehicle": 193, "online": 146, "pct_online": "75.65%", "offline": 35, "pct_offline": "18.13%", "workshop": 12, "offline_48h": 25, "offline_7d": 18, "no_data": 1, "no_route": 0},
    {"s_no": 8, "name": "Kathara", "total_vehicle": 86, "online": 67, "pct_online": "77.91%", "offline": 5, "pct_offline": "5.81%", "workshop": 14, "offline_48h": 5, "offline_7d": 1, "no_data": 0, "no_route": 2},
    {"s_no": 9, "name": "Kuju", "total_vehicle": 88, "online": 58, "pct_online": "65.91%", "offline": 22, "pct_offline": "25%", "workshop": 8, "offline_48h": 18, "offline_7d": 16, "no_data": 2, "no_route": 0},
    {"s_no": 10, "name": "Magadh & Sanghmitra", "total_vehicle": 732, "online": 495, "pct_online": "67.62%", "offline": 216, "pct_offline": "29.51%", "workshop": 21, "offline_48h": 172, "offline_7d": 128, "no_data": 4, "no_route": 1},
    {"s_no": 11, "name": "North Karanpura", "total_vehicle": 21, "online": 11, "pct_online": "52.38%", "offline": 10, "pct_offline": "47.62%", "workshop": 0, "offline_48h": 6, "offline_7d": 5, "no_data": 3, "no_route": 0},
    {"s_no": 12, "name": "Piparwar", "total_vehicle": 157, "online": 132, "pct_online": "84.08%", "offline": 25, "pct_offline": "15.92%", "workshop": 0, "offline_48h": 14, "offline_7d": 8, "no_data": 0, "no_route": 18},
    {"s_no": 13, "name": "Rajhara", "total_vehicle": 23, "online": 16, "pct_online": "69.57%", "offline": 7, "pct_offline": "30.43%", "workshop": 0, "offline_48h": 6, "offline_7d": 6, "no_data": 0, "no_route": 0},
    {"s_no": 14, "name": "Rajrappa", "total_vehicle": 30, "online": 21, "pct_online": "70%", "offline": 9, "pct_offline": "30%", "workshop": 0, "offline_48h": 6, "offline_7d": 3, "no_data": 0, "no_route": 0}
]

VTS_FLEET_TOTAL = {
    "total_vehicle": 2279,
    "online": 1621,
    "pct_online": "71.13%",
    "offline": 496,
    "pct_offline": "21.76%",
    "workshop": 162,
    "offline_48h": 360,
    "offline_7d": 254,
    "no_data": 29,
    "no_route": 22
}

RFID_OPERATION_WBS = [
    {"s_no": 1, "area": "Barka Sayal", "weighbridge": "POTANGA ROAD WEIGHBRIDGE (RD0301)"},
    {"s_no": 2, "area": "Barka Sayal", "weighbridge": "Urimari hesabeda road WB (RD0302)"},
    {"s_no": 3, "area": "Barka Sayal", "weighbridge": "SAUNDA B 60 MT WB (RD0305)"},
    {"s_no": 4, "area": "Barka Sayal", "weighbridge": "New Birsa 60 TON WB (RD0307)"},
    {"s_no": 5, "area": "Barka Sayal", "weighbridge": "BIRSA HESABEDA 50TON WEIGHBRIDGE (RD0308)"},
    {"s_no": 6, "area": "Barka Sayal", "weighbridge": "SAYAL D 100MT WB (RD0311)"},
    {"s_no": 7, "area": "Barka Sayal", "weighbridge": "NEW BIRSA 100 TON WB (RD0318)"},
    {"s_no": 8, "area": "Barka Sayal", "weighbridge": "Old Birsa 100 Ton (RD0319)"},
    {"s_no": 9, "area": "Argada", "weighbridge": "GIDDI C60 MT ELECTRONIC ROAD WB (RD0401)"},
    {"s_no": 10, "area": "Argada", "weighbridge": "RELIGARA WB 60 MT (RD0402)"},
    {"s_no": 11, "area": "Argada", "weighbridge": "SIRKA 50 MT ROAD WB (RD0403)"}
]

RFID_NON_OPERATION_WBS = [
    {"s_no": 3, "area": "Piparwar", "weighbridge": "CHP WB 10 (RD0101)"},
    {"s_no": 4, "area": "Barka Sayal", "weighbridge": "Saunda 50Mt New (RD0304)"},
    {"s_no": 5, "area": "Barka Sayal", "weighbridge": "BHURKUNDA MINE B 50MT (RD0310)"},
    {"s_no": 6, "area": "Barka Sayal", "weighbridge": "SAYAL D 100 MT NEW WB AFM OFFICE (RD0313)"},
    {"s_no": 7, "area": "Barka Sayal", "weighbridge": "RA MINING SAYAL 50 MT WB03 (RD0314)"},
    {"s_no": 8, "area": "Argada", "weighbridge": "Gidi A 60 MT ROAD WB (RD0405)"},
    {"s_no": 9, "area": "Argada", "weighbridge": "Purnadih WB 2 (RD0603)"},
    {"s_no": 10, "area": "NK", "weighbridge": "KDH ROAD WB No 2 (RD0606)"},
    {"s_no": 11, "area": "NK", "weighbridge": "KDH WB 03 (RD0607)"},
    {"s_no": 12, "area": "NK", "weighbridge": "Dakra WB No 1 (RD0608)"},
    {"s_no": 13, "area": "NK", "weighbridge": "Churi Road Weighbridge 2 (RD0612)"}
]

RFID_OPERATION_CPS = [
    {"s_no": 1, "area": "Barka Sayal", "checkpost": "NEW BIRSA CHECKPOST ENTRY (CP0111)"},
    {"s_no": 2, "area": "Barka Sayal", "checkpost": "NEW BIRSA CHECKPOST EXIT (CP0112)"},
    {"s_no": 3, "area": "Barka Sayal", "checkpost": "PSME ENTRY (CP0121)"},
    {"s_no": 4, "area": "Barka Sayal", "checkpost": "PSME EXIT (CP0122)"},
    {"s_no": 5, "area": "Barka Sayal", "checkpost": "NEW SAYAL D CHECKPOST ENTRY GATE (CP0123)"},
    {"s_no": 6, "area": "Barka Sayal", "checkpost": "NEW SAYAL D CHECKPOST EXIT GATE (CP0124)"},
    {"s_no": 7, "area": "Barka Sayal", "checkpost": "Potanga CP ENTRY (CP0125)"},
    {"s_no": 8, "area": "Barka Sayal", "checkpost": "Potanga Checkpost Exit (CP0126)"},
    {"s_no": 9, "area": "Barka Sayal", "checkpost": "Hesabeda Checkpost Entry (CP0128)"},
    {"s_no": 10, "area": "Barka Sayal", "checkpost": "Hesabeda Checkpost Exit (CP0129)"},
    {"s_no": 11, "area": "Barka Sayal", "checkpost": "KARO CHECKPOST ENTRY (CP0411)"}
]

RFID_NON_OPERATION_CPS = [
    {"s_no": 1, "area": "Hazaribagh", "checkpost": "KBP Checkpost 1 Exit (1014)"},
    {"s_no": 2, "area": "Giridih", "checkpost": "test (1551)"},
    {"s_no": 3, "area": "Rajhara", "checkpost": "DEMO SRC IN (CP0001)"},
    {"s_no": 4, "area": "Rajhara", "checkpost": "DEMO SRC OUT (CP0002)"},
    {"s_no": 5, "area": "Giridih", "checkpost": "DEMO REC IN (CP0003)"},
    {"s_no": 6, "area": "Giridih", "checkpost": "DEMO REC OUT (CP0004)"},
    {"s_no": 7, "area": "Kathara", "checkpost": "GOVINDPUR CHECKPOST ENTRY (CP0531)"},
    {"s_no": 8, "area": "Kathara", "checkpost": "GOVINDPUR CHECKPOST EXIT (CP0532)"},
    {"s_no": 9, "area": "Kathara", "checkpost": "GOVINDPUR ZERO POINT CP ENTRY (CP0551)"},
    {"s_no": 10, "area": "Kathara", "checkpost": "GOVINDPUR ZERO POINT CP EXIT (CP0552)"},
    {"s_no": 11, "area": "Magadh & Sanghmitra", "checkpost": "Magadh Checkpost 1 (CP0651)"}
]

IRREGULAR_VEHICLES_DATA = [
    {"veh_no": "JH09AJ0402", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 3, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
    {"veh_no": "JH09AY3044", "unit": "3054 - AAD OCM", "do_no": "3054260009", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1610", "dst_co": "CO12 - Dhori", "dst_wb": "RD1608"},
    {"veh_no": "JH02BK7883", "unit": "3017 - Sayal D OC", "do_no": "3017250004", "irr_trips": 2, "src_co": "CO01 - Barka Sayal", "src_wb": "RD0311", "dst_co": "CO01 - Barka Sayal", "dst_wb": "RD0305"},
    {"veh_no": "JH09AB3671", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1602", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
    {"veh_no": "JH09AC1223", "unit": "3046 - SD OC Mine", "do_no": "3046250002", "irr_trips": 2, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"}
]

IRREGULAR_DOS_DATA = [
    {"do_no": "3005250001", "unit": "3005 - Sirka OC", "irr_trips": 7, "num_vehicles": 7, "src_co": "CO02 - Argada", "src_wb": "RD0403", "dst_co": "CO01 - Barka Sayal", "dst_wb": "RD0305"},
    {"do_no": "3046250002", "unit": "3046 - SD OC Mine", "irr_trips": 7, "num_vehicles": 3, "src_co": "CO12 - Dhori", "src_wb": "RD1603", "dst_co": "CO12 - Dhori", "dst_wb": "RD1602"},
    {"do_no": "3054260009", "unit": "3054 - AAD OCM", "irr_trips": 5, "num_vehicles": 4, "src_co": "CO12 - Dhori", "src_wb": "RD1610", "dst_co": "CO12 - Dhori", "dst_wb": "RD1609"},
    {"do_no": "3126250007", "unit": "3126 - Ashoka OC", "irr_trips": 5, "num_vehicles": 5, "src_co": "CO13 - Piparwar", "src_wb": "RD1709", "dst_co": "CO13 - Piparwar", "dst_wb": "RD1740"},
    {"do_no": "3161250002", "unit": "3161 - KBP", "irr_trips": 5, "num_vehicles": 5, "src_co": "CO10 - Hazaribagh", "src_wb": "RD1422", "dst_co": "CO10 - Hazaribagh", "dst_wb": "RD1421"}
]

import supabase_db

@app.get("/")
async def read_root(request: Request):
    session_user = request.cookies.get("session_user")
    if not session_user or session_user not in USERS_DB:
        return RedirectResponse(url="/login", status_code=303)

    user_info = USERS_DB[session_user]
    
    # Fetch live data from Supabase (with automatic fallback)
    live_weighbridge = await supabase_db.fetch_weighbridge_data()
    live_checkpost = await supabase_db.fetch_checkpost_data()
    live_fleet = await supabase_db.fetch_vts_fleet_data()
    live_alerts = await supabase_db.fetch_security_alerts()

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "weighment_data": live_weighbridge if live_weighbridge else WEIGHMENT_DATA,
            "weighment_total": WEIGHMENT_TOTAL,
            "weighbridge_status_data": WEIGHBRIDGE_STATUS_DATA,
            "weighbridge_status_total": WEIGHBRIDGE_STATUS_TOTAL,
            "advanced_analytics_data": ADVANCED_ANALYTICS_DATA,
            "advanced_analytics_total": ADVANCED_ANALYTICS_TOTAL,
            "checkpost_status_data": CHECKPOST_STATUS_DATA,
            "checkpost_status_total": CHECKPOST_STATUS_TOTAL,
            "checkpost_analytics_data": CHECKPOST_ANALYTICS_DATA,
            "checkpost_analytics_total": CHECKPOST_ANALYTICS_TOTAL,
            "vts_alert_data": VTS_ALERT_DATA,
            "vts_alert_total": VTS_ALERT_TOTAL,
            "vts_fleet_data": live_fleet if live_fleet else VTS_FLEET_DATA,
            "vts_fleet_total": VTS_FLEET_TOTAL,
            "live_checkpost_logs": live_checkpost,
            "live_alerts_data": live_alerts,
            "rfid_op_wbs": RFID_OPERATION_WBS,
            "rfid_non_op_wbs": RFID_NON_OPERATION_WBS,
            "rfid_op_cps": RFID_OPERATION_CPS,
            "rfid_non_op_cps": RFID_NON_OPERATION_CPS,
            "irregular_vehicles": IRREGULAR_VEHICLES_DATA,
            "irregular_dos": IRREGULAR_DOS_DATA,
            "current_date": "2026-08-24",
            "user_name": user_info["name"],
            "user_designation": user_info["designation"],
            "user_role": user_info["role"],
            "user_id": session_user
        }
    )

@app.get("/login")
def get_login(request: Request):
    session_user = request.cookies.get("session_user")
    if session_user and session_user in USERS_DB:
        return RedirectResponse(url="/", status_code=303)
    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": None}
    )

@app.post("/login")
async def post_login(
    request: Request,
    username: str = Form(""),
    password: str = Form(""),
    role: Optional[str] = Form(None)
):
    cleaned_user = username.strip().lower()
    cleaned_pass = password.strip()
    selected_role = role.strip().lower() if role else None

    # If role is selected, verify that the credentials match that specific role
    if selected_role and selected_role in USERS_DB:
        user_info = USERS_DB[selected_role]
        valid_identifiers = {
            selected_role,
            user_info.get("email", "").lower(),
            f"{selected_role}@trace.gov.in",
            f"{selected_role}@trace2026",
            f"{selected_role}@trace.in"
        }
        if (cleaned_user in valid_identifiers or cleaned_user == selected_role) and user_info["password"] == cleaned_pass:
            response = RedirectResponse(url="/", status_code=303)
            response.set_cookie(key="session_user", value=selected_role, max_age=86400, httponly=True, samesite="lax")
            response.set_cookie(key="user_role", value=user_info["role"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_name", value=user_info["name"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_designation", value=user_info["designation"], max_age=86400, samesite="lax")
            return response
        else:
            return templates.TemplateResponse(
                request=request,
                name="login.html",
                context={"error": f"Invalid Email/ID or Password for selected role '{user_info['designation']}'."}
            )

    # Direct match fallback if no role specified or generic login
    for role_key, user_info in USERS_DB.items():
        valid_identifiers = {
            role_key,
            user_info.get("email", "").lower(),
            f"{role_key}@trace.gov.in",
            f"{role_key}@trace2026",
            f"{role_key}@trace.in"
        }
        if cleaned_user in valid_identifiers and user_info["password"] == cleaned_pass:
            response = RedirectResponse(url="/", status_code=303)
            response.set_cookie(key="session_user", value=role_key, max_age=86400, httponly=True, samesite="lax")
            response.set_cookie(key="user_role", value=user_info["role"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_name", value=user_info["name"], max_age=86400, samesite="lax")
            response.set_cookie(key="user_designation", value=user_info["designation"], max_age=86400, samesite="lax")
            return response

    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={"error": "Invalid Role, User ID/Email, or Password. Please select a role and verify credentials."}
    )

# =========================================================================
# REST API ENDPOINTS FOR SUPABASE LIVE DATA & REAL-TIME DEMO
# =========================================================================

@app.get("/api/data/weighbridge")
async def api_get_weighbridge():
    data = await supabase_db.fetch_weighbridge_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/checkpost")
async def api_get_checkpost():
    data = await supabase_db.fetch_checkpost_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/vts")
async def api_get_vts():
    data = await supabase_db.fetch_vts_fleet_data()
    return {"status": "success", "count": len(data), "data": data}

@app.get("/api/data/alerts")
async def api_get_alerts(status: Optional[str] = None):
    data = await supabase_db.fetch_security_alerts(status_filter=status)
    return {"status": "success", "count": len(data), "data": data}

@app.post("/api/alerts/{alert_id}/acknowledge")
async def api_acknowledge_alert(alert_id: int):
    ok = await supabase_db.update_alert_status(alert_id, "ACKNOWLEDGED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "ACKNOWLEDGED"}

@app.post("/api/alerts/{alert_id}/resolve")
async def api_resolve_alert(alert_id: int):
    ok = await supabase_db.update_alert_status(alert_id, "RESOLVED")
    return {"status": "success" if ok else "error", "alert_id": alert_id, "new_status": "RESOLVED"}

@app.post("/api/alerts/simulate")
async def api_simulate_alert(request: Request):
    import random
    types = [
        ("Unauthorized Stoppage", "CRITICAL", "Vehicle stationary in unapproved transit sector > 18 mins with coal payload."),
        ("Geofence Route Breach", "HIGH", "Vehicle deviated 340 meters outside approved mining corridor."),
        ("Weight Anomaly Detected", "WARNING", "Gross weight registered +3.1 Tons over authorized e-Way bill capacity."),
        ("Unregistered RFID Ingate", "HIGH", "Vehicle RFID scan unrecognized at Siding Gate 4.")
    ]
    chosen = random.choice(types)
    veh_no = f"JH0{random.randint(1,9)}-{chr(random.randint(65,90))}{chr(random.randint(65,90))}-{random.randint(1000,9999)}"
    loc = random.choice(["Amrapali Sector 3 Road", "Piparwar Coal Washery Route", "Ashoka Siding Platform B", "Karkatta Section C"])
    
    alert_obj = {
        "alert_type": chosen[0],
        "vehicle_no": veh_no,
        "location": loc,
        "severity": chosen[1],
        "status": "ACTIVE",
        "confidence_score": random.randint(90, 99),
        "description": chosen[2]
    }
    result = await supabase_db.create_security_alert(alert_obj)
    return {"status": "success", "created_alert": result}

@app.post("/api/vts/simulate-step")
async def api_simulate_vts_step():
    import random
    fleet = await supabase_db.fetch_vts_fleet_data()
    if fleet:
        veh = random.choice(fleet)
        delta_lat = random.uniform(-0.0008, 0.0008)
        delta_lng = random.uniform(-0.0008, 0.0008)
        new_speed = max(0, min(55, veh.get("speed", 30) + random.randint(-4, 4)))
        await supabase_db.update_vts_telemetry(veh["vehicle_no"], delta_lat, delta_lng, new_speed)
    return {"status": "success"}

import json

@app.get("/api/audit-reports")
def get_audit_reports():
    manifest_path = os.path.join(BASE_DIR, "static", "reports_split", "manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@app.get("/logout")
def get_logout():
    response = RedirectResponse(url="/login", status_code=303)
    response.delete_cookie("session_user")
    response.delete_cookie("user_role")
    response.delete_cookie("user_name")
    response.delete_cookie("user_designation")
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)


