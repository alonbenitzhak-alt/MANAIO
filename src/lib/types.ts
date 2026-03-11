export interface Property {
  id: string;
  title: string;
  country: string;
  city: string;
  price: number;
  expected_roi: number;
  bedrooms: number;
  property_type: string;
  description: string;
  images: string[];
  agent_name: string;
  agent_email: string;
  status?: "active" | "closed";
  created_at?: string;
}

export interface Lead {
  id?: string;
  property_id: string;
  name: string;
  email: string;
  phone: string;
  investment_budget: string;
  message: string;
  created_at?: string;
}

export interface Country {
  slug: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}
