"use client"

import { FadeIn } from "@/components/motion/fade-in"
import { 
  Settings, Users, Shield, Bell, CreditCard, Store
} from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <FadeIn>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
          <p className="text-muted-foreground mt-1">Ajustes globales, roles y preferencias de la tienda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="col-span-1 flex flex-col gap-2">
          <button className="flex items-center gap-3 p-4 rounded-xl bg-cyan/10 text-cyan font-medium text-left transition-colors border border-cyan/20">
            <Store className="h-5 w-5" /> Datos de la Empresa
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors border border-transparent">
            <Users className="h-5 w-5" /> Usuarios y Equipo
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors border border-transparent">
            <Shield className="h-5 w-5" /> Roles y Permisos
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors border border-transparent">
            <CreditCard className="h-5 w-5" /> Métodos de Pago
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors border border-transparent">
            <Bell className="h-5 w-5" /> Notificaciones Automáticas
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Store className="h-5 w-5 text-cyan" /> Datos de la Empresa
          </h2>
          
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nombre de la Empresa</label>
              <input
                type="text"
                defaultValue="Vidriería Nova"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">CUIT / NIT</label>
                <input
                  type="text"
                  defaultValue="30-71234567-8"
                  className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Teléfono Comercial</label>
                <input
                  type="text"
                  defaultValue="+54 11 1234-5678"
                  className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Dirección Física (Taller)</label>
              <input
                type="text"
                defaultValue="Av. Siempre Viva 742, Buenos Aires"
                className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
              />
            </div>

            <div className="pt-4 border-t border-border/50 flex justify-end">
              <button className="rounded-xl bg-cyan px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan/90">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>

      </div>
    </FadeIn>
  )
}
