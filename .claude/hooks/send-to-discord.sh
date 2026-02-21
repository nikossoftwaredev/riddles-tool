#!/bin/bash
# Claude Code Hook: Send kkth-agent solution to Discord
# Triggered by SubagentStop event for kkth-agent

WEBHOOK_URL="https://discord.com/api/webhooks/1474554327438983301/B_wxmPBw4HuIVN48epUpz1RUHKZQcPOD4LHPjJAGW98LU9tjs4taJ1w6Co-O4FhwyMIQ"

# Save stdin to temp file (avoids bash escaping issues)
INPUT_FILE=$(mktemp)
PAYLOAD_FILE=$(mktemp)
SCRIPT_FILE=$(mktemp --suffix=.js)
cat > "$INPUT_FILE"

# Write the Node.js formatting script to a temp file
cat > "$SCRIPT_FILE" << 'ENDSCRIPT'
const fs = require('fs');
const inputFile = process.argv[2];
const payloadFile = process.argv[3];

try {
  const raw = fs.readFileSync(inputFile, 'utf8');
  const input = JSON.parse(raw);
  const msg = (input.last_assistant_message || '').trim();
  if (!msg) process.exit(1);

  // Calculate duration from transcript file timestamps
  let durationStr = '';
  const transcriptPath = input.agent_transcript_path || '';
  if (transcriptPath) {
    try {
      const stats = fs.statSync(transcriptPath);
      const created = stats.birthtime || stats.ctime;
      const durationMs = Date.now() - created.getTime();
      if (durationMs > 0) {
        const totalSec = Math.floor(durationMs / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        durationStr = min > 0 ? `${min} λεπτά ${sec} δευτ.` : `${sec} δευτ.`;
      }
    } catch(e) { /* ignore */ }
  }

  // Strip accents for matching (handles both accented and unaccented Greek)
  function strip(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function has(line, keywords) {
    const s = strip(line);
    return keywords.some(k => s.includes(strip(k)));
  }

  // Parse the agent output
  let answer = '';
  let reasoning = [];
  let alternatives = '';
  let locationMatch = '';
  let method = '';
  const lines = msg.split('\n');

  for (const line of lines) {
    const clean = line.replace(/\*\*/g, '').trim();

    // 1. Answer: Προτεινόμενη Απάντηση (priority)
    if (!answer && has(line, ['Προτεινόμενη Απάντηση', 'Προτεινομενη Απαντηση'])) {
      const after = clean.replace(/.*(?:Απ[αά]ντηση|Απαντηση)[:\s]*/i, '').trim();
      if (after) answer = after;
    }
    // 2. Fallback: Αποκωδικοποίηση
    if (!answer && has(line, ['Αποκωδικοποίηση:', 'Αποκωδικοποιηση:'])) {
      const after = clean.replace(/.*(?:Αποκωδικοπο[ιί]ηση|Αποκωδικοποιηση)[:\s]*/i, '').trim();
      if (after) answer = after;
    }
    // 3. Fallback: Απάντηση
    if (!answer && has(line, ['Απάντηση:', 'Απαντηση:'])) {
      const after = clean.replace(/.*(?:Απ[αά]ντηση|Απαντηση)[:\s]*/i, '').trim();
      if (after) answer = after;
    }

    // Numbered reasoning steps
    const stepMatch = line.match(/^\s*(\d+[\.\)]\s*.+)/);
    if (stepMatch) reasoning.push(stepMatch[1]);

    // Alternatives
    if (has(line, ['Εναλλακτικές', 'Εναλλακτικες'])) {
      const after = clean.replace(/.*(?:Εναλλακτικ[εέ][σς]?)[:\s]*/i, '').trim();
      if (after) alternatives = after;
    }

    // Location
    if (has(line, ['Βρέθηκε σε', 'Βρεθηκε σε'])) {
      const after = clean.replace(/.*(?:Βρ[εέ]θηκε σε)[:\s]*/i, '').trim();
      if (after && !locationMatch) locationMatch = after;
    }

    // Method
    if (!method && has(line, ['Μέθοδος:', 'Μεθοδος:', 'Αναγνώριση μεθόδου', 'Αναγνωριση μεθοδου'])) {
      const after = clean.replace(/.*(?:Μ[εέ]θοδος|μεθ[οό]δου)[:\s]*/i, '').trim();
      if (after) method = after;
    }
  }

  // Build Discord message
  const SEP = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
  const LINE = '─────────────────────────';
  let f = '';

  f += SEP + '\n';
  f += '🧩  **ΛΥΣΗ ΓΡΙΦΟΥ**\n';
  f += SEP + '\n\n';

  // Answer (always show something)
  if (answer) {
    f += '🎯 Νομίζω η λύση είναι: **' + answer + '**\n\n';
  } else {
    // Ultimate fallback: find first bold text or substantial line
    const boldMatch = msg.match(/\*\*([^*]{3,})\*\*/);
    if (boldMatch) f += '🎯 ' + boldMatch[1].trim() + '\n\n';
  }

  if (locationMatch) f += '📍 ' + locationMatch + '\n\n';
  if (method) f += '🔑 **Μέθοδος:** ' + method + '\n\n';

  f += LINE + '\n';
  f += '📋 **Η λογική μου είναι αυτή:**\n\n';

  if (reasoning.length > 0) {
    reasoning.forEach(step => { f += step + '\n'; });
  } else {
    // Fallback: grab explanation-like lines
    const useful = lines.filter(l => {
      const t = l.trim();
      return t.length > 20 && !t.startsWith('#') && !t.startsWith('|') && !t.startsWith('---') && !t.startsWith('```') &&
             !has(l, ['Τι βλέπω', 'Google Search', 'Προτεινόμενη', 'Εναλλακτικ', 'Βρέθηκε']);
    }).slice(0, 5);
    useful.forEach(l => { f += '• ' + l.replace(/\*\*/g, '').trim() + '\n'; });
  }

  if (alternatives) {
    f += '\n' + LINE + '\n';
    f += '🔄 **Εναλλακτικές:** ' + alternatives + '\n';
  }

  if (durationStr) {
    f += '\n' + LINE + '\n';
    f += '⏱️ Χρόνος επίλυσης: **' + durationStr + '**\n';
  }

  f += '\n' + SEP;

  // Truncate to Discord's 2000 char limit
  const truncated = f.length > 1950
    ? f.substring(0, 1950) + '\n...(περικοπή)\n' + SEP
    : f;

  fs.writeFileSync(payloadFile, JSON.stringify({ content: truncated }));
} catch(e) {
  process.exit(1);
}
ENDSCRIPT

# Run the formatting script
node "$SCRIPT_FILE" "$INPUT_FILE" "$PAYLOAD_FILE" 2>/dev/null

# Send to Discord if payload was written
if [ -s "$PAYLOAD_FILE" ]; then
  curl -s -X POST "$WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d @"$PAYLOAD_FILE"
fi

# Cleanup
rm -f "$INPUT_FILE" "$PAYLOAD_FILE" "$SCRIPT_FILE"

exit 0
