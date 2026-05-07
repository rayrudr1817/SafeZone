import { Trash2 } from 'lucide-react';

export default function RecentReports({ allReports, onDeleteReport }) {
    return (
        <div className="safe-card">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                📋 Recent Community Reports
            </h2>
            {allReports.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0', fontSize: '0.88rem' }}>
                    No reports yet. Be the first to report an incident.
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: 380, overflowY: 'auto' }}>
                    {allReports.map(report => (
                        <div key={report.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.85rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                                    <span className="badge-red">{report.type}</span>
                                    <span className="badge-blue">{report.area}</span>
                                </div>
                                <p style={{ fontSize: '0.83rem', color: 'var(--text-primary)', marginBottom: 4 }}>{report.description}</p>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{report.date} · {report.time}</span>
                            </div>
                            <button onClick={() => onDeleteReport(report.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', borderRadius: 6, flexShrink: 0 }}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}