export interface Client {
  id: string;
  name: string;
  image: string; // URL to logo or photo (e.g., /clients/logo1.png)
  website: string;
  review: string;
  rating: number; // 1-5
  category?: string; // Optional tag, e.g., 'Restaurant', 'Hospitality'
}

/**
 * HALL OF FAME - CLIENT DATA
 * 
 * To add a new client to the Hall of Fame page:
 * 1. Add a new object to the `clients` array below.
 * 2. Fill in the required fields: id, name, image, website, review, and rating.
 * 3. Add any images to the `public/clients/` folder so they can be referenced easily (e.g., `/clients/my-logo.png`).
 * 
 * The page will automatically update to display the new entry.
 */
export const clients: Client[] = [
  {
    id: 'example-client-1',
    name: 'Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    website: 'https://example.com/gourmet',
    review: '"Aurora transformed our digital presence. Our QR ordering system and new website look absolutely phenomenal. Highly recommended!"',
    rating: 5,
    category: 'Restaurant'
  },
  {
    id: 'example-client-2',
    name: 'Elevate Studios',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    website: 'https://example.com/elevate',
    review: '"The team at Aurora built an incredible booking platform for us that scaled flawlessly. Best decision we made this year."',
    rating: 5,
    category: 'Creative Agency'
  },
  {
    id: 'example-client-3',
    name: 'Prime Burger Co.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    website: 'https://example.com/prime',
    review: '"Their RestaurantOS saved us so much time on inventory and billing. The interface is stunning and the customers love it."',
    rating: 4.5,
    category: 'Hospitality'
  }
];
