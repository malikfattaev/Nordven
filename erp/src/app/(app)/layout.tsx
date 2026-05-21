import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ensureReady } from "@/lib/db";
import { readSession } from "@/lib/auth";
import { Sidebar } from "@/components/shell/Sidebar";
import { Topbar } from "@/components/shell/Topbar";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  await ensureReady();
  const user = await readSession();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
