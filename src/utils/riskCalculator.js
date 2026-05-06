export function checkRiskLevel(crimeData) {

    const currentHour = new Date().getHours();
    const isLateNight = currentHour >= 22 || currentHour <= 5;
    const totalCrimes = crimeData?.totalCrimes || 0;

    if ((isLateNight && totalCrimes >= 280) || totalCrimes >= 320) {
        return {
            label: 'High Risk',
            color: 'bg-red-600',
            emoji: '🔴',
            textColor: 'text-red-400'
        };
    } else if (totalCrimes >= 240 || isLateNight) {
        return {
            label: 'Moderate Risk',
            color: 'bg-orange-600',
            emoji: '🟠',
            textColor: 'text-orange-400'
        };
    } else {
        return {
            label: 'Safe Zone',
            color: 'bg-green-600',
            emoji: '🟢',
            textColor: 'text-green-400'
        };
    }
}

export function getRiskMessage(riskLevel, districtName, totalCrimes) {

    const currentHour = new Date().getHours();
    const isLateNight = currentHour >= 22 || currentHour <= 5;

    if (riskLevel.label === 'High Risk') {
        return `High risk in ${districtName} with ${totalCrimes} reported crimes this month${
            isLateNight ? ' and late-night hours (10 PM - 5 AM)' : ''
        }. Exercise extreme caution and avoid isolated areas.`;
    } else if (riskLevel.label === 'Moderate Risk') {
        return `Moderate risk in ${districtName} with ${totalCrimes} reported crimes${
            isLateNight ? ' and current late-night timing' : ' this month'
        }. Stay alert and be aware of your surroundings.`;
    } else {
        return `${districtName} is relatively safe with ${totalCrimes} reported crimes this month. Continue to stay vigilant.`;
    }
}