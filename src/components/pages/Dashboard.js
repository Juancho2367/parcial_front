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

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`https://parcial-back-two.vercel.app/api/users/${userId}/history`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "Éxito") {
                        setHistorial(data.historial);
                    } else {
                        setMensaje(data.message);
                    }
                })
                .catch(() => setMensaje('Error al cargar el historial.'));
        } else {
            setMensaje('No has iniciado sesión');
            navigate('/login');
        }
    }, [navigate]);

    const handleReclamar = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setMensaje('❌ Debes estar autenticado para reclamar el código ❌');
            return;
        }

        if (!codigo.trim()) {
            setMensaje('❌ Inserta un código ❌');
            return;
        }

        setCargando(true);

        try {
            const response = await fetch('https://parcial-back-two.vercel.app/api/users/ingresar-codigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo, userId }),
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje(result.message);
                setCodigo('');
                setHistorial([...historial, { codigo, montoGanado: result.monto, estado: 'reclamado', fecha: new Date().toLocaleString() }]);
            } else {
                setMensaje(result.message || 'Error en el reclamo, intenta de nuevo');
            }
        } catch (error) {
            console.error("Error:", error);
            setMensaje('Error en el servidor');
        } finally {
            setCargando(false);
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
