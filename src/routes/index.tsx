import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LayoutGrid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { patterns, totalProblems } from "@/data/patterns";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PatternDeck — Track 13 DSA Patterns" },
      {
        name: "description",
        content:
          "A focused tracker for data structures and algorithms practice: 13 patterns, curated problems, and live progress.",
      },
      { property: "og:title", content: "PatternDeck — Track 13 DSA Patterns" },
      {
        property: "og:description",
        content: "13 patterns, curated problems, and live progress tracking for DSA interviews.",
      },
      // ✅ Theme colors
      { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#0f172a", media: "(prefers-color-scheme: dark)" },
    ],
    links: [
      // ✅ Favicons
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/svg+xml", sizes: "any", href: "/favicon.svg" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: Index,
});


function Index() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="font-display text-lg font-bold tracking-tight">
          Pattern<span className="text-hero-gradient">Deck</span>
        </span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to={signedIn ? "/dashboard" : "/auth"}>
              {signedIn ? "Dashboard" : "Sign in"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <section className="py-14 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {patterns.length} patterns · {totalProblems} problems
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">
            Stop grinding random problems. <span className="text-hero-gradient">Learn the patterns.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            PatternDeck organises interview prep into the thirteen patterns that actually repeat —
            and keeps your progress in sync on every device.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={signedIn ? "/dashboard" : "/auth"}>
                Start tracking <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth" search={{ mode: "register" }}>
                Create an account
              </Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: LayoutGrid, title: "13 curated patterns", text: "Arrays to dynamic programming, each with a hand-picked problem set." },
            { icon: CheckCircle2, title: "Progress that sticks", text: "Overall and per-pattern bars update the moment you tick a problem." },
            { icon: Search, title: "Instant search", text: "Filter every problem by title, pattern or difficulty." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border bg-card p-5 shadow-soft">
              <Icon className="size-5 text-primary" />
              <h2 className="mt-3 text-base font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 flex flex-wrap gap-2">
          {patterns.map((pattern) => (
            <span
              key={pattern.id}
              className="rounded-full border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {pattern.name}
            </span>
          ))}
        </section>
      </main>
    </div>
  );
}
