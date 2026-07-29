import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    review: '',
    rating: '5',
    category: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      
      if (imageFile) {
        data.append('image', imageFile);
      } else {
        setStatus('error');
        setErrorMessage('Image is required');
        return;
      }

      const response = await fetch('/api/clients', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to save client');
      }

      setStatus('success');
      setFormData({
        name: '',
        website: '',
        review: '',
        rating: '5',
        category: '',
      });
      setImageFile(null);
      
      // Reset form
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <section className="min-h-screen pt-[120px] pb-32 px-6 md:px-12 w-full max-w-3xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center text-center space-y-6 mb-12"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-violet-500"></span>
          <span className="text-xs tracking-[0.2em] uppercase text-violet-600 dark:text-indigo-400 font-bold">
            Content Management
          </span>
          <span className="h-px w-8 bg-violet-500"></span>
        </div>
        <h1 className="font-display text-4xl font-extralight tracking-tight text-slate-950 dark:text-white">
          LOCAL <span className="font-medium italic bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">ADMIN</span>
        </h1>
        <p className="font-sans text-slate-500 dark:text-slate-400 text-sm">
          Add new clients to the Hall of Fame. Changes will be saved locally. Remember to commit and push to Vercel after adding!
        </p>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="w-full bg-slate-900/5 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-2xl p-8 space-y-6 backdrop-blur-sm"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Client Name *</label>
            <input 
              required
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
              placeholder="e.g. Gourmet Kitchen"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</label>
            <input 
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
              placeholder="e.g. Restaurant"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Website URL</label>
          <input 
            type="url" 
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
            placeholder="https://"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Rating</label>
            <select 
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors appearance-none"
            >
              <option value="5">5 Stars</option>
              <option value="4.5">4.5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Client Logo/Image *</label>
            <div className="relative">
              <input 
                id="image-upload"
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label 
                htmlFor="image-upload"
                className="w-full flex items-center justify-center gap-2 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 border-dashed rounded-lg px-4 py-3 text-slate-600 dark:text-slate-400 cursor-pointer hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm truncate">
                  {imageFile ? imageFile.name : 'Choose an image...'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Review / Testimonial *</label>
          <textarea 
            required
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none"
            placeholder="What did the client say?"
          ></textarea>
        </div>

        {/* Status Messages */}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-2 text-emerald-500 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span>Client successfully added to the Hall of Fame!</span>
          </div>
        )}

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full py-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold tracking-wide shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          {status === 'submitting' ? 'SAVING...' : 'ADD CLIENT'}
        </button>

      </motion.form>
    </section>
  );
}
