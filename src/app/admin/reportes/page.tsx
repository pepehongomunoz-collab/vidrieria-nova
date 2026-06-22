"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { 
  BarChart3, TrendingUp, DollarSign, Target, Calendar
} from "lucide-react"

export default function ReportesPage() {
  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground mt-1">Análisis de ventas, conversión y rentabilidad.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border/50 rounded-lg p-1 shadow-sm">
          <button className="px-3 py-1.5 text-sm font-medium bg-background rounded-md shadow-sm">Este Mes</button>
          <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">Trimestre</button>
          <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">Año</button>
          <div className="h-4 w-px bg-border/50 mx-1" />
          <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Personalizado
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-cyan/20 to-blue-500/5 border border-cyan/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-cyan font-semibold mb-4">
            <DollarSign className="h-5 w-5" /> Facturación
          </div>
          <p className="text-3xl font-bold font-heading mb-1">$ 4.250.000</p>
          <p className="text-sm text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> +15.3% vs mes anterior
          </p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-4">
            <Target className="h-5 w-5" /> Ticket Promedio
          </div>
          <p className="text-3xl font-bold font-heading mb-1">$ 185.000</p>
          <p className="text-sm text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> +2.1% vs mes anterior
          </p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-4">
            <BarChart3 className="h-5 w-5" /> Conversión
          </div>
          <p className="text-3xl font-bold font-heading mb-1">3.2%</p>
          <p className="text-sm text-red-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4 rotate-180" /> -0.5% vs mes anterior
          </p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-4">
            <TrendingUp className="h-5 w-5" /> Margen Bruto
          </div>
          <p className="text-3xl font-bold font-heading mb-1">42.5%</p>
          <p className="text-sm text-emerald-500 font-medium flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> +5.0% vs mes anterior
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-96 flex flex-col items-center justify-center text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="font-semibold">Gráfico de Ventas Mensuales</p>
          <p className="text-sm text-muted-foreground mt-1">Requiere integración con biblioteca de gráficos (Recharts / Chart.js)</p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm h-96 flex flex-col items-center justify-center text-center">
          <Target className="h-16 w-16 text-muted-foreground/20 mb-4" />
          <p className="font-semibold">Ventas por Categoría</p>
          <p className="text-sm text-muted-foreground mt-1">Requiere integración con biblioteca de gráficos (Recharts / Chart.js)</p>
        </div>
      </div>
    </FadeIn>
  )
}
