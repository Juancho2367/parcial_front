import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import LoginAdmin from './components/pages/LoginAdmin';
import RegistroAdmin from './components/pages/RegistroAdmin';
import RegistroGan from './components/pages/RegistroGan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/LoginAD" element={<LoginAdmin />} />
        <Route path="/RegistroAD" element={<RegistroAdmin />} />
        <Route path="/RegistroGan" element={<RegistroGan />} />
      </Routes>
    </Router>
  );
}

export default App;