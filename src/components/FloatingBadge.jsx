const styles = {
  badge: {
    position: 'absolute',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '2px solid rgba(139, 92, 246, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: 'rgba(10, 10, 10, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.05)',
    transition: 'all 0.3s ease',
    cursor: 'default',
    zIndex: 10,
  },
  icon: {
    fontSize: '20px',
    marginBottom: '2px',
  },
  label: {
    fontSize: '8px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: "'Inter', sans-serif",
  },
}

export default function FloatingBadge({ icon, label, x, y, delay = 0, color = '#8B5CF6' }) {
  return (
    <>
      <style>{`
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div
        style={{
          ...styles.badge,
          left: x,
          top: y,
          borderColor: `${color}66`,
          boxShadow: `0 0 30px ${color}33, inset 0 0 20px ${color}0d`,
          animation: `float-badge 3s ease-in-out ${delay}s infinite`,
        }}
      >
        <span style={styles.icon}>{icon}</span>
        <span style={styles.label}>{label}</span>
      </div>
    </>
  )
}
