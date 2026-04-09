import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { toast } from 'sonner';
import { Star, MessageSquare, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TrainersPage() {
  const { user } = useAuth();
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/trainers');
      setTrainers(res.data);
    } catch {
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async () => {
    if (!user) return toast.error('Please log in to rate trainers');
    if (rating === 0) return toast.error('Please select a rating');
    setSubmitting(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`http://localhost:5000/api/trainers/${selectedTrainer._id}/rate`, { score: rating, comment }, config);
      toast.success('Rating submitted successfully!');
      setSelectedTrainer(null);
      setRating(0);
      setComment('');
      fetchTrainers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const getAvgRating = (ratings: any[]) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.score, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 uppercase">Elite <span className="text-red-600">Trainers</span></h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Train with the best. Browse our master trainers, read their specialties, and see what our community says.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-96 rounded-3xl bg-zinc-900 border border-white/5 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <motion.div
                key={trainer._id}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedTrainer(trainer)}
                className="group cursor-pointer rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 overflow-hidden transition-all hover:bg-zinc-800/60 hover:shadow-2xl hover:shadow-red-600/10 hover:border-white/10"
              >
                <div className="h-64 bg-zinc-800 relative">
                  {trainer.image ? (
                    <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 font-black text-6xl uppercase tracking-tighter bg-zinc-900">
                      {trainer.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2">
                    <div className="flex bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-yellow-500 font-bold items-center gap-1.5 text-sm">
                      <Star size={14} className="fill-current" />
                      {getAvgRating(trainer.ratings)} <span className="text-zinc-500 font-normal">({trainer.ratings?.length || 0})</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-white group-hover:text-red-500 transition-colors">{trainer.name}</h3>
                  <p className="text-zinc-500 text-sm font-semibold uppercase tracking-widest mt-1 mb-4 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-red-500" /> {trainer.specialization}
                  </p>
                  <p className="text-zinc-400 text-sm line-clamp-3">{trainer.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Rating Modal */}
        <AnimatePresence>
          {selectedTrainer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedTrainer(null); setRating(0); setComment(''); }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
              >
                <div className="relative h-40 bg-zinc-800">
                  {selectedTrainer.image && <img src={selectedTrainer.image} className="w-full h-full object-cover opacity-50" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  <button onClick={() => { setSelectedTrainer(null); setRating(0); setComment(''); }} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors">
                    <X size={16} />
                  </button>
                  <div className="absolute bottom-0 left-6 translate-y-1/2 flex items-end gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-zinc-800 border-4 border-zinc-900 overflow-hidden flex-shrink-0">
                      {selectedTrainer.image ? (
                        <img src={selectedTrainer.image} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-red-500 font-bold text-3xl">{selectedTrainer.name.charAt(0)}</div>
                      )}
                    </div>
                    <div className="mb-2 bg-black/80 px-4 py-2 rounded-xl backdrop-blur-md">
                      <h3 className="text-xl font-bold text-white leading-none">{selectedTrainer.name}</h3>
                      <span className="text-xs text-red-500 uppercase font-black">{selectedTrainer.specialization}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-16">
                  {user ? (
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-zinc-400 mb-3 block">Your Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star
                                size={32}
                                className={rating >= star ? 'text-yellow-500 fill-current drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'text-zinc-700'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-semibold text-zinc-400 mb-2 block flex items-center gap-2">
                          <MessageSquare size={16} /> Leave a Review
                        </label>
                        <textarea
                          placeholder="How was your training experience?"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent min-h-[120px] resize-none"
                        />
                      </div>

                      <button
                        onClick={submitRating}
                        disabled={submitting || rating === 0}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? 'Submitting...' : 'Post Review'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-zinc-400 text-lg">Please sign in to rate trainers and leave reviews.</p>
                    </div>
                  )}
                  
                  {/* Past Reviews Preview */}
                  {selectedTrainer.ratings?.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-white/5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Recent Reviews</h4>
                      <div className="space-y-4">
                        {selectedTrainer.ratings.map((r: any, i: number) => (
                          <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-1 mb-2 text-yellow-500 text-xs">
                               {[...Array(r.score)].map((_, idx) => <Star key={idx} size={10} className="fill-current" />)}
                            </div>
                            <p className="text-zinc-300 text-sm italic">"{r.comment || 'No written feedback'}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
