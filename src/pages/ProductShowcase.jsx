import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { getProductById, getAllProducts } from '../data/cableProducts'
import LightningCanvas from '../components/LightningCanvas'
import CableScene from '../components/Cable3D'
import ScrollIndicator from '../components/ScrollIndicator'
import FloatingBadge from '../components/FloatingBadge'

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0
      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '500vh',
    background: '#0a0a0a',
    overflow: 'hidden',
  },
  fixedContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
  },
  heroSection: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    pointerEvents: 'none',
  },
  heroText: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 'clamp(60px, 12vw, 180px)',
    fontWeight: 700,
    textTransform: 'uppercase',
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
    textAlign: 'center',
    color: 'transparent',
    WebkitTextStroke: '2px rgba(139, 92, 246, 0.3)',
    transition: 'opacity 0.5s ease',
    userSelect: 'none',
    whiteSpace: 'pre-line',
  },
  heroTextFill: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 'clamp(60px, 12vw, 180px)',
    fontWeight: 700,
    textTransform: 'uppercase',
    lineHeight: 0.85,
    letterSpacing: '-0.02em',
    textAlign: 'center',
    position: 'absolute',
    color: '#fff',
    textShadow: '0 0 60px rgba(139, 92, 246, 0.5), 0 0 120px rgba(139, 92, 246, 0.2)',
    whiteSpace: 'pre-line',
    userSelect: 'none',
  },
  tagline: {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    zIndex: 10,
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease',
    whiteSpace: 'nowrap',
    maxWidth: '90vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  cableContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 8,
    pointerEvents: 'none',
  },
  layerLabels: {
    position: 'fixed',
    right: '5vw',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    pointerEvents: 'none',
  },
  layerLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    opacity: 0,
    transform: 'translateX(30px)',
    transition: 'all 0.5s ease',
  },
  layerDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
    marginTop: '4px',
  },
  layerName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#fff',
  },
  layerDesc: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '220px',
    lineHeight: 1.4,
    marginTop: '2px',
  },
  specsPanel: {
    position: 'fixed',
    left: '5vw',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    pointerEvents: 'none',
  },
  specItem: {
    opacity: 0,
    transform: 'translateX(-30px)',
    transition: 'all 0.5s ease',
  },
  specLabel: {
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#8B5CF6',
    fontFamily: "'Inter', sans-serif",
  },
  specValue: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
    fontFamily: "'Oswald', sans-serif",
    letterSpacing: '1px',
  },
  backButton: {
    position: 'fixed',
    top: '24px',
    left: '24px',
    zIndex: 50,
    background: 'rgba(10,10,10,0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    pointerEvents: 'all',
  },
  progressBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
    zIndex: 100,
    transition: 'width 0.1s linear',
  },
  badgeContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9,
    pointerEvents: 'none',
  },
  productName: {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.4)',
    zIndex: 50,
    pointerEvents: 'none',
    transition: 'opacity 0.5s ease',
  },
}

export default function ProductShowcase() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scrollProgress = useScrollProgress()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const p = getProductById(id)
    if (!p) {
      const all = getAllProducts()
      if (all.length > 0) setProduct(all[0])
    } else {
      setProduct(p)
    }
  }, [id])

  const rotationProgress = useMemo(() => Math.min(1, scrollProgress * 2.5), [scrollProgress])
  const explodeProgress = useMemo(() => Math.max(0, Math.min(1, (scrollProgress - 0.4) * 2.5)), [scrollProgress])
  const heroOpacity = useMemo(() => Math.max(0, 1 - scrollProgress * 4), [scrollProgress])
  const showLabels = scrollProgress > 0.5
  const showSpecs = scrollProgress > 0.55
  const showScrollIndicator = scrollProgress < 0.15
  const lightningIntensity = useMemo(() => 0.3 + explodeProgress * 0.7, [explodeProgress])

  if (!product) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
        <p>Loading product...</p>
      </div>
    )
  }

  const heroText = product.heroText || product.name

  return (
    <div style={styles.page}>
      {/* Progress bar */}
      <div style={{ ...styles.progressBar, width: `${scrollProgress * 100}%` }} />

      {/* Back button */}
      <button
        style={styles.backButton}
        onClick={() => navigate('/')}
        onMouseEnter={e => { e.target.style.borderColor = '#8B5CF6'; e.target.style.boxShadow = '0 0 20px rgba(139,92,246,0.3)' }}
        onMouseLeave={e => { e.target.style.borderColor = 'rgba(139,92,246,0.3)'; e.target.style.boxShadow = 'none' }}
      >
        &#8592; Back
      </button>

      {/* Product name at top */}
      <div style={{ ...styles.productName, opacity: scrollProgress > 0.1 ? 0.6 : 0 }}>
        {product.name}
      </div>

      {/* Lightning canvas background */}
      <LightningCanvas intensity={lightningIntensity} color="#8B5CF6" />

      {/* Hero text */}
      <div style={{ ...styles.heroSection, opacity: heroOpacity }}>
        <div style={{ position: 'relative' }}>
          <div style={styles.heroText}>{heroText}</div>
          <div style={{ ...styles.heroTextFill, opacity: 0.15 }}>{heroText}</div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{ ...styles.tagline, opacity: heroOpacity * 0.7 }}>
        {product.tagline}
      </div>

      {/* Floating spec badges */}
      <div style={{ ...styles.badgeContainer, opacity: Math.max(0, 1 - scrollProgress * 3) }}>
        <FloatingBadge icon="&#9889;" label={product.voltage} x="15%" y="25%" delay={0} />
        <FloatingBadge
          icon="&#127777;"
          label={(product.temperature || '').split('/')[0].trim()}
          x="78%" y="20%" delay={0.5} color="#06B6D4"
        />
        <FloatingBadge icon="&#128268;" label={product.conductorMaterial} x="12%" y="65%" delay={1} />
        <FloatingBadge icon="&#9881;" label={product.category} x="82%" y="60%" delay={1.5} color="#06B6D4" />
      </div>

      {/* 3D Cable */}
      <div style={styles.cableContainer}>
        <CableScene
          layers={product.layers}
          scrollProgress={scrollProgress}
          isExploded={scrollProgress > 0.4}
        />
      </div>

      {/* Layer labels (appear on explode) */}
      <div style={styles.layerLabels}>
        {product.layers.map((layer, i) => (
          <div
            key={layer.name}
            style={{
              ...styles.layerLabel,
              opacity: showLabels ? 1 : 0,
              transform: showLabels ? 'translateX(0)' : 'translateX(30px)',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div style={{ ...styles.layerDot, background: layer.color, boxShadow: `0 0 10px ${layer.color}` }} />
            <div>
              <div style={styles.layerName}>{layer.name}</div>
              <div style={styles.layerDesc}>{layer.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Specs panel */}
      <div style={styles.specsPanel}>
        {[
          { label: 'Voltage', value: product.voltage },
          { label: 'Temperature', value: product.temperature },
          { label: 'Conductor', value: product.conductorMaterial },
          { label: 'Insulation', value: product.insulationType },
          { label: 'Category', value: product.category },
        ].map((spec, i) => (
          <div
            key={spec.label}
            style={{
              ...styles.specItem,
              opacity: showSpecs ? 1 : 0,
              transform: showSpecs ? 'translateX(0)' : 'translateX(-30px)',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div style={styles.specLabel}>{spec.label}</div>
            <div style={styles.specValue}>{spec.value}</div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator visible={showScrollIndicator} />
    </div>
  )
}
