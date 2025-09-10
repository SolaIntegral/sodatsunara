import { Star, Reply } from "lucide-react"

export function RecentReviews() {
  const reviews = [
    {
      user: "田中さん",
      rating: 5,
      comment: "とても美味しい料理でした。スタッフの方も親切で、また来たいと思います。",
      date: "2024年1月15日",
      replied: false,
    },
    {
      user: "佐藤さん",
      rating: 4,
      comment: "雰囲気が良くて、友人との食事に最適でした。",
      date: "2024年1月14日",
      replied: true,
    },
    {
      user: "山田さん",
      rating: 5,
      comment: "地元の食材を使った料理が絶品でした。",
      date: "2024年1月13日",
      replied: false,
    },
  ]

  return (
    <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#000000]">新着口コミ</h3>
        <button className="text-sm text-[#007aff] hover:underline">すべて見る</button>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-[#e5e5e5] pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-[#000000]">{review.user}</span>
                <div className="flex">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ff3b30] text-[#ff3b30]" />
                    ))}
                </div>
              </div>
              <span className="text-sm text-[#666666]">{review.date}</span>
            </div>
            <p className="text-[#000000] mb-3">{review.comment}</p>
            <div className="flex items-center space-x-2">
              {review.replied ? (
                <span className="text-sm text-[#007aff]">返信済み</span>
              ) : (
                <button className="flex items-center space-x-1 text-sm text-[#007aff] hover:underline">
                  <Reply className="w-4 h-4" />
                  <span>返信する</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
