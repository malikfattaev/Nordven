import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { publicEnv } from "@/lib/env";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.NEXT_PUBLIC_SITE_URL),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
