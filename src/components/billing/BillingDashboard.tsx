import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBillingStore } from '../../store/billingStore';
import { 
  LayoutDashboard, Users, FileText, ArrowLeft, 
  Plus, DollarSign, Briefcase, Activity, TrendingUp, Clock,
  Lock, KeyRound, Download, Printer
} from 'lucide-react';

const ADMIN_PIN = '0000'; // Extremely simple for this demo, usually should be hashed or env var

export default function BillingDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'invoices'>('dashboard');
  const { clients, projects, invoices, getProjectRemaining, getProjectTotalPaid } = useBillingStore();

  const totalRevenue = projects.reduce((acc, p) => acc + getProjectTotalPaid(p), 0);
  const totalPending = projects.reduce((acc, p) => acc + getProjectRemaining(p), 0);
  const activeProjects = projects.filter(p => p.status !== 'Closed' && p.status !== 'Delivered').length;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] flex items-center justify-center p-6 font-sans">
        <button onClick={() => window.location.hash = ''} className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-violet-500/10 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Admin Access Required</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Please enter the security PIN to access the billing and CRM dashboard.</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (Hint: 0000)"
                  className="w-full bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  autoFocus
                />
              </div>
              {pinError && <p className="text-red-500 text-xs text-left mt-2 pl-2">Incorrect PIN. Please try again.</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white font-sans flex flex-col md:flex-row print:bg-white print:text-black">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col gap-8 shrink-0 print:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg">Billing OS</span>
          </div>
          <button 
            onClick={() => window.location.hash = ''}
            className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'clients', icon: Users, label: 'Clients & Projects' },
            { id: 'invoices', icon: FileText, label: 'Invoices' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden md:block">
          <button 
            onClick={() => window.location.hash = ''}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all w-full"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto print:p-0 print:overflow-visible">
        
        {/* Printable Invoice Container - Only visible when printing */}
        <div className="hidden print:block w-full max-w-4xl mx-auto p-12">
          <div className="flex justify-between items-start mb-12">
             <div>
                <h1 className="text-4xl font-black text-black tracking-tight">ΛURORΛ</h1>
                <p className="text-sm text-gray-500 tracking-widest mt-1">STUDIO & ENGINEERING</p>
             </div>
             <div className="text-right">
                <h2 className="text-3xl font-light text-gray-400 mb-2">INVOICE</h2>
                <p className="font-bold">INV-2026-0001</p>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
             </div>
          </div>

          <div className="flex justify-between mb-12">
             <div>
                <p className="text-sm text-gray-500 font-bold mb-1">BILLED TO:</p>
                <p className="font-bold">Example Client Name</p>
                <p className="text-sm text-gray-600">Company Brand LLC</p>
                <p className="text-sm text-gray-600">client@example.com</p>
             </div>
             <div className="text-right">
                <p className="text-sm text-gray-500 font-bold mb-1">PROJECT:</p>
                <p className="font-bold">Custom Web Platform</p>
                <p className="text-sm text-gray-600">Due Date: Net 30</p>
             </div>
          </div>

          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-3 font-bold text-gray-600">Description</th>
                <th className="py-3 font-bold text-gray-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4">Web Application Development - Phase 1</td>
                <td className="py-4 text-right">₹50,000</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4">Premium UI/UX Design System</td>
                <td className="py-4 text-right">₹25,000</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mb-16">
            <div className="w-1/2">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹75,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Advance Paid:</span>
                <span className="text-emerald-600">-₹25,000</span>
              </div>
              <div className="flex justify-between py-4 text-xl font-bold">
                <span>Balance Due:</span>
                <span>₹50,000</span>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p className="mb-1">Thank you for your business!</p>
            <p>Payment is required within 30 days of issue. Please include invoice number on your check or transfer.</p>
          </div>
        </div>

        {/* Dashboard UI - Hidden when printing */}
        <div className="max-w-6xl mx-auto space-y-8 print:hidden">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">
                {activeTab === 'dashboard' && 'Welcome back, Admin'}
                {activeTab === 'clients' && 'Client Management'}
                {activeTab === 'invoices' && 'Invoices & Payments'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Manage your agency workflow and revenue efficiently.
              </p>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Revenue', value: \`₹\${totalRevenue.toLocaleString()}\`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                      { label: 'Pending Payments', value: \`₹\${totalPending.toLocaleString()}\`, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                      { label: 'Active Projects', value: activeProjects, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                      { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className={\`w-10 h-10 rounded-xl \${stat.bg} \${stat.color} flex items-center justify-center\`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <TrendingUp className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl flex flex-col items-center justify-center text-center min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                      <Activity className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium">No recent activity</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                      When you add clients, projects, or payments, they will appear here in your activity feed.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'clients' && (
                <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl text-center min-h-[400px] flex flex-col items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                      <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium">No Clients Yet</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mb-6">
                      Start building your CRM by adding your first client.
                    </p>
                    <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all">
                      Add New Client
                    </button>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div className="space-y-6">
                  <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                          <FileText className="w-8 h-8 text-violet-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">INV-2026-0001</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Example Client • Custom Web Platform</p>
                          <div className="flex gap-4 mt-3">
                            <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md font-medium">Pending: ₹50,000</span>
                            <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md font-medium">Paid: ₹25,000</span>
                          </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 md:flex-none px-5 py-3 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 md:flex-none px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Save as PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
