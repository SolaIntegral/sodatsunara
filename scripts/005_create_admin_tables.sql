-- 管理者・地域データ関連テーブル作成

-- 管理者テーブル
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
  permissions TEXT[] DEFAULT ARRAY['read', 'write'],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 地域データテーブル（習志野市のオープンデータ）
CREATE TABLE IF NOT EXISTS public.regional_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_type TEXT NOT NULL CHECK (data_type IN ('population', 'business', 'education', 'transportation', 'events')),
  title TEXT NOT NULL,
  description TEXT,
  data_source TEXT,
  data_url TEXT,
  data_content JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- システム設定テーブル
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_by UUID REFERENCES public.admins(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 企業認証ログテーブル
CREATE TABLE IF NOT EXISTS public.company_verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES public.admins(id),
  previous_status TEXT,
  new_status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 地域イベント・ニュステーブル
CREATE TABLE IF NOT EXISTS public.regional_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('job_fair', 'seminar', 'workshop', 'networking', 'other')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  organizer TEXT,
  registration_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.admins(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) の有効化
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_events ENABLE ROW LEVEL SECURITY;

-- 管理者用RLSポリシー（管理者のみアクセス可能）
CREATE POLICY "admins_select_own" ON public.admins
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admins_update_own" ON public.admins
  FOR UPDATE USING (auth.uid() = id);

-- 地域データ用RLSポリシー（公開データは全員閲覧可能、管理は管理者のみ）
CREATE POLICY "regional_data_select_active" ON public.regional_data
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "regional_data_admin_all" ON public.regional_data
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.admins WHERE is_active = TRUE)
  );

-- システム設定用RLSポリシー
CREATE POLICY "system_settings_select_public" ON public.system_settings
  FOR SELECT USING (is_public = TRUE);

CREATE POLICY "system_settings_admin_all" ON public.system_settings
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.admins WHERE is_active = TRUE)
  );

-- 企業認証ログ用RLSポリシー（管理者のみ）
CREATE POLICY "company_verification_logs_admin_all" ON public.company_verification_logs
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.admins WHERE is_active = TRUE)
  );

-- 地域イベント用RLSポリシー
CREATE POLICY "regional_events_select_active" ON public.regional_events
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "regional_events_admin_all" ON public.regional_events
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM public.admins WHERE is_active = TRUE)
  );

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_regional_data_type ON public.regional_data(data_type);
CREATE INDEX IF NOT EXISTS idx_regional_data_active ON public.regional_data(is_active);
CREATE INDEX IF NOT EXISTS idx_system_settings_key ON public.system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_company_verification_logs_company ON public.company_verification_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_regional_events_date ON public.regional_events(start_date);
CREATE INDEX IF NOT EXISTS idx_regional_events_active ON public.regional_events(is_active);
