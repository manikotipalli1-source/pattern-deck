CREATE TABLE public.problem_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  pattern_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.problem_completions TO authenticated;
GRANT ALL ON public.problem_completions TO service_role;
ALTER TABLE public.problem_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own completions" ON public.problem_completions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);