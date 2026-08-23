import Link from 'next/link'

const categories = [
  {
    name: 'Leadership and Supervisory Skills',
    count: 6,
    desc: 'For hotel executives, supervisors and department heads.',
    programmes: [
      'Strategic Change Leadership for Hotel Executives: Driving Transformation & Resilience [2Days]',
      'Integrity-Driven Leadership for Corporate Success [2Days]',
      'Mastering Hotel Operations: Supervisor Development Program [2Days]',
      'Hotel Supervisory Skills Development Program: Effective Supervision, Elevate Success [2Days]',
      'Reframing Kaizen for Hotel Leadership Team (Part 1) [1Day]',
      'Cross Collaborative Management Mindset (For Stronger Team Bonding & Higher Productivity) [2Days]',
    ],
  },
  {
    name: 'Communication Skills',
    count: 6,
    desc: 'Influence, persuasion, presentation and Mandarin for hoteliers.',
    programmes: [
      'Mastering Influence and Persuasion Strategies in Hospitality [2Days]',
      'Present Like a Pro: Practical Tools to Captivate Any Audience [2Days]',
      'Enhancing Workplace Success Through Effective Communication [2Days]',
      'Critical Thinking, Problem Solving & Enhancing Workplace Communication [2Days]',
      'Business Communication in Hospitality [1Day]',
      'Mandarin for Hotel Industry Professionals [1Day]',
    ],
  },
  {
    name: 'Team Building',
    count: 7,
    desc: 'Cross-generational collaboration, cinematic synergy, GREAT and BUILD formats.',
    programmes: [
      'G.R.E.A.T. Team Building Program - Hotel Leadership Edition (Cross Generational Collaboration) [HalfDay]',
      'B.U.I.L.D Team Building Program: Strengthening People, Powering Performance [2Days]',
      'GREAT Teambuilding Program: Capture the Moment [3Days]',
      'Cinematic Synergy Teambuilding for Hotel Middle Managers [2Days]',
      'MISSION Q Team Building Program – Hotel Leadership Edition [Halfday]',
      'Together We Are Strong [2Days]',
      'I W.A.N.T (Inspiring Winning Attitude & Transformation) Teambuilding Program [2Days]',
    ],
  },
  {
    name: 'AI, Excel and Productivity Tools',
    count: 12,
    desc: 'AI for hotel operations, Excel payroll, Canva, time management.',
    programmes: [
      'AI for Hotel Operations [1Day or 2Days]',
      'AI Made Simple for Hotel Management & Essential Operations [1Day or 2Days]',
      'Excel for Payroll Management (1Day Intensive)',
      'Excel for Payroll Management (2Days Comprehensive Program)',
      'AI Made Simple: Humanizing AI for Hoteliers [1Day]',
      'Microsoft Excel (Beginner and Intermediate) [2Days]',
      'Microsoft Excel (Advanced) [2Days]',
      'AI Made Simple: Humanizing AI for the Modern Workplace [1Day]',
      'Effective Prompting & Responsible Use of Generative AI for Enterprise Teams [1Day]',
      'AI-Augmented Work Competencies for Hotels: Internal Enablement Program [2Days]',
      'Humanizing AI for Hoteliers – From Guest Experience to AI-Powered Operations [2Days]',
      'Time Management for Peak Performance [1Day]',
    ],
  },
  {
    name: 'Workplace Wellness and EQ',
    count: 7,
    desc: 'Emotional intelligence, mental health first aid, EQ in the age of AI.',
    programmes: [
      'Emotional Intelligence (EQ) For the Workplace [1Day]',
      'Eat Well, Think Better, Live Stronger [1Day]',
      'Mind Detox: Reset, Recharge, Renew for Workplace Professionals [1Day]',
      'Leading with EQ – Staying Agile in the VUCA Environment [2Days]',
      'Leading with EQ in the Age of AI [2Days]',
      'Leading with EQ: Creating Service with HERO for Hoteliers [2Days]',
      'Spot, Support, Refer: Mental Health First Aid for Hotel Managers [1Day]',
    ],
  },
  {
    name: 'PDPA, Cybersecurity and Labour Law',
    count: 3,
    desc: 'Data protection, anti-sexual harassment.',
    programmes: [
      'Personal Data Protection for Hoteliers: Safeguarding Guest Trust in a Digital Era [1Day]',
      'Data Protection Excellence Program for Hotel Leaders [2Days]',
      'Creating a Safe & Respectful Workplace: Anti-Sexual Harassment Workshop [1Day]',
    ],
  },
  {
    name: 'Service Excellence, F&B and Housekeeping',
    count: 10,
    desc: 'Guest engagement, VIP services, F&B mastery, ABC housekeeping.',
    programmes: [
      'The Art of Exceptional Communication in Service Excellence for Hotelier [1Day]',
      'Hospitality Masterclass: Crafting 5 Star Moments Experiential Workshop [1Day]',
      'Hotel F&B Guest Engagement Mastery: Service Excellence Practical Workshop [2Days]',
      'Leading the Moment of Truth: Service Recovery, Guest Emotions & Crisis Awareness [2Days]',
      'Mastering Service Excellence, Guest Engagement, and Service Recovery for Hotel Professionals [2Days]',
      'Delivering Excellence with Dignity: VIP Services & Malaysian Protocol Awareness [2Days]',
      'ABC for Housekeeping: Building Consistency, Cleanliness & Guest Confidence [2Days]',
      'Excellence in F&B Service – Practical Restaurant Mastery Workshop [1Day]',
      'Empowering Frontliners: Building Ownership in Every Guest Interaction [2Days]',
      'Beyond Service: Creating Memorable Dining Experience [1Day]',
    ],
  },
  {
    name: 'Sales, Marketing and Brand Image',
    count: 11,
    desc: 'Grooming, NLP, revenue management, digital brand leadership.',
    programmes: [
      'The Signature Look & Service Touch: Grooming, Etiquette & Guest Relations For 5-Star Hospitality [2Days]',
      'Level Up Your Brand Image & Business Etiquette for Hotel Industry [1Day]',
      'Digital Brand Leadership in Hospitality: Building Influence & Presence [1Day]',
      'ALPHA Sales Strategy for Hospitality Professionals [2Days]',
      'NLP for Hospitality Excellence (with a Focus on Sales & Marketing) [2Days]',
      'Sales for Non-Sales: Service Excellence Masterclass for Hoteliers [2Days]',
      'Next-Gen Hotel Sales Leadership & Revenue Management [2Days]',
      'Building High-Performing Sales Teams for Sustainable Revenue Growth [2Days]',
      'Pembentukan Imej Profesional dalam Penampilan dan Etika (Professional Image Development: Appearance & Etiquette) [2Days]',
      'The Power of Presence: Elevating Image, Color & Service in Hospitality [1Day]',
      'The Perfect Impression: Grooming & Service Excellence for Hotel & Resort Professionals [1Day]',
    ],
  },
]

export default function ProgrammesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A45] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9A84C] mb-3">
            2026/27 Training Catalogue
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            60+ programmes across 8 categories
          </h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            All programmes are HRD Corp claimable under SBL-Khas. Delivered in-house at your property or in combined cohorts.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <h2 className="font-serif text-2xl text-dark leading-snug">{c.name}</h2>
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-[#C9A84C] bg-[#0F2A45] rounded-full px-2.5 py-1">
                  {c.count}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-5">{c.desc}</p>

              <ul className="flex flex-col gap-2 mb-6">
                {c.programmes.slice(0, 4).map((p) => (
                  <li key={p} className="text-sm text-gray-600 leading-snug pl-3 border-l-2 border-gray-100">
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto text-sm font-semibold text-[#C9A84C] hover:opacity-80 self-start"
              >
                View programmes →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#0F2A45] py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-white text-xl font-serif">
            Can&apos;t find what you need? We customise programmes for your property.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-[#C9A84C] text-[#0F2A45] font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Get a free proposal
          </Link>
        </div>
      </div>
    </div>
  )
}
