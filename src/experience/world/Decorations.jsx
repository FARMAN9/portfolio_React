/* eslint-disable react/prop-types */
function ArchitecturalPlanter({ position }) {
  return (
    <group position={position}>
      {/* Matte Black Ceramic Cylinder Pot */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.22, 0.7, 24]} />
        <meshStandardMaterial color="#1a1c22" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Pot Rim */}
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[0.26, 0.02, 12, 24]} />
        <meshStandardMaterial color="#14151b" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 24]} />
        <meshStandardMaterial color="#1b140f" roughness={0.9} />
      </mesh>
      {/* Snake Plant Foliage Blades */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const height = 0.75 + (i % 3) * 0.2;
        const outward = 0.06 + (i % 2) * 0.04;
        return (
          <mesh
            key={`leaf-${angle}`}
            position={[Math.sin(rad) * outward, 0.7 + height / 2, Math.cos(rad) * outward]}
            rotation={[Math.cos(rad) * 0.12, rad, Math.sin(rad) * 0.12]}
            castShadow
          >
            <boxGeometry args={[0.07, height, 0.012]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#27522a' : '#336637'}
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Decorations() {
  return (
    <group name="Decorations">
      {/* 4 Architectural Corner Planters */}
      <ArchitecturalPlanter position={[-4.9, 0, -4.5]} />
      <ArchitecturalPlanter position={[4.9, 0, -4.5]} />
      <ArchitecturalPlanter position={[-4.9, 0, 4.5]} />
      <ArchitecturalPlanter position={[4.9, 0, 4.5]} />

      {/* Modern Low Bookshelf on South Wall */}
      <group position={[-2.4, 0, 4.8]} rotation={[0, Math.PI, 0]}>
        {/* Bookshelf Frame */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.0, 0.38]} />
          <meshStandardMaterial color="#171920" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Middle Shelf Divider */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.56, 0.03, 0.36]} />
          <meshStandardMaterial color="#111216" roughness={0.6} />
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
              color={['#ff5722', '#339af0', '#2b8a3e', '#fcc419', '#e03131', '#1e222d'][idx % 6]}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Framed Google Scholar Research Publication on East Wall */}
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

