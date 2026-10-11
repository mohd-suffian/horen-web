import Link from 'next/link'
import { categories, totalProgrammesRounded, textColorFor } from '@/lib/programmes'
import CategoryBanner from '@/components/ui/CategoryBanner'

export default function ProgrammesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 mb-3">
            2026/27 Training Catalogue
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            {totalProgrammesRounded}+ programmes across {categories.length} categories
          </h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            All programmes are HRD Corp claimable under SBL-Khas. Delivered in-house at your property or in combined cohorts.
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c) => {
            const textColor = textColorFor(c)
            return (
              <div
                key={c.slug}
                id={c.slug}
                className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col scroll-mt-20"
              >
                <CategoryBanner icon={c.icon} count={c.count} image={c.image} colors={c.colors} title={c.name} titleAs="h2" size="page" />
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-sm text-gray-500 mb-5">{c.desc}</p>

                  <ul className="flex flex-col gap-2 mb-2">
                    {c.programmes.slice(0, 4).map((p) => (
                      <li
                        key={p}
                        className="text-sm text-gray-600 leading-snug pl-3 border-l-2"
                        style={{ borderColor: c.colors.from }}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  {c.programmes.length > 4 && (
                    <details className="mt-2 group">
                      <summary
                        className="text-sm font-semibold hover:opacity-80 cursor-pointer list-none"
                        style={{ color: textColor }}
                      >
                        View all {c.programmes.length} programmes →
                      </summary>
                      <ul className="flex flex-col gap-2 mt-3">
                        {c.programmes.slice(4).map((p) => (
                          <li
                            key={p}
                            className="text-sm text-gray-600 leading-snug pl-3 border-l-2"
                            style={{ borderColor: c.colors.from }}
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#1A8C8C] py-14 px-6 md:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-white text-xl font-serif">
            Can&apos;t find what you need? We customise programmes for your property.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-white text-[#1A8C8C] font-semibold text-sm px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
          >
            Get a free proposal
          </Link>
        </div>
      </div>
    </div>
  )
}
