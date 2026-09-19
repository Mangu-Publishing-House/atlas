import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  FolderTree,
  LayoutDashboard,
  Scale,
  Search,
  Tags,
  PieChart,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/command-palette";

const NAV = [
  { to: "/", label: "Command", icon: LayoutDashboard },
  { to: "/authority", label: "Authority", icon: Search },
  { to: "/forest", label: "Forest", icon: FolderTree },
  { to: "/assign", label: "Assign", icon: Tags },
  { to: "/policy", label: "Policy", icon: Scale },
  { to: "/coverage", label: "Coverage", icon: PieChart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-paper focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border bg-surface md:flex">
          <div className="px-5 pb-4 pt-6">
            <Link to="/" className="block">
              <p className="font-display text-lg font-medium tracking-tight text-fg">
                MANGU Atlas
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-subtle">
                Catalog authority
              </p>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 px-3">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                    active
                      ? "bg-elevated text-fg"
                      : "text-muted hover:bg-elevated/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border px-5 py-4 text-xs text-subtle">
            <p className="flex items-center gap-2">
              <BookOpen className="size-3.5" />
              LCGFT · LOC
            </p>
            <p className="mt-1">Snapshot 15 Sep 2026</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur md:h-16 md:px-8">
            <Link to="/" className="font-display text-base md:hidden">
              Atlas
            </Link>
            <div className="ml-auto w-full max-w-md">
              <CommandPalette />
            </div>
          </header>
          <main
            id="main"
            className="flex-1 px-4 pb-24 pt-6 md:px-8 md:pb-12 md:pt-8"
          >
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden">
        <ul className="grid grid-cols-5 px-1 pb-[env(safe-area-inset-bottom)]">
          {NAV.slice(0, 5).map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 text-[0.65rem] uppercase tracking-wide",
                    active ? "text-fg" : "text-subtle",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
