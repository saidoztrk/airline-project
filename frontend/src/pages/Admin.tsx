import { useState, useEffect } from 'react';
import { getAirports, createAirport, createFlight, getFlights, deleteFlight } from '../services/api';

function Admin() {
    const [airports, setAirports] = useState<any[]>([]);
    const [flights, setFlights] = useState<any[]>([]);
    const [showAirportForm, setShowAirportForm] = useState(false);
    const [showFlightForm, setShowFlightForm] = useState(false);

    const [airportData, setAirportData] = useState({
        code: '',
        name: '',
        city: '',
        country: '',
    });

    const [flightData, setFlightData] = useState({
        flightNumber: '',
        departureAirportId: '',
        arrivalAirportId: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        availableSeats: 180,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [airportsRes, flightsRes] = await Promise.all([
            getAirports(),
            getFlights(),
        ]);
        setAirports(airportsRes.data);
        setFlights(flightsRes.data);
    };

    const handleCreateAirport = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAirport(airportData);
            alert('Havalimanı eklendi!');
            setShowAirportForm(false);
            setAirportData({ code: '', name: '', city: '', country: '' });
            loadData();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Hata oluştu!');
        }
    };

    const handleCreateFlight = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createFlight({
                ...flightData,
                departureAirport: { id: parseInt(flightData.departureAirportId) },
                arrivalAirport: { id: parseInt(flightData.arrivalAirportId) },
                price: parseFloat(flightData.price),
            });
            alert('Uçuş eklendi!');
            setShowFlightForm(false);
            setFlightData({ flightNumber: '', departureAirportId: '', arrivalAirportId: '', departureTime: '', arrivalTime: '', price: '', availableSeats: 180 });
            loadData();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Hata oluştu!');
        }
    };

    const handleDeleteFlight = async (id: number) => {
        if (confirm('Bu uçuşu silmek istediğinize emin misiniz?')) {
            try {
                await deleteFlight(id);
                alert('Uçuş silindi!');
                loadData();
            } catch (error: any) {
                alert(error.response?.data?.message || 'Hata oluştu!');
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Admin Paneli</h1>
                <button onClick={() => window.location.href = '/flights'} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Uçuşlara Dön
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <button onClick={() => setShowAirportForm(!showAirportForm)} style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Havalimanı Ekle
                </button>
                <button onClick={() => setShowFlightForm(!showFlightForm)} style={{ padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Uçuş Ekle
                </button>
            </div>

            {showAirportForm && (
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3>Yeni Havalimanı</h3>
                    <form onSubmit={handleCreateAirport}>
                        <input type="text" placeholder="Kod (IST)" value={airportData.code} onChange={(e) => setAirportData({ ...airportData, code: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <input type="text" placeholder="Ad" value={airportData.name} onChange={(e) => setAirportData({ ...airportData, name: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <input type="text" placeholder="Şehir" value={airportData.city} onChange={(e) => setAirportData({ ...airportData, city: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <input type="text" placeholder="Ülke" value={airportData.country} onChange={(e) => setAirportData({ ...airportData, country: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Kaydet</button>
                    </form>
                </div>
            )}

            {showFlightForm && (
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3>Yeni Uçuş</h3>
                    <form onSubmit={handleCreateFlight}>
                        <input type="text" placeholder="Uçuş No (TK123)" value={flightData.flightNumber} onChange={(e) => setFlightData({ ...flightData, flightNumber: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <select value={flightData.departureAirportId} onChange={(e) => setFlightData({ ...flightData, departureAirportId: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="">Kalkış Havalimanı</option>
                            {airports.map(a => <option key={a.id} value={a.id}>{a.name} ({a.code})</option>)}
                        </select>
                        <select value={flightData.arrivalAirportId} onChange={(e) => setFlightData({ ...flightData, arrivalAirportId: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="">Varış Havalimanı</option>
                            {airports.map(a => <option key={a.id} value={a.id}>{a.name} ({a.code})</option>)}
                        </select>
                        <input type="datetime-local" value={flightData.departureTime} onChange={(e) => setFlightData({ ...flightData, departureTime: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <input type="datetime-local" value={flightData.arrivalTime} onChange={(e) => setFlightData({ ...flightData, arrivalTime: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <input type="number" placeholder="Fiyat (TL)" value={flightData.price} onChange={(e) => setFlightData({ ...flightData, price: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }} />
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Kaydet</button>
                    </form>
                </div>
            )}

            <h2>Mevcut Uçuşlar ({flights.length})</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
                {flights.map((flight) => (
                    <div key={flight.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{flight.flightNumber}</strong> - {flight.departureAirport?.code} → {flight.arrivalAirport?.code} | {flight.price} TL
                        </div>
                        <button onClick={() => handleDeleteFlight(flight.id)} style={{ padding: '5px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Sil
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;