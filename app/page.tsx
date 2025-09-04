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
  Smartphone
} from "lucide-react";
// removed next/image for previews to avoid domain constraints

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language, changeLanguage } = useTranslations();

  const fallbackAiImages: Array<{id:number; image:string; prompt:string; title:string; model:string}> = [];

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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold">Portfolio</h1>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-sm hover:text-primary transition-colors">{t("nav.about")}</a>
              <a href="#projects" className="text-sm hover:text-primary transition-colors">{t("nav.projects")}</a>
              <a href="#ai-gallery" className="text-sm hover:text-primary transition-colors">{t("nav.aiGallery")}</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">{t("nav.contact")}</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            <ThemeSwitcher />
          </div>
        </div>
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

        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-background/20 backdrop-blur-xl border-white/20 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              {t("hero.badge")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {t("hero.title")}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>

            {/* Mimojie presenter removed until provided via admin */}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                {t("hero.cta1")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-4 h-4" />
                {t("hero.cta2")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("skills.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("skills.description")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 glass bg-background/20 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
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

      {/* Web Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("projects.description")}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {(webProjects.some(p => p.featured) ? webProjects.filter(p => p.featured) : webProjects).map((project) => {
              const hasImage = project.image && project.image.trim().length > 0;
              return (
              <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 glass bg-background/20 backdrop-blur-xl border-white/20">
                <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-white/5">
                  {hasImage ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/30" />
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">{project.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 group" asChild>
                      <a href={project.liveUrl || "#"} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("projects.viewProject")}
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
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

      {/* AI Gallery Section */}
      <section id="ai-gallery" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("aiGallery.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("aiGallery.description")}
            </p>
          </div>

          {/* Grid alignée sur la section Projets Web (cartes 16:9, taille homogène) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(aiImages.some((i) => i.featured) ? aiImages.filter((i) => i.featured) : aiImages).map((image) => {
              const safeSrc = image.image && String(image.image).trim().length > 0 ? String(image.image) : null;
              return (
                <Card
                  key={image.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 glass bg-background/20 backdrop-blur-xl border-white/20"
                  onClick={() => {
                    setSelectedImage(image.id);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-white/5">
                    {safeSrc ? (
                      <Image
                        src={safeSrc}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/30" />
                    )}
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base mb-1 truncate">{image.title}</CardTitle>
                        <CardDescription className="text-xs text-muted-foreground">{image.model}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="glass bg-background/20 backdrop-blur-xl border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t("contact.contactTitle")}</CardTitle>
                <CardDescription>
                  {t("contact.contactDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 justify-start">
                    <Mail className="w-4 h-4 mr-3" />
                    contact@portfolio.com
                  </Button>
                  <Button variant="outline" className="h-12 justify-start">
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
