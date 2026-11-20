import React, { useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  CalendarCheck,
  Check,
  Edit3,
  LogOut,
  Trash2,
  X,
} from 'lucide-react';
import {
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
} from '../firebase';
import {
  BLUEPRINT_LIMITS,
  PreferredShift,
  SHIFT_LABELS,
  STATUS_LABELS,
  TurnoStatus,
  VERIFIED_BUSINESS,
  buildWhatsAppUrl,
} from '../constants/business';
import { WhatsAppIcon } from './BotanicalMotifs';

interface TurnoRequestRecord {
  id: string;
  userId: string;
  patientName: string;
  whatsappNumber: string;
  preferredShift: PreferredShift;
  note: string;
  status: TurnoStatus;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export function TurnosSection() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [requests, setRequests] = useState<TurnoRequestRecord[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [preferredShift, setPreferredShift] =
    useState<PreferredShift>('a_convenir');
  const [note, setNote] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const [editShift, setEditShift] = useState<PreferredShift>('a_convenir');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (currentUser) {
        if (!patientName && currentUser.displayName) {
          setPatientName(
            currentUser.displayName.slice(0, BLUEPRINT_LIMITS.patientNameMax)
          );
        }
        // Sync user profile document in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const existingSnap = await getDoc(userRef);
          const safeDisplayName = (
            currentUser.displayName ||
            currentUser.email ||
            'Paciente'
          ).slice(0, BLUEPRINT_LIMITS.displayNameMax);
          const safeEmail = (currentUser.email || '').slice(
            0,
            BLUEPRINT_LIMITS.emailMax
          );
          const safePhoto = currentUser.photoURL
            ? currentUser.photoURL.slice(0, BLUEPRINT_LIMITS.photoUrlMax)
            : '';

          if (!existingSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: safeDisplayName,
              email: safeEmail,
              ...(safePhoto ? { photoURL: safePhoto } : {}),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else {
            await updateDoc(userRef, {
              displayName: safeDisplayName,
              email: safeEmail,
              ...(safePhoto ? { photoURL: safePhoto } : {}),
              updatedAt: serverTimestamp(),
            });
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!authReady || !user) {
      setRequests([]);
      setLoadingRequests(false);
      return;
    }

    setLoadingRequests(true);
    const q = query(
      collection(db, 'turnoRequests'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: TurnoRequestRecord[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            userId: String(data.userId || ''),
            patientName: String(data.patientName || ''),
            whatsappNumber: String(data.whatsappNumber || ''),
            preferredShift: (data.preferredShift as PreferredShift) || 'a_convenir',
            note: String(data.note || ''),
            status: (data.status as TurnoStatus) || 'pendiente',
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          };
        });

        items.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() ?? 0;
          const timeB = b.createdAt?.toMillis?.() ?? 0;
          return timeB - timeA;
        });

        setRequests(items);
        setLoadingRequests(false);
      },
      (error) => {
        setLoadingRequests(false);
        handleFirestoreError(error, OperationType.LIST, 'turnoRequests');
      }
    );

    return () => unsubscribe();
  }, [authReady, user]);

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
      setAuthError(
        'No se pudo completar el inicio de sesión con Google. Verificá que las ventanas emergentes estén habilitadas.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const validateForm = (): string | null => {
    const cleanName = patientName.trim();
    const cleanPhone = whatsappNumber.trim();
    const cleanNote = note.trim();

    if (
      cleanName.length < BLUEPRINT_LIMITS.patientNameMin ||
      cleanName.length > BLUEPRINT_LIMITS.patientNameMax
    ) {
      return `Ingresá tu nombre completo (entre ${BLUEPRINT_LIMITS.patientNameMin} y ${BLUEPRINT_LIMITS.patientNameMax} caracteres).`;
    }

    if (
      cleanPhone.length < BLUEPRINT_LIMITS.whatsappMin ||
      cleanPhone.length > BLUEPRINT_LIMITS.whatsappMax ||
      !BLUEPRINT_LIMITS.whatsappPattern.test(cleanPhone)
    ) {
      return 'Ingresá un número de WhatsApp o teléfono válido (ej. +54 9 381 000-0000).';
    }

    if (
      cleanNote.length < BLUEPRINT_LIMITS.noteMin ||
      cleanNote.length > BLUEPRINT_LIMITS.noteMax
    ) {
      return `Escribí una breve consulta (entre ${BLUEPRINT_LIMITS.noteMin} y ${BLUEPRINT_LIMITS.noteMax} caracteres).`;
    }

    return null;
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setFormError(null);
    setFormSuccess(null);

    const validationErr = validateForm();
    if (validationErr) {
      setFormError(validationErr);
      return;
    }

    setSubmitting(true);
    const payload = {
      userId: user.uid,
      patientName: patientName.trim().slice(0, BLUEPRINT_LIMITS.patientNameMax),
      whatsappNumber: whatsappNumber
        .trim()
        .slice(0, BLUEPRINT_LIMITS.whatsappMax),
      preferredShift,
      note: note.trim().slice(0, BLUEPRINT_LIMITS.noteMax),
      status: 'pendiente' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'turnoRequests'), payload);
      setNote('');
      setFormSuccess(
        'Tu solicitud quedó guardada. Podés enviarla directo por WhatsApp para coordinar el horario.'
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'turnoRequests');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendToWhatsApp = async (item: TurnoRequestRecord) => {
    const message = `¡Hola! Soy ${item.patientName}. Quisiera consultar por un turno en ${VERIFIED_BUSINESS.name}. Preferencia horaria: ${SHIFT_LABELS[item.preferredShift]}. Motivo: ${item.note}`;
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');

    if (item.status === 'pendiente') {
      const ref = doc(db, 'turnoRequests', item.id);
      try {
        await updateDoc(ref, {
          status: 'enviado_whatsapp',
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(
          error,
          OperationType.UPDATE,
          `turnoRequests/${item.id}`
        );
      }
    }
  };

  const handleSaveEdit = async (item: TurnoRequestRecord) => {
    const cleanNote = editNote.trim();
    if (
      cleanNote.length < BLUEPRINT_LIMITS.noteMin ||
      cleanNote.length > BLUEPRINT_LIMITS.noteMax
    ) {
      setFormError(
        `La consulta debe tener entre ${BLUEPRINT_LIMITS.noteMin} y ${BLUEPRINT_LIMITS.noteMax} caracteres.`
      );
      return;
    }

    const ref = doc(db, 'turnoRequests', item.id);
    try {
      await updateDoc(ref, {
        patientName: item.patientName,
        whatsappNumber: item.whatsappNumber,
        preferredShift: editShift,
        note: cleanNote.slice(0, BLUEPRINT_LIMITS.noteMax),
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
      setFormError(null);
    } catch (error) {
      handleFirestoreError(
        error,
        OperationType.UPDATE,
        `turnoRequests/${item.id}`
      );
    }
  };

  const handleCancelRequest = async (id: string) => {
    const ref = doc(db, 'turnoRequests', id);
    try {
      await updateDoc(ref, {
        status: 'cancelado',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `turnoRequests/${id}`);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    const ref = doc(db, 'turnoRequests', id);
    try {
      await deleteDoc(ref);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `turnoRequests/${id}`);
    }
  };

  return (
    <section id="turnos" className="bg-white py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-wider text-[#681B36] mb-3">
            Consultas y Turnos · {VERIFIED_BUSINESS.city}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#422B30] leading-tight text-balance mb-4">
            Coordiná tu consulta de forma simple y ordenada
          </h2>
          <p className="text-base text-[#6B4E54] leading-relaxed">
            Podés escribirnos directamente por WhatsApp al{' '}
            <span className="font-semibold text-[#422B30] tabular-nums">
              {VERIFIED_BUSINESS.whatsappDisplay}
            </span>{' '}
            o ingresar con tu cuenta de Google para dejar registrada tu
            solicitud de turno y tenerla siempre a mano.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Panel: Google Sign-In & Request Form */}
          <div className="lg:col-span-6 bg-[#FFF5EC] rounded-tl-[44px] rounded-br-[44px] rounded-tr-2xl rounded-bl-2xl p-6 sm:p-8 border border-[#681B36]/10">
            {!authReady ? (
              <div className="py-12 text-center text-sm text-[#6B4E54]">
                Verificando sesión...
              </div>
            ) : !user ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#422B30] mb-2">
                    Guardá tu solicitud de turno
                  </h3>
                  <p className="text-sm text-[#6B4E54] leading-relaxed">
                    Iniciá sesión con Google para registrar tu consulta, elegir
                    tu franja horaria preferida y enviarla por WhatsApp con un
                    clic.
                  </p>
                </div>

                {authError && (
                  <p
                    role="alert"
                    className="text-sm text-[#681B36] bg-[#F4D5D2]/60 rounded-xl px-4 py-3"
                  >
                    {authError}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={authLoading}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#681B36] text-white text-sm font-medium hover:bg-[#52142A] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>
                      {authLoading
                        ? 'Conectando...'
                        : 'Ingresar con Google para pedir turno'}
                    </span>
                  </button>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1EBE5D] transition-colors whitespace-nowrap"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Ir directo a WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#681B36]/10">
                  <div className="flex items-center gap-3 min-w-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Usuario'}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-[#D9828B]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#F4D5D2] flex items-center justify-center text-[#681B36] font-serif font-semibold">
                        {(user.displayName || 'P')[0]}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#422B30] truncate">
                        {user.displayName || 'Paciente'}
                      </p>
                      <p className="text-xs text-[#6B4E54] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#681B36]/20 text-xs font-medium text-[#422B30] hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Salir</span>
                  </button>
                </div>

                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <label
                      htmlFor="patientName"
                      className="block text-xs font-medium text-[#422B30] mb-1.5"
                    >
                      Nombre y apellido
                    </label>
                    <input
                      id="patientName"
                      type="text"
                      required
                      maxLength={BLUEPRINT_LIMITS.patientNameMax}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Ej. María Gómez"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#681B36]/15 text-sm text-[#422B30] placeholder:text-[#6B4E54]/60 focus:outline-none focus:border-[#681B36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="whatsappNumber"
                        className="block text-xs font-medium text-[#422B30] mb-1.5"
                      >
                        Tu número de WhatsApp
                      </label>
                      <input
                        id="whatsappNumber"
                        type="tel"
                        required
                        maxLength={BLUEPRINT_LIMITS.whatsappMax}
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+54 9 381 ..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#681B36]/15 text-sm text-[#422B30] placeholder:text-[#6B4E54]/60 focus:outline-none focus:border-[#681B36]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferredShift"
                        className="block text-xs font-medium text-[#422B30] mb-1.5"
                      >
                        Preferencia horaria
                      </label>
                      <select
                        id="preferredShift"
                        value={preferredShift}
                        onChange={(e) =>
                          setPreferredShift(e.target.value as PreferredShift)
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#681B36]/15 text-sm text-[#422B30] focus:outline-none focus:border-[#681B36]"
                      >
                        <option value="a_convenir">Horario a convenir</option>
                        <option value="manana">Por la mañana</option>
                        <option value="tarde">Por la tarde</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="turnoNote"
                      className="block text-xs font-medium text-[#422B30] mb-1.5"
                    >
                      Motivo de tu consulta
                    </label>
                    <textarea
                      id="turnoNote"
                      rows={3}
                      required
                      maxLength={BLUEPRINT_LIMITS.noteMax}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Contanos brevemente qué día o tipo de consulta necesitás coordinar..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#681B36]/15 text-sm text-[#422B30] placeholder:text-[#6B4E54]/60 focus:outline-none focus:border-[#681B36] resize-none"
                    />
                    <p className="mt-1 text-right text-[11px] text-[#6B4E54] tabular-nums">
                      {note.length}/{BLUEPRINT_LIMITS.noteMax}
                    </p>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs text-[#681B36] bg-[#F4D5D2]/70 rounded-xl px-4 py-2.5"
                    >
                      {formError}
                    </p>
                  )}

                  {formSuccess && (
                    <p
                      role="status"
                      className="text-xs text-[#422B30] bg-white border border-[#D9828B] rounded-xl px-4 py-2.5"
                    >
                      {formSuccess}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-6 rounded-full bg-[#681B36] text-white text-sm font-medium hover:bg-[#52142A] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {submitting ? 'Guardando...' : 'Guardar solicitud de turno'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Panel: Saved User Requests */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-2xl font-semibold text-[#422B30]">
                Mis solicitudes guardadas
              </h3>
              {user && (
                <span className="text-xs text-[#6B4E54] tabular-nums">
                  {requests.length}{' '}
                  {requests.length === 1 ? 'registro' : 'registros'}
                </span>
              )}
            </div>

            {!user ? (
              <div className="rounded-3xl border border-[#681B36]/10 bg-[#FFF5EC]/50 p-8 text-center">
                <p className="font-serif text-lg text-[#422B30] mb-2">
                  Historial personal de turnos
                </p>
                <p className="text-sm text-[#6B4E54] leading-relaxed">
                  Al iniciar sesión con Google, vas a poder guardar tus
                  consultas, modificar tu preferencia horaria y enviarlas por
                  WhatsApp en cualquier momento.
                </p>
              </div>
            ) : loadingRequests ? (
              <div className="rounded-3xl border border-[#681B36]/10 bg-[#FFF5EC]/40 p-8 text-center text-sm text-[#6B4E54]">
                Cargando tus solicitudes...
              </div>
            ) : requests.length === 0 ? (
              <div className="rounded-3xl border border-[#681B36]/10 bg-[#FFF5EC]/40 p-8 text-center">
                <p className="font-serif text-lg text-[#422B30] mb-1">
                  Todavía no guardaste consultas
                </p>
                <p className="text-sm text-[#6B4E54]">
                  Completá el formulario para registrar tu pedido de turno y
                  enviarlo por WhatsApp.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((item) => {
                  const isEditing = editingId === item.id;
                  const isCanceled = item.status === 'cancelado';

                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[#681B36]/12 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(66,43,48,0.18)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-[#422B30]">
                            {item.patientName}
                          </h4>
                          <p className="text-xs text-[#6B4E54] tabular-nums">
                            {item.whatsappNumber} · {SHIFT_LABELS[item.preferredShift]} ·{' '}
                            <span
                              className={
                                isCanceled
                                  ? 'text-[#6B4E54]'
                                  : 'font-medium text-[#681B36]'
                              }
                            >
                              {STATUS_LABELS[item.status]}
                            </span>
                          </p>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-3 space-y-3">
                          <select
                            value={editShift}
                            onChange={(e) =>
                              setEditShift(e.target.value as PreferredShift)
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-[#FFF5EC] border border-[#681B36]/15 text-sm text-[#422B30]"
                          >
                            <option value="a_convenir">Horario a convenir</option>
                            <option value="manana">Por la mañana</option>
                            <option value="tarde">Por la tarde</option>
                          </select>
                          <textarea
                            rows={2}
                            maxLength={BLUEPRINT_LIMITS.noteMax}
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-[#FFF5EC] border border-[#681B36]/15 text-sm text-[#422B30] resize-none"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(item)}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#681B36] text-white text-xs font-medium cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Guardar</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#681B36]/20 text-xs font-medium text-[#422B30] cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancelar</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-[#422B30]/90 leading-relaxed mb-4">
                            {item.note}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            {!isCanceled && (
                              <button
                                type="button"
                                onClick={() => handleSendToWhatsApp(item)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors cursor-pointer"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" />
                                <span>Enviar por WhatsApp</span>
                              </button>
                            )}

                            {!isCanceled && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingId(item.id);
                                  setEditNote(item.note);
                                  setEditShift(item.preferredShift);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-[#681B36]/15 text-xs font-medium text-[#422B30] hover:bg-[#FFF5EC] transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Editar</span>
                              </button>
                            )}

                            {!isCanceled && (
                              <button
                                type="button"
                                onClick={() => handleCancelRequest(item.id)}
                                className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-[#681B36]/15 text-xs font-medium text-[#6B4E54] hover:bg-[#F4D5D2]/40 transition-colors cursor-pointer"
                              >
                                <span>Anular</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDeleteRequest(item.id)}
                              aria-label="Eliminar registro"
                              className="ml-auto inline-flex items-center justify-center w-8 h-8 rounded-full text-[#6B4E54] hover:text-[#681B36] hover:bg-[#F4D5D2]/40 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
