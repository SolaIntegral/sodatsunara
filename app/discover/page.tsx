import { MobileNavigation } from "@/components/mobile-navigation"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] pb-20">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="w-24 h-8 bg-[#d9d9d9] rounded"></div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 bg-[#d9d9d9] rounded"></div>
          <div className="w-10 h-10 bg-[#d9d9d9] rounded-full"></div>
        </div>
      </div>

      <div className="px-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="キーワードを検索"
            className="w-full bg-[#ffffff] rounded-full px-4 py-3 text-[#666666] placeholder-[#666666] outline-none"
          />
        </div>

        {/* Featured Job */}
        <div className="mb-8">
          <div className="w-full h-32 bg-[#595959] rounded-lg flex items-end p-4">
            <span className="bg-[#ffffff] text-[#000000] text-sm px-3 py-1 rounded">アルバイト</span>
          </div>
        </div>

        {/* Modal/Popup */}
        <div className="fixed inset-x-6 bottom-32 bg-[#ffffff] rounded-lg p-6 shadow-lg">
          <h3 className="font-medium text-[#000000] mb-2">どのような仕事内容か</h3>
          <span className="inline-block bg-[#e5e5e5] text-[#666666] text-sm px-3 py-1 rounded">津田沼駅</span>
        </div>
      </div>

      <MobileNavigation />
    </div>
  )
}
