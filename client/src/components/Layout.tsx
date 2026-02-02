import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline-block">Criação com IA</span>
              <span className="sm:hidden">IA</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/" className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                Início
              </Link>
              <Link href="/ferramentas" className={location === "/ferramentas" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
                Ferramentas
              </Link>
              <a href="https://sistemas.administradoramutual.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                Voltar para Sistemas
              </a>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4 bg-background">
            <nav className="flex flex-col gap-2">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-muted rounded-md">
                Início
              </Link>
              <Link href="/ferramentas" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-muted rounded-md">
                Ferramentas
              </Link>
              <a href="https://sistemas.administradoramutual.com.br" className="px-4 py-2 hover:bg-muted rounded-md text-muted-foreground">
                Voltar para Sistemas
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 bg-muted/30">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Administradora Mutual. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Termos</a>
            <a href="#" className="hover:text-primary">Privacidade</a>
            <a href="https://docs.administradoramutual.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Documentação</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
