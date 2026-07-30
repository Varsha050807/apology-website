import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ==================== CONFETTI ====================
const COLORS = ['#FF7A9C', '#FADADD', '#EDE7F6', '#FFD6E0', '#FF94B0', '#C084FC', '#FFF4E6']

const createParticle = (canvas) => ({
  x: Math.random() * canvas.width,
  y: -10,
  vx: (Math.random() - 0.5) * 3,
  vy: Math.random() * 3 + 1,
  rotation: Math.random() * 360,
  rotationSpeed: (Math.random() - 0.5) * 5,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  size: Math.random() * 8 + 4,
  shape: Math.random() > 0.5 ? 'circle' : 'heart',
  opacity: 1,
})

const useConfetti = (active) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const spawn = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(createParticle(canvas))
      }
    }, 80)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current = particlesRef.current.filter(p => p.y < canvas.height + 20 && p.opacity > 0)
      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.opacity = Math.max(0, 1 - (p.y / canvas.height) * 0.5)
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.font = `${p.size * 2}px serif`
          ctx.fillText('❤', -p.size / 2, p.size / 2)
        }
        ctx.restore()
      })
      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      clearInterval(spawn)
      cancelAnimationFrame(animRef.current)
    }
  }, [active])

  return canvasRef
}

// ==================== EASTER EGG MODAL ====================
const EasterEggModal = ({ onClose }) => (
  <motion.div
    className="fixed inset-0 z-[300] flex items-center justify-center p-6"
    style={{ backdropFilter: 'blur(20px)', background: 'rgba(59,47,47,0.7)' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="glass-card p-8 max-w-sm w-full text-center"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="text-5xl mb-4"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ❤️
      </motion.div>
      <h3 className="font-heading text-xl mb-4" style={{ color: '#3B2F2F' }}>You found it...</h3>
      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: '#5C3D3D' }}>
        "Thank you for giving us a chance.
        <br /><br />
        No matter what happens after today... I'll always treasure every moment we shared.
        <br /><br />
        ❤️"
      </p>
      <button
        onClick={onClose}
        className="glow-btn text-sm py-3 px-8"
      >
        Close ❤️
      </button>
    </motion.div>
  </motion.div>
)

export const FinalSection = () => {
  const [heartTaps, setHeartTaps] = useState(0)
  const [easterEgg, setEasterEgg] = useState(false)
  const confettiRef = useConfetti(true)

  const handleHeartTap = () => {
    const newCount = heartTaps + 1
    setHeartTaps(newCount)
    if (newCount >= 5) {
      setEasterEgg(true)
      setHeartTaps(0)
    }
  }

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
      style={{ background: 'linear-gradient(180deg, #2D1B2E 0%, #1a0d1a 100%)' }}
    >
      <canvas
        ref={confettiRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs select-none pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: 'rgba(255,218,221,0.5)',
            fontSize: `${6 + Math.random() * 8}px`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        >
          ✦
        </motion.div>
      ))}

      <div className="section-container relative z-20 text-center">
        {/* Glowing beating heart — tap 5x for easter egg */}
        <motion.div
          className="text-[100px] cursor-pointer select-none mb-10"
          onClick={handleHeartTap}
          onTouchEnd={handleHeartTap}
          animate={{
            scale: [1, 1.12, 1, 1.08, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(255,122,156,0.4))',
              'drop-shadow(0 0 50px rgba(255,122,156,0.9))',
              'drop-shadow(0 0 20px rgba(255,122,156,0.4))',
            ]
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 1.3 }}
        >
          ❤️
        </motion.div>

        {heartTaps > 0 && heartTaps < 5 && (
          <motion.p
            className="font-body text-xs mb-4"
            style={{ color: 'rgba(255,122,156,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {5 - heartTaps} more tap{5 - heartTaps !== 1 ? 's' : ''}...
          </motion.p>
        )}

        <div className="space-y-6">
          {[
            "If you're still here...",
            "thank you.",
            "I don't expect everything to be fixed today.",
            "I only hope one day...",
            "you'll look at me the way you used to.",
            "I love you.",
            "Always.",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="font-heading"
              style={{
                color: i === 5 ? '#FF7A9C' : i === 6 ? '#FF7A9C' : 'rgba(255,244,240,0.9)',
                fontSize: i === 5 ? '1.8rem' : i === 6 ? '1.3rem' : '1rem',
                fontWeight: i === 5 || i === 6 ? 700 : 400,
                fontStyle: i < 5 ? 'italic' : 'normal',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(255,218,221,0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          <p className="font-body text-xs" style={{ color: 'rgba(255,218,221,0.3)' }}>
            Made with every piece of my heart ❤️
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {easterEgg && <EasterEggModal onClose={() => setEasterEgg(false)} />}
      </AnimatePresence>
    </section>
  )
}
