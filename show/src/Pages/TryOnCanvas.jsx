import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Center } from '@react-three/drei';

// 💡 INTERNAL TEXTURE MESH PLANE COMPONENT
function ProductMesh({ textureUrl }) {
  // Safe fallback to prevent hook crash if url is empty
  const validUrl = textureUrl || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg";
  
  // AI generated link se automatic 2D image matrix create ho jayegi
  const texture = useTexture(validUrl);

  return (
    <mesh castShadow receiveShadow>
      {/* Dynamic 2D structure layout matching exact vertical body proportions */}
      <planeGeometry args={[3, 4]} /> 
      {/* Mesh face mapping with full scale clarity transparency adjustments */}
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        toneMapped={false}
        side={2} // DoubleSide rendering (THREE.DoubleSide alias)
      />
    </mesh>
  );
}

// 💡 MAIN INTERACTIVE CANVAS VIEWPORT EXPORT
export default function TryOnCanvas({ textureUrl }) {
  return (
    <div className="w-full h-full min-h-[350px] relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 shadow-inner">
      
      {/* Micro instructions overlays tracking overlay screens */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 border border-gray-800 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest text-center whitespace-nowrap">
          Left Click + Drag to Rotate • Scroll to Zoom
        </p>
      </div>

      {/* 🔄 Wrap the core Canvas in Suspense to capture texture async streams safely */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 font-mono">
          🧬 Compiling 3D Texture Buffer Matrices...
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          {/* Cinematic ambient background lights to light up matrix fields */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[2, 5, 3]} intensity={1.5} />

          <Center>
            {/* Dynamic model deployment layer mapping core responses */}
            <ProductMesh textureUrl={textureUrl} />
          </Center>

          {/* Orbit controllers allowing precise rotational tracking fields */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={2}
            maxDistance={7}
            maxPolarAngle={Math.PI / 2} // Restrict camera view boundaries above grounding planes
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}