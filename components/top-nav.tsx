"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Menu, 
  User, 
  Building2, 
  KanbanSquare, 
  X, 
  Plus, 
  Settings as SettingsIcon,
  TrendingUp,
  Command,
  History,
  ArrowRight,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TopNavProps {
  onMenuClick: () => void;
}

interface SearchResult {
  id: number | string;
  title: string;
  type: string;
  icon: any;
  href: string;
  category: string;
}

const mockResults: SearchResult[] = [
  { id: 1, title: "Software ERP v2", type: "Negócio", icon: KanbanSquare, href: "/pipeline", category: "Resultados" },
  { id: 2, title: "Indústrias Alfa S.A.", type: "Empresa", icon: Building2, href: "/empresas", category: "Resultados" },
  { id: 3, title: "Carlos Silva", type: "Contato", icon: User, href: "/contatos", category: "Resultados" },
  { id: 4, title: "Consultoria Cloud", type: "Negócio", icon: KanbanSquare, href: "/pipeline", category: "Resultados" },
  { id: 5, title: "Tech Solutions", type: "Empresa", icon: Building2, href: "/empresas", category: "Resultados" },
  { id: 6, title: "Relatório de Vendas Q1", type: "Vendas", icon: TrendingUp, href: "/vendas", category: "Resultados" },
  // Quick Actions
  { id: "action-1", title: "Criar Novo Negócio", type: "Ação Rápida", icon: Plus, href: "/pipeline", category: "Ações" },
  { id: "action-2", title: "Adicionar Contato", type: "Ação Rápida", icon: User, href: "/contatos", category: "Ações" },
  { id: "action-3", title: "Ir para Configurações", type: "Navegação", icon: SettingsIcon, href: "/configuracoes", category: "Ações" },
];

