-- 習志野市内の学校ドメインを登録

INSERT INTO public.school_domains (domain, school_name, school_type) VALUES
  ('toho-u.ac.jp', '東邦大学', 'university'),
  ('nihon-u.ac.jp', '日本大学生産工学部', 'university'),
  ('chiba-u.ac.jp', '千葉大学', 'university'),
  ('narashino-h.ed.jp', '習志野市立習志野高等学校', 'high_school'),
  ('tsudanuma-h.ed.jp', '千葉県立津田沼高等学校', 'high_school'),
  ('makuhari-h.ed.jp', '千葉県立幕張総合高等学校', 'high_school')
ON CONFLICT (domain) DO NOTHING;
