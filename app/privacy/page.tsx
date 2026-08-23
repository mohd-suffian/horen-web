const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, phone number, company name and any details submitted through our contact, enquiry and trainer recruitment forms. We may also collect basic usage data (such as pages visited) to help us improve our website.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use the information collected to respond to enquiries, prepare training proposals, process trainer applications, and communicate updates about our programmes. We do not sell or rent your personal data to third parties.',
  },
  {
    title: 'Data Protection',
    body: 'HOREN Training Sdn Bhd is committed to protecting personal data in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia. We implement reasonable administrative and technical safeguards to protect your information from unauthorised access, alteration or disclosure. Data is retained only for as long as necessary to fulfil the purposes it was collected for.',
  },
  {
    title: 'Cookies',
    body: 'Our website may use cookies to improve site functionality and understand how visitors use our pages. You can disable cookies through your browser settings, though some features of the site may not function as intended.',
  },
  {
    title: 'Third Party Links',
    body: 'Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those external sites, and encourage you to review their privacy policies separately.',
  },
  {
    title: 'Contact Us',
    body: 'If you have questions about this Privacy Policy or wish to exercise your rights under the PDPA (including access to or correction of your personal data), please contact us at hello@horen.com.my or 012 430 5054.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-white/70 text-base">Last updated: August 2026</p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 flex flex-col gap-10">
        <p className="text-gray-500 leading-relaxed">
          HOREN Training Sdn Bhd (&ldquo;HOREN&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy and is
          committed to protecting the personal data you share with us. This Privacy Policy explains what
          information we collect, how we use it, and your rights under Malaysian law.
        </p>
        {sections.map(s => (
          <div key={s.title}>
            <h2 className="font-serif text-2xl text-dark mb-3">{s.title}</h2>
            <p className="text-gray-500 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
