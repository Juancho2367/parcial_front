import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([]);

  // Cargar el historial de códigos cuando el componente se monte
  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/historial');
        setHistorial(response.data.historial); // Asegúrate de que el backend envíe el historial en este formato
      } catch (error) {
        console.error('Error al obtener el historial:', error);
      }
    };

    obtenerHistorial();
  }, []);

  // Función para manejar el envío de código
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/ingresar-codigo', { codigo });
      setMensaje(response.data.message || 'Código ingresado correctamente');
      setCodigo(''); // Limpia el campo de código
      // Actualiza el historial después de ingresar un código
      setHistorial(prevHistorial => [...prevHistorial, response.data]);
    } catch (error) {
      setMensaje(error.response?.data?.message || 'Error al ingresar el código');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Formulario para ingresar código */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingresa el código"
          required
        />
        <button type="submit">Enviar Código</button>
      </form>

      {/* Mensaje de resultado del ingreso del código */}
      {mensaje && <p>{mensaje}</p>}

      {/* Mostrar historial de códigos ingresados */}
      <h2>Historial de Códigos Ingresados</h2>
      <ul>
        {historial.map((entry, index) => (
          <li key={index}>
            Código: {entry.codigo} - Premio: {entry.premio} - Fecha: {new Date(entry.fechaHora).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;