"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rocket,
  LayoutDashboard,
  Users,
  Building2,
  KanbanSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Contatos", href: "/contatos", icon: Users },
  { name: "Empresas", href: "/empresas", icon: Building2 },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Vendas", href: "/vendas", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-white dark:bg-background-dark flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
          <Rocket className="size-5" />
        </div>
        <div>
          <h2 className="text-primary dark:text-slate-100 font-bold leading-tight tracking-tight">
            SalesTeam
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Modern CRM</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5"
              )}
            >
              <Icon className="size-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-primary/10">
        <Link
          href="/configuracoes"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 transition-colors"
        >
          <Settings className="size-5" />
          <span className="text-sm">Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
