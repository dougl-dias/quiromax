import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Benefits } from "@/components/benefits"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Appointment } from "@/components/appointment"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Testimonials />
      <Appointment />
      <Contact />
      <Footer />
    </main>
  )
}
