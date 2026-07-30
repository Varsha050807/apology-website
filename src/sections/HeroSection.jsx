import { useState } from 'react'
import { motion } from 'framer-motion'

export const HeroSection = () => {
  const [heartBurst, setHeartBurst] = useState(false)

  const handleOpen = () => {
    setHeartBurst(true)
    setTimeout(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
      setHeartBurst(false)
    }, 800)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF9F8 0%, #FFF4E6 40%, #FADADD 100%)' }}
    >
      {/* Decorative rings */}
      <motion.div
        className="absolute rounded-full border border-pink-100 opacity-30"
        style={{ width: 400, height: 400 }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full border border-pink-200 opacity-20"
        style={{ width: 280, height: 280 }}
        animate={{ scale: [1, 0.95, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="section-container relative z-10 text-center px-6">
        {/* Large heart */}
        <motion.div
          className="text-8xl mb-6 select-none"
          animate={{
            scale: [1, 1.12, 1, 1.08, 1],
            filter: heartBurst
              ? ['drop-shadow(0 0 40px rgba(255,122,156,1))']
              : [
                  'drop-shadow(0 0 5px rgba(255,122,156,0.2))',
                  'drop-shadow(0 0 25px rgba(255,122,156,0.6))',
                  'drop-shadow(0 0 5px rgba(255,122,156,0.2))',
                ]
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-heading text-5xl font-bold mb-4"
          style={{ color: '#3B2F2F', lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Hi Baby <span style={{ color: '#FF7A9C' }}>❤️</span>
        </motion.h1>

        {/* Subtext */}
        <motion.div
          className="mb-10 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="font-body text-base leading-relaxed" style={{ color: '#7B5C5C' }}>
            I know you're probably still upset.
          </p>
          <p className="font-body text-base leading-relaxed" style={{ color: '#7B5C5C' }}>
            But before you decide anything...
          </p>
          <p className="font-body text-base font-medium leading-relaxed" style={{ color: '#FF7A9C' }}>
            please give me just two minutes.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="glow-btn vibrate font-body text-base"
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {heartBurst ? '❤️ Opening...' : '💌 Open My Heart'}
        </motion.button>

        {/* Scroll hint */}
        <motion.p
          className="mt-8 text-xs font-body"
          style={{ color: '#C9A8B8' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Scroll down to begin ↓
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFF9F8)' }}
      />
    </section>
  )
}
