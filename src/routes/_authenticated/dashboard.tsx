import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ExternalLink, LogOut, NotebookPen, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProblemNotesDialog } from "@/components/ProblemNotesDialog";
import { patterns, totalProblems, type Difficulty, type Problem } from "@/data/patterns";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PatternDeck" },
      { name: "description", content: "Your DSA progress across 13 patterns, updated in real time." },
      { property: "og:title", content: "Dashboard — PatternDeck" },
      { property: "og:description", content: "Your DSA progress across 13 patterns." },
    ],
  }),
  component: Dashboard,
});

const difficultyClass: Record<Difficulty, string> = {
  Easy: "text-easy border-easy/30 bg-easy/10",
  Medium: "text-medium border-medium/30 bg-medium/10",
  Hard: "text-hard border-hard/30 bg-hard/10",
};

type Filter = "All" | "Completed" | "Incomplete" | "Easy" | "Medium" | "Hard";
const filters: Filter[] = ["All", "Completed", "Incomplete", "Easy", "Medium", "Hard"];

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [openPattern, setOpenPattern] = useState<string | null>(patterns[0]?.id ?? null);
  const [notesProblem, setNotesProblem] = useState<Problem | null>(null);

  const { data: completed = new Set<string>(), isLoading } = useQuery({
    queryKey: ["progress"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("progress")
        .select("problem_id")
        .eq("completed", true);
      if (error) throw error;
      return new Set(data.map((row) => row.problem_id));
    },
  });

  const { data: notedIds = new Set<string>() } = useQuery({
    queryKey: ["note-ids"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.from("notes").select("problem_id");
      if (error) throw error;
      return new Set(data.map((row) => row.problem_id));
    },
  });

  const toggleProblem = useMutation({
    mutationFn: async ({
      problemId,
      patternId,
      done,
    }: {
      problemId: string;
      patternId: string;
      done: boolean;
    }) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("Not signed in");
      if (done) {
        const { error } = await supabase
          .from("progress")
          .insert({ problem_id: problemId, pattern_id: patternId, user_id: userId, completed: true });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("progress")
          .delete()
          .eq("problem_id", problemId)
          .eq("user_id", userId);
        if (error) throw error;
      }
    },
    onMutate: async ({ problemId, done }) => {
      await queryClient.cancelQueries({ queryKey: ["progress"] });
      const previous = queryClient.getQueryData<Set<string>>(["progress"]);
      const next = new Set(previous ?? []);
      if (done) next.add(problemId);
      else next.delete(problemId);
      queryClient.setQueryData(["progress"], next);
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(["progress"], context.previous);
      toast.error(error instanceof Error ? error.message : "Could not save");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["progress"] }),
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = (problem: Problem) => {
      if (q && !(problem.title.toLowerCase().includes(q) || String(problem.number).includes(q))) {
        return false;
      }
      if (filter === "Completed") return completed.has(problem.id);
      if (filter === "Incomplete") return !completed.has(problem.id);
      if (filter === "Easy" || filter === "Medium" || filter === "Hard") {
        return problem.difficulty === filter;
      }
      return true;
    };
    if (!q && filter === "All") return patterns;
    return patterns
      .map((pattern) => ({ ...pattern, problems: pattern.problems.filter(matches) }))
      .filter((pattern) => pattern.problems.length > 0);
  }, [query, filter, completed]);

  const isFiltering = query.trim().length > 0 || filter !== "All";
  const totalDone = completed.size;
  const remaining = totalProblems - totalDone;
  const overallPct = Math.round((totalDone / totalProblems) * 100);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="font-display text-base font-bold sm:text-lg">
            Pattern<span className="text-hero-gradient">Deck</span>
          </span>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
              <LogOut className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <section className="rounded-2xl border bg-card p-5 shadow-soft sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Overall progress</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {totalDone} solved · {remaining} remaining · {totalProblems} total across{" "}
                {patterns.length} patterns
              </p>
            </div>
            <span className="font-display text-4xl font-bold text-hero-gradient">{overallPct}%</span>
          </div>
          <Progress value={overallPct} className="mt-4 h-3" />
        </section>

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or LeetCode number…"
            className="pl-9"
            aria-label="Search problems"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((entry) => (
            <button
              key={entry}
              type="button"
              onClick={() => setFilter(entry)}
              aria-pressed={filter === entry}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                filter === entry
                  ? "border-primary bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-surface"
              }`}
            >
              {entry}
            </button>
          ))}
        </div>

        <section className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <p className="rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground">
              No problems match your search or filters.
            </p>
          )}

          {filtered.map((pattern) => {
            const source = patterns.find((entry) => entry.id === pattern.id)!;
            const total = source.problems.length;
            const doneAll = source.problems.filter((problem) => completed.has(problem.id)).length;
            const pct = Math.round((doneAll / total) * 100);
            const isOpen = openPattern === pattern.id || isFiltering;

            return (
              <div key={pattern.id} className="overflow-hidden rounded-xl border bg-card shadow-soft">
                <button
                  type="button"
                  onClick={() => setOpenPattern(isOpen && !isFiltering ? null : pattern.id)}
                  className="flex w-full flex-col gap-3 p-4 text-left transition-colors hover:bg-surface sm:p-5"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-semibold sm:text-lg">{pattern.name}</h2>
                      <p className="text-xs text-muted-foreground sm:text-sm">{pattern.blurb}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {doneAll}/{total} · {pct}%
                      {isFiltering ? ` · ${pattern.problems.length} matches` : ""}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </button>

                {isOpen && (
                  <ul className="divide-y border-t">
                    {pattern.problems.map((problem) => {
                      const isDone = completed.has(problem.id);
                      return (
                        <li
                          key={problem.id}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface sm:px-5"
                        >
                          <Checkbox
                            id={problem.id}
                            checked={isDone}
                            disabled={isLoading}
                            aria-label={`Mark ${problem.title} complete`}
                            onCheckedChange={(value) =>
                              toggleProblem.mutate({
                                problemId: problem.id,
                                patternId: pattern.id,
                                done: value === true,
                              })
                            }
                          />
                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex flex-1 items-center gap-2 text-sm hover:underline ${
                              isDone ? "text-muted-foreground line-through" : ""
                            }`}
                          >
                            <span className="font-mono text-xs text-muted-foreground">
                              {problem.number}
                            </span>
                            <span>{problem.title}</span>
                            <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setNotesProblem(problem)}
                            aria-label={`Notes for ${problem.title}`}
                            className={`shrink-0 rounded-md p-1.5 transition-colors hover:bg-surface ${
                              notedIds.has(problem.id) ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <NotebookPen className="size-4" />
                          </button>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${difficultyClass[problem.difficulty]}`}
                          >
                            {problem.difficulty}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <ProblemNotesDialog
        problem={notesProblem}
        open={notesProblem !== null}
        onOpenChange={(open) => !open && setNotesProblem(null)}
      />
    </div>
  );
}
