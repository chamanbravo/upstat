import { Activity, BellDot, Cog, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";
import useUserStore from "@/store/UserStore";

const selectedStyle = "bg-secondary text-foreground";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  return (
    <div className="max-w-[200px] h-[calc(100vh-80px)] border-r sticky top-[70px] pr-4 py-6 hidden md:flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname.includes("monitors") && selectedStyle
          }`}
          onClick={() => navigate("/app/monitors")}
        >
          <Activity className="w-4 h-4 mr-2" />
          Monitors
        </Button>
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname.includes("notifications") && selectedStyle
          }`}
          onClick={() => navigate("/app/notifications")}
        >
          <BellDot className="w-4 h-4 mr-2" />
          Notifications
        </Button>
        {/* <Button
          variant="ghost"
          className="justify-start text-muted-foreground hover:text-foreground"
        >
          <PanelTop className="w-4 h-4 mr-2" />
          Status Pages
        </Button> */}
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname.includes("settings") && selectedStyle
          }`}
          onClick={() => navigate("/app/settings")}
        >
          <Cog className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
      <Button
        variant="ghost"
        className="justify-start text-muted-foreground hover:text-foreground"
        onClick={() => {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          clearUser();
          navigate("/");
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
}
