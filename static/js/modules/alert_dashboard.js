// SUPABASE REAL-TIME ALERTS & INTERACTIVE ICCC DASHBOARD ENGINE
// =========================================================================

// Web Audio API Synthesizer for Tactical Surveillance Chimes
let audioCtx = null;
window.ALERT_AUDIO_MUTED = false;
window.ALERT_AUDIO_VOLUME = 1.0; // Loud 100% volume by default
window.IS_LIVE_STREAM_ACTIVE = true;
window.IS_ALERT_VIEW_LOCKED = false;
window.CURRENT_ALERT_SEVERITY_FILTER = 'ALL';
window.CURRENT_ALERT_STATUS_FILTER = 'ALL';
window.CURRENT_ALERT_AREA_FILTER = 'all';
window.CURRENT_ALERT_SEARCH_QUERY = '';
window.CURRENT_ALERT_CATEGORY = 'All Types';
window.ACTIVE_MODAL_INCIDENT = null;
window.LAST_KNOWN_ALERT_COUNT = 0;

// Unlock AudioContext on first user interaction so browsers never block sound
['click', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        } catch (e) {}
    }, { once: true });
});

// Global Large Tactical Alert Notification Toast (Bottom Center)
window.showAuditToast = function(msg) {
    const existing = document.getElementById('globalAlertToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'globalAlertToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '28px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.opacity = '0';
    toast.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 26, 0.99) 100%)';
    toast.style.color = '#ffffff';
    toast.style.padding = '14px 26px';
    toast.style.borderRadius = '10px';
    toast.style.border = '1.5px solid rgba(56, 189, 248, 0.5)';
    toast.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.75), 0 0 22px rgba(56, 189, 248, 0.35)';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '999999';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.maxWidth = '92vw';
    toast.style.backdropFilter = 'blur(12px)';
    toast.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
    toast.style.pointerEvents = 'none';
    toast.style.letterSpacing = '0.015em';

    // Highlight border for critical alarms
    if (msg.includes('🚨') || msg.toLowerCase().includes('critical') || msg.toLowerCase().includes('anomaly')) {
        toast.style.border = '1.5px solid rgba(239, 68, 68, 0.7)';
        toast.style.boxShadow = '0 14px 40px rgba(0, 0, 0, 0.8), 0 0 28px rgba(239, 68, 68, 0.45)';
    } else if (msg.includes('🟢') || msg.includes('✅') || msg.includes('✓') || msg.includes('🛡️')) {
        toast.style.border = '1.5px solid rgba(16, 185, 129, 0.6)';
        toast.style.boxShadow = '0 14px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(16, 185, 129, 0.35)';
    }

    toast.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 8px;">${msg}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(16px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 280);
    }, 3200);
};

function playAlertChime(type = 'normal') {
    if (window.ALERT_AUDIO_MUTED || window.ALERT_AUDIO_VOLUME <= 0) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        // Powerful master gain for crisp, loud projection
        const vol = Math.min(1.0, Math.max(0.3, (window.ALERT_AUDIO_VOLUME || 1.0) * 0.9));

        if (type === 'critical') {
            // Loud Tactical 3-Pulse Alarm: Piercing High E6 (1318Hz) -> A5 (880Hz) with dual harmonic layers
            [0, 0.14, 0.28].forEach(offset => {
                // Primary tone (triangle for strong piercing body)
                const osc1 = audioCtx.createOscillator();
                const gain1 = audioCtx.createGain();
                osc1.type = 'triangle';
                osc1.frequency.setValueAtTime(1318.51, now + offset);
                osc1.frequency.exponentialRampToValueAtTime(880.00, now + offset + 0.10);
                gain1.gain.setValueAtTime(vol * 1.5, now + offset);
                gain1.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);
                osc1.connect(gain1);
                gain1.connect(audioCtx.destination);
                osc1.start(now + offset);
                osc1.stop(now + offset + 0.13);

                // Secondary harmonic punch (sine)
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.type = 'sawtooth';
                osc2.frequency.setValueAtTime(659.25, now + offset);
                osc2.frequency.exponentialRampToValueAtTime(440.00, now + offset + 0.10);
                gain2.gain.setValueAtTime(vol * 0.6, now + offset);
                gain2.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                osc2.start(now + offset);
                osc2.stop(now + offset + 0.13);
            });
        } else if (type === 'high' || type === 'warning') {
            // Loud 3-note ascending chime: C5 (523Hz) -> G5 (784Hz) -> C6 (1046Hz) -> E6 (1318Hz)
            const notes = [523.25, 783.99, 1046.50, 1318.51];
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.075);
                gain.gain.setValueAtTime(vol * (1.1 + idx * 0.25), now + idx * 0.075);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.075 + 0.22);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.075);
                osc.stop(now + idx * 0.075 + 0.23);
            });
        } else {
            // Loud crisp radar sonar blip: 880Hz -> 1320Hz with rich resonance
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(1450, now + 0.11);
            gain.gain.setValueAtTime(vol * 1.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.23);
        }
    } catch (e) {
        // AudioContext restricted before user gesture
    }
}

async function fetchLiveAlerts() {
    if (!window.IS_LIVE_STREAM_ACTIVE) return;
    const startTime = performance.now();
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2800);
        let res = await fetch('/api/alerts', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const data = await res.json();
            const alertsList = Array.isArray(data) ? data : (data.data || []);
            
            // Check for new critical anomaly
            if (alertsList.length > window.LAST_KNOWN_ALERT_COUNT && window.LAST_KNOWN_ALERT_COUNT > 0) {
                const latest = alertsList[0];
                if (latest && latest.severity === 'CRITICAL') {
                    playAlertChime('critical');
                } else {
                    playAlertChime('normal');
                }
            }
            window.LAST_KNOWN_ALERT_COUNT = alertsList.length;
            window.ALL_LIVE_ALERTS = alertsList;

            // Measure latency
            const latency = Math.round(performance.now() - startTime);
            const latencyEl = document.getElementById('supabaseLatencyText');
            if (latencyEl) latencyEl.innerText = `${latency}ms (Online)`;

            const syncEl = document.getElementById('lastAlertSyncTime');
            if (syncEl) syncEl.innerText = new Date().toLocaleTimeString('en-GB');

            updateAlertsDashboardUI();
        }
    } catch (e) {
        // Silently ignore temporary fetch aborts/restarts during dev reloading
    }
}

