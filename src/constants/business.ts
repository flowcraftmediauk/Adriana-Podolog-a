export const VERIFIED_BUSINESS = {
  name: 'Adriana Podología',
  specialtyTagline: 'Todo en podología clínica',
  city: 'San Miguel de Tucumán',
  country: 'Argentina',
  whatsappDisplay: '+54 9 381 622-2857',
  whatsappDigits: '5493816222857',
  defaultWhatsappMessage: '¡Hola! Me gustaría recibir más información sobre sus servicios.',
  facebookUrl: 'https://www.facebook.com/adrianatorrespodo/',
  facebookShareUrl: 'https://www.facebook.com/share/19zWDa5hbR/',
  adminEmail: 'flowcraftmediauk@gmail.com',
} as const;

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? VERIFIED_BUSINESS.defaultWhatsappMessage);
  return `https://wa.me/${VERIFIED_BUSINESS.whatsappDigits}?text=${text}`;
}

// Validation constants synchronized verbatim with firebase-blueprint.json
export const BLUEPRINT_LIMITS = {
  patientNameMin: 2,
  patientNameMax: 100,
  whatsappMin: 6,
  whatsappMax: 30,
  whatsappPattern: /^[0-9+\-()\s]{6,30}$/,
  noteMin: 3,
  noteMax: 500,
  displayNameMax: 100,
  emailMax: 160,
  photoUrlMax: 500,
} as const;

export type PreferredShift = 'manana' | 'tarde' | 'a_convenir';
export type TurnoStatus = 'pendiente' | 'enviado_whatsapp' | 'cancelado';

export const SHIFT_LABELS: Record<PreferredShift, string> = {
  manana: 'Por la mañana',
  tarde: 'Por la tarde',
  a_convenir: 'Horario a convenir',
};

export const STATUS_LABELS: Record<TurnoStatus, string> = {
  pendiente: 'Guardado',
  enviado_whatsapp: 'Enviado por WhatsApp',
  cancelado: 'Cancelado',
};
