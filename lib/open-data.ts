// クライアントサイド対応のため、fsモジュールの代わりに静的インポートを使用

export interface Shop {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  category: string;
  type: string;
  rating?: number;
  description?: string;
  openingHours?: string;
  imageUrl?: string;
  features?: string[];
  priceRange?: string;
  popularItems?: string[];
}

export interface CulturalFacility {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  category: string;
  type: string;
}

// 文化施設データを静的にインポート
import culturalFacilitiesData from '../open-data/processed/cultural_facilities.json';

// 文化施設データを読み込む
export async function loadCulturalFacilities(): Promise<CulturalFacility[]> {
  try {
    return culturalFacilitiesData as CulturalFacility[];
  } catch (error) {
    console.error('文化施設データの読み込みに失敗しました:', error);
    return [];
  }
}

// 文化施設データを店舗データに変換
export function convertCulturalFacilitiesToShops(facilities: CulturalFacility[]): Shop[] {
  return facilities.map(facility => ({
    ...facility,
    rating: Math.random() * 2 + 3, // 3-5のランダム評価
    description: getCulturalFacilityDescription(facility.name),
    openingHours: getCulturalFacilityHours(facility.name),
    features: getCulturalFacilityFeatures(facility.name),
    priceRange: '無料',
    popularItems: getCulturalFacilityPopularItems(facility.name)
  }));
}

// 文化施設の説明を生成
function getCulturalFacilityDescription(name: string): string {
  const descriptions: { [key: string]: string } = {
    '習志野市民会館': '習志野市の中心的な文化施設。コンサートや演劇、展示会など様々なイベントが開催されています。',
    '習志野文化ホール': '音響設備が充実したホール。クラシックコンサートや講演会などに利用されています。',
    '旧大沢家住宅': '江戸時代後期の農家建築。習志野市の歴史を感じることができる貴重な文化財です。',
    '旧鴇田家住宅': '明治時代の商家建築。当時の生活様式を学ぶことができる歴史的建造物です。',
    '埋蔵文化財調査室': '習志野市の埋蔵文化財の調査・研究を行っている施設。考古学に興味のある方におすすめです。',
    'ドイツ捕虜オーケストラの碑': '第一次世界大戦時のドイツ人捕虜によるオーケストラ活動を記念した碑。歴史的意義のある場所です。'
  };
  
  return descriptions[name] || '習志野市の貴重な文化施設です。';
}

// 文化施設の営業時間を生成
function getCulturalFacilityHours(name: string): string {
  const hours: { [key: string]: string } = {
    '習志野市民会館': '9:00-21:00（イベントにより変動）',
    '習志野文化ホール': '9:00-21:00（公演により変動）',
    '旧大沢家住宅': '9:00-16:30（月曜休館）',
    '旧鴇田家住宅': '9:00-16:30（月曜休館）',
    '埋蔵文化財調査室': '9:00-17:00（土日祝休館）',
    'ドイツ捕虜オーケストラの碑': '常時見学可能'
  };
  
  return hours[name] || '9:00-17:00';
}

// 文化施設の特徴を生成
function getCulturalFacilityFeatures(name: string): string[] {
  const features: { [key: string]: string[] } = {
    '習志野市民会館': ['コンサート', '演劇', '展示会', '会議室'],
    '習志野文化ホール': ['音響設備', 'クラシック', '講演会', 'ホール'],
    '旧大沢家住宅': ['歴史建築', '江戸時代', '農家', '文化財'],
    '旧鴇田家住宅': ['明治建築', '商家', '歴史', '文化財'],
    '埋蔵文化財調査室': ['考古学', '研究', '調査', '文化財'],
    'ドイツ捕虜オーケストラの碑': ['歴史', '記念碑', '第一次世界大戦', '音楽史']
  };
  
  return features[name] || ['文化施設', '歴史', '教育'];
}

