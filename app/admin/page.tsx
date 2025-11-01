import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/auth/login");
  return data.claims;
}

async function getData() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("ai_images")
    .select("id,title,image_url,prompt,model,featured,created_at")
    .order("created_at", { ascending: false })
    .limit(12);
  const { data: projects } = await supabase
    .from("web_projects")
    .select("id,title,description,image_url,technologies,live_url,github_url,featured,created_at")
    .order("created_at", { ascending: false })
    .limit(12);
  return { images: images ?? [], projects: projects ?? [] };
}

export default async function AdminPage() {
  await requireUser();
  const { images, projects } = await getData();

  async function addAIImage(formData: FormData) {
    "use server";
    const supabase = await createClient();
    let imageUrl = String(formData.get("image_url") || "");
    const file = formData.get("image_file") as File | null;
    if (file && file.size > 0) {
      const filePath = `ai/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from("ai-images").upload(filePath, file, {
        contentType: file.type || "image/*",
        upsert: false,
      });
      if (!upErr) {
        const { data } = supabase.storage.from("ai-images").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }
    const payload = {
      title: String(formData.get("title") || ""),
      image_url: imageUrl,
      prompt: String(formData.get("prompt") || ""),
      model: String(formData.get("model") || "") || null,
      featured: String(formData.get("featured") || "") === "on",
    };
    await supabase.from("ai_images").insert(payload);
    revalidatePath("/admin");
  }

  async function addWebProject(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const technologies = String(formData.get("technologies") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    let imageUrl = String(formData.get("image_url") || "");
    const file = formData.get("image_file") as File | null;
    if (file && file.size > 0) {
      const filePath = `previews/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from("previews").upload(filePath, file, {
        contentType: file.type || "image/*",
        upsert: false,
      });
      if (!upErr) {
        const { data } = supabase.storage.from("previews").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }
    const payload = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      image_url: imageUrl,
      technologies,
      live_url: String(formData.get("live_url") || ""),
      github_url: String(formData.get("github_url") || ""),
      featured: String(formData.get("featured") || "") === "on",
    };
    await supabase.from("web_projects").insert(payload);
    revalidatePath("/admin");
  }

  async function updateAIImage(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    let imageUrl = String(formData.get("image_url") || "");
    const file = formData.get("image_file") as File | null;
    if (file && file.size > 0) {
      const filePath = `ai/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from("ai-images").upload(filePath, file, {
        contentType: file.type || "image/*",
        upsert: false,
      });
      if (!upErr) {
        const { data } = supabase.storage.from("ai-images").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }
    const payload: {
      title: string;
      image_url: string;
      prompt: string;
      model: string | null;
      featured: boolean;
    } = {
      title: String(formData.get("title") || ""),
      image_url: imageUrl,
      prompt: String(formData.get("prompt") || ""),
      model: String(formData.get("model") || "") || null,
      featured: String(formData.get("featured") || "") === "on",
    };
    await supabase.from("ai_images").update(payload).eq("id", id);
    revalidatePath("/admin");
  }

  async function deleteAIImage(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    await supabase.from("ai_images").delete().eq("id", id);
    revalidatePath("/admin");
  }

  async function updateWebProject(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    const technologies = String(formData.get("technologies") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    let imageUrl = String(formData.get("image_url") || "");
    const file = formData.get("image_file") as File | null;
    if (file && file.size > 0) {
      const filePath = `previews/${Date.now()}_${file.name}`;
      const { error: upErr } = await supabase.storage.from("previews").upload(filePath, file, {
        contentType: file.type || "image/*",
        upsert: false,
      });
      if (!upErr) {
        const { data } = supabase.storage.from("previews").getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }
    }
    const payload: {
      title: string;
      description: string;
      image_url: string;
      technologies: string[];
      live_url: string;
      github_url: string;
      featured: boolean;
    } = {
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      image_url: imageUrl,
      technologies,
      live_url: String(formData.get("live_url") || ""),
      github_url: String(formData.get("github_url") || ""),
      featured: String(formData.get("featured") || "") === "on",
    };
    await supabase.from("web_projects").update(payload).eq("id", id);
    revalidatePath("/admin");
  }

  async function deleteWebProject(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    await supabase.from("web_projects").delete().eq("id", id);
    revalidatePath("/admin");
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-2xl font-bold">Admin · Gestion du contenu</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter une image IA</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addAIImage} className="space-y-4">
              <Input name="title" placeholder="Titre" required />
              <Input name="image_url" placeholder="URL de l'image (optionnel si fichier)" />
              <input
                type="file"
                name="image_file"
                accept="image/*"
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
              />
              <Input name="model" placeholder="Modèle (Midjourney, DALL·E, SDXL)" />
              <textarea
                name="prompt"
                placeholder="Prompt"
                className="w-full rounded-md border border-input bg-transparent p-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                rows={5}
                required
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" />
                Mettre en avant (homepage)
              </label>
              <Button type="submit">Enregistrer</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ajouter un projet web</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addWebProject} className="space-y-4">
              <Input name="title" placeholder="Titre" required />
              <Input name="description" placeholder="Description" required />
              <Input name="image_url" placeholder="URL de l'image de preview (optionnel si fichier)" />
              <input
                type="file"
                name="image_file"
                accept="image/*"
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
              />
              <Input name="technologies" placeholder="Technologies (séparées par des virgules)" />
              <div className="grid grid-cols-2 gap-3">
                <Input name="live_url" placeholder="Lien Live" />
                <Input name="github_url" placeholder="Lien GitHub" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="featured" />
                Mettre en avant (featured)
              </label>
              <Button type="submit">Enregistrer</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Modifier les images IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {images.map((img) => (
                <form key={img.id} action={updateAIImage} className="space-y-3 border-b pb-6">
                  <input type="hidden" name="id" value={img.id} />
                  <Input name="title" defaultValue={img.title} placeholder="Titre" />
                  <Input name="image_url" defaultValue={img.image_url} placeholder="URL de l'image" />
                  <input
                    type="file"
                    name="image_file"
                    accept="image/*"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
                  />
                  <Input name="model" defaultValue={img.model || ""} placeholder="Modèle" />
                  <textarea
                    name="prompt"
                    defaultValue={img.prompt}
                    className="w-full rounded-md border border-input bg-transparent p-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    rows={4}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="featured" defaultChecked={Boolean(img.featured)} />
                    Mettre en avant
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">Enregistrer</Button>
                    <Button formAction={deleteAIImage} type="submit" size="sm" variant="outline">Supprimer</Button>
                  </div>
                </form>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modifier les projets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((p: {
                id: number;
                title: string;
                description: string;
                image_url: string;
                technologies: string[];
                live_url: string;
                github_url: string;
                featured: boolean;
              }) => (
                <form key={p.id} action={updateWebProject} className="space-y-3 border-b pb-6">
                  <input type="hidden" name="id" value={p.id} />
                  <Input name="title" defaultValue={p.title} placeholder="Titre" />
                  <Input name="description" defaultValue={p.description} placeholder="Description" />
                  <Input name="image_url" defaultValue={p.image_url} placeholder="URL image" />
                  <input
                    type="file"
                    name="image_file"
                    accept="image/*"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
                  />
                  <Input name="technologies" defaultValue={(Array.isArray(p.technologies) ? p.technologies : []).join(", ")} placeholder="Technologies (CSV)" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input name="live_url" defaultValue={p.live_url || ""} placeholder="Lien Live" />
                    <Input name="github_url" defaultValue={p.github_url || ""} placeholder="Lien GitHub" />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="featured" defaultChecked={Boolean(p.featured)} />
                    Mettre en avant
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm">Enregistrer</Button>
                    <Button formAction={deleteWebProject} type="submit" size="sm" variant="outline">Supprimer</Button>
                  </div>
                </form>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


