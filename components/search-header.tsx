"use client"

import type React from "react"

import { Search, Menu } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/citizen/search-results?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="flex items-center bg-muted rounded-full px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="キーワードを検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
          />
          <Menu className="w-5 h-5 text-muted-foreground ml-3" />
        </div>
      </form>
    </div>
  )
}
