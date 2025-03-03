import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "@/components/ui/navbar-right";
import LoadingIndicator from "../../components/Loading";

interface SidebarLayoutProps {
  loading: boolean;
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ loading, children }) => {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {loading ? <LoadingIndicator /> : children}
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

export default SidebarLayout;
