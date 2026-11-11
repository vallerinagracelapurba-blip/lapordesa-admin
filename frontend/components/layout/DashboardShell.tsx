
"use client";

import { useState } from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import {
  DashboardHeaderContext,
  type DashboardHeaderConfig,
} from "./DashboardHeaderContext";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onProfile } = useAppNavigation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [headerConfig, setHeaderConfig] =
    useState<DashboardHeaderConfig | null>(null);

  return (
    <DashboardHeaderContext.Provider
      value={{
        setHeaderConfig,
        notificationOpen,
        setNotificationOpen,
      }}
    >
      <div className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
        <DashboardSidebar />

        <section className="ml-[244px] min-h-screen">
          <DashboardNavbar
            notificationOpen={notificationOpen}
            onToggleNotification={() =>
              setNotificationOpen((previous) => !previous)
            }
            onCloseNotification={() => setNotificationOpen(false)}
            onProfile={onProfile}
            searchValue={headerConfig?.searchValue ?? ""}
            onSearchChange={headerConfig?.onSearchChange}
            searchPlaceholder={headerConfig?.searchPlaceholder}
            notificationContent={headerConfig?.notificationContent}
          />

          {children}
        </section>
      </div>
    </DashboardHeaderContext.Provider>
  );
}
