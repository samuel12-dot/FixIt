export function Badge({
  children,
  tone = "accent",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "accent" | "amber" | "dark";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent-soft text-accent-dark",
    amber: "bg-amber-soft text-amber-700",
    dark: "bg-white/10 text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
