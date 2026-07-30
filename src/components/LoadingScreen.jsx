import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_TEXT = "Preparing something from my heart..."

export const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('show') // show | fade
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    // Type text
    const typeInterval = setInterval(() => {
      setCharIndex(prev => {
        if (prev >= LOADING_TEXT.length) {
          clearInterval(typeInterval)
          return prev
        }
        return prev + 1
      })
    }, 45)

    // Fade after 2.8s
    const fadeTimer = setTimeout(() => setPhase('fade'), 2800)
    const doneTimer = setTimeout(() => onComplete(), 3400)

    return () => {
      clearInterval(typeInterval)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === 'show' && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Beating heart */}
          <motion.div
            className="text-7xl mb-8 select-none"
            animate={{
              scale: [1, 1.2, 1, 1.15, 1],
              filter: [
                'drop-shadow(0 0 0px rgba(255,122,156,0))',
                'drop-shadow(0 0 20px rgba(255,122,156,0.8))',
                'drop-shadow(0 0 5px rgba(255,122,156,0.2))',
                'drop-shadow(0 0 15px rgba(255,122,156,0.6))',
                'drop-shadow(0 0 0px rgba(255,122,156,0))',
              ]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❤️
          </motion.div>

          {/* Typing text */}
          <motion.p
            className="font-body text-center px-8 text-base"
            style={{ color: '#7B5C5C', minHeight: '2rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {LOADING_TEXT.slice(0, charIndex)}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.p>

          {/* Soft circles */}
          <motion.div
            className="absolute rounded-full"
            style={{ width: 200, height: 200, background: 'rgba(250,218,221,0.3)', top: '10%', left: '-5%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 150, height: 150, background: 'rgba(237,231,246,0.4)', bottom: '15%', right: '-5%' }}
            animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
