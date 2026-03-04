"use client";

import {
  Calendar,
  Plus,
  DollarSign,
  TrendingUp,
  UserPlus,
  Clock,
  Phone,
  Users,
  FileText,
  CalendarDays,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "JAN", receita: 4000, projecao: 2400 },
  { name: "FEV", receita: 3000, projecao: 1398 },
  { name: "MAR", receita: 2000, projecao: 9800 },
  { name: "ABR", receita: 2780, projecao: 3908 },
  { name: "MAI", receita: 1890, projecao: 4800 },
  { name: "JUN", receita: 2390, projecao: 3800 },
  { name: "JUL", receita: 3490, projecao: 4300 },
];

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary dark:text-slate-100">
            Bem-vindo de volta, Carlos
          </h1>
          <p className="text-slate-500 mt-1">
            Aqui está o desempenho da sua equipe de vendas hoje.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-primary/20 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Calendar className="size-5" />
            Últimos 30 dias
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            <Plus className="size-5" />
            Novo Negócio
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary dark:text-slate-100 rounded-lg">
              <DollarSign className="size-5" />
            </div>
            <span className="text-emerald-500 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
              +12.5%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Total de Negócios</p>
          <p className="text-2xl font-bold mt-1">R$ 1.2M</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary dark:text-slate-100 rounded-lg">
              <TrendingUp className="size-5" />
            </div>
            <span className="text-emerald-500 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
              +2.1%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Taxa de Conversão</p>
          <p className="text-2xl font-bold mt-1">15%</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary dark:text-slate-100 rounded-lg">
              <UserPlus className="size-5" />
            </div>
            <span className="text-rose-500 text-sm font-bold bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded">
              -4.3%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Novos Leads</p>
          <p className="text-2xl font-bold mt-1">45</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 text-primary dark:text-slate-100 rounded-lg">
              <Clock className="size-5" />
            </div>
            <span className="text-slate-400 text-sm font-bold bg-slate-50 dark:bg-slate-700 px-2 py-0.5 rounded">
              0%
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Tarefas Pendentes</p>
          <p className="text-2xl font-bold mt-1">12</p>
        </div>
      </div>

      {/* Main Chart and Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Desempenho de Vendas
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary dark:bg-slate-100"></span> Receita
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-slate-200 dark:bg-slate-600"></span> Projeção
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="#455768"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                  activeDot={{ r: 6 }}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: "bold", fill: "#94a3b8" }}
                  dy={10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Column: Next Activities */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
            Atividades Próximas
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors cursor-pointer border border-transparent hover:border-primary/10">
              <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Phone className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  Ligar para Cliente X
                </p>
                <p className="text-xs text-slate-500">Hoje, 14:00 • Follow-up</p>
              </div>
            </div>
            <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors cursor-pointer border border-transparent hover:border-primary/10">
              <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <Users className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  Reunião com Time Y
                </p>
                <p className="text-xs text-slate-500">Amanhã, 09:30 • Alinhamento Mensal</p>
              </div>
            </div>
            <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors cursor-pointer border border-transparent hover:border-primary/10">
              <div className="size-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
                <FileText className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  Enviar Proposta Z
                </p>
                <p className="text-xs text-slate-500">Quinta, 16:00 • Envio de Docs</p>
              </div>
            </div>
            <div className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-primary/5 transition-colors cursor-pointer border border-transparent hover:border-primary/10">
              <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CalendarDays className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                  Demo de Produto: Alpha
                </p>
                <p className="text-xs text-slate-500">Sexta, 11:00 • Apresentação</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 rounded-lg border border-primary/20 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Ver todas as tarefas
          </button>
        </div>
      </div>

      {/* Bottom Section: Recent Deals Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-primary/10 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Negócios Recentes
          </h3>
          <button className="text-primary dark:text-slate-300 text-sm font-bold hover:underline">
            Ver tudo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Negócio</th>
                <th className="px-6 py-4">Estágio</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Responsável</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-primary/10 text-primary dark:text-slate-100 flex items-center justify-center font-bold text-xs">
                      TS
                    </div>
                    <span className="text-sm font-semibold">TechSolutions Ltda</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    Proposta
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">R$ 45.000,00</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvj5sECtDMeTR6KK9dzrmYu7DrGqGQS_6B_78XR7IQ1wGQM0DmJI9kQXTxR5oWB74v_NYhk1jljIGiGTtCSUTZQp_0LxUXBtgvaTU79Ps7l5BslDfgoqAPaSZWgKKtPPeJX2K-3DM63_5SJ6M08cBLIS7SoRLnNTkwiZOTx351ba2tRcW36UUndMzI9F761Pfpy9yB8xPF74A34WKjgygOeG7tVez7NrVjC0tF3udaQBmfEpsxJejbsEW0J4zi_sGJvsj-GLwZQCo"
                        alt="Avatar Responsável"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">André Mendes</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-primary dark:hover:text-slate-200 transition-colors">
                    <MoreVertical className="size-5" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-primary/10 text-primary dark:text-slate-100 flex items-center justify-center font-bold text-xs">
                      GL
                    </div>
                    <span className="text-sm font-semibold">Global Logística</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold">
                    Negociação
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">R$ 120.500,00</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGhhrQNyEy_b2qD9DxzYLsDVgP9CJ6C2uU9UUcJXJnf_dDJ5c1nukwf4PNlYIpiVlZ1g6rMyrpV59ACKIg_0ZUYN90KNrvLQ0q489P9yii_jj7fI4peYMO-bjf1G4mAT_rQI3VRcEnbk3S0J_aCtzMv9ukGnQp1d4hYf0EdODCVRzCrWXz4NQAUJGUyccN47MpxBRfIBRyTrNwyPuAZ35F_nKZvi3KiKBcNcT08831lJtHfgUv9m5THHgTMI8iagfXBgUxHsYldb8"
                        alt="Avatar Responsável"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Paula Castro</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-primary dark:hover:text-slate-200 transition-colors">
                    <MoreVertical className="size-5" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-primary/10 text-primary dark:text-slate-100 flex items-center justify-center font-bold text-xs">
                      MC
                    </div>
                    <span className="text-sm font-semibold">Mega Corp</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                    Fechado
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">R$ 380.000,00</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuByxYgGU1ry73NhXNx-zwMzZ-9HYjhT98hNcSlBVYFvNmG1ULEzae_46b1oKSpc6H8vQPvwjqGzDWa6fQAaBPIz6OAMd015Vu5gEr3FEvnKjTomjN2ck-_7-2AEEZuPujB_5EmoAn1ojjCeKE91-gBzpPpTE6ekD5BaM5eeG6aBpnKC4Ge6EE6wN6eqaLLBUZ3cmM730NdjM3wzEVpROVAIv2rxojfnpBKlKjz4dKz3wXiFfbxusT1hm_Bv_LKSvntxGS22-eAY3sE"
                        alt="Avatar Responsável"
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Carlos Silva</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-primary dark:hover:text-slate-200 transition-colors">
                    <MoreVertical className="size-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
