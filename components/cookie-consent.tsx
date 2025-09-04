"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Cookie, Settings, Check } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}

export function CookieConsent({ onAccept, onReject, onCustomize }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
    onReject();
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
    onCustomize();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 max-w-md mx-auto">
      <Card className="bg-background/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Cookies</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleReject}
              className="h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <CardDescription className="text-sm">
            Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {showDetails && (
            <div className="space-y-3 p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cookies essentiels</p>
                  <p className="text-xs text-muted-foreground">Nécessaires au fonctionnement</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Check className="w-3 h-3 mr-1" />
                  Activés
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cookies analytiques</p>
                  <p className="text-xs text-muted-foreground">Pour améliorer le site</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Optionnel
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cookies marketing</p>
                  <p className="text-xs text-muted-foreground">Pour la publicité</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Optionnel
                </Badge>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleAccept}
                className="flex-1"
              >
                Accepter tout
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReject}
                className="flex-1"
              >
                Rejeter
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCustomize}
              className="w-full gap-2"
            >
              <Settings className="w-3 h-3" />
              Personnaliser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
