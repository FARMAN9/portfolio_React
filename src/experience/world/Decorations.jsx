import RealChair from './RealChair';
import DesignerPlant from './DesignerPlant';

export default function Decorations() {
  return (
    <group name="Decorations">
      {/* 1. North-West Window Corner: Luxury Monstera in Fluted Charcoal Planter on Hairpin Stand (Reference 7) */}
      <DesignerPlant
        type="monstera"
        potStyle="charcoal-fluted"
        hasStand
        standHeight={0.28}
        position={[-4.7, 0, -4.2]}
        scale={1.35}
        rotation={[0, 0.4, 0]}
      />

      {/* 2. North-East Window Corner: Architectural Bird of Paradise in White Ceramic on Hairpin Stand (Reference 7) */}
      <DesignerPlant
        type="strelitzia"
        potStyle="white-cylinder"
        hasStand
        standHeight={0.28}
        position={[4.7, 0, -4.2]}
        scale={1.35}
        rotation={[0, -0.5, 0]}
      />

      {/* 3. South-West Lobby Planter: Ficus Lyrata in Terracotta with Metal Stand (Reference 7) */}
      <DesignerPlant
        type="fiddle"
        potStyle="terracotta"
        hasStand
        standHeight={0.26}
        position={[-4.7, 0, 4.2]}
        scale={1.3}
        rotation={[0, 0.5, 0]}
      />

      {/* 4. South-East Entrance Planter: Upright Snake Plant in Fluted Charcoal Pot (Reference 7) */}
      <DesignerPlant
        type="snake"
        potStyle="charcoal-fluted"
        position={[4.7, 0, 4.2]}
        scale={1.35}
        rotation={[0, -0.4, 0]}
      />

      {/* 5. Central Glass Partition: Designer Monstera on Raised Stand (Reference 4, 6 & 7) */}
      <DesignerPlant
        type="monstera"
        potStyle="white-cylinder"
        hasStand
        standHeight={0.26}
        position={[2.5, 0, 0.8]}
        scale={1.25}
        rotation={[0, 0.3, 0]}
      />

      {/* 6. Biophilic Partition Lush Accent: Bird of Paradise along Glass Wall (Reference 4 & 6) */}
      <DesignerPlant
        type="strelitzia"
        potStyle="terracotta"
        position={[3.4, 0, 1.4]}
        scale={1.1}
        rotation={[0, -0.5, 0]}
      />

      {/* 7. Executive Visitor Lounge Seating (Real Khronos SheenChair Model) */}
      <group position={[-2.8, 0, 3.2]} rotation={[0, Math.PI / 4, 0]}>
        <RealChair scale={1.35} />
      </group>
      <group position={[-1.8, 0, 3.8]} rotation={[0, Math.PI * 0.75, 0]}>
        <RealChair scale={1.35} />
      </group>

      {/* Round Coffee Table in Lounge */}
      <group position={[-2.3, 0, 3.5]}>
        {/* Scandinavian Oak Tabletop */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.025, 32]} />
          <meshStandardMaterial color="#c8ab8d" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Central Black Steel Stem */}
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.42, 16]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Base disc */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Coffee Table Mini Succulent in Ceramic Pot */}
        <group position={[0, 0.42, 0]}>
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.055, 0.04, 0.1, 16]} />
            <meshStandardMaterial color="#f7f9fa" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#3d7532" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* 8. Modern Low Bookshelf on South Wall */}
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

      {/* 9. Framed Google Scholar Research Publication on East Wall */}
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
