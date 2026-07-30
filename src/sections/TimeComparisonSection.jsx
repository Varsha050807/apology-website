import { motion } from 'framer-motion'

// === EDITABLE COMPARISON DATA ===
const COMPARISONS = [
  {
    what: "I said things I didn't mean.",
    better: "I would've taken a breath and listened first.",
  },
  {
    what: "I made you feel unheard.",
    better: "I would've put everything down and given you my full attention.",
  },
  {
    what: "I reacted instead of responding.",
    better: "I would've chosen understanding over being right.",
  },
  {
    what: "I let my fear hurt you.",
    better: "I would've been honest about what I was feeling.",
  },
  {
    what: "I pushed you away when you needed me close.",
    better: "I would've held on tighter.",
  },
]

const ComparisonCard = ({ item, index }) => (
  <motion.div
    className="flex flex-col md:flex-row gap-3 mb-4 last:mb-0"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* What happened */}
    <div className="flex-1 rounded-3xl p-4"
      style={{
        background: 'rgba(255,218,221,0.3)',
        border: '1px solid rgba(255,122,156,0.2)',
      }}
    >
      <p className="font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#C07A90' }}>
        What happened
      </p>
      <p className="font-body text-sm leading-relaxed" style={{ color: '#5C3D3D' }}>
        {item.what}
      </p>
    </div>

    {/* Arrow */}
    <div className="flex items-center justify-center text-xl self-center">→</div>

    {/* What I'd do */}
    <div className="flex-1 rounded-3xl p-4"
      style={{
        background: 'rgba(237,231,246,0.4)',
        border: '1px solid rgba(150,130,200,0.2)',
      }}
    >
      <p className="font-body text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#8B7BC0' }}>
        What I'd do differently
      </p>
      <p className="font-body text-sm leading-relaxed" style={{ color: '#3B2F4F' }}>
        {item.better}
      </p>
    </div>
  </motion.div>
)

export const TimeComparisonSection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF4E6 0%, #EDE7F633 100%)' }}
    >
      <div className="section-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#FF7A9C' }}>Reflection</p>
          <h2 className="section-heading">If I Could <span>Turn Back Time</span></h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, #FF7A9C, transparent)' }} />
        </motion.div>

        <div>
          {COMPARISONS.map((item, i) => (
            <ComparisonCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
