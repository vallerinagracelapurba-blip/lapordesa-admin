"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

export type DashboardHeaderConfig = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  notificationContent?: ReactNode;
};

type DashboardHeaderContextType = {
  setHeaderConfig: (config: DashboardHeaderConfig | null) => void;
  notificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
};

export const DashboardHeaderContext =
  createContext<DashboardHeaderContextType | null>(null);

export function useDashboardHeader(config: DashboardHeaderConfig) {
  const context = useContext(DashboardHeaderContext);

  if (!context) {
    throw new Error(
      "useDashboardHeader harus digunakan di dalam DashboardShell"
    );
  }

  useEffect(() => {
    context.setHeaderConfig(config);

    return () => {
      context.setHeaderConfig(null);
    };
  }, [
    context.setHeaderConfig,
    config.searchValue,
    config.onSearchChange,
    config.searchPlaceholder,
    config.notificationContent,
  ]);
}