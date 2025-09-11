export function RecentSearches() {
  const recentItems = [
    { title: "仕事内容", location: "津田沼駅" },
    { title: "仕事内容", location: "エリア名" },
  ]

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-[#000000] mb-4">最近検索された項目</h2>
      <div className="grid grid-cols-2 gap-4">
        {recentItems.map((item, index) => (
          <div key={index} className="bg-[#ffffff] rounded-lg overflow-hidden">
            <div className="w-full h-32 bg-[#d9d9d9]"></div>
            <div className="p-3">
              <h3 className="font-medium text-[#000000] mb-1">{item.title}</h3>
              <span className="inline-block bg-[#e5e5e5] text-[#666666] text-xs px-2 py-1 rounded">
                {item.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
