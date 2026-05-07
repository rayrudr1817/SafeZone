import { AlertTriangle } from 'lucide-react';
import { getRiskMessage } from '../utils/riskCalculator';

export default function RiskBanner({ riskLevel, districtName, crimeData }) {
    const colors = {
        'High Risk':     { bg: 'linear-gradient(135deg,#7f1d1d,#991b1b)', border: '#ef4444' },
        'Moderate Risk': { bg: 'linear-gradient(135deg,#7c2d12,#9a3412)', border: '#f97316' },
        'Safe Zone':     { bg: 'linear-gradient(135deg,#14532d,#166534)', border: '#22c55e' },
    };
    const style = colors[riskLevel.label] || colors['Safe Zone'];

    return (
        <div style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: 12, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }}>
            <AlertTriangle style={{ flexShrink: 0, marginTop: 2 }} size={24} />
            <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: 4 }}>
                    {riskLevel.emoji} {riskLevel.label} — {districtName}
                </div>
                <p style={{ fontSize: '0.88rem', opacity: 0.9 }}>
                    {getRiskMessage(riskLevel, districtName, crimeData?.totalCrimes || 0)}
                </p>
                {crimeData && (
                    <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: 6 }}>
                        Last updated: {crimeData.lastUpdated}
                    </p>
                )}
            </div>
        </div>
    );
}