import { useState, useEffect } from 'react'

const styles = {
  container: {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    zIndex: 20,
    opacity: 1,
    transition: 'opacity 0.5s ease',
    pointerEvents: 'none',
  },
  text: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    letterSpacing: '6px',
    textTransform: 'uppercase',
    color: '#8B5CF6',
    textShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
  },
  arrow: {
    width: '24px',
    height: '24px',
    borderRight: '2px solid #8B5CF6',
    borderBottom: '2px solid #8B5CF6',
    transform: 'rotate(45deg)',
    animation: 'bounce 2s infinite',
    boxShadow: '4px 4px 8px rgba(139, 92, 246, 0.3)',
  },
}

export default function ScrollIndicator({ text = 'SCROLL TO DETONATE', visible = true }) {
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)
  }, [visible])

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
          40% { transform: rotate(45deg) translateY(-12px); }
          60% { transform: rotate(45deg) translateY(-6px); }
        }
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          50% { text-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.3); }
        }
      `}</style>
      <div style={{ ...styles.container, opacity: show ? 1 : 0 }}>
        <span style={{ ...styles.text, animation: 'pulse-glow 2s infinite' }}>{text}</span>
        <div style={styles.arrow} />
        <div style={{ ...styles.arrow, opacity: 0.5, marginTop: '-14px' }} />
      </div>
    </>
  )
}