function getFilteredAlertsList() {
    const rawAlerts = window.ALL_LIVE_ALERTS || [];
    return rawAlerts.filter(a => {
        // Area Filter
        if (window.CURRENT_ALERT_AREA_FILTER && window.CURRENT_ALERT_AREA_FILTER !== 'all') {
            const areaKey = window.CURRENT_ALERT_AREA_FILTER.toLowerCase();
            const loc = (a.location || '').toLowerCase();
            const desc = (a.description || '').toLowerCase();
            if (!loc.includes(areaKey) && !desc.includes(areaKey)) {
                return false;
            }
        }

        // Severity Filter
        if (window.CURRENT_ALERT_SEVERITY_FILTER && window.CURRENT_ALERT_SEVERITY_FILTER !== 'ALL') {
            const sev = (a.severity || '').toUpperCase().trim();
            if (window.CURRENT_ALERT_SEVERITY_FILTER === 'CRITICAL' && !sev.includes('CRIT')) return false;
            if (window.CURRENT_ALERT_SEVERITY_FILTER === 'HIGH' && (!sev.includes('HIGH') || sev.includes('CRIT'))) return false;
            if (window.CURRENT_ALERT_SEVERITY_FILTER === 'WARNING' && !sev.includes('WARN')) return false;
        }

        // Status Filter
        if (window.CURRENT_ALERT_STATUS_FILTER && window.CURRENT_ALERT_STATUS_FILTER !== 'ALL') {
            const stat = (a.status || '').toUpperCase().trim();
            if (window.CURRENT_ALERT_STATUS_FILTER === 'ACTIVE' && !stat.includes('ACT')) return false;
            if (window.CURRENT_ALERT_STATUS_FILTER === 'ACKNOWLEDGED' && !stat.includes('ACK')) return false;
            if (window.CURRENT_ALERT_STATUS_FILTER === 'RESOLVED' && !stat.includes('RESOLV')) return false;
        }

        // Search Query Filter
        if (window.CURRENT_ALERT_SEARCH_QUERY) {
            const q = window.CURRENT_ALERT_SEARCH_QUERY.toLowerCase();
            const vNo = (a.vehicle_no || '').toLowerCase();
            const loc = (a.location || '').toLowerCase();
            const desc = (a.description || '').toLowerCase();
            const aType = (a.alert_type || '').toLowerCase();
            const idStr = String(a.id || '');
            if (!vNo.includes(q) && !loc.includes(q) && !desc.includes(q) && !aType.includes(q) && !idStr.includes(q)) {
                return false;
            }
        }

        return true;
    });
}

