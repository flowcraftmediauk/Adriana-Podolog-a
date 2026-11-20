import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarClock, MapPin, Phone, Share2 } from 'lucide-react';
import { Header } from './components/Header';
import { PhotoSlotFrame } from './components/PhotoSlotFrame';
import { TurnosSection } from './components/TurnosSection';
import {
  FourPointStar,
  WaveTransition,
  WhatsAppIcon,
} from './components/BotanicalMotifs';
import { VERIFIED_BUSINESS, buildWhatsAppUrl } from './constants/business';

export default function App() {
  const whatsappHref = buildWhatsAppUrl();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5EC] text-[#422B30]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="relative bg-[#FFF5EC] pt-10 pb-14 sm:pt-14 sm:pb-20 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 space-y-6"
              >
                <p className="text-xs sm:text-sm font-medium text-[#681B36] tracking-wide">
                  {VERIFIED_BUSINESS.specialtyTagline} · {VERIFIED_BUSINESS.city}
                </p>

                <h1 className="font-serif text-[clamp(2.25rem,4.2vw,3.65rem)] font-semibold text-[#422B30] leading-[1.12] tracking-tight text-balance">
                  Cuidado clínico profesional para el bienestar de tus pies
                </h1>

                <p className="text-base sm:text-lg text-[#6B4E54] leading-relaxed max-w-xl">
                  <strong className="font-semibold text-[#422B30]">
                    {VERIFIED_BUSINESS.name}
                  </strong>{' '}
                  brinda atención dedicada en{' '}
                  <span className="lowercase">{VERIFIED_BUSINESS.specialtyTagline}</span>{' '}
                  en {VERIFIED_BUSINESS.city}. Consultá disponibilidad y
                  coordiná tu turno de manera directa.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D9828B] text-white text-sm font-semibold shadow-sm hover:bg-[#681B36] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#681B36]"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Consultar turno</span>
                  </a>

                  <a
                    href="#sobre-mi"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-[#681B36]/20 text-sm font-medium text-[#422B30] hover:bg-white/70 transition-colors duration-150 whitespace-nowrap"
                  >
                    <span>Conocer el consultorio</span>
                    <ArrowRight className="w-4 h-4 text-[#681B36]" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-6 lg:pl-6"
              >
                <PhotoSlotFrame
                  variant="hero"
                  title="Fotografía principal del consultorio"
                  subtitle="Espacio preparado para incorporar una foto real de Adriana Podología o de su espacio de atención."
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wave Transition: Cream -> White */}
        <div className="bg-[#FFF5EC]">
          <WaveTransition fillColor="#FFFFFF" />
        </div>

        {/* ABOUT / CONSULTORIO SECTION */}
        <section id="sobre-mi" className="bg-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <PhotoSlotFrame
                  variant="about"
                  title="Imagen profesional o clínica"
                  subtitle="Espacio listo para mostrar una fotografía verificada del equipo o atención."
                />
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <p className="text-xs sm:text-sm font-medium text-[#681B36] tracking-wide">
                  Sobre nosotros · {VERIFIED_BUSINESS.city}
                </p>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#422B30] leading-tight text-balance">
                  Bienvenidos a {VERIFIED_BUSINESS.name}
                </h2>

                <p className="text-base text-[#6B4E54] leading-relaxed">
                  Un espacio enfocado en{' '}
                  <span className="font-medium text-[#422B30]">
                    {VERIFIED_BUSINESS.specialtyTagline.toLowerCase()}
                  </span>{' '}
                  para acompañar el cuidado diario de tus pies en{' '}
                  {VERIFIED_BUSINESS.city}. La coordinación de turnos se realiza
                  de forma personalizada a través de nuestro WhatsApp directo.
                </p>

                {/* 3 Organic Verified Highlight Cards (FEMINE 3-tile rhythm, zero invented numbers) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-[#D9828B] text-white rounded-tl-[28px] rounded-br-[28px] rounded-tr-xl rounded-bl-xl p-5 shadow-sm">
                    <p className="font-serif text-lg font-semibold leading-snug mb-1">
                      Podología Clínica
                    </p>
                    <p className="text-xs text-white/90">
                      Especialidad principal confirmada
                    </p>
                  </div>

                  <div className="bg-[#FFF5EC] text-[#422B30] border border-[#681B36]/10 rounded-tl-[28px] rounded-br-[28px] rounded-tr-xl rounded-bl-xl p-5">
                    <p className="font-serif text-lg font-semibold leading-snug mb-1">
                      San Miguel de Tucumán
                    </p>
                    <p className="text-xs text-[#6B4E54]">
                      Atención local en la ciudad
                    </p>
                  </div>

                  <div className="bg-[#FFF5EC] text-[#422B30] border border-[#681B36]/10 rounded-tl-[28px] rounded-br-[28px] rounded-tr-xl rounded-bl-xl p-5">
                    <p className="font-serif text-lg font-semibold leading-snug mb-1">
                      Turnos Directos
                    </p>
                    <p className="text-xs text-[#6B4E54] tabular-nums">
                      {VERIFIED_BUSINESS.whatsappDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Transition: White -> Cream */}
        <div className="bg-white">
          <WaveTransition fillColor="#FFF5EC" />
        </div>

        {/* SERVICES / PODOLOGÍA CLÍNICA SECTION */}
        <section id="podologia" className="bg-[#FFF5EC] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center justify-center gap-2 text-xs font-medium text-[#681B36] mb-3">
                <FourPointStar className="w-3.5 h-3.5 text-[#D9828B]" />
                <span>Atención Podológica</span>
                <FourPointStar className="w-3.5 h-3.5 text-[#D9828B]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#422B30] leading-tight text-balance mb-4">
                {VERIFIED_BUSINESS.specialtyTagline}
              </h2>
              <p className="text-base text-[#6B4E54] leading-relaxed">
                Cada tratamiento y detalle de atención se publica únicamente con
                información confirmada por {VERIFIED_BUSINESS.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Verified */}
              <div className="bg-white rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl p-6 border border-[#681B36]/10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#D9828B] mb-2">
                    01 · Especialidad
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#422B30] mb-2.5">
                    Podología Clínica
                  </h3>
                  <p className="text-sm text-[#6B4E54] leading-relaxed">
                    Enfoque integral en podología clínica para el cuidado y
                    seguimiento profesional.
                  </p>
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#681B36] hover:text-[#D9828B] transition-colors"
                >
                  <span>Consultar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 2: Featured Dusty Rose Card (matching FEMINE screenshot) */}
              <div className="bg-[#D9828B] text-white rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl p-6 shadow-[0_18px_38px_-18px_rgba(104,27,54,0.4)] flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-white/85 mb-2">
                    02 · Turnos
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-white mb-2.5">
                    Atención Programada
                  </h3>
                  <p className="text-sm text-white/95 leading-relaxed">
                    Consultá disponibilidad y coordiná tu horario directamente por
                    WhatsApp al {VERIFIED_BUSINESS.whatsappDisplay}.
                  </p>
                </div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
                >
                  <span>Pedir turno ahora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 3: Ready for Client-Confirmed Services */}
              <div className="bg-white rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl p-6 border border-[#681B36]/10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#6B4E54] mb-2">
                    03 · Próximamente
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#422B30] mb-2.5">
                    Tratamientos del Consultorio
                  </h3>
                  <p className="text-sm text-[#6B4E54] leading-relaxed">
                    Espacio reservado para detallar cada prestación específica
                    confirmada por Adriana Podología.
                  </p>
                </div>
                <span className="mt-6 text-xs text-[#6B4E54]">
                  Información por confirmar
                </span>
              </div>

              {/* Card 4: Ready for Real Clinic Photos */}
              <div className="bg-white rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl p-6 border border-[#681B36]/10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#6B4E54] mb-2">
                    04 · Próximamente
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#422B30] mb-2.5">
                    Horarios y Dirección
                  </h3>
                  <p className="text-sm text-[#6B4E54] leading-relaxed">
                    Espacio preparado para mostrar la dirección exacta y los días
                    de atención en {VERIFIED_BUSINESS.city}.
                  </p>
                </div>
                <span className="mt-6 text-xs text-[#6B4E54]">
                  Información por confirmar
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Transition: Cream -> White */}
        <div className="bg-[#FFF5EC]">
          <WaveTransition fillColor="#FFFFFF" />
        </div>

        {/* TURNOS & FIREBASE AUTH / FIRESTORE SECTION */}
        <TurnosSection />

        {/* Wave Transition: White -> Cream */}
        <div className="bg-white">
          <WaveTransition fillColor="#FFF5EC" />
        </div>

        {/* CONTACT SECTION */}
        <section id="contacto" className="bg-[#FFF5EC] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="bg-white rounded-tl-[64px] rounded-br-[64px] rounded-tr-3xl rounded-bl-3xl p-8 sm:p-12 border border-[#681B36]/10 shadow-[0_20px_50px_-30px_rgba(66,43,48,0.2)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-xs sm:text-sm font-medium text-[#681B36] tracking-wide">
                    Contacto Directo
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#422B30] leading-tight text-balance">
                    ¿Querés consultar un turno o hacer una pregunta?
                  </h2>
                  <p className="text-base text-[#6B4E54] leading-relaxed">
                    Escribinos por WhatsApp para coordinar tu consulta en{' '}
                    {VERIFIED_BUSINESS.city} o visitá la página oficial en
                    Facebook.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] text-white text-sm font-semibold shadow-sm hover:bg-[#1EBE5D] transition-colors duration-150 whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Escribir por WhatsApp</span>
                    </a>

                    <a
                      href={VERIFIED_BUSINESS.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#681B36]/20 text-sm font-medium text-[#422B30] hover:bg-[#FFF5EC] transition-colors duration-150 whitespace-nowrap"
                    >
                      <Share2 className="w-4 h-4 text-[#681B36]" />
                      <span>Ver página en Facebook</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-[#681B36]/10 pt-6 lg:pt-0 lg:pl-10">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#F4D5D2]/60 flex items-center justify-center text-[#681B36] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#6B4E54]">
                        WhatsApp para turnos
                      </p>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-[#422B30] hover:text-[#681B36] tabular-nums"
                      >
                        {VERIFIED_BUSINESS.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#F4D5D2]/60 flex items-center justify-center text-[#681B36] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#6B4E54]">
                        Ubicación verificada
                      </p>
                      <p className="text-base font-semibold text-[#422B30]">
                        {VERIFIED_BUSINESS.city}, {VERIFIED_BUSINESS.country}
                      </p>
                      <p className="text-xs text-[#6B4E54] mt-0.5">
                        Dirección exacta del consultorio a confirmar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#F4D5D2]/60 flex items-center justify-center text-[#681B36] shrink-0">
                      <CalendarClock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#6B4E54]">
                        Horarios de atención
                      </p>
                      <p className="text-sm text-[#422B30]">
                        A confirmar · Turnos con consulta previa por WhatsApp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="bg-[#FFF5EC] border-t border-[#681B36]/10 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B4E54]">
          <div className="flex items-center gap-2">
            <FourPointStar className="w-3.5 h-3.5 text-[#D9828B]" />
            <span className="font-serif text-sm font-semibold text-[#422B30]">
              {VERIFIED_BUSINESS.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{VERIFIED_BUSINESS.city}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#inicio" className="hover:text-[#681B36] transition-colors">
              Inicio
            </a>
            <a href="#podologia" className="hover:text-[#681B36] transition-colors">
              Podología
            </a>
            <a href="#turnos" className="hover:text-[#681B36] transition-colors">
              Turnos
            </a>
            <a
              href={VERIFIED_BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#681B36] transition-colors"
            >
              Facebook
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#681B36] transition-colors tabular-nums"
            >
              {VERIFIED_BUSINESS.whatsappDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING OFFICIAL WHATSAPP BUTTON (Bottom-Right, Desktop & Mobile) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp a Adriana Podología"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-13 px-4 sm:px-5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_10px_28px_-6px_rgba(37,211,102,0.55)] hover:bg-[#1EBE5D] active:scale-[0.98] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsAppIcon className="w-6 h-6 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
      </a>
    </div>
  );
}
