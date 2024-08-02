import { UpdatePasswordForm } from "@/components/settings/update-password-form";

export default function PasswordSecurity() {
  return (
    <div className="space-y-6 mt-8">
      <div>
        <p className="text-sm text-muted-foreground">
          Keep your password secure and up to date.
        </p>
      </div>
      <UpdatePasswordForm />
    </div>
  );
}
