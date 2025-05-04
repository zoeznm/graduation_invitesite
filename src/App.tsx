// src/App.tsx
import { useState } from "react";
import Loader from "./components/Loader/Loader";
import EnterGate from "./components/EnterGate/EnterGate";
import MainPage from "./pages/Main/Main";

type Stage = "loading" | "enter" | "main";

export default function App() {
  const [stage, setStage] = useState<Stage>("loading");

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {stage === "loading" && <Loader onFinish={() => setStage("enter")} />}
      {stage === "enter" && <EnterGate onEnter={() => setStage("main")} />}
      {stage === "main" && <MainPage />}
    </>
  );
}
