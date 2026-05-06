import { getRiskMessage } from '../utils/riskCalculator';

export default function RiskAssessment({ riskLevel, districtName, crimeData }) {

    const borderColor =
        riskLevel.label === 'High Risk' ? 'border-red-600' :
        riskLevel.label === 'Moderate Risk' ? 'border-orange-600' :
        'border-green-600';

    return (
        <div className={`bg-card border-2 ${borderColor} rounded-lg p-6 shadow-lg`}>
            <h2 className="text-2xl mb-3">Risk Assessment</h2>

            <div className={`${riskLevel.textColor} mb-2 text-lg`}>
                {riskLevel.emoji} {riskLevel.label}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
                {getRiskMessage(riskLevel, districtName, crimeData?.totalCrimes || 0)}
            </p>

            <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    );
}