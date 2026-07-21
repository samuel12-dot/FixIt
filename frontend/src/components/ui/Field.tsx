export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4.5">
      <label className="mb-1.5 block text-[13px] font-semibold text-ink-soft">{label}</label>
      {children}
      {error && <div className="mt-1.5 text-xs text-red-600">{error}</div>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-[11px] border border-line px-3.5 py-3.5 text-[15px] outline-none focus:border-accent";
