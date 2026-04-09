import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import TrainersPage from './pages/TrainersPage';
import OnDemand from './pages/OnDemand';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/ondemand" element={<OnDemand />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}