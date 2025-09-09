import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">ページが見つかりません</h2>
          <p className="text-muted-foreground max-w-md">お探しのページは存在しないか、移動された可能性があります。</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">ホームに戻る</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/jobs">求人を探す</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
