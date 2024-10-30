import '../styles/Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [codigo, setCodigo] = useState('');
  const [historial, setHistorial] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/historial', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setHistorial(data.codigosIngresados || []);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCodigoSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/ingresar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo })
      });

      if (response.ok) {
        alert("Código ingresado exitosamente");
        // Actualiza el historial después de ingresar un nuevo código
        const updatedHistorial = await fetch('http://localhost:5000/api/users/historial');
        const data = await updatedHistorial.json();
        setHistorial(data);
        setCodigo('');
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error al ingresar el código");
      }
    } catch (error) {
      console.error("Error al enviar el código:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido, {user ? user.email : 'Cargando...'}</h1>
      <form onSubmit={handleCodigoSubmit} className="codigo-form">
        <input
          type="text"
          placeholder="Ingresa tu código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
          className="codigo-input"
        />
        <button type="submit" className="codigo-button">Enviar Código</button>
      </form>
      <h2>Historial de Códigos Ingresados</h2>
      <ul className="historial-list">
        {historial.map((cod, index) => (
          <li key={index}>{cod}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;