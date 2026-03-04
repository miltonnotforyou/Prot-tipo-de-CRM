"use client";

import { useState } from "react";
import {
  ChevronDown,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Building2,
  TrendingUp,
  Briefcase,
  Plus,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import Image from "next/image";

type CompanyStatus = "Cliente" | "Prospect" | "Parceiro" | "Inativo";

type Company = {
  id: string;
  name: string;
  industry: string;
  employees: string;
  revenue: string;
  status: CompanyStatus;
  lastInteraction: string;
  logoUrl: string;
};

const initialCompanies: Company[] = [
  {
    id: "1",
    name: "Inovação Tech S.A.",
    industry: "Tecnologia",
    employees: "50-200",
    revenue: "R$ 5M - 10M",
    status: "Cliente",
    lastInteraction: "Há 2 dias",
    logoUrl: "https://picsum.photos/seed/tech/150/150",
  },
  {
    id: "2",
    name: "Global Logistics",
    industry: "Transporte",
    employees: "500+",
    revenue: "R$ 50M+",
    status: "Prospect",
    lastInteraction: "Há 5 horas",
    logoUrl: "https://picsum.photos/seed/logistics/150/150",
  },
  {
    id: "3",
    name: "Creative Agency",
    industry: "Marketing",
    employees: "10-50",
    revenue: "R$ 1M - 5M",
    status: "Parceiro",
    lastInteraction: "Ontem",
    logoUrl: "https://picsum.photos/seed/agency/150/150",
  },
  {
    id: "4",
    name: "ConstruBem S.A.",
    industry: "Construção",
    employees: "200-500",
    revenue: "R$ 10M - 50M",
    status: "Cliente",
    lastInteraction: "Há 1 semana",
    logoUrl: "https://picsum.photos/seed/construction/150/150",
  },
];

export default function Empresas() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    employees: "",
    revenue: "",
    status: "Prospect" as CompanyStatus,
  });

  const handleOpenModal = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        name: company.name,
        industry: company.industry,
        employees: company.employees,
        revenue: company.revenue,
        status: company.status,
      });
    } else {
      setEditingCompany(null);
      setFormData({
        name: "",
        industry: "",
        employees: "",
        revenue: "",
        status: "Prospect",
      });
    }
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCompany) {
      setCompanies(
        companies.map((c) =>
          c.id === editingCompany.id
            ? {
                ...c,
                name: formData.name,
                industry: formData.industry,
                employees: formData.employees,
                revenue: formData.revenue,
                status: formData.status,
              }
            : c
        )
      );
    } else {
      const newCompany: Company = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        industry: formData.industry,
        employees: formData.employees,
        revenue: formData.revenue,
        status: formData.status,
        lastInteraction: "Agora",
        logoUrl: `https://picsum.photos/seed/${formData.name}/150/150`,
      };
      setCompanies([newCompany, ...companies]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta empresa?")) {
      setCompanies(companies.filter((c) => c.id !== id));
    }
    setActiveMenuId(null);
  };

  const toggleMenu = (id: string) => {
    if (activeMenuId === id) {
      setActiveMenuId(null);
    } else {
      setActiveMenuId(id);
    }
  };

  const getStatusColor = (status: CompanyStatus) => {
    switch (status) {
      case "Cliente":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "Prospect":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "Parceiro":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400";
      case "Inativo":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Filters */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Empresas
            </h1>
            <p className="text-slate-500 text-base">
              Gerencie as contas corporativas e acompanhe o crescimento do portfólio.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="size-5" />
            Nova Empresa
          </button>
        </div>

        {/* Advanced Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Status: Todos</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Setor: Todos</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Tamanho: Todos</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
          <button className="text-primary dark:text-slate-300 text-sm font-semibold hover:underline flex items-center gap-1">
            <Filter className="size-4" />
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-visible shadow-sm">
        <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent"
                  />
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Setor
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tamanho
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Faturamento
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma empresa encontrada.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary bg-transparent"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 relative">
                          <Image
                            src={company.logoUrl}
                            alt={company.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {company.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            Último contato: {company.lastInteraction}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {company.employees} func.
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {company.revenue}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                          company.status
                        )}`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => toggleMenu(company.id)}
                        className="text-slate-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <MoreHorizontal className="size-5" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenuId === company.id && (
                        <div className="absolute right-8 top-10 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                          <button
                            onClick={() => handleOpenModal(company)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                          >
                            <Edit2 className="size-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                          >
                            <Trash2 className="size-4" />
                            Excluir
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Mostrando <span className="font-semibold">{companies.length > 0 ? 1 : 0}-{companies.length}</span> de{" "}
            <span className="font-semibold">{companies.length}</span> empresas
          </span>
          <div className="flex gap-2">
            <button
              disabled
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-lg">
              1
            </button>
            <button
              disabled
              className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="text-primary dark:text-slate-100 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total de Contas
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {companies.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-emerald-600 dark:text-emerald-400 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Receita Estimada
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              R$ 2.4M
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Briefcase className="text-blue-600 dark:text-blue-400 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Novos Prospects
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {companies.filter(c => c.status === "Prospect").length}
            </p>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {editingCompany ? "Editar Empresa" : "Nova Empresa"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: Acme Corp"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Setor
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: Tecnologia, Varejo, Saúde"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Número de Funcionários
                  </label>
                  <select
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Selecione...</option>
                    <option value="1-10">1-10</option>
                    <option value="10-50">10-50</option>
                    <option value="50-200">50-200</option>
                    <option value="200-500">200-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Faturamento Estimado
                  </label>
                  <input
                    type="text"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: R$ 1M - 5M"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CompanyStatus })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Prospect">Prospect</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Parceiro">Parceiro</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:opacity-90 rounded-lg transition-opacity"
                >
                  {editingCompany ? "Salvar Alterações" : "Criar Empresa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
