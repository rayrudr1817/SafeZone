import { AlertTriangle } from 'lucide-react';
import { getRiskMessage } from '../utils/riskCalculator';

export default function RiskBanner({ riskLevel, districtName, crimeData }) {
    return (
        <div className={`${riskLevel.color} p-6 rounded-lg shadow-lg`}>
            <div className="flex items-center gap-4">
                <AlertTriangle className="w-8 h-8" />
                <div className="flex-1">
                    <h2 className="text-2xl mb-1">
                        {riskLevel.emoji} {riskLevel.label} - {districtName}
                    </h2>
                    <p className="text-sm opacity-90">
                        {getRiskMessage(riskLevel, districtName, crimeData?.totalCrimes || 0)}
                    </p>
                    {crimeData && (
                        <p className="text-xs opacity-75 mt-2">
                            Data last updated: {crimeData.lastUpdated}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}