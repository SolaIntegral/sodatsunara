'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Search, Star, Navigation } from 'lucide-react';
import ShopMap from '@/components/shop-map';
import RecommendedShops from '@/components/recommended-shops';
import { getAllShops, filterShopsByCategory, sortShopsByDistance, Shop } from '@/lib/open-data';

export default function DiscoverPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'map' | 'recommendations'>('recommendations');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    loadShops();
    getUserLocation();
  }, []);

  useEffect(() => {
    filterAndSearchShops();
  }, [shops, selectedCategory, searchQuery]);

  const loadShops = async () => {
    try {
      setIsLoading(true);
      const allShops = await getAllShops();
      setShops(allShops);
    } catch (error) {
      console.error('店舗データの読み込みに失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('位置情報の取得に失敗しました:', error);
        }
      );
    }
  };

  const filterAndSearchShops = () => {
    let filtered = shops;

    // カテゴリフィルタリング
    if (selectedCategory !== 'all') {
      filtered = filterShopsByCategory(filtered, selectedCategory);
    }

    // 検索クエリフィルタリング
    if (searchQuery) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 位置情報に基づくソート
    if (userLocation) {
      filtered = sortShopsByDistance(filtered, userLocation.lat, userLocation.lng);
    }

    setFilteredShops(filtered);
  };

  const categories = [
    { value: 'all', label: 'すべて', count: shops.length },
    { value: '文化施設', label: '文化施設', count: shops.filter(s => s.category === '文化施設').length },
    { value: 'レストラン', label: 'レストラン', count: shops.filter(s => s.category === 'レストラン').length },
    { value: 'カフェ', label: 'カフェ', count: shops.filter(s => s.category === 'カフェ').length },
    { value: 'ショッピング', label: 'ショッピング', count: shops.filter(s => s.category === 'ショッピング').length }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">店舗情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-primary">
      {/* ヘッダー */}
      <div className="bg-card shadow-soft border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-main-primary">習志野市を発見</h1>
              <p className="text-text-secondary mt-1">市内の魅力的なスポットとお店をご紹介します</p>
            </div>
            
            {/* タブ切り替え */}
            <div className="flex bg-base-secondary rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'recommendations'
                    ? 'bg-card text-main-primary shadow-soft'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setActiveTab('recommendations')}
              >
                おすすめ
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'map'
                    ? 'bg-card text-main-primary shadow-soft'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setActiveTab('map')}
              >
                マップ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'recommendations' ? (
          <div>
            {/* 検索とフィルター */}
            <div className="bg-card rounded-lg shadow-soft p-6 mb-8 border border-border-light">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 検索バー */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-5 h-5" />
                  <input
                    type="text"
                    placeholder="店舗名や住所で検索..."
                    className="w-full pl-10 pr-4 py-3 border border-border-medium rounded-lg focus:ring-2 focus:ring-main-primary focus:border-main-primary bg-input text-text-primary placeholder-text-tertiary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* カテゴリフィルター */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-main-primary text-white'
                          : 'bg-base-secondary text-text-secondary hover:bg-main-light hover:text-text-primary'
                      }`}
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* おすすめ店舗 */}
            <RecommendedShops 
              shops={filteredShops} 
              userPreferences={{
                categories: selectedCategory !== 'all' ? [selectedCategory] : undefined,
                location: userLocation || undefined
              }}
            />
          </div>
        ) : (
          <div>
            {/* マップ用のフィルター */}
            <div className="bg-card rounded-lg shadow-soft p-4 mb-6 border border-border-light">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-text-tertiary" />
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-main-primary text-white'
                          : 'bg-base-secondary text-text-secondary hover:bg-main-light hover:text-text-primary'
                      }`}
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* マップ */}
            <div className="bg-card rounded-lg shadow-soft overflow-hidden border border-border-light" style={{ height: '600px' }}>
              <ShopMap 
                shops={filteredShops}
                selectedCategory={selectedCategory !== 'all' ? selectedCategory : undefined}
              />
            </div>
          </div>
        )}

        {/* 統計情報 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border-light">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-main-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">総店舗数</p>
                <p className="text-2xl font-bold text-text-primary">{shops.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border-light">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-accent-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">平均評価</p>
                <p className="text-2xl font-bold text-text-primary">
                  {(shops.reduce((sum, shop) => sum + (shop.rating || 0), 0) / shops.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border-light">
            <div className="flex items-center">
              <Navigation className="w-8 h-8 text-main-secondary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">文化施設</p>
                <p className="text-2xl font-bold text-text-primary">
                  {shops.filter(s => s.category === '文化施設').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-soft p-6 border border-border-light">
            <div className="flex items-center">
              <Filter className="w-8 h-8 text-accent-secondary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">カテゴリ数</p>
                <p className="text-2xl font-bold text-text-primary">
                  {new Set(shops.map(s => s.category)).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}