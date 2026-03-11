import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Utility: linear interpolation
// ---------------------------------------------------------------------------
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ---------------------------------------------------------------------------
// Utility: clamp
// ---------------------------------------------------------------------------
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ---------------------------------------------------------------------------
// DEFAULT_LAYERS -- used when no `layers` prop is supplied
// ---------------------------------------------------------------------------
const DEFAULT_LAYERS = [
  { name: 'Conductor', color: '#e8a44a', description: 'Copper conductor core', thickness: 0.18 },
  { name: 'Insulation', color: '#f5f5f5', description: 'XLPE insulation layer', thickness: 0.12 },
  { name: 'Shield', color: '#8a8a8a', description: 'Braided copper shield', thickness: 0.06 },
  { name: 'Inner Jacket', color: '#2a2a2a', description: 'Inner PVC jacket', thickness: 0.08 },
  { name: 'Armour', color: '#b0b0b0', description: 'Steel wire armour', thickness: 0.07 },
  { name: 'Outer Jacket', color: '#1a1a2e', description: 'Outer PVC jacket', thickness: 0.1 },
];

// ---------------------------------------------------------------------------
// CableLayer -- a single concentric cylinder representing one cable layer
// ---------------------------------------------------------------------------
function CableLayer({
  innerRadius,
  outerRadius,
  length,
  color,
  name,
  description,
  index,
  totalLayers,
  explodeProgress,
  isExploded,
}) {
  const meshRef = useRef();
  const edgeRef = useRef();
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  // Build a hollow cylinder (tube) using LatheGeometry for nice results
  const geometry = useMemo(() => {
    const wallThickness = outerRadius - innerRadius;
    // Use CylinderGeometry with openEnded = false for solid look
    // We approximate a hollow cylinder by using a tube-like approach:
    // outer cylinder with an inner cylinder subtracted visually.
    // For simplicity and performance we render the outer surface only.
    const geo = new THREE.CylinderGeometry(
      outerRadius,  // radiusTop
      outerRadius,  // radiusBottom
      length,       // height
      64,           // radialSegments
      1,            // heightSegments
      false         // openEnded
    );
    return geo;
  }, [outerRadius, length]);

  // Edge geometry for highlighting
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(geometry, 30);
  }, [geometry]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Compute explosion offset
    const angle = (index / totalLayers) * Math.PI * 2;
    const radialDistance = explodeProgress * (1.2 + index * 0.5);
    const yOffset = explodeProgress * (index - totalLayers / 2) * 0.6;

    targetPosition.current.x = Math.cos(angle) * radialDistance;
    targetPosition.current.y = yOffset;
    targetPosition.current.z = Math.sin(angle) * radialDistance;

    // Smooth lerp toward target
    const lerpSpeed = 4 * delta;
    currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, clamp(lerpSpeed, 0, 1));
    currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, clamp(lerpSpeed, 0, 1));
    currentPosition.current.z = lerp(currentPosition.current.z, targetPosition.current.z, clamp(lerpSpeed, 0, 1));

    meshRef.current.position.set(
      currentPosition.current.x,
      currentPosition.current.y,
      currentPosition.current.z
    );

    if (edgeRef.current) {
      edgeRef.current.position.copy(meshRef.current.position);
    }
  });

  const showLabel = isExploded && explodeProgress > 0.5;

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.25}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          envMapIntensity={1.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Edge highlighting */}
      <lineSegments ref={edgeRef} geometry={edgesGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={explodeProgress > 0.1 ? 0.3 : 0.05}
          linewidth={1}
        />
      </lineSegments>

      {/* Label shown when exploded */}
      {showLabel && meshRef.current && (
        <Html
          position={[
            currentPosition.current.x,
            currentPosition.current.y + length / 2 + 0.4,
            currentPosition.current.z,
          ]}
          center
          distanceFactor={8}
          style={{
            transition: 'opacity 0.4s ease',
            opacity: explodeProgress > 0.6 ? 1 : 0,
          }}
        >
          <div
            style={{
              background: 'rgba(10, 10, 30, 0.85)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
              border: `1px solid ${color}`,
              backdropFilter: 'blur(6px)',
              textAlign: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 2 }}>{name}</div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>{description}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Cable -- the assembled cable model, manages rotation + explosion
// ---------------------------------------------------------------------------
function Cable({ layers = DEFAULT_LAYERS, scrollProgress = 0, isExploded = false }) {
  const groupRef = useRef();
  const currentRotation = useRef(0);

  const CABLE_LENGTH = 4;

  // Pre-compute cumulative radii
  const layerRadii = useMemo(() => {
    const radii = [];
    let currentRadius = 0;
    for (const layer of layers) {
      const inner = currentRadius;
      const outer = currentRadius + layer.thickness;
      radii.push({ inner, outer });
      currentRadius = outer;
    }
    return radii;
  }, [layers]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // scrollProgress 0 -> 0.5 : rotate 360 degrees
    // scrollProgress 0.5 -> 1.0 : hold rotation, explode
    const rotationProgress = clamp(scrollProgress / 0.5, 0, 1);
    const targetRotation = rotationProgress * Math.PI * 2;

    // Smooth rotation via lerp
    currentRotation.current = lerp(currentRotation.current, targetRotation, clamp(6 * delta, 0, 1));
    groupRef.current.rotation.y = currentRotation.current;
  });

  // Explosion progress derived from scrollProgress second half
  const rawExplodeProgress = clamp((scrollProgress - 0.5) / 0.5, 0, 1);
  // Ease-out for smoother feel
  const explodeProgress = 1 - Math.pow(1 - rawExplodeProgress, 3);

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      {layers.map((layer, i) => (
        <CableLayer
          key={layer.name + i}
          innerRadius={layerRadii[i].inner}
          outerRadius={layerRadii[i].outer}
          length={CABLE_LENGTH}
          color={layer.color}
          name={layer.name}
          description={layer.description}
          index={i}
          totalLayers={layers.length}
          explodeProgress={explodeProgress}
          isExploded={isExploded}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Lighting rig -- ambient + rim lighting for dramatic effect
// ---------------------------------------------------------------------------
function Lighting() {
  return (
    <>
      {/* Soft ambient fill */}
      <ambientLight intensity={0.3} color="#b0c4de" />

      {/* Key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
      />

      {/* Rim light -- back-left for dramatic edge highlighting */}
      <pointLight
        position={[-4, 3, -5]}
        intensity={2.0}
        color="#4a90d9"
        distance={20}
        decay={2}
      />

      {/* Rim light -- back-right warm accent */}
      <pointLight
        position={[4, -2, -4]}
        intensity={1.5}
        color="#d9864a"
        distance={18}
        decay={2}
      />

      {/* Subtle bottom fill to lift shadows */}
      <pointLight
        position={[0, -5, 2]}
        intensity={0.4}
        color="#6a7a9a"
        distance={15}
        decay={2}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// CableScene -- the wrapper that sets up Canvas, camera, environment
// ---------------------------------------------------------------------------
function CableScene({
  layers = DEFAULT_LAYERS,
  scrollProgress = 0,
  isExploded = false,
  style = {},
  className = '',
  backgroundColor = '#0a0a1a',
  enableOrbitControls = true,
}) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        ...style,
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 2, 6],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(backgroundColor);
        }}
      >
        {/* Lighting rig */}
        <Lighting />

        {/* Environment for reflections */}
        <Environment preset="city" environmentIntensity={0.5} />

        {/* Subtle floating motion when idle */}
        <Float
          speed={1.5}
          rotationIntensity={0.1}
          floatIntensity={0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <Cable
            layers={layers}
            scrollProgress={scrollProgress}
            isExploded={isExploded}
          />
        </Float>

        {/* Orbit controls */}
        {enableOrbitControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            dampingFactor={0.05}
            enableDamping
          />
        )}

        {/* Ground shadow catcher */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
export { Cable, CableLayer, CableScene, DEFAULT_LAYERS };
export default CableScene;
