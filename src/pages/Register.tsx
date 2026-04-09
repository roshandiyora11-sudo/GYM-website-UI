import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { User, Mail, Lock, ArrowRight, Dumbbell } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error("Passwords don't match");
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name, email: formData.email, password: formData.password,
      });
      login(data);
      toast.success('Account created! Welcome to ITALIYA 🔥');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Doe' },
    { key: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'you@example.com' },
    { key: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: '••••••••' },
    { key: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: Lock, placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(220,38,38,0.12),_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-8 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-2xl bg-red-600/10 border border-red-600/20">
            <Dumbbell className="text-red-600" size={28} />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join ITALIYA</h1>
          <p className="text-zinc-400">Transform your body, transform your life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-300 ml-1">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-3 text-zinc-500" size={18} />
                <input
                  type={type} required
                  className="w-full bg-zinc-800/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30 transition-all"
                  placeholder={placeholder}
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              </div>
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            disabled={loading} type="submit"
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2"
          >
            {loading ? 'Creating Account...' : 'Create Free Account'}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Already a member?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
