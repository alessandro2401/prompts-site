import { useState, useEffect, lazy, Suspense } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Copy, Check, Star, Share2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import promptsData from "@/data/prompts.json";
import { useToast } from "@/hooks/use-toast";

// Dynamic import do Streamdown para evitar carregar mermaid/shiki/cytoscape no bundle principal
const Streamdown = lazy(() =>
  import("streamdown").then((mod) => ({ default: mod.Streamdown }))
);

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

// Fallback de loading para o markdown renderer
function MarkdownLoader() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-4 bg-muted rounded w-2/3" />
    </div>
  );
}

export default function PromptDetail() {
  const [match, params] = useRoute("/prompt/:id");
  const promptId = params?.id || "";
  const data = promptsData as unknown as PromptsData;
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Encontrar o prompt em todas as categorias
    let foundPrompt: Prompt | null = null;
    let foundCatName = "";

    Object.entries(data).forEach(([catId, catData]) => {
      const p = catData.prompts.find(p => p.id === promptId);
      if (p) {
        foundPrompt = p;
        foundCatName = catData.nome;
      }
    });

    setPrompt(foundPrompt);
    setCategoryName(foundCatName);

    if (foundPrompt) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(promptId));
    }
  }, [promptId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== promptId);
      toast({ description: "Removido dos favoritos" });
    } else {
      newFavorites = [...favorites, promptId];
      toast({ description: "Adicionado aos favoritos" });
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const copyToClipboard = () => {
    if (prompt?.conteudo) {
      navigator.clipboard.writeText(prompt.conteudo);
      setCopied(true);
      toast({ description: "Prompt copiado para a área de transferência!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Prompt não encontrado</h1>
          <Button asChild>
            <Link href="/">Voltar para Início</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" asChild className="mb-6 pl-0 hover:pl-2 transition-all">
          <Link href={`/categoria/${prompt.categoria}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para {categoryName}
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {categoryName}
              </Badge>
              {isFavorite && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                  <Star className="h-3 w-3 mr-1 fill-yellow-600" /> Favorito
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-primary">
              {prompt.titulo}
            </h1>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="icon" onClick={toggleFavorite} title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
              <Star className={`h-5 w-5 ${isFavorite ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
            </Button>
            <Button variant="outline" size="icon" title="Compartilhar">
              <Share2 className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button size="lg" onClick={copyToClipboard} className="gap-2 shadow-md">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "Copiado!" : "Copiar Prompt"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Conteúdo */}
          <div className="lg:col-span-2 space-y-8">
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">Como usar este prompt</AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400 mt-2">
                Copie o conteúdo abaixo e cole no ChatGPT, Claude ou Gemini. Substitua as informações entre colchetes [ ] pelos dados do seu negócio.
              </AlertDescription>
            </Alert>

            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
              <div className="bg-muted/50 px-6 py-3 border-b flex justify-between items-center">
                <span className="font-mono text-sm text-muted-foreground">prompt.md</span>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={copyToClipboard}>
                  {copied ? "Copiado" : "Copiar código"}
                </Button>
              </div>
              <div className="p-6 prose prose-blue max-w-none dark:prose-invert">
                <Suspense fallback={<MarkdownLoader />}>
                  <Streamdown>
                    {prompt.conteudo || "Carregando conteúdo..."}
                  </Streamdown>
                </Suspense>
              </div>
            </div>
          </div>

          {/* Sidebar - Dicas e Info */}
          <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Dicas de Otimização
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Seja específico nas variáveis para melhores resultados.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Peça para a IA refinar o tom de voz se necessário.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Use o comando "Continue" se a resposta for cortada.</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Prompts Relacionados
              </h3>
              <div className="space-y-4">
                {/* Aqui poderíamos listar prompts da mesma categoria */}
                <p className="text-sm text-muted-foreground italic">
                  Explore a categoria {categoryName} para ver mais opções.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/categoria/${prompt.categoria}`}>Ver Categoria</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
