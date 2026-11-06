import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

/* eslint-disable react/prop-types */
export default function RealPlant({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/plant.glb');
  const clone = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      object={clone}
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    />
  );
}

useGLTF.preload('/models/plant.glb');

