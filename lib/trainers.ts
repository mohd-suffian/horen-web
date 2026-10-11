export interface Trainer {
  slug: string
  name: string
  spec: string
  photo: string
  categories: string[]
  programmes: string[]
  audience: string[]
}

const FRONTLINE = ['Front Office', 'Housekeeping', 'Sales & Marketing', 'F&B']
const PRODUCTIVITY_AUDIENCE = ['Senior Executives', 'Front Office', 'Revenue / HR Administrative Staff', 'Operations Officers', 'Sales & Marketing', 'F&B']

export const trainers: Trainer[] = [
  { slug: 'coleman-chin', name: 'Coleman Chin', spec: 'Leadership & Coaching, Communication, Team Building', photo: 'coleman-chin.jpg',
    categories: ['Leadership, Supervisory & Coaching Skills', 'Communication Skills', 'Team Building'],
    programmes: ['Strategic Change Leadership for Hotel Executives: Driving Transformation and Resilience', 'Mastering Influence and Persuasion Strategies in Hospitality', 'G.R.E.A.T. Team Building Program: Hotel Leadership Edition (Cross-Generational Collaboration)'],
    audience: ['Senior Management', 'C-Suite Level', 'Middle Managers'] },
  { slug: 'marcus-tioh', name: 'Marcus Tioh', spec: 'Leadership & Coaching, Sales & Marketing, Team Building', photo: 'marcus-tioh.jpg',
    categories: ['Leadership, Supervisory & Coaching Skills', 'Sales & Marketing, Personal Branding, Brand Image', 'Team Building'],
    programmes: ['Leading the Next-Gen Sales Team: Managing Generational Differences, Building Sales Confidence and Driving Hotel Revenue', 'Hospitality Leadership Excellence: Developing Strategic Leaders & Operational Leaders in Hospitality', 'Selling the Luxury Hotel Experience: Turning Every Guest Touchpoint into a Sales Opportunity'],
    audience: ['Senior Management', 'C-Suite Level', 'Middle Managers'] },
  { slug: 'felicia-phuah', name: 'Felicia Phuah', spec: 'Workplace Wellness & EQ, Leadership & Coaching', photo: 'felicia.jpg',
    categories: ['Workplace Wellness, Emotional Intelligence', 'Leadership, Supervisory & Coaching Skills'],
    programmes: ['Leading with EQ: Creating Service with HERO for Hoteliers', 'Mind & Body Detox: De-stress, Recharge, Renew for Hotel Professionals', 'Spot, Support, Refer: Mental Health First Aid for Hotel Team Leaders', 'Coaching Skills for Mental Resilience and Wellness in Hospitality'],
    audience: ['Senior Management', 'C-Suite Level', 'Middle Managers', 'Supervisors', 'Executives'] },
  { slug: 'crystal-lim', name: 'Crystal Lim', spec: 'Personal Branding & LinkedIn for Hospitality', photo: 'crystal-lim.jpg',
    categories: ['Sales & Marketing, Personal Branding, Brand Image'],
    programmes: ['Digital Brand Leadership in Hospitality: Building Influence & B2B Presence on LinkedIn', 'Corporate Branding for Talent Management on LinkedIn (Hotel Leadership / People & Culture Edition)'],
    audience: ['C-Suite Level', 'HR Managers / Directors', 'Sales & Marketing Directors', 'Marcom Managers'] },
  { slug: 'cherrise-tan', name: 'Cherrise Tan', spec: 'Brand Image, Communication Skills', photo: 'cherrise-tan.jpg',
    categories: ['Sales & Marketing, Personal Branding, Brand Image', 'Communication Skills'],
    programmes: ['Level Up Your Brand Image & Business Etiquette for Hotel Industry', 'Elevating Guest Experiences: The Art of Exceptional Communication in Service Excellence for Hoteliers'],
    audience: FRONTLINE },
  { slug: 'rose-mohamed', name: 'Rose Mohamed', spec: 'Professional Image, Grooming & Etiquette', photo: 'rose-mohamed.jpg',
    categories: ['Sales & Marketing, Personal Branding, Brand Image'],
    programmes: ['Pembentukan Imej Profesional dalam Penampilan dan Etika (Professional Image Development: Appearance & Etiquette)', 'The Power of Presence: Elevating Image, Color & Service in Hospitality', 'The Perfect Impression: Grooming & Service Excellence for Hotel & Resort Professionals'],
    audience: FRONTLINE },
  { slug: 'eugene-ng', name: 'Eugene Ng', spec: 'AI, Excel & Productivity Tools', photo: 'eugene-ng.jpg',
    categories: ['Productivity Tools, AI, Excel, Canva'],
    programmes: ['Humanizing AI for Hoteliers: From Guest Experience to AI-Powered Operations', 'AI-Augmented Work Competencies for Hotels: Internal Enablement Program', 'Microsoft Excel (Beginner / Intermediate / Advanced) for Hotel Management Team'],
    audience: PRODUCTIVITY_AUDIENCE },
  { slug: 'dave-leong', name: 'Dave Leong', spec: 'AI for Hotel Operations', photo: 'dave-leong.jpg',
    categories: ['Productivity Tools, AI, Excel, Canva'],
    programmes: ['AI Made Simple for Hotel Management & Essential Operations', 'AI for Hotel Operations'],
    audience: PRODUCTIVITY_AUDIENCE },
  { slug: 'joanne-leow', name: 'Joanne Leow', spec: 'Service Excellence, F&B, Business Dining Etiquette', photo: 'joanne-leow.jpg',
    categories: ['Service Excellence, Front Office, F&B, Housekeeping', 'General Management / Back Office (Operations)'],
    programmes: ['Serving with HEART (Humanity, Empathy, Anticipation, Responsiveness, Transformation)', 'F&B Service and Operational Needs and Wine Serving', 'Social Intelligence and Business Dining Etiquette'],
    audience: FRONTLINE },
  { slug: 'henny-ong', name: 'Henny Ong', spec: 'Service Excellence, Team Building', photo: 'henny-ong.jpg',
    categories: ['Service Excellence, Front Office, F&B, Housekeeping', 'Team Building'],
    programmes: ['Excellent Customer Service for Hotel Industry', 'Together We Are Strong'],
    audience: FRONTLINE },
  { slug: 'mimi-renati', name: 'Mimi Renati', spec: 'Housekeeping Excellence, Guest Service', photo: 'mimi-renati.jpg',
    categories: ['Service Excellence, Front Office, F&B, Housekeeping'],
    programmes: ['Housekeeping Excellence: Elevating Room Quality, Productivity & Guest Experience for Luxury Hotels', 'Handling Difficult Guest Interactions in Hospitality', 'Service Excellence for the New Generations'],
    audience: FRONTLINE },
  { slug: 'kelvin-lai', name: 'Kelvin Lai', spec: 'Service Recovery, F&B Finance & Operations', photo: 'kelvin-lai.jpg',
    categories: ['Service Excellence, Front Office, F&B, Housekeeping', 'General Management / Back Office (Finance, Operations)'],
    programmes: ['Empowering Frontliners: Building Ownership in Every Guest Interaction', 'Confident Service Recovery: Turning Complaints into Loyalty', 'Driving Strategic Profitability: P&L and Financial Skills for F&B Teams'],
    audience: FRONTLINE },
  { slug: 'fakitah-kasa', name: 'Fakitah Kasa', spec: 'Business English, Writing & Presentation Skills', photo: 'fakitah-kasa.jpg',
    categories: ['Communication Skills'],
    programmes: ['The Language of Luxury: English Communication Excellence for Hoteliers', 'Business Writing and Presentation Skills for Hotel Professionals', 'English for Specific Purposes in Hospitality'],
    audience: ['Senior Management', 'Middle Managers', 'Supervisors', 'Executives'] },
  { slug: 'kat-han-teng', name: 'Kat Han Teng', spec: 'HR & Hiring for Hospitality', photo: 'kat-han-teng.jpg',
    categories: ['General Management / Back Office (HR, Operations)'],
    programmes: ['HR for Non-HR Employees in the Hospitality Industry', 'Competency-Based Interviewing Skills for Hiring Managers'],
    audience: ['Senior Management', 'Middle Managers', 'Supervisors', 'Executives'] },
  { slug: 'ernest-balansingam', name: 'Ernest Balansingam', spec: 'PDPA, Cybersecurity & Data Protection', photo: 'ernest-balansingam.jpg',
    categories: ['PDPA, Cybersecurity, Labour Law'],
    programmes: ['The Trust Suite: A Hospitality Guide to the Personal Data Protection Act 2010', 'Personal Data Protection for Hoteliers: Safeguarding Guest Trust in a Digital Era', 'Data Protection Excellence Program for Hotel Leaders'],
    audience: ['Senior Management', 'C-Suite Level', 'IT Managers', 'Supervisors', 'Executives'] },
  { slug: 'dato-shahril', name: "Dato' Shahril", spec: 'Kaizen Leadership & Operations', photo: 'dato-shahril.jpg',
    categories: ['Leadership, Supervisory & Coaching Skills', 'General Management / Back Office (Operations)'],
    programmes: ['Reframing Kaizen for Hotel Leadership Team (Part 1)', 'The Role of a Kaizen Leader (Part 2)', 'Building an Effective Kaizen Organization (Part 3)'],
    audience: ['Senior Management', 'C-Suite Level', 'Middle Managers', 'Operational Heads'] },
]
