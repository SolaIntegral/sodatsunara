"use client"

import { useState } from "react"
import { TrendingUp, Users, MapPin, Clock } from "lucide-react"

export default function AnalyticsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const [analyticsData] = useState({
    demographics: {
      age: [
        { range: "20-29歳", percentage: 35, count: 142 },
        { range: "30-39歳", percentage: 28, count: 113 },
        { range: "40-49歳", percentage: 22, count: 89 },
        { range: "50-59歳", percentage: 15, count: 61 },
      ],
      gender: [
        { type: "女性", percentage: 58, count: 235 },
        { type: "男性", percentage: 42, count: 170 },
      ],
    },
    traffic: {
      peak_hours: [
        { time: "11:00-12:00", visitors: 45 },
        { time: "12:00-13:00", visitors: 78 },
        { time: "18:00-19:00", visitors: 62 },
        { time: "19:00-20:00", visitors: 55 },
      ],
    },
    competition: [
      { name: "近隣レストランA", distance: "200m", rating: 4.2, reviews: 156 },
      { name: "近隣レストランB", distance: "350m", rating: 3.8, reviews: 89 },
      { name: "近隣カフェC", distance: "150m", rating: 4.5, reviews: 203 },
    ],
  })

  return (
    <div className="px-6">
      {/* 期間選択 */}
      <div className="flex mb-6 bg-[#f8f9fa] rounded-lg p-1">
        <button
          onClick={() => setSelectedPeriod("week")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            selectedPeriod === "week" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          週間
        </button>
        <button
          onClick={() => setSelectedPeriod("month")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            selectedPeriod === "month" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          月間
        </button>
        <button
          onClick={() => setSelectedPeriod("year")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
            selectedPeriod === "year" ? "bg-[#ffffff] text-[#007aff] shadow-sm" : "text-[#666666]"
          }`}
        >
          年間
        </button>
      </div>

      {/* 顧客属性分析 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-[#007aff]" />
          顧客属性分析
        </h3>

        {/* 年齢層分析 */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 mb-4">
          <h4 className="font-medium text-[#000000] mb-3">年齢層別来店者数</h4>
          <div className="space-y-3">
            {analyticsData.demographics.age.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#000000]">{item.range}</span>
                  <span className="text-[#666666]">
                    {item.count}人 ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[#e5e5e5] rounded-full h-2">
                  <div className="bg-[#007aff] h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 性別分析 */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4 mb-4">
          <h4 className="font-medium text-[#000000] mb-3">性別分析</h4>
          <div className="grid grid-cols-2 gap-4">
            {analyticsData.demographics.gender.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-[#000000]">{item.percentage}%</div>
                <div className="text-sm text-[#666666]">{item.type}</div>
                <div className="text-xs text-[#666666]">({item.count}人)</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 来店時間分析 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#ff9500]" />
          来店時間分析
        </h3>
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h4 className="font-medium text-[#000000] mb-3">ピーク時間帯</h4>
          <div className="space-y-3">
            {analyticsData.traffic.peak_hours.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#000000]">{item.time}</span>
                  <span className="text-[#666666]">{item.visitors}人</span>
                </div>
                <div className="w-full bg-[#e5e5e5] rounded-full h-2">
                  <div
                    className="bg-[#ff9500] h-2 rounded-full"
                    style={{ width: `${(item.visitors / 78) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 競合分析 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#34c759]" />
          競合店舗分析
        </h3>
        <div className="space-y-3">
          {analyticsData.competition.map((competitor, index) => (
            <div key={index} className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-[#000000]">{competitor.name}</h4>
                  <p className="text-sm text-[#666666]">距離: {competitor.distance}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#000000]">★{competitor.rating}</div>
                  <div className="text-xs text-[#666666]">{competitor.reviews}件</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 改善提案 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[#ff3b30]" />
          売上向上提案
        </h3>
        <div className="space-y-3">
          <div className="bg-[#fff3cd] border border-[#ffeaa7] rounded-lg p-4">
            <h4 className="font-medium text-[#856404] mb-2">ランチタイム強化提案</h4>
            <p className="text-sm text-[#856404]">
              12-13時の来店者数が最も多いため、ランチメニューの充実やランチ限定クーポンの発行を検討してください。
            </p>
          </div>
          <div className="bg-[#d1ecf1] border border-[#bee5eb] rounded-lg p-4">
            <h4 className="font-medium text-[#0c5460] mb-2">女性客向けサービス強化</h4>
            <p className="text-sm text-[#0c5460]">
              女性客が58%を占めているため、女性向けのヘルシーメニューやデザートメニューの拡充が効果的です。
            </p>
          </div>
          <div className="bg-[#d4edda] border border-[#c3e6cb] rounded-lg p-4">
            <h4 className="font-medium text-[#155724] mb-2">競合差別化戦略</h4>
            <p className="text-sm text-[#155724]">
              近隣カフェCの評価が高いため、コーヒーメニューの強化やカフェタイムサービスの導入を検討してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
