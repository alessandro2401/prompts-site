import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Search, Filter, PenTool, TrendingUp, DollarSign, Clock, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import PromptCard from "@/components/PromptCard";
import promptsData from "@/data/prompts.json";

// Tipos (mesmos da Home)
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

export default function Category() {
  const [match, params] = useRoute("/categoria/:id");
  const categoryId = params?.id || "";
  const data = promptsData as unknown as PromptsData;
  const category = data[categoryId];

  const categoryIcons: Record<string, any> = {
    "criacao-conteudo": PenTool,
    "otimizacao-estrategia": TrendingUp,
    "vendas-conversao": DollarSign,
    "gestao-produtividade": Clock,
    "mega-prompts": Sparkles,
    "favoritos": Star
  };

  const IconComponent = categoryIcons[categoryId] || Sparkles;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    if (category) {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const filtered = category.prompts.filter(p => 
          p.titulo.toLowerCase().includes(query) || 
          (p.descricao && p.descricao.toLowerCase().includes(query))
        );
        setFilteredPrompts(filtered);
      } else {
        setFilteredPrompts(category.prompts);
      }
    }
  }, [category, searchQuery]);

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <Button asChild>
            <Link href="/">Voltar para Início</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4 pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <IconComponent className="h-8 w-8" />
              </div>
              {category.nome}
            </h1>
            <p className="text-muted-foreground mt-2">
              {category.prompts.length} prompts disponíveis nesta categoria
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Buscar em ${category.nome}...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg bg-muted/10">
          <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-medium mb-2">Nenhum prompt encontrado</h3>
          <p className="text-muted-foreground">
            Tente buscar com outros termos ou limpe a busca.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
            Limpar busca
          </Button>
        </div>
      )}
    </Layout>
  );
}
