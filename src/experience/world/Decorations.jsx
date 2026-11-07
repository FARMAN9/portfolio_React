import RealPlant from './RealPlant';
import RealChair from './RealChair';

export default function Decorations() {
  return (
    <group name="Decorations">
      {/* 1. Real Open-Source Botanical Potted Plants (Khronos PBR Model) */}
      {/* North-West Window Corner Planter */}
      <RealPlant position={[-4.8, 0, -4.3]} scale={1.85} rotation={[0, 0.4, 0]} />

      {/* North-East Window Corner Planter */}
      <RealPlant position={[4.8, 0, -4.3]} scale={1.85} rotation={[0, -0.6, 0]} />

      {/* South-West Lobby Planter (Lightweight Bamboo Cluster) */}
      <group position={[-4.8, 0, 4.3]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.9, 16]} />
          <meshStandardMaterial color="#1f2229" roughness={0.4} />
        </mesh>
        {[-0.08, 0, 0.08].map((bx, bi) => (
          <mesh key={`bamboo-sw-${bi}`} position={[bx, 1.25 + bi * 0.12, (bi % 2 === 0 ? 0.04 : -0.04)]}>
            <cylinderGeometry args={[0.02, 0.025, 1.6, 6]} />
            <meshStandardMaterial color="#3b6e3b" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* South-East Entrance Planter (Lightweight Bamboo Cluster) */}
      <group position={[4.8, 0, 4.3]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.9, 16]} />
          <meshStandardMaterial color="#1f2229" roughness={0.4} />
        </mesh>
        {[-0.08, 0, 0.08].map((bx, bi) => (
          <mesh key={`bamboo-se-${bi}`} position={[bx, 1.25 + bi * 0.12, (bi % 2 === 0 ? -0.04 : 0.04)]}>
            <cylinderGeometry args={[0.02, 0.025, 1.6, 6]} />
            <meshStandardMaterial color="#3b6e3b" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Central Glass Partition Tropical Accent Plant */}
      <group position={[2.5, 0, 0.8]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.2, 0.76, 16]} />
          <meshStandardMaterial color="#c86742" roughness={0.8} />
        </mesh>
        {[-0.06, 0.06].map((ox, oi) => (
          <mesh key={`accent-leaf-${oi}`} position={[ox, 0.9 + oi * 0.1, 0]} rotation={[0, 0, (oi === 0 ? -0.2 : 0.2)]}>
            <coneGeometry args={[0.14, 0.6, 6]} />
            <meshStandardMaterial color="#428738" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* 2. Executive Visitor Lounge Seating (Real Khronos SheenChair Model) */}
      <group position={[-2.8, 0, 3.2]} rotation={[0, Math.PI / 4, 0]}>
        <RealChair scale={1.35} />
      </group>
      <group position={[-1.8, 0, 3.8]} rotation={[0, Math.PI * 0.75, 0]}>
        <RealChair scale={1.35} />
      </group>

      {/* Round Coffee Table in Lounge */}
      <group position={[-2.3, 0, 3.5]}>
        {/* Tabletop */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.025, 24]} />
          <meshStandardMaterial color="#d8c3a9" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Central stem */}
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.42, 12]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Base disc */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Coffee Table Mini Succulent Vase */}
        <group position={[0, 0.42, 0]}>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.06, 0.04, 0.12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#4a8539" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* 3. Modern Low Bookshelf on South Wall */}
      <group position={[-3.8, 0, 4.8]} rotation={[0, Math.PI, 0]}>
        {/* Bookshelf Frame */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.0, 0.38]} />
          <meshStandardMaterial color="#1e2229" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Middle Shelf Divider */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.56, 0.03, 0.36]} />
          <meshStandardMaterial color="#14161c" roughness={0.6} />
        </mesh>
        {/* Books on Bottom Shelf */}
        {[-0.55, -0.42, -0.3, -0.18, -0.06, 0.08, 0.22, 0.36, 0.48].map((bx, idx) => (
          <mesh
            key={`book-${idx}`}
            position={[bx, 0.22, 0]}
            rotation={[0, 0, (idx % 4 === 0 ? 0.06 : 0)]}
            castShadow
          >
            <boxGeometry args={[0.07, 0.36, 0.24]} />
            <meshStandardMaterial
              color={['#339af0', '#ff922b', '#20c997', '#fcc419', '#cc5de8', '#1e222d'][idx % 6]}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Framed Google Scholar Research Publication on East Wall */}
      <group position={[5.22, 2.6, 3.4]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Outer Matte Black Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.94, 0.03]} />
          <meshStandardMaterial color="#101115" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Certificate Mat */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.64, 0.86]} />
          <meshStandardMaterial color="#f7f9fa" roughness={0.9} />
        </mesh>
        {/* Gold Research Seal */}
        <mesh position={[0, -0.28, 0.02]}>
          <circleGeometry args={[0.06, 24]} />
          <meshBasicMaterial color="#fcc419" />
        </mesh>
      </group>
    </group>
  );
}
