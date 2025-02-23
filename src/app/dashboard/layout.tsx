"use client";
import HeaderComponent from "@/common/header/header";
import SidebarComponent from "@/common/sidebar/sidebar";
import { useParams } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex flex-col w-full h-screen">
        <HeaderComponent />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
