import { useState, useEffect } from 'react';
import { getFlights, createReservation } from '../services/api';

function Flights() {
    const [flights, setFlights] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        loadFlights();
    }, []);

    const loadFlights = async () => {
        try {
            const response = await getFlights();
            setFlights(response.data);
        } catch (error) {
            console.error('Uçuşlar yüklenemedi:', error);
        }
    };

    const handleReservation = async (flight: any) => {
        if (!user) {
            alert('Lütfen giriş yapın!');
            window.location.href = '/';
            return;
        }

        const passengerName = prompt('Yolcu adı soyadı:');
        const seatNumber = prompt('Koltuk numarası (örn: 12A):');

        if (passengerName && seatNumber) {
            try {
                await createReservation({
                    user: { id: user.id },
                    flight: { id: flight.id },
                    passengerName,
                    seatNumber,
                });
                alert('Rezervasyon başarılı!');
            } catch (error: any) {
                alert(error.response?.data?.message || 'Rezervasyon yapılamadı!');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Uçuşlar</h1>
                <div>
                    {user && (
                        <>
                            <span style={{ marginRight: '20px' }}>Hoş geldin, {user.firstName}!</span>
                            {user.role === 'admin' && (
                                <button onClick={() => window.location.href = '/admin'} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Admin Paneli
                                </button>
                            )}
                            <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                Çıkış
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {flights.map((flight) => (
                    <div key={flight.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <h3>{flight.flightNumber}</h3>
                        <p>
                            <strong>Kalkış:</strong> {flight.departureAirport?.name || 'N/A'} ({flight.departureAirport?.code || 'N/A'})
                            <br />
                            <strong>Varış:</strong> {flight.arrivalAirport?.name || 'N/A'} ({flight.arrivalAirport?.code || 'N/A'})
                        </p>
                        <p>
                            <strong>Tarih:</strong> {new Date(flight.departureTime).toLocaleString('tr-TR')}
                        </p>
                        <p>
                            <strong>Fiyat:</strong> {flight.price} TL | <strong>Koltuk:</strong> {flight.availableSeats}
                        </p>
                        <button onClick={() => handleReservation(flight)} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Rezervasyon Yap
                        </button>
                    </div>
                ))}
            </div>

            {flights.length === 0 && (
                <p style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>Henüz uçuş bulunmuyor.</p>
            )}
        </div>
    );
}

export default Flights;