export default function CommunityReports({ allReports }) {

    const reportCounts = {
        total: allReports.length,
        theft: allReports.filter(report => report.type === 'Theft').length,
        harassment: allReports.filter(report => report.type === 'Harassment').length,
        assault: allReports.filter(report => report.type === 'Assault').length,
        other: allReports.filter(report => report.type === 'Other').length,
    };

    const mostReportedCrime = Object.entries(reportCounts)
        .filter(([typeName]) => typeName !== 'total')
        .sort(([, countA], [, countB]) => countB - countA)[0];

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Community Reports</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{reportCounts.total}</div>
                    <div className="text-sm text-muted-foreground">User Reports</div>
                </div>

                <div className="bg-red-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{reportCounts.theft}</div>
                    <div className="text-sm text-muted-foreground">Theft Reports</div>
                </div>

                <div className="bg-orange-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{reportCounts.harassment}</div>
                    <div className="text-sm text-muted-foreground">Harassment</div>
                </div>

                <div className="bg-purple-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{reportCounts.assault}</div>
                    <div className="text-sm text-muted-foreground">Assault</div>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{reportCounts.other}</div>
                    <div className="text-sm text-muted-foreground">Other</div>
                </div>

                <div className="bg-green-900/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Most Reported</div>
                    <div className="text-xl">
                        {mostReportedCrime
                            ? mostReportedCrime[0].charAt(0).toUpperCase() + mostReportedCrime[0].slice(1)
                            : 'N/A'}
                    </div>
                </div>

            </div>
        </div>
    );
}