// 文化施設の人気アイテムを生成
function getCulturalFacilityPopularItems(name: string): string[] {
  const items: { [key: string]: string[] } = {
    '習志野市民会館': ['コンサート鑑賞', '演劇鑑賞', '展示会見学'],
    '習志野文化ホール': ['クラシックコンサート', '講演会参加'],
    '旧大沢家住宅': ['歴史見学', '建築見学', '写真撮影'],
    '旧鴇田家住宅': ['商家見学', '歴史学習', '文化体験'],
    '埋蔵文化財調査室': ['考古学学習', '文化財見学', '研究資料閲覧'],
    'ドイツ捕虜オーケストラの碑': ['歴史学習', '記念撮影', '平和学習']
  };
  
  return items[name] || ['見学', '学習', '体験'];
}

// デモ用の追加店舗データを生成
export function generateDemoShops(): Shop[] {
  return [
    {
      id: 1001,
      name: '習志野ラーメン 味噌屋',
      address: '習志野市本大久保2-1-15',
      latitude: 35.686273,
      longitude: 140.048193,
      phone: '047-476-1234',
      category: 'レストラン',
      type: 'restaurant',
      rating: 4.2,
      description: '習志野市で人気の味噌ラーメン店。濃厚な味噌スープが自慢です。',
      openingHours: '11:00-22:00（火曜定休）',
      features: ['味噌ラーメン', '濃厚スープ', '地元人気'],
      priceRange: '¥800-¥1,200',
      popularItems: ['味噌ラーメン', 'チャーシュー麺', '味玉ラーメン']
    },
    {
      id: 1002,
      name: 'カフェ 習志野',
      address: '習志野市谷津1-2-3',
      latitude: 35.688504,
      longitude: 140.020309,
      phone: '047-479-5678',
      category: 'カフェ',
      type: 'cafe',
      rating: 4.5,
      description: '落ち着いた雰囲気のカフェ。手作りのケーキとコーヒーが人気です。',
      openingHours: '8:00-19:00（水曜定休）',
      features: ['手作りケーキ', 'コーヒー', 'Wi-Fi', '落ち着いた雰囲気'],
      priceRange: '¥400-¥800',
      popularItems: ['チーズケーキ', 'カプチーノ', 'モーニングセット']
    },
    {
      id: 1003,
      name: '習志野商店街',
      address: '習志野市本大久保1-1-1',
      latitude: 35.685273,
      longitude: 140.047193,
      phone: '047-476-9999',
      category: 'ショッピング',
      type: 'shopping',
      rating: 4.0,
      description: '習志野市の中心部にある商店街。様々な店舗が軒を連ねています。',
      openingHours: '10:00-20:00（店舗により異なる）',
      features: ['商店街', '多様な店舗', '地元密着'],
      priceRange: '¥100-¥5,000',
      popularItems: ['地元野菜', '手作り商品', '日用品']
    }
  ];
}

// 全ての店舗データを取得
export async function getAllShops(): Promise<Shop[]> {
  const culturalFacilities = await loadCulturalFacilities();
  const culturalShops = convertCulturalFacilitiesToShops(culturalFacilities);
  const demoShops = generateDemoShops();
  
  return [...culturalShops, ...demoShops];
}

// カテゴリ別に店舗をフィルタリング
export function filterShopsByCategory(shops: Shop[], category: string): Shop[] {
  if (category === 'all') return shops;
  return shops.filter(shop => shop.category === category);
}

// 位置情報に基づいて店舗をソート
export function sortShopsByDistance(shops: Shop[], userLat: number, userLng: number): Shop[] {
  return shops.sort((a, b) => {
    const distanceA = calculateDistance(userLat, userLng, a.latitude, a.longitude);
    const distanceB = calculateDistance(userLat, userLng, b.latitude, b.longitude);
    return distanceA - distanceB;
  });
}

// 2点間の距離を計算（簡易版）
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 地球の半径（km）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
