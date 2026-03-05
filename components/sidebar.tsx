"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Rocket,
  LayoutDashboard,
  Users,
  Building2,
  KanbanSquare,
  BarChart3,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Contatos", href: "/contatos", icon: Users },
  { name: "Empresas", href: "/empresas", icon: Building2 },
  { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { name: "Vendas", href: "/vendas", icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-background-dark border-r border-primary/10 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col h-full",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
              <Rocket className="size-5" />
            </div>
            <div>
              <h2 className="text-primary dark:text-slate-100 font-bold leading-tight tracking-tight">
                MNSILVA CRM
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Modern CRM</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="size-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
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
        <div className="p-4 border-t border-primary/10 space-y-2">
          <Link
            href="/configuracoes"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm",
              pathname === "/configuracoes"
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5"
            )}
          >
            <Settings className="size-5" />
            <span>Configurações</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-bold text-sm"
          >
            <LogOut className="size-5" />
            <span>Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  );
}
