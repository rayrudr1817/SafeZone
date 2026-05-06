import { useState } from 'react';

export default function ReportIncident({ onFormSubmit, crimeTypeList, districtList }) {

    const [formValues, setFormValues] = useState({
        crimeType: crimeTypeList[0] || 'Theft',
        whatHappened: '',
        reportDate: new Date().toISOString().split('T')[0],
        location: districtList[0] || 'Central Delhi',
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newReport = {
            id: Date.now().toString(),
            type: formValues.crimeType,
            description: formValues.whatHappened,
            date: formValues.reportDate,
            time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            area: formValues.location,
        };

        onFormSubmit(newReport);
        setFormValues({ ...formValues, whatHappened: '' });
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">Report an Incident</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">

                <div>
                    <label className="block mb-2">Area/District</label>
                    <select
                        value={formValues.location}
                        onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        {districtList.map(districtName => (
                            <option key={districtName} value={districtName}>{districtName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Crime Type</label>
                    <select
                        value={formValues.crimeType}
                        onChange={(e) => setFormValues({ ...formValues, crimeType: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    >
                        {crimeTypeList.map(typeName => (
                            <option key={typeName} value={typeName}>{typeName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={formValues.whatHappened}
                        onChange={(e) => setFormValues({ ...formValues, whatHappened: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3 h-24 resize-none"
                        placeholder="Describe the incident..."
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        value={formValues.reportDate}
                        onChange={(e) => setFormValues({ ...formValues, reportDate: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-4 py-3"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
}