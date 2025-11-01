import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Utiliser plusieurs services en parallèle pour avoir le meilleur résultat
    
    // Service 1: ScreenshotAPI avec clé demo (gratuit, limité mais fonctionne)
    const screenshotApiUrl = `https://api.screenshotone.com/take?access_key=demo&url=${encodeURIComponent(url)}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=85&delay=4&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=true&block_trackers=true`;
    
    try {
      const screenshotResponse = await fetch(screenshotApiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 30000
      } as RequestInit);

      if (screenshotResponse.ok) {
        const contentType = screenshotResponse.headers.get('content-type');
        if (contentType?.startsWith('image/')) {
          const imageBuffer = await screenshotResponse.arrayBuffer();
          return new NextResponse(imageBuffer, {
            headers: {
              'Content-Type': contentType || 'image/png',
              'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache 24h
            },
          });
        }
      }
    } catch {
      console.log("ScreenshotAPI failed, trying Microlink");
    }

    // Service 2: Microlink (gratuit avec limites)
    try {
      const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&viewport.width=1280&viewport.height=720&waitFor=2000`;
      const microlinkResponse = await fetch(microlinkUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (microlinkResponse.ok) {
        const data = await microlinkResponse.json();
        if (data?.data?.screenshot?.url) {
          // Récupérer l'image depuis l'URL Microlink
          const imageResponse = await fetch(data.data.screenshot.url);
          if (imageResponse.ok) {
            const imageBuffer = await imageResponse.arrayBuffer();
            return new NextResponse(imageBuffer, {
              headers: {
                'Content-Type': imageResponse.headers.get('content-type') || 'image/png',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
              },
            });
          }
        }
      }
    } catch {
      console.log("Microlink failed, trying screenshot.rocks");
    }

    // Service 3: screenshot.rocks (fallback simple)
    const fallbackUrl = `https://screenshot.rocks/api?url=${encodeURIComponent(url)}&width=1280&height=720`;
    
    // Rediriger vers le service de fallback
    return NextResponse.redirect(fallbackUrl);
  } catch (error) {
    console.error("Error generating preview:", error);
    // Dernier fallback - rediriger vers screenshot.rocks
    return NextResponse.redirect(`https://screenshot.rocks/api?url=${encodeURIComponent(url)}&width=1280&height=720`);
  }
}

