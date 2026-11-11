import { useMemo } from 'react';
import * as THREE from 'three';
import {
  getCodeScreenTexture,
  getMetricsScreenTexture,
  getRugTexture
} from './TextureGenerator';
import DesignerPlant from './DesignerPlant';

/* eslint-disable react/prop-types */
export default function Workstation({ onInspect }) {
  const codeScreen = useMemo(() => getCodeScreenTexture(), []);
  const metricsScreen = useMemo(() => getMetricsScreenTexture(), []);
  const rugTexture = useMemo(() => getRugTexture(), []);

  // Desk surface height and dimensions (matching Scandinavian minimalist desk in Reference 3)
  const deskY = 0.74;
  const deskW = 2.4;
  const deskD = 1.0;
  const legOffsetW = deskW / 2 - 0.08;
  const legOffsetD = deskD / 2 - 0.08;

  return (
    <group name="Workstation" position={[0, 0, -3.0]}>
      {/* 0. High-End Floor Rug (Warm Boho Geometric Motif) */}
      <mesh
        position={[-0.1, 0.003, 0.58]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.22, 48]} />
        <meshStandardMaterial
          map={rugTexture}
          roughness={0.88}
          metalness={0.04}
        />
      </mesh>

      {/* 1. Scandinavian Warm Natural Oak Desktop Surface (Reference Photo 3) */}
      <mesh
        position={[0, deskY, 0]}
        castShadow
        receiveShadow
        onClick={onInspect}
        style={{ cursor: 'pointer' }}
      >
        <boxGeometry args={[deskW, 0.045, deskD]} />
        <meshStandardMaterial
          color="#bfa07d"
          roughness={0.52}
          metalness={0.02}
        />
      </mesh>

      {/* Chamfered edge trim under the desktop */}
      <mesh position={[0, deskY - 0.026, 0]}>
        <boxGeometry args={[deskW - 0.02, 0.01, deskD - 0.02]} />
        <meshStandardMaterial color="#af8f6b" roughness={0.5} />
      </mesh>

      {/* 4 Clean Brushed Aluminum/Steel Square Legs (Reference Photo 3) */}
      {[
        [-legOffsetW, legOffsetD],
        [legOffsetW, legOffsetD],
        [-legOffsetW, -legOffsetD],
        [legOffsetW, -legOffsetD]
      ].map(([lx, lz], idx) => (
        <group key={`desk-leg-${idx}`} position={[lx, deskY / 2, lz]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.045, deskY, 0.045]} />
            <meshStandardMaterial color="#88909c" metalness={0.88} roughness={0.25} />
          </mesh>
          {/* Subtle floor glide foot */}
          <mesh position={[0, -deskY / 2 + 0.005, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
            <meshStandardMaterial color="#2d3139" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Perimeter Steel Sub-Frame connecting legs */}
      <mesh position={[0, deskY - 0.035, legOffsetD]}>
        <boxGeometry args={[deskW - 0.16, 0.035, 0.04]} />
        <meshStandardMaterial color="#88909c" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh position={[0, deskY - 0.035, -legOffsetD]}>
        <boxGeometry args={[deskW - 0.16, 0.035, 0.04]} />
        <meshStandardMaterial color="#88909c" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh position={[-legOffsetW, deskY - 0.035, 0]}>
        <boxGeometry args={[0.04, 0.035, deskD - 0.16]} />
        <meshStandardMaterial color="#88909c" metalness={0.88} roughness={0.25} />
      </mesh>
      <mesh position={[legOffsetW, deskY - 0.035, 0]}>
        <boxGeometry args={[0.04, 0.035, deskD - 0.16]} />
        <meshStandardMaterial color="#88909c" metalness={0.88} roughness={0.25} />
      </mesh>

      {/* 2. Premium Charcoal Desk Mat (Reference Photo 3) */}
      <mesh position={[-0.1, deskY + 0.024, 0.06]} receiveShadow>
        <boxGeometry args={[1.08, 0.004, 0.5]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.82} metalness={0.04} />
      </mesh>

      {/* 3. Dual Professional Thin-Bezel Monitors (Mounted on Dual VESA Arm - Reference 3) */}
      <group position={[-0.1, deskY + 0.023, -0.38]}>
        {/* Desk clamp */}
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[0.12, 0.07, 0.1]} />
          <meshStandardMaterial color="#14161b" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Vertical riser pillar */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.48, 16]} />
          <meshStandardMaterial color="#1e2229" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Dual articulated horizontal arms */}
        <mesh position={[0, 0.42, 0.05]}>
          <boxGeometry args={[0.85, 0.03, 0.04]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Left Monitor: VS Code IDE Display (Farman's React/Python Workspace) */}
      <group
        position={[-0.56, deskY + 0.45, -0.25]}
        rotation={[0, 0.14, 0]}
        onClick={onInspect}
        style={{ cursor: 'pointer' }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.48, 0.022]} />
          <meshStandardMaterial color="#121316" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.764, 0.464]} />
          <meshBasicMaterial map={codeScreen} />
        </mesh>
        <mesh position={[0.35, -0.22, 0.013]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <meshBasicMaterial color="#51cf66" />
        </mesh>
      </group>

      {/* Right Monitor: Live Cloud Telemetry & 3D Wireframe Display */}
      <group
        position={[0.36, deskY + 0.45, -0.25]}
        rotation={[0, -0.14, 0]}
        onClick={onInspect}
        style={{ cursor: 'pointer' }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.48, 0.022]} />
          <meshStandardMaterial color="#121316" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.764, 0.464]} />
          <meshBasicMaterial map={metricsScreen} />
        </mesh>
        <mesh position={[0.35, -0.22, 0.013]}>
          <sphereGeometry args={[0.003, 8, 8]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* 4. Overhead Minimalist Architectural LED Bar Lamp (Reference Photo 3) */}
      <group position={[-0.1, deskY + 0.023, -0.42]}>
        {/* Vertical slim riser stem behind monitors */}
        <mesh position={[-0.45, 0.46, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.92, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Forward cantilever arm */}
        <mesh position={[-0.45, 0.92, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.44, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Horizontal Slim LED Light Bar spanning overhead */}
        <mesh position={[0, 0.92, 0.44]}>
          <boxGeometry args={[0.92, 0.012, 0.02]} />
          <meshStandardMaterial color="#181a20" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* LED Diffuser Bar (Warm clean task light) */}
        <mesh position={[0, 0.913, 0.44]}>
          <boxGeometry args={[0.88, 0.003, 0.014]} />
          <meshBasicMaterial color="#fffbe6" />
        </mesh>
      </group>

      {/* 5. Minimalist Compact Mechanical Keyboard (Reference Photo 3) */}
      <group position={[-0.18, deskY + 0.026, 0.1]} rotation={[-0.03, 0.01, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.016, 0.135]} />
          <meshStandardMaterial color="#1e222b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.32, 0.008, 0.12]} />
          <meshStandardMaterial color="#2d313b" roughness={0.6} />
        </mesh>
        {/* Subtle key accents */}
        <mesh position={[-0.13, 0.016, -0.04]}>
          <boxGeometry args={[0.022, 0.008, 0.02]} />
          <meshStandardMaterial color="#ff5722" />
        </mesh>
        <mesh position={[0, 0.016, 0.04]}>
          <boxGeometry args={[0.14, 0.008, 0.018]} />
          <meshStandardMaterial color="#dbe4ee" roughness={0.5} />
        </mesh>
      </group>

      {/* 6. Precision Optical Mouse */}
      <group position={[0.24, deskY + 0.028, 0.1]} rotation={[0, -0.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.065, 0.025, 0.11]} />
          <meshStandardMaterial color="#171920" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.014, -0.02]}>
          <cylinderGeometry args={[0.005, 0.005, 0.018, 12]} />
          <meshStandardMaterial color="#ff7043" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 7. Modern High-End ATX Desktop PC Tower (Reference Photo 3) */}
      {/* Angled so the tempered glass panel with cool blue interior lighting faces into the room! */}
      <group position={[0.9, deskY + 0.24, -0.08]} rotation={[0, 0.46, 0]} castShadow>
        {/* Outer Matte Steel Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.46, 0.46]} />
          <meshStandardMaterial color="#14161b" metalness={0.88} roughness={0.22} />
        </mesh>
        {/* Front Fine Mesh Intake Panel */}
        <mesh position={[0, 0, 0.231]}>
          <planeGeometry args={[0.2, 0.44]} />
          <meshStandardMaterial color="#0c0d12" roughness={0.85} />
        </mesh>
        {/* Illuminated GPU Backplate with Cyan Accent */}
        <mesh position={[0, -0.04, 0.04]}>
          <boxGeometry args={[0.04, 0.02, 0.26]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Liquid Cooler Radiator Fan with Glowing Blue Ring (Reference Photo 3) */}
        <mesh position={[-0.02, 0.08, -0.04]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.04, 0.055, 24]} />
          <meshBasicMaterial color="#00d2ff" />
        </mesh>
        {/* Dual RGB RAM Sticks */}
        <mesh position={[0.02, 0.09, 0.05]}>
          <boxGeometry args={[0.01, 0.04, 0.008]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.02, 0.09, 0.07]}>
          <boxGeometry args={[0.01, 0.04, 0.008]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Tempered Glass Side Panel Facing Center Workspace */}
        <mesh position={[-0.112, 0, 0]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshPhysicalMaterial
            color="#0c2340"
            transparent
            opacity={0.45}
            roughness={0.03}
            metalness={0.2}
            transmission={0.65}
          />
        </mesh>
        {/* Soft Interior Blue Ambient Light */}
        <pointLight position={[-0.04, 0.02, 0]} color="#00d2ff" intensity={2.2} distance={1.6} />
      </group>

      {/* 8. Desktop Designer Potted Plant (Mini Monstera in Ceramic Pot - Reference 3) */}
      <DesignerPlant
        type="monstera"
        potStyle="white-cylinder"
        position={[-1.02, deskY + 0.023, -0.28]}
        scale={0.44}
      />

      {/* 9. Herman Miller Aeron / Cosm Style High-End Ergonomic Mesh Chair (Reference Photo 3) */}
      <group position={[-0.1, 0, 0.68]} rotation={[0, -0.08, 0]}>
        {/* 5-Star Spider Base with Dual Caster Wheels */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const cx = Math.sin(angle) * 0.31;
          const cz = Math.cos(angle) * 0.31;
          return (
            <group key={`caster-${i}`}>
              <mesh position={[cx / 2, 0.04, cz / 2]} rotation={[0, angle, 0]}>
                <boxGeometry args={[0.032, 0.022, 0.31]} />
                <meshStandardMaterial color="#1e2229" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[cx, 0.025, cz]}>
                <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
                <meshStandardMaterial color="#111215" roughness={0.7} />
              </mesh>
            </group>
          );
        })}

        {/* Pneumatic Chrome Cylinder Column */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.32, 16]} />
          <meshStandardMaterial color="#ced4da" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Ergonomic Tilt Mechanism Box under seat */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <boxGeometry args={[0.24, 0.06, 0.22]} />
          <meshStandardMaterial color="#181a20" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Breathable Contoured Mesh Seat Cushion (Waterfall front curve) */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.065, 0.48]} />
          <meshStandardMaterial color="#21252f" roughness={0.7} metalness={0.15} />
        </mesh>

        {/* Wishbone Y-Spine Structural Frame on Back (Reference Photo 3) */}
        <mesh position={[0, 0.65, -0.23]} rotation={[-0.08, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 0.42, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[-0.14, 0.82, -0.25]} rotation={[0, 0, -0.28]}>
          <cylinderGeometry args={[0.012, 0.012, 0.26, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.14, 0.82, -0.25]} rotation={[0, 0, 0.28]}>
          <cylinderGeometry args={[0.012, 0.012, 0.26, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Ergonomic Mesh Backrest: Open Frame with Translucent High-Tension Mesh */}
        <group position={[0, 0.8, -0.24]} rotation={[-0.08, 0, 0]}>
          {/* Top Arch */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <boxGeometry args={[0.46, 0.035, 0.025]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Bottom Rail */}
          <mesh position={[0, -0.26, 0]} castShadow>
            <boxGeometry args={[0.44, 0.035, 0.025]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Left Vertical Rail */}
          <mesh position={[-0.22, 0, 0]} castShadow>
            <boxGeometry args={[0.035, 0.52, 0.025]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Right Vertical Rail */}
          <mesh position={[0.22, 0, 0]} castShadow>
            <boxGeometry args={[0.035, 0.52, 0.025]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Breathable Translucent Mesh Panel (See-through airy mesh) */}
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.41, 0.49]} />
            <meshPhysicalMaterial
              color="#2a2e38"
              transparent
              opacity={0.65}
              roughness={0.7}
              transmission={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Adjustable Contoured Lumbar Support Pad */}
          <mesh position={[0, -0.09, 0.016]}>
            <boxGeometry args={[0.3, 0.1, 0.018]} />
            <meshStandardMaterial color="#121318" roughness={0.6} />
          </mesh>
        </group>

        {/* Adjustable Ergonomic T-Armrests with Polyurethane Soft Pads */}
        <group position={[-0.27, 0.58, 0]}>
          <mesh position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.014, 0.014, 0.18, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.06, 0.026, 0.24]} />
            <meshStandardMaterial color="#111215" roughness={0.7} />
          </mesh>
        </group>
        <group position={[0.27, 0.58, 0]}>
          <mesh position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.014, 0.014, 0.18, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.06, 0.026, 0.24]} />
            <meshStandardMaterial color="#111215" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 10. Modern Minimalist Floor Lamp (Left of Workstation) */}
      <group position={[-1.75, 0, 0.15]}>
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          const spread = 0.28;
          return (
            <mesh
              key={`tripod-leg-${i}`}
              position={[Math.sin(angle) * (spread / 2), 0.72, Math.cos(angle) * (spread / 2)]}
              rotation={[-Math.cos(angle) * 0.18, angle, Math.sin(angle) * 0.18]}
              castShadow
            >
              <cylinderGeometry args={[0.01, 0.014, 1.48, 12]} />
              <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
            </mesh>
          );
        })}
        <mesh position={[0, 1.44, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
          <meshStandardMaterial color="#22252c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Linen Cylindrical Lampshade */}
        <mesh position={[0, 1.62, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.32, 32, 1, true]} />
          <meshStandardMaterial
            color="#f7efe1"
            roughness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight position={[0, 1.62, 0]} color="#fff0d4" intensity={2.2} distance={4.8} />
      </group>
    </group>
  );
}
