import { motion } from 'framer-motion'

// === EDITABLE LETTER CONTENT ===
const LETTER_LINES = [
  "My Love,",
  "",
  "I've been sitting here, trying to find the right words — and honestly, there are none that feel big enough.",
  "",
  "What I did hurt you. And I hate myself for that. Not because of what it means for us, but because you're the last person in the world I ever wanted to hurt.",
  "",
  "You carry so much warmth. You give so much love — quietly, gently, in the little things that most people would never even notice. I notice. I've always noticed.",
  "",
  "I know I wasn't the person you deserved in that moment. I know sorry doesn't erase it. But I need you to know it's real — this letter, this heart, this love.",
  "",
  "I would rewrite every moment I failed you if I could. I would choose differently. Every single time.",
  "",
  "You are not just someone I love. You are the reason I want to be better. And I'm working on it — not because I'm afraid of losing you, but because you deserve someone whole.",
  "",
  "Thank you for reading this far. Thank you for still being here, even if just for these few minutes.",
  "",
  "I love you more than these words could ever hold.",
  "",
  "Always yours,",
  "❤️",
]

export const LetterSection = () => {
  return (
    <section
      id="letter"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF9F8 0%, #FFF4E6 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Written for you</p>
          <h2 className="section-heading">My <span>Letter</span></h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        {/* Paper letter */}
        <motion.div
          className="paper-letter px-10 pt-10 pb-12 relative"
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Stamp decoration */}
          <div
            className="absolute top-4 right-4 w-12 h-12 rounded-lg flex items-center justify-center text-2xl opacity-20 select-none"
            style={{ border: '2px solid rgba(255,122,156,0.4)' }}
          >
            ❤️
          </div>

          <div className="relative z-10 space-y-3">
            {LETTER_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="font-handwriting leading-relaxed whitespace-pre-line"
                style={{
                  color: i === 0 || i === LETTER_LINES.length - 2 ? '#FF7A9C' : i === LETTER_LINES.length - 1 ? '#FF7A9C' : '#5C3D3D',
                  fontSize: i === 0 ? '1.4rem' : i === LETTER_LINES.length - 1 ? '1.8rem' : '1rem',
                  fontWeight: i === 0 ? 700 : 400,
                  paddingLeft: line === '' ? 0 : '60px',
                  minHeight: line === '' ? '0.5rem' : 'auto',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 1.5) }}
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
