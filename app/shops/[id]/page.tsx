"use client"

import type React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Phone,
  Globe,
  Heart,
  Share,
  X,
  Users,
  Award,
  Calendar,
  MessageCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { useState } from "react"

const shopData = {
  1: {
    id: 1,
    name: "カフェ・ド・津田沼",
    category: "カフェ・喫茶店",
    location: "津田沼駅",
    address: "習志野市津田沼1-2-3 津田沼ビル1F",
    phone: "047-123-4567",
    website: "https://cafe-tsudanuma.com",
    rating: 4.5,
    reviewCount: 128,
    image: "/-----------.jpg",
    coverImage: "/-----------.jpg",
    catchphrase: "忙しい毎日に、ほっと一息つける時間を。あなたのまちのくつろぎカフェです",
    connectionScore: {
      favorites: 245,
      hiredFromPlatform: 3,
      localEvents: 12,
      localIngredients: true,
    },
    ownerStory: {
      ownerName: "田中 美咲",
      ownerImage: "/cafe-owner-woman-smiling.jpg",
      message:
        "習志野で生まれ育った私が、地域の皆さんに愛される場所を作りたいと思い、2018年にこのカフェを開きました。毎日丁寧に淹れるコーヒーで、皆さんの心に温かいひとときをお届けしたいと思っています。",
      milestones: [
        { label: "創業", value: "2018年" },
        { label: "看板メニュー累計", value: "15,000杯" },
        { label: "習志野出身スタッフ", value: "2名" },
      ],
    },
    news: [
      {
        date: "2024-01-15",
        title: "新メニュー「習志野ブレンド」登場！",
        content: "地元の焙煎所と共同開発した特別なブレンドコーヒーが完成しました。",
      },
      {
        date: "2024-01-10",
        title: "スタッフ田中の誕生日でした🎂",
        content: "常連のお客様からお花をいただき、とても温かい一日でした。",
      },
      {
        date: "2024-01-05",
        title: "今日のランチ：季節野菜のパスタ",
        content: "習志野産の新鮮な野菜をたっぷり使ったパスタをご用意しています。",
      },
    ],
    coupons: [
      {
        title: "初回来店20%OFF",
        description: "初めてご来店のお客様限定",
        validUntil: "2024-02-29",
      },
      {
        title: "モーニングセット100円引き",
        description: "平日10時まで限定",
        validUntil: "2024-01-31",
      },
    ],
    reviews: [
      {
        customerName: "山田さん",
        rating: 5,
        comment: "いつも温かく迎えてくれるスタッフの皆さんに癒されます。コーヒーも本当に美味しい！",
        ownerReply: "いつもありがとうございます！これからも心を込めてお迎えいたします。",
      },
      {
        customerName: "佐藤さん",
        rating: 4,
        comment: "WiFiも電源もあって、仕事がはかどります。静かで集中できる環境が嬉しいです。",
        ownerReply: "お仕事のお役に立てて嬉しいです。いつでもお気軽にお越しください。",
      },
    ],
    jobInfo: {
      isHiring: true,
      message: "私たちと一緒に、このまちで働きませんか？",
      staffPhoto: "/cafe-staff-team-photo.jpg",
      positions: ["ホールスタッフ", "キッチンスタッフ"],
    },
    localContributions: [
      "津田沼商店街振興組合 加盟店",
      "習志野市少年サッカーチーム スポンサー",
      "地元農家「田中農園」から野菜を仕入れ",
      "津田沼夏祭りに毎年出店",
    ],
    tags: ["WiFi完備", "電源あり", "静か"],
    description:
      "落ち着いた雰囲気でゆっくりできるカフェです。厳選されたコーヒー豆を使用し、一杯一杯丁寧に淹れています。",
    hours: {
      平日: "8:00 - 20:00",
      土日祝: "9:00 - 21:00",
      定休日: "月曜日",
    },
    menu: [
      { name: "ブレンドコーヒー", price: "¥450" },
      { name: "カフェラテ", price: "¥520" },
      { name: "モーニングセット", price: "¥680" },
      { name: "パスタランチ", price: "¥980" },
    ],
    features: ["WiFi完備で作業環境抜群", "全席に電源コンセント完備", "静かな環境で集中できる", "厳選コーヒー豆使用"],
  },
  2: {
    id: 2,
    name: "習志野ラーメン横丁",
    category: "ラーメン",
    location: "新津田沼駅",
    address: "習志野市津田沼2-5-8",
    phone: "047-456-7890",
    website: null,
    rating: 4.3,
    reviewCount: 256,
    image: "/----------.jpg",
    coverImage: "/----------.jpg",
    catchphrase: "津田沼駅から徒歩1分の老舗ラーメン店。地元で愛される味。",
    connectionScore: {
      favorites: 300,
      hiredFromPlatform: 5,
      localEvents: 15,
      localIngredients: true,
    },
    ownerStory: {
      ownerName: "佐藤 太郎",
      ownerImage: "/cafe-staff-team-photo.jpg",
      message: "津田沼駅から徒歩1分の老舗ラーメン店。地元で愛される味。",
      milestones: [
        { label: "創業", value: "1990年" },
        { label: "看板メニュー累計", value: "50,000品" },
        { label: "習志野出身スタッフ", value: "4名" },
      ],
    },
    news: [
      {
        date: "2024-01-15",
        title: "新メニュー「醤油ラーメン」登場！",
        content: "地元で愛される醤油ラーメンが再登場しました。",
      },
      {
        date: "2024-01-10",
        title: "スタッフ佐藤さんの誕生日でした🎂",
        content: "常連のお客様からお花をいただき、とても温かい一日でした。",
      },
      {
        date: "2024-01-05",
        title: "今日のランチ：チャーシュー麺",
        content: "地元の豚肉を使用したチャーシュー麺をご用意しています。",
      },
    ],
    coupons: [
      {
        title: "初回来店10%OFF",
        description: "初めてご来店のお客様限定",
        validUntil: "2024-02-29",
      },
      {
        title: "チャーシュー麺50円引き",
        description: "平日10時まで限定",
        validUntil: "2024-01-31",
      },
    ],
    reviews: [
      {
        customerName: "田中さん",
        rating: 5,
        comment: "味噌ラーメンが絶品です。毎回ここに足を運んでいます。",
        ownerReply: "いつもありがとうございます！これからも美味しいラーメンをお届けいたします。",
      },
      {
        customerName: "佐藤さん",
        rating: 4,
        comment: "深夜まで営業しているのは便利です。ラーメンも美味しいです。",
        ownerReply: "深夜営業のお役に立てて嬉しいです。いつでもお気軽にお越しください。",
      },
    ],
    jobInfo: {
      isHiring: true,
      message: "私たちと一緒に、このまちで働きませんか？",
      staffPhoto: "/cafe-staff-team-photo.jpg",
      positions: ["ホールスタッフ", "キッチンスタッフ"],
    },
    localContributions: [
      "津田沼商店街振興組合 加盟店",
      "習志野市少年サッカーチーム スポンサー",
      "地元農家「佐藤農園」から豚肉を仕入れ",
      "津田沼夏祭りに毎年出店",
    ],
    tags: ["深夜営業", "駅近", "人気店"],
    description: "地元で愛される老舗ラーメン店。昔ながらの醤油ラーメンが自慢です。",
    hours: {
      平日: "11:00 - 24:00",
      土日祝: "11:00 - 24:00",
      定休日: "なし",
    },
    menu: [
      { name: "醤油ラーメン", price: "¥750" },
      { name: "味噌ラーメン", price: "¥800" },
      { name: "チャーシュー麺", price: "¥950" },
      { name: "餃子", price: "¥450" },
    ],
    features: ["深夜24時まで営業", "駅から徒歩1分の好立地", "創業30年の老舗の味", "地元常連客に愛される"],
  },
  3: {
    id: 3,
    name: "谷津干潟自然観察センター",
    category: "観光・レジャー",
    location: "谷津干潟",
    address: "習志野市秋津5-1-1",
    phone: "047-454-8416",
    website: "https://yatsuhigata.jp",
    rating: 4.7,
    reviewCount: 89,
    image: "/---------.jpg",
    coverImage: "/---------.jpg",
    catchphrase: "谷津干潟の自然を楽しむための場所。四季を通じて様々な野鳥を観察できます。",
    connectionScore: {
      favorites: 150,
      hiredFromPlatform: 2,
      localEvents: 8,
      localIngredients: false,
    },
    ownerStory: {
      ownerName: "高橋 晴子",
      ownerImage: "/cafe-owner-woman-smiling.jpg",
      message:
        "谷津干潟の自然を愛し、地域の人々とつながりたいと思い、2010年にこのセンターを開きました。皆さんの心に温かいひとときをお届けしたいと思っています。",
      milestones: [
        { label: "創業", value: "2010年" },
        { label: "入館料累計", value: "30,000人" },
        { label: "習志野出身スタッフ", value: "1名" },
      ],
    },
    news: [
      {
        date: "2024-01-15",
        title: "新メニュー「秋津の鳥見」登場！",
        content: "谷津干潟の秋津の鳥見を楽しむことができます。",
      },
      {
        date: "2024-01-10",
        title: "スタッフ高橋さんの誕生日でした🎂",
        content: "常連のお客様からお花をいただき、とても温かい一日でした。",
      },
      {
        date: "2024-01-05",
        title: "今日のガイドツアー：冬の鳥見",
        content: "冬の鳥見を楽しむためのガイドツアーを開催しています。",
      },
    ],
    coupons: [
      {
        title: "初回来店15%OFF",
        description: "初めてご来店のお客様限定",
        validUntil: "2024-02-29",
      },
      {
        title: "双眼鏡レンタル50円引き",
        description: "平日10時まで限定",
        validUntil: "2024-01-31",
      },
    ],
    reviews: [
      {
        customerName: "山田さん",
        rating: 5,
        comment: "スタッフの皆さんに癒されます。鳥見も素晴らしいです。",
        ownerReply: "いつもありがとうございます！これからも心を込めてお迎えいたします。",
      },
      {
        customerName: "佐藤さん",
        rating: 4,
        comment: "自然観察が充実しています。子供たちも楽しんでいます。",
        ownerReply: "子供たちにも楽しんでいただける環境作りに努めています。いつでもお気軽にお越しください。",
      },
    ],
    jobInfo: {
      isHiring: true,
      message: "私たちと一緒に、このまちで働きませんか？",
      staffPhoto: "/cafe-staff-team-photo.jpg",
      positions: ["ガイドスタッフ", "観察スタッフ"],
    },
    localContributions: [
      "津田沼商店街振興組合 加盟店",
      "習志野市少年サッカーチーム スポンサー",
      "地元農家「高橋農園」から野菜を仕入れ",
      "津田沼夏祭りに毎年出店",
    ],
    tags: ["自然", "ファミリー", "教育"],
    description: "野鳥観察や自然学習ができる施設。四季を通じて様々な野鳥を観察できます。",
    hours: {
      平日: "9:00 - 17:00",
      土日祝: "9:00 - 17:00",
      定休日: "月曜日（祝日の場合は翌日）",
    },
    menu: [
      { name: "入館料（大人）", price: "¥370" },
      { name: "入館料（高校生以下）", price: "無料" },
      { name: "双眼鏡レンタル", price: "¥100" },
      { name: "ガイドツアー", price: "¥500" },
    ],
    features: ["年間を通じて野鳥観察可能", "ファミリー向けプログラム充実", "環境学習に最適", "専門スタッフによる解説"],
  },
  4: {
    id: 4,
    name: "イオンモール津田沼",
    category: "ショッピング",
    location: "津田沼駅",
    address: "習志野市津田沼1-23-1",
    phone: "047-493-5500",
    website: "https://tsudanuma-aeonmall.com",
    rating: 4.2,
    reviewCount: 1024,
    image: "/--------------.jpg",
    coverImage: "/--------------.jpg",
    catchphrase: "ファッションからグルメまで何でも揃う大型ショッピングモール。",
    connectionScore: {
      favorites: 500,
      hiredFromPlatform: 10,
      localEvents: 20,
      localIngredients: false,
    },
    ownerStory: {
      ownerName: "田中 太郎",
      ownerImage: "/cafe-staff-team-photo.jpg",
      message:
        "ファッションからグルメまで何でも揃う大型ショッピングモールを開きました。皆さんの心に温かいひとときをお届けしたいと思っています。",
      milestones: [
        { label: "創業", value: "2000年" },
        { label: "看板メニュー累計", value: "100,000品" },
        { label: "習志野出身スタッフ", value: "6名" },
      ],
    },
    news: [
      {
        date: "2024-01-15",
        title: "新メニュー「ファッションセール」登場！",
        content: "ファッションセールが開催されました。お手伝いください。",
      },
      {
        date: "2024-01-10",
        title: "スタッフ田中の誕生日でした🎂",
        content: "常連のお客様からお花をいただき、とても温かい一日でした。",
      },
      {
        date: "2024-01-05",
        title: "今日の映画館：最新作上映",
        content: "最新作の映画が上映されました。ぜひご来店ください。",
      },
    ],
    coupons: [
      {
        title: "初回来店25%OFF",
        description: "初めてご来店のお客様限定",
        validUntil: "2024-02-29",
      },
      {
        title: "映画館チケット50円引き",
        description: "平日10時まで限定",
        validUntil: "2024-01-31",
      },
    ],
    reviews: [
      {
        customerName: "山田さん",
        rating: 5,
        comment: "映画館が充実しています。最新作も楽しむことができます。",
        ownerReply: "いつもありがとうございます！これからも心を込めてお迎えいたします。",
      },
      {
        customerName: "佐藤さん",
        rating: 4,
        comment: "大型店舗が揃っています。何でも揃うショッピングモールです。",
        ownerReply: "大型店舗が揃っている環境作りに努めています。いつでもお気軽にお越しください。",
      },
    ],
    jobInfo: {
      isHiring: true,
      message: "私たちと一緒に、このまちで働きませんか？",
      staffPhoto: "/cafe-staff-team-photo.jpg",
      positions: ["ホールスタッフ", "キッチンスタッフ"],
    },
    localContributions: [
      "津田沼商店街振興組合 加盟店",
      "習志野市少年サッカーチーム スポンサー",
      "地元農家「田中農園」から食材を仕入れ",
      "津田沼夏祭りに毎年出店",
    ],
    tags: ["大型店", "駐車場", "フードコート"],
    description: "ファッションからグルメまで何でも揃う大型ショッピングモール。",
    hours: {
      平日: "10:00 - 22:00",
      土日祝: "10:00 - 22:00",
      定休日: "なし",
    },
    menu: [
      { name: "駐車場（3時間まで）", price: "無料" },
      { name: "映画館", price: "¥1,800" },
      { name: "フードコート", price: "¥500-1,500" },
      { name: "専門店", price: "店舗により異なる" },
    ],
    features: ["200店舗以上の専門店", "大型駐車場完備", "フードコート充実", "映画館・ゲームセンター併設"],
  },
}

