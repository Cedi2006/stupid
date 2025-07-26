import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function CameraController({ scrollProgress, setCurrentSection }) {
  const cameraRef = useRef();

  // Positions pour chaque vue avec des déplacements plus subtils
  const views = [
    {
      position: [0, 0.8, 2.5],      // Vue de face
      rotation: [0, 0, 0]
    },
    {
      position: [1.5, 0.8, 0],        // Vue angle droit
      rotation: [0, -Math.PI/2, 0]
    },
    {
      position: [0, 1.2, -2],     // Vue arrière légèrement surélevée
      rotation: [0, Math.PI, 0]
    },
    {
      position: [-1.5, 0.8, 0],       // Vue angle gauche
      rotation: [0, Math.PI/2, 0]
    }
  ];

  useFrame(() => {
    if (cameraRef.current) {
      // Déterminer la section actuelle (0 à 3)
      const section = Math.floor(scrollProgress * 4);
      const target = views[section];
      
      // Mise à jour de la position avec transition fluide
      cameraRef.current.position.x += (target.position[0] - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (target.position[1] - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z += (target.position[2] - cameraRef.current.position.z) * 0.05;

      // Faire regarder la caméra vers le centre
      cameraRef.current.lookAt(0, 0.5, 0);

      setCurrentSection(section);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={views[0].position}
      fov={50}
    />
  );
}

function Character() {
  const gltf = useGLTF('./homer.glb');
  const { scene, animations } = gltf;
  const mixer = useRef(null);
  const characterRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!scene || !animations) {
      console.warn('Scène ou animations non disponibles');
      return;
    }

    console.log('Animations disponibles:', animations.map(a => a.name));
    
    // Prendre la première animation disponible
    const animation = animations[0];
    
    if (!animation) {
      console.warn('Aucune animation trouvée dans le fichier GLB');
      return;
    }
    
    console.log('Animation sélectionnée:', animation.name);

    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.toneMapped = false;
        object.material.needsUpdate = true;
      }
    });

    // Créer un nouveau mixer
    if (!mixer.current) {
      mixer.current = new THREE.AnimationMixer(scene);
    }
    
    try {
      console.log('Démarrage de l\'animation:', animation.name);
      const action = mixer.current.clipAction(animation);
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.timeScale = 1;
      action.setEffectiveWeight(1);
      action.play();
      animationRef.current = action;
    } catch (error) {
      console.error('Erreur animation:', error);
      console.error('Détails de l\'animation:', animation);
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current.uncacheRoot(scene);
      }
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <primitive 
      ref={characterRef} 
      object={scene} 
      scale={0.5} 
      position={[0, 0, 0]} 
      rotation={[0, 0.5, 0]}
    />
  );
}

function ThreeDCharacter({ scrollProgress, setCurrentSection }) {
  return (
    <Canvas
      style={{ height: '100vh', width: '100%' }}
      gl={{ 
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <color attach="background" args={['#2F4F93']} /> {/* Bleu Simpson */}
      
      {/* Configuration d'éclairage pour les couleurs Simpson */}
      <ambientLight intensity={1} color="#FED41D" /> {/* Lumière ambiante jaune */}
      <directionalLight 
        position={[1, 2, 3]} 
        intensity={1.8} 
        color="#FFF4E5" /> {/* Lumière principale chaude */}
      <pointLight
        position={[-2, 2, -2]}
        intensity={0.7}
        color="#FFD700" /> {/* Accent doré */}
      
      <Character />
      <CameraController scrollProgress={scrollProgress} setCurrentSection={setCurrentSection} />
    </Canvas>
  );
}

export default ThreeDCharacter;
