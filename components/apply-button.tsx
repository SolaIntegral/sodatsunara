"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface ApplyButtonProps {
  jobId: string
}

export function ApplyButton({ jobId }: ApplyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleApply = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // 求職者プロフィールを確認
      const { data: profile } = await supabase.from("job_seekers").select("id").eq("id", user.id).single()

      if (!profile) {
        router.push("/auth/complete-profile")
        return
      }

      // 応募を作成
      const { error: applicationError } = await supabase.from("applications").insert({
        job_id: jobId,
        job_seeker_id: user.id,
        cover_letter: coverLetter || null,
      })

      if (applicationError) {
        if (applicationError.code === "23505") {
          // unique constraint violation
          setError("この求人にはすでに応募済みです")
        } else {
          throw applicationError
        }
        return
      }

      setIsOpen(false)
      router.push("/dashboard/job-seeker/applications")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "応募に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          この求人に応募する
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>求人に応募</DialogTitle>
          <DialogDescription>応募内容を確認して送信してください</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover-letter">志望動機・自己PR（任意）</Label>
            <Textarea
              id="cover-letter"
              placeholder="この求人への志望動機や自己PRを入力してください"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>

          {error && <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              キャンセル
            </Button>
            <Button onClick={handleApply} disabled={isLoading} className="flex-1">
              {isLoading ? "応募中..." : "応募する"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
