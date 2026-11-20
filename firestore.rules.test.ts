/**
 * Firestore Security Rules Test Vectors ("Dirty Dozen" Payloads)
 * Verified against firestore.rules & security_spec.md
 */

export interface DirtyDozenVector {
  id: string;
  description: string;
  collection: 'users' | 'turnoRequests';
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedOutcome: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
}

export const DIRTY_DOZEN_VECTORS: DirtyDozenVector[] = [
  {
    id: 'DD-01',
    description: 'Unauthenticated read/write to /turnoRequests',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 'DD-02',
    description: 'Unverified email user creating TurnoRequest',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 'DD-03',
    description: 'Identity spoofing: userId differs from request.auth.uid',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      userId: 'other-user-uid',
      patientName: 'Test User',
      whatsappNumber: '+54 9 381 622-2857',
      preferredShift: 'manana',
      note: 'Consulta general',
      status: 'pendiente',
    },
  },
  {
    id: 'DD-04',
    description: 'Cross-user PII read on /users/{otherUid}',
    collection: 'users',
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 'DD-05',
    description: 'Unscoped list query on /turnoRequests without userId filter',
    collection: 'turnoRequests',
    operation: 'list',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 'DD-06',
    description: 'Shadow field injection (isAdmin: true) on create',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      isAdmin: true,
      patientName: 'Test User',
    },
  },
  {
    id: 'DD-07',
    description: 'Immutable field mutation (userId or createdAt) on update',
    collection: 'turnoRequests',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      userId: 'attacker-uid',
    },
  },
  {
    id: 'DD-08',
    description: 'Client-forged timestamp instead of request.time',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      createdAt: '2020-01-01T00:00:00Z',
    },
  },
  {
    id: 'DD-09',
    description: 'Resource poisoning via oversized or invalid document ID',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 'DD-10',
    description: 'String overflow exceeding note maxLength (500)',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      note: 'x'.repeat(501),
    },
  },
  {
    id: 'DD-11',
    description: 'Invalid enum value for preferredShift or status',
    collection: 'turnoRequests',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      preferredShift: 'madrugada',
      status: 'aprobado',
    },
  },
  {
    id: 'DD-12',
    description: 'Terminal state bypass after status reaches cancelado',
    collection: 'turnoRequests',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      status: 'pendiente',
    },
  },
];
