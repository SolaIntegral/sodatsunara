-- 求人関連テーブル作成

-- 求人投稿テーブル
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'internship', 'temporary')),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_type TEXT CHECK (salary_type IN ('hourly', 'daily', 'monthly', 'yearly')),
  location TEXT NOT NULL,
  remote_work BOOLEAN DEFAULT FALSE,
  work_schedule TEXT,
  application_deadline DATE,
  required_skills TEXT[],
  preferred_skills TEXT[],
  experience_level TEXT CHECK (experience_level IN ('entry', 'junior', 'mid', 'senior', 'executive')),
  education_level TEXT CHECK (education_level IN ('high_school', 'vocational', 'associate', 'bachelor', 'master', 'phd')),
  is_student_friendly BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 応募テーブル
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  job_seeker_id UUID NOT NULL REFERENCES public.job_seekers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'accepted', 'rejected', 'withdrawn')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, job_seeker_id)
);

-- お気に入り求人テーブル
CREATE TABLE IF NOT EXISTS public.job_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  job_seeker_id UUID NOT NULL REFERENCES public.job_seekers(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, job_seeker_id)
);

-- メッセージテーブル（企業と求職者間のやり取り）
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) の有効化
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 求人テーブルのRLSポリシー（全員が閲覧可能、企業は自分の求人のみ編集可能）
CREATE POLICY "jobs_select_all" ON public.jobs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "jobs_insert_company" ON public.jobs
  FOR INSERT WITH CHECK (auth.uid() = company_id);

CREATE POLICY "jobs_update_company" ON public.jobs
  FOR UPDATE USING (auth.uid() = company_id);

CREATE POLICY "jobs_delete_company" ON public.jobs
  FOR DELETE USING (auth.uid() = company_id);

-- 応募テーブルのRLSポリシー
CREATE POLICY "applications_select_own" ON public.applications
  FOR SELECT USING (
    auth.uid() = job_seeker_id OR 
    auth.uid() IN (SELECT company_id FROM jobs WHERE id = job_id)
  );

CREATE POLICY "applications_insert_job_seeker" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = job_seeker_id);

CREATE POLICY "applications_update_own" ON public.applications
  FOR UPDATE USING (
    auth.uid() = job_seeker_id OR 
    auth.uid() IN (SELECT company_id FROM jobs WHERE id = job_id)
  );

-- お気に入りテーブルのRLSポリシー
CREATE POLICY "job_favorites_select_own" ON public.job_favorites
  FOR SELECT USING (auth.uid() = job_seeker_id);

CREATE POLICY "job_favorites_insert_own" ON public.job_favorites
  FOR INSERT WITH CHECK (auth.uid() = job_seeker_id);

CREATE POLICY "job_favorites_delete_own" ON public.job_favorites
  FOR DELETE USING (auth.uid() = job_seeker_id);

-- メッセージテーブルのRLSポリシー
CREATE POLICY "messages_select_participants" ON public.messages
  FOR SELECT USING (
    auth.uid() = sender_id OR
    auth.uid() IN (
      SELECT job_seeker_id FROM applications WHERE id = application_id
      UNION
      SELECT company_id FROM jobs j JOIN applications a ON j.id = a.job_id WHERE a.id = application_id
    )
  );

CREATE POLICY "messages_insert_participants" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    auth.uid() IN (
      SELECT job_seeker_id FROM applications WHERE id = application_id
      UNION
      SELECT company_id FROM jobs j JOIN applications a ON j.id = a.job_id WHERE a.id = application_id
    )
  );

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON public.jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job_seeker_id ON public.applications(job_seeker_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_favorites_job_seeker_id ON public.job_favorites(job_seeker_id);
