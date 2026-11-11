import { useMemo } from 'react';
import * as THREE from 'three';

/* eslint-disable react/prop-types */

/**
 * Designer Architectural Potted Plants inspired by Reference Photos 4, 6 & 7.
 * Supports varieties: 'snake', 'monstera', 'fiddle', 'strelitzia', 'palm'
 * with modern designer pots (white cylinder, terracotta, charcoal fluted) and stands.
 */
export default function DesignerPlant({
  type = 'snake',
  potStyle = 'white-cylinder',
  hasStand = false,
  standHeight = 0.28,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}) {
  // Pot dimensions
  const potRadius = 0.22;
  const potHeight = 0.44;
  const totalBaseY = hasStand ? standHeight : 0;

  // Plant geometries & components based on variety
  const plantElements = useMemo(() => {
    switch (type) {
      case 'snake': {
        // Sansevieria Trifasciata - Upright variegated architectural sword blades
        const blades = [];
        const count = 14;
        for (let i = 0; i < count; i++) {
          const angle = (i * Math.PI * 2) / count + (i * 0.4);
          const radius = 0.05 + (i % 3) * 0.045;
          const px = Math.cos(angle) * radius;
          const pz = Math.sin(angle) * radius;
          const bladeHeight = 0.65 + (i % 5) * 0.12;
          const lean = 0.04 + (i % 3) * 0.03;
          const rotZ = Math.cos(angle) * lean;
          const rotX = -Math.sin(angle) * lean;
          const rotY = angle + Math.PI / 2;
          const colorTone = i % 2 === 0 ? '#264e23' : '#1e3f1c';

          blades.push(
            <group
              key={`snake-blade-${i}`}
              position={[px, potHeight + totalBaseY + bladeHeight / 2 - 0.02, pz]}
              rotation={[rotX, rotY, rotZ]}
            >
              {/* Main Sword Blade */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.075, bladeHeight, 0.008]} />
                <meshStandardMaterial
                  color={colorTone}
                  roughness={0.35}
                  metalness={0.05}
                />
              </mesh>
              {/* Variegated Golden-Yellow Margin Edges */}
              <mesh position={[0.038, 0, 0]}>
                <boxGeometry args={[0.006, bladeHeight * 0.98, 0.009]} />
                <meshStandardMaterial color="#c8a846" roughness={0.4} />
              </mesh>
              <mesh position={[-0.038, 0, 0]}>
                <boxGeometry args={[0.006, bladeHeight * 0.98, 0.009]} />
                <meshStandardMaterial color="#c8a846" roughness={0.4} />
              </mesh>
            </group>
          );
        }
        return blades;
      }

      case 'fiddle': {
        // Ficus Lyrata (Fiddle-Leaf Fig) - Upright woody trunk with broad scalloped leaves
        const leaves = [];
        const trunkHeight = 1.15;
        const leafLevels = 7;

        for (let l = 0; l < leafLevels; l++) {
          const prog = (l + 1) / (leafLevels + 1);
          const ly = potHeight + totalBaseY + prog * trunkHeight;
          const angle = l * 2.399; // Golden angle phyllotaxis
          const leafW = 0.22 + prog * 0.08;
          const leafL = 0.32 + prog * 0.12;

          leaves.push(
            <group
              key={`fiddle-leaf-${l}`}
              position={[0, ly, 0]}
              rotation={[0.32 - prog * 0.1, angle, 0.45]}
            >
              {/* Petiole / Stem */}
              <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.006, 0.008, 0.14, 8]} />
                <meshStandardMaterial color="#3b6630" roughness={0.5} />
              </mesh>
              {/* Broad Fiddle Leaf Blade */}
              <mesh position={[0.14 + leafL / 2, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
                <planeGeometry args={[leafL, leafW]} />
                <meshStandardMaterial
                  color="#274f20"
                  roughness={0.28}
                  metalness={0.05}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Prominent lighter central leaf vein */}
              <mesh position={[0.14 + leafL / 2, 0.021, 0]}>
                <boxGeometry args={[leafL * 0.95, 0.003, 0.004]} />
                <meshStandardMaterial color="#5a8b4b" roughness={0.4} />
              </mesh>
            </group>
          );
        }

        return (
          <group key="fiddle-plant">
            {/* Main Central Woody Trunk */}
            <mesh position={[0, potHeight + totalBaseY + trunkHeight / 2, 0]} castShadow>
              <cylinderGeometry args={[0.016, 0.028, trunkHeight, 10]} />
              <meshStandardMaterial color="#423429" roughness={0.8} />
            </mesh>
            {leaves}
          </group>
        );
      }

      case 'strelitzia': {
        // Bird of Paradise - Graceful arching stems with oblong paddle leaves
        const stems = [];
        const count = 9;

        for (let i = 0; i < count; i++) {
          const angle = (i * Math.PI * 2) / count + (i * 0.2);
          const stemLength = 0.36 + (i % 4) * 0.12;
          const lean = 0.28 + (i % 3) * 0.1;
          const leafW = 0.18 + (i % 3) * 0.05;
          const leafL = 0.34 + (i % 3) * 0.08;

          stems.push(
            <group
              key={`strelitzia-stem-${i}`}
              position={[Math.cos(angle) * 0.04, potHeight + totalBaseY, Math.sin(angle) * 0.04]}
              rotation={[Math.sin(angle) * lean, angle, -Math.cos(angle) * lean]}
            >
              {/* Elegant Arching Stem */}
              <mesh position={[0, stemLength / 2, 0]}>
                <cylinderGeometry args={[0.007, 0.012, stemLength, 8]} />
                <meshStandardMaterial color="#457038" roughness={0.4} />
              </mesh>
              {/* Large Architectural Leaf Blade */}
              <group position={[0, stemLength, 0]} rotation={[0.45, 0, 0]}>
                <mesh position={[0, leafL / 2, 0]} castShadow>
                  <planeGeometry args={[leafW, leafL]} />
                  <meshStandardMaterial
                    color={i % 2 === 0 ? '#265324' : '#2b5d29'}
                    roughness={0.3}
                    metalness={0.06}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Central Leaf Spine */}
                <mesh position={[0, leafL / 2, 0.002]}>
                  <boxGeometry args={[0.006, leafL * 0.96, 0.006]} />
                  <meshStandardMaterial color="#6ba654" roughness={0.5} />
                </mesh>
              </group>
            </group>
          );
        }
        return stems;
      }

      case 'monstera':
      default: {
        // Monstera Deliciosa - Spreading stems with broad fenestrated leaves
        const leaves = [];
        const count = 11;

        for (let i = 0; i < count; i++) {
          const angle = (i * Math.PI * 2) / count + 0.3;
          const stemLength = 0.55 + (i % 4) * 0.14;
          const lean = 0.35 + (i % 3) * 0.12;
          const leafSize = 0.28 + (i % 3) * 0.07;

          leaves.push(
            <group
              key={`monstera-leaf-${i}`}
              position={[Math.cos(angle) * 0.05, potHeight + totalBaseY, Math.sin(angle) * 0.05]}
              rotation={[Math.sin(angle) * lean, angle, -Math.cos(angle) * lean]}
            >
              {/* Organic Curved Stem */}
              <mesh position={[0, stemLength / 2, 0]}>
                <cylinderGeometry args={[0.008, 0.014, stemLength, 8]} />
                <meshStandardMaterial color="#35662a" roughness={0.45} />
              </mesh>
              {/* Broad Heart Leaf */}
              <group position={[0, stemLength, 0]} rotation={[0.6, 0, 0]}>
                <mesh position={[0, leafSize / 2, 0]} castShadow>
                  <circleGeometry args={[leafSize / 2, 24]} />
                  <meshStandardMaterial
                    color={i % 2 === 0 ? '#255421' : '#20471c'}
                    roughness={0.28}
                    metalness={0.06}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                {/* Side Leaf lobes for classic Monstera look */}
                {[-0.08, 0.08].map((lx, li) => (
                  <mesh
                    key={`lobe-${li}`}
                    position={[lx, leafSize * 0.45, 0.001]}
                    rotation={[0, 0, li === 0 ? -0.3 : 0.3]}
                  >
                    <circleGeometry args={[leafSize * 0.28, 16]} />
                    <meshStandardMaterial
                      color="#255421"
                      roughness={0.28}
                      metalness={0.06}
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                ))}
              </group>
            </group>
          );
        }
        return leaves;
      }
    }
  }, [type, potHeight, totalBaseY]);

  // Designer Pot Material & Geometry
  const potMesh = useMemo(() => {
    switch (potStyle) {
      case 'terracotta':
        return (
          <group position={[0, totalBaseY + potHeight / 2, 0]}>
            {/* Tapered warm terracotta ceramic pot */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[potRadius * 1.05, potRadius * 0.8, potHeight, 32]} />
              <meshStandardMaterial
                color="#b8623b"
                roughness={0.82}
                metalness={0.05}
              />
            </mesh>
            {/* Top decorative rim */}
            <mesh position={[0, potHeight / 2 - 0.02, 0]}>
              <cylinderGeometry args={[potRadius * 1.09, potRadius * 1.05, 0.04, 32]} />
              <meshStandardMaterial color="#a85632" roughness={0.8} />
            </mesh>
          </group>
        );

      case 'charcoal-fluted':
        return (
          <group position={[0, totalBaseY + potHeight / 2, 0]}>
            {/* Sleek matte charcoal ribbed / fluted architectural pot */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[potRadius, potRadius * 0.92, potHeight, 32]} />
              <meshStandardMaterial
                color="#1e2129"
                roughness={0.4}
                metalness={0.25}
              />
            </mesh>
            {/* Vertical Fluted Accent Ribs */}
            {Array.from({ length: 16 }).map((_, ri) => {
              const rAngle = (ri * Math.PI * 2) / 16;
              const rx = Math.cos(rAngle) * (potRadius * 0.99);
              const rz = Math.sin(rAngle) * (potRadius * 0.99);
              return (
                <mesh key={`rib-${ri}`} position={[rx, 0, rz]}>
                  <boxGeometry args={[0.012, potHeight * 0.96, 0.012]} />
                  <meshStandardMaterial color="#14161b" roughness={0.3} metalness={0.35} />
                </mesh>
              );
            })}
          </group>
        );

      case 'cubic-white':
        return (
          <group position={[0, totalBaseY + potHeight / 2, 0]}>
            {/* Crisp modern white cubic planter (Reference Photo 7) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[potRadius * 2, potHeight, potRadius * 2]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.25}
                metalness={0.05}
              />
            </mesh>
          </group>
        );

      case 'white-cylinder':
      default:
        return (
          <group position={[0, totalBaseY + potHeight / 2, 0]}>
            {/* Crisp modern gallery-white ceramic cylinder pot */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[potRadius, potRadius * 0.92, potHeight, 32]} />
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.22}
                metalness={0.05}
              />
            </mesh>
            {/* Subtle brushed brass top rim band */}
            <mesh position={[0, potHeight / 2 - 0.015, 0]}>
              <cylinderGeometry args={[potRadius * 1.015, potRadius * 1.01, 0.02, 32]} />
              <meshStandardMaterial color="#c5a059" metalness={0.8} roughness={0.25} />
            </mesh>
          </group>
        );
    }
  }, [potStyle, potHeight, potRadius, totalBaseY]);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* 1. Optional Elevated Architectural Stand (Reference 7) */}
      {hasStand && (
        <group position={[0, 0, 0]}>
          {/* Circular ring supporting pot base */}
          <mesh position={[0, standHeight - 0.015, 0]}>
            <cylinderGeometry args={[potRadius * 0.88, potRadius * 0.88, 0.02, 24]} />
            <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* 4 Sleek Hairpin / Straight Legs */}
          {[0, 1, 2, 3].map((li) => {
            const lAngle = (li * Math.PI) / 2 + Math.PI / 4;
            const lx = Math.cos(lAngle) * (potRadius * 0.86);
            const lz = Math.sin(lAngle) * (potRadius * 0.86);
            return (
              <mesh
                key={`leg-${li}`}
                position={[lx, standHeight / 2, lz]}
                castShadow
              >
                <cylinderGeometry args={[0.008, 0.008, standHeight, 12]} />
                <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
              </mesh>
            );
          })}
        </group>
      )}

      {/* 2. Designer Planter Pot */}
      {potMesh}

      {/* 3. Dark Organic Potting Soil */}
      <mesh
        position={[0, totalBaseY + potHeight - 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[potRadius * 0.94, 24]} />
        <meshStandardMaterial color="#1d1612" roughness={0.95} />
      </mesh>

      {/* 4. Realistic Botanical Plant Foliage */}
      {plantElements}
    </group>
  );
}
