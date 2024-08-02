import SettingsNavbar from "@/components/settings/navbar";
import { Separator } from "@/components/ui/separator";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <div className="space-y-6 pb-16 md:block">
        <div className="flex flex-col mt-4">
          <SettingsNavbar />
          <Separator className="m-0" />
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
