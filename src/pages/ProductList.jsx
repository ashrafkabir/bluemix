import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllProducts } from '../data/cableProducts'
import LightningCanvas from '../components/LightningCanvas'

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    position: 'relative',
  },
  header: {
    position: 'relative',
    zIndex: 10,
    padding: '40px 5vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#fff',
    textShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
  adminBtn: {
    background: 'rgba(139, 92, 246, 0.15)',
    border: '1px solid rgba(139, 92, 246, 0.4)',
    color: '#8B5CF6',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
  },
  hero: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '60px 5vw 80px',
  },
  heroTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 'clamp(48px, 10vw, 120px)',
    fontWeight: 700,
    lineHeight: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #fff 0%, #8B5CF6 50%, #06B6D4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
  },
  heroSub: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    fontFamily: "'Inter', sans-serif",
  },
  grid: {
    position: 'relative',
    zIndex: 10,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
    padding: '0 5vw 80px',
  },
  card: {
    background: 'rgba(20, 20, 20, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(139, 92, 246, 0.15)',
    borderRadius: '16px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeroText: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 0.9,
    textTransform: 'uppercase',
    color: 'transparent',
    WebkitTextStroke: '1px rgba(139, 92, 246, 0.3)',
    marginBottom: '16px',
    whiteSpace: 'pre-line',
    transition: 'all 0.4s ease',
  },
  cardName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '8px',
  },
  cardCategory: {
    fontSize: '12px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#8B5CF6',
    marginBottom: '12px',
    fontFamily: "'Inter', sans-serif",
  },
  cardDesc: {
    fontSize: '13px',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '20px',
  },
  cardSpecs: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  cardSpec: {
    fontSize: '11px',
    letterSpacing: '1px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    color: 'rgba(255,255,255,0.7)',
  },
  cardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  layerPreview: {
    display: 'flex',
    gap: '4px',
    marginTop: '16px',
    alignItems: 'center',
  },
  layerDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.1)',
  },
}

export default function ProductList() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    setProducts(getAllProducts())
  }, [])

  return (
    <div style={styles.page}>
      <LightningCanvas intensity={0.15} color="#8B5CF6" />

      <div style={styles.header}>
        <div style={styles.logo}>Southwire 3D</div>
        <button
          style={styles.adminBtn}
          onClick={() => navigate('/admin')}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(139, 92, 246, 0.3)'
            e.target.style.borderColor = '#8B5CF6'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(139, 92, 246, 0.15)'
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)'
          }}
        >
          Admin Panel
        </button>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Wire & Cable{'\n'}Explorer</h1>
        <p style={styles.heroSub}>Interactive 3D Product Visualization</p>
      </div>

      <div style={styles.grid}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              ...styles.card,
              borderColor: hoveredCard === product.id ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.15)',
              transform: hoveredCard === product.id ? 'translateY(-4px)' : 'none',
              boxShadow: hoveredCard === product.id ? '0 20px 60px rgba(139, 92, 246, 0.15)' : 'none',
            }}
            onClick={() => navigate(`/product/${product.id}`)}
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ ...styles.cardGlow, opacity: hoveredCard === product.id ? 1 : 0 }} />
            <div style={{
              ...styles.cardHeroText,
              WebkitTextStroke: hoveredCard === product.id ? '1px rgba(139, 92, 246, 0.6)' : '1px rgba(139, 92, 246, 0.3)',
            }}>
              {product.heroText}
            </div>
            <div style={styles.cardCategory}>{product.category}</div>
            <div style={styles.cardName}>{product.name}</div>
            <div style={styles.cardDesc}>{product.description}</div>
            <div style={styles.cardSpecs}>
              <span style={styles.cardSpec}>{product.voltage}</span>
              <span style={styles.cardSpec}>{product.conductorMaterial}</span>
              <span style={styles.cardSpec}>{(product.temperature || '').split('/')[0].trim()}</span>
            </div>
            <div style={styles.layerPreview}>
              {product.layers.map(layer => (
                <div
                  key={layer.name}
                  style={{
                    ...styles.layerDot,
                    background: layer.color,
                    width: `${Math.max(16, layer.thickness * 40)}px`,
                    height: `${Math.max(16, layer.thickness * 40)}px`,
                  }}
                  title={layer.name}
                />
              ))}
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
                {product.layers.length} layers
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
