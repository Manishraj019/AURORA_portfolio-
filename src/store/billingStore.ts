import { useState, useEffect } from 'react';

export type ProjectStatus = 'Discussion' | 'Started' | 'In Progress' | 'Revision' | 'Completed' | 'Delivered' | 'Closed';
export type PaymentStatus = 'Paid' | 'Partially Paid' | 'Pending';

export interface PaymentEntry {
  id: string;
  amount: number;
  date: string;
  method: string;
  transactionId: string;
  notes: string;
}

export interface Client {
  id: string;
  name: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  clientId: string;
  projectName: string;
  description: string;
  totalCost: number;
  advanceReceived: number;
  expectedDeliveryDate: string;
  status: ProjectStatus;
  payments: PaymentEntry[];
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientId: string;
  date: string;
  dueDate: string;
  status: PaymentStatus;
  terms: string;
}

const STORAGE_KEY = 'aurora_billing_data';

export const useBillingStore = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setClients(parsed.clients || []);
        setProjects(parsed.projects || []);
        setInvoices(parsed.invoices || []);
      } catch (e) {
        console.error('Failed to parse billing data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ clients, projects, invoices }));
    }
  }, [clients, projects, invoices, isLoaded]);

  const addClient = (client: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'payments'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      payments: [],
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const addPayment = (projectId: string, payment: Omit<PaymentEntry, 'id'>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          payments: [...p.payments, { ...payment, id: crypto.randomUUID() }]
        };
      }
      return p;
    }));
  };

  const getProjectRemaining = (project: Project) => {
    const paidViaPayments = project.payments.reduce((sum, p) => sum + p.amount, 0);
    return project.totalCost - project.advanceReceived - paidViaPayments;
  };

  const getProjectTotalPaid = (project: Project) => {
    return project.advanceReceived + project.payments.reduce((sum, p) => sum + p.amount, 0);
  };

  return {
    clients,
    projects,
    invoices,
    addClient,
    addProject,
    addPayment,
    getProjectRemaining,
    getProjectTotalPaid
  };
};
