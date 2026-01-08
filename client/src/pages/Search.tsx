import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import PromptCard from "@/components/PromptCard";
import promptsData from "@/data/prompts.json";

// Tipos
type Prompt = {
  id: string;
  titulo: string;
  categoria: string;
  arquivo: string;
  conteudo?: string;
  descricao?: string;
};

type CategoryData = {
  nome: string;
  icone: string;
  emoji: string;
  prompts: Prompt[];
};

type PromptsData = Record<string, CategoryData>;

export default function Search() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Prompt[]>([]);
  const data = promptsData as unknown as PromptsData;

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const allPrompts: Prompt[] = [];
      
      Object.values(data).forEach(cat => {
        allPrompts.push(...cat.prompts);
      });
      
      const filtered = allPrompts.filter(p => 
        p.titulo.toLowerCase().includes(q) || 
        (p.descricao && p.descricao.toLowerCase().includes(q)) ||
        (p.conteudo && p.conteudo.toLowerCase().includes(q))
      );
      
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6">Resultados da Busca</h1>
        
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Busque por palavras-chave, objetivos ou nichos..." 
            className="pl-10 h-12 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 h-8 w-8"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {query ? (
          <>
            <p className="text-muted-foreground mb-6">
              Encontrados {results.length} resultados para "{query}"
            </p>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border rounded-lg bg-muted/10">
                <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground">
                  Tente usar termos mais genéricos ou verifique a ortografia.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-lg font-medium mb-2">Digite algo para buscar</h3>
            <p className="text-muted-foreground">
              Busque entre os 96 prompts disponíveis na biblioteca.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
