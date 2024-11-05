import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        setUserId(userid);
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
          path='/dashboard' 
          element={userId ? <Dashboard userId={userId} /> : <Navigate to="/" replace />} 
      </Routes>
    </Router>
    </BrowserRouter>
  );
}

export default App;