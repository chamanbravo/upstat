import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth, MonitorItem, Monitors, PageNotFound } from "./pages";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider />
        {/* container that supprts dark scrollbar */}
        <div className="overflow-y-auto dark:[color-scheme:dark] max-h-screen">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/app/monitors" element={<Monitors />} />
            <Route path="/app/monitors/:id" element={<MonitorItem />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
