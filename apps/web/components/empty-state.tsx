import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  illustration?: "monitors" | "incidents" | "notifications" | "status-pages";
}

function MonitorIllustration() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 opacity-40"
    >
      <rect x="10" y="5" width="100" height="60" rx="6" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="35" y1="45" x2="45" y2="35" stroke="currentColor" strokeWidth="2" className="text-green-500" />
      <line x1="45" y1="35" x2="55" y2="40" stroke="currentColor" strokeWidth="2" className="text-green-500" />
      <line x1="55" y1="40" x2="65" y2="25" stroke="currentColor" strokeWidth="2" className="text-green-500" />
      <line x1="65" y1="25" x2="85" y2="30" stroke="currentColor" strokeWidth="2" className="text-green-500" />
      <circle cx="30" cy="20" r="3" className="fill-green-500" />
      <circle cx="40" cy="20" r="3" className="fill-yellow-500" />
      <circle cx="50" cy="20" r="3" className="fill-green-500" />
      <rect x="50" y="70" width="20" height="4" rx="2" className="fill-muted-foreground" />
      <rect x="40" y="74" width="40" height="3" rx="1.5" className="fill-muted-foreground" />
    </svg>
  );
}

function IncidentIllustration() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 opacity-40"
    >
      <circle cx="60" cy="35" r="28" stroke="currentColor" strokeWidth="2" className="text-green-500" />
      <path d="M48 35 L56 43 L74 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500" />
      <path d="M40 70 L50 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground" />
      <path d="M55 70 L80 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground" />
      <circle cx="95" cy="20" r="4" className="fill-yellow-500 opacity-60" />
      <circle cx="25" cy="15" r="3" className="fill-green-500 opacity-40" />
    </svg>
  );
}

function NotificationIllustration() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 opacity-40"
    >
      <path d="M60 10 C45 10 35 20 35 35 L35 50 L25 55 L25 60 L95 60 L95 55 L85 50 L85 35 C85 20 75 10 60 10Z" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <path d="M50 65 C50 72 55 77 60 77 C65 77 70 72 70 65" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="60" y1="3" x2="60" y2="10" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
    </svg>
  );
}

function StatusPageIllustration() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 opacity-40"
    >
      <rect x="10" y="10" width="100" height="60" rx="6" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <line x1="20" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" />
      <circle cx="25" cy="40" r="5" className="fill-green-500" />
      <line x1="35" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
      <circle cx="25" cy="55" r="5" className="fill-green-500" />
      <line x1="35" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
    </svg>
  );
}

const illustrations = {
  monitors: MonitorIllustration,
  incidents: IncidentIllustration,
  notifications: NotificationIllustration,
  "status-pages": StatusPageIllustration,
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  illustration,
}: Props) {
  const IllustrationComponent = illustration
    ? illustrations[illustration]
    : null;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 border rounded-lg bg-muted/30">
      {IllustrationComponent ? (
        <IllustrationComponent />
      ) : (
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
        {description}
      </p>
      {action ? <>{action}</> : null}
    </div>
  );
}
