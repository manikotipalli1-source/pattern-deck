CREATE TABLE IF NOT EXISTS public.patterns (
  id text PRIMARY KEY,
  name text NOT NULL,
  blurb text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.patterns TO anon;
GRANT SELECT ON public.patterns TO authenticated;
GRANT ALL ON public.patterns TO service_role;
ALTER TABLE public.patterns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Patterns are readable by everyone" ON public.patterns;
CREATE POLICY "Patterns are readable by everyone" ON public.patterns FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.problems (
  id text PRIMARY KEY,
  number integer NOT NULL,
  title text NOT NULL,
  difficulty text NOT NULL,
  url text NOT NULL,
  pattern_id text NOT NULL REFERENCES public.patterns(id) ON DELETE CASCADE,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS problems_pattern_id_idx ON public.problems(pattern_id);
GRANT SELECT ON public.problems TO anon;
GRANT SELECT ON public.problems TO authenticated;
GRANT ALL ON public.problems TO service_role;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Problems are readable by everyone" ON public.problems;
CREATE POLICY "Problems are readable by everyone" ON public.problems FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  problem_id text NOT NULL,
  pattern_id text NOT NULL,
  completed boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_id)
);
CREATE INDEX IF NOT EXISTS progress_user_idx ON public.progress(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress TO authenticated;
GRANT ALL ON public.progress TO service_role;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own progress" ON public.progress;
CREATE POLICY "Users manage own progress" ON public.progress FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  problem_id text NOT NULL,
  approach text NOT NULL DEFAULT '',
  mistakes text NOT NULL DEFAULT '',
  revision text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_id)
);
CREATE INDEX IF NOT EXISTS notes_user_idx ON public.notes(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own notes" ON public.notes;
CREATE POLICY "Users manage own notes" ON public.notes FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

INSERT INTO public.progress (user_id, problem_id, pattern_id, completed)
SELECT c.user_id, c.problem_id, c.pattern_id, true
FROM public.problem_completions c
ON CONFLICT (user_id, problem_id) DO NOTHING;