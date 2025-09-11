'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Star, Clock, Navigation } from 'lucide-react';

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
}

interface ShopMapProps {
  shops?: Shop[];
  selectedCategory?: string;
  onShopSelect?: (shop: Shop) => void;
}

export default function ShopMap({ shops = [], selectedCategory, onShopSelect }: ShopMapProps) {
  const [filteredShops, setFilteredShops] = useState<Shop[]>(shops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 35.685273, lng: 140.047193 }); // 習志野市の中心

  useEffect(() => {
    if (selectedCategory) {
      setFilteredShops(shops.filter(shop => shop.category === selectedCategory));
    } else {
      setFilteredShops(shops);
    }
  }, [shops, selectedCategory]);

  const handleShopClick = (shop: Shop) => {
    setSelectedShop(shop);
    setMapCenter({ lat: shop.latitude, lng: shop.longitude });
    onShopSelect?.(shop);
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
    <div className="w-full h-full flex flex-col lg:flex-row gap-4">
      {/* 地図エリア */}
      <div className="flex-1 h-96 lg:h-full bg-gray-100 rounded-lg relative overflow-hidden">
        {/* 簡易地図表示（実際の実装ではGoogle MapsやLeafletを使用） */}
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative">
          {/* 地図の背景パターン */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-gray-200"></div>
              ))}
            </div>
          </div>
          
          {/* 店舗マーカー */}
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${((shop.longitude - 140.0) / 0.1) * 50 + 50}%`,
                top: `${((35.7 - shop.latitude) / 0.1) * 50 + 50}%`
              }}
              onClick={() => handleShopClick(shop)}
            >
              <div className={`w-8 h-8 rounded-full ${getCategoryColor(shop.category)} flex items-center justify-center text-white text-sm shadow-lg hover:scale-110 transition-transform`}>
                {getCategoryIcon(shop.type)}
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {shop.name}
              </div>
            </div>
          ))}
          
          {/* 地図のタイトル */}
          <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
            <h3 className="font-semibold text-gray-800">習志野市内のお店マップ</h3>
            <p className="text-sm text-gray-600">{filteredShops.length}件の店舗</p>
          </div>
        </div>
      </div>

      {/* 店舗リスト */}
      <div className="w-full lg:w-80 h-96 lg:h-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">店舗一覧</h3>
          <p className="text-sm text-gray-600">{filteredShops.length}件の店舗が見つかりました</p>
        </div>
        
        <div className="overflow-y-auto h-full pb-4">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedShop?.id === shop.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => handleShopClick(shop)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${getCategoryColor(shop.category)} flex items-center justify-center text-white text-lg`}>
                  {getCategoryIcon(shop.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{shop.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{shop.address}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {shop.phone && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        <span>{shop.phone}</span>
                      </div>
                    )}
                    
                    {shop.rating && (
                      <div className="flex items-center gap-1 text-xs text-yellow-600">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{shop.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {shop.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{shop.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredShops.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>該当する店舗が見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
