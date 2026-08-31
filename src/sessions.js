export const SESSION_STORAGE_KEY = 'kite-sessions';

export function todayISO(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function normaliseSession(values) {
  const session = {
    id: values.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: String(values.date || '').trim(),
    place: String(values.place || '').trim(),
    averageWind: Number(values.averageWind),
    wingSize: Number(values.wingSize),
    boardSize: String(values.boardSize || '').trim(),
    comments: String(values.comments || '').trim()
  };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(session.date)) throw new Error('La date est invalide.');
  if (!session.place) throw new Error('Le lieu est obligatoire.');
  if (!Number.isFinite(session.averageWind) || session.averageWind < 0 || session.averageWind > 100) throw new Error('Le vent moyen doit être compris entre 0 et 100 nd.');
  if (!Number.isFinite(session.wingSize) || session.wingSize <= 0 || session.wingSize > 30) throw new Error('La taille de l’aile est invalide.');
  if (!session.boardSize) throw new Error('La taille de la planche est obligatoire.');

  return session;
}

export function readSessions(storage = localStorage) {
  try {
    const entries = JSON.parse(storage.getItem(SESSION_STORAGE_KEY) || '[]');
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export function writeSessions(sessions, storage = localStorage) {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(values, storage = localStorage) {
  const session = normaliseSession(values);
  const sessions = [session, ...readSessions(storage)];
  writeSessions(sessions, storage);
  return session;
}
