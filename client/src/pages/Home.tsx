import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Sparkles, PenTool, TrendingUp, DollarSign, Clock, Star, ArrowRight } from "lucide-react";
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

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [featuredPrompts, setFeaturedPrompts] = useState<Prompt[]>([]);
  
  const data = promptsData as unknown as PromptsData;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);

    // Selecionar alguns prompts para destaque (aleatório ou fixo)
    const allPrompts: Prompt[] = [];
    Object.values(data).forEach(cat => {
      if (cat && Array.isArray(cat.prompts)) {
        allPrompts.push(...cat.prompts);
      }
    });
    
    // Embaralhar e pegar 4
    const shuffled = allPrompts.sort(() => 0.5 - Math.random());
    setFeaturedPrompts(shuffled.slice(0, 4));
  }, []);

  const categories = [
    { id: "criacao-conteudo", icon: PenTool, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
    { id: "otimizacao-estrategia", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
    { id: "vendas-conversao", icon: DollarSign, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/30" },
    { id: "gestao-produtividade", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
    { id: "mega-prompts", icon: Sparkles, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/30" },
    { id: "perguntas-frequentes", icon: Search, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
    { id: "midia-social", icon: Star, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950/30" },
    { id: "marketing-email", icon: Star, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
    { id: "growth-hacking", icon: Star, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>260 Prompts Profissionais Disponíveis</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-2">
          Domine a Criação de Conteúdo com IA
        </h1>
        <p className="text-xl text-muted-foreground">
          Uma biblioteca completa de prompts testados e validados para impulsionar seu Instagram, aumentar engajamento e gerar vendas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="O que você quer criar hoje?" 
              className="pl-10 h-12 text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery) {
                  window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
            />
          </div>
          <Button size="lg" className="h-12 px-8 shadow-md" onClick={() => window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`}>
            Buscar
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span className="w-1 h-8 bg-primary rounded-full"></span>
          Navegue por Categorias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const categoryData = data[cat.id];
            const Icon = cat.icon;
            
            return (
              <Link key={cat.id} href={`/categoria/${cat.id}`}>
                <div className={`group h-full p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer ${cat.bg}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white dark:bg-background shadow-sm group-hover:scale-110 transition-transform ${cat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {categoryData?.nome || cat.id}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {categoryData?.prompts.length || 0} prompts disponíveis
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    Explorar <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Prompts */}
      <section className="py-12 border-t">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              Destaques da Semana
            </h2>
            <p className="text-muted-foreground">Prompts populares que estão gerando resultados agora.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/categoria/favoritos">Ver todos <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link href="/categoria/favoritos">Ver todos os destaques</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
