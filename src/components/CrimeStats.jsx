export default function CrimeStats({ crimeData, districtName }) {
    if (!crimeData) return null;

    const stats = [
        { label: 'Total Crimes (This Month)', value: crimeData.totalCrimes, color: '#ef4444' },
        { label: 'Theft Cases',               value: crimeData.theft,       color: '#f97316' },
        { label: 'Assault Cases',             value: crimeData.assault,     color: '#a855f7' },
        { label: 'Robbery Cases',             value: crimeData.robbery,     color: '#3b82f6' },
    ];

    return (
        <div className="safe-card">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                📊 Official Crime Statistics — {districtName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' }}>
                {stats.map(s => (
                    <div key={s.label} className="stat-box" style={{ borderLeft: `3px solid ${s.color}` }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color, fontFamily: 'Rajdhani, sans-serif' }}>{s.value}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}