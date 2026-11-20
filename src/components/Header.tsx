import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FourPointStar } from './BotanicalMotifs';
import { VERIFIED_BUSINESS, buildWhatsAppUrl } from '../constants/business';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Consultorio' },
    { href: '#podologia', label: 'Podología' },
    { href: '#turnos', label: 'Turnos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFF5EC]/95 backdrop-blur-sm border-b border-[#681B36]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#inicio"
          className="inline-flex items-center gap-2.5 font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#422B30] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#681B36]"
        >
          <FourPointStar className="w-4 h-4 text-[#D9828B] shrink-0" />
          <span>{VERIFIED_BUSINESS.name}</span>
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4E54]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-[#681B36] hover:border-[#D9828B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#681B36]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#681B36] text-white text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#52142A] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#681B36]"
          >
            Pedir turno
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#422B30] hover:bg-[#F4D5D2]/50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#FFF5EC] border-t border-[#681B36]/10 px-5 py-5 space-y-3">
          <nav aria-label="Menú móvil" className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl text-base font-medium text-[#422B30] hover:bg-[#F4D5D2]/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full py-3 px-5 rounded-full bg-[#681B36] text-white text-sm font-medium hover:bg-[#52142A] transition-colors"
          >
            Pedir turno por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
