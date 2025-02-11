import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center py-4 border rounded-md">
      {icon}
      <h3>{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {action ? <>{action}</> : null}
    </div>
  );
}
