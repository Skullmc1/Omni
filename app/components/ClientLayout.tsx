"use client";
import ContextMenu from "./ContextMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContextMenu>{children}</ContextMenu>;
}
