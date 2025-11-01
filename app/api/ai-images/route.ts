import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ai_images")
      .select("id,title,image_url,prompt,model,featured,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      return NextResponse.json(
        { data: [], error: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(
      { data: data ?? [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e: unknown) {
    return NextResponse.json(
      { data: [], error: (e as Error)?.message || "unknown" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}


