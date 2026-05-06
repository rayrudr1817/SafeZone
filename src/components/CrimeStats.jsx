export default function CrimeStats({ crimeStats, selectedDistrict }) {
    if (!crimeStats) return null;

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Official Crime Statistics - {selectedDistrict}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-red-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{crimeStats.totalCrimes}</div>
                    <div className="text-sm text-muted-foreground">Total Crimes (This Month)</div>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{crimeStats.theft}</div>
                    <div className="text-sm text-muted-foreground">Theft Cases</div>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{crimeStats.assault}</div>
                    <div className="text-sm text-muted-foreground">Assault Cases</div>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{crimeStats.robbery}</div>
                    <div className="text-sm text-muted-foreground">Robbery Cases</div>
                </div>
            </div>
        </div>
    );
}
