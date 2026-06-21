import { HeroSection } from "@/components/sections/hero-section"
import { ProductsShowcase } from "@/components/sections/products-showcase"
import { StatsSection } from "@/components/sections/stats-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ProcessSection } from "@/components/sections/process-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BrandsSection } from "@/components/sections/brands-section"
import { CTASection } from "@/components/sections/cta-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ProductsShowcase />
        <BenefitsSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <BrandsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
