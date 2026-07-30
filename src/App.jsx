import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

// Ambient
import {
  BackgroundBlobs,
  FloatingSparkles,
  AmbientHearts,
  ScrollProgress,
  HeartCursor,
  TouchHeartEffect,
  BackToTop,
} from './components/Ambient'

// Navigation
import { BottomNav, MusicPlayer } from './components/Navigation'

// Loading
import { LoadingScreen } from './components/LoadingScreen'

// Sections
import { HeroSection } from './sections/HeroSection'
import { StorySection } from './sections/StorySection'
import { MemoriesSection } from './sections/MemoriesSection'
import { ApologySection } from './sections/ApologySection'
import { LoveSection, PromisesSection } from './sections/LoveAndPromisesSection'
import { LetterSection } from './sections/LetterSection'
import { TimeComparisonSection } from './sections/TimeComparisonSection'
import { TapMemorySection } from './sections/TapMemorySection'
import { FinalSection } from './sections/FinalSection'
import { OneLasThingSection } from './sections/OneLastThingSection'

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: '#FFF9F8' }}>
      {/* Loading */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Ambient background (always present) */}
      <BackgroundBlobs />
      <FloatingSparkles />
      <AmbientHearts />

      {/* Interactions */}
      <HeartCursor />
      <TouchHeartEffect />

      {/* Progress */}
      <ScrollProgress />

      {/* Main content */}
      {!loading && (
        <>
          {/* Glass Navbar */}
          <header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,218,221,0.3)',
            }}
          >
            <span className="font-heading text-sm font-semibold" style={{ color: '#FF7A9C' }}>
              For You ❤️
            </span>
            <span className="font-body text-xs" style={{ color: '#C9A8B8' }}>
              with love
            </span>
          </header>

          {/* Sections */}
          <main className="pb-20">
            <HeroSection />
            <StorySection />
            <MemoriesSection />
            <ApologySection />
            <LoveSection />
            <PromisesSection />
            <LetterSection />
            <TimeComparisonSection />
            <TapMemorySection />
            <OneLasThingSection />
            <FinalSection />
          </main>

          {/* Floating controls */}
          <BottomNav />
          <MusicPlayer />
          <BackToTop />
        </>
      )}
    </div>
  )
}

export default App
