import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Auth,
  CreateMonitor,
  MonitorItem,
  Monitors,
  PageNotFound,
  Settings,
  Notifications,
  CreateNotification,
  StatusPages,
  CreateStatusPage,
  PublicStatusPage,
} from "./pages";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider />
        <Toaster />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/app/monitors" element={<Monitors />} />
          <Route path="/app/monitors/:id" element={<MonitorItem />} />
          <Route path="/app/monitors/new" element={<CreateMonitor />} />
          <Route
            path="/app/monitors/configure/:id"
            element={<CreateMonitor />}
          />
          <Route path="/app/notifications" element={<Notifications />} />
          <Route
            path="/app/notifications/create"
            element={<CreateNotification />}
          />
          <Route
            path="/app/notifications/configure/:id"
            element={<CreateNotification />}
          />
          <Route path="/app/status-pages" element={<StatusPages />} />
          <Route
            path="/app/status-pages/create"
            element={<CreateStatusPage />}
          />
          <Route
            path="/app/status-pages/configure/:id"
            element={<CreateStatusPage />}
          />
          <Route path="/status-pages/:slug" element={<PublicStatusPage />} />
          <Route path="/app/settings" element={<Settings />} />
          <Route
            path="/app/settings/password-security"
            element={<Settings />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