export function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("mnsilva_recent_searches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map icons back since they can't be stringified
        const mapped = parsed.map((item: any) => ({
          ...item,
          icon: mockResults.find(r => r.title === item.title)?.icon || Search
        }));
        setRecentSearches(mapped);
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery) return [];
    return mockResults.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayResults = useMemo(() => {
    if (searchQuery) return filteredResults;
    return recentSearches.length > 0 ? recentSearches : mockResults.filter(r => r.category === "Ações");
  }, [searchQuery, filteredResults, recentSearches]);

  const resultsByCategory = useMemo(() => {
    const items = displayResults;
    const groups: Record<string, SearchResult[]> = {};
    
    if (!searchQuery && recentSearches.length > 0) {
      groups["Recentes"] = recentSearches;
      groups["Sugestões"] = mockResults.filter(r => r.category === "Ações");
    } else {
      items.forEach(item => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
      });
    }
    return groups;
  }, [displayResults, searchQuery, recentSearches]);

  // Flattened list for keyboard navigation
  const flatResults = useMemo(() => {
    return Object.values(resultsByCategory).flat();
  }, [resultsByCategory]);

  const addToRecent = useCallback((item: SearchResult) => {
    setRecentSearches(prev => {
      const newRecent = [item, ...prev.filter(r => r.id !== item.id)].slice(0, 5);
      localStorage.setItem("mnsilva_recent_searches", JSON.stringify(newRecent.map(({ icon, ...rest }) => rest)));
      return newRecent;
    });
  }, []);

  const handleSelect = useCallback((item: SearchResult) => {
    addToRecent(item);
    setShowResults(false);
    setIsMobileSearchOpen(false);
    setSearchQuery("");
    router.push(item.href);
  }, [router, addToRecent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowResults(true);
      }
      
      if (!showResults) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % flatResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + flatResults.length) % flatResults.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (flatResults[selectedIndex]) {
          handleSelect(flatResults[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        setShowResults(false);
        setIsMobileSearchOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults, flatResults, selectedIndex, router, handleSelect]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-primary font-black underline underline-offset-2 decoration-primary/30">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const handleLogout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="h-16 shrink-0 border-b border-primary/10 bg-white dark:bg-background-dark flex items-center justify-between px-4 md:px-8 z-10">
      <div className="flex items-center flex-1 max-w-xl gap-2 md:gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-lg transition-colors"
        >
          <Menu className="size-6" />
        </button>
        
        {/* Desktop Search */}
        <div className="relative w-full hidden sm:block" ref={searchRef}>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5 group-focus-within:text-primary transition-colors" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
                setSelectedIndex(0);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Pesquisar em todo o CRM... (⌘K)"
              className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-primary/20 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 text-sm placeholder:text-slate-400 text-slate-900 dark:text-slate-100 outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm pointer-events-none">
              <Command className="size-3 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400">K</span>
            </div>
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[70vh] flex flex-col">
              <div className="overflow-y-auto flex-1 p-2">
                {Object.entries(resultsByCategory).length > 0 ? (
                  Object.entries(resultsByCategory).map(([category, items]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-2 px-3 py-2">
                        {category === "Recentes" ? <History className="size-3 text-slate-400" /> : null}
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {category}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        {items.map((result) => {
                          const flatIndex = flatResults.findIndex(r => r.id === result.id);
                          const isSelected = flatIndex === selectedIndex;
                          
                          return (
                            <div
                              key={result.id}
                              onMouseEnter={() => setSelectedIndex(flatIndex)}
                              onClick={() => handleSelect(result)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                                isSelected 
                                  ? "bg-primary/10 dark:bg-primary/20" 
                                  : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                              }`}
                            >
                              <div className={`size-9 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                                isSelected 
                                  ? "bg-primary text-white scale-110" 
                                  : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                              }`}>
                                <result.icon className="size-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-bold truncate ${
                                  isSelected ? "text-primary dark:text-primary-light" : "text-slate-900 dark:text-slate-100"
                                }`}>
                                  {highlightMatch(result.title, searchQuery)}
                                </p>
                                <p className="text-xs text-slate-500 truncate font-medium">{result.type}</p>
                              </div>
                              {isSelected && (
                                <div className="animate-in fade-in slide-in-from-right-2">
                                  <ArrowRight className="size-4 text-primary" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-12 text-center">
                    <div className="size-12 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="size-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Nenhum resultado encontrado</p>
                    <p className="text-xs text-slate-500 mt-1">Não encontramos nada para &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 shadow-sm">↑↓</kbd>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Navegar</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 shadow-sm">↵</kbd>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Selecionar</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">MNSILVA Global Search</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Overlay */}
        {isMobileSearchOpen && (
          <div className="fixed inset-0 bg-white dark:bg-background-dark z-[60] p-4 flex flex-col gap-4 sm:hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-5" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none text-base outline-none font-medium"
                />
              </div>
              <button 
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="space-y-6 pb-8">
                  {Object.entries(resultsByCategory).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                        {category === "Recentes" && <History className="size-3" />}
                        {category}
                      </p>
                      <div className="space-y-2">
                        {items.map((result) => (
                          <div
                            key={result.id}
                            onClick={() => handleSelect(result)}
                            className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 active:scale-95 transition-transform"
                          >
                            <div className="size-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 shadow-sm">
                              <result.icon className="size-6" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-slate-100">
                                {highlightMatch(result.title, searchQuery)}
                              </p>
                              <p className="text-xs text-slate-500 font-medium">{result.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="sm:hidden relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors"
        >
          <Search className="size-5" />
        </button>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors"
        >
          {mounted && (
            <>
              <Sun className="size-5 hidden dark:block" />
              <Moon className="size-5 block dark:hidden" />
            </>
          )}
          {!mounted && <div className="size-5" />}
        </button>
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5 rounded-full transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
        </button>
        <div className="h-8 w-[1px] bg-primary/10 mx-1 md:mx-2"></div>
        
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-slate-100 dark:hover:bg-primary/5 p-1.5 rounded-xl transition-colors"
          >
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
            <ChevronDown className={cn("size-4 text-slate-400 transition-transform duration-200", isProfileOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 py-2"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 mb-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sua Conta</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">Carlos Silva</p>
                  <p className="text-xs text-slate-500 truncate">mnsilva25@gmail.com</p>
                </div>
                
                <Link 
                  href="/configuracoes"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-primary/5 transition-colors"
                >
                  <SettingsIcon className="size-4" />
                  <span className="font-medium">Configurações</span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="size-4" />
                  <span className="font-medium">Sair da conta</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
