// Add the logo file to public/images/clients/, then set `logo` here. No logo = text name shown.
// Logos are transparent PNGs on a 600x200 canvas (the padding is part of the file).

export interface Client {
  name: string
  group: 'hospitality' | 'corporate'
  logo?: string
}

export const clients: Client[] = [
  { name: 'The Ruma Hotel & Residences',      group: 'hospitality', logo: 'the-ruma.png' },
  { name: 'Sunway Hotel Putra KL',             group: 'hospitality', logo: 'sunway-hotel-putra.png' },
  { name: 'St. Giles Hotels',                  group: 'hospitality', logo: 'st-giles.png' },
  { name: 'Meliá Kuala Lumpur',                 group: 'hospitality', logo: 'melia.png' },
  { name: 'Holiday Villa Hotels & Resorts',     group: 'hospitality', logo: 'holiday-villa.png' },
  { name: 'SKS Hospitality',                    group: 'hospitality', logo: 'sks-hospitality.png' },
  { name: 'Starwood Hotels & Resorts',          group: 'hospitality', logo: 'starwood.png' },
  { name: 'Sunway Hotel Big Box',               group: 'hospitality', logo: 'sunway-hotel-big-box.png' },
  { name: 'Weststar Aviation Services',         group: 'corporate',   logo: 'weststar-aviation.png' },
  { name: 'Marrybrown',                         group: 'corporate',   logo: 'marrybrown.png' },
  { name: 'RHB Bank',                           group: 'corporate',   logo: 'rhb-bank.png' },
  { name: 'MIDA',                               group: 'corporate',   logo: 'mida.png' },
  { name: 'F-Secure',                           group: 'corporate',   logo: 'f-secure.png' },
]

/** Same clients, reordered for the marquee so the two Sunway logos and the gold/dark logos are not adjacent, and hospitality/corporate alternate. */
export const stripOrder: Client[] = [
  'The Ruma Hotel & Residences',
  'RHB Bank',
  'Sunway Hotel Putra KL',
  'Marrybrown',
  'St. Giles Hotels',
  'MIDA',
  'Meliá Kuala Lumpur',
  'F-Secure',
  'Holiday Villa Hotels & Resorts',
  'Weststar Aviation Services',
  'SKS Hospitality',
  'Starwood Hotels & Resorts',
  'Sunway Hotel Big Box',
].map(name => clients.find(c => c.name === name)!)
