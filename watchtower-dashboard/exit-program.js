// exit-program.js
import { exportSession } from './resonance-history.js';
import { summarizeResonance } from './summarize-resonance.js';

export function exitProgram() {
  const { blob, filename } = exportSession();
  const summaryText = summarizeResonance();

  // ✨ Display farewell stats (modal optional)
  alert(`🌘 Watchtower Session Closing\n\n📁 File: ${filename}\n\n${summaryText}`);

  // ⬇️ Trigger JSON download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // 🌙 Close or redirect
  setTimeout(() => {
    // Option 1: Close tab (may be blocked by browser)
    // window.close();

    // Option 2: Redirect to a goodbye screen or fade-out overlay
    document.body.innerHTML = '<div style="color:#ccc; text-align:center; padding-top:20vh;">🌓 Watchtower has entered rest.<br/><br/>Session file saved.<br/><small>You may now close this window.</small></div>';
    document.body.style.background = '#111';
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, 1000);
}
