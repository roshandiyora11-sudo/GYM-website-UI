import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, Dumbbell } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(data);
      toast.success('Welcome back!');
      navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.15),_transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-2xl bg-red-600/10 border border-red-600/20">
            <Dumbbell className="text-red-600" size={28} />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to your ITALIYA account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-zinc-500" size={18} />
              <input
                type="email" required
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30 transition-all"
                placeholder="you@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-zinc-500" size={18} />
              <input
                type="password" required
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/30 transition-all"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            disabled={loading} type="submit"
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-zinc-500 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:text-red-400 font-semibold transition-colors">
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
