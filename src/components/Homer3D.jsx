import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { AnimationMixer } from 'three';

function HomerModel() {
  const gltf = useGLTF('/homer.glb');
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations && gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      mixer.current.clipAction(gltf.animations[0]).play();
    }
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={gltf.scene} scale={2} position={[0, -1, -2  ]} />;
}

export default function Homer3D() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <HomerModel />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
