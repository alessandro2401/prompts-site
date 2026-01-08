import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function Favorites() {
  const [favorites, setFavorites] = useState<Prompt[]>([]);
  const data = promptsData as unknown as PromptsData;

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    
    const allPrompts: Prompt[] = [];
    Object.values(data).forEach(cat => {
      allPrompts.push(...cat.prompts);
    });
    
    const favoritePrompts = allPrompts.filter(p => savedIds.includes(p.id));
    setFavorites(favoritePrompts);
  }, []);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Meus Favoritos</h1>
            <p className="text-muted-foreground">
              {favorites.length} prompts salvos para acesso rápido
            </p>
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border rounded-xl bg-muted/10">
            <Star className="h-16 w-16 mx-auto text-muted-foreground mb-6 opacity-20" />
            <h3 className="text-xl font-bold mb-3">Você ainda não tem favoritos</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Navegue pelos prompts e clique na estrela para salvá-los aqui e criar sua própria biblioteca personalizada.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Explorar Prompts</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
