import { JobDetails } from "@/components/jobs/job-details"
import { MobileNavigation } from "@/components/mobile-navigation"

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  return (
    <div className="min-h-screen bg-[#ffffff] pb-20">
      <JobDetails jobId={params.id} />
      <MobileNavigation />
    </div>
  )
}
