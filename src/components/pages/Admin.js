import { useState, useEffect } from 'react';

function Admin() {
  const [codigos, setCodigos] = useState([]);

  useEffect(() => {
    const fetchCodigos = async () => {
      const response = await fetch('http://localhost:5000/api/admin/codigos');
      const data = await response.json();
      setCodigos(data);
    };

    fetchCodigos();
  }, []);

  return (
    <div>
      <h1>Admin - Historial de Códigos</h1>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Código</th>
            <th>Premio</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {codigos.map((entry, index) => (
            <tr key={index}>
              <td>{entry.usuario}</td>
              <td>{entry.codigo}</td>
              <td>{entry.premio}</td>
              <td>{new Date(entry.fechaHora).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;