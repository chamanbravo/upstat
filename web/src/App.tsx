import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Auth,
  CreateMonitor,
  MonitorItem,
  Monitors,
  PageNotFound,
  Settings,
} from "./pages";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider />
        <Toaster />
        {/* container that supprts dark scrollbar */}
        <div className="overflow-y-auto dark:[color-scheme:dark] max-h-screen">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/app/monitors" element={<Monitors />} />
            <Route path="/app/monitors/:id" element={<MonitorItem />} />
            <Route path="/app/monitors/new" element={<CreateMonitor />} />
            <Route
              path="/app/monitors/configure/:id"
              element={<CreateMonitor />}
            />
            <Route path="/app/settings" element={<Settings />} />
            <Route
              path="/app/settings/password-security"
              element={<Settings />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
