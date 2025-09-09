-- サンプル求人データの挿入（テスト用）

-- まず、サンプル企業を作成（認証なしでテスト用）
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'company1@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"user_type": "company", "display_name": "採用担当者"}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'company2@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW(), '{"user_type": "company", "display_name": "人事部"}')
ON CONFLICT (id) DO NOTHING;

-- サンプル企業プロフィール
INSERT INTO public.companies (id, company_name, email, phone, website, address, industry, company_size, description, is_verified, plan_type)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', '株式会社テックナラシノ', 'company1@example.com', '047-123-4567', 'https://tech-narashino.com', '習志野市津田沼1-1-1', 'IT・ソフトウェア', '11-50', '習志野市を拠点とするWebサービス開発会社です。地域密着型のサービスを多数手がけています。', TRUE, 'standard'),
  ('550e8400-e29b-41d4-a716-446655440002', 'カフェ・ド・ナラシノ', 'company2@example.com', '047-234-5678', 'https://cafe-narashino.com', '習志野市津田沼2-2-2', '飲食・サービス', '1-10', '津田沼駅近くのおしゃれなカフェです。地元の食材を使った料理とコーヒーが自慢です。', TRUE, 'free')
ON CONFLICT (id) DO NOTHING;

-- サンプル求人データ
INSERT INTO public.jobs (
  company_id, title, description, requirements, benefits, employment_type, 
  salary_min, salary_max, salary_type, location, remote_work, work_schedule,
  application_deadline, required_skills, preferred_skills, experience_level,
  education_level, is_student_friendly, is_active
) VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Webデザイナー（学生アルバイト歓迎）',
    '習志野市のIT企業でWebデザインのお仕事です。学生の方も大歓迎！実務経験を積みながら、スキルアップできる環境を提供します。地域のWebサイト制作やアプリのUI/UXデザインを担当していただきます。',
    '• HTML/CSSの基本的な知識\n• Photoshop、Illustratorの使用経験\n• デザインに対する興味と学習意欲\n• 週3日以上勤務可能な方',
    '• 交通費支給\n• スキルアップ支援制度\n• 正社員登用制度あり\n• 学業との両立サポート\n• 最新デザインツール使用可能',
    'part_time',
    1200, 1500, 'hourly',
    '習志野市津田沼（津田沼駅徒歩5分）',
    FALSE,
    '平日 10:00-18:00の間で4-6時間（シフト制）',
    '2025-02-28',
    ARRAY['HTML', 'CSS', 'Photoshop', 'Illustrator'],
    ARRAY['JavaScript', 'Figma', 'Adobe XD', 'UI/UX'],
    'entry',
    'high_school',
    TRUE
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'カフェスタッフ（未経験歓迎）',
    '津田沼駅近くのおしゃれなカフェでスタッフを募集しています！未経験の方も丁寧に指導しますので、安心してご応募ください。接客やドリンク作り、軽食の調理補助をお任せします。',
    '• 明るく元気な接客ができる方\n• 土日祝日に勤務できる方歓迎\n• 未経験OK\n• 学生・フリーター歓迎',
    '• 交通費支給（上限月1万円）\n• 制服貸与\n• まかない付き\n• 昇給制度あり\n• 社会保険完備（条件により）',
    'part_time',
    1000, 1200, 'hourly',
    '習志野市津田沼（津田沼駅徒歩3分）',
    FALSE,
    '8:00-22:00の間で4-8時間（シフト制）',
    '2025-03-15',
    ARRAY['接客', 'コミュニケーション'],
    ARRAY['カフェ経験', 'バリスタ資格'],
    'entry',
    'high_school',
    TRUE
  ),
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'フロントエンドエンジニア（正社員）',
    '地域密着型Webサービスの開発を行うフロントエンドエンジニアを募集します。React/Next.jsを使用したモダンな開発環境で、習志野市の地域活性化に貢献するサービスを一緒に作りませんか？',
    '• React/Next.jsでの開発経験2年以上\n• TypeScriptの使用経験\n• Git/GitHubでのチーム開発経験\n• レスポンシブデザインの実装経験',
    '• 年収350万円〜500万円\n• 完全週休2日制\n• リモートワーク可（週2日まで）\n• 技術書購入支援\n• 各種研修制度',
    'full_time',
    350, 500, 'yearly',
    '習志野市津田沼（津田沼駅徒歩5分）',
    TRUE,
    '9:00-18:00（フレックスタイム制）',
    '2025-04-30',
    ARRAY['React', 'Next.js', 'TypeScript', 'Git'],
    ARRAY['Node.js', 'GraphQL', 'AWS', 'Docker'],
    'mid',
    'bachelor',
    FALSE
  );
