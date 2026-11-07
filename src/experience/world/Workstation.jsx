import { useMemo } from 'react';
import * as THREE from 'three';
import {
  getCodeScreenTexture,
  getMetricsScreenTexture,
  getRugTexture,
  getWallArtTextures
} from './TextureGenerator';
import RealPlant from './RealPlant';

/* eslint-disable react/prop-types */
export default function Workstation({ onInspect }) {
  const codeScreen = useMemo(() => getCodeScreenTexture(), []);
  const metricsScreen = useMemo(() => getMetricsScreenTexture(), []);
  const rugTexture = useMemo(() => getRugTexture(), []);
  const wallArts = useMemo(() => getWallArtTextures(), []);

  // Desk surface height and dimensions (matching Scandinavian minimalist desk in Reference 1 & 5)
  const deskY = 0.74;
  const deskW = 2.4;
  const deskD = 1.0;
  const legOffsetW = deskW / 2 - 0.08;
  const legOffsetD = deskD / 2 - 0.08;

  return (
    <group name="Workstation" position={[0, 0, -3.0]}>
      {/* 0. Ornate Persian / Boho Circular Floor Rug (Reference Photo 5) */}
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

      {/* 1. Scandinavian Light Oak Desktop Surface (Reference Photo 1 & 5) */}
      <mesh
        position={[0, deskY, 0]}
        castShadow
        receiveShadow
        onClick={onInspect}
        style={{ cursor: 'pointer' }}
      >
        <boxGeometry args={[deskW, 0.045, deskD]} />
        <meshStandardMaterial
          color="#d8c3a9"
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Chamfered edge trim under the desktop */}
      <mesh position={[0, deskY - 0.026, 0]}>
        <boxGeometry args={[deskW - 0.02, 0.01, deskD - 0.02]} />
        <meshStandardMaterial color="#bda389" roughness={0.5} />
      </mesh>

      {/* 4 Clean Brushed Steel Vertical Square Legs (Reference Photo 1) */}
      {[
        [-legOffsetW, legOffsetD],
        [legOffsetW, legOffsetD],
        [-legOffsetW, -legOffsetD],
        [legOffsetW, -legOffsetD]
      ].map(([lx, lz], idx) => (
        <group key={`desk-leg-${idx}`} position={[lx, deskY / 2, lz]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.045, deskY, 0.045]} />
            <meshStandardMaterial color="#9ea6b0" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Subtle floor glide foot */}
          <mesh position={[0, -deskY / 2 + 0.005, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
            <meshStandardMaterial color="#2d3139" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Recessed Perimeter Steel Sub-Frame connecting legs */}
      <mesh position={[0, deskY - 0.035, legOffsetD]}>
        <boxGeometry args={[deskW - 0.16, 0.035, 0.04]} />
        <meshStandardMaterial color="#9ea6b0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, deskY - 0.035, -legOffsetD]}>
        <boxGeometry args={[deskW - 0.16, 0.035, 0.04]} />
        <meshStandardMaterial color="#9ea6b0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[-legOffsetW, deskY - 0.035, 0]}>
        <boxGeometry args={[0.04, 0.035, deskD - 0.16]} />
        <meshStandardMaterial color="#9ea6b0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[legOffsetW, deskY - 0.035, 0]}>
        <boxGeometry args={[0.04, 0.035, deskD - 0.16]} />
        <meshStandardMaterial color="#9ea6b0" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Warm Ambient LED Bias Backlight Strip along Desk Rear (Reference Photo 5) */}
      <mesh position={[0, deskY + 0.015, -deskD / 2 + 0.01]}>
        <boxGeometry args={[deskW - 0.2, 0.008, 0.015]} />
        <meshBasicMaterial color="#ff922b" />
      </mesh>

      {/* 2. Premium Dark Leather Desk Mat */}
      <mesh position={[-0.1, deskY + 0.024, 0.06]} receiveShadow>
        <boxGeometry args={[1.05, 0.004, 0.48]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Subtle orange accent stitching (Reference Photo 5) */}
      <mesh position={[-0.1, deskY + 0.026, -0.175]}>
        <boxGeometry args={[1.03, 0.001, 0.004]} />
        <meshBasicMaterial color="#ff7043" />
      </mesh>

      {/* 3. Dual Professional Thin-Bezel Monitors (Mounted on Dual VESA Arm) */}
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

      {/* Right Monitor: Live Cloud Telemetry & Metrics Display */}
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
          <meshBasicMaterial color="#339af0" />
        </mesh>
      </group>

      {/* 4. Overhead Minimalist Architectural LED Bar Lamp (Reference Photo 1) */}
      <group position={[-0.1, deskY + 0.023, -0.42]}>
        {/* Vertical slim riser stem behind monitors */}
        <mesh position={[-0.45, 0.44, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.88, 12]} />
          <meshStandardMaterial color="#22252c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Forward horizontal cantilever arm */}
        <mesh position={[-0.45, 0.88, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.36, 12]} />
          <meshStandardMaterial color="#22252c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Horizontal LED Light Bar spanning overhead */}
        <mesh position={[0, 0.88, 0.36]}>
          <boxGeometry args={[0.88, 0.014, 0.022]} />
          <meshStandardMaterial color="#22252c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* LED Diffuser Bar (Glowing warm light downwards) */}
        <mesh position={[0, 0.872, 0.36]}>
          <boxGeometry args={[0.84, 0.004, 0.016]} />
          <meshBasicMaterial color="#fffbe6" />
        </mesh>
      </group>

      {/* 5. Minimalist Desktop Speakers (Reference Photo 5) */}
      <group position={[-0.62, deskY + 0.06, 0.05]}>
        <mesh castShadow>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#f0f2f5" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Speaker Driver cone */}
        <mesh position={[0, 0, 0.038]} rotation={[0.2, 0, 0]}>
          <circleGeometry args={[0.026, 16]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.6} />
        </mesh>
      </group>
      <group position={[0.42, deskY + 0.06, 0.05]}>
        <mesh castShadow>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#f0f2f5" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.038]} rotation={[0.2, 0, 0]}>
          <circleGeometry args={[0.026, 16]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.6} />
        </mesh>
      </group>

      {/* 6. Mechanical Keyboard (75% Compact Layout with Orange/Amber Accent Keycaps) */}
      <group position={[-0.18, deskY + 0.026, 0.1]} rotation={[-0.03, 0.01, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.016, 0.135]} />
          <meshStandardMaterial color="#1e222b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.32, 0.008, 0.12]} />
          <meshStandardMaterial color="#2d313b" roughness={0.6} />
        </mesh>
        {/* Accent keycaps */}
        <mesh position={[-0.13, 0.016, -0.04]}>
          <boxGeometry args={[0.022, 0.008, 0.02]} />
          <meshStandardMaterial color="#ff5722" />
        </mesh>
        <mesh position={[0.13, 0.016, 0.01]}>
          <boxGeometry args={[0.035, 0.008, 0.02]} />
          <meshStandardMaterial color="#ff922b" />
        </mesh>
        <mesh position={[0, 0.016, 0.04]}>
          <boxGeometry args={[0.14, 0.008, 0.018]} />
          <meshStandardMaterial color="#dbe4ee" roughness={0.5} />
        </mesh>
      </group>

      {/* 7. Precision Optical Mouse */}
      <group position={[0.22, deskY + 0.028, 0.1]} rotation={[0, -0.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.065, 0.025, 0.11]} />
          <meshStandardMaterial color="#171920" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.014, -0.02]}>
          <cylinderGeometry args={[0.005, 0.005, 0.018, 12]} />
          <meshStandardMaterial color="#ff7043" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 8. Modern Desktop PC Tower on Desk (Right side, matching Reference 1 & 5) */}
      <group position={[0.92, deskY + 0.23, -0.05]} castShadow>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.44, 0.44]} />
          <meshStandardMaterial color="#15171d" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.222]}>
          <planeGeometry args={[0.19, 0.41]} />
          <meshStandardMaterial color="#0b0c10" roughness={0.8} />
        </mesh>
        {/* RGB Fan Rings (Amber / Orange internal glow - Reference Photo 5) */}
        <mesh position={[0, 0.09, 0.223]}>
          <ringGeometry args={[0.045, 0.058, 32]} />
          <meshBasicMaterial color="#ff7043" />
        </mesh>
        <mesh position={[0, -0.09, 0.223]}>
          <ringGeometry args={[0.045, 0.058, 32]} />
          <meshBasicMaterial color="#ff922b" />
        </mesh>
        {/* Tempered Glass Side Panel */}
        <mesh position={[-0.112, 0, 0]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshPhysicalMaterial
            color="#080a10"
            transparent
            opacity={0.25}
            roughness={0.04}
            metalness={0.1}
            transmission={0.75}
          />
        </mesh>
        <pointLight position={[-0.05, 0.02, 0]} color="#ff922b" intensity={1.2} distance={1.1} />
      </group>

      {/* 9. Desktop Real Potted Plant (Mini Monstera on Desk Corner) */}
      <RealPlant
        position={[-1.02, deskY + 0.023, -0.28]}
        scale={0.42}
      />

      {/* 10. Herman Miller Style Ergonomic Task Chair with Contoured Headrest (Reference Photo 5) */}
      <group position={[-0.1, 0, 0.68]} rotation={[0, -0.08, 0]}>
        {/* 5-Star Spider Base */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.9} roughness={0.2} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const cx = Math.sin(angle) * 0.29;
          const cz = Math.cos(angle) * 0.29;
          return (
            <group key={`caster-${i}`}>
              <mesh position={[cx / 2, 0.04, cz / 2]} rotation={[0, angle, 0]}>
                <boxGeometry args={[0.03, 0.02, 0.29]} />
                <meshStandardMaterial color="#1e2229" metalness={0.85} roughness={0.3} />
              </mesh>
              <mesh position={[cx, 0.025, cz]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#0f1013" roughness={0.7} />
              </mesh>
            </group>
          );
        })}

        {/* Pneumatic Chrome Cylinder */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.32, 16]} />
          <meshStandardMaterial color="#ced4da" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Seat Cushion (Contoured Breathable Mesh with Waterfall Edge) */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.065, 0.46]} />
          <meshStandardMaterial color="#21252f" roughness={0.7} metalness={0.15} />
        </mesh>

        {/* Dual-Post Ergonomic Lumbar Spine (Rear frame) */}
        <mesh position={[0, 0.65, -0.22]} rotation={[-0.08, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.42, 12]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Breathable Mesh Backrest Frame & Translucent Mesh Panel */}
        <group position={[0, 0.78, -0.23]} rotation={[-0.08, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.54, 0.03]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.005]}>
            <planeGeometry args={[0.40, 0.48]} />
            <meshStandardMaterial
              color="#2a2e38"
              roughness={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>

        {/* Contoured Adjustable Ergonomic Mesh Headrest (Reference Photo 5!) */}
        <group position={[0, 1.15, -0.26]} rotation={[-0.1, 0, 0]}>
          {/* Dual Chrome stalks */}
          <mesh position={[-0.05, -0.06, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
            <meshStandardMaterial color="#ced4da" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0.05, -0.06, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.12, 12]} />
            <meshStandardMaterial color="#ced4da" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Headrest Frame */}
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.13, 0.025]} />
            <meshStandardMaterial color="#181a20" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Headrest Curved Cushion */}
          <mesh position={[0, 0, 0.012]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.24, 16]} />
            <meshStandardMaterial color="#21252f" roughness={0.7} metalness={0.15} />
          </mesh>
        </group>

        {/* Adjustable T-Armrests */}
        <group position={[-0.26, 0.56, 0]}>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.055, 0.025, 0.22]} />
            <meshStandardMaterial color="#121316" roughness={0.7} />
          </mesh>
        </group>
        <group position={[0.26, 0.56, 0]}>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.16, 12]} />
            <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.055, 0.025, 0.22]} />
            <meshStandardMaterial color="#121316" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 11. Modern Architectural Tripod Floor Lamp (Reference Photo 5) */}
      <group position={[-1.75, 0, 0.15]}>
        {/* 3 Angled Dark Steel Legs */}
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
        <pointLight position={[0, 1.62, 0]} color="#fff0d4" intensity={2.6} distance={4.8} />
      </group>

      {/* 12. Modern Framed Wall Art Triptych (Reference Photo 3 & 5) */}
      <group position={[-0.1, 2.5, -0.92]}>
        {[-0.65, 0, 0.65].map((ax, i) => (
          <group key={`art-frame-${i}`} position={[ax, 0, 0]}>
            {/* Outer Matte Black Frame */}
            <mesh castShadow>
              <boxGeometry args={[0.54, 0.72, 0.025]} />
              <meshStandardMaterial color="#14151b" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Inner Art Canvas */}
            <mesh position={[0, 0, 0.014]}>
              <planeGeometry args={[0.49, 0.67]} />
              <meshBasicMaterial map={wallArts[i]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
