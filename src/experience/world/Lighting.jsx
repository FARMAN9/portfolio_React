import { Environment } from '@react-three/drei';

/* eslint-disable react/prop-types */
export default function Lighting({ isPerformanceMode = false }) {
  return (
    <group name="Lighting">
      {/* 0. Photorealistic Image-Based Lighting (IBL) Environment Reflections */}
      <Environment files="/textures/modern_buildings_2_1k.hdr" background={false} environmentIntensity={0.65} />

      {/* 1. Hemispherical Sky-and-Ground Environmental Daylight Bounce (Natural ambient fill) */}
      <hemisphereLight
        skyColor="#e0f0ff"
        groundColor="#e0cca8"
        intensity={1.1}
      />

      {/* 2. Global Ambient Studio Daylight Fill */}
      <ambientLight color="#ffffff" intensity={0.55} />

      {/* 3. Window Directional Sunlight (Warm luminous sunbeams through panoramic glass) */}
      <directionalLight
        position={[-1.2, 5.8, -6.0]}
        target-position={[0, 0, -1.0]}
        color="#fff8ed"
        intensity={2.4}
        castShadow={!isPerformanceMode}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={6}
        shadow-camera-bottom={-1}
        shadow-bias={-0.0002}
      />

      {/* 4. Downward Workstation Desk Task Light */}
      <spotLight
        position={[0, 3.6, -3.2]}
        target-position={[0, 0.74, -3.0]}
        color="#fff4e6"
        intensity={0.9}
        angle={0.8}
        penumbra={0.6}
        distance={7}
      />

      {/* 5. Soft Warm Lounge Accent Light (South-West) */}
      <pointLight
        position={[-2.4, 2.2, 3.2]}
        color="#fff6ed"
        intensity={1.4}
        distance={6}
      />
    </group>
  );
}
