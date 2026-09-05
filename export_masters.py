import json

with open('static/do_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

areas = {}
plants = {}
locations = {}
weighbridges = {}
checkposts = {}

area_meta = {
    'Kathara': {'lat': 23.7541, 'lng': 85.8643, 'gm': 'C B TIWARY', 'code': 'AR-KAT', 'target_mt': 18.5, 'hq': 'Kathara Regional Office'},
    'Barka Sayal': {'lat': 23.7032, 'lng': 85.3421, 'gm': 'SKSINGH', 'code': 'AR-BSY', 'target_mt': 22.0, 'hq': 'Sayal Complex'},
    'Dhori': {'lat': 23.7712, 'lng': 85.9814, 'gm': 'Manoj Kumar Pathak', 'code': 'AR-DHR', 'target_mt': 25.4, 'hq': 'Dhori Area GM Office'},
    'Hazaribagh': {'lat': 23.9937, 'lng': 85.3621, 'gm': 'Ankit kumar', 'code': 'AR-HZB', 'target_mt': 16.8, 'hq': 'Charhi Complex'},
    'Kuju': {'lat': 23.7221, 'lng': 85.5012, 'gm': 'Kuju GM Officer', 'code': 'AR-KUJ', 'target_mt': 14.2, 'hq': 'Kuju Area Office'},
    'Argada': {'lat': 23.6341, 'lng': 85.3512, 'gm': 'SKSINGH', 'code': 'AR-ARG', 'target_mt': 12.0, 'hq': 'Argada Colliery HQ'},
    'Rajrappa': {'lat': 23.6289, 'lng': 85.7104, 'gm': 'SO MINING RAJRAPPA', 'code': 'AR-RJP', 'target_mt': 19.5, 'hq': 'Rajrappa Project HQ'},
    'Piparwar': {'lat': 23.7254, 'lng': 85.0412, 'gm': 'SOMINING PIPARWAR', 'code': 'AR-PIP', 'target_mt': 30.0, 'hq': 'Bachra Colony, Piparwar'},
    'Magadh & Sanghmitra': {'lat': 23.8112, 'lng': 84.9512, 'gm': 'Magadh GM Office', 'code': 'AR-MAG', 'target_mt': 35.0, 'hq': 'Tandwa Regional Complex'},
    'Giridih': {'lat': 24.1832, 'lng': 86.3012, 'gm': 'DEMOSO GIRIDIH', 'code': 'AR-GRD', 'target_mt': 8.5, 'hq': 'Beniadih Complex'},
    'Rajhara': {'lat': 23.9512, 'lng': 84.2145, 'gm': 'Vangalapudi Adam', 'code': 'AR-RJH', 'target_mt': 10.0, 'hq': 'Rajhara Colliery Office'},
    'NK': {'lat': 23.7612, 'lng': 85.1245, 'gm': 'SOMINING NK', 'code': 'AR-NK', 'target_mt': 24.0, 'hq': 'Dakra Administrative Building'},
    'Bokaro and Kargali': {'lat': 23.7842, 'lng': 85.9512, 'gm': 'SATENDRA SINGH', 'code': 'AR-BNK', 'target_mt': 28.0, 'hq': 'Kargali Head Office, B&K'},
    'Amrapali and Chandragupta': {'lat': 23.8541, 'lng': 84.9812, 'gm': 'Sanjeev Kumar', 'code': 'AR-AMP', 'target_mt': 40.0, 'hq': 'Amrapali Project Office'}
}

for r in data:
    for a_key, p_key, cp_key, wb_key, loc_key in [
        ('from_area', 'from_plant', 'from_checkposts', 'from_wbs', 'from_locations'),
        ('to_area', 'to_plant', 'to_checkposts', 'to_wbs', 'to_locations')
    ]:
        area_name = (r.get(a_key) or '').strip()
        plant_name = (r.get(p_key) or '').strip()
        cp_str = (r.get(cp_key) or '').strip()
        wb_str = (r.get(wb_key) or '').strip()
        loc_str = (r.get(loc_key) or '').strip()

        if area_name and area_name not in areas:
            meta = area_meta.get(area_name, {'lat': 23.75, 'lng': 85.50, 'gm': 'Area GM', 'code': f'AR-{len(areas)+1:02d}', 'target_mt': 15.0, 'hq': f'{area_name} HQ'})
            areas[area_name] = {
                'id': meta['code'],
                'name': area_name,
                'gm_incharge': meta['gm'],
                'hq_office': meta.get('hq', f'{area_name} Complex'),
                'target_annual_mt': meta['target_mt'],
                'lat': round(meta['lat'], 4),
                'lng': round(meta['lng'], 4),
                'status': 'Operational',
                'active_mines_count': 0
            }

        if plant_name:
            ptype = 'Opencast Mine (OCP)'
            if 'UG' in plant_name or 'Underground' in plant_name: ptype = 'Underground Mine (UG)'
            elif 'Washery' in plant_name: ptype = 'Coal Washery'
            elif 'Coke' in plant_name: ptype = 'Coke Plant'
            elif 'Siding' in plant_name or 'CHP' in plant_name: ptype = 'CHP & Siding'
            
            p_code = 'PLT-' + ''.join([w[0] for w in plant_name.replace('(', ' ').replace(')', ' ').split() if w])[:5].upper()
            if plant_name not in plants:
                base_lat = areas[area_name]['lat'] if area_name in areas else 23.75
                base_lng = areas[area_name]['lng'] if area_name in areas else 85.50
                plants[plant_name] = {
                    'code': p_code,
                    'name': plant_name,
                    'area': area_name if area_name else 'Central Coalfields',
                    'type': ptype,
                    'daily_capacity_tpd': 8500 if 'Washery' in ptype else 15000,
                    'lat': round(base_lat + (len(plants) % 15) * 0.008 - 0.05, 4),
                    'lng': round(base_lng + (len(plants) % 15) * 0.008 - 0.05, 4),
                    'status': 'Online',
                    'contact': 'Plant Incharge'
                }

        if wb_str and wb_str != 'NA':
            for wb_code in wb_str.split():
                wb_code = wb_code.strip()
                if wb_code and wb_code not in weighbridges:
                    weighbridges[wb_code] = {
                        'code': wb_code,
                        'name': f'Weighbridge {wb_code}',
                        'plant': plant_name if plant_name else 'Main Plant',
                        'area': area_name if area_name else 'Central Cluster',
                        'type': 'Pitless Static Scale (100 MT)',
                        'capacity_mt': 100,
                        'tolerance_kg': 20,
                        'cameras': 2,
                        'ip_address': f'192.168.10.{len(weighbridges)+10}',
                        'status': 'Online',
                        'live_drift_kg': round((len(weighbridges) % 3) * 0.1, 1),
                        'last_calibration': '15-08-2026'
                    }

        if cp_str and cp_str != 'NA':
            for cp_code in cp_str.split():
                cp_code = cp_code.strip()
                if cp_code and cp_code not in checkposts:
                    checkposts[cp_code] = {
                        'code': cp_code,
                        'name': f'Security Checkpost {cp_code}',
                        'plant': plant_name if plant_name else 'Main Gate',
                        'area': area_name if area_name else 'Central Cluster',
                        'lane': 'Entry / Exit Bi-Directional',
                        'barrier_status': 'AUTO',
                        'rfid_status': 'Online',
                        'guard_incharge': 'Vigilance Guard Officer',
                        'daily_passes': 412 + len(checkposts) * 5
                    }

        if loc_str and loc_str != 'NA':
            for loc_name in loc_str.split(','):
                loc_name = loc_name.strip()
                if loc_name and loc_name not in locations:
                    cat = 'Coal Stock Pile'
                    if 'Face' in loc_name or 'MINE' in loc_name or 'PATCH' in loc_name or 'Coal Face' in loc_name: cat = 'Active Mining Face'
                    elif 'Siding' in loc_name or 'SIDING' in loc_name: cat = 'Railway Coal Siding'
                    elif 'SILO' in loc_name or 'Silo' in loc_name: cat = 'Automated Silo Rapid Loading'
                    elif 'Crusher' in loc_name or 'CRUSHER' in loc_name or 'Hopper' in loc_name: cat = 'Crushing / Hopper Plant'
                    elif 'Dump' in loc_name: cat = 'Waste / Overburden Dump'
                    
                    base_lat = areas[area_name]['lat'] if area_name in areas else 23.75
                    base_lng = areas[area_name]['lng'] if area_name in areas else 85.50
                    locations[loc_name] = {
                        'id': f'LOC-{len(locations)+1:03d}',
                        'name': loc_name,
                        'category': cat,
                        'plant': plant_name if plant_name else 'Mining Zone',
                        'area': area_name if area_name else 'Central Cluster',
                        'lat': round(base_lat + (len(locations) % 25) * 0.005 - 0.06, 4),
                        'lng': round(base_lng + (len(locations) % 25) * 0.006 - 0.06, 4),
                        'radius_meters': 150 if 'Silo' in cat else 200,
                        'status': 'Active'
                    }

for p in plants.values():
    if p['area'] in areas:
        areas[p['area']]['active_mines_count'] += 1

master_data = {
    'areas': list(areas.values()),
    'plants': list(plants.values()),
    'locations': list(locations.values()),
    'weighbridges': list(weighbridges.values()),
    'checkposts': list(checkposts.values())
}

with open('static/config_masters.json', 'w', encoding='utf-8') as f:
    json.dump(master_data, f, indent=2)

with open('static/js/config_masters.js', 'w', encoding='utf-8') as f:
    f.write('// TRACE Configuration Masters Dataset (Areas, Plants, Locations, Weighbridges, Checkposts)\n')
    f.write('const CONFIG_MASTERS_DATA = ' + json.dumps(master_data, indent=2) + ';\n')

print(f"Generated: {len(areas)} Areas, {len(plants)} Plants, {len(locations)} Locations, {len(weighbridges)} Weighbridges, {len(checkposts)} Checkposts")
