import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
    const [codigo, setCodigo] = useState(''); // Estado para el código a reclamar
    const [mensaje, setMensaje] = useState(''); // Estado para mensajes
    const [cargando, setCargando] = useState(false); // Estado para mostrar cargando
    const [historial, setHistorial] = useState([]); // Estado para el historial de reclamos
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        // Cargar el historial de reclamos al iniciar el componente
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:4000/api/users/${userId}/history`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setHistorial(data.codes); // Asumimos que 'data.codes' contiene el historial
                    } else {
                        setMensaje(data.message);
                    }
                })
                .catch((error) => setMensaje('Error al cargar el historial.'));
        }
    }, []);

    const handleReclamar = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const userId = localStorage.getItem('userId'); // Recupera el userId del localStorage

        if (!userId) {
            setMensaje('❌ Debes estar autenticado para reclamar el código ❌');
            return;
        }

        const redeemData = {
            code: codigo,
            userId,
        };

        setCargando(true); // Activa el estado de cargando

        try {
            const response = await fetch('http://localhost:4000/api/codes/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(redeemData),
            });

            const result = await response.json();

            if (response.ok) {
                setMensaje(result.message);
                setCodigo(''); // Limpia el campo de código después de reclamar
                setHistorial((prevHistorial) => [...prevHistorial, { codigo, montoGanado: result.montoGanado, estado: 'Reclamado', fechaReclamo: new Date() }]); // Actualiza el historial
            } else {
                setMensaje(result.message);
            }
        } catch (error) {
            console.error('Error al reclamar el código:', error);
            setMensaje('Error al reclamar el código. Intenta de nuevo más tarde.');
        } finally {
            setCargando(false); // Desactiva el estado de cargando
        }
    };

    return (
        <div className="reclamar-container">
            <h2 className="reclamar-title">🎉 Reclama tu Código 🎉</h2>
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
            {cargando && <div className="loader">🔄 Cargando...</div>}

            {/* Sección para mostrar el historial de reclamos */}
            <div className="historial-container">
                <h3>Historial de Reclamos</h3>
                {historial.length === 0 ? (
                    <p>No hay reclamos registrados.</p>
                ) : (
                    <ul>
                        {historial.map((reclamo, index) => (
                            <li key={index}>
                                Código: {reclamo.codigo}, Monto: ${reclamo.montoGanado}, Estado: {reclamo.estado}, Fecha: {new Date(reclamo.fechaReclamo).toLocaleString('es-CO')}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Botón para regresar */}
            <button className="reclamar-button" onClick={() => navigate(-1)}>
                ⬅️ Regresar
            </button>
        </div>
    );
}

export default Dashboard;
