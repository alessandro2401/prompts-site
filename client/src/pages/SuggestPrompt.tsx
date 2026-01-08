import { useState } from "react";
import { Link } from "wouter";
import { Send, ArrowLeft, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function SuggestPrompt() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    objetivo: "",
    conteudo: "",
    seuNome: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, categoria: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir corpo do email
    const subject = `Sugestão de Prompt: ${formData.titulo}`;
    const body = `
Nome do Sugerente: ${formData.seuNome}
Título do Prompt: ${formData.titulo}
Categoria Sugerida: ${formData.categoria}

Objetivo:
${formData.objetivo}

Conteúdo do Prompt:
${formData.conteudo}
    `.trim();

    // Abrir cliente de email
    window.location.href = `mailto:suporte@administradoramutual.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setIsSubmitted(true);
    toast({ 
      title: "Sugestão preparada!", 
      description: "Seu cliente de e-mail foi aberto para finalizar o envio." 
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-20 text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Obrigado pela sugestão!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Sua contribuição ajuda a tornar nossa biblioteca de prompts cada vez melhor para todos os creators.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Enviar outra sugestão
            </Button>
            <Button asChild>
              <Link href="/">Voltar para Início</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" asChild className="mb-6 pl-0 hover:pl-2 transition-all">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Início
          </Link>
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sugerir Novo Prompt</h1>
            <p className="text-muted-foreground">
              Compartilhe seus melhores prompts com a equipe e ajude a expandir nossa biblioteca.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Sugestão</CardTitle>
            <CardDescription>
              Preencha as informações abaixo para enviar sua sugestão via e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="seuNome">Seu Nome</Label>
                  <Input 
                    id="seuNome" 
                    name="seuNome" 
                    placeholder="Ex: João Silva" 
                    required 
                    value={formData.seuNome}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria Sugerida</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Criação de Conteúdo">Criação de Conteúdo</SelectItem>
                      <SelectItem value="Otimização e Estratégia">Otimização e Estratégia</SelectItem>
                      <SelectItem value="Vendas e Conversão">Vendas e Conversão</SelectItem>
                      <SelectItem value="Gestão e Produtividade">Gestão e Produtividade</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="titulo">Título do Prompt</Label>
                <Input 
                  id="titulo" 
                  name="titulo" 
                  placeholder="Ex: Gerador de Roteiros para Reels Virais" 
                  required 
                  value={formData.titulo}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo do Prompt</Label>
                <Input 
                  id="objetivo" 
                  name="objetivo" 
                  placeholder="Ex: Criar roteiros engajadores de 30 segundos focados em retenção" 
                  required 
                  value={formData.objetivo}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conteudo">Conteúdo do Prompt</Label>
                <Textarea 
                  id="conteudo" 
                  name="conteudo" 
                  placeholder="Cole aqui o prompt completo, incluindo variáveis entre [colchetes]..." 
                  className="min-h-[200px] font-mono text-sm"
                  required 
                  value={formData.conteudo}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Dica: Inclua contexto, instruções passo a passo e formato de saída desejado.
                </p>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto gap-2">
                  <Send className="h-4 w-4" /> Enviar Sugestão
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
