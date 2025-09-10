import Link from "next/link"
import { demoJobs } from "@/lib/demo-data"

export function NewJobPostings() {
  const newJobs = demoJobs.slice(0, 4)

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-[#000000] mb-4">新着求人から探す</h2>
      <div className="grid grid-cols-2 gap-4">
        {newJobs.map((job) => (
          <Link
            key={job.id}
            href={`/citizen/jobs/${job.id}`}
            className="bg-[#ffffff] rounded-lg overflow-hidden shadow-sm"
          >
            <div className="w-full h-32 bg-[#d9d9d9] flex items-center justify-center">
              <span className="text-[#666666] text-sm">{job.category}</span>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-[#000000] mb-1 text-sm">{job.title}</h3>
              <p className="text-xs text-[#666666] mb-2">{job.company}</p>
              <div className="flex flex-wrap gap-1">
                <span className="inline-block bg-[#e5e5e5] text-[#666666] text-xs px-2 py-1 rounded">
                  {job.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
