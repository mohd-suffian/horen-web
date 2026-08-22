import Link from 'next/link'

export default function CtaBlock() {
  return (
    <section className="bg-teal py-20 px-6 md:px-10 text-center">
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-snug">
        Ready to train your team?
      </h2>
      <p className="text-white/78 text-base mb-9 max-w-sm mx-auto leading-relaxed">
        Let&apos;s build a programme tailored to your organisation&apos;s goals —
        get a proposal in 48 hours.
      </p>
      <Link
        href="/contact"
        className="inline-block bg-white text-teal font-bold text-base px-9 py-3.5 rounded-[7px] hover:bg-white/90 transition-colors"
      >
        Get in touch
      </Link>
    </section>
  )
}
