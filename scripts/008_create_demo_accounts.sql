-- デモ用の認証済みアカウントを作成
-- パスワード: demo123456

-- 求職者デモアカウント（学生）
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  'demo-student-001',
  'demo.student@toho-u.ac.jp',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "demo.student@toho-u.ac.jp"}',
  false,
  'authenticated'
);

-- 企業デモアカウント
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  'demo-company-001',
  'demo.company@gmail.com',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "demo.company@gmail.com"}',
  false,
  'authenticated'
);

-- 管理者デモアカウント
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  'demo-admin-001',
  'demo.admin@narashino.lg.jp',
  crypt('demo123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "demo.admin@narashino.lg.jp"}',
  false,
  'authenticated'
);

-- 求職者プロフィール（学生）
INSERT INTO job_seekers (
  id,
  user_id,
  full_name,
  school_email,
  is_school_verified,
  graduation_year,
  major,
  bio,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'demo-student-001',
  '田中 太郎',
  'demo.student@toho-u.ac.jp',
  true,
  2025,
  '情報工学科',
  'プログラミングに興味があり、特にWebアプリケーション開発を学んでいます。習志野市でのインターンシップや新卒採用の機会を探しています。',
  NOW(),
  NOW()
);

-- 企業プロフィール
INSERT INTO companies (
  id,
  user_id,
  company_name,
  industry,
  employee_count,
  location,
  description,
  website,
  verification_status,
  plan_type,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'demo-company-001',
  '習志野テクノロジー株式会社',
  'IT・ソフトウェア',
  '50-100名',
  '千葉県習志野市津田沼1-1-1',
  '習志野市を拠点とするIT企業です。地域密着型のシステム開発とWebサービスを提供しています。',
  'https://narashino-tech.example.com',
  'approved',
  'standard',
  NOW(),
  NOW()
);

-- 管理者プロフィール
INSERT INTO admins (
  id,
  user_id,
  full_name,
  department,
  role,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'demo-admin-001',
  '習志野 花子',
  '産業振興課',
  'manager',
  NOW(),
  NOW()
);
