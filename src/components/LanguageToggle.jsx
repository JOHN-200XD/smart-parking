import { Languages } from 'lucide-react';

export default function LanguageToggle({ language = 'th', onToggle }) {
  const nextLanguage = language === 'th' ? 'English' : 'ภาษาไทย';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch language to ${nextLanguage}`}
      title={`Switch language to ${nextLanguage}`}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#E3E8EF] bg-white px-2.5 text-xs font-semibold text-[#5E6C84] transition hover:border-[#B9D9FA] hover:bg-[#F5F9FF]"
    >
      <Languages size={15} />
      <span className={language === 'th' ? 'text-[#1685F8]' : ''}>TH</span>
      <span className="text-[#A0AAB8]">/</span>
      <span className={language === 'en' ? 'text-[#1685F8]' : ''}>EN</span>
    </button>
  );
}
