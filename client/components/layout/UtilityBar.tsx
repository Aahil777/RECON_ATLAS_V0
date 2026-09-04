import { Settings, ShieldCheck, UserRound } from "lucide-react";

const utilityItems = [
  { label: "Customer Login", icon: UserRound },
  { label: "Administrative Control", icon: ShieldCheck },
  { label: "Settings", icon: Settings },
];

export default function UtilityBar() {
  return (
    <div
      className="flex min-h-10 items-center justify-end gap-4 border-b border-neutral-200 bg-white px-4 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500 sm:gap-6 sm:px-8"
      style={{ fontFamily: "Helvetica, sans-serif" }}
    >
      {utilityItems.map(({ label, icon: Icon }) => (
        <span key={label} className="inline-flex items-center gap-2 whitespace-nowrap">
          <Icon className="h-3.5 w-3.5 text-recon-green" aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}
