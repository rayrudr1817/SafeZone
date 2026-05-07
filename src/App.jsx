import { useState, useEffect } from 'react';
import { Shield, RefreshCw, Moon, Sun, Navigation, MapPin } from 'lucide-react';
import RiskBanner from './components/RiskBanner';
import EmergencyButtons from './components/EmergencyButtons';
import ReportIncident from './components/ReportIncident';
import CrimeStats from './components/CrimeStats';
import CommunityReports from './components/CommunityReports';
import RecentReports from './components/RecentReports';
import PoliceStations from './components/PoliceStations';
import RiskAssessment from './components/RiskAssessment';
import { getPoliceStations, getCrimeData, getDistrictNames, getCrimeTypes, getDistrictFromCoords } from './utils/api';
import { checkRiskLevel } from './utils/riskCalculator';

export default function SafeZoneApp() {
    const [reports, setReports]           = useState([]);
    const [stations, setStations]         = useState([]);
    const [crimeData, setCrimeData]       = useState(null);
    const [loading, setLoading]           = useState(true);
    const [locating, setLocating]         = useState(false);
    const [district, setDistrict]         = useState('Central Delhi');
    const [districtList, setDistrictList] = useState([]);
    const [crimeTypes, setCrimeTypes]     = useState([]);
    const [darkMode, setDarkMode]         = useState(true);

    useEffect(() => { init(); }, []);
    useEffect(() => { loadCrimeData(); }, [district]);
    useEffect(() => {
        localStorage.setItem('safezone-reports', JSON.stringify(reports));
    }, [reports]);

    const init = async () => {
        setLoading(true);
        const saved = localStorage.getItem('safezone-reports');
        if (saved) setReports(JSON.parse(saved));
        const [districts, types, stationList, crime] = await Promise.all([
            getDistrictNames(),
            getCrimeTypes(),
            getPoliceStations(),
            getCrimeData('Central Delhi'),
        ]);
        setDistrictList(districts);
        setCrimeTypes(types);
        setStations(stationList);
        setCrimeData(crime);
        setLoading(false);
    };

    const loadCrimeData = async () => {
        const data = await getCrimeData(district);
        setCrimeData(data);
    };

    const handleRefresh = async () => {
        setLoading(true);
        const [stationList, crime] = await Promise.all([getPoliceStations(), getCrimeData(district)]);
        setStations(stationList);
        setCrimeData(crime);
        setLoading(false);
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) return alert('Geolocation not supported by your browser.');
        setLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const detected = await getDistrictFromCoords(pos.coords.latitude, pos.coords.longitude);
                setDistrict(detected);
                setLocating(false);
            },
            () => {
                alert('Could not get your location. Please allow location access.');
                setLocating(false);
            }
        );
    };

    const riskLevel = checkRiskLevel(crimeData);

    if (loading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, border: '4px solid var(--accent-blue)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: 'var(--text-secondary)', fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>Loading SafeZone Delhi...</p>
        </div>
    );

    return (
        <div className={darkMode ? '' : 'light-mode'} style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '1.5rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <Shield size={36} style={{ color: '#2563eb' }} />
                        <div>
                            <h1 style={{ fontSize: '2rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, lineHeight: 1 }}>SafeZone Delhi</h1>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time Crime Awareness & Safety Platform</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.55rem 0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.82rem' }}>
                            <RefreshCw size={14} /> Refresh
                        </button>
                        <button onClick={() => setDarkMode(d => !d)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.55rem 0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    </div>
                </div>

                <div className="safe-card" style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 5, letterSpacing: '0.05em' }}>
                            SELECT DISTRICT
                        </label>
                        <select
                            className="safe-input"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                        >
                            {districtList.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={handleUseMyLocation}
                        disabled={locating}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: locating ? 'var(--bg-secondary)' : '#2563eb', border: 'none', borderRadius: 8, padding: '0.72rem 1.1rem', color: 'white', cursor: locating ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', opacity: locating ? 0.7 : 1 }}
                    >
                        <Navigation size={15} />
                        {locating ? 'Detecting...' : 'Use My Location'}
                    </button>
                </div>

                <RiskBanner riskLevel={riskLevel} districtName={district} crimeData={crimeData} />

                <EmergencyButtons currentDistrict={district} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <ReportIncident onFormSubmit={r => setReports(prev => [r, ...prev])} crimeTypeList={crimeTypes} districtList={districtList} />
                        <CrimeStats crimeData={crimeData} districtName={district} />
                        <CommunityReports allReports={reports} />
                        <RecentReports allReports={reports} onDeleteReport={id => setReports(prev => prev.filter(r => r.id !== id))} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <PoliceStations stationList={stations} />
                        <RiskAssessment riskLevel={riskLevel} districtName={district} crimeData={crimeData} />
                    </div>
                </div>

            </div>
        </div>
    );
}