function updateAlertsDashboardUI() {
    const allAlerts = window.ALL_LIVE_ALERTS || [];
    const filteredAlerts = getFilteredAlertsList();
    const activeAlerts = allAlerts.filter(a => a.status === 'ACTIVE');
    const totalActive = activeAlerts.length;
    const criticalActive = activeAlerts.filter(a => a.severity === 'CRITICAL').length;
    const highActive = activeAlerts.filter(a => a.severity === 'HIGH').length;
    const warningActive = activeAlerts.filter(a => a.severity === 'WARNING').length;

    // Update global header badge
    const badgeEl = document.getElementById('headerBadgeCount');
    if (badgeEl) badgeEl.innerText = totalActive;

    // Update Threat Level Banner
    const threatBadge = document.getElementById('threatLevelBadge');
    const threatText = document.getElementById('threatLevelText');
    if (threatBadge && threatText) {
        if (criticalActive > 0) {
            threatBadge.style.background = 'rgba(239, 68, 68, 0.2)';
            threatBadge.style.borderColor = 'rgba(239, 68, 68, 0.6)';
            threatBadge.style.color = '#f87171';
            threatText.innerHTML = `DEFCON 1 • ${criticalActive} CRITICAL ANOMALIES ACTIVE`;
        } else if (totalActive > 0) {
            threatBadge.style.background = 'rgba(245, 158, 11, 0.2)';
            threatBadge.style.borderColor = 'rgba(245, 158, 11, 0.6)';
            threatBadge.style.color = '#fbbf24';
            threatText.innerHTML = `DEFCON 2 • ${totalActive} SURVEILLANCE ANOMALIES ACTIVE`;
        } else {
            threatBadge.style.background = 'rgba(16, 185, 129, 0.2)';
            threatBadge.style.borderColor = 'rgba(16, 185, 129, 0.6)';
            threatBadge.style.color = '#34d399';
            threatText.innerHTML = `DEFCON 3 • ALL 14 CORRIDORS SECURE`;
        }
    }

    // Update Live Ticker
    const tickerEl = document.getElementById('liveAlertTickerText');
    if (tickerEl && allAlerts.length > 0) {
        const latest = allAlerts[0];
        tickerEl.innerHTML = `<strong>#ALT-${latest.id} [${latest.severity}]</strong>: ${latest.alert_type} (${latest.vehicle_no || 'Unassigned'}) @ ${latest.location} — ${latest.description}`;
    }

    // Update Filter Chip Counts
    const bAll = document.getElementById('chipBadgeAll');
    const bCrit = document.getElementById('chipBadgeCritical');
    const bHigh = document.getElementById('chipBadgeHigh');
    const bWarn = document.getElementById('chipBadgeWarning');
    if (bAll) bAll.innerText = allAlerts.length;
    if (bCrit) bCrit.innerText = criticalActive;
    if (bHigh) bHigh.innerText = highActive;
    if (bWarn) bWarn.innerText = warningActive;

    // Update all overview metric cards based on active triage filter
    const allCards = document.querySelectorAll('#alertOverviewContainer .metric-card, #alertDetailContainer .metric-card, .va-sidebar-cards-list .mini-card');
    allCards.forEach(card => {
        const typeStr = card.getAttribute('data-card-type') || card.getAttribute('data-va-type') || card.getAttribute('data-alert-cat') || card.querySelector('.metric-label')?.textContent?.trim() || '';
        
        // Match active count considering current triage filter & area filter
        const matchedActive = filteredAlerts.filter(a => {
            if (window.CURRENT_ALERT_STATUS_FILTER === 'ALL' && a.status !== 'ACTIVE') return false;
            return matchCategory(typeStr, a);
        }).length;

        const numEl = card.querySelector('.metric-number');
        const iconEl = card.querySelector('.metric-icon-circle');

        if (numEl) numEl.textContent = matchedActive;

        if (matchedActive > 0) {
            const hasCritical = filteredAlerts.some(a => a.severity === 'CRITICAL' && matchCategory(typeStr, a));
            const hasHigh = filteredAlerts.some(a => a.severity === 'HIGH' && matchCategory(typeStr, a));
            const isTeal = typeStr.toLowerCase().includes('vehicle') || typeStr.toLowerCase().includes('crowd') || typeStr.toLowerCase().includes('traffic') || typeStr.toLowerCase().includes('illumination');
            
            const highlightClass = hasCritical ? 'card-highlight-red' : (hasHigh ? 'card-highlight-orange' : 'card-highlight-teal');
            const textHighlight = hasCritical ? 'highlight-orange-text' : (hasHigh ? 'highlight-orange-text' : 'highlight-teal-text');
            const iconHighlight = hasCritical ? 'highlight-orange-icon' : (hasHigh ? 'highlight-orange-icon' : 'highlight-teal-icon');

            card.classList.remove('card-highlight-orange', 'card-highlight-teal', 'card-highlight-red', 'dark-card');
            card.classList.add(highlightClass);
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            if (numEl) numEl.className = `metric-number ${textHighlight}`;
            if (iconEl) iconEl.className = `metric-icon-circle ${iconHighlight}`;
        } else {
            card.classList.remove('card-highlight-orange', 'card-highlight-teal', 'card-highlight-red', 'active-card');
            card.classList.add('dark-card');
            if (window.CURRENT_ALERT_SEVERITY_FILTER !== 'ALL' || window.CURRENT_ALERT_STATUS_FILTER !== 'ALL') {
                card.style.opacity = '0.35';
                card.style.transform = 'scale(0.98)';
            } else {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }
            if (numEl) numEl.className = 'metric-number';
            if (iconEl) iconEl.className = 'metric-icon-circle';
        }
    });

    // Update GPS live text banner
    const gpsLiveEl = document.getElementById('gpsLiveCountText');
    if (gpsLiveEl) {
        const gpsActiveCount = filteredAlerts.filter(a => ['stoppage', 'off_route', 'off_area', 'tamper', 'over_speed', 'boom_barrier'].includes(getAlertCategoryKey(a))).length;
        gpsLiveEl.textContent = gpsActiveCount > 0 ? `• ${gpsActiveCount} ACTIVE` : '• 0 ACTIVE';
        gpsLiveEl.className = gpsActiveCount > 0 ? 'events-status-text red-live-text' : 'events-status-text';
    }

    const vaStatusEl = document.getElementById('vaSectionStatusText') || document.getElementById('vaSidebarStatusText');
    if (vaStatusEl) {
        const vaActiveCount = activeAlerts.filter(a => !['stoppage', 'off_route', 'off_area', 'tamper', 'over_speed', 'boom_barrier'].includes(getAlertCategoryKey(a))).length;
        vaStatusEl.textContent = vaActiveCount > 0 ? `• ${vaActiveCount} EVENTS` : '• NO EVENTS';
    }

    // Update sidebar badges
    const sideCardCount = document.getElementById('sidebarLiveCardCount');
    const sideThreatText = document.getElementById('sidebarLiveThreatText');
    if (sideCardCount) sideCardCount.innerText = `${totalActive} Anomalies Active`;
    if (sideThreatText) sideThreatText.innerText = criticalActive > 0 ? `• DEFCON 1 (${criticalActive} Critical)` : `• ${totalActive} Active`;

    // Re-render detail view if open
    const detailContainer = document.getElementById('alertDetailContainer');
    if (detailContainer && detailContainer.style.display !== 'none') {
        renderDetailEventsForCategory(window.CURRENT_ALERT_CATEGORY || 'All Types');
    }
}

