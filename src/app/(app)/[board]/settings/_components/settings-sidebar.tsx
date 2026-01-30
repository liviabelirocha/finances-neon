"use client";

import { cn } from "@/lib/utils";
import { Settings, Tag } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const settingsLinks = [
  { href: "general", label: "General", icon: Settings },
  { href: "categories", label: "Categories", icon: Tag },
];

export function SettingsSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/${params.board}/settings`;

  return (
    <nav className="w-full shrink-0 md:w-48">
      <h2 className="mb-4 text-lg font-semibold">Settings</h2>
      <div className="flex gap-1 md:flex-col">
        {settingsLinks.map((link) => {
          const fullPath = `${basePath}/${link.href}`;
          const isActive =
            pathname === fullPath || pathname.startsWith(`${fullPath}/`);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={fullPath}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
