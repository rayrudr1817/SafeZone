import { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import RiskBanner from './components/RiskBanner';
import EmergencyButtons from './components/EmergencyButtons';
import ReportIncident from './components/ReportIncident';
import CrimeStats from './components/CrimeStats';
import CommunityReports from './components/CommunityReports';
import RecentReports from './components/RecentReports';
import PoliceStations from './components/PoliceStations';
import RiskAssessment from './components/RiskAssessment';
import { getPoliceStations, getCrimeData } from './utils/api';
import { checkRiskLevel } from './utils/riskCalculator';
import { delhiDistricts } from './utils/constants';

export default function SafeZoneApp() {

    const [userReports, setUserReports] = useState([]);
    const [nearbyStations, setNearbyStations] = useState([]);
    const [districtCrimeData, setDistrictCrimeData] = useState(null);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [chosenDistrict, setChosenDistrict] = useState('Central Delhi');

    useEffect(() => {
        loadEverythingOnStart();
    }, []);

    useEffect(() => {
        loadCrimeDataForDistrict();
    }, [chosenDistrict]);

    useEffect(() => {
        localStorage.setItem('safezone-saved-reports', JSON.stringify(userReports));
    }, [userReports]);

    const loadEverythingOnStart = async () => {
        setIsPageLoading(true);

        const previouslySavedReports = localStorage.getItem('safezone-saved-reports');
        if (previouslySavedReports) {
            setUserReports(JSON.parse(previouslySavedReports));
        }

        const stationList = await getPoliceStations();
        setNearbyStations(stationList);

        const crimeNumbers = await getCrimeData(chosenDistrict);
        setDistrictCrimeData(crimeNumbers);

        setIsPageLoading(false);
    };

    const loadCrimeDataForDistrict = async () => {
        const crimeNumbers = await getCrimeData(chosenDistrict);
        setDistrictCrimeData(crimeNumbers);
    };

    const handleRefreshClick = async () => {
        setIsPageLoading(true);
        const stationList = await getPoliceStations();
        setNearbyStations(stationList);
        await loadCrimeDataForDistrict();
        setIsPageLoading(false);
    };

    const handleNewReportSubmit = (newReport) => {
        setUserReports([newReport, ...userReports]);
    };

    const handleDeleteReport = (reportId) => {
        setUserReports(userReports.filter(report => report.id !== reportId));
    };

    const currentRiskLevel = checkRiskLevel(districtCrimeData);

    if (isPageLoading) {
        return (
            <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg">Loading Delhi crime data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dark min-h-screen bg-background text-foreground p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Shield className="w-10 h-10 text-blue-500" />
                        <div>
                            <h1 className="text-4xl">SafeZone Delhi</h1>
                            <span className="text-muted-foreground">Real-time Crime Awareness & Safety Platform</span>
                        </div>
                    </div>
                    <button
                        onClick={handleRefreshClick}
                        className="flex items-center gap-2 bg-accent hover:bg-accent/80 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                    </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                    <label className="block mb-2">Select Delhi District</label>
                    <select
                        value={chosenDistrict}
                        onChange={(e) => setChosenDistrict(e.target.value)}
                        className="w-full md:w-auto bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        {delhiDistricts.map(districtName => (
                            <option key={districtName} value={districtName}>{districtName}</option>
                        ))}
                    </select>
                </div>

                <RiskBanner
                    riskLevel={currentRiskLevel}
                    districtName={chosenDistrict}
                    crimeData={districtCrimeData}
                />

                <EmergencyButtons />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ReportIncident onFormSubmit={handleNewReportSubmit} />
                        <CrimeStats crimeData={districtCrimeData} districtName={chosenDistrict} />
                        <CommunityReports allReports={userReports} />
                        <RecentReports allReports={userReports} onDeleteReport={handleDeleteReport} />
                    </div>

                    <div className="space-y-6">
                        <PoliceStations stationList={nearbyStations} />
                        <RiskAssessment riskLevel={currentRiskLevel} districtName={chosenDistrict} crimeData={districtCrimeData} />
                    </div>
                </div>
            </div>
        </div>
    );
}