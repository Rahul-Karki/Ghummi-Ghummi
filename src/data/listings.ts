export type PropertyType = 'House' | 'Hotel' | 'Villa' | 'Cabin' | 'Camping' | 'Resort';
export type Price = '$' | '$$' | '$$$';

export type Listing = {
  id: string;
  name: string;
  type: PropertyType;
  guests: number;
  price: Price;
  match: number;
  rating: number;
  image: string;
};

// High-quality curated Unsplash images for each property type
const IMAGES: Record<string, string> = {
  oasis: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop',
  cozy: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop',
  garden: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85&auto=format&fit=crop',
  coastal: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85&auto=format&fit=crop',
  wilderness: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=85&auto=format&fit=crop',
  seaside: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&auto=format&fit=crop',
  urban: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85&auto=format&fit=crop',
  ocean: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format&fit=crop',
  tiny: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=85&auto=format&fit=crop',
  bunk: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85&auto=format&fit=crop',
  mountain: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=1200&q=85&auto=format&fit=crop',
  grand: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85&auto=format&fit=crop',
};

export const LISTINGS: Listing[] = [
  { id: 'oasis', name: 'The Alibaug House', type: 'House', guests: 5, price: '$$$', match: 95, rating: 4.96, image: IMAGES.oasis },
  { id: 'cozy', name: 'Bandra Bay Retreat', type: 'House', guests: 4, price: '$$', match: 91, rating: 4.78, image: IMAGES.cozy },
  { id: 'garden', name: 'Coonoor Garden Stay', type: 'House', guests: 3, price: '$$', match: 87, rating: 4.89, image: IMAGES.garden },
  { id: 'coastal', name: 'Goa Coast Villa', type: 'Villa', guests: 4, price: '$$$', match: 83, rating: 4.62, image: IMAGES.coastal },
  { id: 'wilderness', name: 'Rishikesh Riverside Camp', type: 'Camping', guests: 2, price: '$', match: 79, rating: 4.94, image: IMAGES.wilderness },
  { id: 'seaside', name: 'Kovalam Beach Resort', type: 'Hotel', guests: 2, price: '$$$', match: 74, rating: 4.45, image: IMAGES.seaside },
  { id: 'urban', name: 'Indiranagar Retreat', type: 'House', guests: 8, price: '$$$', match: 70, rating: 4.81, image: IMAGES.urban },
  { id: 'ocean', name: 'Pondicherry Vista', type: 'Hotel', guests: 2, price: '$$$', match: 66, rating: 4.73, image: IMAGES.ocean },
  { id: 'tiny', name: 'Manali Cedar Cabin', type: 'Cabin', guests: 2, price: '$', match: 62, rating: 4.92, image: IMAGES.tiny },
  { id: 'bunk', name: 'Varkala Surf House', type: 'House', guests: 1, price: '$', match: 57, rating: 3.87, image: IMAGES.bunk },
  { id: 'mountain', name: 'Mussoorie Mountain Lodge', type: 'Cabin', guests: 4, price: '$', match: 53, rating: 4.65, image: IMAGES.mountain },
  { id: 'grand', name: 'Udaipur Palace Hotel', type: 'Hotel', guests: 4, price: '$$$', match: 48, rating: 4.55, image: IMAGES.grand },
];

export const COORDS: Record<string, [number, number]> = {
  oasis: [37.7849, -122.4094],
  cozy: [37.7649, -122.4294],
  garden: [37.7942, -122.4194],
  coastal: [37.7705, -122.447],
  wilderness: [37.799, -122.466],
  seaside: [37.809, -122.414],
  urban: [37.7849, -122.435],
  ocean: [37.758, -122.408],
  tiny: [37.767, -122.452],
  bunk: [37.778, -122.397],
  mountain: [37.791, -122.4555],
  grand: [37.761, -122.425],
};

// High-res deck images for card stack hero
export const DECK_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=90&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=90&auto=format&fit=crop',
];
