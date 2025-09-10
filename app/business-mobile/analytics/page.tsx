"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, MapPin, Users, Calendar, TrendingUp, Megaphone } from "lucide-react"
import { analyzeBusinessArea } from "../../../data/narashino-open-data"

export default function BusinessMobileAnalyticsPage() {
  const [businessLocation] = useState({ lat: 35.6895, lng: 140.0234 }) // 津田沼駅周辺
  const [analysisData, setAnalysisData] = useState<any>(null)

  useEffect(() => {
    // 商圏分析データを取得
    const data = analyzeBusinessArea(businessLocation, 1000)
    setAnalysisData(data)
  }, [businessLocation])

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-[#666666]">データを読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/business-mobile" className="w-24 h-8 bg-[#d9d9d9] rounded flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-semibold text-[#000000]">データ分析</h1>
        <div className="w-24"></div>
      </div>

      <div className="px-6 space-y-6">
        {/* 商圏分析サマリー */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h2 className="font-medium text-[#000000] mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#007aff]" />
            商圏分析サマリー
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">
                {analysisData.demographics.population.toLocaleString()}
              </div>
              <div className="text-xs text-[#666666]">周辺人口</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">
                {analysisData.demographics.households.toLocaleString()}
              </div>
              <div className="text-xs text-[#666666]">世帯数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">{analysisData.demographics.businessCount}</div>
              <div className="text-xs text-[#666666]">競合店舗数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#000000]">{analysisData.nearbyFacilities.length}</div>
              <div className="text-xs text-[#666666]">周辺施設</div>
            </div>
          </div>
        </div>

        {/* 年齢層分析 */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h3 className="font-medium text-[#000000] mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#34c759]" />
            周辺住民の年齢構成
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#666666]">15歳未満</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-[#e5e5e5] rounded-full mr-2">
                  <div
                    className="h-full bg-[#ff3b30] rounded-full"
                    style={{ width: `${analysisData.demographics.ageGroups.age0_14}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-[#000000]">
                  {analysisData.demographics.ageGroups.age0_14}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#666666]">15-64歳（働き盛り）</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-[#e5e5e5] rounded-full mr-2">
                  <div
                    className="h-full bg-[#007aff] rounded-full"
                    style={{ width: `${analysisData.demographics.ageGroups.age15_64}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-[#000000]">
                  {analysisData.demographics.ageGroups.age15_64}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#666666]">65歳以上</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-[#e5e5e5] rounded-full mr-2">
                  <div
                    className="h-full bg-[#ff9500] rounded-full"
                    style={{ width: `${analysisData.demographics.ageGroups.age65plus}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-[#000000]">
                  {analysisData.demographics.ageGroups.age65plus}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-[#e5e5e5] rounded-lg">
            <p className="text-sm text-[#000000]">
              <strong>分析結果:</strong> 働き盛りの15-64歳が{analysisData.demographics.ageGroups.age15_64}
              %を占めており、 ランチタイムやアフター5の需要が見込めます。
            </p>
          </div>
        </div>

        {/* 周辺施設情報 */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h3 className="font-medium text-[#000000] mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#5856d6]" />
            周辺施設（徒歩圏内）
          </h3>
          <div className="space-y-3">
            {analysisData.nearbyFacilities.map((facility: any) => (
              <div key={facility.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#000000]">{facility.name}</div>
                  <div className="text-xs text-[#666666]">{facility.type}</div>
                </div>
                <div className="text-sm text-[#007aff]">{facility.distance}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#e5e5e5] rounded-lg">
            <p className="text-sm text-[#000000]">
              <strong>マーケティングのヒント:</strong> 津田沼駅から徒歩5分の立地を活かし、
              通勤・通学客向けのモーニングサービスや駅弁販売が効果的です。
            </p>
          </div>
        </div>

        {/* 今後のイベント */}
        <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-4">
          <h3 className="font-medium text-[#000000] mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[#ff9500]" />
            今後の地域イベント
          </h3>
          <div className="space-y-3">
            {analysisData.upcomingEvents.map((event: any) => (
              <div key={event.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#000000]">{event.name}</div>
                  <div className="text-xs text-[#666666]">{event.location}</div>
                  <div className="text-xs text-[#007aff]">
                    予想来場者: {event.expectedAttendance.toLocaleString()}人
                  </div>
                </div>
                <div className="text-sm text-[#ff9500]">{event.date}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#e5e5e5] rounded-lg">
            <p className="text-sm text-[#000000]">
              <strong>販促チャンス:</strong> 津田沼夏祭りに合わせて特別メニューや
              テイクアウト商品を準備すると集客効果が期待できます。
            </p>
          </div>
        </div>

        {/* アクションプラン */}
        <div className="bg-[#007aff] text-[#ffffff] rounded-lg p-4">
          <h3 className="font-medium mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            データに基づく売上向上プラン
          </h3>
          <div className="space-y-2 text-sm">
            <div>• 働き盛り層向けのランチセット強化</div>
            <div>• 駅近立地を活かした朝食メニュー開発</div>
            <div>• 夏祭り期間中の特別キャンペーン実施</div>
            <div>• 図書館利用者向けの静かな席の提供</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-[#e5e5e5]">
        <div className="flex justify-around py-2">
          <Link href="/business-mobile" className="flex flex-col items-center py-2 px-4">
            <TrendingUp className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">ダッシュボード</span>
          </Link>
          <Link href="/business-mobile/marketing" className="flex flex-col items-center py-2 px-4">
            <Megaphone className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">集客・販促</span>
          </Link>
          <Link href="/business-mobile/jobs" className="flex flex-col items-center py-2 px-4">
            <Users className="w-6 h-6 text-[#666666] mb-1" />
            <span className="text-xs text-[#666666]">求人・採用</span>
          </Link>
          <div className="flex flex-col items-center py-2 px-4">
            <BarChart3 className="w-6 h-6 text-[#007aff] mb-1" />
            <span className="text-xs text-[#007aff] font-medium">データ分析</span>
          </div>
          <Link href="/business-mobile/settings" className="flex flex-col items-center py-2 px-4">
            <svg className="w-6 h-6 text-[#666666] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs text-[#666666]">設定</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
