import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Clock, User, X, CheckCircle, Users } from 'lucide-react';

interface GymClass {
  _id: string;
  name: string;
  trainer: { _id: string; name: string; specialization: string };
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  capacity: number;
  color: string;
  description: string;
}

interface Booking {
  _id: string;
  trainer: { _id: string };
  className: string;
  date: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getTopPercent(startTime: string) {
  const startMinutes = timeToMinutes(startTime);
  const gridStart = timeToMinutes('06:00');
  return ((startMinutes - gridStart) / 60) * 100;
}

function getHeightPercent(startTime: string, endTime: string) {
  const diff = timeToMinutes(endTime) - timeToMinutes(startTime);
  return (diff / 60) * 100;
}

export default function WeeklyCalendar() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  
  // Generate 14 rolling dates starting from today
  const rollingDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const selectedDate = rollingDates[selectedDateIndex];
  const targetDayOfWeek = selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = user ? { headers: { Authorization: `Bearer ${user.token}` } } : {};
      const [classesRes, bookingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/classes'),
        user ? axios.get('http://localhost:5000/api/bookings/mybookings', config) : Promise.resolve({ data: [] }),
      ]);
      setClasses(classesRes.data);
      setMyBookings(bookingsRes.data);
    } catch {
      toast.error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const isBooked = (cls: GymClass) => {
    return myBookings.some(b => b.className === cls.name && b.trainer?._id === cls.trainer?._id);
  };

  const isPastClass = (cls: GymClass) => {
    if (selectedDateIndex > 0) return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return timeToMinutes(cls.startTime) <= currentMinutes;
  };

  const handleBook = async (cls: GymClass) => {
    if (!user) return toast.error('Please sign in to book a class');
    if (isPastClass(cls)) return toast.error('Cannot book a past class');
    if (isBooked(cls)) return toast.info('Already booked!');
    setBooking(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      const classDate = new Date(selectedDate);
      const [h, m] = cls.startTime.split(':');
      classDate.setHours(parseInt(h), parseInt(m), 0, 0);

      await axios.post('http://localhost:5000/api/bookings', {
        trainer: cls.trainer._id,
        className: cls.name,
        date: classDate.toISOString(),
      }, config);
      toast.success(`🎉 Booked ${cls.name}!`);
      setSelectedClass(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 mt-4">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="min-w-[80px] h-20 rounded-2xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const selectedDayClasses = classes.filter(c => c.dayOfWeek === targetDayOfWeek)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  return (
    <div className="relative">
      {/* Horizontal Day Scroller */}
      <div className="flex gap-3 w-full overflow-x-auto pb-6 scrollbar-hide snap-x">
        {rollingDates.map((date, i) => {
          const isSelected = selectedDateIndex === i;
          const isToday = i === 0;
          const dayName = DAYS[date.getDay() === 0 ? 6 : date.getDay() - 1];
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDateIndex(i)}
              className={`flex-shrink-0 snap-start flex flex-col items-center justify-center min-w-[90px] h-[90px] rounded-[1.25rem] transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-xl shadow-red-600/30 text-white scale-105' 
                  : 'bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 border border-white/5'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-red-200' : 'text-zinc-500'}`}>
                {dayName.slice(0, 3)}
              </span>
              <span className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {date.getDate()}
              </span>
              {isToday && (
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-red-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Classes List */}
      <div className="space-y-4 min-h-[300px]">
        {selectedDayClasses.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-white/10 bg-black/20">
            <Clock className="mx-auto mb-4 text-zinc-700" size={48} />
            <p className="text-zinc-500 text-lg font-medium">No classes scheduled for this day</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {selectedDayClasses.map((cls, i) => {
              const booked = isBooked(cls);
              const past = isPastClass(cls);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  key={cls._id}
                  onClick={() => !past && setSelectedClass(cls)}
                  className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-xl transition-all flex flex-col md:flex-row md:items-center justify-between p-5 ${past ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-800/60 hover:shadow-2xl'}`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: past ? '#555' : cls.color }} />
                  
                  <div className="flex items-center gap-6 md:w-1/3">
                    <div className="text-center min-w-[70px]">
                      <div className="text-lg font-black text-white">{cls.startTime}</div>
                      <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{cls.endTime}</div>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-bold text-white mb-1 transition-colors ${!past && 'group-hover:text-red-400'}`}>{cls.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <User size={14} className="text-zinc-500" />
                        {cls.trainer?.name} <span className="text-zinc-600">•</span> {cls.trainer?.specialization}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 md:w-1/3">
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <div className="flex items-center gap-1.5 text-zinc-400 bg-black/20 px-3 py-1.5 rounded-full">
                        <Users size={14} className="text-zinc-500" />
                        Cap {cls.capacity}
                      </div>
                      {past ? (
                        <div className="flex items-center gap-1.5 text-zinc-500 bg-zinc-500/10 px-3 py-1.5 rounded-full border border-zinc-500/20">
                          <CheckCircle size={14} />
                          Passed
                        </div>
                      ) : booked ? (
                        <div className="flex items-center gap-1.5 text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                          <CheckCircle size={14} />
                          Booked
                        </div>
                      ) : null}
                    </div>
                    
                    {!past && (
                      <button className="hidden md:flex h-10 w-10 rounded-full bg-white/5 items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Class Detail Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedClass.color }} />
                  <h3 className="text-xl font-bold text-white">{selectedClass.name}</h3>
                </div>
                <button onClick={() => setSelectedClass(null)} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <p className="text-zinc-400 text-sm mb-5">{selectedClass.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <User size={16} className="text-zinc-500" />
                  <span className="text-zinc-300">{selectedClass.trainer?.name}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500">{selectedClass.trainer?.specialization}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-zinc-500" />
                  <span className="text-zinc-300">{selectedClass.startTime} – {selectedClass.endTime}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-zinc-500" />
                  <span className="text-zinc-300">Capacity: {selectedClass.capacity} members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-zinc-500">📅</span>
                  </div>
                  <span className="text-zinc-300">Every {DAYS[selectedClass.dayOfWeek]}</span>
                </div>
              </div>

              {isBooked(selectedClass) ? (
                <div className="w-full py-3 rounded-xl bg-green-600/20 border border-green-600/30 text-green-500 font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle size={18} />
                  Already Booked
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBook(selectedClass)}
                  disabled={booking}
                  className="w-full py-3 rounded-xl font-bold text-white transition-all disabled:opacity-60"
                  style={{ backgroundColor: selectedClass.color }}
                >
                  {booking ? 'Booking...' : `Book ${selectedClass.name}`}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
