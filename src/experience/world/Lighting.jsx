export default function Lighting() {
  return (
    <group name="Lighting">
      {/* 1. Global Ambient Fill (Subtle cool dusk blue) */}
      <ambientLight color="#343c54" intensity={0.4} />

      {/* 2. Window Directional Light (Warm sunset/dusk sunlight entering from North) */}
      <directionalLight
        position={[0, 4.2, -6.8]}
        target-position={[0, 0, 0]}
        color="#ffa366"
        intensity={1.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={5}
        shadow-camera-bottom={-1}
        shadow-bias={-0.0002}
      />

      {/* 3. Ceiling Recessed Downlights (Warm LED spotlights) */}
      {/* Workstation Downlight */}
      <spotLight
        position={[0, 4.0, -2.4]}
        target-position={[0, 0.7, -3.0]}
        color="#ffeedb"
        intensity={2.0}
        angle={0.7}
        penumbra={0.6}
        distance={6}
      />

      {/* Projects Lab Downlight (West) */}
      <spotLight
        position={[-3.8, 4.0, 0]}
        target-position={[-4.8, 1.4, 0]}
        color="#ffeedb"
        intensity={1.8}
        angle={0.65}
        penumbra={0.6}
        distance={6}
      />

      {/* Skills Wall Downlight (East) */}
      <spotLight
        position={[3.8, 4.0, 0]}
        target-position={[4.8, 1.4, 0]}
        color="#ffeedb"
        intensity={1.8}
        angle={0.65}
        penumbra={0.6}
        distance={6}
      />

      {/* Welcome / Center Room Downlight */}
      <spotLight
        position={[0, 4.0, 2.0]}
        target-position={[0, 0, 1.5]}
        color="#fff1e0"
        intensity={1.6}
        angle={0.8}
        penumbra={0.7}
        distance={6}
      />

      {/* 4. Soft Studio Rim Glows */}
      <pointLight position={[-4.6, 2.2, -4.2]} color="#ff7043" intensity={0.5} distance={3.5} />
      <pointLight position={[4.6, 2.2, -4.2]} color="#339af0" intensity={0.5} distance={3.5} />
    </group>
  );
}
