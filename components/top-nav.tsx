"use client";

import { Search, Bell, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface TopNavProps {
  onMenuClick: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 shrink-0 border-b border-primary/10 bg-white dark:bg-background-dark flex items-center justify-between px-4 md:px-8 z-10">
      <div className="flex items-center flex-1 max-w-xl gap-2 md:gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-lg transition-colors"
        >
          <Menu className="size-6" />
        </button>
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
          <input
            type="text"
            placeholder="Pesquisar negócios, contatos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 outline-none transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button className="sm:hidden relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors">
          <Search className="size-5" />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors"
        >
          <Sun className="size-5 hidden dark:block" />
          <Moon className="size-5 block dark:hidden" />
        </button>
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
        </button>
        <div className="h-8 w-[1px] bg-primary/10 mx-1 md:mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
              Carlos Silva
            </p>
            <p className="text-xs text-slate-500 leading-tight">Gestor de Vendas</p>
          </div>
          <div className="size-8 md:size-10 rounded-full bg-primary/20 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/30 transition-all relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrlEtZAaLNlMN2-xenbHsgH6T1eKwQnyWJa7F1bpawTnCBxB-KCYaqcffWQhhaLCD07F8ehV_IMcLZEUNdZdrCiT87VDTzoSGHkkRDOOcftd4rxpkraK2QvGohNfQADMs3QkZtHEVLyj2Z9mPsNS_nxZO3uoX9FA4OIw3c_IxSQpZpg1Q41eC5fj62_sFfdTWSs8luxXFUclpMC_rqiEX3ACiYZx33SFUAi4xsr-2ToBGSERVdCbf234kHjW9CprT7ijdzTiDfdeU"
              alt="Foto de perfil do usuário"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
