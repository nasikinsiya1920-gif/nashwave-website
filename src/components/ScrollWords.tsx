/**
 * Text that lights up word by word as it scrolls through the screen (driven by ScrollFx via --p).
 * `parts` lets some words take a different colour, e.g. [{ text: "We make sure it is.", className: "text-coral-soft" }].
 */
export default function ScrollWords({ parts }: { parts: { text: string; className?: string }[] }) {
  const words = parts.flatMap(({ text, className }) => text.split(" ").map((w) => ({ w, className })));
  return (
    <span data-scroll-words="" className="scroll-words" style={{ "--n": words.length } as React.CSSProperties}>
      {words.map(({ w, className }, i) => (
        <span key={i} className={className} style={{ "--i": i } as React.CSSProperties}>
          {w}{" "}
        </span>
      ))}
    </span>
  );
}
