# Firestore Security Specification — Adriana Podología

## 1. Data Invariants
1. **Identity Isolation (`/users/{userId}`)**: A user may only read, create, or update their own `/users/{userId}` document when authenticated with a verified email (`request.auth.token.email_verified == true`), and `uid` must match `request.auth.uid` and `userId`. No blanket `list` is allowed on `/users`.
2. **Ownership & Integrity (`/turnoRequests/{requestId}`)**: Every `TurnoRequest` belongs strictly to `request.auth.uid` (`data.userId == request.auth.uid`). Users can only `get`, `list`, `create`, `update`, or `delete` their own requests (plus verified admin `flowcraftmediauk@gmail.com` read/status triage).
3. **Immutable Fields & Server Timestamps**: `userId`/`uid` and `createdAt` are immutable after creation. `createdAt == request.time` on create; `updatedAt == request.time` on create and update.
4. **Terminal State Locking**: Once `status == 'cancelado'`, non-admin users cannot reactivate or mutate the request.
5. **Volumetric & Schema Strictness**: Every string field enforces explicit `minLength`/`maxLength` matching `firebase-blueprint.json`, `hasAll` + `hasOnly` on create, and `affectedKeys().hasOnly(...)` per named action on update.

## 2. The "Dirty Dozen" Adversarial Payloads
1. Unauthenticated read/write to `/users/{uid}` or `/turnoRequests/{id}` -> `PERMISSION_DENIED`.
2. Unverified email user attempting to create a `TurnoRequest` -> `PERMISSION_DENIED`.
3. Identity spoofing: User A creating `TurnoRequest` with `userId: "userB"` -> `PERMISSION_DENIED`.
4. Cross-user PII read: User A attempting `get` on User B's `/users/{userB}` or `/turnoRequests/{id}` -> `PERMISSION_DENIED`.
5. Unscoped `list` query on `/turnoRequests` without `where('userId', '==', uid)` -> `PERMISSION_DENIED`.
6. Shadow field injection on create: Adding `isAdmin: true` or `role: "admin"` -> `PERMISSION_DENIED`.
7. Shadow update injection: Updating `userId` or `createdAt` during `update` -> `PERMISSION_DENIED`.
8. Client-forged timestamp: Passing a past/future client `Date` for `createdAt` or `updatedAt` instead of `request.time` -> `PERMISSION_DENIED`.
9. Resource poisoning: Document ID > 128 chars or containing invalid characters (`../foo`) -> `PERMISSION_DENIED`.
10. String overflow: `note` > 500 chars or `patientName` > 100 chars -> `PERMISSION_DENIED`.
11. Invalid enum value: `preferredShift: "madrugada"` or `status: "aprobado"` -> `PERMISSION_DENIED`.
12. Terminal state bypass: Non-admin attempting to update a `TurnoRequest` after `status == "cancelado"` -> `PERMISSION_DENIED`.
