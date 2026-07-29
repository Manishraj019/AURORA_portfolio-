import clientsData from './clients.json';

export interface Client {
  id: string;
  name: string;
  image: string; // URL to logo or photo (e.g., /clients/logo1.png)
  website: string;
  review: string;
  rating: number; // 1-5
  category?: string; // Optional tag, e.g., 'Restaurant', 'Hospitality'
}

export const clients: Client[] = clientsData as Client[];
