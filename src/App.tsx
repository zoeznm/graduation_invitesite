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
      {stage === "loading" && <Loader onFinish={() => setStage("enter")} />}
      {stage === "enter" && <EnterGate onEnter={() => setStage("main")} />}
      {stage === "main" && <MainPage />}
    </>
  );
}
