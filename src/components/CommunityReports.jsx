export default function CommunityReports({ incidents }) {
    const stats = {
        total: incidents.length,
        theft: incidents.filter(i => i.type === 'Theft').length,
        harassment: incidents.filter(i => i.type === 'Harassment').length,
        assault: incidents.filter(i => i.type === 'Assault').length,
        other: incidents.filter(i => i.type === 'Other').length,
    };

    const mostCommon = Object.entries(stats)
        .filter(([key]) => key !== 'total')
        .sort(([, a], [, b]) => b - a)[0];

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Community Reports</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">User Reports</div>
                </div>
                <div className="bg-red-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{stats.theft}</div>
                    <div className="text-sm text-muted-foreground">Theft Reports</div>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{stats.harassment}</div>
                    <div className="text-sm text-muted-foreground">Harassment</div>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{stats.assault}</div>
                    <div className="text-sm text-muted-foreground">Assault</div>
                </div>
                <div className="bg-blue-900/30 p-4 rounded-lg">
                    <div className="text-3xl mb-1">{stats.other}</div>
                    <div className="text-sm text-muted-foreground">Other</div>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Most Reported</div>
                    <div className="text-xl">
                        {mostCommon ? mostCommon[0].charAt(0).toUpperCase() + mostCommon[0].slice(1) : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
}