import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// === EDITABLE TIMELINE DATA ===
const MILESTONES = [
  { emoji: '❤️', title: 'The day we met', desc: 'Everything changed in that one moment. I just didn\'t know it yet.' },
  { emoji: '📸', title: 'Our first picture together', desc: 'You were smiling. I was trying to pretend I was calm. I wasn\'t.' },
  { emoji: '😂', title: 'First laugh together', desc: 'That laugh made me feel like home.' },
  { emoji: '💡', title: 'The day I realized I loved you', desc: 'It hit me quietly. Like it was always supposed to be.' },
  { emoji: '🌙', title: 'Our late night talks', desc: 'The world felt smaller and warmer when it was just us talking.' },
  { emoji: '🌸', title: 'Our favourite memory', desc: 'I hold this one close. I always will.' },
]

const TimelineCard = ({ item, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-center mb-12 last:mb-0">
      {/* Left card */}
      {isLeft && (
        <motion.div
          className="w-[45%] mr-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="glass-card p-4 text-right">
            <div className="text-2xl mb-1">{item.emoji}</div>
            <h3 className="font-heading text-sm font-semibold mb-1" style={{ color: '#3B2F2F' }}>{item.title}</h3>
            <p className="font-body text-xs leading-relaxed" style={{ color: '#9B7B7B' }}>{item.desc}</p>
          </div>
        </motion.div>
      )}

      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{
            background: 'linear-gradient(135deg, #FF7A9C, #e85d8a)',
            boxShadow: '0 0 20px rgba(255,122,156,0.5)',
          }}
        >
          ❤️
        </div>
      </motion.div>

      {/* Right card */}
      {!isLeft && (
        <motion.div
          className="w-[45%] ml-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="glass-card p-4 text-left">
            <div className="text-2xl mb-1">{item.emoji}</div>
            <h3 className="font-heading text-sm font-semibold mb-1" style={{ color: '#3B2F2F' }}>{item.title}</h3>
            <p className="font-body text-xs leading-relaxed" style={{ color: '#9B7B7B' }}>{item.desc}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export const StorySection = () => {
  return (
    <section id="story" className="relative py-20 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Chapter One</p>
          <h2 className="section-heading">
            Our <span>Story</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line" />
          {MILESTONES.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
