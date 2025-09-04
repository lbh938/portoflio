export const translations = {
  fr: {
    nav: {
      about: "À propos",
      projects: "Projets",
      aiGallery: "IA Gallery",
      contact: "Contact"
    },
    hero: {
      badge: "Expert en IA & Développement Web",
      title: "Créateur d&apos;expériences numériques innovantes",
      description: "Spécialisé dans la génération d&apos;images IA avec des prompts avancés et le développement d&apos;applications web modernes. Je transforme vos idées en réalité numérique.",
      cta1: "Voir mes projets",
      cta2: "Découvrir l&apos;IA"
    },
    skills: {
      title: "Expertise Technique",
      description: "Une combinaison unique de créativité IA et de compétences techniques avancées"
    },
    projects: {
      title: "Projets Web",
      description: "Applications web modernes et performantes, de la conception à la mise en production",
      viewProject: "Voir le projet"
    },
    aiGallery: {
      title: "Galerie IA",
      description: "Images générées par IA avec des prompts créatifs et techniques avancées",
      prompt: "Prompt utilisé",
      copy: "Copier",
      copied: "Copié !",
      generated: "Généré avec"
    },
    contact: {
      title: "Travaillons ensemble",
      description: "Prêt à donner vie à votre prochain projet ? Contactez-moi pour discuter de vos besoins.",
      contactTitle: "Contactez-moi",
      contactDescription: "Discutons de votre projet et de la façon dont je peux vous aider",
      startProject: "Démarrer un projet"
    },
    footer: {
      copyright: "© 2024 Portfolio. Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      contact: "Contact"
    }
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      aiGallery: "AI Gallery",
      contact: "Contact"
    },
    hero: {
      badge: "AI & Web Development Expert",
      title: "Creator of innovative digital experiences",
      description: "Specialized in AI image generation with advanced prompts and modern web application development. I transform your ideas into digital reality.",
      cta1: "View my projects",
      cta2: "Discover AI"
    },
    skills: {
      title: "Technical Expertise",
      description: "A unique combination of AI creativity and advanced technical skills"
    },
    projects: {
      title: "Web Projects",
      description: "Modern and performant web applications, from design to production",
      viewProject: "View project"
    },
    aiGallery: {
      title: "AI Gallery",
      description: "AI-generated images with creative and advanced technical prompts",
      prompt: "Prompt used",
      copy: "Copy",
      copied: "Copied!",
      generated: "Generated with"
    },
    contact: {
      title: "Let&apos;s work together",
      description: "Ready to bring your next project to life? Contact me to discuss your needs.",
      contactTitle: "Contact me",
      contactDescription: "Let&apos;s discuss your project and how I can help you",
      startProject: "Start a project"
    },
    footer: {
      copyright: "© 2024 Portfolio. All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy",
      contact: "Contact"
    }
  },
  es: {
    nav: {
      about: "Acerca de",
      projects: "Proyectos",
      aiGallery: "Galería IA",
      contact: "Contacto"
    },
    hero: {
      badge: "Experto en IA y Desarrollo Web",
      title: "Creador de experiencias digitales innovadoras",
      description: "Especializado en generación de imágenes IA con prompts avanzados y desarrollo de aplicaciones web modernas. Transformo tus ideas en realidad digital.",
      cta1: "Ver mis proyectos",
      cta2: "Descubrir IA"
    },
    skills: {
      title: "Experiencia Técnica",
      description: "Una combinación única de creatividad IA y habilidades técnicas avanzadas"
    },
    projects: {
      title: "Proyectos Web",
      description: "Aplicaciones web modernas y performantes, del diseño a la producción",
      viewProject: "Ver proyecto"
    },
    aiGallery: {
      title: "Galería IA",
      description: "Imágenes generadas por IA con prompts creativos y técnicos avanzados",
      prompt: "Prompt utilizado",
      copy: "Copiar",
      copied: "¡Copiado!",
      generated: "Generado con"
    },
    contact: {
      title: "Trabajemos juntos",
      description: "¿Listo para dar vida a tu próximo proyecto? Contáctame para discutir tus necesidades.",
      contactTitle: "Contáctame",
      contactDescription: "Discutamos tu proyecto y cómo puedo ayudarte",
      startProject: "Iniciar un proyecto"
    },
    footer: {
      copyright: "© 2024 Portfolio. Todos los derechos reservados.",
      legal: "Aviso legal",
      privacy: "Privacidad",
      contact: "Contacto"
    }
  },
  de: {
    nav: {
      about: "Über mich",
      projects: "Projekte",
      aiGallery: "KI Galerie",
      contact: "Kontakt"
    },
    hero: {
      badge: "KI & Webentwicklung Experte",
      title: "Schöpfer innovativer digitaler Erfahrungen",
      description: "Spezialisiert auf KI-Bildgenerierung mit fortgeschrittenen Prompts und moderner Webanwendungsentwicklung. Ich verwandle Ihre Ideen in digitale Realität.",
      cta1: "Meine Projekte ansehen",
      cta2: "KI entdecken"
    },
    skills: {
      title: "Technische Expertise",
      description: "Eine einzigartige Kombination aus KI-Kreativität und fortgeschrittenen technischen Fähigkeiten"
    },
    projects: {
      title: "Web-Projekte",
      description: "Moderne und leistungsstarke Webanwendungen, vom Design bis zur Produktion",
      viewProject: "Projekt ansehen"
    },
    aiGallery: {
      title: "KI Galerie",
      description: "KI-generierte Bilder mit kreativen und fortgeschrittenen technischen Prompts",
      prompt: "Verwendeter Prompt",
      copy: "Kopieren",
      copied: "Kopiert!",
      generated: "Generiert mit"
    },
    contact: {
      title: "Lassen Sie uns zusammenarbeiten",
      description: "Bereit, Ihr nächstes Projekt zum Leben zu erwecken? Kontaktieren Sie mich, um Ihre Bedürfnisse zu besprechen.",
      contactTitle: "Kontaktieren Sie mich",
      contactDescription: "Lassen Sie uns Ihr Projekt und wie ich Ihnen helfen kann besprechen",
      startProject: "Ein Projekt starten"
    },
    footer: {
      copyright: "© 2024 Portfolio. Alle Rechte vorbehalten.",
      legal: "Impressum",
      privacy: "Datenschutz",
      contact: "Kontakt"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.fr;
