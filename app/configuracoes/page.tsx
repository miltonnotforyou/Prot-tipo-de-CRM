"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Monitor,
  Mail,
  Smartphone,
  MessageSquare,
  Lock,
  Key,
  Smartphone as DeviceIcon,
  ShieldCheck,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

type SettingsTab = "perfil" | "notificacoes" | "seguranca" | "aparencia";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("perfil");
  const [isSaved, setIsSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);

  // Notification states
  const [notifications, setNotifications] = useState({
    email: { leads: true, tasks: true, system: false },
    push: { leads: true, tasks: false, system: true },
    sms: { leads: false, tasks: false, system: false }
  });

  // Security states
  const [twoFactor, setTwoFactor] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedTheme(theme);
  }, [theme]);

  const handleSave = () => {
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const toggleNotification = (type: keyof typeof notifications, key: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: !prev[type][key as keyof (typeof prev)['email']]
      }
    }));
  };

  const tabs = [
    { id: "perfil" as const, label: "Perfil", icon: User },
    { id: "notificacoes" as const, label: "Notificações", icon: Bell },
    { id: "seguranca" as const, label: "Segurança", icon: Shield },
    { id: "aparencia" as const, label: "Aparência", icon: Palette },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Configurações
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Gerencie sua conta e preferências do sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-primary/5"
              }`}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "perfil" && (
              <motion.div
                key="perfil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Informações do Perfil</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
                        <input 
                          type="text" 
                          defaultValue="Carlos Silva"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cargo</label>
                        <input 
                          type="text" 
                          defaultValue="Gestor de Vendas"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        defaultValue="carlos.silva@mnsilvacrm.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bio</label>
                      <textarea 
                        rows={4}
                        defaultValue="Focado em otimizar processos de vendas e gestão de pipeline para alta performance."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notificacoes" && (
              <motion.div
                key="notificacoes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Preferências de Notificação</h3>
                  
                  <div className="space-y-8">
                    {/* E-mail Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Mail className="size-5" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">E-mail</h4>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(notifications.email).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                            <div>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">
                                {key === 'leads' ? 'Novos Leads' : key === 'tasks' ? 'Lembretes de Tarefas' : 'Atualizações do Sistema'}
                              </p>
                              <p className="text-xs text-slate-500">Receba alertas importantes via e-mail corporativo.</p>
                            </div>
                            <button 
                              onClick={() => toggleNotification('email', key)}
                              className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                              <div className={`absolute top-1 size-4 rounded-full bg-white transition-all ${value ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Smartphone className="size-5" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Push (Navegador/App)</h4>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(notifications.push).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                            <div>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">
                                {key === 'leads' ? 'Novos Leads' : key === 'tasks' ? 'Lembretes de Tarefas' : 'Atualizações do Sistema'}
                              </p>
                              <p className="text-xs text-slate-500">Alertas em tempo real no seu dispositivo.</p>
                            </div>
                            <button 
                              onClick={() => toggleNotification('push', key)}
                              className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                            >
                              <div className={`absolute top-1 size-4 rounded-full bg-white transition-all ${value ? 'left-7' : 'left-1'}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "seguranca" && (
              <motion.div
                key="seguranca"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Alterar Senha */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Lock className="size-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Alterar Senha</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Senha Atual</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nova Senha</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirmar Nova Senha</label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline">Esqueceu sua senha?</button>
                  </div>
                </div>

                {/* Autenticação em Duas Etapas */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <ShieldCheck className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Autenticação em Duas Etapas (2FA)</h3>
                        <p className="text-xs text-slate-500">Adicione uma camada extra de segurança à sua conta.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`w-12 h-6 rounded-full transition-all relative ${twoFactor ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <div className={`absolute top-1 size-4 rounded-full bg-white transition-all ${twoFactor ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                  
                  {twoFactor && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                      <div className="flex gap-3">
                        <Smartphone className="size-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-emerald-900 dark:text-emerald-400">Configurado via Google Authenticator</p>
                          <p className="text-xs text-emerald-700 dark:text-emerald-500/70 mt-1">Seu dispositivo principal está vinculado. Você precisará de um código para fazer login.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sessões Ativas */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                      <History className="size-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sessões Ativas</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm">
                          <Monitor className="size-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">MacBook Pro - Chrome</p>
                          <p className="text-xs text-slate-500">São Paulo, Brasil • <span className="text-emerald-500 font-bold">Sessão Atual</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm">
                          <DeviceIcon className="size-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">iPhone 15 Pro - App</p>
                          <p className="text-xs text-slate-500">São Paulo, Brasil • Há 2 horas</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-red-500 hover:underline">Encerrar</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "aparencia" && (
              <motion.div
                key="aparencia"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary/10 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Aparência do Sistema</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => setSelectedTheme("light")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        mounted && selectedTheme === "light"
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 dark:border-slate-700 hover:border-primary/30"
                      }`}
                    >
                      <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-900">
                        <Sun className="size-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Claro</span>
                    </button>

                    <button
                      onClick={() => setSelectedTheme("dark")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        mounted && selectedTheme === "dark"
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 dark:border-slate-700 hover:border-primary/30"
                      }`}
                    >
                      <div className="size-12 rounded-xl bg-slate-900 shadow-sm flex items-center justify-center text-white">
                        <Moon className="size-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Escuro</span>
                    </button>

                    <button
                      onClick={() => setSelectedTheme("system")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        mounted && selectedTheme === "system"
                          ? "border-primary bg-primary/5"
                          : "border-slate-100 dark:border-slate-700 hover:border-primary/30"
                      }`}
                    >
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <Monitor className="size-6" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Sistema</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-end gap-4">
            {isSaved && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
              >
                <CheckCircle2 className="size-4" />
                Alterações salvas!
              </motion.div>
            )}
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
            >
              <Save className="size-4" />
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
