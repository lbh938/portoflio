"use client";

import { useState } from "react";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { CookieConsent } from "@/components/cookie-consent";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  ExternalLink, 
  Github, 
  Mail, 
  ArrowRight,
  Globe,
  Sparkles,
  Menu,
  X,
  Zap,
  Palette
} from "lucide-react";

// Fonction helper pour générer une URL de preview de site
// Utilisation de l'API Next.js pour générer des screenshots réels
const getPreviewUrl = (url: string) => {
  // Utiliser notre route API pour générer les screenshots
  // L'API va générer un vrai screenshot du site
  return `/api/preview?url=${encodeURIComponent(url)}`;
};

// Liste des projets web fournis avec previews
const featuredWebProjects = [
  {
    id: 1,
    title: "Cephalox",
    description: "Plateforme web moderne avec une interface élégante et une expérience utilisateur fluide.",
    image: getPreviewUrl("https://cephalox.netlify.app"),
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://cephalox.netlify.app",
    githubUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "AI Miner Sol",
    description: "Solution innovante pour l'extraction de données avec intelligence artificielle intégrée.",
    image: getPreviewUrl("https://aiminersol.netlify.app/"),
    technologies: ["Next.js", "AI", "TypeScript", "Vercel"],
    liveUrl: "https://aiminersol.netlify.app/",
    githubUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Majida Glam",
    description: "Site web premium avec un design sophistiqué et des performances optimisées. Plateforme élégante et moderne.",
    image: getPreviewUrl("https://majidaglam.com"),
    technologies: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://majidaglam.com",
    githubUrl: "#",
    featured: true
  },
  {
    id: 4,
    title: "Oryz",
    description: "Application web performante avec une architecture moderne et scalable.",
    image: getPreviewUrl("https://oryz-tau.vercel.app"),
    technologies: ["Next.js", "TypeScript", "Vercel"],
    liveUrl: "https://oryz-tau.vercel.app",
    githubUrl: "#",
    featured: true
  },
  {
    id: 5,
    title: "Aide République",
    description: "Plateforme citoyenne pour faciliter l'accès aux services publics.",
    image: getPreviewUrl("https://aiderepublique.vercel.app"),
    technologies: ["Next.js", "React", "Vercel"],
    liveUrl: "https://aiderepublique.vercel.app",
    githubUrl: "#",
    featured: true
  },
  {
    id: 6,
    title: "Location IDF 93",
    description: "Application web spécialisée pour la location dans le 93. Interface intuitive et fonctionnalités avancées.",
    image: getPreviewUrl("https://locidf-eaat.vercel.app"),
    technologies: ["Next.js", "TypeScript", "Vercel"],
    liveUrl: "https://locidf-eaat.vercel.app",
    githubUrl: "#",
    featured: true
  },
  {
    id: 7,
    title: "Sasswiss",
    description: "Solution SaaS moderne avec une architecture cloud-native et des performances optimisées.",
    image: getPreviewUrl("https://sasswiss.vercel.app"),
    technologies: ["Next.js", "SaaS", "TypeScript", "Vercel"],
    liveUrl: "https://sasswiss.vercel.app",
    githubUrl: "#",
    featured: true
  }
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<{ url: string; title: string } | null>(null);
  const { t, language, changeLanguage } = useTranslations();

  const getHeroTitle = () => {
    switch(language) {
      case 'fr': return "Créateur d'expériences web d'exception";
      case 'en': return "Creator of exceptional web experiences";
      case 'es': return "Creador de experiencias web excepcionales";
      case 'de': return "Schöpfer außergewöhnlicher Web-Erlebnisse";
      default: return "Creator of exceptional web experiences";
    }
  };

  const getHeroDescription = () => {
    switch(language) {
      case 'fr': return "Spécialisé dans le développement d'applications web modernes, performantes et élégantes. Je transforme vos idées en expériences digitales mémorables.";
      case 'en': return "Specialized in developing modern, performant and elegant web applications. I transform your ideas into memorable digital experiences.";
      case 'es': return "Especializado en el desarrollo de aplicaciones web modernas, performantes y elegantes. Transformo tus ideas en experiencias digitales memorables.";
      case 'de': return "Spezialisiert auf die Entwicklung moderner, leistungsstarker und eleganter Webanwendungen. Ich verwandle Ihre Ideen in unvergessliche digitale Erfahrungen.";
      default: return "Specialized in developing modern, performant and elegant web applications.";
    }
  };

  const getProjectsTitle = () => {
    switch(language) {
      case 'fr': return "Mes Projets Web";
      case 'en': return "My Web Projects";
      case 'es': return "Mis Proyectos Web";
      case 'de': return "Meine Web-Projekte";
      default: return "My Web Projects";
    }
  };

  const getProjectsDescription = () => {
    switch(language) {
      case 'fr': return "Découvrez une sélection de projets web modernes, chacun conçu avec attention aux détails et optimisé pour la performance.";
      case 'en': return "Discover a selection of modern web projects, each designed with attention to detail and optimized for performance.";
      case 'es': return "Descubre una selección de proyectos web modernos, cada uno diseñado con atención al detalle y optimizado para el rendimiento.";
      case 'de': return "Entdecken Sie eine Auswahl moderner Web-Projekte, jedes mit Liebe zum Detail gestaltet und für Performance optimiert.";
      default: return "Discover modern web projects designed with attention to detail.";
    }
  };

  const getSkillsTitle = () => {
    switch(language) {
      case 'fr': return "Expertise Technique";
      case 'en': return "Technical Expertise";
      case 'es': return "Experiencia Técnica";
      case 'de': return "Technische Expertise";
      default: return "Technical Expertise";
    }
  };

  const getSkillsDescription = () => {
    switch(language) {
      case 'fr': return "Une maîtrise approfondie des technologies web modernes pour créer des expériences exceptionnelles";
      case 'en': return "Deep expertise in modern web technologies to create exceptional experiences";
      case 'es': return "Experiencia profunda en tecnologías web modernas para crear experiencias excepcionales";
      case 'de': return "Tiefgreifende Expertise in modernen Web-Technologien für außergewöhnliche Erfahrungen";
      default: return "Deep expertise in modern web technologies";
    }
  };

  const getContactTitle = () => {
    switch(language) {
      case 'en': return "Let's work together";
      case 'fr': return "Travaillons ensemble";
      case 'es': return "Trabajemos juntos";
      case 'de': return "Lassen Sie uns zusammenarbeiten";
      default: return "Let's work together";
    }
  };

  const getContactDescription = () => {
    switch(language) {
      case 'en': return "Ready to bring your next web project to life? Let's discuss how I can help you.";
      case 'fr': return "Prêt à donner vie à votre prochain projet web ? Discutons de la façon dont je peux vous aider.";
      case 'es': return "¿Listo para dar vida a tu próximo proyecto web? Hablemos de cómo puedo ayudarte.";
      case 'de': return "Bereit, Ihr nächstes Web-Projekt zum Leben zu erwecken? Lassen Sie uns besprechen, wie ich Ihnen helfen kann.";
      default: return "Ready to bring your next web project to life?";
    }
  };

  const skills = [
    { name: "Web Development", level: 95, icon: Code, description: "Next.js, React, TypeScript" },
    { name: "UI/UX Design", level: 90, icon: Palette, description: "Modern & intuitive interfaces" },
    { name: "Performance", level: 92, icon: Zap, description: "Optimized & scalable" },
    { name: "Innovation", level: 88, icon: Sparkles, description: "Cutting-edge solutions" }
  ];

  // Utiliser directement les projets locaux pour éviter les erreurs d'hydratation
  // et garantir que les noms sont toujours corrects (serveur = client)
  const webProjects = featuredWebProjects;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 smooth-scroll overflow-x-hidden">
      {/* Navigation - Premium Glassmorphism */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#projects" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
                {t("nav.projects")}
              </a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
                {t("nav.about")}
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
                {t("nav.contact")}
              </a>
            </div>
          </div>
          
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-white/5 backdrop-blur-2xl">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a 
                href="#projects" 
                className="block text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.projects")}
              </a>
              <a 
                href="#about" 
                className="block text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </a>
              <a 
                href="#contact" 
                className="block text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Premium Glassmorphism Background avec halo dégradé */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Halo principal dégradé radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.15),hsl(var(--accent)/0.1),transparent_70%)]" />
          
          {/* Orbes animés avec dégradés colorés */}
          <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-accent/20 via-accent/10 to-transparent blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-secondary/15 via-primary/10 to-transparent blur-3xl animate-blob animation-delay-4000" />
          
          {/* Halo supplémentaire pour plus de profondeur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.08),hsl(var(--accent)/0.05),transparent)] blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-sm font-medium mb-8 hover:scale-105 transition-transform duration-300">
              <Globe className="w-4 h-4" />
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Expert en Développement Web
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-b from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
              {getHeroTitle()}
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              {getHeroDescription()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="group px-8 py-6 text-base bg-background/50 hover:bg-background/80 border-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow" asChild>
                <a href="mailto:lbhstorewrld@outlook.com">
                  <Mail className="mr-2 w-5 h-5" />
                  Me contacter
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Web Projects Section - Premium Grid */}
      <section id="projects" className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {getProjectsTitle()}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {getProjectsDescription()}
            </p>
          </div>
          
          {/* Premium Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {(webProjects.some(p => p.featured) ? webProjects.filter(p => p.featured) : webProjects).map((project, index) => {
              const hasImage = project.image && project.image.trim().length > 0;
              return (
              <Card 
                key={project.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 glass-premium bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-white/20 hover:border-white/40 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-t-xl border-b border-white/10 bg-gradient-to-br from-white/5 to-white/0">
                  {hasImage ? (
                    <div 
                      className="aspect-video relative group/image cursor-pointer"
                      onClick={() => setSelectedPreview({ url: project.liveUrl, title: project.title })}
                    >
                      {/* Screenshot du site affiché directement */}
                      <Image
                        src={project.image}
                        alt={`Aperçu de ${project.title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        unoptimized
                        priority={index < 2}
                        onError={(e) => {
                          // Fallback si le screenshot ne charge pas
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="image-fallback hidden aspect-video bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 items-center justify-center absolute inset-0">
                        <Globe className="w-16 h-16 text-muted-foreground/50" />
                        <p className="absolute bottom-4 text-xs text-muted-foreground">Chargement de l&apos;aperçu...</p>
                      </div>
                      {/* Overlay au survol pour indiquer qu'on peut cliquer pour voir en grand */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <div className="glass-premium bg-white/30 backdrop-blur-xl border-white/40 px-4 py-2 rounded-lg shadow-lg">
                          <p className="text-white font-medium text-sm flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Voir en plein écran
                          </p>
                        </div>
                      </div>
                      {/* Badge indiquant que c'est un screenshot */}
                      <div className="absolute top-2 right-2 glass-premium bg-black/40 backdrop-blur-md border-white/20 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        📸 Aperçu live
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedPreview({ url: project.liveUrl, title: project.title })}
                    >
                      <Globe className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                <CardHeader className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="glass-premium bg-white/10 border-white/20 text-xs px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      size="lg" 
                      className="flex-1 group/btn bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 border-0" 
                      asChild
                    >
                      <a href={project.liveUrl || "#"} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        Visiter le site
                      </a>
                    </Button>
                    {project.githubUrl && project.githubUrl !== "#" && (
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="bg-background/50 hover:bg-background/80 border-white/20 hover:border-white/30 sm:w-auto shadow-sm hover:shadow transition-all duration-300" 
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section - Apple Style Cards */}
      <section id="about" className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {getSkillsTitle()}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {getSkillsDescription()}
            </p>
          </div>
          
          {/* Premium Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={index} 
                  className="group glass-premium bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-white/20 hover:border-white/40 hover:scale-105 transition-all duration-500 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 glass-premium bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">{skill.description}</p>
                    <div className="w-full glass-premium bg-white/5 rounded-full h-2 mb-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{skill.level}%</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section - Premium Glassmorphism */}
      <section id="contact" className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              {getContactTitle()}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {getContactDescription()}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="glass-premium bg-white/10 dark:bg-white/5 backdrop-blur-2xl border-white/20 hover:shadow-2xl transition-all duration-500">
              <CardHeader className="text-center p-8 sm:p-10">
                <CardTitle className="text-3xl sm:text-4xl font-bold mb-4">
                  {t("contact.contactTitle")}
                </CardTitle>
                <CardDescription className="text-lg">
                  {getContactDescription()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8 sm:p-10 pt-0">
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="h-14 px-8 bg-background/50 hover:bg-background/80 border-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow" 
                    asChild
                  >
                    <a href="mailto:lbhstorewrld@outlook.com">
                      <Mail className="w-5 h-5 mr-3" />
                      Email
                    </a>
                  </Button>
                </div>
                <div className="text-center pt-4">
                  <Button 
                    size="lg" 
                    className="w-full px-8 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0"
                  >
                    {t("contact.startProject")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t("footer.copyright")}
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm hover:text-primary transition-colors">
                {t("footer.legal")}
              </a>
              <a href="#" className="text-sm hover:text-primary transition-colors">
                {t("footer.privacy")}
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                {t("footer.contact")}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Preview */}
      {selectedPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPreview(null)}
        >
          <div 
            className="relative w-full max-w-7xl h-[90vh] glass-premium bg-background/95 backdrop-blur-2xl border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-xl font-semibold">{selectedPreview.title}</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(selectedPreview.url, '_blank')}
                  className="hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvrir dans un nouvel onglet
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPreview(null)}
                  className="hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Iframe Preview */}
            <div className="relative w-full h-[calc(90vh-80px)]">
              <iframe
                src={selectedPreview.url}
                className="w-full h-full border-0"
                title={`Preview de ${selectedPreview.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent */}
      <CookieConsent 
        onAccept={() => console.log('Cookies accepted')}
        onReject={() => console.log('Cookies rejected')}
        onCustomize={() => console.log('Customize cookies')}
      />
    </main>
  );
}