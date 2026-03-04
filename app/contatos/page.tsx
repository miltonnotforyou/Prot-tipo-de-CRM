"use client";

import { useState } from "react";
import {
  ChevronDown,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  CheckCircle2,
  Clock,
  Plus,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import Image from "next/image";

type ContactStatus = "Ativo" | "Prospecção" | "Aguardando" | "Inativo";

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ContactStatus;
  tags: string[];
  lastContact: string;
  avatarUrl: string;
};

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Santos",
    email: "alice.santos@exemplo.com.br",
    company: "Inovação Tech S.A.",
    status: "Ativo",
    tags: ["VIP", "SaaS"],
    lastContact: "Há 2 dias",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVQc3CEWDrJbr3LINYYsyqn2dyU9rom-xWR7JsFJ3eG7KEe0f2esUaAwenOB593r_HOAf37-WKXDDQ_Y5jB9hAqpOAaP-vHKDlmHRBwrTsYc_OHp3FdoIiG3s5GchkINx0X9so-eIgrsMidvMGMF-JgyXtDcrSvsuUha8LvRqm0Acnw1RBLW63ADSIYlCmetwCMWb-fdt_vGwfz_39mCYuZKBNDLIX44YMrR30uIuIVNPO790JSDmMQcxaGLfvYMTISlQ8C6hZQBk",
  },
  {
    id: "2",
    name: "Bruno Oliveira",
    email: "bruno.o@logistica.com",
    company: "Global Logistics",
    status: "Prospecção",
    tags: ["Transporte"],
    lastContact: "Há 5 horas",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKE_aqe4Ent9waTn_7GHwPFP1ckgMKNXfaYmzCtebU7w28YmIeQ_eX2GsHeVj0ye_0w-agOAOT806bXXcPK_V_Oih0c6PwDXhlGG4X8_Xs5M3B7XaEP3Ll-SmX8xQl1ZQCw9RQRgUilquKpqTtNA1aHQ7CrmuHNhPgaWsgjubjmhbE9b357Mwp06_DKzxOjvOzHsh0cyHIpZ1NhFuUzicRxfmAlK8qfWpC4_klce1n8Ig2m9VRviPEDeudBD3dvL8K1Ij_I1lkPVw",
  },
  {
    id: "3",
    name: "Carla Mendes",
    email: "carla@marketing.com.br",
    company: "Creative Agency",
    status: "Aguardando",
    tags: ["Design", "VIP"],
    lastContact: "Ontem",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlW-nYoWXvaJJHws6ApAK0HKPzSz8Sdt7u9fbU2IO2TzLFiAnQ2QfsLNN_sootu1go8vxEIEWI9ybkdVB2geW9YumeC11j81T8LRWJZbx6EmskPQwjCNpTuZoYLORZlvgXn4-1Vh5-vX0m9MPOnjc_ZrJTFISwbOu4LVsclvOw4VFUe90uBu3To4mBnPbf65A83XWuYM64pC5H2tiOP9VBqjRi4cRfKTgZjemWYHDHQ-qzUTxCuhFxaFKb8ZwSWHMZnz21uCMbSyk",
  },
  {
    id: "4",
    name: "Diego Costa",
    email: "diego.c@construtora.com",
    company: "ConstruBem S.A.",
    status: "Ativo",
    tags: ["Imobiliário"],
    lastContact: "Há 1 semana",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkfifbF7bwoKPU8z6f-6PNBOyyPV7HIlym4b0OT68IQX_ys4xBf3mkljSaz_0Zudgmhz3rIMf6wP58d5FRhDqA2tiPKLGq9gA8d1Otm_BUU7WlB708RjuB0DqWcE-9IaAQx308h2VNXw339LSXC5HOHESt5PH50ZY7_ItnZOHnUVBQ7239i4O-5lEz-CdvXClVk5NSAK3TSAtGRrxWkXF6j53XuZK0ZiwBYCMjy2XlFfeWsME8G4AJEHXAmg9wDcwGSboHuEVelHg",
  },
];

export default function Contatos() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "Ativo" as ContactStatus,
    tags: "",
  });

  const handleOpenModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        name: contact.name,
        email: contact.email,
        company: contact.company,
        status: contact.status,
        tags: contact.tags.join(", "),
      });
    } else {
      setEditingContact(null);
      setFormData({
        name: "",
        email: "",
        company: "",
        status: "Ativo",
        tags: "",
      });
    }
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? {
                ...c,
                name: formData.name,
                email: formData.email,
                company: formData.company,
                status: formData.status,
                tags: newTags,
              }
            : c
        )
      );
    } else {
      const newContact: Contact = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        company: formData.company,
        status: formData.status,
        tags: newTags,
        lastContact: "Agora",
        avatarUrl: `https://picsum.photos/seed/${formData.name}/150/150`,
      };
      setContacts([newContact, ...contacts]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      setContacts(contacts.filter((c) => c.id !== id));
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

  const getStatusColor = (status: ContactStatus) => {
    switch (status) {
      case "Ativo":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "Prospecção":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "Aguardando":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
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
              Contatos e Empresas
            </h1>
            <p className="text-slate-500 text-base">
              Gerencie seus clientes e parceiros em um só lugar de forma eficiente.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus className="size-5" />
            Novo Contato
          </button>
        </div>

        {/* Advanced Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Status: Ativo</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Tag: VIP</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Proprietário: Todos</span>
            <ChevronDown className="text-slate-400 size-4" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-colors">
            <span className="font-medium">Data: Este Mês</span>
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
                  Contato
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Último Contato
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Nenhum contato encontrado.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
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
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/5 relative">
                          <Image
                            src={contact.avatarUrl}
                            alt={contact.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {contact.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {contact.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {contact.company}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {contact.lastContact}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => toggleMenu(contact.id)}
                        className="text-slate-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <MoreHorizontal className="size-5" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenuId === contact.id && (
                        <div className="absolute right-8 top-10 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                          <button
                            onClick={() => handleOpenModal(contact)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                          >
                            <Edit2 className="size-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(contact.id)}
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
            Mostrando <span className="font-semibold">{contacts.length > 0 ? 1 : 0}-{contacts.length}</span> de{" "}
            <span className="font-semibold">{contacts.length}</span> contatos
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
            <UserPlus className="text-primary dark:text-slate-100 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Novos este mês
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              +12
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Conversões
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              18%
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-lg flex items-center justify-center">
            <Clock className="text-amber-600 dark:text-amber-400 size-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pendente Follow-up
            </p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
              7
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
                {editingContact ? "Editar Contato" : "Novo Contato"}
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
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: João Silva"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: joao@empresa.com"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: Tech Corp"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ContactStatus })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Prospecção">Prospecção</option>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-slate-100"
                    placeholder="Ex: VIP, SaaS, Design"
                  />
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
                  {editingContact ? "Salvar Alterações" : "Criar Contato"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
