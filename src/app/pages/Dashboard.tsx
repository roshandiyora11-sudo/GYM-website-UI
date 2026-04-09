import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar, User as UserIcon, Clock, Trash2, Plus, Dumbbell } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [className, setClassName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const [bookingsRes, trainersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/bookings/mybookings', config),
        axios.get('http://localhost:5000/api/trainers')
      ]);
      setBookings(bookingsRes.data);
      setTrainers(trainersRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post('http://localhost:5000/api/bookings', {
        trainer: selectedTrainer,
        className,
        date
      }, config);
      toast.success('Classes booked successfully!');
      fetchData();
      setSelectedTrainer('');
      setClassName('');
      setDate('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  const cancelBooking = async (id: string) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      toast.success('Booking cancelled');
      fetchData();
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Member Dashboard</h1>
            <p className="text-zinc-400">Welcome back, {user?.name}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-4"
          >
            <div className="p-3 rounded-full bg-red-600/20 text-red-600">
              <Dumbbell size={24} />
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold">Current Plan</p>
              <p className="text-white font-semibold">Premium Member</p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus size={20} className="text-red-600" />
                Book a New Class
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Select Trainer</label>
                  <select
                    required
                    className="w-full bg-zinc-800 border-none rounded-xl py-3 px-4 text-white"
                    value={selectedTrainer}
                    onChange={(e) => setSelectedTrainer(e.target.value)}
                  >
                    <option value="">Choose a trainer...</option>
                    {trainers.map(t => (
                      <option key={t._id} value={t._id}>{t.name} - {t.specialization}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Class Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crossfit, Yoga"
                    className="w-full bg-zinc-800 border-none rounded-xl py-3 px-4 text-white"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-zinc-800 border-none rounded-xl py-3 px-4 text-white"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">
                  Confirm Booking
                </button>
              </form>
            </motion.div>
          </div>

          {/* Active Bookings */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Your Scheduled Classes</h2>
            {bookings.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-white/5 border-dashed">
                <Calendar className="mx-auto mb-4 text-zinc-700" size={48} />
                <p className="text-zinc-500 text-lg">No classes scheduled yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    layoutId={booking._id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-zinc-800 text-red-600">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{booking.className}</h4>
                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                          <span className="flex items-center gap-1">
                            <UserIcon size={14} /> {booking.trainer?.name}
                          </span>
                          <span>•</span>
                          <span>{new Date(booking.date).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
