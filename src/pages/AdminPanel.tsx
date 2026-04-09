import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Shield, Calendar, UserPlus, Trash2, Users, BookOpen, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

type Tab = 'analytics' | 'bookings' | 'trainers' | 'classes';

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [bookings, setBookings] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTrainer, setNewTrainer] = useState({ name: '', specialization: '', bio: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const [bRes, tRes, cRes] = await Promise.all([
        axios.get('http://localhost:5000/api/bookings', config),
        axios.get('http://localhost:5000/api/trainers'),
        axios.get('http://localhost:5000/api/classes'),
      ]);
      setBookings(bRes.data);
      setTrainers(tRes.data);
      setClasses(cRes.data);
    } catch {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const addTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post('http://localhost:5000/api/trainers', newTrainer, config);
      toast.success('Trainer added!');
      setNewTrainer({ name: '', specialization: '', bio: '' });
      fetchAll();
    } catch { toast.error('Failed to add trainer'); }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, { status }, config);
      toast.success(`Booking ${status}`);
      fetchAll();
    } catch { toast.error('Failed to update status'); }
  };

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const tabs = [
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3, count: 0 },
    { id: 'bookings' as Tab, label: 'Bookings', icon: Calendar, count: bookings.length },
    { id: 'trainers' as Tab, label: 'Trainers', icon: Users, count: trainers.length },
    { id: 'classes' as Tab, label: 'Classes', icon: BookOpen, count: classes.length },
  ];

  // Prepare Analytics Data
  const statusData = [
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#eab308' },
    { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#22c55e' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' },
  ].filter(d => d.value > 0);

  // Group bookings by class
  const classBookings = bookings.reduce((acc, b) => {
    acc[b.className] = (acc[b.className] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const barData = Object.keys(classBookings).map(key => ({ name: key, bookings: classBookings[key] }));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-xl">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
            <p className="text-zinc-500 text-sm">Manage ITALIYA Gym operations</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Active Trainers', value: trainers.length, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Weekly Classes', value: classes.length, icon: BookOpen, color: 'text-red-500', bg: 'bg-red-500/10' },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={stat.color} size={22} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-zinc-500 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-zinc-900/80 border border-white/5 rounded-xl w-fit">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all text-sm font-semibold ${
                activeTab === tab.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:text-white'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-zinc-800'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="h-64 rounded-2xl bg-zinc-900 animate-pulse" />
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-6">Booking Status Distribution</h3>
                  <div className="h-72">
                    {statusData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5}>
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-zinc-500">No bookings data available</div>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-6">Demand by Class</h3>
                  <div className="h-72">
                    {barData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                          <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                          <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }} />
                          <Bar dataKey="bookings" fill="#dc2626" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-zinc-500">No bookings data available</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-900 text-zinc-500 text-xs uppercase tracking-wider">
                        <th className="px-5 py-4">Member</th>
                        <th className="px-5 py-4">Class</th>
                        <th className="px-5 py-4">Trainer</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.length === 0 ? (
                        <tr><td colSpan={5} className="px-5 py-12 text-center text-zinc-600">No bookings yet</td></tr>
                      ) : bookings.map((b: any) => (
                        <tr key={b._id} className="hover:bg-zinc-900/30 transition-colors text-sm">
                          <td className="px-5 py-4 font-medium text-white">{b.user?.name || 'N/A'}</td>
                          <td className="px-5 py-4 text-zinc-300">{b.className}</td>
                          <td className="px-5 py-4 text-zinc-400">{b.trainer?.name || 'N/A'}</td>
                          <td className="px-5 py-4 text-zinc-500">{new Date(b.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {b.status === 'pending' && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Pending</span>
                              )}
                              {b.status === 'confirmed' && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">Confirmed</span>
                              )}
                              {b.status === 'cancelled' && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">Cancelled</span>
                              )}
                              
                              {b.status === 'pending' && (
                                <div className="flex items-center gap-2">
                                  <button onClick={() => updateBookingStatus(b._id, 'confirmed')} className="px-3 py-1 bg-green-600/20 hover:bg-green-600/40 text-green-500 rounded-lg text-xs font-medium transition-all">Approve</button>
                                  <button onClick={() => updateBookingStatus(b._id, 'cancelled')} className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-500 rounded-lg text-xs font-medium transition-all">Reject</button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TRAINERS TAB */}
            {activeTab === 'trainers' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainers.map((t: any) => (
                    <div key={t._id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">{t.name[0]}</div>
                          <h4 className="font-bold text-white">{t.name}</h4>
                        </div>
                        <p className="text-sm text-zinc-400 ml-10">{t.specialization}</p>
                        {t.bio && <p className="text-xs text-zinc-600 mt-1 ml-10 line-clamp-2">{t.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="p-6 rounded-2xl bg-zinc-900 border border-red-600/20">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <UserPlus size={18} className="text-red-500" />
                      Add Trainer
                    </h3>
                    <form onSubmit={addTrainer} className="space-y-3">
                      {[
                        { key: 'name', placeholder: 'Full Name' },
                        { key: 'specialization', placeholder: 'e.g. Yoga & Pilates' },
                      ].map(f => (
                        <input key={f.key} placeholder={f.placeholder} required
                          className="w-full bg-black border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-600/50"
                          value={(newTrainer as any)[f.key]}
                          onChange={e => setNewTrainer({...newTrainer, [f.key]: e.target.value})}
                        />
                      ))}
                      <textarea placeholder="Brief bio (optional)" rows={3}
                        className="w-full bg-black border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-red-600/50"
                        value={newTrainer.bio}
                        onChange={e => setNewTrainer({...newTrainer, bio: e.target.value})}
                      />
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-colors text-sm">
                        Register Trainer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* CLASSES TAB */}
            {activeTab === 'classes' && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-500">Showing all {classes.length} scheduled weekly classes</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((c: any) => (
                    <div key={c._id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                          <h4 className="font-bold text-white text-sm">{c.name}</h4>
                        </div>
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{DAYS[c.dayOfWeek]}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mb-3">{c.trainer?.name} · {c.trainer?.specialization}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{c.startTime} – {c.endTime}</span>
                        <span>Cap: {c.capacity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </div>
    </div>
  );
}
