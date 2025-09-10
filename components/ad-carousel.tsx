"use client"

import { useState, useEffect } from "react"

const advertisements = [
  {
    id: 1,
    title: "習志野市商工会議所",
    subtitle: "地域企業を応援しています",
    image: "/ads/chamber-of-commerce.jpg",
    backgroundColor: "#007aff",
  },
  {
    id: 2,
    title: "津田沼駅前商店街",
    subtitle: "お得なクーポン配布中",
    image: "/ads/shopping-street.jpg",
    backgroundColor: "#ff3b30",
  },
  {
    id: 3,
    title: "習志野市役所",
    subtitle: "市民サービス向上に取り組んでいます",
    image: "/ads/city-hall.jpg",
    backgroundColor: "#34c759",
  },
  {
    id: 4,
    title: "谷津バラ園",
    subtitle: "四季折々の美しい花々をお楽しみください",
    image: "/ads/rose-garden.jpg",
    backgroundColor: "#ff9500",
  },
]

export function AdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      <div className="w-full h-48 rounded-lg overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {advertisements.map((ad) => (
            <div
              key={ad.id}
              className="w-full h-full flex-shrink-0 relative"
              style={{ backgroundColor: ad.backgroundColor }}
            >
              <img
                src={ad.image || "/placeholder.svg"}
                alt={ad.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold mb-1">{ad.title}</h3>
                <p className="text-white text-sm opacity-90">{ad.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {advertisements.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#000000]" : "bg-[#cccccc]"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
