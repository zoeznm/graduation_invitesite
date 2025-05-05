// src/components/BusinessCard3D/BusinessCard3D.tsx
import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import styles from "./BusinessCard3D.module.scss";

/**
 * Canvas 텍스처로 그려진 명함을 생성합니다.
 * bgColor: 배경 색상, textColor: 텍스트 색상
 */
function createCardTexture(
  text: string,
  width = 512,
  height = 512,
  bgColor = "#fff",
  textColor = "#000"
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // 배경 색상
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 텍스트 그리기
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = text.split("\n");
  const fontSize = 32;
  ctx.font = `${fontSize}px sans-serif`;
  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      width / 2,
      height / 2 + (i - (lines.length - 1) / 2) * (fontSize + 10)
    );
  });

  return new THREE.CanvasTexture(canvas);
}

/**
 * 3D 명함 컴포넌트 (Plane 두 개로 구현)
 */
const BusinessCard3D: React.FC = () => {
  // 색상 옵션 리스트
  const colorOptions = [
    { bg: "#ffffff", text: "#000000" },
    { bg: "#FFA500", text: "#000000" },
    { bg: "#0000FF", text: "#ffffff" },
    { bg: "#008000", text: "#ffffff" },
    { bg: "#FF0000", text: "#ffffff" },
  ];

  const [selected, setSelected] = useState(0);
  const { bg, text: textColor } = colorOptions[selected];

  const frontTex = useMemo(
    () =>
      createCardTexture(
        `“Have you ever had a moment when you were truly angry?”`,
        512,
        512,
        bg,
        textColor
      ),
    [bg, textColor]
  );
  const backTex = useMemo(
    () =>
      createCardTexture(
        `Name: Your Name\nEmail: you@example.com\nPhone: 010-1234-5678`,
        512,
        512,
        bg,
        textColor
      ),
    [bg, textColor]
  );

  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.setClearColor(new THREE.Color(0x000000));
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* 명함 앞면 */}
        <mesh position={[0, 0, 0.01]}>  
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial
            map={frontTex}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 명함 뒷면 */}
        <mesh position={[0, 0, -0.01]} rotation-y={Math.PI}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial
            map={backTex}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 오비트 컨트롤: 줌 비활성화, 패닝 비활성화 */}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>

      {/* 색상 선택 원 버튼 */}
      <div className={styles.colorPicker}>
        {colorOptions.map((opt, idx) => (
          <button
            key={idx}
            title={`배경색 ${opt.bg}`} // 접근성 위해 title 추가
            className={`${styles.circle} ${
              selected === idx ? styles.active : ""
            }`}
            style={{ backgroundColor: opt.bg }}
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessCard3D;
