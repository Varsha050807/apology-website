import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// === EDITABLE HIDDEN MESSAGES ===
const HIDDEN_MESSAGES = [
  "I still smile because of you.",
  "You'll always be my favourite person.",
  "I miss us.",
  "I'm grateful for every memory.",
  "I'd choose you again.",
  "You changed me — in all the best ways.",
  "My heart has your name on it.",
  "Every playlist reminds me of you.",
  "You deserve the whole world.",
  "I think about you more than you know.",
  "Even the ordinary moments felt magical with you.",
  "You made everything brighter.",
  "I'm sorry for every time I made you feel less than everything.",
  "You are my favourite chapter.",
  "I hope you know how loved you are.",
  "No one makes me laugh like you do.",
  "You are enough. More than enough.",
  "I still have so much I want to say.",
  "Thank you for being you.",
  "I'll always be in your corner.",
]

const FloatingMessage = ({ msg, x, y, onDone }) => {
  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.8], y: -80 }}
      transition={{ duration: 2.5, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      <div
        className="glass-card px-4 py-3 max-w-[200px] text-center"
        style={{ boxShadow: '0 8px 30px rgba(255,122,156,0.3)' }}
      >
        <p className="font-body text-xs font-medium" style={{ color: '#5C3D3D' }}>{msg}</p>
      </div>
    </motion.div>
  )
}

export const TapMemorySection = () => {
  const [revealed, setRevealed] = useState([])
  const [floaters, setFloaters] = useState([])
  const [msgIndex, setMsgIndex] = useState(0)
  const [tapCount, setTapCount] = useState(0)

  const handleTap = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width / 2
    const y = e.clientY || e.touches?.[0]?.clientY || rect.top + rect.height / 2

    const idx = msgIndex % HIDDEN_MESSAGES.length
    const msg = HIDDEN_MESSAGES[idx]
    const id = Date.now()

    setMsgIndex(p => p + 1)
    setTapCount(p => p + 1)
    setRevealed(p => [...p.slice(-4), msg])
    setFloaters(p => [...p, { id, msg, x, y }])
  }, [msgIndex])

  const removeFloater = useCallback((id) => {
    setFloaters(p => p.filter(f => f.id !== id))
  }, [])

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF9F8, #FADADD22)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Interactive</p>
          <h2 className="section-heading">Every Tap Is <span>A Memory</span></h2>
          <p className="font-body text-sm mt-3" style={{ color: '#9B7B7B' }}>
            Tap the heart below to reveal hidden messages
          </p>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        {/* Tap area */}
        <div
          className="relative flex flex-col items-center"
          onMouseDown={handleTap}
          onTouchStart={handleTap}
        >
          {/* Big tappable heart */}
          <motion.div
            className="text-[100px] cursor-pointer select-none mb-6 relative z-10"
            whileTap={{ scale: 1.3 }}
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(255,122,156,0.3))',
                'drop-shadow(0 0 30px rgba(255,122,156,0.7))',
                'drop-shadow(0 0 10px rgba(255,122,156,0.3))',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.div>

          <p className="font-body text-xs" style={{ color: '#C9A8B8' }}>
            {tapCount > 0 ? `${tapCount} tap${tapCount !== 1 ? 's' : ''} — keep going...` : 'Tap me ♡'}
          </p>

          {/* Last revealed messages */}
          <AnimatePresence>
            {revealed.length > 0 && (
              <motion.div
                className="mt-8 glass-card p-5 w-full text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-body text-xs uppercase tracking-wide mb-3" style={{ color: '#C9A8B8' }}>Last revealed</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={revealed[revealed.length - 1]}
                    className="font-heading text-base italic"
                    style={{ color: '#5C3D3D' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    "{revealed[revealed.length - 1]}"
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating messages */}
      {floaters.map(f => (
        <FloatingMessage
          key={f.id}
          msg={f.msg}
          x={f.x}
          y={f.y}
          onDone={() => removeFloater(f.id)}
        />
      ))}
    </section>
  )
}
