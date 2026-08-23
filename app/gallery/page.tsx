const images = [
  'Featured Session',
  'Team Building',
  'Award Night',
  'Workshop',
  'Group Training',
  'Hotel Visit',
  'F&B Training',
  'Leadership Session',
  'Sunway Hotel',
  'MIDA Event',
  'SKS Session',
  'Holiday Villa',
]

export default function GalleryPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#1A8C8C] py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Training Gallery</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            In the room with our clients.
          </p>
        </div>
      </div>

      {/* Image grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {images.map(label => (
            <div
              key={label}
              className="aspect-square rounded-xl bg-[#F7F8FA] border border-gray-100 flex items-end p-4"
            >
              <p className="text-xs font-semibold text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
