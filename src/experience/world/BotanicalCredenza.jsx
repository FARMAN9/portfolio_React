import { useMemo } from 'react';
import RealPlant from './RealPlant';
import { getSlattedWoodTexture } from './TextureGenerator';

/* eslint-disable react/prop-types */
export default function BotanicalCredenza({ position = [-2.8, 0, 4.7], rotation = [0, Math.PI, 0] }) {
  const slattedWood = useMemo(() => getSlattedWoodTexture(), []);

  const credW = 3.6;
  const credH = 0.68;
  const credD = 0.46;

  return (
    <group name="BotanicalCredenza" position={position} rotation={rotation}>
      {/* 1. Main Credenza Body (Fluted Natural Oak Slats - Reference Photo 3) */}
      <mesh position={[0, credH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[credW, credH, credD]} />
        <meshStandardMaterial
          map={slattedWood}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* 2. White Polished Quartz Countertop */}
      <mesh position={[0, credH + 0.015, 0]} castShadow receiveShadow>
        <boxGeometry args={[credW + 0.04, 0.03, credD + 0.04]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Minimalist Recessed Baseboard Plinth */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[credW - 0.12, 0.06, credD - 0.08]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.7} />
      </mesh>

      {/* 4. Row of Designer Potted Plants on Top (Reference Photo 3) */}
      {/* Plant 1: Large Broad-Leaf Monstera in White Planter */}
      <group position={[-1.3, credH + 0.03, 0]}>
        {/* Square White Designer Planter */}
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.32, 0.34]} />
          <meshStandardMaterial color="#f8f9fa" roughness={0.25} metalness={0.05} />
        </mesh>
        <RealPlant position={[0, 0.32, 0]} scale={1.3} rotation={[0, 0.4, 0]} />
      </group>

      {/* Plant 2: Sansevieria Snake Plant in Matte Black Cylinder Pot */}
      <group position={[-0.55, credH + 0.03, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Architectural upright foliage blades */}
        {[-0.04, 0, 0.04].map((ox, bi) => (
          <mesh
            key={`snake-leaf-${bi}`}
            position={[ox, 0.38 + bi * 0.05, (bi % 2 === 0 ? 0.02 : -0.02)]}
            rotation={[0.08 * (bi - 1), 0, (bi - 1) * 0.12]}
          >
            <cylinderGeometry args={[0.025, 0.04, 0.38, 4]} />
            <meshStandardMaterial color="#2d5e2e" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Plant 3: Bird of Paradise in Terracotta Planter with Metal Stand */}
      <group position={[0.25, credH + 0.03, 0]}>
        {/* Metal 4-leg stand */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.14, 12]} />
          <meshStandardMaterial color="#181a20" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Warm Terracotta Pot */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.16, 0.13, 0.28, 16]} />
          <meshStandardMaterial color="#c86742" roughness={0.85} />
        </mesh>
        <RealPlant position={[0, 0.36, 0]} scale={1.3} rotation={[0, 1.3, 0]} />
      </group>

      {/* Plant 4: Golden Palm in Soft Sage Green Pot */}
      <group position={[1.05, credH + 0.03, 0]}>
        <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.16, 0.14, 0.28, 16]} />
          <meshStandardMaterial color="#4a5d4e" roughness={0.5} />
        </mesh>
        {/* Delicate fan palm stems */}
        {[-0.05, 0, 0.05].map((px, pi) => (
          <mesh
            key={`palm-stem-${pi}`}
            position={[px, 0.36 + pi * 0.04, 0]}
            rotation={[(pi - 1) * 0.15, 0, (pi - 1) * 0.18]}
          >
            <coneGeometry args={[0.09, 0.32, 6]} />
            <meshStandardMaterial color="#4a8539" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Trailing Vines Cascading Down Front Edge (Reference Photo 3) */}
      {[-0.85, 0.65].map((vx, i) => (
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
                <circleGeometry args={[0.035, 6]} />
                <meshStandardMaterial color="#387a2a" roughness={0.4} side={2} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

