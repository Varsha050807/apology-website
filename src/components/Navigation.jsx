import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', emoji: '🏠', id: 'hero' },
  { label: 'Story', emoji: '📖', id: 'story' },
  { label: 'Memories', emoji: '🖼️', id: 'memories' },
  { label: 'Letter', emoji: '💌', id: 'letter' },
  { label: 'End', emoji: '❤️', id: 'final' },
]

export const BottomNav = () => {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-2xl transition-all duration-300"
            style={{
              color: active === item.id ? '#FF7A9C' : '#9B8A8A',
              minWidth: 56,
            }}
          >
            <motion.span
              className="text-lg"
              animate={{ scale: active === item.id ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {item.emoji}
            </motion.span>
            <span
              className="text-xs font-medium font-body transition-all duration-300"
              style={{ fontSize: '0.6rem', fontWeight: active === item.id ? 600 : 400 }}
            >
              {item.label}
            </span>
            {active === item.id && (
              <motion.div
                layoutId="nav-dot"
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ background: '#FF7A9C' }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}

// ===================== MUSIC PLAYER =====================
export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => { })
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/apology.mp4" loop />
      <motion.button
        className="music-btn"
        onClick={toggle}
        whileTap={{ scale: 0.9 }}
        title={playing ? 'Pause Music' : 'Play Music'}
      >
        <motion.div
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ duration: playing ? 4 : 0, repeat: playing ? Infinity : 0, ease: 'linear' }}
          className="text-2xl select-none"
        >
          🎵
        </motion.div>
      </motion.button>
    </>
  )
}
