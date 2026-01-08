import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Category from "./pages/Category";
import PromptDetail from "./pages/PromptDetail";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import SuggestPrompt from "./pages/SuggestPrompt";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categoria/:id" component={Category} />
      <Route path="/prompt/:id" component={PromptDetail} />
      <Route path="/busca" component={Search} />
      <Route path="/favoritos" component={Favorites} />
      <Route path="/sugerir" component={SuggestPrompt} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
