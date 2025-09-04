"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AIImageModal } from "@/components/ai-image-modal";
import { CookieConsent } from "@/components/cookie-consent";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Palette, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Mail, 
  Linkedin,
  ArrowRight,
  Play,
  Zap,
  Smartphone,
  Menu,
  X
} from "lucide-react";
// removed next/image for previews to avoid domain constraints

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, changeLanguage } = useTranslations();

  // Textes avec apostrophes pour éviter les erreurs ESLint
  const getHeroTitle = () => {
    switch(language) {
      case 'fr': return "Créateur d'expériences numériques innovantes";
      case 'en': return "Creator of innovative digital experiences";
      case 'es': return "Creador de experiencias digitales innovadoras";
      case 'de': return "Schöpfer innovativer digitaler Erfahrungen";
      default: return t("hero.title");
    }
  };

  const getHeroDescription = () => {
    switch(language) {
      case 'fr': return "Spécialisé dans la génération d'images IA avec des prompts avancés et le développement d'applications web modernes. Je transforme vos idées en réalité numérique.";
      case 'en': return "Specialized in AI image generation with advanced prompts and modern web application development. I transform your ideas into digital reality.";
      case 'es': return "Especializado en generación de imágenes IA con prompts avanzados y desarrollo de aplicaciones web modernas. Transformo tus ideas en realidad digital.";
      case 'de': return "Spezialisiert auf KI-Bildgenerierung mit fortgeschrittenen Prompts und moderner Webanwendungsentwicklung. Ich verwandle Ihre Ideen in digitale Realität.";
      default: return t("hero.description");
    }
  };

  const getHeroCta2 = () => {
    switch(language) {
      case 'fr': return "Découvrir l'IA";
      case 'en': return "Discover AI";
      case 'es': return "Descubrir IA";
      case 'de': return "KI entdecken";
      default: return t("hero.cta2");
    }
  };

  const getContactTitle = () => {
    switch(language) {
      case 'en': return "Let's work together";
      case 'fr': return "Travaillons ensemble";
      case 'es': return "Trabajemos juntos";
      case 'de': return "Lassen Sie uns zusammenarbeiten";
      default: return t("contact.title");
    }
  };

  const getContactDescription = () => {
    switch(language) {
      case 'en': return "Let's discuss your project and how I can help you";
      case 'fr': return "Discutons de votre projet et de la façon dont je peux vous aider";
      case 'es': return "Discutamos tu proyecto y cómo puedo ayudarte";
      case 'de': return "Lassen Sie uns Ihr Projekt und wie ich Ihnen helfen kann besprechen";
      default: return t("contact.contactDescription");
    }
  };

  const fallbackAiImages: Array<{id:number; image:string; prompt:string; title:string; model:string; featured:boolean}> = [];

  const fallbackWebProjects: Array<{id:number; title:string; description:string; image:string; technologies:string[]; liveUrl:string; githubUrl:string; featured:boolean}> = [];

  const skills = [
    { name: "AI Prompt Engineering", level: 95, icon: Sparkles },
    { name: "Web Development", level: 90, icon: Code },
    { name: "UI/UX Design", level: 85, icon: Palette },
    { name: "Mobile Development", level: 80, icon: Smartphone }
  ];

  const [aiImages, setAiImages] = useState(fallbackAiImages);
  const [webProjects, setWebProjects] = useState(fallbackWebProjects);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ai-images", { cache: "no-store" });
        const json = await res.json();
        if (Array.isArray(json.data) && json.data.length) {
          setAiImages(
            json.data.map((it: {
              id: number;
              image_url: string;
              prompt: string;
              title: string;
              model: string;
              featured: boolean;
            }) => ({
              id: it.id,
              image: it.image_url,
              prompt: it.prompt,
              title: it.title,
              model: it.model || "",
              featured: it.featured || false,
            })),
          );
        }
      } catch {}
      try {
        const res = await fetch("/api/web-projects", { cache: "no-store" });
        const json = await res.json();
        if (Array.isArray(json.data) && json.data.length) {
          setWebProjects(
            json.data.map((it: {
              id: number;
              title: string;
              description: string;
              image_url: string;
              technologies: string[];
              live_url: string;
              github_url: string;
              featured: boolean;
            }) => ({
              id: it.id,
              title: it.title,
              description: it.description,
              image: it.image_url,
              technologies: Array.isArray(it.technologies)
                ? it.technologies
                : String(it.technologies || "")
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
              liveUrl: it.live_url || "#",
              githubUrl: it.github_url || "#",
              featured: Boolean(it.featured),
            })),
          );
        }
      } catch {}
    })();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 smooth-scroll">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <h1 className="text-lg sm:text-xl font-semibold">Portfolio</h1>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#ai-gallery" className="text-sm hover:text-primary transition-colors">{t("nav.aiGallery")}</a>
              <a href="#projects" className="text-sm hover:text-primary transition-colors">{t("nav.projects")}</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">{t("nav.about")}</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">{t("nav.contact")}</a>
            </div>
          </div>
          
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
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
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <a 
                href="#ai-gallery" 
                className="block text-sm hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.aiGallery")}
              </a>
              <a 
                href="#projects" 
                className="block text-sm hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.projects")}
              </a>
              <a 
                href="#about" 
                className="block text-sm hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </a>
              <a 
                href="#contact" 
                className="block text-sm hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Artistic background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="radial-grid absolute inset-0 opacity-50" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass bg-background/20 backdrop-blur-xl border-white/20 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              {t("hero.badge")}
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              {getHeroTitle()}
            </h1>
            
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {getHeroDescription()}
            </p>

            {/* Mimojie presenter removed until provided via admin */}
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Button size="lg" className="group w-full sm:w-auto">
                {t("hero.cta1")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group w-full sm:w-auto">
                <Play className="mr-2 w-4 h-4" />
                {getHeroCta2()}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Gallery Section */}
      <section id="ai-gallery" className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("aiGallery.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("aiGallery.description")}
            </p>
          </div>
          
          {/* Grid alignée sur la section Projets Web (cartes 16:9, taille homogène) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {(() => {
              const featuredImages = aiImages.some((i) => i.featured) ? aiImages.filter((i) => i.featured) : aiImages;
              const imagesToShow = showAllImages ? featuredImages : featuredImages.slice(0, 6);
              return imagesToShow.map((image) => {
              const safeSrc = image.image && String(image.image).trim().length > 0 ? String(image.image) : null;
              return (
                <Card
                  key={image.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 glass bg-background/20 backdrop-blur-xl border-white/20 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image.id);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/5">
                    {safeSrc ? (
                      <Image
                        src={safeSrc}
                        alt={image.title}
                        width={400}
                        height={400}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/30" />
                    )}
                  </div>
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-base mb-1">{image.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mb-2">{image.model}</CardDescription>
                        {image.prompt && (
                          <div className="text-xs text-muted-foreground bg-muted/30 rounded p-2 max-h-16 overflow-y-auto card-scroll scroll-indicator">
                            <div className="space-y-1">
                              <span className="font-medium text-foreground">Prompt:</span>
                              <div className="text-muted-foreground leading-relaxed">
                                {image.prompt}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            });
            })()}
          </div>
          
          {/* Bouton Voir plus/moins */}
          {(() => {
            const featuredImages = aiImages.some((i) => i.featured) ? aiImages.filter((i) => i.featured) : aiImages;
            if (featuredImages.length > 6) {
              return (
                <div className="text-center mt-8 sm:mt-12">
                  <Button 
                    onClick={() => setShowAllImages(!showAllImages)}
                    variant="outline"
                    className="glass bg-background/20 backdrop-blur-xl border-white/20 hover:bg-white/30 w-full sm:w-auto"
                  >
                    {showAllImages ? t("aiGallery.seeLess") : t("aiGallery.seeMore")}
                  </Button>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </section>

      {/* Web Projects Section */}
      <section id="projects" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("projects.description")}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {(webProjects.some(p => p.featured) ? webProjects.filter(p => p.featured) : webProjects).map((project) => {
              const hasImage = project.image && project.image.trim().length > 0;
              return (
              <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 glass bg-background/20 backdrop-blur-xl border-white/20">
                <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/5">
                  {hasImage ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/30" />
                  )}
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2">{project.title}</CardTitle>
                      <div className="text-sm sm:text-base max-h-16 overflow-y-auto card-scroll scroll-indicator text-muted-foreground leading-relaxed">
                        {project.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="sm" className="flex-1 group" asChild>
                      <a href={project.liveUrl || "#"} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("projects.viewProject")}
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="sm:w-auto">
                      <a href={project.githubUrl || "#"} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section - Apple Style */}
      <section id="about" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6">{t("skills.title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("skills.description")}
            </p>
          </div>
          
          {/* Clean Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card key={index} className="group glass bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">{skill.name}</h3>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
                      <div 
                        className="bg-foreground h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.level}%</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{getContactTitle()}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="glass bg-background/20 backdrop-blur-xl border-white/20">
              <CardHeader className="text-center p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl">{t("contact.contactTitle")}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {getContactDescription()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button variant="outline" className="h-12 justify-start text-sm">
                    <Mail className="w-4 h-4 mr-3" />
                    contact@portfolio.com
                  </Button>
                  <Button variant="outline" className="h-12 justify-start text-sm">
                    <Linkedin className="w-4 h-4 mr-3" />
                    LinkedIn
                  </Button>
                </div>
                <div className="text-center">
                  <Button size="lg" className="w-full">
                    {t("contact.startProject")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t("footer.copyright")}
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm hover:text-primary transition-colors">{t("footer.legal")}</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="text-sm hover:text-primary transition-colors">{t("footer.contact")}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Image Modal */}
      <AIImageModal 
        image={selectedImage ? aiImages.find(img => img.id === selectedImage) || null : null}
        images={aiImages}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
        onImageChange={(imageId) => setSelectedImage(imageId)}
      />

      {/* Cookie Consent */}
      <CookieConsent 
        onAccept={() => console.log('Cookies accepted')}
        onReject={() => console.log('Cookies rejected')}
        onCustomize={() => console.log('Customize cookies')}
      />
    </main>
  );
}
