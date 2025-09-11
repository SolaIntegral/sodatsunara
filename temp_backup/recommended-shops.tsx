'use client';

import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Clock, Heart, Share2, Navigation } from 'lucide-react';

interface Shop {
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

interface RecommendedShopsProps {
  shops: Shop[];
  userPreferences?: {
    categories?: string[];
    priceRange?: string;
    location?: { lat: number; lng: number };
  };
}

export default function RecommendedShops({ shops, userPreferences }: RecommendedShopsProps) {
  const [recommendedShops, setRecommendedShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    // おすすめ店舗を計算
    const recommendations = calculateRecommendations(shops, userPreferences);
    setRecommendedShops(recommendations);
  }, [shops, userPreferences]);

  const calculateRecommendations = (shops: Shop[], preferences?: any): Shop[] => {
    // 基本的なスコアリングシステム
    return shops.map(shop => ({
      ...shop,
      score: calculateShopScore(shop, preferences)
    })).sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 6);
  };

  const calculateShopScore = (shop: Shop, preferences?: any): number => {
    let score = 0;
    
    // 基本スコア（文化施設は高評価）
    if (shop.type === 'cultural') score += 10;
    
    // 評価スコア
    if (shop.rating) score += shop.rating * 2;
    
    // カテゴリマッチング
    if (preferences?.categories?.includes(shop.category)) score += 5;
    
    // ランダム要素（実際の実装では、ユーザーの行動履歴などを考慮）
    score += Math.random() * 3;
    
    return score;
  };

  const toggleFavorite = (shopId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(shopId)) {
      newFavorites.delete(shopId);
    } else {
      newFavorites.add(shopId);
    }
    setFavorites(newFavorites);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '文化施設': 'bg-blue-500',
      'レストラン': 'bg-red-500',
      'カフェ': 'bg-yellow-500',
      'ショッピング': 'bg-green-500',
      'その他': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'cultural':
        return '🏛️';
      case 'restaurant':
        return '🍽️';
      case 'cafe':
        return '☕';
      case 'shopping':
        return '🛍️';
      default:
        return '📍';
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">おすすめのお店</h2>
        <p className="text-gray-600">習志野市の魅力的なスポットをご紹介します</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedShops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedShop(shop)}
          >
            {/* 店舗画像エリア */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full ${getCategoryColor(shop.category)} flex items-center justify-center text-white text-2xl`}>
                  {getCategoryIcon(shop.type)}
                </div>
              </div>
              
              {/* お気に入りボタン */}
              <button
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(shop.id);
                }}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    favorites.has(shop.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`} 
                />
              </button>
              
              {/* カテゴリバッジ */}
              <div className="absolute top-3 left-3">
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                  {shop.category}
                </span>
              </div>
            </div>

            {/* 店舗情報 */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{shop.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{shop.address}</p>
              
              {/* 評価と特徴 */}
              <div className="flex items-center gap-4 mb-3">
                {shop.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                  </div>
                )}
                
                {shop.priceRange && (
                  <span className="text-sm text-gray-500">{shop.priceRange}</span>
                )}
              </div>

              {/* 特徴タグ */}
              {shop.features && shop.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {shop.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* アクションボタン */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" />
                  ナビ
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 店舗詳細モーダル */}
      {selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedShop.name}</h2>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedShop(null)}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-full ${getCategoryColor(selectedShop.category)} flex items-center justify-center text-white text-3xl`}>
                      {getCategoryIcon(selectedShop.type)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedShop.address}</span>
                    </div>
                    
                    {selectedShop.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{selectedShop.phone}</span>
                      </div>
                    )}
                    
                    {selectedShop.openingHours && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{selectedShop.openingHours}</span>
                      </div>
                    )}
                    
                    {selectedShop.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-gray-700">{selectedShop.rating}/5.0</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedShop.description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">詳細情報</h3>
                  <p className="text-gray-700">{selectedShop.description}</p>
                </div>
              )}

              {selectedShop.popularItems && selectedShop.popularItems.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">人気メニュー・商品</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedShop.popularItems.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Navigation className="w-5 h-5" />
                  ナビゲーション
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
