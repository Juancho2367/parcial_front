import { useState, useEffect } from 'react';

function Dashboard() {
  const [codigo, setCodigo] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/ingresar-codigo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo })
    });
    const data = await response.json();
    
    if (data && data.codigo) {
      setHistorial([...historial, data]);
      alert(`Código ingresado: ${data.premio > 0 ? `Ganaste ${data.premio}` : 'Sin premio'}`);
    } else {
      alert("Código inválido o ya reclamado");
    }
    setCodigo('');
  };

  useEffect(() => {
    // Aquí podrías cargar el historial del usuario desde la API
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresar código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>

      <h2>Historial de códigos ingresados</h2>
      <ul>
        {historial.map((entry, index) => (
          <li key={index}>
            Código: {entry.codigo} | Premio: {entry.premio} | Fecha: {new Date(entry.fechaHora).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;