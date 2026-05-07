import { useState } from 'react';
import { Phone, AlertTriangle, UserPlus, X, Save } from 'lucide-react';

const getInitialContacts = () => {
    try {
        const saved = localStorage.getItem('safezone-emergency-contacts');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export default function EmergencyButtons({ currentDistrict }) {
    const [contacts, setContacts] = useState(getInitialContacts);
    const [showContactsPanel, setShowContactsPanel] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const saveContact = () => {
        if (!newName.trim() || !newPhone.trim()) return;
        const updated = [...contacts, { name: newName.trim(), phone: newPhone.trim() }].slice(0, 3);
        setContacts(updated);
        localStorage.setItem('safezone-emergency-contacts', JSON.stringify(updated));
        setNewName('');
        setNewPhone('');
    };

    const removeContact = (index) => {
        const updated = contacts.filter((_, i) => i !== index);
        setContacts(updated);
        localStorage.setItem('safezone-emergency-contacts', JSON.stringify(updated));
    };

    const triggerSOS = () => {
        const message = encodeURIComponent(
            `🆘 SOS! I need help. I am currently in ${currentDistrict || 'Delhi'}. Please call me immediately or contact police at 112.`
        );
        // Send WhatsApp message to each saved contact
        contacts.forEach(contact => {
            const phone = contact.phone.replace(/\D/g, '');
            const fullPhone = phone.startsWith('91') ? phone : `91${phone}`;
            window.open(`https://wa.me/${fullPhone}?text=${message}`, '_blank');
        });
        // Call 112
        window.location.href = 'tel:112';
    };

    const btnStyle = (bg) => ({
        background: bg,
        border: 'none',
        borderRadius: 10,
        padding: '1.1rem 1rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.6rem',
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 700,
        fontSize: '1rem',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.1s',
        flex: 1,
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>

                {/* Delhi Police 100 */}
                <a href="tel:100" style={btnStyle('linear-gradient(135deg,#dc2626,#b91c1c)')}>
                    <Phone size={20} />
                    Delhi Police (100)
                </a>

                {/* SOS Button */}
                <button
                    onClick={triggerSOS}
                    className="sos-pulse"
                    style={{
                        ...btnStyle('linear-gradient(135deg,#ef4444,#dc2626)'),
                        flex: 1.5,
                        border: '2px solid rgba(255,100,100,0.5)',
                        fontSize: '1.15rem',
                        letterSpacing: '0.08em',
                    }}
                >
                    <AlertTriangle size={22} />
                    🆘 SOS — Call 112
                </button>

                {/* Ambulance */}
<a href="tel:108" style={btnStyle('linear-gradient(135deg,#16a34a,#15803d)')}>
    <Phone size={20} />
    Ambulance (108)
</a>

            </div>

            {/* Manage Emergency Contacts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                    onClick={() => setShowContactsPanel(!showContactsPanel)}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-bright)',
                        borderRadius: 8,
                        padding: '0.55rem 1rem',
                        color: 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                        cursor: 'pointer',
                    }}
                >
                    <UserPlus size={15} />
                    {contacts.length === 0 ? 'Add SOS Contacts' : `SOS Contacts (${contacts.length}/3)`}
                </button>
                {contacts.length > 0 && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        SOS will WhatsApp: {contacts.map(c => c.name).join(', ')}
                    </span>
                )}
            </div>

            {/* Contacts Panel */}
            {showContactsPanel && (
                <div className="safe-card fade-in" style={{ borderColor: 'var(--border-bright)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.05rem' }}>
                            Emergency Contacts (max 3)
                        </span>
                        <button onClick={() => setShowContactsPanel(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Existing contacts */}
                    {contacts.map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', background: 'var(--bg-secondary)', borderRadius: 8, padding: '0.6rem 0.85rem' }}>
                            <span style={{ flex: 1, fontSize: '0.88rem' }}>{c.name}</span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{c.phone}</span>
                            <button onClick={() => removeContact(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                <X size={15} />
                            </button>
                        </div>
                    ))}

                    {/* Add new contact */}
                    {contacts.length < 3 && (
                        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
                            <input
                                className="safe-input"
                                placeholder="Name"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                style={{ flex: 1 }}
                            />
                            <input
                                className="safe-input"
                                placeholder="Phone (10 digits)"
                                value={newPhone}
                                onChange={e => setNewPhone(e.target.value)}
                                style={{ flex: 1 }}
                            />
                            <button
                                onClick={saveContact}
                                style={{ background: 'var(--accent-blue)', border: 'none', borderRadius: 8, padding: '0 1rem', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, whiteSpace: 'nowrap' }}
                            >
                                <Save size={15} /> Save
                            </button>
                        </div>
                    )}
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                        When SOS is pressed, a WhatsApp message is sent to all saved contacts + 112 is called.
                    </p>
                </div>
            )}
        </div>
    );
}