export default function ShopDetailPage({ params }: { params: { id: string } }) {
  const shop = shopData[Number.parseInt(params.id) as keyof typeof shopData]
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  if (!shop) {
    notFound()
  }

  const handleRouteSearch = () => {
    const encodedAddress = encodeURIComponent(shop.address)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
    window.open(googleMapsUrl, "_blank")
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("お問い合わせを送信しました。ありがとうございます。")
    setShowContactForm(false)
    setContactForm({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-4 py-3 flex items-center gap-3">
        <Link href="/citizen" className="p-1">
          <ArrowLeft className="w-6 h-6 text-[#000000]" />
        </Link>
        <h1 className="text-lg font-semibold text-[#000000] flex-1 truncate">{shop.name}</h1>
        <div className="flex gap-2">
          <button className="p-2">
            <Heart className="w-5 h-5 text-[#666666]" />
          </button>
          <button className="p-2">
            <Share className="w-5 h-5 text-[#666666]" />
          </button>
        </div>
      </div>

      <div className="bg-white">
        <img src={shop.coverImage || "/placeholder.svg"} alt={shop.name} className="w-full h-64 object-cover" />

        <div className="p-4">
          <h2 className="text-xl font-bold text-[#000000] mb-2">{shop.name}</h2>
          <p className="text-[#666666] mb-4 leading-relaxed">{shop.catchphrase}</p>

          {/* つながりスコア */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#f0f8ff] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-[#007aff]" />
                <span className="text-xs text-[#666666]">お気に入り</span>
              </div>
              <span className="text-lg font-bold text-[#000000]">{shop.connectionScore.favorites}</span>
            </div>
            <div className="bg-[#f0f8ff] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#007aff]" />
                <span className="text-xs text-[#666666]">雇用貢献</span>
              </div>
              <span className="text-lg font-bold text-[#000000]">{shop.connectionScore.hiredFromPlatform}名</span>
            </div>
            <div className="bg-[#f0f8ff] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#007aff]" />
                <span className="text-xs text-[#666666]">イベント参加</span>
              </div>
              <span className="text-lg font-bold text-[#000000]">{shop.connectionScore.localEvents}回</span>
            </div>
            <div className="bg-[#f0f8ff] p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#007aff]" />
                <span className="text-xs text-[#666666]">地産地消</span>
              </div>
              <span className="text-sm font-bold text-[#007aff]">
                {shop.connectionScore.localIngredients ? "実践中" : "未実践"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-[#000000] mb-4">店主の想い</h3>

        <div className="flex gap-4 mb-4">
          <img
            src={shop.ownerStory.ownerImage || "/placeholder.svg"}
            alt={shop.ownerStory.ownerName}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-[#000000] mb-1">{shop.ownerStory.ownerName}</h4>
            <p className="text-sm text-[#666666] leading-relaxed">{shop.ownerStory.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {shop.ownerStory.milestones.map((milestone, index) => (
            <div key={index} className="text-center p-3 bg-[#f8f9fa] rounded-lg">
              <div className="text-lg font-bold text-[#007aff]">{milestone.value}</div>
              <div className="text-xs text-[#666666]">{milestone.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-[#000000] mb-4">お店の「いま」</h3>

        {/* ニュース・活動報告 */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#000000] mb-3">最新ニュース</h4>
          <div className="space-y-3">
            {shop.news.map((news, index) => (
              <div key={index} className="border-l-3 border-[#007aff] pl-3">
                <div className="text-xs text-[#666666] mb-1">{news.date}</div>
                <div className="font-medium text-[#000000] mb-1">{news.title}</div>
                <div className="text-sm text-[#666666]">{news.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* クーポン・特典 */}
        <div>
          <h4 className="font-semibold text-[#000000] mb-3">発行中のクーポン</h4>
          <div className="space-y-3">
            {shop.coupons.map((coupon, index) => (
              <div key={index} className="bg-[#fff3cd] border border-[#ffeaa7] rounded-lg p-3">
                <div className="font-medium text-[#000000] mb-1">{coupon.title}</div>
                <div className="text-sm text-[#666666] mb-2">{coupon.description}</div>
                <div className="text-xs text-[#e17055]">有効期限: {coupon.validUntil}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-[#000000] mb-4">まちの声</h3>

        {/* 口コミ */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#000000] mb-3">市民からの応援の声</h4>
          <div className="space-y-4">
            {shop.reviews.map((review, index) => (
              <div key={index} className="bg-[#f8f9fa] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-[#000000]">{review.customerName}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#666666] mb-3">{review.comment}</p>
                <div className="bg-white rounded p-2 border-l-3 border-[#007aff]">
                  <div className="text-xs text-[#666666] mb-1">店主からの返信</div>
                  <p className="text-sm text-[#000000]">{review.ownerReply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 求人情報 */}
        {shop.jobInfo.isHiring && (
          <div>
            <h4 className="font-semibold text-[#000000] mb-3">ここで働く仲間たち</h4>
            <div className="bg-[#f0f8ff] rounded-lg p-4">
              <p className="text-[#000000] mb-3">{shop.jobInfo.message}</p>
              <img
                src={shop.jobInfo.staffPhoto || "/placeholder.svg"}
                alt="スタッフ写真"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <div className="flex flex-wrap gap-2 mb-3">
                {shop.jobInfo.positions.map((position, index) => (
                  <span key={index} className="bg-[#007aff] text-white px-3 py-1 rounded text-sm">
                    {position}募集中
                  </span>
                ))}
              </div>
              <button className="w-full bg-white border border-[#007aff] text-[#007aff] py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                求人詳細を見る
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-[#000000] mb-4">習志野とのつながり</h3>

        {/* 地図 */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#000000] mb-3">私たちの場所 on 習志野MAP</h4>
          <div className="bg-[#f8f9fa] rounded-lg p-4 text-center">
            <MapPin className="w-8 h-8 text-[#007aff] mx-auto mb-2" />
            <p className="text-sm text-[#666666] mb-2">{shop.address}</p>
            <p className="text-xs text-[#666666]">津田沼図書館から徒歩3分 • バス停「津田沼駅前」から徒歩1分</p>
          </div>
        </div>

        {/* 地域貢献 */}
        <div>
          <h4 className="font-semibold text-[#000000] mb-3">地域への貢献・連携</h4>
          <div className="space-y-2">
            {shop.localContributions.map((contribution, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#007aff] rounded-full flex-shrink-0"></div>
                <span className="text-sm text-[#666666]">{contribution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-bold text-[#000000] mb-4">基本情報</h3>

        {/* Contact Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#666666] flex-shrink-0" />
            <span className="text-sm text-[#666666]">{shop.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#666666] flex-shrink-0" />
            <span className="text-sm text-[#666666]">{shop.phone}</span>
          </div>
          {shop.website && (
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#666666] flex-shrink-0" />
              <a
                href={shop.website}
                className="text-sm text-[#007aff] flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                公式サイト
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Hours */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[#666666]" />
            <h4 className="font-semibold text-[#000000]">営業時間</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(shop.hours).map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span className="text-sm text-[#666666]">{day}</span>
                <span className="text-sm text-[#000000]">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white mt-2 p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-[#007aff] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            お問い合わせ
          </button>
          <button
            onClick={handleRouteSearch}
            className="border border-[#007aff] text-[#007aff] py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            ルート検索
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
              <h3 className="text-lg font-semibold text-[#000000]">お問い合わせ</h3>
              <button onClick={() => setShowContactForm(false)} className="p-1">
                <X className="w-6 h-6 text-[#666666]" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#000000] mb-1">
                  お名前 <span className="text-[#ff3b30]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#dadada] rounded-lg focus:outline-none focus:border-[#007aff]"
                  placeholder="山田太郎"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-1">
                  メールアドレス <span className="text-[#ff3b30]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[#dadada] rounded-lg focus:outline-none focus:border-[#007aff]"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-1">電話番号</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-[#dadada] rounded-lg focus:outline-none focus:border-[#007aff]"
                  placeholder="090-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-1">
                  お問い合わせ内容 <span className="text-[#ff3b30]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3 py-2 border border-[#dadada] rounded-lg focus:outline-none focus:border-[#007aff] resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 py-3 px-4 border border-[#dadada] text-[#666666] rounded-lg font-medium"
                >
                  キャンセル
                </button>
                <button type="submit" className="flex-1 py-3 px-4 bg-[#007aff] text-white rounded-lg font-medium">
                  送信
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-20"></div>
    </div>
  )
}
