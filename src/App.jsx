import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const goFullScreen = async () => {
      if (document.fullscreenElement) return;
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log("Fullscreen falhou ou foi bloqueado", err);
      }
    };
  
    document.addEventListener("click", goFullScreen, { once: true });
  }, []);
  
  return <AppRoutes />;
}

export default App;
