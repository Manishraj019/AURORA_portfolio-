export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  accentColor: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  specs: {
    architecture: string;
    protocols: string;
    aiEngine: string;
  };
}

export interface DemoFormData {
  // Step 1: Product Selection
  productId: string;
  
  // Step 2: Business Details
  companyName: string;
  websiteUrl: string;
  monthlyTraffic: string;
  techStack: string;
  industryVertical: string;
  teamSize: string;
  
  // Step 3: Contact Details
  fullName: string;
  workEmail: string;
  roleTitle: string;
  linkedinUrl: string;
  preferredDateTime: string;
}

export interface BackgroundVideoOption {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface BackdropPreset {
  id: string;
  name: string;
  url: string;
  opacity: number;
  brightness: number;
}

