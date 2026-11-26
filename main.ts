// out-of-office-63e7ca0b: one brutally honest but still polite
// out-of-office auto-reply. This program writes that single line to
// /output/entry.txt, where the gate reads it. That is all it has to do.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The reply admits the private truth every employee knows but never
// puts in an auto-reply: the inbox waiting on return is not urgent work,
// it is a mountain of other people's emergencies. It stays polite —
// "kindly, but slowly" promises a warm answer, just not a fast one —
// and the turn of phrase is the whole joke: emergencies that belong
// to everyone except the sender.
const LINE =
  "I'm away, and honestly my inbox will be a mountain of other people's emergencies when I return — I'll answer kindly, but slowly.";

if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  console.error(`entry line is ${LINE.length} chars, must be 1-200`);
  process.exit(1);
}
if (LINE !== LINE.trim()) {
  console.error('entry line must not start or end with whitespace');
  process.exit(1);
}
if (LINE.includes('\n')) {
  console.error('entry line must be a single line');
  process.exit(1);
}
if (LINE.split('.').filter(Boolean).length > 1) {
  console.error('entry line must be a single sentence');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length}-char entry to ${join(OUTPUT_DIR, 'entry.txt')}`);

