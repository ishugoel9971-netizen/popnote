import type { ReactNode } from 'react';

export function MetricCard({
  label,
  value,
  detail,
  icon,
  tone = 'cyan',
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone?: 'cyan' | 'violet';
}) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
        </div>
        <div className={`grid h-11 w-11 place-items-center rounded-full ${tone === 'cyan' ? 'bg-softBlue text-appleBlue' : 'bg-neutral-100 text-ink'}`}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{detail}</p>
    </div>
  );
}
