import { Wrench, ExternalLink, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dados das ferramentas BÔNUS
const tools = [
  {
    nome: "Asana AI",
    categoria: "Gestão e Produtividade",
    funcao: "Organização e automação de tarefas com inteligência artificial",
    descricao: "Asana AI ajuda equipes a organizar, priorizar e automatizar tarefas de forma inteligente, otimizando fluxos de trabalho e aumentando a produtividade.",
    url: "https://asana.com/ai",
    tags: ["Gestão", "Produtividade", "Automação"]
  },
  {
    nome: "Notion AI",
    categoria: "Criação de Conteúdo",
    funcao: "Geração de ideias e organização de conteúdo",
    descricao: "Notion AI transforma a forma como você cria e organiza conteúdo, oferecendo sugestões inteligentes e automação de escrita.",
    url: "https://www.notion.so/product/ai",
    tags: ["Conteúdo", "Organização", "Escrita"]
  },
  {
    nome: "Runway AI",
    categoria: "Criação de Conteúdo",
    funcao: "Criação e edição de vídeos com IA",
    descricao: "Runway AI oferece ferramentas avançadas de edição de vídeo e geração de conteúdo visual usando inteligência artificial.",
    url: "https://runwayml.com/",
    tags: ["Vídeo", "Edição", "Visual"]
  },
  {
    nome: "Surfer SEO",
    categoria: "Otimização e Estratégia",
    funcao: "Otimização de conteúdo para SEO",
    descricao: "Surfer SEO analisa e otimiza seu conteúdo para melhorar o ranqueamento nos mecanismos de busca, com insights baseados em dados.",
    url: "https://surferseo.com/",
    tags: ["SEO", "Otimização", "Análise"]
  },
  {
    nome: "AdCreative.ai",
    categoria: "Vendas e Conversão",
    funcao: "Geração de anúncios visuais com IA",
    descricao: "AdCreative.ai cria anúncios visuais de alta conversão automaticamente, otimizados para diferentes plataformas de publicidade.",
    url: "https://www.adcreative.ai/",
    tags: ["Anúncios", "Design", "Conversão"]
  },
  {
    nome: "InVideo AI",
    categoria: "Criação de Conteúdo",
    funcao: "Transformação de posts em vídeos",
    descricao: "InVideo AI converte posts de blog, artigos e textos em vídeos profissionais automaticamente, ideal para redes sociais.",
    url: "https://invideo.io/ai/",
    tags: ["Vídeo", "Automação", "Social Media"]
  },
  {
    nome: "Canva Magic Studio",
    categoria: "Criação de Conteúdo",
    funcao: "Design visual com ferramentas de IA",
    descricao: "Canva Magic Studio oferece ferramentas de design visual potencializadas por IA, facilitando a criação de conteúdo profissional.",
    url: "https://www.canva.com/magic-studio/",
    tags: ["Design", "Visual", "Criação"]
  },
  {
    nome: "Lumen5",
    categoria: "Criação de Conteúdo",
    funcao: "Transformação de conteúdo escrito em vídeos",
    descricao: "Lumen5 transforma seu conteúdo escrito, como posts de blog, em vídeos chamativos — ideal para reaproveitar conteúdo e distribuí-lo de forma atrativa em seus canais sociais.",
    url: "https://lumen5.com/",
    tags: ["Vídeo", "Automação", "Reaproveitamento"]
  },
  {
    nome: "Mailchimp",
    categoria: "Automação de E-mail",
    funcao: "Plataforma completa de e-mail marketing com automação",
    descricao: "Mailchimp oferece ferramentas completas para criação, envio e automação de campanhas de e-mail, com recursos de segmentação avançada, templates personalizáveis e análises detalhadas de desempenho.",
    url: "https://mailchimp.com/",
    tags: ["E-mail Marketing", "Automação", "Análise"]
  },
  {
    nome: "Klaviyo",
    categoria: "E-commerce E-mail Marketing",
    funcao: "Plataforma de e-mail marketing focada em e-commerce",
    descricao: "Klaviyo é especializada em e-mail marketing para e-commerce, oferecendo automações comportamentais avançadas, segmentação baseada em dados de compra e integrações profundas com plataformas de vendas.",
    url: "https://www.klaviyo.com/",
    tags: ["E-commerce", "Automação", "Personalização"]
  },
  {
    nome: "ConvertKit",
    categoria: "E-mail Marketing para Criadores",
    funcao: "Ferramenta de e-mail marketing para criadores de conteúdo",
    descricao: "ConvertKit é projetado especificamente para criadores de conteúdo, oferecendo automações visuais simples, landing pages integradas e ferramentas para monetização de audiência através de e-mail.",
    url: "https://convertkit.com/",
    tags: ["Criadores", "Automação", "Landing Pages"]
  },
  {
    nome: "Jasper AI",
    categoria: "Copywriting com IA",
    funcao: "Assistente de copywriting potencializado por IA",
    descricao: "Jasper AI é uma ferramenta de copywriting que usa inteligência artificial para gerar copy persuasivo, headlines, descrições de produtos, e-mails e conteúdo de vendas otimizado para conversão.",
    url: "https://www.jasper.ai/",
    tags: ["Copywriting", "IA", "Automação"]
  },
  {
    nome: "Copy.ai",
    categoria: "Geração de Copy",
    funcao: "Plataforma de geração de copy com templates",
    descricao: "Copy.ai oferece dezenas de templates para diferentes tipos de copy (anúncios, e-mails, landing pages, posts sociais) com geração rápida baseada em IA e otimização para conversão.",
    url: "https://www.copy.ai/",
    tags: ["Copy", "Templates", "IA"]
  },
  {
    nome: "Hemingway Editor",
    categoria: "Edição de Texto",
    funcao: "Editor que torna copy mais claro e direto",
    descricao: "Hemingway Editor analisa seu copy e sugere melhorias para torná-lo mais claro, conciso e fácil de ler, destacando frases complexas, voz passiva e palavras desnecessárias.",
    url: "https://hemingwayapp.com/",
    tags: ["Edição", "Clareza", "Legibilidade"]
  }
];

export default function Tools() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>14 Ferramentas Recomendadas</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Ferramentas de IA Recomendadas
        </h1>
        <p className="text-xl text-muted-foreground">
          Potencialize sua produtividade e criatividade com as melhores ferramentas de inteligência artificial do mercado.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.categoria}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {tool.nome}
                </CardTitle>
                <CardDescription className="font-medium text-sm">
                  {tool.funcao}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.descricao}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  asChild 
                  className="w-full group/btn"
                  variant="outline"
                >
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Visitar Site
                    <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center border-t mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Conhece alguma ferramenta incrível?
        </h2>
        <p className="text-muted-foreground mb-6">
          Ajude a comunidade sugerindo novas ferramentas de IA para nossa lista.
        </p>
        <Button asChild size="lg">
          <a href="/sugerir">Sugerir Ferramenta</a>
        </Button>
      </section>
    </Layout>
  );
}
