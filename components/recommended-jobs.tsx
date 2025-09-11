import Link from "next/link"
import Image from "next/image"
import { demoJobs } from "@/lib/demo-data"

export function RecommendedJobs() {
  const recommendedJobs = demoJobs.filter((job) => job.isNew).slice(0, 2)

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">あなたへのおすすめ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommendedJobs.map((job) => (
          <Link
            key={job.id}
            href={`/citizen/jobs/${job.id}`}
            className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-all duration-200"
          >
            <div className="w-full h-40 relative overflow-hidden">
              <Image
                src={job.image || "/placeholder.svg?height=160&width=300&query=job"}
                alt={job.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-foreground text-base line-clamp-2">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-secondary/20 text-secondary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {job.location}
                </span>
                <span className="inline-block bg-primary/20 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {job.salary}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
