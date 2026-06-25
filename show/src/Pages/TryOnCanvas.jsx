import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Center } from '@react-three/drei';

function ProductMesh({ textureUrl }) {
  const validUrl = textureUrl || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
  const texture = useTexture(validUrl);

  return (
    <mesh castShadow receiveShadow>
      <planeGeometry args={[2.8, 3.8]} /> 
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        toneMapped={false}
        side={2} 
      />
    </mesh>
  );
}

export default function TryOnCanvas({ textureUrl }) {
  return (
    <div className="w-full h-full min-h-[350px] relative bg-[#090909] rounded-xl overflow-hidden border border-neutral-800/40">
      
      {/* Absolute Bottom Instructions Text Layer */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/80 border border-neutral-800/60 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none">
        <p className="text-[9px] text-neutral-400 font-mono tracking-[0.2em] text-center whitespace-nowrap">
          Drag to View Posture • Scroll to Zoom
        </p>
      </div>

      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[11px] text-neutral-500 font-mono bg-neutral-950">
          <div className="w-4 h-4 rounded-full border-2 border-neutral-800 border-t-[#c5a880] animate-spin"></div>
          <span>Synchronizing 3D Canvas Frame...</span>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[1, 4, 3]} intensity={1.2} />

          <Center>
            <ProductMesh textureUrl={textureUrl} />
          </Center>

          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={2.2}
            maxDistance={6.5}
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}