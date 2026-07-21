export function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  const full = Math.round(rating);
  return (
    <span className={`text-amber-500 ${size}`}>
      {"★".repeat(full)}
      <span className="text-line">{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}
