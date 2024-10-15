import { ReactNode } from "react";
import { NotificationProvider } from "./Notification/NotificationProvider";

export function LibraryProviders({ children }: { children: ReactNode }) {
  return (
    <NotificationProvider autoClose={3500} position="bottom-right">
      {children}
    </NotificationProvider>
  );
}
