import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ==================== BACKGROUND BLOBS ====================
export const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="blob"
      style={{ width: 300, height: 300, background: '#FADADD', top: '5%', left: '-10%' }}
      animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="blob"
      style={{ width: 250, height: 250, background: '#EDE7F6', top: '30%', right: '-8%' }}
      animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
    <motion.div
      className="blob"
      style={{ width: 200, height: 200, background: '#FFF4E6', top: '60%', left: '20%' }}
      animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
    />
    <motion.div
      className="blob"
      style={{ width: 180, height: 180, background: '#FF7A9C', bottom: '10%', right: '10%' }}
      animate={{ x: [0, -15, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
    <motion.div
      className="blob"
      style={{ width: 350, height: 350, background: '#FADADD', bottom: '40%', left: '40%' }}
      animate={{ x: [0, 10, 0], y: [0, 25, 0], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
    />
  </div>
)

// ==================== FLOATING SPARKLES ====================
const Sparkle = ({ style }) => (
  <motion.div
    className="fixed pointer-events-none z-0 text-pink-accent"
    style={{ ...style, fontSize: '10px' }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 4 }}
  >
    ✦
  </motion.div>
)

export const FloatingSparkles = () => {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  }))
  return (
    <>
      {sparkles.map(s => (
        <Sparkle key={s.id} style={{ top: s.top, left: s.left, color: '#FF7A9C' }} />
      ))}
    </>
  )
}

// ==================== AMBIENT HEARTS ====================
const AmbientHeart = ({ style, delay }) => (
  <motion.div
    className="fixed pointer-events-none z-0 select-none"
    style={{ ...style, fontSize: `${8 + Math.random() * 10}px`, opacity: 0 }}
    animate={{ opacity: [0, 0.15, 0], y: [0, -60, -120] }}
    transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: 'easeOut', delay }}
  >
    ❤️
  </motion.div>
)

export const AmbientHearts = () => {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    bottom: `${-5}%`,
    left: `${10 + i * 12}%`,
    delay: i * 1.5,
  }))
  return (
    <>
      {hearts.map(h => (
        <AmbientHeart key={h.id} style={{ bottom: h.bottom, left: h.left }} delay={h.delay} />
      ))}
    </>
  )
}

// ==================== SCROLL PROGRESS ====================
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <motion.div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  )
}

// ==================== HEART CURSOR ====================
export const HeartCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <motion.div
      className="custom-cursor"
      style={{ left: pos.x, top: pos.y }}
      animate={{ scale: clicking ? 1.5 : 1 }}
      transition={{ duration: 0.1 }}
    >
      {clicking ? '❤️' : '🤍'}
    </motion.div>
  )
}

// ==================== TOUCH HEARTS ====================
export const TouchHeartEffect = () => {
  const [hearts, setHearts] = useState([])

  const addHeart = useCallback((e) => {
    const touch = e.touches?.[0] || e
    const x = touch.clientX
    const y = touch.clientY
    const id = Date.now() + Math.random()
    setHearts(prev => [...prev, { id, x, y }])
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000)
  }, [])

  useEffect(() => {
    window.addEventListener('touchstart', addHeart)
    return () => window.removeEventListener('touchstart', addHeart)
  }, [addHeart])

  return (
    <>
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="floating-heart"
          style={{ left: h.x - 12, top: h.y - 12, position: 'fixed' }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -120, scale: 0.5 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  )
}

// ==================== BACK TO TOP ====================
export const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const check = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', check)
    return () => window.removeEventListener('scroll', check)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 w-11 h-11 rounded-full glass-card flex items-center justify-center text-lg z-50 shadow-lg"
          style={{ background: 'rgba(255,255,255,0.85)' }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
