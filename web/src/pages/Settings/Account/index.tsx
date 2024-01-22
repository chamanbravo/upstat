import { AccountForm } from "./AccountForm";

export default function index() {
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
