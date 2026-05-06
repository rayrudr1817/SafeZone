import { getRiskExplanation } from '../utils/riskCalculator';

export default function RiskAssessment({ risk, selectedDistrict, crimeStats }) {
    return (
        <div className={`bg-card border-2 ${
            risk.level === 'High Risk' ? 'border-red-600' : 
            risk.level === 'Moderate Risk' ? 'border-orange-600' : 'border-green-600'
        } rounded-lg p-6 shadow-lg`}>
            <h2 className="text-2xl mb-3">Risk Assessment</h2>
            <div className={`${risk.textColor} mb-2 text-lg`}>
                {risk.emoji} {risk.level}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {getRiskExplanation(risk, selectedDistrict, crimeStats?.totalCrimes || 0)}
            </p>
            <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    );
}