import { useState } from "react";
import { Link } from "wouter";
import { Sparkles, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Crie Conteúdo Profissional com Inteligência Artificial</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-2">
          Criação de conteúdo com IA
        </h1>
        <p className="text-xl text-muted-foreground">
          Utilize as melhores ferramentas de inteligência artificial para criar conteúdo profissional, impulsionar seu Instagram, aumentar engajamento e gerar vendas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button size="lg" className="h-12 px-8 shadow-md" asChild>
            <Link href="/ferramentas">
              <Wrench className="mr-2 h-5 w-5" />
              Ver Ferramentas de IA
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Transforme sua Criação de Conteúdo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra ferramentas poderosas de IA para design, copywriting, vídeo, automação de e-mail, análise de dados e muito mais. Tudo que você precisa para levar seu conteúdo ao próximo nível.
            </p>
            <Button size="lg" variant="default" className="h-12 px-8 shadow-md" asChild>
              <Link href="/ferramentas">
                Explorar Ferramentas <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Por que usar Ferramentas de IA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Produtividade</h3>
              <p className="text-muted-foreground">
                Crie conteúdo profissional em minutos, não em horas
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center">
                <Wrench className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">Qualidade</h3>
              <p className="text-muted-foreground">
                Ferramentas profissionais usadas por grandes marcas
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">Resultados</h3>
              <p className="text-muted-foreground">
                Aumente engajamento e conversões com IA
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
