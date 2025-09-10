export interface DemographicData {
  area: string
  population: number
  ageGroups: {
    age0_14: number
    age15_64: number
    age65plus: number
  }
  households: number
  businessCount: number
}

export interface EventData {
  id: string
  name: string
  date: string
  location: string
  expectedAttendance: number
  category: string
}

export interface FacilityData {
  id: string
  name: string
  type: string
  address: string
  coordinates: { lat: number; lng: number }
  distance?: string
}

// 習志野市の実際のオープンデータを模擬したデータ
export const narashimodemographics: DemographicData[] = [
  {
    area: "津田沼地区",
    population: 45000,
    ageGroups: { age0_14: 12, age15_64: 65, age65plus: 23 },
    households: 22000,
    businessCount: 850,
  },
  {
    area: "習志野台地区",
    population: 38000,
    ageGroups: { age0_14: 15, age15_64: 62, age65plus: 23 },
    households: 18500,
    businessCount: 420,
  },
  {
    area: "実籾地区",
    population: 32000,
    ageGroups: { age0_14: 13, age15_64: 60, age65plus: 27 },
    households: 15800,
    businessCount: 320,
  },
]

export const upcomingEvents: EventData[] = [
  {
    id: "1",
    name: "津田沼夏祭り",
    date: "2024-07-15",
    location: "津田沼駅前広場",
    expectedAttendance: 15000,
    category: "地域イベント",
  },
  {
    id: "2",
    name: "習志野市商工祭",
    date: "2024-08-10",
    location: "習志野文化ホール",
    expectedAttendance: 8000,
    category: "商工イベント",
  },
  {
    id: "3",
    name: "実籾秋祭り",
    date: "2024-09-20",
    location: "実籾本郷公園",
    expectedAttendance: 5000,
    category: "地域イベント",
  },
]

export const nearbyFacilities: FacilityData[] = [
  {
    id: "1",
    name: "津田沼図書館",
    type: "図書館",
    address: "習志野市津田沼1-12-1",
    coordinates: { lat: 35.6895, lng: 140.0234 },
  },
  {
    id: "2",
    name: "津田沼駅",
    type: "駅",
    address: "習志野市津田沼1-1-1",
    coordinates: { lat: 35.6901, lng: 140.0201 },
  },
  {
    id: "3",
    name: "津田沼公園",
    type: "公園",
    address: "習志野市津田沼2-5-1",
    coordinates: { lat: 35.6888, lng: 140.0267 },
  },
  {
    id: "4",
    name: "習志野市役所",
    type: "行政機関",
    address: "習志野市鷺沼2-1-1",
    coordinates: { lat: 35.6756, lng: 140.0123 },
  },
]

// 商圏分析用のデータ処理関数
export function analyzeBusinessArea(businessLocation: { lat: number; lng: number }, radius = 1000) {
  // 指定された半径内の施設を抽出
  const nearbyFacilitiesInRadius = nearbyFacilities
    .map((facility) => {
      const distance = calculateDistance(businessLocation, facility.coordinates)
      return {
        ...facility,
        distance: `徒歩${Math.ceil(distance / 80)}分`, // 徒歩1分=80mで計算
      }
    })
    .filter((facility) => calculateDistance(businessLocation, facility.coordinates) <= radius)

  return {
    demographics: narashimodemographics[0], // 津田沼地区のデータを返す
    nearbyFacilities: nearbyFacilitiesInRadius,
    upcomingEvents: upcomingEvents.filter(
      (event) => event.location.includes("津田沼") || event.location.includes("習志野"),
    ),
  }
}

function calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
  // 簡易的な距離計算（メートル単位）
  const R = 6371000 // 地球の半径（メートル）
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
