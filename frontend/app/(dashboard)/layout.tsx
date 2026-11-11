
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import DashboardShell from "@/components/layout/DashboardShell";

async function SessionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!verifySession(session)) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <p role="status" className="p-8">
          Memuat halaman...
        </p>
      }
    >
      <SessionGate>{children}</SessionGate>
    </Suspense>
  );
}
