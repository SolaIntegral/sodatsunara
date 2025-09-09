-- 習志野市求人プラットフォーム用のユーザーテーブル作成

-- 求職者プロフィールテーブル
CREATE TABLE IF NOT EXISTS public.job_seekers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  address TEXT,
  school_name TEXT,
  school_email TEXT,
  is_school_verified BOOLEAN DEFAULT FALSE,
  graduation_year INTEGER,
  major TEXT,
  bio TEXT,
  skills TEXT[],
  interests TEXT[],
  avatar_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 企業プロフィールテーブル
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  address TEXT,
  industry TEXT,
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-1000', '1000+')),
  description TEXT,
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'standard', 'partner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 学校認証用テーブル
CREATE TABLE IF NOT EXISTS public.school_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  school_name TEXT NOT NULL,
  school_type TEXT CHECK (school_type IN ('university', 'high_school')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) の有効化
ALTER TABLE public.job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_domains ENABLE ROW LEVEL SECURITY;

-- 求職者用RLSポリシー
CREATE POLICY "job_seekers_select_own" ON public.job_seekers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "job_seekers_insert_own" ON public.job_seekers
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "job_seekers_update_own" ON public.job_seekers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "job_seekers_delete_own" ON public.job_seekers
  FOR DELETE USING (auth.uid() = id);

-- 企業用RLSポリシー
CREATE POLICY "companies_select_own" ON public.companies
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "companies_insert_own" ON public.companies
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "companies_update_own" ON public.companies
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "companies_delete_own" ON public.companies
  FOR DELETE USING (auth.uid() = id);

-- 学校ドメイン用RLSポリシー（全員が読み取り可能）
CREATE POLICY "school_domains_select_all" ON public.school_domains
  FOR SELECT USING (TRUE);
