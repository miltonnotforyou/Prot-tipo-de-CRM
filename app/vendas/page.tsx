"use client";

import {
  TrendingUp,
  DollarSign,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Image from "next/image";

const revenueData = [
  { name: "Jan", atual: 45000, meta: 40000 },
  { name: "Fev", atual: 52000, meta: 45000 },
  { name: "Mar", atual: 48000, meta: 50000 },
  { name: "Abr", atual: 61000, meta: 55000 },
  { name: "Mai", atual: 59000, meta: 60000 },
  { name: "Jun", atual: 75000, meta: 65000 },
];

const sourceData = [
  { name: "Inbound", value: 45 },
  { name: "Outbound", value: 30 },
  { name: "Indicação", value: 15 },
  { name: "Parceiros", value: 10 },
];

const recentSales = [
  {
    id: "1",
    client: "Inovação Tech S.A.",
    value: "R$ 45.000,00",
    date: "Hoje, 14:30",
    rep: "Alice Santos",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVQc3CEWDrJbr3LINYYsyqn2dyU9rom-xWR7JsFJ3eG7KEe0f2esUaAwenOB593r_HOAf37-WKXDDQ_Y5jB9hAqpOAaP-vHKDlmHRBwrTsYc_OHp3FdoIiG3s5GchkINx0X9so-eIgrsMidvMGMF-JgyXtDcrSvsuUha8LvRqm0Acnw1RBLW63ADSIYlCmetwCMWb-fdt_vGwfz_39mCYuZKBNDLIX44YMrR30uIuIVNPO790JSDmMQcxaGLfvYMTISlQ8C6hZQBk",
  },
  {
    id: "2",
    client: "EduTech Corp",
    value: "R$ 120.000,00",
    date: "Ontem",
    rep: "Bruno Oliveira",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKE_aqe4Ent9waTn_7GHwPFP1ckgMKNXfaYmzCtebU7w28YmIeQ_eX2GsHeVj0ye_0w-agOAOT806bXXcPK_V_Oih0c6PwDXhlGG4X8_Xs5M3B7XaEP3Ll-SmX8xQl1ZQCw9RQRgUilquKpqTtNA1aHQ7CrmuHNhPgaWsgjubjmhbE9b357Mwp06_DKzxOjvOzHsh0cyHIpZ1NhFuUzicRxfmAlK8qfWpC4_klce1n8Ig2m9VRviPEDeudBD3dvL8K1Ij_I1lkPVw",
  },
  {
    id: "3",
    client: "Retail Co.",
    value: "R$ 5.750,00",
    date: "12 Mar 2024",
    rep: "Carla Mendes",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlW-nYoWXvaJJHws6ApAK0HKPzSz8Sdt7u9fbU2IO2TzLFiAnQ2QfsLNN_sootu1go8vxEIEWI9ybkdVB2geW9YumeC11j81T8LRWJZbx6EmskPQwjCNpTuZoYLORZlvgXn4-1Vh5-vX0m9MPOnjc_ZrJTFISwbOu4LVsclvOw4VFUe90uBu3To4mBnPbf65A83XWuYM64pC5H2tiOP9VBqjRi4cRfKTgZjemWYHDHQ-qzUTxCuhFxaFKb8ZwSWHMZnz21uCMbSyk",
  },
  {
    id: "4",
    client: "Global Logistics",
    value: "R$ 32.400,00",
    date: "10 Mar 2024",
    rep: "Diego Costa",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkfifbF7bwoKPU8z6f-6PNBOyyPV7HIlym4b0OT68IQX_ys4xBf3mkljSaz_0Zudgmhz3rIMf6wP58d5FRhDqA2tiPKLGq9gA8d1Otm_BUU7WlB708RjuB0DqWcE-9IaAQx308h2VNXw339LSXC5HOHESt5PH50ZY7_ItnZOHnUVBQ7239i4O-5lEz-CdvXClVk5NSAK3TSAtGRrxWkXF6j53XuZK0ZiwBYCMjy2XlFfeWsME8G4AJEHXAmg9wDcwGSboHuEVelHg",
  },
];

export default function Vendas() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Desempenho de Vendas
            </h1>
            <p className="text-slate-500 text-base">
              Acompanhe suas metas, receitas e performance da equipe.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              <Calendar className="size-4" />
              Este Semestre
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
              <Download className="size-4" />
              Exportar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-emerald-600 dark:text-emerald-400 size-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight className="size-4" />
              +12.5%
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Receita Total
          </p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            R$ 340.000
          </h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Target className="text-blue-600 dark:text-blue-400 size-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight className="size-4" />
              +5.2%
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Negócios Ganhos
          </p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            48
          </h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600 dark:text-purple-400 size-6" />
            </div>
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-bold bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-md">
              <ArrowDownRight className="size-4" />
              -2.1%
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Ticket Médio
          </p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            R$ 7.083
          </h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Award className="text-amber-600 dark:text-amber-400 size-6" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <ArrowUpRight className="size-4" />
              +8.4%
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Taxa de Conversão
          </p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">
            24.8%
          </h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Receita vs Meta
              </h3>
              <p className="text-sm text-slate-500">
                Acompanhamento mensal de faturamento
              </p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number | undefined) => [value ? `R$ ${value.toLocaleString('pt-BR')}` : 'R$ 0', '']}
                />
                <Bar dataKey="atual" name="Receita Atual" fill="#455768" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="meta" name="Meta" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Chart (Simulated with Line for variety or simple list) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Origem das Vendas
            </h3>
            <p className="text-sm text-slate-500">
              Distribuição por canal
            </p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            {sourceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Últimas Vendas Fechadas
            </h3>
            <p className="text-sm text-slate-500">
              Negócios ganhos recentemente pela equipe.
            </p>
          </div>
          <button className="text-sm font-semibold text-primary hover:underline">
            Ver todas
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Cliente / Negócio
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Data de Fechamento
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Vendedor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {sale.client}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {sale.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {sale.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/5 relative">
                        <Image
                          src={sale.avatar}
                          alt={sale.rep}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {sale.rep}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
