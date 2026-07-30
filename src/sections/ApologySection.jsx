import { motion } from 'framer-motion'
import { useRef } from 'react'

// === EDITABLE APOLOGY TEXT ===
const APOLOGY_PARAGRAPHS = [
  "I know I hurt you.",
  "Maybe not intentionally...",
  "but I know your pain was real.",
  "If I could take everything back...",
  "I would.",
  "Not because I'm scared of losing you...",
  "but because I hate being the reason you're hurting.",
  "You deserve so much better from me.",
  "And I promise...\nI'm trying to become that person.",
]

export const ApologySection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF4E6 0%, #FFF9F8 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>From the heart</p>
          <h2 className="section-heading">
            I'm <span>Sorry.</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="glass-card p-8 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative heart */}
          <motion.div
            className="absolute top-4 right-6 text-4xl opacity-10 select-none"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ❤️
          </motion.div>

          <div className="space-y-4">
            {APOLOGY_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                className="font-body leading-relaxed whitespace-pre-line"
                style={{
                  color: i === 4 ? '#FF7A9C' : '#5C3D3D',
                  fontSize: i === 4 ? '1.25rem' : '1rem',
                  fontWeight: i === 4 ? 600 : 400,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Bottom line */}
          <motion.div
            className="mt-8 pt-6 flex items-center gap-3"
            style={{ borderTop: '1px solid rgba(255,218,221,0.5)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="text-2xl">❤️</div>
            <p className="font-body text-sm italic" style={{ color: '#9B7B7B' }}>
              This comes from the deepest part of me.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
