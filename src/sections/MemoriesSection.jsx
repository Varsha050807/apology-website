import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

// === EDITABLE MEMORIES DATA ===
const MEMORIES = [
  { id: 1, src: "/images/memory1.jpeg", caption: "The day everything felt perfect." },
  { id: 2, src: "/images/memory2.jpeg", caption: "My favourite smile." },
  { id: 3, src: "/images/memory3.jpeg", caption: "I still replay this day." },
  { id: 4, src: "/images/memory4.jpeg", caption: "I wish I could go back." },
  { id: 5, src: "/images/memory5.jpeg", caption: "You were glowing that day." },
  { id: 6, src: "/images/memory6.jpeg", caption: "This one made me feel everything." },
  { id: 7, src: "/images/memory7.jpeg", caption: "A moment frozen in time." },
  { id: 8, src: "/images/memory8.jpeg", caption: "The world was so quiet here." },
  { id: 9, src: "/images/memory9.jpeg", caption: "Pure happiness." },
  { id: 10, src: "/images/memory10.jpeg", caption: "My heart was so full." },
];

const FullscreenGallery = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex)

  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrent(p => Math.min(p + 1, images.length - 1))
      if (e.key === 'ArrowLeft') setCurrent(p => Math.max(p - 1, 0))
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [images.length, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'rgba(10, 5, 5, 0.96)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white text-3xl z-10 w-10 h-10 flex items-center justify-center"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="flex flex-col items-center px-4 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={images[current].src}
            alt={images[current].caption}
            className="w-full rounded-3xl object-cover max-h-[70vh]"
            style={{ aspectRatio: '3/4' }}
          />
          <p className="font-body text-sm mt-4 text-center" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {images[current].caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-6 mt-6">
        <button
          onClick={() => setCurrent(p => Math.max(p - 1, 0))}
          disabled={current === 0}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{ background: 'rgba(255,255,255,0.1)', color: current === 0 ? 'rgba(255,255,255,0.2)' : 'white' }}
        >
          ←
        </button>
        <span className="text-white font-body text-sm self-center opacity-60">
          {current + 1} / {images.length}
        </span>
        <button
          onClick={() => setCurrent(p => Math.min(p + 1, images.length - 1))}
          disabled={current === images.length - 1}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{ background: 'rgba(255,255,255,0.1)', color: current === images.length - 1 ? 'rgba(255,255,255,0.2)' : 'white' }}
        >
          →
        </button>
      </div>
    </motion.div>
  )
}

export const MemoriesSection = () => {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (index) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  return (
    <section id="memories" className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF9F8 0%, #FFF4E6 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Gallery</p>
          <h2 className="section-heading">Our <span>Memories</span></h2>
          <p className="font-body text-sm mt-3" style={{ color: '#9B7B7B' }}>Swipe to relive every moment</p>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{ rotate: 20, stretch: 0, depth: 100, modifier: 1.5, slideShadows: false }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {MEMORIES.map((mem, i) => (
              <SwiperSlide
                key={mem.id}
                style={{ width: 260 }}
                onClick={() => openGallery(i)}
              >
                <motion.div
                  className="cursor-pointer"
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className="rounded-3xl overflow-hidden"
                    style={{
                      boxShadow: '0 20px 60px rgba(255,122,156,0.15), 0 8px 25px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={mem.src}
                      alt={mem.caption}
                      className="w-full object-cover"
                      style={{ aspectRatio: '3/4', width: '100%' }}
                    />
                  </div>
                  <motion.div
                    className="mt-3 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-body text-xs italic" style={{ color: '#9B7B7B' }}>{mem.caption}</p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <p className="text-center font-body text-xs mt-2" style={{ color: '#C9A8B8' }}>
          Tap any photo to view fullscreen 📷
        </p>
      </div>

      {/* Fullscreen gallery */}
      <AnimatePresence>
        {galleryOpen && (
          <FullscreenGallery
            images={MEMORIES}
            startIndex={galleryIndex}
            onClose={() => setGalleryOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
