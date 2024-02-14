import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex gap-12 px-4">
        <Sidebar />
        <div className="py-6 w-full">{children}</div>
      </div>
    </>
  );
}
