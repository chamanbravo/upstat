import { AccountForm } from "@/components/settings/account-form";

export default function Settings() {
  return (
    <div className="space-y-6 mt-8">
      <div>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <AccountForm />
    </div>
  );
}
