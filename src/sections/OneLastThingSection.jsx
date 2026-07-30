import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TYPING_SEQUENCES = [
  { text: "If I could go back...\nI'd still choose you.\nEvery single time.\nI'd just love you better.", delay: 1000 },
  { text: "No matter what happens...\nThank you for being one of the most beautiful chapters of my life.", delay: 5000 },
  { text: "I'll always be cheering for your happiness...\neven if I'm not standing beside you.", delay: 9500 },
  { text: "❤️\n\nI love you.", delay: 13500 },
]

const TypedLine = ({ text, delay, onDone }) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onDone?.()
        }
      }, 35)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay, onDone])

  if (!displayed) return null

  return (
    <motion.p
      className="font-heading text-base leading-relaxed whitespace-pre-line text-center"
      style={{ color: 'rgba(255,244,240,0.95)', fontSize: text.includes('❤️') ? '2rem' : '1rem' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >|</motion.span>
      )}
    </motion.p>
  )
}

const HeartFloat = ({ id, x }) => (
  <motion.div
    className="fixed text-2xl pointer-events-none"
    style={{ left: `${x}%`, bottom: '-5%' }}
    initial={{ y: 0, opacity: 0.8 }}
    animate={{ y: '-110vh', opacity: 0, scale: [1, 0.8, 0.5] }}
    transition={{ duration: 5 + Math.random() * 3, ease: 'easeOut' }}
  >
    ❤️
  </motion.div>
)

export const OneLasThingSection = () => {
  const [active, setActive] = useState(false)
  const [phase, setPhase] = useState(0) // 0=button, 1=black, 2=typing
  const [floatingHearts, setFloatingHearts] = useState([])
  const [shownSequences, setShownSequences] = useState(0)

  const start = () => {
    setPhase(1)
    setTimeout(() => setPhase(2), 1000)
  }

  useEffect(() => {
    if (phase !== 2) return
    // Spawn floating hearts after all text appears
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setFloatingHearts(p => [...p, { id: Date.now() + Math.random(), x: 5 + Math.random() * 90 }])
      }, 300)
      return () => clearInterval(interval)
    }, 15000)
    return () => clearTimeout(timer)
  }, [phase])

  const handleSequenceDone = () => {
    setShownSequences(p => p + 1)
  }

  return (
    <section className="relative py-24 overflow-hidden"
      style={{ background: '#FFF9F8' }}
    >
      <div className="section-container">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="button"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-5xl mb-6"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <h2 className="section-heading mb-4">One Last Thing <span>❤️</span></h2>
              <p className="font-body text-sm mb-8" style={{ color: '#9B7B7B' }}>
                One more thing I need you to hear...
              </p>
              <motion.button
                className="glow-btn vibrate"
                onClick={start}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                One Last Thing...
              </motion.button>
            </motion.div>
          )}

          {(phase === 1 || phase === 2) && (
            <motion.div
              key="blackscreen"
              className="fixed inset-0 z-[150] flex flex-col items-center justify-center"
              style={{ background: '#000000' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {phase === 2 && (
                <>
                  <motion.div
                    className="text-5xl mb-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    ❤️
                  </motion.div>

                  <div className="px-8 max-w-sm w-full space-y-6">
                    {TYPING_SEQUENCES.map((seq, i) => (
                      <TypedLine
                        key={i}
                        text={seq.text}
                        delay={seq.delay}
                        onDone={i === TYPING_SEQUENCES.length - 1 ? handleSequenceDone : undefined}
                      />
                    ))}
                  </div>

                  {/* Close button */}
                  <motion.button
                    className="absolute top-6 right-6 text-white opacity-30 hover:opacity-70 transition-opacity text-2xl"
                    onClick={() => setPhase(0)}
                  >
                    ✕
                  </motion.button>
                </>
              )}

              {/* Floating hearts */}
              {floatingHearts.map(h => (
                <HeartFloat key={h.id} id={h.id} x={h.x} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
