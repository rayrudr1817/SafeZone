import { MapPin, Phone } from 'lucide-react';

export default function PoliceStations({ stations }) {
    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Police Stations in Delhi</h2>
            <p className="text-sm text-muted-foreground mb-4">
                Showing {stations.length} police stations (Real data from OpenStreetMap)
            </p>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {stations.map((station) => (
                    <div key={station.id} className="bg-accent/30 p-4 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-medium mb-1 truncate">{station.name}</div>
                                <div className="text-sm text-muted-foreground mb-1">{station.area}</div>
                                <div className="text-xs text-muted-foreground truncate">{station.address}</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <a
                                href="tel:100"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                            >
                                <Phone className="w-4 h-4" />
                                Call 100
                            </a>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors text-sm"
                            >
                                <MapPin className="w-4 h-4" />
                                Navigate
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}