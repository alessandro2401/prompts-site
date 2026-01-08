import { Link } from "wouter";
import { Star, ChevronRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: {
    id: string;
    titulo: string;
    categoria: string;
    descricao?: string;
    conteudo?: string;
  };
  compact?: boolean;
}

export default function PromptCard({ prompt, compact = false }: PromptCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(prompt.id));
  }, [prompt.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== prompt.id);
      toast({ description: "Removido dos favoritos" });
    } else {
      newFavorites = [...favorites, prompt.id];
      toast({ description: "Adicionado aos favoritos" });
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (prompt.conteudo) {
      navigator.clipboard.writeText(prompt.conteudo);
      setIsCopied(true);
      toast({ description: "Prompt copiado para a área de transferência" });
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      toast({ description: "Conteúdo não disponível para cópia rápida" });
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      "criacao-conteudo": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      "otimizacao-estrategia": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      "vendas-conversao": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      "gestao-produtividade": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
      "favoritos": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    };
    return colors[cat] || "bg-gray-100 text-gray-800";
  };

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      "criacao-conteudo": "Criação de Conteúdo",
      "otimizacao-estrategia": "Otimização & Estratégia",
      "vendas-conversao": "Vendas & Conversão",
      "gestao-produtividade": "Gestão & Produtividade",
      "favoritos": "Favoritos"
    };
    return names[cat] || "Geral";
  };

  return (
    <Link href={`/prompt/${prompt.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <Badge variant="secondary" className={`mb-2 ${getCategoryColor(prompt.categoria)}`}>
              {getCategoryName(prompt.categoria)}
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={handleCopy}
                title="Copiar prompt"
              >
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${isFavorite ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground hover:text-yellow-500"}`}
                onClick={toggleFavorite}
                title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {prompt.titulo}
          </CardTitle>
        </CardHeader>
        
        {!compact && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {prompt.descricao || "Clique para ver o prompt completo e instruções de uso."}
            </p>
          </CardContent>
        )}
        
        <CardFooter className="pt-0 mt-auto">
          <div className="text-xs text-muted-foreground flex items-center gap-1 group-hover:translate-x-1 transition-transform ml-auto">
            Ver detalhes <ChevronRight className="h-3 w-3" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
