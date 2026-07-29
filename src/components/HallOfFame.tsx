import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';
import { clients, Client } from '../data/clients';

export default function HallOfFame() {
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
            className="group relative flex flex-col h-full bg-slate-900/5 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] backdrop-blur-sm"
          >
            {/* Image container */}
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img 
                src={client.image} 
                alt={`${client.name} photo`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
      
    </section>
  );
}
