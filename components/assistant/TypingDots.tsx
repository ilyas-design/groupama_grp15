/** Indicateur de saisie : 3 points qui rebondissent (figés si reduced-motion). */
export function TypingDots({ label }: { label: string }) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-[4px] bg-white px-4 py-3.5">
      <span className="sr-only">{label}</span>
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          aria-hidden
          className="h-2 w-2 animate-bounce rounded-full bg-green-700"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </div>
  );
}
