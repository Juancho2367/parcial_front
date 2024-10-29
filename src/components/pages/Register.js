import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [anioNacimiento, setAnioNacimiento] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password, anioNacimiento })
    });

    const data = await response.json();

    if (response.ok) { // Verifica si la respuesta es exitosa
      alert("Registro exitoso. Redirigiendo a inicio de sesión...");
      navigate('/login'); // Redirige a la página de login
    } else {
      alert("Error al registrar usuario: " + (data.message || "Error desconocido")); // Muestra el mensaje de error
    }
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Año de Nacimiento"
          value={anioNacimiento}
          onChange={(e) => setAnioNacimiento(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;