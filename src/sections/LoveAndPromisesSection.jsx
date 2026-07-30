import { motion } from 'framer-motion'

// === EDITABLE LOVE THINGS ===
const LOVE_THINGS = [
  { emoji: '😊', text: 'Your smile' },
  { emoji: '😂', text: 'Your laugh' },
  { emoji: '🤍', text: 'The way you care' },
  { emoji: '💫', text: 'Your kindness' },
  { emoji: '🌸', text: 'The little things' },
  { emoji: '✨', text: 'Your strength' },
  { emoji: '🌙', text: 'How you listen' },
  { emoji: '💌', text: 'Your heart' },
  { emoji: '🌈', text: 'Your energy' },
  { emoji: '❤️', text: 'Just you.' },
]

const LoveCard = ({ item, index }) => (
  <motion.div
    className="glass-card p-4 flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    animate={{
      y: [0, -5, 0],
    }}
    style={{
      animationDuration: `${3 + index * 0.4}s`,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }}
    whileHover={{ scale: 1.05, y: -8 }}
  >
    <motion.div
      className="text-3xl mb-2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {item.emoji}
    </motion.div>
    <p className="font-body text-sm font-medium" style={{ color: '#5C3D3D' }}>{item.text}</p>
  </motion.div>
)

export const LoveSection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF9F8 0%, #FADADD22 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Always</p>
          <h2 className="section-heading">What I Love <span>About You</span></h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {LOVE_THINGS.map((item, i) => (
            <LoveCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// === EDITABLE PROMISES ===
const PROMISES = [
  { text: "I'll communicate better.", icon: '💬' },
  { text: "I'll understand before reacting.", icon: '🧘' },
  { text: "I'll never stop choosing you.", icon: '💍' },
  { text: "I'll protect your peace.", icon: '🕊️' },
  { text: "I'll keep growing — for you, for us.", icon: '🌱' },
  { text: "I'll be the person you deserve.", icon: '⭐' },
]

const PromiseItem = ({ item, index }) => (
  <motion.div
    className="flex items-start gap-4"
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    {/* Line */}
    <div className="flex flex-col items-center pt-1">
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,122,156,0.15), rgba(250,218,221,0.3))',
          border: '1px solid rgba(255,122,156,0.3)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      >
        {item.icon}
      </motion.div>
      {index < PROMISES.length - 1 && (
        <div className="w-0.5 h-8 mt-2" style={{ background: 'linear-gradient(180deg, rgba(255,122,156,0.4), transparent)' }} />
      )}
    </div>

    <div className="glass-card p-4 flex-1 mb-4">
      <p className="font-body text-sm leading-relaxed font-medium" style={{ color: '#5C3D3D' }}>
        {item.text}
      </p>
    </div>
  </motion.div>
)

export const PromisesSection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FADADD11 0%, #EDE7F622 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Forever</p>
          <h2 className="section-heading">My <span>Promises</span></h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        <div>
          {PROMISES.map((item, i) => (
            <PromiseItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
