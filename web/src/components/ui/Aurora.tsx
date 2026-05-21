import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

export function Aurora({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[color:var(--color-mist-200)] opacity-50 blur-3xl animate-drift" />
      <div className="absolute top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-[color:var(--color-peach-100)] opacity-60 blur-3xl animate-drift" />
      <div className="absolute bottom-0 -left-32 h-[28rem] w-[28rem] rounded-full bg-[color:var(--color-lilac-100)] opacity-60 blur-3xl animate-drift" />
    </div>
  );
}
