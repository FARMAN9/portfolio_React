/* eslint-disable react/prop-types */
export default function HangingPlanters({ position = [0, 3.4, -2.8] }) {
  // Overhead suspended architectural planter beam (Reference Photo 4)
  const beamLength = 2.8;
  const beamWidth = 0.38;
  const beamHeight = 0.22;

  return (
    <group name="HangingPlanters" position={position}>
      {/* 1. Steel Suspension Cables connecting to ceiling */}
      <mesh position={[-beamLength / 2 + 0.15, 0.4, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.8, 8]} />
        <meshStandardMaterial color="#2d313a" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[beamLength / 2 - 0.15, 0.4, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.8, 8]} />
        <meshStandardMaterial color="#2d313a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Architectural Dark Oak Planter Trough */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[beamLength, beamHeight, beamWidth]} />
        <meshStandardMaterial color="#221b16" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Planter Interior Top Soil */}
      <mesh position={[0, beamHeight / 2 - 0.01, 0]}>
        <boxGeometry args={[beamLength - 0.06, 0.02, beamWidth - 0.06]} />
        <meshStandardMaterial color="#1a120c" roughness={0.9} />
      </mesh>

      {/* 3. Integrated Warm Linear LED Downlight Channel on Bottom */}
      <mesh position={[0, -beamHeight / 2 - 0.006, 0]}>
        <boxGeometry args={[beamLength - 0.2, 0.012, 0.06]} />
        <meshBasicMaterial color="#fff4db" />
      </mesh>
      {/* Warm Downward Studio Glow onto the Workstation */}
      <spotLight
        position={[0, -beamHeight / 2 - 0.02, 0]}
        target-position={[0, -2.5, 0]}
        color="#fff5ea"
        intensity={2.8}
        angle={0.9}
        penumbra={0.5}
        distance={4.2}
      />

      {/* 4. Lush Cascading Trailing Green Vines & Foliage (Reference Photo 4 & 5) */}
      {[-1.1, -0.7, -0.3, 0.1, 0.5, 0.9].map((vx, i) => {
        const vineLength = 0.55 + (i % 3) * 0.22;
        const numLeaves = 8 + (i % 4) * 3;
        return (
          <group key={`trailing-vine-${i}`} position={[vx, -beamHeight / 2 + 0.04, (i % 2 === 0 ? beamWidth / 2 : -beamWidth / 2)]}>
            {/* Vine stem */}
            <mesh position={[0, -vineLength / 2, 0]}>
              <cylinderGeometry args={[0.003, 0.002, vineLength, 8]} />
              <meshStandardMaterial color="#2f5726" roughness={0.6} />
            </mesh>
            {/* Cascading Ivy / Pothos Leaf Clusters */}
            {Array.from({ length: numLeaves }).map((_, leafIdx) => {
              const prog = (leafIdx + 1) / (numLeaves + 1);
              const ly = -prog * vineLength;
              const side = (leafIdx % 2 === 0 ? 1 : -1);
              const leafSize = 0.038 * (1 - prog * 0.35);
              return (
                <mesh
                  key={`leaf-${leafIdx}`}
                  position={[side * 0.028, ly, Math.sin(leafIdx) * 0.015]}
                  rotation={[0.3, side * 0.4, Math.sin(leafIdx) * 0.3]}
                  castShadow
                >
                  <circleGeometry args={[leafSize, 7]} />
                  <meshStandardMaterial
                    color={(leafIdx % 2 === 0 ? '#3f802d' : '#4d9937')}
                    roughness={0.4}
                    side={2}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

