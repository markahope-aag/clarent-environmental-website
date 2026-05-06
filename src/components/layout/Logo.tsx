import { cn } from "@/lib/cn";

export type LogoSize = "sm" | "md" | "lg";
export type LogoVariant = "color" | "white" | "dark";

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const SIZES: Record<LogoSize, { mark: number; text: number }> = {
  sm: { mark: 20, text: 14 },
  md: { mark: 28, text: 18 },
  lg: { mark: 40, text: 24 },
};

const VARIANT_COLORS: Record<LogoVariant, { mark: string; text: string }> = {
  color: { mark: "var(--color-orange)", text: "var(--color-charcoal)" },
  white: { mark: "#FFFFFF",             text: "#FFFFFF" },
  dark:  { mark: "var(--color-charcoal)", text: "var(--color-charcoal)" },
};

// Outer diamond + inner-diamond cutout via even-odd fill rule.
const DIAMOND_PATH =
  "M 20 2 L 38 20 L 20 38 L 2 20 Z M 20 12 L 10 20 L 20 28 L 30 20 Z";

export function Logo({ size = "md", variant = "color", className }: LogoProps) {
  const dims = SIZES[size];
  const colors = VARIANT_COLORS[variant];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Clarent Environmental">
      <svg
        width={dims.mark}
        height={dims.mark}
        viewBox="0 0 40 40"
        aria-hidden
        focusable="false"
      >
        <path
          d={DIAMOND_PATH}
          fill={colors.mark}
          fillRule="evenodd"
        />
      </svg>
      <span
        className="font-medium tracking-tight"
        style={{
          fontSize: `${dims.text}px`,
          color: colors.text,
          lineHeight: 1,
        }}
      >
        Clarent
      </span>
    </span>
  );
}
