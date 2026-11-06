import { useMemo } from 'react';
import { getWoodFloorTextures, getWallTexture, getSkylineTexture } from './TextureGenerator';

export default function RoomArchitecture() {
  const { diffuse: woodDiffuse, roughness: woodRoughness } = useMemo(() => getWoodFloorTextures(), []);
  const wallTexture = useMemo(() => getWallTexture(), []);
  const skylineTexture = useMemo(() => getSkylineTexture(), []);

  // Room Dimensions (Width X: 11.6m, Depth Z: 10.8m, Height Y: 4.2m)
  const roomW = 11.6;
  const roomD = 10.8;
  const roomH = 4.2;

  return (
    <group name="RoomArchitecture">
      {/* 1. Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial
          map={woodDiffuse}
          roughnessMap={woodRoughness}
          roughness={0.42}
          metalness={0.12}
        />
      </mesh>

      {/* 2. Architectural Ceiling with Recessed Light Troughs */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomH, 0]}>
        <planeGeometry args={[roomW, roomD]} />
        <meshStandardMaterial color="#121316" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Architectural Ceiling Beams / Trim */}
      <mesh position={[0, roomH - 0.05, -roomD / 2 + 0.1]}>
        <boxGeometry args={[roomW, 0.1, 0.2]} />
        <meshStandardMaterial color="#1d1f24" roughness={0.7} />
      </mesh>
      <mesh position={[0, roomH - 0.05, roomD / 2 - 0.1]}>
        <boxGeometry args={[roomW, 0.1, 0.2]} />
        <meshStandardMaterial color="#1d1f24" roughness={0.7} />
      </mesh>

      {/* Recessed Ceiling LED Strips (Warm glow lines) */}
      <mesh position={[-2.4, roomH - 0.02, 0]}>
        <boxGeometry args={[0.08, 0.02, roomD - 1.6]} />
        <meshBasicMaterial color="#ffe8d1" />
      </mesh>
      <mesh position={[2.4, roomH - 0.02, 0]}>
        <boxGeometry args={[0.08, 0.02, roomD - 1.6]} />
        <meshBasicMaterial color="#ffe8d1" />
      </mesh>

      {/* 3. North Wall: Large Panoramic Glass Window & Skyline Backdrop */}
      {/* City Skyline Backdrop Plane */}
      <mesh position={[0, 2.2, -roomD / 2 - 2.5]}>
        <planeGeometry args={[22, 9]} />
        <meshBasicMaterial map={skylineTexture} toneMapped={false} />
      </mesh>

      {/* Window Glass Panes */}
      <mesh position={[0, roomH / 2, -roomD / 2 + 0.02]}>
        <planeGeometry args={[roomW - 0.4, roomH - 0.4]} />
        <meshPhysicalMaterial
          color="#0a121e"
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0.1}
          transmission={0.85}
          ior={1.48}
        />
      </mesh>

      {/* Window Structural Mullions & Frames (Dark Brushed Graphite) */}
      {/* Outer frame */}
      <mesh position={[0, roomH - 0.1, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.2, 0.12]} />
        <meshStandardMaterial color="#18191d" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.1, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.2, 0.12]} />
        <meshStandardMaterial color="#18191d" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Vertical Mullions */}
      {[-3.8, -1.9, 0, 1.9, 3.8].map((x) => (
        <mesh key={`mullion-v-${x}`} position={[x, roomH / 2, -roomD / 2 + 0.05]}>
          <boxGeometry args={[0.1, roomH, 0.12]} />
          <meshStandardMaterial color="#18191d" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Horizontal Transom Bar */}
      <mesh position={[0, roomH * 0.72, -roomD / 2 + 0.05]}>
        <boxGeometry args={[roomW, 0.08, 0.12]} />
        <meshStandardMaterial color="#18191d" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* 4. South Wall (Rear Wall with Entrance Design) */}
      <mesh position={[0, roomH / 2, roomD / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[roomW, roomH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.85} metalness={0.1} />
      </mesh>
      {/* South Wall Baseboard */}
      <mesh position={[0, 0.08, roomD / 2 - 0.04]}>
        <boxGeometry args={[roomW, 0.16, 0.08]} />
        <meshStandardMaterial color="#121316" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 5. West Wall (Left Wall - Project Laboratory Side) */}
      <mesh position={[-roomW / 2, roomH / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.85} metalness={0.1} />
      </mesh>
      {/* West Baseboard */}
      <mesh position={[-roomW / 2 + 0.04, 0.08, 0]}>
        <boxGeometry args={[0.08, 0.16, roomD]} />
        <meshStandardMaterial color="#121316" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* 6. East Wall (Right Wall - Skills Wall Side) */}
      <mesh position={[roomW / 2, roomH / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomD, roomH]} />
        <meshStandardMaterial map={wallTexture} roughness={0.85} metalness={0.1} />
      </mesh>
      {/* East Baseboard */}
      <mesh position={[roomW / 2 - 0.04, 0.08, 0]}>
        <boxGeometry args={[0.08, 0.16, roomD]} />
        <meshStandardMaterial color="#121316" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Studio Lighting Perimeter Accent on Floor */}
      <mesh position={[0, 0.01, -roomD / 2 + 0.2]}>
        <boxGeometry args={[roomW - 1, 0.01, 0.03]} />
        <meshBasicMaterial color="#ff7043" />
      </mesh>
    </group>
  );
}
