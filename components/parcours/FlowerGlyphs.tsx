/** Fleur corail (compétence validée) — 5 pétales autour d'un cœur. Décorative. */
export function Flower() {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-sm" aria-hidden focusable="false">
      {petals.map((a) => (
        <ellipse key={a} cx="12" cy="6.5" rx="4" ry="5.2" fill="#F2785C" stroke="#fff" strokeWidth="0.8" transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3.2" fill="#FDE7E1" stroke="#B3442B" strokeWidth="1" />
    </svg>
  );
}

/** Bourgeon fermé (compétence à cultiver). Décoratif. */
export function Bud() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden focusable="false">
      <path d="M12 21 V14" stroke="#2F7A28" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15 C6 13 7 6 12 3 C17 6 18 13 12 15 Z" fill="#E2F7E5" stroke="#2F7A28" strokeWidth="1.4" />
      <path d="M12 15 C10 11 10.5 7 12 4.5" fill="none" stroke="#57B54D" strokeWidth="1.2" />
    </svg>
  );
}
