/** @param {number} degrees */
export function cardinalDirection(degrees) { const dirs=['N','NE','E','SE','S','SO','O','NO']; return dirs[Math.round((((degrees%360)+360)%360)/45)%8]; }
/** @param {number} ms @param {string} timezone */
export function formatTime(ms, timezone) { return new Intl.DateTimeFormat('fr-FR',{hour:'2-digit',minute:'2-digit',timeZone:timezone}).format(new Date(ms)); }
/** @param {number} ms @param {string} timezone */
export function formatDay(ms, timezone) { return new Intl.DateTimeFormat('fr-FR',{weekday:'short',day:'numeric',month:'short',timeZone:timezone}).format(new Date(ms)); }
export const knots = (kmh) => Math.round(kmh / 1.852);
