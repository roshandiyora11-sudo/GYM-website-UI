import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar, Clock, Trash2, Dumbbell, LayoutGrid, List, Shield, Lock } from 'lucide-react';
import QRCode from 'react-qr-code';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';

interface Booking {
  _id: string;
  className: string;
  trainer: { name: string };
  date: string;
  status: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'bookings' | 'musclemap'>('calendar');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const muscleWorkouts: Record<string, string[]> = {
    Chest: ['Push-Ups', 'Bench Press', 'Incline Dumbbell Press', 'Cable Crossovers'],
    Back: ['Pull-Ups', 'Barbell Rows', 'Lat Pulldown', 'Deadlifts'],
    Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers'],
    Core: ['Planks', 'Russian Twists', 'Leg Raises', 'Cable Crunches'],
    Legs: ['Squats', 'Leg Press', 'Walking Lunges', 'Calf Raises']
  };

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/bookings/mybookings', config);
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      toast.success('Booking cancelled');
      fetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Luxury Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">{user?.name?.split(' ')[0]}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 mt-2 text-lg font-medium"
            >
              Manage your master classes and training elite schedule
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/10 shadow-xl flex items-center gap-2">
              <Dumbbell size={16} className="text-red-500" />
              <span className="text-white text-sm font-bold tracking-wide uppercase">Premium Member</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur border border-white/5 shadow-xl flex items-center gap-2">
              <Calendar size={16} className="text-zinc-400" />
              <span className="text-zinc-300 text-sm font-semibold">{bookings.length} Booked</span>
            </div>
          </motion.div>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1.5 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl w-fit shadow-2xl">
          {[
            { id: 'calendar', icon: LayoutGrid, label: 'Weekly Schedule' },
            { id: 'bookings', icon: List, label: 'My Bookings' },
            { id: 'musclemap', icon: Dumbbell, label: 'Target Workouts' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 text-sm font-bold tracking-wide ${
                activeTab === tab.id 
                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/25' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Master Class Schedule</h2>
              <p className="text-sm font-medium text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 hidden md:block">
                Click any class to book instantly
              </p>
            </div>
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="min-w-[700px] relative z-10">
                <WeeklyCalendar key={bookings.length} />
              </div>
            </div>
          </motion.div>
        )}

        {/* SVG Muscle Map View */}
        {activeTab === 'musclemap' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <svg viewBox="0 0 200 400" className="w-64 h-auto drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                {/* Head */}
                <circle cx="100" cy="30" r="20" fill="#3f3f46" />
                
                {/* Chest */}
                <motion.path 
                  d="M 60,60 Q 100,50 140,60 L 130,110 Q 100,120 70,110 Z" 
                  fill={selectedMuscle === 'Chest' ? '#dc2626' : '#27272a'}
                  whileHover={{ fill: '#ef4444', scale: 1.02 }}
                  onClick={() => setSelectedMuscle('Chest')}
                  className="cursor-pointer transition-colors duration-300 origin-center"
                />

                {/* Back (shoulders/traps) */}
                <motion.path 
                  d="M 50,65 Q 100,40 150,65 L 140,75 Q 100,60 60,75 Z" 
                  fill={selectedMuscle === 'Back' ? '#dc2626' : '#27272a'}
                  whileHover={{ fill: '#ef4444', scale: 1.02 }}
                  onClick={() => setSelectedMuscle('Back')}
                  className="cursor-pointer transition-colors duration-300 origin-center"
                />

                {/* Core */}
                <motion.path 
                  d="M 75,115 Q 100,125 125,115 L 120,180 Q 100,190 80,180 Z" 
                  fill={selectedMuscle === 'Core' ? '#dc2626' : '#27272a'}
                  whileHover={{ fill: '#ef4444', scale: 1.02 }}
                  onClick={() => setSelectedMuscle('Core')}
                  className="cursor-pointer transition-colors duration-300 origin-center"
                />

                {/* Arms (Left & Right) */}
                <motion.g onClick={() => setSelectedMuscle('Arms')} className="cursor-pointer origin-center" whileHover={{ scale: 1.02 }}>
                  <path d="M 45,70 L 25,160 L 40,165 L 55,80 Z" fill={selectedMuscle === 'Arms' ? '#dc2626' : '#27272a'} className="transition-colors duration-300" />
                  <path d="M 155,70 L 175,160 L 160,165 L 145,80 Z" fill={selectedMuscle === 'Arms' ? '#dc2626' : '#27272a'} className="transition-colors duration-300" />
                </motion.g>

                {/* Legs (Left & Right) */}
                <motion.g onClick={() => setSelectedMuscle('Legs')} className="cursor-pointer origin-top" whileHover={{ scale: 1.02 }}>
                  <path d="M 80,185 L 60,350 L 85,355 L 98,195 Z" fill={selectedMuscle === 'Legs' ? '#dc2626' : '#27272a'} className="transition-colors duration-300" />
                  <path d="M 120,185 L 140,350 L 115,355 L 102,195 Z" fill={selectedMuscle === 'Legs' ? '#dc2626' : '#27272a'} className="transition-colors duration-300" />
                </motion.g>
              </svg>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {selectedMuscle ? (
                <motion.div key={selectedMuscle} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Target: <span className="text-red-500">{selectedMuscle}</span></h3>
                  <p className="text-zinc-400 mb-8">Select from our curated list of elite movements to fully optimize your {selectedMuscle.toLowerCase()} growth.</p>
                  
                  <div className="space-y-4">
                    {muscleWorkouts[selectedMuscle].map((workout, idx) => (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="p-4 bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 rounded-xl flex items-center justify-between transition-colors cursor-pointer group">
                        <span className="font-bold text-white group-hover:text-red-400 transition-colors">{workout}</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-red-500/20 group-hover:text-red-500">
                          <Dumbbell size={14} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl h-full flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-zinc-500 mb-2">Interactive Muscle Map</h3>
                  <p className="text-zinc-600 max-w-xs mx-auto">Select a muscle group on the model to reveal tailored workouts.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bookings List View */}
        {activeTab === 'bookings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-white mb-4">Your Scheduled Classes</h2>
            {loading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-zinc-900 animate-pulse" />)}
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border border-dashed border-white/10">
                <Calendar className="mx-auto mb-4 text-zinc-800" size={48} />
                <p className="text-zinc-600 text-lg font-medium">No classes booked yet</p>
                <button onClick={() => setActiveTab('calendar')} className="mt-4 text-red-500 hover:text-red-400 text-sm font-semibold">
                  Browse the schedule →
                </button>
              </div>
            ) : (
              <div className="grid gap-3">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between p-4 bg-zinc-900/60 border border-white/5 rounded-xl group hover:border-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-red-600/10 text-red-600">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{booking.className}</h4>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 mt-0.5">
                          <span>{booking.trainer?.name}</span>
                          <span>•</span>
                          <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        {booking.status === 'confirmed' ? (
                          <div className="p-1.5 bg-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <QRCode value={`TICKET-${booking._id}`} size={64} level="H" />
                          </div>
                        ) : booking.status === 'pending' ? (
                          <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-500">
                            <Lock size={20} className="mb-1" />
                            <span className="text-[9px] uppercase font-bold text-center">Awaiting<br/>Approval</span>
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-red-900/20 border border-red-500/20 flex flex-col items-center justify-center text-red-500">
                            <Trash2 size={20} className="mb-1" />
                            <span className="text-[9px] uppercase font-bold text-center">Cancelled</span>
                          </div>
                        )}
                        <span className={`text-[10px] uppercase font-black tracking-widest mt-2 px-2 py-0.5 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                          booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Cancel booking"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
