import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth
export const register = (data: any) => api.post('/auth/register', data);
export const login = (data: any) => api.post('/auth/login', data);

// Airports
export const getAirports = () => api.get('/airports');
export const createAirport = (data: any) => api.post('/airports', data);
export const deleteAirport = (id: number) => api.delete(`/airports/${id}`);

// Flights
export const getFlights = () => api.get('/flights');
export const getFlight = (id: number) => api.get(`/flights/${id}`);
export const createFlight = (data: any) => api.post('/flights', data);
export const deleteFlight = (id: number) => api.delete(`/flights/${id}`);

// Reservations
export const getReservations = () => api.get('/reservations');
export const createReservation = (data: any) => api.post('/reservations', data);
export const deleteReservation = (id: number) => api.delete(`/reservations/${id}`);

export default api;