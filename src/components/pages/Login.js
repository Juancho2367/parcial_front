// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        const loginData = {
            email: username,
            password,
        };

        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.status);
                // Guarda el userId y el role en el local storage
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('role', result.role);
                console.log('Login exitoso:', { username, password });
                navigate('/Dashboard');
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setError('Error al intentar iniciar sesión. Intente de nuevo más tarde.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">¡Participa en el Sorteo de Margarita!</h2>
            <p className="login-subtitle">Inicia sesión para una oportunidad de ganar</p>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="form-group">
                <label htmlFor="username">
                    <span className="icon">👤</span> Usuario
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    <span className="icon">🔒</span> Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                />
            </div>
            <button className="login-button" onClick={handleLogin}>Entrar</button>
            <Link to="/register" className="register-button">Registrarse</Link>
        </div>
    );
}

export default Login;
