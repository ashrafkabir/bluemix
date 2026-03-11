import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Building Wire',
  'Romex',
  'Underground',
  'MC Cable',
  'Service Entrance',
  'THHN/THWN',
  'Tray Cable',
  'Armored Cable',
  'Fire Alarm',
  'Other',
];

const CONDUCTOR_MATERIALS = ['Copper', 'Aluminum'];

const defaultLayer = () => ({
  id: crypto.randomUUID(),
  name: '',
  color: '#8b5cf6',
  description: '',
  thickness: 1,
});

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    zIndex: 1000,
    overflowY: 'auto',
  },
  form: {
    background: '#1a1a2e',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 720,
    color: '#e2e8f0',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 24,
    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#94a3b8',
    marginBottom: 6,
  },
  input: {
    background: '#0f0f23',
    border: '1px solid rgba(139,92,246,0.25)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#e2e8f0',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    background: '#0f0f23',
    border: '1px solid rgba(139,92,246,0.25)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#e2e8f0',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  colorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  colorInput: {
    width: 40,
    height: 40,
    border: '2px solid rgba(139,92,246,0.3)',
    borderRadius: 8,
    background: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  colorHex: {
    background: '#0f0f23',
    border: '1px solid rgba(139,92,246,0.25)',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#e2e8f0',
    fontSize: 14,
    outline: 'none',
    flex: 1,
    boxSizing: 'border-box',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#06b6d4',
    marginBottom: 12,
    marginTop: 24,
    paddingBottom: 8,
    borderBottom: '1px solid rgba(6,182,212,0.2)',
  },
  layerCard: {
    background: '#0f0f23',
    border: '1px solid rgba(139,92,246,0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  layerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  layerIndex: {
    fontSize: 13,
    fontWeight: 600,
    color: '#8b5cf6',
  },
  layerControls: {
    display: 'flex',
    gap: 4,
  },
  smallBtn: {
    background: 'rgba(139,92,246,0.15)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: 6,
    color: '#c4b5fd',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: 13,
    transition: 'all 0.2s',
  },
  removeBtn: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 6,
    color: '#fca5a5',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: 13,
  },
  addLayerBtn: {
    background: 'rgba(6,182,212,0.1)',
    border: '1px dashed rgba(6,182,212,0.4)',
    borderRadius: 10,
    color: '#06b6d4',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    width: '100%',
    marginTop: 8,
    transition: 'all 0.2s',
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 28,
    justifyContent: 'flex-end',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    padding: '12px 28px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    background: 'rgba(139,92,246,0.1)',
    border: '1px solid rgba(139,92,246,0.3)',
    borderRadius: 10,
    color: '#c4b5fd',
    padding: '12px 28px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnCancel: {
    background: 'rgba(100,100,120,0.15)',
    border: '1px solid rgba(100,100,120,0.3)',
    borderRadius: 10,
    color: '#94a3b8',
    padding: '12px 28px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  previewBox: {
    marginTop: 20,
    background: '#0f0f23',
    border: '1px solid rgba(6,182,212,0.25)',
    borderRadius: 12,
    padding: 20,
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 12,
  },
  previewLayerStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    width: '100%',
    maxWidth: 400,
  },
  previewLayer: (color, thickness) => ({
    width: '80%',
    height: Math.max(12, thickness * 10),
    background: color,
    borderRadius: 6,
    opacity: 0.85,
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 600,
    color: '#fff',
    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
  }),
  error: {
    color: '#f87171',
    fontSize: 12,
    marginTop: 4,
  },
};

