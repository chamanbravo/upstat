import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1280px] m-auto">
      <Navbar />
      <div className="flex gap-12 px-4 max-w-[1200px] m-auto">
        <Sidebar />
        <div className="w-full py-6">{children}</div>
      </div>
    </div>
  );
}
