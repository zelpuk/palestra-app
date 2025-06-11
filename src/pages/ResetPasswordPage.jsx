import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResetPasswordPage.css';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validazione
        if (password !== confirmPassword) {
            setError('Le password non coincidono');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La password deve essere lunga almeno 6 caratteri');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://wpschool.it/primoanno/meta/backend/auth/reset_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.error || 'Errore durante il reset della password');
            }
        } catch (err) {
            setError('Errore di connessione. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2>Reset Password</h2>
                {success ? (
                    <div className="success-message">
                        Password aggiornata con successo! Verrai reindirizzato alla pagina di login...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Nuova Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Conferma Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Caricamento...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordPage;
