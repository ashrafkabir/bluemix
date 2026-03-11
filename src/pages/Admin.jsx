import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProductForm from '../components/AdminProductForm';
import { getCustomProducts, deleteCustomProduct } from '../data/cableProducts';

const STORAGE_KEY = 'customCableProducts';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0a1a',
    color: '#e2e8f0',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  header: {
    background: 'linear-gradient(180deg, #12122a 0%, #0a0a1a 100%)',
    borderBottom: '1px solid rgba(139,92,246,0.2)',
    padding: '24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 800,
    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  badge: {
    background: 'rgba(139,92,246,0.15)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: 6,
    padding: '4px 10px',
    fontSize: 11,
    fontWeight: 600,
    color: '#c4b5fd',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  backLink: {
    color: '#64748b',
    textDecoration: 'none',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
  },
  content: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '32px 40px',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  statsRow: {
    display: 'flex',
    gap: 8,
  },
  stat: {
    background: 'rgba(139,92,246,0.08)',
    border: '1px solid rgba(139,92,246,0.15)',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 13,
    color: '#94a3b8',
  },
  statValue: {
    fontWeight: 700,
    color: '#06b6d4',
    marginRight: 4,
  },
  createBtn: {
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    background: 'rgba(139,92,246,0.04)',
    border: '1px dashed rgba(139,92,246,0.2)',
    borderRadius: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
  },
  th: {
    textAlign: 'left',
    padding: '8px 16px',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#64748b',
  },
  tr: {
    background: '#12122a',
    transition: 'all 0.2s',
  },
  td: {
    padding: '16px',
    fontSize: 14,
    borderTop: '1px solid rgba(139,92,246,0.08)',
    borderBottom: '1px solid rgba(139,92,246,0.08)',
  },
  tdFirst: {
    borderLeft: '1px solid rgba(139,92,246,0.08)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  tdLast: {
    borderRight: '1px solid rgba(139,92,246,0.08)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  productName: {
    fontWeight: 600,
    color: '#e2e8f0',
  },
  productMeta: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  categoryBadge: (color) => ({
    display: 'inline-block',
    background: `${color}18`,
    border: `1px solid ${color}40`,
    borderRadius: 6,
    padding: '3px 10px',
    fontSize: 12,
    fontWeight: 500,
    color: color,
  }),
  layerDots: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  layerDot: (color) => ({
    width: 14,
    height: 14,
    borderRadius: 4,
    background: color,
    border: '1px solid rgba(255,255,255,0.1)',
  }),
  layerCount: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  actions: {
    display: 'flex',
    gap: 6,
  },
  actionBtn: {
    background: 'rgba(139,92,246,0.1)',
    border: '1px solid rgba(139,92,246,0.2)',
    borderRadius: 6,
    color: '#c4b5fd',
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  deleteBtn: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: 6,
    color: '#fca5a5',
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  previewBtn: {
    background: 'rgba(6,182,212,0.1)',
    border: '1px solid rgba(6,182,212,0.25)',
    borderRadius: 6,
    color: '#67e8f9',
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  confirmOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
  },
  confirmBox: {
    background: '#1a1a2e',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 14,
    padding: 28,
    maxWidth: 400,
    textAlign: 'center',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    color: '#f87171',
  },
  confirmText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
  },
  confirmActions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
  },
  confirmCancel: {
    background: 'rgba(100,100,120,0.15)',
    border: '1px solid rgba(100,100,120,0.3)',
    borderRadius: 8,
    color: '#94a3b8',
    padding: '10px 24px',
    fontSize: 14,
    cursor: 'pointer',
  },
  confirmDelete: {
    background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    padding: '10px 24px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const CATEGORY_COLORS = {
  'Building Wire': '#8b5cf6',
  'Romex': '#f59e0b',
  'Underground': '#10b981',
  'MC Cable': '#06b6d4',
  'Service Entrance': '#ef4444',
  'THHN/THWN': '#ec4899',
  'Tray Cable': '#f97316',
  'Armored Cable': '#6366f1',
  'Fire Alarm': '#dc2626',
  'Other': '#64748b',
};

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadProducts = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setProducts(raw ? JSON.parse(raw) : []);
    } catch {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (product) => {
    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = products.filter((p) => p.id !== deleteTarget.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProducts(updated);
    setDeleteTarget(null);
  };

  const handlePreview = (product) => {
    navigate(`/product/${product.id}`);
  };

  const formatDate = (iso) => {
    if (!iso) return '--';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>Cable Explosion</span>
          <span style={styles.badge}>Admin</span>
        </div>
        <button
          style={styles.backLink}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => (e.target.style.color = '#c4b5fd')}
          onMouseLeave={(e) => (e.target.style.color = '#64748b')}
        >
          Back to Showcase
        </button>
      </header>

      {/* Content */}
      <main style={styles.content}>
        <div style={styles.topBar}>
          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statValue}>{products.length}</span>
              Product{products.length !== 1 ? 's' : ''}
            </div>
            <div style={styles.stat}>
              <span style={styles.statValue}>
                {products.reduce((sum, p) => sum + (p.layers?.length || 0), 0)}
              </span>
              Total Layers
            </div>
          </div>
          <button
            style={styles.createBtn}
            onClick={handleCreate}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            + Create New Product
          </button>
        </div>

        {products.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>///</div>
            <div style={styles.emptyTitle}>No Products Yet</div>
            <div style={styles.emptySubtitle}>
              Create your first 3D cable explosion product showcase.
            </div>
            <button style={styles.createBtn} onClick={handleCreate}>
              + Create Your First Product
            </button>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Layers</th>
                <th style={styles.th}>Updated</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const catColor = CATEGORY_COLORS[product.category] || '#64748b';
                return (
                  <tr
                    key={product.id}
                    style={styles.tr}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#16163a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#12122a';
                    }}
                  >
                    <td style={{ ...styles.td, ...styles.tdFirst }}>
                      <div style={styles.productName}>{product.productName || 'Untitled'}</div>
                      <div style={styles.productMeta}>
                        {product.heroText || 'No hero text'}{' '}
                        {product.conductorMaterial && (
                          <span>&middot; {product.conductorMaterial}</span>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.categoryBadge(catColor)}>
                        {product.category || 'Other'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.layerDots}>
                        {(product.layers || []).slice(0, 5).map((layer, i) => (
                          <div
                            key={i}
                            style={styles.layerDot(layer.color || '#8b5cf6')}
                            title={layer.name}
                          />
                        ))}
                        <span style={styles.layerCount}>
                          {product.layers?.length || 0}
                        </span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: '#94a3b8', fontSize: 13 }}>
                        {formatDate(product.updatedAt)}
                      </span>
                    </td>
                    <td style={{ ...styles.td, ...styles.tdLast, textAlign: 'right' }}>
                      <div style={{ ...styles.actions, justifyContent: 'flex-end' }}>
                        <button
                          style={styles.previewBtn}
                          onClick={() => handlePreview(product)}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(6,182,212,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(6,182,212,0.1)';
                          }}
                        >
                          Preview
                        </button>
                        <button
                          style={styles.actionBtn}
                          onClick={() => handleEdit(product)}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(139,92,246,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(139,92,246,0.1)';
                          }}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(product)}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(239,68,68,0.18)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(239,68,68,0.08)';
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div style={styles.confirmOverlay} onClick={() => setDeleteTarget(null)}>
          <div style={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.confirmTitle}>Delete Product</div>
            <div style={styles.confirmText}>
              Are you sure you want to delete{' '}
              <strong>{deleteTarget.productName || 'this product'}</strong>? This action cannot be
              undone.
            </div>
            <div style={styles.confirmActions}>
              <button style={styles.confirmCancel} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button style={styles.confirmDelete} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
