import { Trash2 } from 'lucide-react';

export default function RecentReports({ incidents, onDelete }) {
    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Recent Community Reports</h2>
            {incidents.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                    No community reports yet. Be the first to report an incident.
                </p>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {incidents.map((incident) => (
                        <div
                            key={incident.id}
                            className="bg-accent/30 border border-border p-4 rounded-lg flex items-start justify-between gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                                        {incident.type}
                                    </span>
                                    <span className="bg-blue-900/50 text-white px-2 py-1 rounded text-sm">
                                        {incident.area}
                                    </span>
                                </div>
                                <p className="text-sm mb-1">{incident.description}</p>
                                <span className="text-xs text-muted-foreground">
                                    {incident.date} • {incident.time}
                                </span>
                            </div>
                            <button
                                onClick={() => onDelete(incident.id)}
                                className="text-destructive hover:text-destructive-foreground p-2 hover:bg-destructive/20 rounded transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
