#!/usr/bin/env python3
"""
習志野市オープンデータ処理サービス
データベースに接続してオープンデータを処理・保存する
"""

import os
import sys
import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
import json
import logging

# ログ設定
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def connect_to_database():
    """データベースに接続"""
    try:
        conn = psycopg2.connect(
            host=os.getenv('DATABASE_HOST', 'db'),
            port=os.getenv('DATABASE_PORT', '5432'),
            database=os.getenv('DATABASE_NAME', 'sodatunara'),
            user=os.getenv('DATABASE_USER', 'postgres'),
            password=os.getenv('DATABASE_PASSWORD', 'password')
        )
        return conn
    except Exception as e:
        logger.error(f"データベース接続エラー: {e}")
        return None

def create_tables(conn):
    """テーブルを作成"""
    try:
        with conn.cursor() as cur:
            # 文化施設テーブル
            cur.execute("""
                CREATE TABLE IF NOT EXISTS cultural_facilities (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address TEXT,
                    latitude DECIMAL(10, 8),
                    longitude DECIMAL(11, 8),
                    phone VARCHAR(50),
                    category VARCHAR(100),
                    type VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # 店舗テーブル
            cur.execute("""
                CREATE TABLE IF NOT EXISTS shops (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address TEXT,
                    latitude DECIMAL(10, 8),
                    longitude DECIMAL(11, 8),
                    phone VARCHAR(50),
                    category VARCHAR(100),
                    type VARCHAR(50),
                    rating DECIMAL(3, 2),
                    description TEXT,
                    opening_hours VARCHAR(255),
                    price_range VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            conn.commit()
            logger.info("テーブル作成完了")
    except Exception as e:
        logger.error(f"テーブル作成エラー: {e}")
        conn.rollback()

def load_cultural_facilities():
    """文化施設データを読み込み"""
    try:
        data_path = '/app/data/processed/cultural_facilities.json'
        with open(data_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        logger.info(f"文化施設データ読み込み完了: {len(data)}件")
        return data
    except Exception as e:
        logger.error(f"文化施設データ読み込みエラー: {e}")
        return []

def insert_cultural_facilities(conn, facilities):
    """文化施設データをデータベースに挿入"""
    try:
        with conn.cursor() as cur:
            for facility in facilities:
                cur.execute("""
                    INSERT INTO cultural_facilities 
                    (name, address, latitude, longitude, phone, category, type)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (
                    facility.get('name'),
                    facility.get('address'),
                    facility.get('latitude'),
                    facility.get('longitude'),
                    facility.get('phone'),
                    facility.get('category'),
                    facility.get('type')
                ))
            conn.commit()
            logger.info(f"文化施設データ挿入完了: {len(facilities)}件")
    except Exception as e:
        logger.error(f"文化施設データ挿入エラー: {e}")
        conn.rollback()

def generate_demo_shops():
    """デモ店舗データを生成"""
    demo_shops = [
        {
            'name': '習志野ラーメン 味噌屋',
            'address': '習志野市本大久保2-1-15',
            'latitude': 35.686273,
            'longitude': 140.048193,
            'phone': '047-476-1234',
            'category': 'レストラン',
            'type': 'restaurant',
            'rating': 4.2,
            'description': '習志野市で人気の味噌ラーメン店。濃厚な味噌スープが自慢です。',
            'opening_hours': '11:00-22:00（火曜定休）',
            'price_range': '¥800-¥1,200'
        },
        {
            'name': 'カフェ 習志野',
            'address': '習志野市谷津1-2-3',
            'latitude': 35.688504,
            'longitude': 140.020309,
            'phone': '047-479-5678',
            'category': 'カフェ',
            'type': 'cafe',
            'rating': 4.5,
            'description': '落ち着いた雰囲気のカフェ。手作りのケーキとコーヒーが人気です。',
            'opening_hours': '8:00-19:00（水曜定休）',
            'price_range': '¥400-¥800'
        },
        {
            'name': '習志野商店街',
            'address': '習志野市本大久保1-1-1',
            'latitude': 35.685273,
            'longitude': 140.047193,
            'phone': '047-476-9999',
            'category': 'ショッピング',
            'type': 'shopping',
            'rating': 4.0,
            'description': '習志野市の中心部にある商店街。様々な店舗が軒を連ねています。',
            'opening_hours': '10:00-20:00（店舗により異なる）',
            'price_range': '¥100-¥5,000'
        }
    ]
    return demo_shops

def insert_shops(conn, shops):
    """店舗データをデータベースに挿入"""
    try:
        with conn.cursor() as cur:
            for shop in shops:
                cur.execute("""
                    INSERT INTO shops 
                    (name, address, latitude, longitude, phone, category, type, rating, description, opening_hours, price_range)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (
                    shop.get('name'),
                    shop.get('address'),
                    shop.get('latitude'),
                    shop.get('longitude'),
                    shop.get('phone'),
                    shop.get('category'),
                    shop.get('type'),
                    shop.get('rating'),
                    shop.get('description'),
                    shop.get('opening_hours'),
                    shop.get('price_range')
                ))
            conn.commit()
            logger.info(f"店舗データ挿入完了: {len(shops)}件")
    except Exception as e:
        logger.error(f"店舗データ挿入エラー: {e}")
        conn.rollback()

def main():
    """メイン処理"""
    logger.info("習志野市オープンデータ処理サービス開始")
    
    # データベース接続
    conn = connect_to_database()
    if not conn:
        logger.error("データベース接続に失敗しました")
        sys.exit(1)
    
    try:
        # テーブル作成
        create_tables(conn)
        
        # 文化施設データの処理
        facilities = load_cultural_facilities()
        if facilities:
            insert_cultural_facilities(conn, facilities)
        
        # デモ店舗データの処理
        demo_shops = generate_demo_shops()
        insert_shops(conn, demo_shops)
        
        logger.info("データ処理完了")
        
    except Exception as e:
        logger.error(f"処理エラー: {e}")
        sys.exit(1)
    finally:
        conn.close()
        logger.info("データベース接続を閉じました")

if __name__ == "__main__":
    main()
