export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  workTime: string
  description: string
  requirements: string[]
  benefits: string[]
  category: string
  isNew: boolean
  applicationCount: number
  postedDate: string
  image?: string
}

export interface Company {
  id: string
  name: string
  description: string
  location: string
  employees: string
  established: string
  website?: string
}

export interface Message {
  id: string
  companyName: string
  lastMessage: string
  timestamp: string
  unread: boolean
  avatar?: string
}

export const demoJobs: Job[] = [
  {
    id: "1",
    title: "カフェスタッフ",
    company: "コーヒーハウス津田沼",
    location: "津田沼駅",
    salary: "時給1,100円〜",
    workTime: "9:00〜18:00",
    description:
      "アットホームなカフェでのホール・キッチンスタッフを募集しています。未経験者歓迎！丁寧に指導いたします。",
    requirements: ["明るく接客が好きな方", "週3日以上勤務可能な方"],
    benefits: ["交通費支給", "まかない付き", "昇給あり"],
    category: "飲食・サービス",
    isNew: true,
    applicationCount: 12,
    postedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "コンビニスタッフ",
    company: "ファミリーマート習志野店",
    location: "習志野市役所前",
    salary: "時給1,050円〜",
    workTime: "シフト制",
    description: "地域密着型のコンビニエンスストアでのレジ・品出し業務です。地域の皆様との触れ合いを大切にしています。",
    requirements: ["高校生OK", "フリーター歓迎"],
    benefits: ["社員割引", "交通費支給"],
    category: "小売・販売",
    isNew: false,
    applicationCount: 8,
    postedDate: "2024-01-10",
  },
  {
    id: "3",
    title: "学習塾講師",
    company: "進学ゼミナール",
    location: "新津田沼駅",
    salary: "時給1,800円〜",
    workTime: "16:00〜22:00",
    description: "小中学生を対象とした個別指導塾での講師業務です。生徒一人ひとりに寄り添った指導をお願いします。",
    requirements: ["大学生以上", "指導経験者優遇"],
    benefits: ["研修制度充実", "昇給制度あり"],
    category: "教育・講師",
    isNew: true,
    applicationCount: 5,
    postedDate: "2024-01-12",
  },
  {
    id: "4",
    title: "事務スタッフ",
    company: "習志野商事株式会社",
    location: "実籾駅",
    salary: "時給1,200円〜",
    workTime: "9:00〜17:00",
    description: "地域に根ざした企業での一般事務業務です。データ入力、電話対応、書類作成などをお任せします。",
    requirements: ["PC基本操作可能な方", "長期勤務歓迎"],
    benefits: ["土日祝休み", "有給取得推奨"],
    category: "事務・オフィスワーク",
    isNew: false,
    applicationCount: 15,
    postedDate: "2024-01-08",
  },
  {
    id: "5",
    title: "配達ドライバー",
    company: "習志野宅配サービス",
    location: "谷津駅",
    salary: "時給1,300円〜",
    workTime: "10:00〜19:00",
    description: "地域密着の宅配サービスでの配達業務です。普通免許があれば未経験でもOK！地域貢献しながら働けます。",
    requirements: ["普通自動車免許", "地域密着志向の方"],
    benefits: ["車両貸与", "ガソリン代支給"],
    category: "配送・物流",
    isNew: true,
    applicationCount: 7,
    postedDate: "2024-01-14",
  },
  {
    id: "6",
    title: "介護スタッフ",
    company: "ケアホーム習志野",
    location: "京成大久保駅",
    salary: "時給1,400円〜",
    workTime: "8:00〜17:00",
    description:
      "利用者様の日常生活をサポートする介護業務です。資格取得支援制度もあり、未経験からでもスキルアップできます。",
    requirements: ["介護に興味のある方", "資格不問"],
    benefits: ["資格取得支援", "正社員登用あり"],
    category: "医療・介護",
    isNew: false,
    applicationCount: 9,
    postedDate: "2024-01-05",
  },
]

export const demoCompanies: Company[] = [
  {
    id: "1",
    name: "コーヒーハウス津田沼",
    description: "地域に愛される老舗カフェ。こだわりのコーヒーと手作りスイーツが自慢です。",
    location: "習志野市津田沼1-2-3",
    employees: "10名",
    established: "2010年",
  },
  {
    id: "2",
    name: "ファミリーマート習志野店",
    description: "地域密着型のコンビニエンスストア。お客様との触れ合いを大切にしています。",
    location: "習志野市本大久保2-4-5",
    employees: "15名",
    established: "2015年",
  },
]

export const demoMessages: Message[] = [
  {
    id: "1",
    companyName: "丸々商店",
    lastMessage: "応募ありがとうございます！丸々商店の小林です。",
    timestamp: "2024-01-15T10:30:00Z",
    unread: true,
  },
  {
    id: "2",
    companyName: "Mio",
    lastMessage: "ご連絡ありがとうございます。",
    timestamp: "2024-01-14T15:20:00Z",
    unread: false,
  },
  {
    id: "3",
    companyName: "Mio",
    lastMessage: "個人経営 / 居酒屋 / アルバイト",
    timestamp: "2024-01-13T09:15:00Z",
    unread: false,
  },
]

export const jobCategories = [
  "飲食・サービス",
  "小売・販売",
  "事務・オフィスワーク",
  "教育・講師",
  "医療・介護",
  "配送・物流",
  "製造・軽作業",
  "IT・技術",
]

export const recentSearches = ["津田沼駅", "カフェ", "時給1200円以上", "土日休み"]
