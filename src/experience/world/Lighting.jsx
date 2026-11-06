export default function Lighting() {
  return (
    <group name="Lighting">
      {/* 1. Hemispherical Sky-and-Ground Environmental Bounce */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#505a69"
        intensity={1.8}
      />

      {/* 2. Global Crisp Ambient Studio Fill */}
      <ambientLight color="#ffffff" intensity={1.2} />

      {/* 3. Window Directional Sunlight (Warm luminous architectural sunlight) */}
      <directionalLight
        position={[0, 5.2, -5.8]}
        target-position={[0, 0, 0]}
        color="#fff8f0"
        intensity={3.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={5.5}
        shadow-camera-bottom={-1}
        shadow-bias={-0.0002}
      />

      {/* 4. Central High-Ceiling Diffuse Studio Fill */}
      <pointLight
        position={[0, 3.8, 0]}
        color="#ffffff"
        intensity={3.2}
        distance={15}
        decay={1.2}
      />

      {/* 5. Workstation Desk Spotlight */}
      <spotLight
        position={[0, 4.0, -2.4]}
        target-position={[0, 0.74, -3.0]}
        color="#fffbf2"
        intensity={3.8}
        angle={0.85}
        penumbra={0.5}
        distance={9}
      />

      {/* 6. Projects Laboratory Wall Spotlight (West) */}
      <spotLight
        position={[-3.6, 4.0, 0]}
        target-position={[-5.18, 1.6, 0]}
        color="#ffffff"
        intensity={3.8}
        angle={0.85}
        penumbra={0.5}
        distance={9}
      />

      {/* 7. Skills Wall Spotlight (East) */}
      <spotLight
        position={[3.6, 4.0, 0]}
        target-position={[5.18, 1.6, 0]}
        color="#ffffff"
        intensity={3.8}
        angle={0.85}
        penumbra={0.5}
        distance={9}
      />

      {/* 8. Welcome Lobby & Entrance Spotlight (South) */}
      <spotLight
        position={[0, 4.0, 2.8]}
        target-position={[0, 0.8, 4.2]}
        color="#fff8f0"
        intensity={3.4}
        angle={0.85}
        penumbra={0.5}
        distance={9}
      />

      {/* 9. Station Eye-Level Fill Lights */}
      {/* Project Lab Wall Fill */}
      <pointLight position={[-4.0, 1.8, 0]} color="#ffffff" intensity={1.8} distance={5} />
      {/* Skills Wall Fill */}
      <pointLight position={[4.0, 1.8, 0]} color="#ffffff" intensity={1.8} distance={5} />
      {/* Resume Station Fill */}
      <pointLight position={[-2.4, 1.6, 2.6]} color="#fff8f0" intensity={1.6} distance={4} />
      {/* Contact Station Fill */}
      <pointLight position={[2.4, 1.6, 2.6]} color="#fff8f0" intensity={1.6} distance={4} />

      {/* 10. Accent Architectural Glows */}
      <pointLight position={[-4.8, 2.4, -4.5]} color="#ff7043" intensity={0.9} distance={4} />
      <pointLight position={[4.8, 2.4, -4.5]} color="#339af0" intensity={0.9} distance={4} />
    </group>
  );
}
