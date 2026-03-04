"use client";

import {
  Plus,
  Calendar,
  Users,
  Filter,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function Pipeline() {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Toolbar & Title */}
      <div className="flex flex-wrap justify-between items-end gap-3 p-4 md:p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Pipeline de Vendas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Gerencie suas oportunidades de negócio em tempo real.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-lg h-11 px-5 bg-primary text-white text-sm font-bold shadow-lg hover:bg-primary/90 transition-colors">
            <Plus className="size-5" />
            <span>Novo Negócio</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 px-4 md:px-8 pb-6 overflow-x-auto">
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 shadow-sm">
          <Calendar className="text-slate-500 size-4" />
          <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">
            Período: Este Mês
          </p>
        </button>
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 shadow-sm">
          <Users className="text-slate-500 size-4" />
          <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">
            Membro: Todos
          </p>
        </button>
        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 shadow-sm">
          <Filter className="text-slate-500 size-4" />
          <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">
            Filtros Avançados
          </p>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex flex-1 gap-4 px-4 md:px-8 pb-8 overflow-x-auto min-h-[600px]">
        {/* Column: Prospecção */}
        <div className="flex flex-col min-w-[300px] w-[300px] gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-slate-400"></span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                Prospecção
              </h3>
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-xs font-bold">
                3
              </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer size-5" />
          </div>
          <div className="flex flex-col gap-3">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                  Software ERP v2
                </h4>
                <ExternalLink className="text-slate-300 size-4" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Indústrias Alfa S.A.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 45.000,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYZP0iQ0GToKku_i5qc7z3FUWycNF_BcaiILiS0qjRrdG58eQMI1fCzTFCrm6ny-qy5QUWD7ffPcgDmg-_TVF0d1Y4bVv98wx0VSK_CbCuazkwKbq0m1kgIu4tbmBRjDbVIQnxZ0V-GaQS4RIcDIBcl4iuKg4CNYqdiRYxiaPT5zU4ivGUm0zCg13XL3Yp811XYAHR63ov4j_MNggBFs0EOLwCDJN_NX51bybm_fRdSV71Z_uLOeDGln4gc-ot1jU1k2MfJiaeRlA"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                Consultoria Cloud
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Tech Solutions
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 12.500,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrfPegbteF92W0jTiU6K1sFOa1DImOBCzQ8b0GXZAJ5KxCZlDWyaxje9vVxY456LwsjpQ8umsgZgnvr1Dnm0TmT8obk7DsNzTByb-UX2lrnIM-NAJ-JVIAfkvia5ERsJF6u_GnXD-AjxXQjJTy4u7loj9wfFcJdmyDIrcOfu9yv-HpPol_DQ-BguuYwNISBgCt5dr_0ex0A-KJtLJIC6dRO6O0fZ-9w93e4wXRRf3rsZx6WerEQd1np0HQkonKkatCVO_r8y9e02g"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Qualificação */}
        <div className="flex flex-col min-w-[300px] w-[300px] gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-400"></span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                Qualificação
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-bold">
                2
              </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer size-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group border-l-4 border-l-blue-400">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                Segurança de Dados
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Banco Regional
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 88.000,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhfXMDCmHRZxGAcW9G7IFGv6hZZWxbs5PhzOTEvk0ozmeFy-QTiFiPb2II9SKwvaGCv-4JEYhoMH1KtWkz-LCHHyh4MWFH4UKdz1TfXo9t8LDXdBhhcRXZTUZQqXYdyWxlqaG6nTc2WM52oUcEBcEvDwTu1t_iLKFln-QvpA42-E0qPLyLa8YrsFTfGaJNJ93tpVFC-3NCmciYi3yOSs7f4c3Qd1SZQ71feKINXIkyjVBbEjQ4zBz6Cqqb8sGiRXczNogk-Ra9goI"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Proposta */}
        <div className="flex flex-col min-w-[300px] w-[300px] gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-400"></span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                Proposta
              </h3>
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded text-xs font-bold">
                4
              </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer size-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                Infraestrutura Serverless
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Global Logistics
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 32.400,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB04JFLHDG3WShOwqpECiCABi0OusUS-FalzYqmsSMDHSnZocN6P334jffCtvHFuAJvsrN5JYU6ofeSD1n7SfUTdnjUsrqTSXE1j0SCI2M2jttO3ZBbImBpJyw7VaPILf99y131z4qGweVlutdnuDpfvvjra3uHuqDeg1LtjMnk8cwbRG0TLYpNgJyu7bT-Cz1NHJUtzd83Xrmf4wQpPu7IQTSvBxNjEWQwFZGY-JJIX8G3ttFj7t0redUSmkqFyfYqVn42pO5iCd8"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                Migração Database
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Startup Unicorn
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 15.000,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKjzFSdwiHTNQpiJHt4EHyAokJHA8tVhQo0uZCGwsiYtMN0qCbVdVNU4qpL1P1ktqj_RrHj7p8aHcUqsqy9zEpoh9zc7l24foyVV-04_booVW_YxpY0lWcDKL0FnAyjn4N0yqYMui1aNTFgNyWJEktyC7U_sTR2K7MLE1Y_XAqkyJyGm_RzL9ux-p7VzFrxAIpiwXeIS_-P8CWUAEqOVPpaYub1S82lYdyb2WckjcRhnOVQPw5eofUoHUDfz2J2O9pBFEgv-GOHOw"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Negociação */}
        <div className="flex flex-col min-w-[300px] w-[300px] gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-purple-400"></span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                Negociação
              </h3>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded text-xs font-bold">
                1
              </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer size-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group border-l-4 border-l-purple-400">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                Licenciamento Anual
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                EduTech Corp
              </p>
              <div className="flex justify-between items-center">
                <p className="text-primary dark:text-slate-300 font-bold text-sm">R$ 120.000,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU_Hlk0ewtEpIxkl6jxzBlH8qKcCYlrE59c8QR2UWk6Z48E8H38f4PkN8wDWFJP9viCIOa3UxZnTRMmopvBwWgFIXdJ04fQDbZJOpU-NDB2F-6WE32S1U3-_3iN2Gi5ISPMyPgG32DwdVMjm7jcQv_bdaRwDHYwYRX4mgqkx9tuRwl8kaF1jXudEqRQiy9eNot-NyOpc8TJmnCmPqgmlGU9MgDzDhuTiJOAmiMkLehZLbOoZau83juQbeI7EY-dpgvm91wwdEs6KU"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column: Fechamento */}
        <div className="flex flex-col min-w-[300px] w-[300px] gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400"></span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                Fechamento
              </h3>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-xs font-bold">
                2
              </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer size-5" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                  Setup Inicial TI
                </h4>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
                Retail Co.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">R$ 5.750,00</p>
                <div className="size-6 rounded-full border border-white dark:border-slate-800 shadow-sm relative overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfJFoj52rif6xcERA5FkT7LSsZ-EIxLg2XJ91a9oWGBLtskiiT7kDC_5H47z8RunwdIkd6AZ-7AwC0nNE_h4XxyADatKGgbIDPo3VGZfyhLdNOLHc8O8BkA57srn8dHaz_kduayJ39GGg3wOMaQXzN32SmBsotSiMQPORjWLMaBRZNjTXcpLle26eRefKT73lhJMCyYy5W0eJAMalgfJMgjD9EWqcuLXXEmde0U0-1t2_bJWTIYzVHR2fBdjUvFI9wo-hjn-Qi51w"
                    alt="Owner"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
