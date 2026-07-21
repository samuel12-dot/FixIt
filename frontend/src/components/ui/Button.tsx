import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold font-sans cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "bg-white text-ink border border-line hover:bg-neutral-50",
  ghost: "bg-transparent text-ink-soft hover:text-ink",
  dark: "bg-white text-emerald-950 hover:bg-emerald-50",
};

const sizes: Record<Size, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-[15px] px-7 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
