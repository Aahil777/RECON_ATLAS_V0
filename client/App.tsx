import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import ProjectDetails from "./pages/ProjectDetails";
import InventoryVisualisation from "./pages/InventoryVisualisation";
import BomReview from "./pages/BomReview";
import DatasheetCompliance from "./pages/DatasheetCompliance";
import ReconAtlasView from "./pages/ReconAtlasView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectDetails />} />
            <Route path="/inventory" element={<InventoryVisualisation />} />
            <Route path="/bom-review" element={<BomReview />} />
            <Route
              path="/datasheet-compliance"
              element={<DatasheetCompliance />}
            />
            <Route path="/atlas" element={<ReconAtlasView />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
