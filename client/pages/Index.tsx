import { Link } from "react-router-dom";
interface TrayItem {
  label: string;
  description: string;
  to: string;
  icon: string;
}

const trayItems: TrayItem[] = [
  {
    label: "Project Details",
    description: "Active procurement projects & owners",
    to: "/projects",
    icon: "https://cdn.builder.io/api/v1/image/assets%2F73a21bef0ae44344af00644d40dbb63c%2Fd5594657b9464bdebc889a6f83985530?format=webp&width=800&height=1200",
  },
  {
    label: "Inventory Visualisation",
    description: "Live component stock levels",
    to: "/inventory",
    icon: "https://cdn.builder.io/api/v1/image/assets%2F73a21bef0ae44344af00644d40dbb63c%2F482f92f1d8ab44bc9c239872f61da8e6?format=webp&width=800&height=1200",
  },
  {
    label: "BOM Review",
    description: "Validate bills of materials",
    to: "/bom-review",
    icon: "https://cdn.builder.io/api/v1/image/assets%2F73a21bef0ae44344af00644d40dbb63c%2F6a1f880ba637463c925324bfc5c56fb0?format=webp&width=800&height=1200",
  },
  {
    label: "Datasheet and Compliance Review",
    description: "Specs, RoHS & REACH checks",
    to: "/datasheet-compliance",
    icon: "https://cdn.builder.io/api/v1/image/assets%2F73a21bef0ae44344af00644d40dbb63c%2F84d9271c471b442ca7211c8c5193d071?format=webp&width=800&height=1200",
  },
  {
    label: "View Recon Atlas",
    description: "Full component & supplier map",
    to: "/atlas",
    icon: "https://cdn.builder.io/api/v1/image/assets%2F73a21bef0ae44344af00644d40dbb63c%2F5d2aa2dd9c364ed29b8f168e4dd82dda?format=webp&width=800&height=1200",
  },
];

const dashboardWidgets = [
  "Sourcing Alerts",
  "Supplier Status",
  "Lead Time Tracker",
  "Price Watch",
];

export default function Index() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
          Modules
        </h2>
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5">
          {trayItems.map(({ label, description, to, icon }) => (
            <Link
              key={to}
              to={to}
              className="group flex min-w-[220px] shrink-0 snap-start flex-col justify-between gap-6 rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-recon-green hover:shadow-[0_0_0_1px_hsl(var(--recon-green)),0_12px_24px_-12px_hsl(var(--recon-green)/0.35)] sm:min-w-0"
            >
              <img
                src={icon}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 object-contain text-recon-black transition-colors group-hover:text-recon-green"
              />
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-wide text-recon-black"
                  style={{ fontFamily: "Alatsi, sans-serif" }}
                >
                  {label}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
              Live Dashboard
            </h2>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">
              Scroll for more
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardWidgets.map((widget) => (
              <div
                key={widget}
                className="flex h-40 flex-col justify-between rounded-lg border border-dashed border-neutral-300 bg-white p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">
                  {widget}
                </p>
                <p className="text-xs text-neutral-400">
                  No data streaming yet
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-neutral-400">
            The dashboard grows as more data sources connect &mdash; keep
            scrolling as the atlas expands.
          </p>
        </div>
      </section>
    </div>
  );
}
