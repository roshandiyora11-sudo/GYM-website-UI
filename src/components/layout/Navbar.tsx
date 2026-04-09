import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { Menu, X, Dumbbell, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/#programs" },
    { name: "On-Demand", href: "/ondemand" },
    { name: "Trainers", href: "/trainers" },
    { name: "Pricing", href: "/#pricing" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold text-2xl"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Dumbbell size={32} className="text-red-600" />
            </motion.div>
            ITALIYA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-red-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="flex items-center gap-2 text-white hover:text-red-600 transition-colors font-medium"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg"
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-red-600 transition-colors text-lg font-medium py-2"
            >
              {link.name}
            </a>
          ))}
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setIsOpen(false)}
                className="block text-white font-medium py-2"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-left text-zinc-400 font-medium py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full px-6 py-3 bg-red-600 text-center text-white rounded-lg font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}