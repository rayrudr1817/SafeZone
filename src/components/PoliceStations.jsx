import { MapPin, Phone } from 'lucide-react';

export default function PoliceStations({ stationList }) {
    return (
        <div className="safe-card">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                🚔 Police Stations in Delhi
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {stationList.length} stations · Real data from OpenStreetMap
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: 560, overflowY: 'auto' }}>
                {stationList.map(station => (
                    <div key={station.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.85rem' }}>
                        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem' }}>
                            <MapPin size={16} style={{ color: '#3b82f6', flexShrink: 0, marginTop: 2 }} />
                            <div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{station.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{station.area}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{station.address}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <a href="tel:100" style={{ flex: 1, background: '#2563eb', borderRadius: 6, padding: '0.45rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
                                <Phone size={13} /> Call 100
                            </a>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lon}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#16a34a', borderRadius: 6, padding: '0.45rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
                                <MapPin size={13} /> Navigate
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}