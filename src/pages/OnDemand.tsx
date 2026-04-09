import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Info, Volume2, ListPlus } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  match: string;
  description: string;
  videoId: string; // YouTube ID for the active player
}

const CATEGORIES = [
  {
    title: 'Trending Now',
    videos: [
      { id: 't1', title: 'Ultimate Core Crusher', thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', duration: '15m', match: '98%', description: 'A relentless 15-minute ab circuit guaranteed to sculpt your core.', videoId: 'v7AYKMP6rOE' },
      { id: 't2', title: 'HIIT Cardio Burn', thumbnail: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80', duration: '30m', match: '95%', description: 'High-intensity interval training designed to maximize calorie burn.', videoId: 'ml6cT4AZdqI' },
      { id: 't3', title: 'Upper Body Power', thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', duration: '45m', match: '92%', description: 'Build serious upper body strength with this dumbbell masterclass.', videoId: 'qWy_aFP14o0' },
      { id: 't4', title: 'Morning Flow Yoga', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', duration: '20m', match: '89%', description: 'Wake up your muscles and find your center with this fluid morning yoga routine.', videoId: 'v7sn-dEnshY' },
      { id: 't5', title: 'Kettlebell Mastery', thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80', duration: '40m', match: '99%', description: 'Learn advanced kettlebell mechanics for explosive full-body power.', videoId: 'G0xBja-I6vM' },
    ]
  },
  {
    title: 'Yoga & Recovery',
    videos: [
      { id: 'y1', title: 'Deep Stretch Release', thumbnail: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=800&q=80', duration: '25m', match: '97%', description: 'Melt away tension and improve flexibility with these deep holds.', videoId: 'sTANio_2E0Q' },
      { id: 'y2', title: 'Vinyasa Flow', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', duration: '50m', match: '91%', description: 'A challenging, sweat-inducing flow that links breath to movement.', videoId: 'b1H3xO3x_Js' },
      { id: 'y3', title: 'Active Recovery', thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', duration: '15m', match: '88%', description: 'Perfect for rest days. Keep the blood flowing without overtaxing muscles.', videoId: 'L_xrDAtykMI' },
      { id: 'y4', title: 'Meditation & Breath', thumbnail: 'https://images.unsplash.com/photo-1528715602058-29be3d75c96b?auto=format&fit=crop&w=800&q=80', duration: '10m', match: '99%', description: 'Lower your cortisol levels and find mental clarity.', videoId: 'inpok4MKVLM' },
      { id: 'y5', title: 'Post-Workout Mobility', thumbnail: 'https://images.unsplash.com/photo-1552196563-552592596440?auto=format&fit=crop&w=800&q=80', duration: '12m', match: '94%', description: ' Essential mobility work to prevent injury after heavy lifting.', videoId: 'q2NbiJ3B_jU' },
    ]
  },
  {
    title: 'High Intensity (HIIT)',
    videos: [
      { id: 'h1', title: 'Tabata Torch', thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', duration: '20m', match: '96%', description: '20 seconds on, 10 seconds off. Maximum effort for maximum results.', videoId: 'M0uO8X3_tEA' },
      { id: 'h2', title: 'Sprint Intervals', thumbnail: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80', duration: '30m', match: '90%', description: 'Take your cardio to the next level with explosive sprint intervals.', videoId: 'ml6cT4AZdqI' },
      { id: 'h3', title: 'No Equipment Shred', thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', duration: '35m', match: '93%', description: 'Bodyweight only. You don\'t need weights to get a killer workout.', videoId: 'UBMk30rjy0o' },
      { id: 'h4', title: 'Plyo Power', thumbnail: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80', duration: '25m', match: '87%', description: 'Enhance your athletic performance with explosive jumping movements.', videoId: 'CBWQGb4LyAM' },
    ]
  }
];

export default function OnDemand() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const heroVideo = CATEGORIES[0].videos[0]; // Spotlight the first trending video

  return (
    <div className="min-h-screen bg-[#141414] text-white pt-20 pb-20 overflow-x-hidden">
      
      {/* Hero Banner (Netflix Style) */}
      <div className="relative h-[70vh] w-full mb-12">
        <div className="absolute inset-0">
          <img 
            src={heroVideo.thumbnail} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-1/4 left-8 md:left-16 max-w-2xl z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="text-red-600 font-black tracking-[0.2em] text-sm md:text-base uppercase mb-4 block drop-shadow-lg">
              Italiya Original
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-2xl">
              {heroVideo.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl font-medium drop-shadow-md">
              {heroVideo.description}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveVideo(heroVideo)}
                className="flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                <Play className="fill-current" size={24} /> Play
              </button>
              <button className="flex items-center gap-2 bg-zinc-500/50 backdrop-blur-md text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-zinc-500/70 transition-colors">
                <Info size={24} /> More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Carousels */}
      <div className="space-y-12">
        {CATEGORIES.map((category, catIndex) => (
          <div key={category.title} className="pl-8 md:pl-16 relative z-20">
            <h2 className="text-2xl font-bold mb-4 text-zinc-100">{category.title}</h2>
            
            <div className="flex gap-4 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x" style={{ paddingRight: '4rem' }}>
              {category.videos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  className="relative flex-shrink-0 snap-start w-64 md:w-80 rounded-xl overflow-visible cursor-pointer z-10"
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onClick={() => setActiveVideo(video)}
                  whileHover={{ scale: 1.05, zIndex: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden shadow-xl">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Hover Expansion Card (Netflix style drop-down info) */}
                  <AnimatePresence>
                    {hoveredVideo === video.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="absolute inset-0 top-full pt-4 w-full pointer-events-none"
                      >
                        <div className="bg-[#181818] p-4 rounded-b-xl shadow-2xl border border-zinc-800">
                          <div className="flex items-center gap-3 mb-3">
                            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black pointer-events-auto hover:scale-110 transition-transform">
                              <Play size={14} className="fill-current pointer-events-none ml-1" />
                            </button>
                            <button className="w-8 h-8 border-2 border-zinc-500 rounded-full flex items-center justify-center text-white pointer-events-auto hover:border-white transition-colors">
                              <ListPlus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold mb-2">
                            <span className="text-green-500">{video.match} Match</span>
                            <span className="border border-zinc-600 px-1 text-zinc-400">HD</span>
                            <span>{video.duration}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{video.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-2">{video.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Fullscreen Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.15)] relative border border-white/5 mx-4">
              {/* Replace with actual video player logic, using a youtube iframe for demo */}
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
