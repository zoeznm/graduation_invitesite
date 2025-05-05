// src/components/BusinessCard3D/BusinessCard3D.tsx
import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import * as THREE from 'three';

const BusinessCard: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);

  // 앞면/뒷면 텍스처 로드 (png/jpg 준비)
  const frontTex = useLoader(THREE.TextureLoader, '/textures/card-front.png');
  const backTex  = useLoader(THREE.TextureLoader, '/textures/card-back.png');

  return (
    <mesh ref={ref}>
      {/* 명함 두께는 0.02, 가로 3, 세로 2 크기 */}
      <boxGeometry args={[3, 2, 0.02]} />
      {/* 6개의 면(material-0~5)에 순서대로 텍스처 지정 */}
      <meshStandardMaterial attach="material-0" map={frontTex} />   {/* +X */}
      <meshStandardMaterial attach="material-1" map={backTex} />    {/* -X */}
      <meshStandardMaterial attach="material-2" color="#ffffff" />  {/* +Y */}
      <meshStandardMaterial attach="material-3" color="#ffffff" />  {/* -Y */}
      <meshStandardMaterial attach="material-4" color="#ffffff" />  {/* +Z */}
      <meshStandardMaterial attach="material-5" color="#ffffff" />  {/* -Z */}
    </mesh>
  );
};

const BusinessCard3D: React.FC = () => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 50 }}
    style={{ width: '100%', height: '400px' }} // 원하는 크기로 조절
  >
    {/* 조명 */}
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />

    {/* 3D 명함 */}
    <BusinessCard />

    {/* 드래그로 회전 가능하게 */}
    <OrbitControls enablePan={false} />
  </Canvas>
);

export default BusinessCard3D;
