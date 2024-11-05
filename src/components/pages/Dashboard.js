// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);
    const [historial, setHistorial] = useState([]);
    const navigate = useNavigate();

    const obtenerHistorial = async (userId) => {
        try {
            const response = await fetch(`https://parcial-back-two.vercel.app/api/users/${userId}/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error al obtener el historial ❌');
            }

            setHistorial(data.historial);

        } catch (error) {
            console.error("Error al obtener el historial:", error);
            setMensaje(error.message);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Recuperar el userId de localStorage
        console.log('User ID desde localStorage:', userId); // Agregado para verificar el userId

        if (userId) {
            obtenerHistorial(userId);
        } else {
            setMensaje('❌ No has iniciado sesión ❌');
            navigate('/login');
        }
    }, [navigate]);

    const handleReclamar = async (event) => {
        event.preventDefault(); // Evitar que el formulario se recargue
        const userId = localStorage.getItem('userId'); // Recuperar el userId nuevamente

        if (!userId) {
            setMensaje("❌ Debes estar autenticado para reclamar el código ❌");
            return;
        }

        const datos = { userId, codigo };
        setCargando(true); // Mostrar indicador de carga

        try {
            const response = await fetch('https://parcial-back-two.vercel.app/api/users/ingresar-codigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '❌ Error en el reclamo, intenta de nuevo ❌');
            }

            setMensaje(data.message);
            setCodigo(''); // Limpiar el campo del código tras un reclamo exitoso
            await obtenerHistorial(userId);
            setTimeout(() => {
                navigate('/'); // Navegar a la ruta deseada
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            setMensaje(error.message);
        } finally {
            setCargando(false); // Ocultar indicador de carga
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">🎉 Reclama tu Código 🎉</h2>
            <p className="dashboard-subtitle">Introduce tu código para reclamar recompensas.</p>
            <form onSubmit={handleReclamar}>
                <div className="form-group">
                    <label htmlFor="codigo">Código</label>
                    <input
                        type="text"
                        id="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Ingresa el código"
                        required
                    />
                </div>
                <button className="reclamar-button" type="submit" disabled={cargando}>
                    {cargando ? 'Reclamando...' : 'Reclamar Código'}
                </button>
                {mensaje && (
                    <p className={mensaje.includes('Éxito') ? 'mensaje-exito' : 'mensaje-error'}>
                        {mensaje}
                    </p>
                )}
            </form>
            <div className="historial-container">
                <h3>Historial de Reclamos</h3>
                {historial.length === 0 ? (
                    <p>No hay reclamos registrados.</p>
                ) : (
                    <ul>
                        {historial.map((reclamo, index) => (
                            <li key={index}>
                                Código: {reclamo.codigo}, Monto: ${reclamo.montoGanado}, Estado: {reclamo.estado}, Fecha: {reclamo.fecha}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="volver-button" onClick={() => navigate(-1)}>
                ⬅️ Regresar
            </button>
        </div>
    );
}

export default Dashboard;
