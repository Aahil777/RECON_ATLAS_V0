import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-recon-green">
        Recon-Atlas
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-sm text-neutral-500 sm:text-base">
        {description ??
          "This module is still coming online. Keep prompting to build out this page next."}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md border border-recon-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-recon-black transition-colors hover:bg-recon-black hover:text-recon-green"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
