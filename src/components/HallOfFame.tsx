import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star, X } from 'lucide-react';
import { clients, Client } from '../data/clients';

export default function HallOfFame() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  return (
    <section className="min-h-screen pt-[120px] pb-32 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center text-center space-y-6 mb-16"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-violet-500"></span>
          <span className="text-xs tracking-[0.2em] uppercase text-violet-600 dark:text-indigo-400 font-bold">
            Success Stories
          </span>
          <span className="h-px w-8 bg-violet-500"></span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.05] text-slate-950 dark:text-white max-w-3xl">
          HALL OF <span className="font-medium italic bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">FAME</span>
        </h1>

        <p className="font-sans text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Showcasing the incredible brands and businesses that have partnered with AURORA to elevate their operations, digital presence, and growth.
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client: Client, idx: number) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedClient(client)}
            className="group relative flex flex-col h-full bg-slate-900/5 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] backdrop-blur-sm cursor-pointer"
          >
            {/* Image container */}
            <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
              <img 
                src={client.image} 
                alt={`${client.name} photo`} 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 z-0"
              />
              {client.category && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-wider text-white font-medium">
                    {client.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content container */}
            <div className="flex flex-col flex-grow p-6 md:p-8 space-y-6">
              
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {client.name}
                </h3>
                <a 
                  href={client.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/20 transition-colors"
                  title="Visit Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(client.rating) ? 'fill-amber-400 text-amber-400' : (i < client.rating ? 'fill-amber-400 text-amber-400 opacity-50' : 'text-slate-300 dark:text-slate-700')}`}
                  />
                ))}
              </div>

              <blockquote className="flex-grow font-sans text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">
                {client.review}
              </blockquote>
              
            </div>

            {/* Bottom glowing border effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Modal for full client details */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#090a0f] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 bg-black/40 flex items-center justify-center p-8 min-h-[300px] md:min-h-full border-b md:border-b-0 md:border-r border-white/5">
                <img 
                  src={selectedClient.image} 
                  alt={selectedClient.name} 
                  className="max-w-full max-h-[40vh] md:max-h-[80vh] object-contain rounded-xl drop-shadow-2xl"
                />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                {selectedClient.category && (
                  <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-violet-500/20 text-violet-300 text-xs uppercase tracking-widest font-bold w-max border border-violet-500/30">
                    {selectedClient.category}
                  </span>
                )}
                
                <h3 className="font-display text-3xl md:text-5xl font-black text-white mb-3">
                  {selectedClient.name}
                </h3>
                
                <a 
                  href={selectedClient.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors mb-8 text-sm font-medium w-max"
                >
                  <ExternalLink size={16} />
                  {selectedClient.website.replace(/^https?:\/\//, '')}
                </a>

                <div className="flex gap-1 mb-10">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(selectedClient.rating) ? 'fill-amber-400 text-amber-400' : (i < selectedClient.rating ? 'fill-amber-400 text-amber-400 opacity-50' : 'text-slate-800')}`}
                    />
                  ))}
                </div>

                <div className="flex-grow">
                  <div className="h-px w-12 bg-violet-500/50 mb-6"></div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Client Testimonial</h4>
                  <p className="font-sans text-lg md:text-xl leading-relaxed text-slate-300 italic">
                    "{selectedClient.review}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
