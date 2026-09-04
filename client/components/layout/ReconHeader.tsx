import { Link } from "react-router-dom";

export default function ReconHeader() {
  return (
    <Link
      to="/"
      aria-label="Recon-Atlas home"
      className="group flex h-[16.6667vh] min-h-[130px] w-full flex-col items-center justify-center bg-recon-black px-4 text-center transition-colors hover:bg-black"
    >
      <span className="font-display text-3xl font-bold tracking-[0.18em] text-recon-green transition-colors group-hover:text-recon-green-bright sm:text-4xl md:text-5xl">
        RECON-CORE
      </span>
      <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.4em] text-recon-green/60 sm:text-xs">
        Customer Portal CRM
      </span>
    </Link>
  );
}
