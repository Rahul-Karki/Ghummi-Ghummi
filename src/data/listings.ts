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

// Placeholder images - replace with actual assets
const placeholder = (id: string) =>
  `https://picsum.photos/seed/${id}/400/300`;

export const LISTINGS: Listing[] = [
  { id: 'oasis', name: 'Oasis', type: 'House', guests: 5, price: '$$$', match: 95, rating: 4.96, image: placeholder('oasis') },
  { id: 'cozy', name: 'Cozy Den', type: 'House', guests: 4, price: '$$', match: 91, rating: 4.78, image: placeholder('cozy') },
  { id: 'garden', name: 'Garden Escape', type: 'House', guests: 3, price: '$$', match: 87, rating: 4.89, image: placeholder('garden') },
  { id: 'coastal', name: 'Coastal Villa', type: 'Villa', guests: 4, price: '$$$', match: 83, rating: 4.62, image: placeholder('coastal') },
  { id: 'wilderness', name: 'Wilderness Escape', type: 'Camping', guests: 2, price: '$', match: 79, rating: 4.94, image: placeholder('wilderness') },
  { id: 'seaside', name: 'Seaside Resort', type: 'Hotel', guests: 2, price: '$$$', match: 74, rating: 4.45, image: placeholder('seaside') },
  { id: 'urban', name: 'Urban Retreat', type: 'House', guests: 8, price: '$$$', match: 70, rating: 4.81, image: placeholder('urban') },
  { id: 'ocean', name: 'Ocean Vista', type: 'Hotel', guests: 2, price: '$$$', match: 66, rating: 4.73, image: placeholder('ocean') },
  { id: 'tiny', name: 'Tiny Home', type: 'Cabin', guests: 2, price: '$', match: 62, rating: 4.92, image: placeholder('tiny') },
  { id: 'bunk', name: 'Shared Bunk Room', type: 'House', guests: 1, price: '$', match: 57, rating: 3.87, image: placeholder('bunk') },
  { id: 'mountain', name: 'Mountain Lodge', type: 'Cabin', guests: 4, price: '$', match: 53, rating: 4.65, image: placeholder('mountain') },
  { id: 'grand', name: 'Grand Marr', type: 'Hotel', guests: 4, price: '$$$', match: 48, rating: 4.55, image: placeholder('grand') },
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

export const DECK_IMAGES = [
  placeholder('deck1'),
  placeholder('deck2'),
  placeholder('deck3'),
  placeholder('deck4'),
];
