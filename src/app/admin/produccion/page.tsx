"use client"

import { useState } from "react"
import { FadeIn } from "@/components/motion/fade-in"
import { 
  Play, CheckCircle2, AlertTriangle, ScanLine, 
  Ruler, Factory, Settings2, Clock
} from "lucide-react"

const productionOrders = [
  { id: "OT-2045", client: "Juan Pérez", product: "Ventana Modena Corrediza", glass: "DVH 4/9/4", status: "pending", priority: "high", dims: "1200 x 1500 mm" },
  { id: "OT-2044", client: "Constructora Norte", product: "Puerta Templada", glass: "Templado 10mm", status: "cutting", priority: "normal", dims: "900 x 2100 mm" },
  { id: "OT-2043", client: "María Gómez", product: "Mampara Fija", glass: "Laminado 3+3", status: "assembling", priority: "normal", dims: "800 x 1900 mm" },
  { id: "OT-2042", client: "Arq. Estudio", product: "Cerramiento Plegable", glass: "DVH 5/12/5", status: "qa", priority: "high", dims: "3000 x 2200 mm" },
]

export default function ProduccionPage() {
  const [activeTab, setActiveTab] = useState('active')

  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Taller de Producción</h1>
          <p className="text-muted-foreground mt-1">Control de órdenes de trabajo, corte, armado y calidad.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
          <ScanLine className="mr-2 h-4 w-4" />
          Escanear OT (Código de Barras)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl"><Clock className="h-6 w-6 text-amber-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">OTs Pendientes</p>
            <p className="text-2xl font-bold font-heading">12</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl"><Ruler className="h-6 w-6 text-blue-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">En Corte</p>
            <p className="text-2xl font-bold font-heading">4</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl"><Factory className="h-6 w-6 text-purple-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">En Armado</p>
            <p className="text-2xl font-bold font-heading">3</p>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl"><CheckCircle2 className="h-6 w-6 text-emerald-500" /></div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Listas (Hoy)</p>
            <p className="text-2xl font-bold font-heading">8</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="border-b border-border/50 bg-muted/20 px-4 flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('active')}
            className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'active' ? 'border-cyan text-cyan' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            OTs Activas
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed' ? 'border-cyan text-cyan' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Finalizadas
          </button>
        </div>

        <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {productionOrders.map(ot => (
            <div key={ot.id} className="border border-border/50 rounded-xl p-5 hover:border-cyan/50 transition-colors bg-background flex flex-col justify-between gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">{ot.id}</span>
                    {ot.priority === 'high' && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="h-3 w-3" /> Urgente
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{ot.client}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    ot.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                    ot.status === 'cutting' ? 'bg-blue-500/10 text-blue-500' :
                    ot.status === 'assembling' ? 'bg-purple-500/10 text-purple-500' :
                    'bg-orange-500/10 text-orange-500'
                  }`}>
                    {ot.status === 'pending' ? 'Pendiente' :
                     ot.status === 'cutting' ? 'Cortando Vidrio' :
                     ot.status === 'assembling' ? 'Armado de Perfiles' : 'Control de Calidad'}
                  </span>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 text-sm grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground text-xs block">Producto</span>
                  <span className="font-medium">{ot.product}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs block">Medidas</span>
                  <span className="font-medium text-cyan">{ot.dims}</span>
                </div>
                <div className="col-span-2 mt-1">
                  <span className="text-muted-foreground text-xs block">Vidrio / Detalles</span>
                  <span className="font-medium">{ot.glass}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                {ot.status === 'pending' && (
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Ruler className="h-4 w-4" /> Iniciar Corte
                  </button>
                )}
                {ot.status === 'cutting' && (
                  <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Factory className="h-4 w-4" /> Pasar a Armado
                  </button>
                )}
                {ot.status === 'assembling' && (
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Settings2 className="h-4 w-4" /> Solicitar QA
                  </button>
                )}
                {ot.status === 'qa' && (
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle2 className="h-4 w-4" /> Marcar Listo
                  </button>
                )}
                <button className="px-3 py-2 border border-border/50 text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
