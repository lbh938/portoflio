"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";
import { X, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface AIImage {
  id: number;
  image: string;
  prompt: string;
  title: string;
  model: string;
}

interface AIImageModalProps {
  image: AIImage | null;
  images: AIImage[];
  isOpen: boolean;
  onClose: () => void;
  onImageChange: (imageId: number) => void;
}

export function AIImageModal({ image, images, isOpen, onClose, onImageChange }: AIImageModalProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslations();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const copyPrompt = async () => {
    if (image?.prompt) {
      await navigator.clipboard.writeText(image.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentIndex = images.findIndex(img => img.id === image?.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      onImageChange(images[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      onImageChange(images[currentIndex + 1].id);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && hasPrevious) {
      goToPrevious();
    } else if (e.key === 'ArrowRight' && hasNext) {
      goToNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [hasPrevious, hasNext, goToPrevious, goToNext, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, hasPrevious, hasNext, handleKeyDown]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-background/20 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl">{image.title}</CardTitle>
            <CardDescription className="text-base">
              {t("aiGallery.generated")} {image.model}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {images.length}
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Image with Navigation */}
          <div className="aspect-video rounded-lg overflow-hidden relative border border-white/10 bg-white/5 group">
            {image.image && image.image.trim().length > 0 ? (
              <Image
                src={image.image}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/30" />
            )}
            
            {/* Navigation Arrows */}
            {hasPrevious && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            )}
            
            {hasNext && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            )}
          </div>
          
          {/* Prompt Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t("aiGallery.prompt")}</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyPrompt}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t("aiGallery.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t("aiGallery.copy")}
                  </>
                )}
              </Button>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 border">
              <p className="text-sm leading-relaxed font-mono">
                {image.prompt}
              </p>
            </div>
          </div>
          
          {/* Model Info */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{image.model}</Badge>
            <Badge variant="outline">IA Generated</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
