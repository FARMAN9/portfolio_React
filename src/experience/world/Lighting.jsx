import { Environment } from '@react-three/drei';

export default function Lighting() {
  return (
    <group name="Lighting">
      {/* 0. Photorealistic Image-Based Lighting (IBL) Environment Reflections */}
      <Environment files="/textures/modern_buildings_2_1k.hdr" background={false} environmentIntensity={0.8} />

      {/* 1. Hemispherical Sky-and-Ground Environmental Daylight Bounce */}
      <hemisphereLight
        skyColor="#ebf5ff"
        groundColor="#e8d8c8"
        intensity={2.2}
      />

      {/* 2. Global Crisp Ambient Studio Daylight Fill */}
      <ambientLight color="#ffffff" intensity={1.5} />

      {/* 3. Window Directional Sunlight (Warm luminous sunbeams through panoramic glass) */}
      <directionalLight
        position={[-1.2, 5.8, -6.0]}
        target-position={[0, 0, -1.0]}
        color="#fffaf0"
        intensity={4.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6.5}
        shadow-camera-bottom={-1}
        shadow-bias={-0.0001}
      />

      {/* 4. Secondary Soft Sunlight Floor Bounce */}
      <directionalLight
        position={[2.0, 4.8, -5.5]}
        target-position={[0, 0, 0]}
        color="#fff5ea"
        intensity={1.8}
      />

      {/* 5. Central High-Ceiling Diffuse Studio Fill */}
      <pointLight
        position={[0, 3.9, 0]}
        color="#ffffff"
        intensity={3.6}
        distance={16}
        decay={1.1}
      />

      {/* 6. Workstation Desk Spotlight */}
      <spotLight
        position={[0, 4.0, -2.4]}
        target-position={[0, 0.74, -3.0]}
        color="#fffdf8"
        intensity={4.2}
        angle={0.85}
        penumbra={0.4}
        distance={10}
      />

      {/* 7. Projects Laboratory Wall Spotlight (West) */}
      <spotLight
        position={[-3.6, 4.0, 0]}
        target-position={[-5.18, 1.6, 0]}
        color="#ffffff"
        intensity={4.0}
        angle={0.85}
        penumbra={0.4}
        distance={10}
      />

      {/* 8. Skills Wall Spotlight (East) */}
      <spotLight
        position={[3.6, 4.0, 0]}
        target-position={[5.18, 1.6, 0]}
        color="#ffffff"
        intensity={4.0}
        angle={0.85}
        penumbra={0.4}
        distance={10}
      />

      {/* 9. Welcome Lobby & Entrance Spotlight (South) */}
      <spotLight
        position={[0, 4.0, 2.8]}
        target-position={[0, 0.8, 4.2]}
        color="#fffbf0"
        intensity={3.8}
        angle={0.85}
        penumbra={0.4}
        distance={10}
      />

      {/* 10. Eye-Level Reading Fill Lights */}
      <pointLight position={[-4.0, 1.8, 0]} color="#ffffff" intensity={2.0} distance={6} />
      <pointLight position={[4.0, 1.8, 0]} color="#ffffff" intensity={2.0} distance={6} />
      <pointLight position={[-2.4, 1.6, 2.6]} color="#fff8f0" intensity={1.8} distance={5} />
      <pointLight position={[2.4, 1.6, 2.6]} color="#fff8f0" intensity={1.8} distance={5} />

      {/* 11. Subtle Studio Cyan & Warm Accents */}
      <pointLight position={[-4.8, 2.4, -4.5]} color="#4dabf7" intensity={0.8} distance={4} />
      <pointLight position={[4.8, 2.4, -4.5]} color="#ff922b" intensity={0.8} distance={4} />
    </group>
  );
}
