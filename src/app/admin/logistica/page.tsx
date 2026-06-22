"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { 
  Map, Truck, Package, Phone, CheckCircle2, Search, MapPin
} from "lucide-react"

const deliveries = [
  { id: "ENV-042", orderId: "1042", client: "Juan Pérez", address: "Av. Cabildo 2341, CABA", status: "in_transit", driver: "Carlos M.", eta: "14:30" },
  { id: "ENV-043", orderId: "1039", client: "Arq. Estudio", address: "Libertador 1500, Vicente López", status: "in_transit", driver: "Carlos M.", eta: "16:00" },
  { id: "ENV-044", orderId: "1038", client: "Carlos Ruiz", address: "Belgrano 452, San Isidro", status: "delivered", driver: "Miguel R.", eta: "Entregado 10:15" },
  { id: "ENV-045", orderId: "1043", client: "Constructora Norte", address: "Obra Pilar Km 45", status: "pending", driver: "Sin asignar", eta: "Mañana" },
]

export default function LogisticaPage() {
  return (
    <FadeIn className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Logística y Repartos</h1>
          <p className="text-muted-foreground mt-1">Gestión de envíos, asignación de fletes y seguimiento.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-cyan px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
          <Truck className="mr-2 h-4 w-4" />
          Nuevo Hoja de Ruta
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        
        {/* Listado de Envíos */}
        <div className="bg-card border border-border/50 rounded-2xl shadow-sm flex flex-col lg:col-span-1 overflow-hidden">
          <div className="p-4 border-b border-border/50 bg-muted/20">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar envío o dirección..."
                className="h-10 w-full rounded-lg border border-border/50 bg-background pl-10 pr-4 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {deliveries.map(envio => (
              <div key={envio.id} className="border border-border/50 rounded-xl p-4 hover:border-cyan/50 transition-colors bg-background">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm">{envio.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    envio.status === 'in_transit' ? 'bg-purple-500/10 text-purple-500' :
                    envio.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {envio.status === 'in_transit' ? 'En Camino' :
                     envio.status === 'delivered' ? 'Entregado' : 'Pendiente'}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium">{envio.client}</p>
                  <div className="flex items-start gap-1.5 mt-1 text-muted-foreground text-xs">
                    <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{envio.address}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Truck className="h-3.5 w-3.5 text-cyan" /> {envio.driver}
                  </div>
                  <span className={envio.status === 'in_transit' ? 'text-purple-500 font-semibold' : 'text-muted-foreground'}>
                    {envio.eta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa Interactivo (Mockup) */}
        <div className="bg-card border border-border/50 rounded-2xl shadow-sm lg:col-span-2 overflow-hidden flex flex-col relative">
          <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-lg">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Truck className="h-4 w-4 text-cyan" /> Unidades en calle: 2
            </h3>
          </div>
          
          <div className="flex-1 bg-muted/30 flex items-center justify-center relative overflow-hidden">
            {/* Pseudo-map using a subtle pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {/* Map Pins Mockup */}
            <div className="absolute top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
              <div className="bg-purple-500 text-white p-2 rounded-full shadow-xl relative z-10 animate-bounce">
                <Truck className="h-5 w-5" />
              </div>
              <div className="bg-background border border-border px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Carlos M. - Siguiente: Av. Cabildo
              </div>
            </div>
            
            <div className="absolute top-[60%] left-[65%] flex flex-col items-center group cursor-pointer">
              <div className="bg-amber-500 text-white p-2 rounded-full shadow-xl relative z-10">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="bg-background border border-border px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Destino: Obra Pilar
              </div>
            </div>

            <div className="text-center z-0">
              <Map className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Mapa de integración en tiempo real<br/>(Requiere API Key de Google Maps)</p>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  )
}
