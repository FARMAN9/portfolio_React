import RealPlant from './RealPlant';
import DesignerPlant from './DesignerPlant';

/* eslint-disable react/prop-types */
export default function BotanicalCredenza({ position = [-2.8, 0, 4.7], rotation = [0, 0, 0] }) {
  // Botanical credenza shelf dimensions
  const credW = 3.2;
  const credH = 0.58;
  const credD = 0.52;

  return (
    <group name="BotanicalCredenza" position={position} rotation={rotation}>
      {/* 1. Scandinavian Light Oak Cabinet Body (Reference 4 & 7) */}
      <mesh position={[0, credH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[credW, credH, credD]} />
        <meshStandardMaterial
          color="#d5bda5"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Vertical Fluted Slatted Wood Front Panels (Reference 7) */}
      {Array.from({ length: 44 }).map((_, i) => {
        const slatW = 0.045;
        const slatGap = 0.024;
        const totalSpan = 44 * (slatW + slatGap);
        const sx = -totalSpan / 2 + i * (slatW + slatGap) + slatW / 2;
        return (
          <mesh
            key={`slat-${i}`}
            position={[sx, credH / 2, credD / 2 + 0.012]}
            castShadow
          >
            <boxGeometry args={[slatW, credH - 0.06, 0.02]} />
            <meshStandardMaterial
              color="#b5997d"
              roughness={0.5}
              metalness={0.04}
            />
          </mesh>
        );
      })}

      {/* 3. Minimalist Black Steel Legs */}
      {[
        [-credW / 2 + 0.12, credD / 2 - 0.08],
        [credW / 2 - 0.12, credD / 2 - 0.08],
        [-credW / 2 + 0.12, -credD / 2 + 0.08],
        [credW / 2 - 0.12, -credD / 2 + 0.08]
      ].map(([lx, lz], idx) => (
        <mesh key={`cred-leg-${idx}`} position={[lx, 0.07, lz]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.14, 16]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      {/* 4. Row of Designer Potted Plants on Top (Reference Photo 7) */}
      {/* Plant 1: Large Broad-Leaf Monstera in White Planter */}
      <group position={[-1.25, credH + 0.02, 0]}>
        <RealPlant position={[0, 0, 0]} scale={1.25} rotation={[0, 0.4, 0]} />
      </group>

      {/* Plant 2: Sansevieria Snake Plant in Charcoal Fluted Pot */}
      <DesignerPlant
        type="snake"
        potStyle="charcoal-fluted"
        position={[-0.45, credH + 0.02, 0]}
        scale={0.78}
        rotation={[0, 0.2, 0]}
      />

      {/* Plant 3: Bird of Paradise in Terracotta with Metal Stand */}
      <DesignerPlant
        type="strelitzia"
        potStyle="terracotta"
        position={[0.35, credH + 0.02, 0]}
        scale={0.78}
        rotation={[0, -0.4, 0]}
      />

      {/* Plant 4: Fiddle-Leaf Fig in Crisp White Cylinder Pot */}
      <DesignerPlant
        type="fiddle"
        potStyle="white-cylinder"
        position={[1.15, credH + 0.02, 0]}
        scale={0.75}
        rotation={[0, 0.6, 0]}
      />

      {/* Trailing Vines Cascading Down Front Edge (Reference Photo 7) */}
      {[-0.85, 0.72].map((vx, i) => (
        <group key={`trailing-vine-${i}`} position={[vx, credH + 0.03, credD / 2 - 0.04]}>
          {[0, 1, 2, 3, 4, 5, 6].map((leafIdx) => {
            const drop = (leafIdx + 1) * 0.07;
            const wave = Math.sin(leafIdx * 1.2) * 0.03;
            return (
              <mesh
                key={`vine-leaf-${leafIdx}`}
                position={[wave, -drop, 0.015]}
                rotation={[0.2, 0, Math.sin(leafIdx) * 0.3]}
              >
                <circleGeometry args={[0.035, 8]} />
                <meshStandardMaterial color="#387a2a" roughness={0.4} side={2} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
