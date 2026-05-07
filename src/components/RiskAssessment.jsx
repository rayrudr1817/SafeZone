import { getRiskMessage } from '../utils/riskCalculator';

export default function RiskAssessment({ riskLevel, districtName, crimeData }) {
    const borderColor = riskLevel.label === 'High Risk' ? '#ef4444' : riskLevel.label === 'Moderate Risk' ? '#f97316' : '#22c55e';

    return (
        <div className="safe-card" style={{ borderColor }}>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                🛡 Risk Assessment
            </h2>
            <div style={{ color: borderColor, fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', marginBottom: '0.5rem' }}>
                {riskLevel.emoji} {riskLevel.label}
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {getRiskMessage(riskLevel, districtName, crimeData?.totalCrimes || 0)}
            </p>
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Last updated: {new Date().toLocaleString()}
            </div>
        </div>
    );
}