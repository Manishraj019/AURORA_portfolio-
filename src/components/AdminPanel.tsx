import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, Loader2, Lock, Trash2, Edit2, LogOut, Plus } from 'lucide-react';
import { clients as initialClients } from '../data/clients';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Local Settings
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('GITHUB_TOKEN') || '');
  const [showSettings, setShowSettings] = useState(false);
  
  // Login State
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [clients, setClients] = useState(initialClients);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingClient, setEditingClient] = useState<any>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('5');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Network State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1923') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid password. Try again.');
    }
  };

  const resetForm = () => {
    setName('');
    setWebsite('');
    setReview('');
    setRating('5');
    setCategory('');
    setImageFile(null);
    setImagePreview(null);
    setEditingClient(null);
    setStatus(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      let imageBase64 = '';
      let imageName = '';

      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
        imageName = imageFile.name;
      }

      const action = editingClient ? 'edit' : 'add';

      const payload = {
        action,
        id: editingClient?.id,
        password,
        githubToken,
        name,
        website,
        review,
        rating,
        category,
        imageBase64,
        imageName,
        existingImage: editingClient?.image
      };

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to submit data');

      setStatus({ type: 'success', message: data.message });
      
      // Update local state
      if (action === 'add') {
        setClients([...clients, data.client]);
      } else {
        setClients(clients.map(c => c.id === data.client.id ? data.client : c));
      }

      setTimeout(() => {
        setView('list');
        resetForm();
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete ${clientName}? This will instantly update the live site.`)) return;
    
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id, password, githubToken }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete client');

      setClients(clients.filter(c => c.id !== id));
      alert('Client deleted successfully! Vercel is now deploying the updated site.');
    } catch (err: any) {
      alert(`Error deleting client: ${err.message}`);
    }
  };

  const handleEditClick = (client: any) => {
    setEditingClient(client);
    setName(client.name);
    setWebsite(client.website || '');
    setReview(client.review);
    setRating(client.rating.toString());
    setCategory(client.category);
    setImagePreview(client.image);
    setView('form');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <form onSubmit={handleLogin} className="relative z-10 w-full max-w-sm glass-panel border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
              <Lock className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">Admin Login</h1>
            <p className="text-slate-400 text-sm font-sans">Enter the admin password to continue.</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#0d0e12]/80 border border-slate-800 text-white p-4 rounded-xl focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
              required
            />
            {loginError && <p className="text-red-400 text-sm font-sans text-center">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-xl transition-all"
            >
              Access Admin Panel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-2">
              ADMIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">PANEL</span>
            </h1>
            <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed">
              Manage Hall of Fame clients. Any changes made here are pushed directly to GitHub and automatically deployed to Vercel.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-lg text-sm font-bold font-sans transition-all"
            >
              Settings
            </button>
            <button 
              onClick={() => {
                if (view === 'form') {
                  setView('list');
                  resetForm();
                } else {
                  setView('form');
                }
              }}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-lg text-sm font-bold font-sans transition-all"
            >
              {view === 'list' ? <><Plus className="w-4 h-4" /> Add New Client</> : 'Back to Dashboard'}
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center justify-center w-10 h-10 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="mb-8 glass-panel border border-violet-500/50 bg-violet-500/10 rounded-2xl p-6">
            <h3 className="font-display text-xl font-bold mb-2 text-white">Admin Settings</h3>
            <p className="text-slate-400 text-sm font-sans mb-4">
              To bypass Vercel Environment Variables, you can save your GitHub Personal Access Token directly in your browser. This will securely authorize changes.
            </p>
            <div className="flex gap-4">
              <input 
                type="password"
                value={githubToken}
                onChange={(e) => {
                  setGithubToken(e.target.value);
                  localStorage.setItem('GITHUB_TOKEN', e.target.value);
                }}
                placeholder="ghp_..."
                className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-violet-500 outline-none font-mono text-sm"
              />
              <button 
                onClick={() => setShowSettings(false)}
                className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-lg transition-all"
              >
                Save Token
              </button>
            </div>
          </div>
        )}

        {view === 'list' ? (
          /* Dashboard List View */
          <div className="glass-panel border border-slate-800/60 rounded-3xl overflow-hidden backdrop-blur-xl bg-[#0d0e12]/60 p-6">
            <div className="grid gap-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={client.image} alt={client.name} className="w-12 h-12 rounded-xl object-cover bg-slate-900 border border-white/10" />
                    <div>
                      <h3 className="font-bold text-white font-display text-lg">{client.name}</h3>
                      <p className="text-xs text-violet-400 font-mono tracking-widest uppercase">{client.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditClick(client)}
                      className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10"
                      title="Edit Client"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(client.id, client.name)}
                      className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                      title="Delete Client"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <div className="text-center py-12 text-slate-500 font-sans">
                  No clients in the Hall of Fame yet.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Form View (Add/Edit) */
          <div className="glass-panel border border-slate-800/60 rounded-3xl p-8 backdrop-blur-xl bg-[#0d0e12]/60">
            <div className="mb-8 border-b border-slate-800 pb-6">
              <h2 className="font-display text-2xl font-bold">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Client Name *</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" placeholder="e.g. Gourmet Kitchen" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Category *</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" placeholder="e.g. Restaurant" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Website URL</label>
                    <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none" placeholder="https://" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Rating (1-5) *</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="4.5">4.5 Stars</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Client Logo/Image {editingClient ? '' : '*'}</label>
                    <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-violet-500 transition-colors bg-slate-900/30 group">
                      <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required={!editingClient && !imageFile} />
                      {imagePreview ? (
                        <div className="relative h-32 w-full">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <span className="text-white text-sm font-bold">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 flex flex-col items-center justify-center text-slate-500 group-hover:text-violet-400 transition-colors">
                          <Upload className="w-8 h-8 mb-2" />
                          <span className="text-sm">Click or drag image to upload</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Review / Testimonial *</label>
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} required rows={4} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none" placeholder="What did the client say?" />
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {status && (
                <div className={`p-4 rounded-xl flex items-center gap-3 font-sans font-bold text-sm ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : null}
                  {status.message}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold font-sans text-lg transition-all flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...</> : editingClient ? 'Save Changes' : 'Add Client'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
