import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import ChemicalListingPage from "./pages/ChemicalListingPage";
import ChemicalDetailPage from "./pages/ChemicalDetailPage";
import InteractivePeriodicTablePage from "./pages/InteractivePeriodicTablePage";
import GlossaryAndInfoPage from "./pages/GlossaryAndInfoPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chemical-listing" element={<ChemicalListingPage />} />
          <Route path="/chemical-detail/:id" element={<ChemicalDetailPage />} />
          <Route path="/periodic-table" element={<InteractivePeriodicTablePage />} />
          <Route path="/glossary-info" element={<GlossaryAndInfoPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;