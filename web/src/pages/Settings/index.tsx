import DashboardLayout from "@/components/DashboardLayout";
import { Helmet } from "react-helmet-async";
import Layout from "./Layout";
import { useLocation } from "react-router";
import Account from "./Account";
import PasswordSecurity from "./PasswordSecurity";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";

export default function Settings() {
  const { pathname } = useLocation();
  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>Settings | Upstat</title>
        </Helmet>
        <DashboardLayout>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings.
              </p>
            </div>
            <Layout>
              {pathname === "/app/settings" && <Account />}
              {pathname === "/app/settings/password-security" && (
                <PasswordSecurity />
              )}
            </Layout>
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
