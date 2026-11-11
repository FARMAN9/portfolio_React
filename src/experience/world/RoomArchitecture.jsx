import { useMemo } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { getWoodFloorTextures, getWallTexture, getSkylineTexture } from './TextureGenerator';

export default function RoomArchitecture() {
  // Load real high-resolution PBR wood textures and real daylight vista
  let realWoodDiffuse = null;
  let realWoodBump = null;
  let realWoodRoughness = null;
  let realDaylightSkyline = null;

  try {
    const textures = useTexture({
      diffuse: '/textures/hardwood2_diffuse.jpg',
      bump: '/textures/hardwood2_bump.jpg',
      roughness: '/textures/hardwood2_roughness.jpg',
      skyline: '/textures/skyline_daylight.jpg'
    });
    realWoodDiffuse = textures.diffuse;
    realWoodBump = textures.bump;
    realWoodRoughness = textures.roughness;
    realDaylightSkyline = textures.skyline;

    if (realWoodDiffuse) {
      realWoodDiffuse.wrapS = realWoodDiffuse.wrapT = THREE.RepeatWrapping;
      realWoodDiffuse.repeat.set(6, 6);
    }
    if (realWoodBump) {
      realWoodBump.wrapS = realWoodBump.wrapT = THREE.RepeatWrapping;
      realWoodBump.repeat.set(6, 6);
    }
    if (realWoodRoughness) {
      realWoodRoughness.wrapS = realWoodRoughness.wrapT = THREE.RepeatWrapping;
      realWoodRoughness.repeat.set(6, 6);
    }
  } catch {
    // Falls back gracefully to procedural generation
  }

  const { diffuse: procWoodDiffuse, roughness: procWoodRoughness } = useMemo(() => getWoodFloorTextures(), []);
  const procWallTexture = useMemo(() => getWallTexture(), []);
  const procSkylineTexture = useMemo(() => getSkylineTexture(), []);

  const floorDiffuse = realWoodDiffuse || procWoodDiffuse;
  const floorRoughness = realWoodRoughness || procWoodRoughness;
  const skylineTexture = realDaylightSkyline || procSkylineTexture;

  // Room Dimensions (Width X: 11.6m, Depth Z: 10.8m, Height Y: 4.2m)
  const roomW = 11.6;
  const roomD = 10.8;
  const roomH = 4.2;

  return (
    <group name="RoomArchitecture">
      {/* 1. Photorealistic Polished Hardwood Floor (Warm European Honey Oak matching Reference 4 & 6) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial
          map={floorDiffuse}
          color="#cfb08b"
          bumpMap={realWoodBump}
          bumpScale={0.015}
          roughnessMap={floorRoughness}
          roughness={0.34}
          metalness={0.06}
        />
      </mesh>

      {/* 2. Architectural Ceiling (Bright modern gallery white matching Reference 4 & 5) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomH, 0]}>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial color="#f7f9fc" roughness={0.8} metalness={0.02} />
      </mesh>

      {/* Modern Architectural Ceiling Beams / Trim in Brushed White / Aluminum */}
      <mesh position={[0, roomH - 0.04, -roomD / 2 + 0.1]}>
        <boxGeometry args={[roomW, 0.08, 0.18]} />
        <meshStandardMaterial color="#e5e9f0" roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, roomH - 0.04, roomD / 2 - 0.1]}>
        <boxGeometry args={[roomW, 0.08, 0.18]} />
        <meshStandardMaterial color="#e5e9f0" roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Recessed Ceiling LED Light Troughs (Warm clean architectural daylight 4500K) */}
      <mesh position={[-2.4, roomH - 0.015, 0]}>
        <boxGeometry args={[0.24, 0.02, roomD - 2.0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2.4, roomH - 0.015, 0]}>
        <boxGeometry args={[0.24, 0.02, roomD - 2.0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, roomH - 0.015, 0]}>
        <boxGeometry args={[0.24, 0.02, roomD - 3.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 3. North Wall: Floor-to-Ceiling Panoramic Glass Window & Real Daylight Panorama */}
      {/* Real Daylight Panoramic Vista Plane (Sunlit skyline & blue sky) */}
      <mesh position={[0, 2.2, -roomD / 2 - 2.6]}>
        <planeGeometry args={[26, 11]} />
        <meshBasicMaterial map={skylineTexture} toneMapped={false} />
      </mesh>

      {/* Crystal Clear Architectural Window Glass */}
      <mesh position={[0, roomH / 2, -roomD / 2 + 0.02]}>
        <planeGeometry args={[roomW - 0.4, roomH - 0.4]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0.01}
          metalness={0.05}
          transmission={0.96}
          ior={1.5}
        />
      </mesh>

      {/* Architectural Window Mullions (Black Steel framing matching Reference 5) */}
      {/* Outer top/bottom perimeter rails */}
      <mesh position={[0, roomH - 0.08, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.16, 0.09]} />
        <meshStandardMaterial color="#1b1c20" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.08, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.16, 0.09]} />
        <meshStandardMaterial color="#1b1c20" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Vertical Black Steel Mullions */}
      {[-3.8, -1.9, 0, 1.9, 3.8].map((x) => (
        <mesh key={`mullion-v-${x}`} position={[x, roomH / 2, -roomD / 2 + 0.05]}>
          <boxGeometry args={[0.08, roomH, 0.09]} />
          <meshStandardMaterial color="#1b1c20" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {/* Horizontal Transom Bar */}
      <mesh position={[0, roomH * 0.72, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.06, 0.09]} />
        <meshStandardMaterial color="#1b1c20" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* 4. South Wall (Rear Wall - Clean Bright Venetian Plaster) */}
      <mesh position={[0, roomH / 2, roomD / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[roomW, roomH]} />
        <meshStandardMaterial map={procWallTexture} color="#f4f6fa" roughness={0.8} metalness={0.04} />
      </mesh>
      {/* Baseboard trim */}
      <mesh position={[0, 0.07, roomD / 2 - 0.03]}>
        <boxGeometry args={[roomW, 0.14, 0.06]} />
        <meshStandardMaterial color="#2d313b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 5. West Wall (Project Laboratory Side - Gallery White Wall) */}
      <mesh position={[-roomW / 2, roomH / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial map={procWallTexture} color="#f4f6fa" roughness={0.8} metalness={0.04} />
      </mesh>
      {/* West Baseboard */}
      <mesh position={[-roomW / 2 + 0.03, 0.07, 0]}>
        <boxGeometry args={[0.06, 0.14, roomD]} />
        <meshStandardMaterial color="#2d313b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 6. East Wall (Skills Wall Side - Gallery White Wall) */}
      <mesh position={[roomW / 2, roomH / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial map={procWallTexture} color="#f4f6fa" roughness={0.8} metalness={0.04} />
      </mesh>
      {/* East Baseboard */}
      <mesh position={[roomW / 2 - 0.03, 0.07, 0]}>
        <boxGeometry args={[0.06, 0.14, roomD]} />
        <meshStandardMaterial color="#2d313b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* 7. Architectural Black Steel & Glass Partition Dividing Wall (Matching Reference 5!) */}
      <group position={[2.8, 0, 1.2]}>
        {/* Steel frame uprights */}
        <mesh position={[0, roomH / 2, 0]}>
          <boxGeometry args={[0.06, roomH, 0.06]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[1.8, roomH / 2, 0]}>
          <boxGeometry args={[0.06, roomH, 0.06]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Horizontal frame rails */}
        <mesh position={[0.9, 0.04, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.06]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.9, roomH - 0.04, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.06]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.9, 1.2, 0]}>
          <boxGeometry args={[1.8, 0.05, 0.06]} />
          <meshStandardMaterial color="#1a1c22" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Architectural Glass panels */}
        <mesh position={[0.9, roomH / 2, 0]}>
          <planeGeometry args={[1.74, roomH - 0.16]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
            roughness={0.02}
            metalness={0.05}
            transmission={0.92}
            ior={1.48}
          />
        </mesh>
      </group>
    </group>
  );
}
