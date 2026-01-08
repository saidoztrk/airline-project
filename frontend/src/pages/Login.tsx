import { useState } from 'react';
import { login, register } from '../services/api';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const response = await register(formData);
                alert('Kayıt başarılı!');
                setIsRegister(false);
            } else {
                const response = await login({
                    email: formData.email,
                    password: formData.password,
                });
                localStorage.setItem('user', JSON.stringify(response.data));
                alert('Giriş başarılı!');
                window.location.href = '/flights';
            }
        } catch (error: any) {
            alert(error.response?.data?.message || 'Hata oluştu!');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h2>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <>
                        <input
                            type="text"
                            placeholder="Ad"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            placeholder="Soyad"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={() => setIsRegister(!isRegister)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
                    {isRegister ? 'Zaten hesabım var' : 'Hesap oluştur'}
                </button>
            </p>
        </div>
    );
}

export default Login;