function renderDetailEventsForCategory(type) {
    const isAll = (type === 'All Types' || !type);
    const pool = getFilteredAlertsList();
    const matched = isAll ? pool : pool.filter(a => matchCategory(type, a));
    const activeCount = matched.filter(a => a.status === 'ACTIVE').length;

    // Set Icon & Header Title
    const detailIcon = document.getElementById('detailIcon');
    const detailTitle = document.getElementById('detailTitle');
    const detailSubtitleText = document.getElementById('detailSubtitleText');
    const detailEventsBody = document.getElementById('detailEventsBody');

    let iconClass = 'fa-solid fa-triangle-exclamation detail-icon-orange';
    let subTag = '(Vehicle & Corridor Alerts)';
    let titleText = type || 'All Types';

    if (window.CURRENT_ALERT_SEVERITY_FILTER === 'CRITICAL') {
        iconClass = 'fa-solid fa-circle-radiation detail-icon-orange';
        titleText = (type && type !== 'All Types') ? `${type} (Critical)` : 'Critical Incidents';
        subTag = '(Priority Intervention Required)';
    } else if (window.CURRENT_ALERT_SEVERITY_FILTER === 'HIGH') {
        iconClass = 'fa-solid fa-triangle-exclamation detail-icon-orange';
        titleText = (type && type !== 'All Types') ? `${type} (High Priority)` : 'High Priority Alerts';
        subTag = '(Vigilance Inspection)';
    } else if (window.CURRENT_ALERT_SEVERITY_FILTER === 'WARNING') {
        iconClass = 'fa-solid fa-circle-exclamation detail-icon-teal';
        titleText = (type && type !== 'All Types') ? `${type} (Warnings)` : 'Warnings & Sensory Variances';
        subTag = '(Edge AI Anomaly Filter)';
    } else if (window.CURRENT_ALERT_STATUS_FILTER === 'ACTIVE') {
        iconClass = 'fa-solid fa-bolt detail-icon-teal';
        titleText = (type && type !== 'All Types') ? `${type} (Active)` : 'Active Unresolved Incidents';
        subTag = '(Real-time Live Stream)';
    } else if (window.CURRENT_ALERT_STATUS_FILTER === 'ACKNOWLEDGED') {
        iconClass = 'fa-solid fa-check-double detail-icon-teal';
        titleText = (type && type !== 'All Types') ? `${type} (Acknowledged)` : 'Acknowledged Incidents';
        subTag = '(Under Investigation)';
    } else if (window.CURRENT_ALERT_STATUS_FILTER === 'RESOLVED') {
        iconClass = 'fa-solid fa-shield-check detail-icon-teal';
        titleText = (type && type !== 'All Types') ? `${type} (Resolved)` : 'Resolved Incidents';
        subTag = '(Historical Archive)';
    } else {
        const lower = (type || '').toLowerCase();
        if (lower.includes('vehicle')) { iconClass = 'fa-solid fa-car detail-icon-teal'; subTag = '(Camera Feeds)'; }
        else if (lower.includes('route')) { iconClass = 'fa-solid fa-route detail-icon-orange'; subTag = '(GPS Corridor)'; }
        else if (lower.includes('speed')) { iconClass = 'fa-solid fa-gauge-high detail-icon-orange'; subTag = '(Speed Radar)'; }
        else if (lower.includes('tamper')) { iconClass = 'fa-solid fa-shield-virus detail-icon-orange'; subTag = '(Hardware Sensor)'; }
        else if (lower.includes('boom')) { iconClass = 'fa-solid fa-traffic-light detail-icon-orange'; subTag = '(Gate Barrier)'; }
        else if (lower.includes('crowd')) { iconClass = 'fa-solid fa-users detail-icon-teal'; subTag = '(AI Crowd Analysis)'; }
        else if (lower.includes('person')) { iconClass = 'fa-solid fa-user detail-icon-teal'; subTag = '(Perimeter Human Detection)'; }
        else if (lower.includes('intrusion')) { iconClass = 'fa-solid fa-shield-halved detail-icon-teal'; subTag = '(Security Boundary)'; }
        else if (lower.includes('traffic')) { iconClass = 'fa-solid fa-traffic-light detail-icon-teal'; subTag = '(Congestion Monitor)'; }
        else if (lower.includes('load') || lower.includes('unload')) { iconClass = 'fa-solid fa-truck-ramp-box detail-icon-teal'; subTag = '(Tare & Gross Variance)'; }
        else if (lower.includes('hazard')) { iconClass = 'fa-solid fa-triangle-exclamation detail-icon-orange'; subTag = '(Safety Compliance)'; }
        else if (lower.includes('illumination')) { iconClass = 'fa-solid fa-lightbulb detail-icon-teal'; subTag = '(Photometric Lux)'; }
    }

    if (detailIcon) detailIcon.className = iconClass;
    if (detailTitle) detailTitle.innerHTML = `${titleText} <span class="detail-tag" style="color: #f59e0b;">${subTag}</span>`;

    if (detailSubtitleText) {
        detailSubtitleText.textContent = `• SHOWING ${matched.length} EVENTS (${activeCount} ACTIVE)`;
    }

    if (detailEventsBody) {
        if (matched.length === 0) {
            detailEventsBody.innerHTML = `
                <div style="background: rgba(15, 23, 42, 0.6); border: 1px dashed #334155; border-radius: 8px; padding: 36px; text-align: center;">
                    <i class="fa-solid fa-shield-check" style="font-size: 32px; color: #10b981; margin-bottom: 10px; display: inline-block;"></i>
                    <h4 style="font-size: 14px; color: #f8fafc; margin: 0 0 6px 0; font-weight: 700;">No Alerts Match Active Filters</h4>
                    <p style="font-size: 12px; color: #94a3b8; margin: 0;">All vehicles and corridors in this category are operating within nominal parameters.</p>
                </div>
            `;
        } else {
            detailEventsBody.innerHTML = matched.map(a => {
                const isResolved = a.status === 'RESOLVED';
                const isAcked = a.status === 'ACKNOWLEDGED';
                const isCritical = a.severity === 'CRITICAL';
                const badgeBg = isCritical ? '#dc2626' : (a.severity === 'HIGH' ? '#d97706' : '#0284c7');
                const cardBorder = isResolved ? '#1e293b' : (isAcked ? '#0284c7' : (isCritical ? 'rgba(239, 68, 68, 0.6)' : 'rgba(245, 158, 11, 0.5)'));
                const statusColor = isResolved ? '#10b981' : (isAcked ? '#38bdf8' : '#ef4444');

                return `
                    <div class="event-row-card" style="background: #0f172a; border: 1px solid ${cardBorder}; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.3); transition: all 0.15s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 3px; background: ${badgeBg}; color: #fff; letter-spacing: 0.04em;">${a.severity}</span>
                                <strong style="font-size: 13.5px; color: #f8fafc; font-weight: 700;">${a.alert_type}</strong>
                                <span style="font-size: 11px; color: #64748b; font-family: monospace;">#ALT-${a.id}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="font-size: 11px; font-weight: 800; color: ${statusColor}; letter-spacing: 0.03em;">
                                    ${isResolved ? '<i class="fa-solid fa-shield-check"></i> RESOLVED' : (isAcked ? '<i class="fa-solid fa-check"></i> ACKNOWLEDGED' : '<span class="live-dot" style="display:inline-block; margin-right:4px;"></span> ACTIVE')}
                                </span>
                                <span style="font-size: 11.5px; color: #94a3b8;"><i class="fa-regular fa-clock" style="margin-right: 4px;"></i>${a.created_at ? new Date(a.created_at).toLocaleTimeString() : 'Live Telemetry'}</span>
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #cbd5e1; background: rgba(0,0,0,0.35); padding: 8px 12px; border-radius: 6px; flex-wrap: wrap; gap: 8px;">
                            <span><i class="fa-solid fa-truck" style="color: #38bdf8; margin-right: 6px;"></i>Vehicle: <strong style="color: #f8fafc; font-family: monospace;">${a.vehicle_no || 'JH01-AX-9912'}</strong></span>
                            <span><i class="fa-solid fa-location-dot" style="color: #f59e0b; margin-right: 6px;"></i>${a.location || 'Mining Haul Corridor'}</span>
                            <span>AI Confidence: <strong style="color: #34d399;">${a.confidence_score || 96.5}%</strong></span>
                        </div>

                        <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
                            ${a.description || 'Surveillance anomaly identified by Edge Vision model. Immediate vigilance inspection recommended.'}
                        </p>

                        <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center; margin-top: 4px; flex-wrap: wrap;">
                            <button type="button" onclick="openIncidentInspectModal(${a.id})" class="btn-action" style="padding: 5px 12px; font-size: 11.5px; background: #1e293b; color: #38bdf8; border: 1px solid #334155; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                                <i class="fa-solid fa-crosshairs"></i> Inspect Forensics & Feed
                            </button>

                            <div style="display: flex; gap: 8px;">
                                <button type="button" onclick="dispatchQrtPatrol(${a.id}, '${a.vehicle_no || 'Vehicle'}', '${a.location || 'Location'}')" class="btn-action" style="padding: 5px 10px; font-size: 11px; background: rgba(220, 38, 38, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                                    <i class="fa-solid fa-car-on"></i> Dispatch QRT
                                </button>
                                <button type="button" onclick="triggerGateHold(${a.id}, '${a.vehicle_no || 'Vehicle'}', '${a.location || 'Location'}')" class="btn-action" style="padding: 5px 10px; font-size: 11px; background: rgba(217, 119, 6, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                                    <i class="fa-solid fa-hand"></i> Gate Hold
                                </button>
                                ${!isResolved && !isAcked ? `
                                    <button type="button" onclick="acknowledgeLiveAlert(${a.id})" class="btn-action" style="padding: 5px 12px; font-size: 11px; background: #1e293b; color: #38bdf8; border: 1px solid #334155; border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                                        <i class="fa-solid fa-check"></i> Acknowledge
                                    </button>
                                ` : ''}
                                ${!isResolved ? `
                                    <button type="button" onclick="resolveLiveAlert(${a.id})" class="btn-action" style="padding: 5px 12px; font-size: 11px; background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 5px; cursor: pointer; display: flex; align-items: center; gap: 5px; font-weight: 600;">
                                        <i class="fa-solid fa-shield-check"></i> Resolve Incident
                                    </button>
                                ` : `
                                    <span style="font-size: 11px; color: #10b981; font-weight: 700; padding: 4px 8px; background: rgba(16, 185, 129, 0.1); border-radius: 4px;"><i class="fa-solid fa-circle-check"></i> Incident Recorded</span>
                                `}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// Interactive Category, Triage & Filter Handlers
window.setAlertDetectionType = function(type) {
    window.CURRENT_ALERT_CATEGORY = type;
    const overviewCon = document.getElementById('alertOverviewContainer');
    const detailCon = document.getElementById('alertDetailContainer');
    const detectionSelect = document.getElementById('detectionTypeSelect');
    if (detectionSelect && type) detectionSelect.value = type;

    if (type === 'All Types' || !type) {
        window.CURRENT_ALERT_CATEGORY = 'All Types';
        window.CURRENT_ALERT_SEVERITY_FILTER = 'ALL';
        window.CURRENT_ALERT_STATUS_FILTER = 'ALL';
        document.querySelectorAll('.alert-triage-bar .chip-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('chipFilterAll')?.classList.add('active');
        if (overviewCon) overviewCon.style.display = 'block';
        if (detailCon) detailCon.style.display = 'none';
        updateAlertsDashboardUI();
        return;
    }

    if (overviewCon) overviewCon.style.display = 'none';
    if (detailCon) detailCon.style.display = 'block';
    renderDetailEventsForCategory(type);
    updateAlertsDashboardUI();
};

window.setSeverityFilter = function(sev) {
    window.CURRENT_ALERT_SEVERITY_FILTER = sev;
    window.CURRENT_ALERT_STATUS_FILTER = 'ALL';
    document.querySelectorAll('.alert-triage-bar .chip-btn').forEach(btn => btn.classList.remove('active'));
    
    const overviewCon = document.getElementById('alertOverviewContainer');
    const detailCon = document.getElementById('alertDetailContainer');

    if (sev === 'ALL') {
        document.getElementById('chipFilterAll')?.classList.add('active');
        window.CURRENT_ALERT_CATEGORY = 'All Types';
        if (overviewCon) overviewCon.style.display = 'block';
        if (detailCon) detailCon.style.display = 'none';
    } else {
        if (sev === 'CRITICAL') document.getElementById('chipFilterCritical')?.classList.add('active');
        else if (sev === 'HIGH') document.getElementById('chipFilterHigh')?.classList.add('active');
        else if (sev === 'WARNING') document.getElementById('chipFilterWarning')?.classList.add('active');
        
        if (overviewCon) overviewCon.style.display = 'none';
        if (detailCon) detailCon.style.display = 'block';
    }
    renderDetailEventsForCategory(window.CURRENT_ALERT_CATEGORY || 'All Types');
    updateAlertsDashboardUI();
};

window.setStatusFilter = function(st) {
    window.CURRENT_ALERT_STATUS_FILTER = st;
    window.CURRENT_ALERT_SEVERITY_FILTER = 'ALL';
    document.querySelectorAll('.alert-triage-bar .chip-btn').forEach(btn => btn.classList.remove('active'));
    
    const overviewCon = document.getElementById('alertOverviewContainer');
    const detailCon = document.getElementById('alertDetailContainer');

    if (st === 'ACTIVE') document.getElementById('chipFilterActiveOnly')?.classList.add('active');
    else if (st === 'ACKNOWLEDGED') document.getElementById('chipFilterAck')?.classList.add('active');
    else if (st === 'RESOLVED') document.getElementById('chipFilterResolved')?.classList.add('active');

    if (overviewCon) overviewCon.style.display = 'none';
    if (detailCon) detailCon.style.display = 'block';

    renderDetailEventsForCategory(window.CURRENT_ALERT_CATEGORY || 'All Types');
    updateAlertsDashboardUI();
};

window.handleAlertSearch = function(query) {
    window.CURRENT_ALERT_SEARCH_QUERY = (query || '').trim();
    const overviewCon = document.getElementById('alertOverviewContainer');
    const detailCon = document.getElementById('alertDetailContainer');
    if (window.CURRENT_ALERT_SEARCH_QUERY) {
        if (overviewCon) overviewCon.style.display = 'none';
        if (detailCon) detailCon.style.display = 'block';
    }
    renderDetailEventsForCategory(window.CURRENT_ALERT_CATEGORY || 'All Types');
    updateAlertsDashboardUI();
};

// Operator Quick Actions
window.dispatchQrtPatrol = function(alertId, vehicleNo, location) {
    playAlertChime('test');
    showAuditToast(`🚔 QRT Patrol Unit Dispatched to intercept ${vehicleNo} at ${location}`);
};

window.triggerGateHold = function(alertId, vehicleNo, location) {
    playAlertChime('test');
    showAuditToast(`🛑 Siding Checkpost Boom Barrier LOCKED for vehicle ${vehicleNo}`);
};

// Incident Forensics Modal Logic
window.openIncidentInspectModal = function(alertId) {
    const alert = (window.ALL_LIVE_ALERTS || []).find(a => a.id === alertId) || {
        id: alertId,
        alert_type: 'Unauthorized Stoppage',
        vehicle_no: 'JH01-AX-9912',
        location: 'Amrapali Siding WB-02',
        severity: 'CRITICAL',
        status: 'ACTIVE',
        confidence_score: 97.4,
        description: 'Vehicle stationary in unapproved transit sector > 18 mins with active coal payload.'
    };

    window.ACTIVE_MODAL_INCIDENT = alert;

    // Populate modal fields
    const modal = document.getElementById('incidentInspectModal');
    if (!modal) return;

    document.getElementById('modalIncidentTitle').innerText = `INCIDENT FORENSICS #ALT-${alert.id}`;
    const sevBadge = document.getElementById('modalIncidentSeverityBadge');
    if (sevBadge) {
        sevBadge.innerText = alert.severity;
        sevBadge.style.background = alert.severity === 'CRITICAL' ? '#dc2626' : (alert.severity === 'HIGH' ? '#d97706' : '#0284c7');
    }

    document.getElementById('modalIncidentSummaryType').innerText = alert.alert_type;
    document.getElementById('modalIncidentDescText').innerText = alert.description || '';
    document.getElementById('modalIncidentConfText').innerText = `${alert.confidence_score || 96.8}%`;
    document.getElementById('modalIncidentVehicle').innerText = alert.vehicle_no || 'JH01-AX-9912';
    document.getElementById('modalIncidentLocation').innerText = alert.location || 'Mining Route';
    document.getElementById('modalIncidentTime').innerText = alert.created_at ? new Date(alert.created_at).toLocaleString('en-GB') : '2026-08-24 21:18:40';

    // Cycle through real screenshots based on ID
    const stills = ['/static/media_screenshots/SS-1.png', '/static/media_screenshots/SS-2.png', '/static/media_screenshots/SS-3.png', '/static/media_screenshots/SS-4.png', '/static/media_screenshots/SS-5.png', '/static/media_screenshots/SS-6.png'];
    const chosenStill = stills[alert.id % stills.length];
    document.getElementById('modalIncidentStillImg').src = chosenStill;

    modal.style.display = 'flex';
};

window.closeIncidentModalDirect = function() {
    const modal = document.getElementById('incidentInspectModal');
    if (modal) modal.style.display = 'none';
};

window.closeIncidentModal = function(e) {
    if (e.target.id === 'incidentInspectModal') {
        closeIncidentModalDirect();
    }
};

window.executeGateHoldModal = function() {
    if (window.ACTIVE_MODAL_INCIDENT) {
        triggerGateHold(window.ACTIVE_MODAL_INCIDENT.id, window.ACTIVE_MODAL_INCIDENT.vehicle_no, window.ACTIVE_MODAL_INCIDENT.location);
    }
};

window.executeQrtDispatchModal = function() {
    if (window.ACTIVE_MODAL_INCIDENT) {
        dispatchQrtPatrol(window.ACTIVE_MODAL_INCIDENT.id, window.ACTIVE_MODAL_INCIDENT.vehicle_no, window.ACTIVE_MODAL_INCIDENT.location);
    }
};

window.executeResolveModal = function() {
    if (window.ACTIVE_MODAL_INCIDENT) {
        resolveLiveAlert(window.ACTIVE_MODAL_INCIDENT.id);
        closeIncidentModalDirect();
    }
};

window.printIncidentReport = function() {
    window.print();
};

window.acknowledgeAllInCategory = async function() {
    const pool = getFilteredAlertsList();
    const activeInCategory = pool.filter(a => a.status === 'ACTIVE');
    if (activeInCategory.length === 0) {
        showAuditToast('No active alerts to acknowledge in this category.');
        return;
    }

    showAuditToast(`✓ Batch Acknowledged ${activeInCategory.length} Surveillance Alerts`);
    for (const a of activeInCategory) {
        a.status = 'ACKNOWLEDGED';
        fetch(`/api/alerts/${a.id}/acknowledge`, { method: 'POST' }).catch(() => {});
    }
    updateAlertsDashboardUI();
};

window.clearResolvedAlerts = function() {
    const resolved = (window.ALL_LIVE_ALERTS || []).filter(a => a.status === 'RESOLVED');
    if (resolved.length === 0) {
        showAuditToast('No resolved alerts in archive to dismiss.');
        return;
    }
    window.ALL_LIVE_ALERTS = (window.ALL_LIVE_ALERTS || []).filter(a => a.status !== 'RESOLVED');
    showAuditToast(`🗑️ Dismissed ${resolved.length} resolved alerts from view`);
    updateAlertsDashboardUI();
};

window.exportAlertsCsv = function() {
    const list = getFilteredAlertsList();
    if (!list || list.length === 0) {
        showAuditToast('No alerts matching current filters to export.');
        return;
    }

    const headers = ["Alert ID", "Severity", "Alert Type", "Status", "Vehicle No", "Location", "AI Confidence", "Description", "Timestamp"];
    const escapeCsv = (s) => `"${String(s || '').replace(/"/g, '""')}"`;

    let csv = "data:text/csv;charset=utf-8," + headers.map(escapeCsv).join(",") + "\n";
    list.forEach(a => {
        csv += [a.id, a.severity, a.alert_type, a.status, a.vehicle_no, a.location, (a.confidence_score || 95) + '%', a.description, a.created_at || 'Live'].map(escapeCsv).join(",") + "\n";
    });

    const uri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", `TRACE_Surveillance_Alerts_Log_${list.length}_events.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showAuditToast(`Exported ${list.length} surveillance alerts to CSV.`);
};

async function acknowledgeLiveAlert(alertId) {
    try {
        let res = await fetch(`/api/alerts/${alertId}/acknowledge`, { method: 'POST' });
        const alert = (window.ALL_LIVE_ALERTS || []).find(a => a.id === alertId);
        if (alert) alert.status = 'ACKNOWLEDGED';
        showAuditToast(`✓ Alert #ALT-${alertId} Acknowledged & Synced with Supabase`);
        updateAlertsDashboardUI();
    } catch (e) {
        console.error(e);
    }
}

async function resolveLiveAlert(alertId) {
    try {
        let res = await fetch(`/api/alerts/${alertId}/resolve`, { method: 'POST' });
        const alert = (window.ALL_LIVE_ALERTS || []).find(a => a.id === alertId);
        if (alert) alert.status = 'RESOLVED';
        showAuditToast(`🛡️ Alert #ALT-${alertId} Resolved in Supabase Cloud`);
        updateAlertsDashboardUI();
    } catch (e) {
        console.error(e);
    }
}

async function triggerSimulateAlert() {
    try {
        let res = await fetch('/api/alerts/simulate', { method: 'POST' });
        if (!res.ok) {
            res = await fetch('https://prahar-ai-dashboard.vercel.app/api/alerts/simulate', { method: 'POST' });
        }
        if (res.ok) {
            const data = await res.json();
            const alert = data.created_alert || {};
            const alertName = alert.alert_type || 'Surveillance Anomaly';
            const sev = (alert.severity || 'HIGH').toLowerCase();
            showAuditToast(`🚨 New Live Anomaly Injected: ${alertName} (${alert.vehicle_no || 'Vehicle'} @ ${alert.location || 'Corridor'})`);
            playAlertChime(sev === 'critical' ? 'critical' : (sev === 'high' ? 'high' : 'normal'));
            await fetchLiveAlerts();
        }
    } catch (e) {
        console.error('Simulate anomaly error:', e);
    }
}

// -------------------------------------------------------------
// Auto Anomaly Generation Engine (Pitched on Demand)
// -------------------------------------------------------------
window.IS_AUTO_ANOMALY_ACTIVE = false; // PAUSED by default so user is not interrupted
window.AUTO_ANOMALY_TIMER = null;
window.AUTO_ANOMALY_COUNTDOWN = 12;

function startAutoAnomalyLoop() {
    if (window.AUTO_ANOMALY_TIMER) clearInterval(window.AUTO_ANOMALY_TIMER);
    window.AUTO_ANOMALY_COUNTDOWN = Math.floor(Math.random() * 6) + 10; // 10 to 15 seconds
    updateAutoSimUI();

    window.AUTO_ANOMALY_TIMER = setInterval(async () => {
        if (!window.IS_AUTO_ANOMALY_ACTIVE) return;
        
        window.AUTO_ANOMALY_COUNTDOWN--;
        updateAutoSimUI();
        
        if (window.AUTO_ANOMALY_COUNTDOWN <= 0) {
            window.AUTO_ANOMALY_COUNTDOWN = Math.floor(Math.random() * 6) + 10; // Reset to 10-15s
            await triggerSimulateAlert();
            updateAutoSimUI();
        }
    }, 1000);
}

function toggleAutoSimulateAlerts() {
    window.IS_AUTO_ANOMALY_ACTIVE = !window.IS_AUTO_ANOMALY_ACTIVE;
    if (window.IS_AUTO_ANOMALY_ACTIVE) {
        startAutoAnomalyLoop();
        showAuditToast('⚡ Live Anomaly Pitch Stream ENABLED (Generating every 10-15s with Sound Ping)');
        playAlertChime('high');
    } else {
        if (window.AUTO_ANOMALY_TIMER) clearInterval(window.AUTO_ANOMALY_TIMER);
        showAuditToast('⏸ Anomaly Stream PAUSED');
    }
    updateAutoSimUI();
}

function updateAutoSimUI() {
    const pill = document.getElementById('btnToggleAutoSim');
    const pillText = document.getElementById('autoSimPillText');
    const consoleBtn = document.getElementById('btnConsoleToggleAuto');
    const countdownBadge = document.getElementById('autoSimCountdownBadge');

    if (window.IS_AUTO_ANOMALY_ACTIVE) {
        if (pill) {
            pill.style.background = 'rgba(56, 189, 248, 0.15)';
            pill.style.borderColor = 'rgba(56, 189, 248, 0.5)';
            pill.style.color = '#38bdf8';
        }
        if (pillText) pillText.innerHTML = `<i class="fa-solid fa-bolt" style="color:#38bdf8;"></i> AUTO-ALERTS: ON (${window.AUTO_ANOMALY_COUNTDOWN}s)`;
        if (consoleBtn) {
            consoleBtn.style.background = '#0284c7';
        }
        if (countdownBadge) countdownBadge.innerText = `ON (${window.AUTO_ANOMALY_COUNTDOWN}s)`;
    } else {
        if (pill) {
            pill.style.background = 'rgba(100, 116, 139, 0.15)';
            pill.style.borderColor = 'rgba(100, 116, 139, 0.3)';
            pill.style.color = '#94a3b8';
        }
        if (pillText) pillText.innerHTML = `<i class="fa-solid fa-pause"></i> ALERTS: PAUSED (Click for Pitch)`;
        if (consoleBtn) {
            consoleBtn.style.background = '#334155';
        }
        if (countdownBadge) countdownBadge.innerText = 'OFF';
    }
}

async function triggerSimulateFleet() {
    try {
        let res = await fetch('/api/vts/simulate-step', { method: 'POST' });
        if (res.ok) {
            showAuditToast('🚚 Telemetry Step Simulated & Updated in Supabase');
        }
    } catch (e) {
        console.error(e);
    }
}

async function syncAllFromSupabase() {
    showAuditToast('🔄 Syncing all surveillance alerts from Supabase PostgreSQL...');
    await fetchLiveAlerts();
}

function toggleDemoConsole() {
    const body = document.getElementById('demoConsoleBody');
    const chevron = document.getElementById('demoConsoleChevron');
    if (body.style.display === 'none') {
        body.style.display = 'flex';
        chevron.className = 'fa-solid fa-chevron-up';
    } else {
        body.style.display = 'none';
        chevron.className = 'fa-solid fa-chevron-down';
    }
}

// Setup Event Listeners for Header Controls
document.addEventListener('DOMContentLoaded', () => {
    // Initialize auto anomaly stream in PAUSED mode by default
    updateAutoSimUI();

    // Live Feed Toggle Button
    const btnToggleLive = document.getElementById('btnToggleLiveFeed');
    const pillText = document.getElementById('liveFeedPillText');
    if (btnToggleLive) {
        btnToggleLive.addEventListener('click', () => {
            window.IS_LIVE_STREAM_ACTIVE = !window.IS_LIVE_STREAM_ACTIVE;
            if (window.IS_LIVE_STREAM_ACTIVE) {
                btnToggleLive.classList.remove('paused');
                if (pillText) pillText.innerHTML = '<i class="fa-solid fa-pause"></i> LIVE STREAM';
                showAuditToast('🟢 Live Surveillance Telemetry Stream Active (3.5s Sync)');
                fetchLiveAlerts();
            } else {
                btnToggleLive.classList.add('paused');
                if (pillText) pillText.innerHTML = '<i class="fa-solid fa-play"></i> PAUSED';
                showAuditToast('⏸ Surveillance Stream Paused for Forensic Audit');
            }
        });
    }

    // Lock View Button
    const btnLock = document.getElementById('btnToggleLockView');
    if (btnLock) {
        btnLock.addEventListener('click', () => {
            window.IS_ALERT_VIEW_LOCKED = !window.IS_ALERT_VIEW_LOCKED;
            btnLock.classList.toggle('active-locked', window.IS_ALERT_VIEW_LOCKED);
            showAuditToast(window.IS_ALERT_VIEW_LOCKED ? '🔒 Alert View Locked (Freeze Mode)' : '🔓 Alert View Unlocked');
        });
    }

    // Volume Slider
    const volSlider = document.getElementById('alertVolumeSlider');
    if (volSlider) {
        volSlider.addEventListener('input', (e) => {
            window.ALERT_AUDIO_VOLUME = parseFloat(e.target.value) / 100;
            window.ALERT_AUDIO_MUTED = (window.ALERT_AUDIO_VOLUME === 0);
            const icon = document.getElementById('volumeIcon');
            if (icon) {
                icon.className = window.ALERT_AUDIO_MUTED ? 'fa-solid fa-volume-xmark' : (window.ALERT_AUDIO_VOLUME > 0.5 ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-low');
            }
            playAlertChime('test');
        });
    }

    // Mute Button
    const btnMute = document.getElementById('btnMuteAlerts');
    if (btnMute) {
        btnMute.addEventListener('click', () => {
            window.ALERT_AUDIO_MUTED = !window.ALERT_AUDIO_MUTED;
            btnMute.classList.toggle('is-muted', window.ALERT_AUDIO_MUTED);
            const icon = document.getElementById('volumeIcon');
            if (icon) {
                icon.className = window.ALERT_AUDIO_MUTED ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
            }
            showAuditToast(window.ALERT_AUDIO_MUTED ? '🔇 Alert Audio Siren Muted' : '🔊 Alert Audio Siren Enabled');
            if (!window.ALERT_AUDIO_MUTED) playAlertChime('test');
        });
    }

    // Area Selector
    const areaSelect = document.getElementById('alertAreaSelect');
    if (areaSelect) {
        areaSelect.addEventListener('change', (e) => {
            window.CURRENT_ALERT_AREA_FILTER = e.target.value;
            const areaName = e.target.options[e.target.selectedIndex].text;
            showAuditToast(`Filter applied: ${areaName}`);
            updateAlertsDashboardUI();
        });
    }
});

// Auto-poll Supabase every 3.5 seconds
setInterval(fetchLiveAlerts, 3500);
setTimeout(fetchLiveAlerts, 100);
setTimeout(() => { if (typeof updateAlertsDashboardUI === 'function') updateAlertsDashboardUI(); }, 50);
setTimeout(() => { if (typeof updateAlertsDashboardUI === 'function') updateAlertsDashboardUI(); }, 300);

// ========================================================