export default function AdminProductForm({ product, onSave, onCancel }) {
  const navigate = useNavigate();
  const isEditing = Boolean(product);

  const [form, setForm] = useState({
    id: '',
    productUrl: '',
    productName: '',
    heroText: '',
    tagline: '',
    category: CATEGORIES[0],
    voltageRating: '',
    temperatureRating: '',
    conductorMaterial: CONDUCTOR_MATERIALS[0],
    backgroundColor: '#0f0f23',
    lightningColor: '#8b5cf6',
    layers: [defaultLayer()],
    createdAt: '',
    updatedAt: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        layers: product.layers?.length
          ? product.layers.map((l) => ({ ...l, id: l.id || crypto.randomUUID() }))
          : [defaultLayer()],
      });
    }
  }, [product]);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateLayer = useCallback((layerId, field, value) => {
    setForm((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === layerId ? { ...l, [field]: value } : l)),
    }));
  }, []);

  const addLayer = useCallback(() => {
    setForm((prev) => ({ ...prev, layers: [...prev.layers, defaultLayer()] }));
  }, []);

  const removeLayer = useCallback((layerId) => {
    setForm((prev) => ({
      ...prev,
      layers: prev.layers.filter((l) => l.id !== layerId),
    }));
  }, []);

  const moveLayer = useCallback((index, direction) => {
    setForm((prev) => {
      const newLayers = [...prev.layers];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= newLayers.length) return prev;
      [newLayers[index], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[index]];
      return { ...prev, layers: newLayers };
    });
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.productName.trim()) errs.productName = 'Product name is required';
    if (!form.heroText.trim()) errs.heroText = 'Hero text is required';
    if (form.layers.length === 0) errs.layers = 'At least one layer is required';
    const emptyLayer = form.layers.find((l) => !l.name.trim());
    if (emptyLayer) errs.layers = 'All layers must have a name';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const now = new Date().toISOString();
    const savedProduct = {
      ...form,
      id: form.id || crypto.randomUUID(),
      createdAt: form.createdAt || now,
      updatedAt: now,
    };

    const existing = JSON.parse(localStorage.getItem('customCableProducts') || '[]');
    const index = existing.findIndex((p) => p.id === savedProduct.id);
    if (index >= 0) {
      existing[index] = savedProduct;
    } else {
      existing.push(savedProduct);
    }
    localStorage.setItem('customCableProducts', JSON.stringify(existing));

    if (onSave) {
      onSave(savedProduct);
    } else {
      navigate(`/product/${savedProduct.id}`);
    }
  };

  const renderField = (label, field, type = 'text', placeholder = '') => (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        style={{
          ...styles.input,
          borderColor: errors[field] ? '#ef4444' : undefined,
        }}
        value={form[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
      />
      {errors[field] && <span style={styles.error}>{errors[field]}</span>}
    </div>
  );

  const renderColorField = (label, field) => (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.colorRow}>
        <input
          type="color"
          style={styles.colorInput}
          value={form[field]}
          onChange={(e) => updateField(field, e.target.value)}
        />
        <input
          type="text"
          style={styles.colorHex}
          value={form[field]}
          onChange={(e) => updateField(field, e.target.value)}
          placeholder="#000000"
        />
      </div>
    </div>
  );

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.form} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{isEditing ? 'Edit Product' : 'Create New Product'}</h2>

        {renderField('Product URL', 'productUrl', 'url', 'https://www.southwire.com/...')}
        {renderField('Product Name', 'productName', 'text', 'e.g. THHN/THWN-2 Building Wire')}

        <div style={styles.row}>
          {renderField('Hero Text', 'heroText', 'text', 'e.g. BUILT TO CONDUCT')}
          {renderField('Tagline', 'tagline', 'text', 'e.g. Performance Under Pressure')}
        </div>

        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Category</label>
            <select
              style={styles.select}
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Conductor Material</label>
            <select
              style={styles.select}
              value={form.conductorMaterial}
              onChange={(e) => updateField('conductorMaterial', e.target.value)}
            >
              {CONDUCTOR_MATERIALS.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.row}>
          {renderField('Voltage Rating', 'voltageRating', 'text', 'e.g. 600V')}
          {renderField('Temperature Rating', 'temperatureRating', 'text', 'e.g. 90C')}
        </div>

        <div style={styles.row}>
          {renderColorField('Background Color', 'backgroundColor')}
          {renderColorField('Lightning Color', 'lightningColor')}
        </div>

        {/* Layers Section */}
        <h3 style={styles.sectionTitle}>Cable Layers</h3>
        {errors.layers && <span style={styles.error}>{errors.layers}</span>}

        {form.layers.map((layer, index) => (
          <div key={layer.id} style={styles.layerCard}>
            <div style={styles.layerHeader}>
              <span style={styles.layerIndex}>Layer {index + 1}</span>
              <div style={styles.layerControls}>
                <button
                  type="button"
                  style={{
                    ...styles.smallBtn,
                    opacity: index === 0 ? 0.4 : 1,
                    cursor: index === 0 ? 'default' : 'pointer',
                  }}
                  onClick={() => moveLayer(index, -1)}
                  disabled={index === 0}
                  title="Move up"
                >
                  &uarr;
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.smallBtn,
                    opacity: index === form.layers.length - 1 ? 0.4 : 1,
                    cursor: index === form.layers.length - 1 ? 'default' : 'pointer',
                  }}
                  onClick={() => moveLayer(index, 1)}
                  disabled={index === form.layers.length - 1}
                  title="Move down"
                >
                  &darr;
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.removeBtn,
                    opacity: form.layers.length <= 1 ? 0.4 : 1,
                    cursor: form.layers.length <= 1 ? 'default' : 'pointer',
                  }}
                  onClick={() => removeLayer(layer.id)}
                  disabled={form.layers.length <= 1}
                  title="Remove layer"
                >
                  &times;
                </button>
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Layer Name</label>
                <input
                  type="text"
                  style={styles.input}
                  value={layer.name}
                  onChange={(e) => updateLayer(layer.id, 'name', e.target.value)}
                  placeholder="e.g. PVC Jacket"
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Thickness</label>
                <input
                  type="number"
                  style={styles.input}
                  value={layer.thickness}
                  onChange={(e) => updateLayer(layer.id, 'thickness', parseFloat(e.target.value) || 0)}
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Color</label>
                <div style={styles.colorRow}>
                  <input
                    type="color"
                    style={styles.colorInput}
                    value={layer.color}
                    onChange={(e) => updateLayer(layer.id, 'color', e.target.value)}
                  />
                  <input
                    type="text"
                    style={styles.colorHex}
                    value={layer.color}
                    onChange={(e) => updateLayer(layer.id, 'color', e.target.value)}
                  />
                </div>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  style={styles.input}
                  value={layer.description}
                  onChange={(e) => updateLayer(layer.id, 'description', e.target.value)}
                  placeholder="e.g. Outer protective jacket"
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" style={styles.addLayerBtn} onClick={addLayer}>
          + Add Layer
        </button>

        {/* Inline Preview */}
        <div style={{ marginTop: 24 }}>
          <button
            type="button"
            style={styles.btnSecondary}
            onClick={() => setShowPreview((v) => !v)}
          >
            {showPreview ? 'Hide Preview' : 'Preview Layers'}
          </button>
        </div>

        {showPreview && (
          <div style={styles.previewBox}>
            <span style={styles.previewLabel}>Layer Stack Preview</span>
            <div
              style={{
                ...styles.previewBox,
                background: form.backgroundColor,
                border: `1px solid ${form.lightningColor}44`,
                width: '100%',
                minHeight: 120,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: form.lightningColor,
                  textAlign: 'center',
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {form.heroText || 'Hero Text'}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16, textAlign: 'center' }}>
                {form.tagline || 'Tagline'}
              </div>
              <div style={styles.previewLayerStack}>
                {form.layers.map((layer) => (
                  <div key={layer.id} style={styles.previewLayer(layer.color, layer.thickness)}>
                    {layer.name || 'Unnamed Layer'}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 12 }}>
                {form.productName || 'Product Name'} &middot; {form.category} &middot;{' '}
                {form.conductorMaterial}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.actions}>
          {onCancel && (
            <button type="button" style={styles.btnCancel} onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="button" style={styles.btnPrimary} onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
