import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { VERIFIED_BUSINESS, buildWhatsAppUrl } from '../constants/business';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Cómo solicito un turno en Adriana Podología?',
    answer: `Podés escribir directamente por WhatsApp al ${VERIFIED_BUSINESS.whatsappDisplay} para consultar días disponibles, o dejar tu solicitud guardada desde la sección Turnos con tu cuenta de Google.`,
  },
  {
    question: '¿Dónde se realiza la atención?',
    answer: `La atención se brinda en ${VERIFIED_BUSINESS.city}, ${VERIFIED_BUSINESS.country}. La dirección exacta del consultorio se comparte al momento de coordinar tu turno.`,
  },
  {
    question: '¿Qué tipo de consultas atiende?',
    answer: `${VERIFIED_BUSINESS.name} se dedica a ${VERIFIED_BUSINESS.specialtyTagline.toLowerCase()}. Podés contarnos tu consulta puntual por WhatsApp para recibir orientación personalizada.`,
  },
  {
    question: '¿Cómo consulto horarios disponibles y aranceles?',
    answer: `Tanto los horarios de atención como los valores vigentes se informan de forma directa por WhatsApp al ${VERIFIED_BUSINESS.whatsappDisplay}.`,
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#FFF5EC] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs font-medium tracking-wide text-[#681B36] mb-2">
            Preguntas Frecuentes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#422B30] text-balance">
            Todo lo que necesitás saber antes de tu consulta
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-white rounded-2xl border border-[#681B36]/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FFF5EC]/50 transition-colors"
                >
                  <span className="font-serif text-lg font-medium text-[#422B30]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#681B36] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-[#6B4E54] leading-relaxed border-t border-[#681B36]/5">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#681B36] text-white text-sm font-medium hover:bg-[#52142A] transition-colors"
          >
            Hacer otra consulta por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
