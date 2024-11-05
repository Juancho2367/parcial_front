import React, { useState } from 'react';
import '../styles/RegistroAdmin.css';
import { useNavigate } from 'react-router-dom';

const NewAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        const datos = { username, password };

    try {
        const response = await fetch('http://localhost:4000/api/users/registroAD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            if (!response.ok) {
                // Capturamos el cuerpo de la respuesta en caso de error
                const errorData = await response.json();
                throw new Error(errorData.message || '❌ Error en el registro, intenta de nuevo ❌');
            }

            // Si la respuesta es correcta, procesamos el JSON
            const data = await response.json();
            setMensaje(data.message || '✔️ Administrador registrado con éxito');
            
            // Redirigir después de un corto retraso para mostrar el mensaje de éxito
            setTimeout(() => {
                navigate('/loginAD');
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            setMensaje(error.message);
        }
    };

    return (
        <div className="new-admin-container">
            <h2 className="new-admin-title">Registrar Nuevo Administrador</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa el nombre de usuario"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa la contraseña"
                        required
                    />
                </div>
                <button className="register-button" type="submit">Registrar Administrador</button>
                <button className="back-button" type="button" onClick={() => navigate('/loginAD')}>Regresar al Login</button>
                {mensaje && (
                    <p className={mensaje.includes('Éxito') ? 'mensaje-exito' : 'mensaje-error'}>
                        {mensaje}
                    </p>
                )}
            </form>
        </div>
    );
};

export default NewAdmin;
