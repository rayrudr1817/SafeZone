import { useState } from 'react';

export default function ReportIncident({ onFormSubmit, crimeTypeList, districtList }) {
    const [form, setForm] = useState({
        crimeType: crimeTypeList[0] || 'Theft',
        otherDetail: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        area: districtList[0] || 'Central Delhi',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalType = form.crimeType === 'Other' && form.otherDetail.trim()
            ? `Other: ${form.otherDetail.trim()}`
            : form.crimeType;
        onFormSubmit({
            id: Date.now().toString(),
            type: finalType,
            description: form.description,
            date: form.date,
            time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
            area: form.area,
        });
        setForm(f => ({ ...f, description: '', otherDetail: '' }));
    };

    const label = { display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, marginBottom: 5, letterSpacing: '0.05em' };

    return (
        <div className="safe-card">
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                📝 Report an Incident
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={label}>AREA / DISTRICT</label>
                        <select className="safe-input" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}>
                            {districtList.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={label}>CRIME TYPE</label>
                        <select className="safe-input" value={form.crimeType} onChange={e => setForm(f => ({ ...f, crimeType: e.target.value, otherDetail: '' }))}>
                            {crimeTypeList.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                {form.crimeType === 'Other' && (
                    <div>
                        <label style={{ ...label, color: '#fb923c' }}>SPECIFY TYPE</label>
                        <input
                            className="safe-input"
                            placeholder="e.g. Vandalism, Fraud, Stalking..."
                            value={form.otherDetail}
                            onChange={e => setForm(f => ({ ...f, otherDetail: e.target.value }))}
                            style={{ borderColor: 'rgba(249,115,22,0.4)' }}
                            required
                        />
                    </div>
                )}

                <div>
                    <label style={label}>DESCRIPTION</label>
                    <textarea
                        className="safe-input"
                        style={{ minHeight: 85, resize: 'vertical' }}
                        placeholder="Describe what happened..."
                        value={form.description}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label style={label}>DATE</label>
                    <input type="date" className="safe-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>

                <button type="submit" style={{ background: 'var(--accent-blue)', border: 'none', borderRadius: 8, padding: '0.85rem', color: 'white', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.05em', cursor: 'pointer' }}>
                    SUBMIT REPORT
                </button>
            </form>
        </div>
    );
}