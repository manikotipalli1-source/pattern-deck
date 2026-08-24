import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { Problem } from "@/data/patterns";

export function ProblemNotesDialog({
  problem,
  open,
  onOpenChange,
}: {
  problem: Problem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [approach, setApproach] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [revision, setRevision] = useState("");

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", problem?.id],
    enabled: Boolean(problem && open),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("approach, mistakes, revision")
        .eq("problem_id", problem!.id)
        .maybeSingle();
      if (error) throw error;
      return data ?? { approach: "", mistakes: "", revision: "" };
    },
  });

  useEffect(() => {
    setApproach(note?.approach ?? "");
    setMistakes(note?.mistakes ?? "");
    setRevision(note?.revision ?? "");
  }, [note, problem?.id]);

  const save = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId || !problem) throw new Error("Not signed in");
      const { error } = await supabase
        .from("notes")
        .upsert(
          {
            user_id: userId,
            problem_id: problem.id,
            approach,
            mistakes,
            revision,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,problem_id" },
        );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", problem?.id] });
      queryClient.invalidateQueries({ queryKey: ["note-ids"] });
      toast.success("Notes saved");
      onOpenChange(false);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save notes"),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">
            {problem ? `${problem.number} - ${problem.title}` : "Notes"}
          </DialogTitle>
          <DialogDescription>Approach, mistakes and revision notes — private to you.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="approach">Approach</Label>
            <Textarea
              id="approach"
              rows={4}
              value={approach}
              disabled={isLoading}
              onChange={(e) => setApproach(e.target.value)}
              placeholder="Key idea, data structures, complexity…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mistakes">Mistakes</Label>
            <Textarea
              id="mistakes"
              rows={3}
              value={mistakes}
              disabled={isLoading}
              onChange={(e) => setMistakes(e.target.value)}
              placeholder="Edge cases missed, off-by-one errors…"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="revision">Revision notes</Label>
            <Textarea
              id="revision"
              rows={3}
              value={revision}
              disabled={isLoading}
              onChange={(e) => setRevision(e.target.value)}
              placeholder="What to re-check before the interview…"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending || isLoading}>
            {save.isPending ? "Saving…" : "Save notes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
