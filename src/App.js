import React, { useState } from 'react'; // Asegúrate de importar useState
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'; // Asegúrate de importar Navigate
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import LoginAdmin from './components/pages/LoginAdmin';
import RegistroAdmin from './components/pages/RegistroAdmin';
import RegistroGan from './components/pages/RegistroGan';

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
        console.log("Usuario logueado con ID:", userId); // Esto debería mostrar el ID
        setUserId(userId);
    };

  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route index element={<Login callback={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/LoginAD" element={<LoginAdmin />} />
          <Route path="/RegistroAD" element={<RegistroAdmin />} />
          <Route path="/RegistroGan" element={<RegistroGan />} />
          <Route path='/dashboard' 
            element={userId ? <Dashboard userId={userId} /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
    </BrowserRouter>
  );
}
export default App;
