-- 千葉工業大学の新しいドメインを追加

INSERT INTO public.school_domains (domain, school_name, school_type) VALUES
  ('s.chibakoudai.jp', '千葉工業大学', 'university')
ON CONFLICT (domain) DO NOTHING;
