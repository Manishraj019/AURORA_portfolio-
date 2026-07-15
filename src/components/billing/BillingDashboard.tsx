import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useBillingStore } from '../../store/billingStore';
import { 
  LayoutDashboard, Users, FileText, Settings, ArrowLeft, 
  Plus, DollarSign, Briefcase, Activity, ChevronRight,
  TrendingUp, Clock
} from 'lucide-react';

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'invoices'>('dashboard');
  const { clients, projects, invoices, getProjectRemaining, getProjectTotalPaid } = useBillingStore();

  const totalRevenue = projects.reduce((acc, p) => acc + getProjectTotalPaid(p), 0);
  const totalPending = projects.reduce((acc, p) => acc + getProjectRemaining(p), 0);
  const activeProjects = projects.filter(p => p.status !== 'Closed' && p.status !== 'Delivered').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col gap-8 shrink-0">
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
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
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
            
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>New {activeTab === 'dashboard' ? 'Project' : activeTab.slice(0,-1)}</span>
              </button>
            </div>
          </header>

          {/* TAB CONTENT */}
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

                  {/* Recent Activity placeholder */}
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
                <div className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-xl text-center min-h-[400px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                      <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium">No Invoices Yet</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mb-6">
                      Create a project for a client to start generating professional invoices.
                    </p>
                    <button className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all">
                      Generate Invoice
                    </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
