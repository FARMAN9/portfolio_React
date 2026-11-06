import { useMemo } from 'react';
import { getCodeScreenTexture, getMetricsScreenTexture } from './TextureGenerator';

/* eslint-disable react/prop-types */
export default function Workstation({ onInspect }) {
  const codeScreen = useMemo(() => getCodeScreenTexture(), []);
  const metricsScreen = useMemo(() => getMetricsScreenTexture(), []);

  // Desk center position: [0, 0, -3.0]
  const deskY = 0.74; // Desk surface height

  return (
    <group name="Workstation" position={[0, 0, -3.0]}>
      {/* 1. Executive Desk Surface */}
      <mesh
        position={[0, deskY, 0]}
        castShadow
        receiveShadow
        onClick={onInspect}
        style={{ cursor: 'pointer' }}
      >
        <boxGeometry args={[2.5, 0.05, 1.05]} />
        <meshStandardMaterial
          color="#221b17"
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Desk Chamfered Edge Trim */}
      <mesh position={[0, deskY - 0.03, 0]}>
        <boxGeometry args={[2.52, 0.015, 1.07]} />
        <meshStandardMaterial color="#110d0a" roughness={0.7} />
      </mesh>

      {/* Desk Cable Grommet */}
      <mesh position={[0.6, deskY + 0.026, -0.38]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.005, 24]} />
        <meshStandardMaterial color="#33373d" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Heavy-Duty Steel Sled Legs */}
      {/* Left Sled Leg */}
      <group position={[-1.12, deskY / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.06, deskY, 0.95]} />
          <meshStandardMaterial color="#1a1c20" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Foot pad */}
        <mesh position={[0, -deskY / 2 + 0.01, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.98]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Sled Leg */}
      <group position={[1.12, deskY / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.06, deskY, 0.95]} />
          <meshStandardMaterial color="#1a1c20" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Foot pad */}
        <mesh position={[0, -deskY / 2 + 0.01, 0]}>
          <boxGeometry args={[0.1, 0.02, 0.98]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
      </group>

      {/* Desk Stiffener Crossbeam */}
      <mesh position={[0, deskY - 0.08, -0.2]}>
        <boxGeometry args={[2.18, 0.04, 0.05]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 2. Premium Desk Mat */}
      <mesh position={[0, deskY + 0.027, 0.05]} receiveShadow>
        <boxGeometry args={[0.96, 0.004, 0.44]} />
        <meshStandardMaterial color="#17191e" roughness={0.82} metalness={0.05} />
      </mesh>
      {/* Desk Mat Orange Accent Stitching */}
      <mesh position={[0, deskY + 0.029, -0.168]}>
        <boxGeometry args={[0.94, 0.001, 0.004]} />
        <meshBasicMaterial color="#ff5722" />
      </mesh>

      {/* 3. Dual Curved Professional Monitors */}
      {/* Monitor Dual Arm Stand */}
      <group position={[0, deskY + 0.026, -0.42]}>
        {/* Desk clamp */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.12]} />
          <meshStandardMaterial color="#121316" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Vertical riser pillar */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.48, 16]} />
          <meshStandardMaterial color="#1d1f24" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Horizontal articulated dual cross-arm */}
        <mesh position={[0, 0.42, 0.04]}>
          <boxGeometry args={[0.82, 0.035, 0.05]} />
          <meshStandardMaterial color="#1a1c20" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Left Monitor: Code IDE Display (Farman's React/Python Workstation) */}
      <group
        position={[-0.48, deskY + 0.44, -0.26]}
        rotation={[0, 0.16, 0]}
        onClick={onInspect}
      >
        {/* Screen Bezel & Enclosure */}
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.48, 0.025]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Active Display Panel with Code Texture */}
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.74, 0.46]} />
          <meshBasicMaterial map={codeScreen} />
        </mesh>
        {/* Power LED Indicator (Soft Green) */}
        <mesh position={[0.34, -0.22, 0.015]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <meshBasicMaterial color="#51cf66" />
        </mesh>
      </group>

      {/* Right Monitor: Metrics & Telemetry Display */}
      <group
        position={[0.48, deskY + 0.44, -0.26]}
        rotation={[0, -0.16, 0]}
        onClick={onInspect}
      >
        {/* Screen Bezel & Enclosure */}
        <mesh castShadow>
          <boxGeometry args={[0.76, 0.48, 0.025]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Active Display Panel with Metrics Texture */}
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.74, 0.46]} />
          <meshBasicMaterial map={metricsScreen} />
        </mesh>
        {/* Power LED Indicator */}
        <mesh position={[0.34, -0.22, 0.015]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <meshBasicMaterial color="#339af0" />
        </mesh>
      </group>

      {/* 4. Mechanical Keyboard (75% Compact Layout) */}
      <group position={[-0.08, deskY + 0.03, 0.08]} rotation={[-0.04, 0.02, 0]}>
        {/* Keyboard chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.016, 0.135]} />
          <meshStandardMaterial color="#1e222b" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Keycap bed */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.32, 0.008, 0.12]} />
          <meshStandardMaterial color="#2d313b" roughness={0.6} />
        </mesh>
        {/* Keycaps top representation */}
        <mesh position={[-0.13, 0.016, -0.04]}>
          {/* Escape Keycap (Orange) */}
          <boxGeometry args={[0.022, 0.008, 0.02]} />
          <meshStandardMaterial color="#ff5722" />
        </mesh>
        <mesh position={[0.13, 0.016, 0.01]}>
          {/* Enter Keycap (Amber) */}
          <boxGeometry args={[0.035, 0.008, 0.02]} />
          <meshStandardMaterial color="#fcc419" />
        </mesh>
        <mesh position={[0, 0.016, 0.04]}>
          {/* Spacebar */}
          <boxGeometry args={[0.14, 0.008, 0.018]} />
          <meshStandardMaterial color="#dbe4ee" roughness={0.5} />
        </mesh>
      </group>

      {/* 5. Precision Ergonomic Mouse */}
      <group position={[0.28, deskY + 0.032, 0.08]} rotation={[0, -0.06, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.065, 0.025, 0.11]} />
          <meshStandardMaterial color="#171920" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Metallic Scroll Wheel */}
        <mesh position={[0, 0.014, -0.02]}>
          <cylinderGeometry args={[0.005, 0.005, 0.018, 12]} />
          <meshStandardMaterial color="#ff7043" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 6. Custom Desktop PC Tower (Tempered Glass Side Panel) */}
      <group position={[1.02, deskY / 2, 0.05]} castShadow>
        {/* Main PC Case */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.46, 0.46]} />
          <meshStandardMaterial color="#111317" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Front Mesh Panel with Dual Ring Fans */}
        <mesh position={[0, 0, 0.232]}>
          <planeGeometry args={[0.2, 0.44]} />
          <meshStandardMaterial color="#0b0c0f" roughness={0.8} />
        </mesh>
        {/* Front Fan Glow Rings */}
        <mesh position={[0, 0.09, 0.233]}>
          <ringGeometry args={[0.05, 0.062, 32]} />
          <meshBasicMaterial color="#ff5722" />
        </mesh>
        <mesh position={[0, -0.09, 0.233]}>
          <ringGeometry args={[0.05, 0.062, 32]} />
          <meshBasicMaterial color="#339af0" />
        </mesh>

        {/* Tempered Glass Left Side Panel */}
        <mesh position={[-0.112, 0, 0]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshPhysicalMaterial
            color="#080a10"
            transparent
            opacity={0.3}
            roughness={0.05}
            metalness={0.1}
            transmission={0.7}
          />
        </mesh>
        {/* Internal GPU / Cooler Light Glow */}
        <pointLight position={[-0.05, 0.02, 0]} color="#ff7043" intensity={0.6} distance={0.8} />
      </group>

      {/* 7. Modern Articulated Desk Lamp with Warm Task Light */}
      <group position={[-0.95, deskY + 0.026, -0.3]}>
        {/* Heavy circular base */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.015, 24]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lower arm rod */}
        <mesh position={[0, 0.18, 0.04]} rotation={[0.22, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.36, 12]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Upper arm rod */}
        <mesh position={[0, 0.4, 0.18]} rotation={[-0.35, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.32, 12]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Lamp Shade Hood */}
        <mesh position={[0, 0.48, 0.28]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.065, 0.1, 16, 1, true]} />
          <meshStandardMaterial color="#21252d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Warm Task Spotlight illuminating desk pad */}
        <spotLight
          position={[0, 0.48, 0.28]}
          target-position={[0.2, deskY, 0.1]}
          color="#ffeedb"
          intensity={2.2}
          angle={0.65}
          penumbra={0.5}
          distance={2.4}
          castShadow
        />
      </group>

      {/* 8. Ergonomic Mesh High-Back Chair */}
      <group position={[0, 0, 0.65]} rotation={[0, -0.1, 0]}>
        {/* Five-star star base & 5 caster wheels */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const cx = Math.sin(angle) * 0.28;
          const cz = Math.cos(angle) * 0.28;
          return (
            <group key={`caster-${i}`}>
              <mesh position={[cx / 2, 0.04, cz / 2]} rotation={[0, angle, 0]}>
                <boxGeometry args={[0.03, 0.02, 0.28]} />
                <meshStandardMaterial color="#1e2229" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[cx, 0.025, cz]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#0f1013" roughness={0.7} />
              </mesh>
            </group>
          );
        })}
        {/* Pneumatic center cylinder column */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.32, 16]} />
          <meshStandardMaterial color="#2c3039" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Seat cushion (contoured ergonomic mesh) */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.07, 0.46]} />
          <meshStandardMaterial color="#1d2027" roughness={0.75} metalness={0.1} />
        </mesh>
        {/* High-back curved ergonomic spine & lumbar support */}
        <mesh position={[0, 0.76, -0.22]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.44, 0.58, 0.04]} />
          <meshStandardMaterial color="#181a20" roughness={0.75} metalness={0.15} />
        </mesh>
        {/* Adjustable Armrests */}
        <mesh position={[-0.26, 0.58, 0]}>
          <boxGeometry args={[0.05, 0.03, 0.24]} />
          <meshStandardMaterial color="#121316" roughness={0.6} />
        </mesh>
        <mesh position={[0.26, 0.58, 0]}>
          <boxGeometry args={[0.05, 0.03, 0.24]} />
          <meshStandardMaterial color="#121316" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
