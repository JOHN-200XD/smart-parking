export const formatNumber = (value) => new Intl.NumberFormat('th-TH').format(value);

export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#1685F8]">{eyebrow}</p>}
        <h1 className="text-xl font-bold text-[#172B4D] sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#5E6C84]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'blue' }) {
  const iconClass = tone === 'green'
    ? 'bg-emerald-50 text-emerald-600'
    : tone === 'amber'
      ? 'bg-amber-50 text-amber-600'
      : 'bg-[#1685F8]/10 text-[#1685F8]';

  return (
    <div className="rounded-xl border border-[#E3E8EF] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-[#5E6C84]">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#172B4D]">{value}</p>
          {hint && <p className="mt-1 text-xs text-[#7A869A]">{hint}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${iconClass}`}><Icon size={20} /></div>
      </div>
    </div>
  );
}

export function SectionCard({ title, description, action, children, className = '' }) {
  return (
    <section className={`rounded-xl border border-[#E3E8EF] bg-white ${className}`}>
      {(title || action) && (
        <div className="flex flex-col gap-2 border-b border-[#E3E8EF] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            {title && <h2 className="text-sm font-semibold text-[#172B4D]">{title}</h2>}
            {description && <p className="mt-1 text-xs text-[#7A869A]">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ status }) {
  const active = status === 'active';
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}><span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-400'}`} />{active ? 'ใช้งานอยู่' : 'ระงับการใช้งาน'}</span>;
}

export function DetailItem({ label, value }) {
  return <div className="rounded-lg bg-[#F5F7FA] p-3"><p className="text-xs text-[#7A869A]">{label}</p><p className="mt-1 text-sm font-semibold text-[#172B4D]">{value}</p></div>;
}
