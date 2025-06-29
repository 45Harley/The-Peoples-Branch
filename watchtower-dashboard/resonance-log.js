// watchtower-dashboard/resonance-log.js

let echoCounter = 0;
let inMemoryLog = [];

function generateEchoId() {
  echoCounter += 1;
  return `echo-${String(echoCounter).padStart(3, '0')}`;
}

function getTimestamp() {
  return new Date().toISOString();
}

function getTodayFilename() {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  return `log-${yyyy}-${mm}-${dd}.json`;
}

/**
 * Main echo logger: builds, appends, and persists entry to today's log.
 * @param {Object} params - Echo data.
 * @param {string} params.title
 * @param {string} params.description
 * @param {string} [params.origin='manual']
 * @returns {Object} Logged echo entry.
 */
function logEcho({ title, description, origin = 'manual' }) {
  if (typeof evaluateEcho !== 'function') {
    console.warn('⚠️ evaluateEcho() is not defined.');
    return null;
  }

  const evaluated = evaluateEcho(title, description);
  const echoEntry = {
    id: generateEchoId(),
    title,
    description,
    evaluated,
    timestamp: getTimestamp(),
    origin
  };

  inMemoryLog.push(echoEntry);
  console.log(`🪜 Logged: ${echoEntry.id} →`, echoEntry);
  return echoEntry;
}

/**
 * Export today's in-memory log for download.
 * Placeholder for file system or IndexedDB.
 */
function exportLog() {
  const filename = getTodayFilename();
  const blob = new Blob([JSON.stringify(inMemoryLog, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
  console.log(`📁 Exported ${inMemoryLog.length} echoes to ${filename}`);
}

// Optional: expose functions globally for testing
window.logEcho = logEcho;
window.exportLog = exportLog;
