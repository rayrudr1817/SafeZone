export default function CommunityReports({ allReports }) {
    const counts = {
        total:      allReports.length,
        theft:      allReports.filter(r => r.type?.startsWith('Theft')).length,
        harassment: allReports.filter(r => r.type?.startsWith('Harassment')).length,
        assault:    allReports.filter(r => r.type?.startsWith('Assault')).length,
        other:      allReports.filter(r => !['Theft','Harassment','Assault'].some(t => r.type?.startsWith(t))).length,
    };

    const topType = Object.entries(counts)
        .filter(([k]) => k !== 'total')
        .sort(([,a],[,b]) => b - a)[0];

    const boxes = [
        { label: 'User Reports',   value: counts.total,      color: '#3b82f6' },
        { label: 'Theft',          value: counts.theft,      color: '#ef4444' },
        { label: 'Harassment',     value: counts.harassment, color: '#f97316' },
        { label: 'Assault',        value: counts.assault,    color: '#a855f7' },
        { label: 'Other',          value: counts.other,      color: '#64748b' },
    ];

    return (
        <div className="safe-card">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                👥 Community Reports
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
                {boxes.map(b => (
                    <div key={b.label} className="stat-box" style={{ borderLeft: `3px solid ${b.color}` }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: b.color, fontFamily: 'Rajdhani, sans-serif' }}>{b.value}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{b.label}</div>
                    </div>
                ))}
                <div className="stat-box" style={{ borderLeft: '3px solid #22c55e' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>MOST REPORTED</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', color: '#22c55e' }}>
                        {topType ? topType[0].charAt(0).toUpperCase() + topType[0].slice(1) : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
}