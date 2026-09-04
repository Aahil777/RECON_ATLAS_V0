import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  FileText,
  Filter,
  Layers3,
  MapPin,
  Network,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  UserRound,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const nodes = [
  { city: "Rotterdam", region: "Netherlands", x: 490, y: 129, score: "98%" },
  { city: "Singapore", region: "Singapore", x: 759, y: 277, score: "94%" },
  { city: "Houston", region: "United States", x: 200, y: 174, score: "91%" },
  { city: "Dubai", region: "UAE", x: 655, y: 207, score: "87%" },
  { city: "Busan", region: "South Korea", x: 812, y: 164, score: "84%" },
];

const layers = [
  { id: "compliance", label: "Export controls", color: "bg-recon-green", enabled: true },
  { id: "distributors", label: "Distributor nodes", color: "bg-sky-400", enabled: true },
  { id: "routes", label: "Sea routes", color: "bg-amber-400", enabled: true },
  { id: "risk", label: "Risk corridors", color: "bg-red-400", enabled: false },
];

export default function ReconAtlasView() {
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [component, setComponent] = useState("");
  const [zoom, setZoom] = useState(1);
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layers.map((layer) => [layer.id, layer.enabled])),
  );

  const visibleRoutes = activeLayers.routes;
  const resultLabel = useMemo(
    () => component || "No component selected",
    [component],
  );

  const toggleLayer = (id: string) => {
    setActiveLayers((current) => ({ ...current, [id]: !current[id] }));
  };

  const clearInvestigation = () => {
    setSelectedOrigin(null);
    setComponent("");
  };

  return (
    <main className="min-h-[calc(100vh-16.6667vh-40px)] bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-neutral-200 bg-white lg:min-h-[calc(100vh-16.6667vh-40px)] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500" style={{ fontFamily: "Helvetica, sans-serif" }}>
              Atlas Console
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-recon-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-recon-green" /> Live
            </span>
          </div>
          <nav className="grid grid-cols-2 gap-1 p-3 lg:block" aria-label="Atlas navigation">
            <button className="flex w-full items-center gap-3 rounded-md bg-recon-black px-3 py-2.5 text-left text-xs font-semibold text-recon-green">
              <Compass className="h-4 w-4" /> Atlas overview
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-recon-black">
              <ShieldCheck className="h-4 w-4" /> Compliance library
              <span className="ml-auto rounded bg-neutral-100 px-1.5 py-0.5 text-[9px]">12</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-recon-black">
              <Network className="h-4 w-4" /> Distributor network
            </button>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-recon-black">
              <FileText className="h-4 w-4" /> Saved investigations
            </button>
          </nav>
          <div className="mx-5 border-t border-neutral-200" />
          <div className="hidden lg:block">
            <div className="flex items-center justify-between px-5 py-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">Active layers</span>
              <button className="text-neutral-400 hover:text-recon-green" aria-label="Add layer"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-4 px-5">
              {layers.map((layer) => (
                <label key={layer.id} className="flex cursor-pointer items-center gap-3 text-xs text-neutral-600">
                  <input
                    type="checkbox"
                    checked={activeLayers[layer.id]}
                    onChange={() => toggleLayer(layer.id)}
                    className="sr-only"
                  />
                  <span className={`flex h-4 w-4 items-center justify-center rounded-sm border ${activeLayers[layer.id] ? "border-recon-green bg-recon-green" : "border-neutral-300"}`}>
                    {activeLayers[layer.id] && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${layer.color}`} />
                  <span>{layer.label}</span>
                  <CircleHelp className="ml-auto h-3.5 w-3.5 text-neutral-300" />
                </label>
              ))}
            </div>
          </div>
          <div className="mt-6 hidden items-center gap-3 border-t border-neutral-200 px-5 py-5 lg:flex">
            <RefreshCw className="h-4 w-4 text-recon-green" />
            <span className="text-[10px] text-neutral-500">Data synced<br /><strong className="font-medium text-neutral-800">Today at 14:28 UTC</strong></span>
          </div>
        </aside>

        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-recon-green" style={{ fontFamily: "Helvetica, sans-serif" }}>Workspace / Investigate</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-recon-black sm:text-4xl">Atlas overview</h1>
              <p className="mt-2 max-w-xl text-sm text-neutral-500" style={{ fontFamily: "Helvetica, sans-serif" }}>Trace compliant supply paths from point of need to verified distribution.</p>
            </div>
            <button onClick={clearInvestigation} className="inline-flex items-center gap-2 self-start rounded-md border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-recon-green hover:text-recon-green md:self-auto">
              <X className="h-3.5 w-3.5" /> Clear investigation
            </button>
          </div>

          <div className="mt-7 flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-recon-black text-xs font-bold text-recon-green">01</span>
              <div><p className="text-[9px] uppercase tracking-widest text-neutral-400">Origin point</p><strong className="text-xs text-neutral-800">{selectedOrigin || "Select on map"}</strong></div>
            </div>
            <div className="hidden h-px flex-1 bg-neutral-200 sm:block" />
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-xs font-bold text-neutral-400">02</span>
              <div><p className="text-[9px] uppercase tracking-widest text-neutral-400">Component / BOM</p><strong className="text-xs text-neutral-500">{resultLabel}</strong></div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-recon-black px-4 py-2.5 text-xs font-semibold text-recon-green transition-colors hover:bg-neutral-800 sm:ml-auto">
              <Search className="h-3.5 w-3.5" /> Find distributors
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-neutral-200 bg-[#101412] shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs text-neutral-300"><MapPin className="h-4 w-4 text-recon-green" /> Click anywhere to set your origin point</div>
              <div className="flex items-center gap-1 text-[10px] font-semibold tracking-widest text-neutral-400">
                <button className="rounded bg-recon-green px-2 py-1 text-recon-black">MAP</button><button className="px-2 py-1 hover:text-white">SAT</button><span className="mx-1 h-4 w-px bg-white/10" />
                <button onClick={() => setZoom(Math.max(0.8, zoom - 0.2))} className="p-1 hover:text-recon-green" aria-label="Zoom out"><ZoomOut className="h-3.5 w-3.5" /></button><span>{zoom.toFixed(1)}×</span><button onClick={() => setZoom(Math.min(1.6, zoom + 0.2))} className="p-1 hover:text-recon-green" aria-label="Zoom in"><ZoomIn className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="relative h-[300px] overflow-hidden sm:h-[420px]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#5e806b 1px, transparent 1px), linear-gradient(90deg, #5e806b 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
              <svg className="absolute inset-0 h-full w-full transition-transform duration-300" style={{ transform: `scale(${zoom})` }} viewBox="0 0 1000 470" role="img" aria-label="Interactive world supply map">
                <g fill="#273b2f" stroke="#527763" strokeWidth="1">
                  <path d="M95 101l48-30 79 12 49 33-9 37-36 9-22 40-35-5-12-28-44-17-20-27z M207 190l39 9 27 46-18 67-30 53-27-12 8-57-19-49z" />
                  <path d="M294 82l38-18 48 11 25 30-18 27-31 1-26 24-34-24z M355 140l58-7 40 26-19 36-39 8-22 50-34-4-17-48z" />
                  <path d="M464 99l52-33 86 10 38 35-21 31-59-6-18 23-60-18z M532 144l46-1 26 40-24 39-42-11-22-37z" />
                  <path d="M669 92l54-22 69 19 56 34-23 28-49 2-21 30-49-13-5-39-32-12z M770 173l55-1 35 27-12 35-51 3-38-27z M715 237l55 10 32 48-27 38-48-17-24-47z" />
                  <path d="M868 343l30 5 24 25-19 20-39-9-11-20z M580 324l49-5 48 23 2 42-48 22-57-14-22-33z" />
                </g>
                {visibleRoutes && (
                  <g fill="none" stroke="#d0a24a" strokeDasharray="4 7" strokeWidth="2" opacity=".75">
                    <path d="M245 234 Q455 80 733 150" /><path d="M245 234 Q455 320 759 277" /><path d="M245 234 Q560 220 884 355" />
                  </g>
                )}
                {activeLayers.distributors && nodes.map((node) => (
                  <g key={node.city} className="cursor-pointer" onClick={() => setSelectedOrigin(node.city)}>
                    <circle cx={node.x} cy={node.y} r="4" fill="#1eae53" /><circle cx={node.x} cy={node.y} r="11" fill="none" stroke="#1eae53" opacity=".35" />
                  </g>
                ))}
                {selectedOrigin && <circle cx="245" cy="234" r="12" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 3" />}
              </svg>
              <div className="absolute bottom-3 left-4 flex flex-wrap gap-3 rounded border border-white/10 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-wider text-neutral-400 backdrop-blur-sm"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-recon-green" /> Distributor</span><span className="flex items-center gap-1.5"><i className="h-px w-3 bg-amber-400" /> Trade route</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full border border-white" /> Origin</span></div>
              <span className="absolute bottom-3 right-4 text-[9px] text-neutral-500">© Recon Atlas · Open geography data</span>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-recon-green">Search parameters</p><h2 className="mt-2 font-display text-xl font-bold text-recon-black">What are you sourcing?</h2></div><span className="font-display text-3xl font-bold text-neutral-100">02</span></div>
              <label htmlFor="componentInput" className="mt-6 block text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Component or part number</label>
              <div className="mt-2 flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2.5 focus-within:border-recon-green"><Search className="h-4 w-4 text-neutral-400" /><input id="componentInput" value={component} onChange={(event) => setComponent(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400" placeholder="e.g. 6-axis servo motor, HS 8501.10" /><kbd className="hidden rounded bg-neutral-100 px-1.5 py-1 text-[9px] text-neutral-400 sm:block">⌘ K</kbd></div>
              <div className="mt-4 space-y-2"><button onClick={() => setComponent("Servo Motor · 6-axis")} className="flex w-full items-center gap-3 rounded-md border border-transparent p-2 text-left transition-colors hover:border-neutral-200 hover:bg-neutral-50"><Activity className="h-4 w-4 text-recon-green" /><span><strong className="block text-xs font-medium">Servo Motor · 6-axis</strong><small className="text-[10px] text-neutral-400">Industrial automation / HS 8501.10</small></span></button><button onClick={() => setComponent("Lithium battery module")} className="flex w-full items-center gap-3 rounded-md border border-transparent p-2 text-left transition-colors hover:border-neutral-200 hover:bg-neutral-50"><Layers3 className="h-4 w-4 text-amber-500" /><span><strong className="block text-xs font-medium">Lithium battery module</strong><small className="text-[10px] text-neutral-400">Energy systems / HS 8507.60</small></span></button></div>
              <label className="mt-4 flex cursor-pointer items-center gap-2 border-t border-neutral-100 pt-4 text-xs text-neutral-500 hover:text-recon-green"><Upload className="h-4 w-4" /><span><strong className="font-medium text-neutral-700">Have a BOM file?</strong><br /><small>Import CSV to match multiple components</small></span><input type="file" accept=".csv,text/csv" className="sr-only" /></label>
            </section>
            <section className="rounded-lg border border-neutral-200 bg-white p-5"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-recon-green" style={{ fontFamily: "Helvetica, sans-serif" }}>Regulatory context</p><h2 className="mt-2 font-display text-xl font-bold text-recon-black" style={{ fontFamily: "Assistant, sans-serif" }}>Compliance pulse</h2></div><Activity className="h-5 w-5 text-recon-green" /></div><div className="mt-6 flex items-center gap-3"><strong className="font-display text-5xl text-recon-black">82</strong><span className="text-xs text-neutral-400">/ 100<br /><small>readiness score</small></span><div className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-recon-green/20 border-t-recon-green"><span className="text-[10px] font-bold text-recon-green">82%</span></div></div><div className="mt-6 space-y-3 text-xs text-neutral-600"><div className="flex items-center gap-2" style={{ fontFamily: "Helvetica, sans-serif" }}><i className="h-2 w-2 rounded-full bg-recon-green" />Low-friction corridors <b className="ml-auto">14</b></div><div className="flex items-center gap-2" style={{ fontFamily: "Helvetica, sans-serif" }}><i className="h-2 w-2 rounded-full bg-amber-400" />Review recommended <b className="ml-auto">06</b></div><div className="flex items-center gap-2" style={{ fontFamily: "Helvetica, sans-serif" }}><i className="h-2 w-2 rounded-full bg-red-400" />Controls detected <b className="ml-auto">03</b></div></div><button className="mt-6 text-xs font-semibold text-recon-green hover:underline">Open compliance library <span>→</span></button></section>
          </div>

          <section className="mt-5 rounded-lg border border-neutral-200 bg-white p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-recon-green" style={{ fontFamily: "Helvetica, sans-serif" }}>Network matches <span className="text-neutral-400">05</span></p><h2 className="mt-2 font-display text-xl font-bold text-recon-black" style={{ fontFamily: "Assistant, sans-serif" }}>Distributor nodes</h2></div><div className="flex items-center gap-4 text-xs"><span className="flex items-center gap-1.5 text-recon-green"><i className="h-1.5 w-1.5 rounded-full bg-recon-green" /> Matching active</span><button className="inline-flex items-center gap-2 text-neutral-500 hover:text-recon-black"><SlidersHorizontal className="h-3.5 w-3.5" /> Filters</button></div></div><div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{nodes.map((node) => <button key={node.city} onClick={() => setSelectedOrigin(node.city)} className={`rounded-md border p-3 text-left transition-colors hover:border-recon-green ${selectedOrigin === node.city ? "border-recon-green bg-recon-green/5" : "border-neutral-200"}`}><div className="flex items-center justify-between"><span className="text-xs font-semibold text-neutral-800" style={{ fontFamily: "Assistant, sans-serif" }}>{node.city}</span><span className="text-[10px] font-bold text-recon-green">{node.score}</span></div><p className="mt-1 text-[10px] text-neutral-400">{node.region}</p></button>)}</div></section>
        </section>
      </div>
    </main>
  );
}
