-- サンプル管理者データと地域データの挿入

-- サンプル管理者ユーザー作成
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440003', 'admin@narashino.lg.jp', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"user_type": "admin", "display_name": "習志野市管理者"}')
ON CONFLICT (id) DO NOTHING;

-- 管理者プロフィール
INSERT INTO public.admins (id, display_name, email, role, permissions)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440003', '習志野市管理者', 'admin@narashino.lg.jp', 'super_admin', ARRAY['read', 'write', 'delete', 'manage_users'])
ON CONFLICT (id) DO NOTHING;

-- システム設定
INSERT INTO public.system_settings (setting_key, setting_value, description, is_public) VALUES
  ('site_name', 'ならしごと', 'サイト名', TRUE),
  ('site_description', '習志野市の地域密着型求人プラットフォーム', 'サイト説明', TRUE),
  ('contact_email', 'info@narashigoto.jp', 'お問い合わせメールアドレス', TRUE),
  ('max_free_jobs', '1', '無料プランの最大求人投稿数', FALSE),
  ('max_standard_jobs', '10', 'スタンダードプランの最大求人投稿数', FALSE),
  ('enable_school_verification', 'true', '学校認証機能の有効化', FALSE)
ON CONFLICT (setting_key) DO NOTHING;

-- 習志野市の地域データ（サンプル）
INSERT INTO public.regional_data (data_type, title, description, data_source, data_content) VALUES
  (
    'population',
    '習志野市人口統計',
    '習志野市の人口・世帯数データ',
    '習志野市オープンデータ',
    '{"total_population": 175000, "households": 78000, "age_groups": {"0-14": 20000, "15-64": 110000, "65+": 45000}, "updated": "2024-01-01"}'
  ),
  (
    'business',
    '習志野市事業所統計',
    '習志野市内の事業所数・従業員数',
    '習志野市商工会議所',
    '{"total_businesses": 8500, "by_industry": {"manufacturing": 1200, "retail": 2100, "services": 3800, "it": 450, "other": 950}, "total_employees": 85000}'
  ),
  (
    'education',
    '習志野市教育機関情報',
    '市内の大学・高校・専門学校情報',
    '習志野市教育委員会',
    '{"universities": [{"name": "東邦大学", "students": 8000}, {"name": "日本大学生産工学部", "students": 6500}], "high_schools": 8, "total_students": 25000}'
  ),
  (
    'transportation',
    '習志野市交通アクセス',
    '主要駅・交通機関の情報',
    '習志野市都市計画課',
    '{"stations": [{"name": "津田沼駅", "lines": ["JR総武線", "JR総武快速線"], "daily_users": 180000}, {"name": "新津田沼駅", "lines": ["新京成線"], "daily_users": 45000}]}'
  )
ON CONFLICT DO NOTHING;

-- 地域イベント（サンプル）
INSERT INTO public.regional_events (title, description, event_type, start_date, end_date, location, organizer, is_featured, created_by) VALUES
  (
    '習志野市合同企業説明会',
    '地元企業約50社が参加する合同企業説明会です。学生・求職者の皆様のご参加をお待ちしています。',
    'job_fair',
    '2025-03-15 10:00:00+09',
    '2025-03-15 16:00:00+09',
    '習志野市民会館',
    '習志野市・習志野商工会議所',
    TRUE,
    '550e8400-e29b-41d4-a716-446655440003'
  ),
  (
    'IT業界セミナー「地域でのキャリア形成」',
    'IT業界で働く魅力と地域でのキャリア形成について学べるセミナーです。',
    'seminar',
    '2025-02-20 14:00:00+09',
    '2025-02-20 16:00:00+09',
    '津田沼公民館',
    '習志野市産業振興課',
    FALSE,
    '550e8400-e29b-41d4-a716-446655440003'
  )
ON CONFLICT DO NOTHING;
