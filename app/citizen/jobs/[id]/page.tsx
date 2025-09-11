import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Pen as Yen, Users } from "lucide-react"
import { demoJobs } from "@/lib/demo-data"
import { Button } from "@/components/ui/button"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = demoJobs.find((j) => j.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e5e5e5]">
        <Link href="/citizen" className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#000000]" />
        </Link>
        <h1 className="font-medium text-[#000000]">求人詳細</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-6">
        {/* Job Image */}
        <div className="w-full h-48 bg-[#d9d9d9] rounded-lg mb-6 flex items-center justify-center">
          <span className="text-[#666666]">{job.category}</span>
        </div>

        {/* Job Title & Company */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#000000] mb-2">{job.title}</h2>
          <p className="text-[#666666] mb-4">{job.company}</p>

          {/* Job Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#666666]" />
              <span className="text-[#000000]">{job.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Yen className="w-5 h-5 text-[#666666]" />
              <span className="text-[#000000]">{job.salary}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#666666]" />
              <span className="text-[#000000]">{job.workTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#666666]" />
              <span className="text-[#000000]">{job.applicationCount}名が応募中</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="font-bold text-[#000000] mb-3">仕事内容</h3>
          <p className="text-[#000000] leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="font-bold text-[#000000] mb-3">応募条件</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#666666] rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-[#000000]">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="font-bold text-[#000000] mb-3">待遇・福利厚生</h3>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-[#007aff] rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-[#000000]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="fixed bottom-6 left-6 right-6">
          <Button className="w-full bg-[#007aff] hover:bg-[#0056b3] text-white py-4 rounded-full text-lg font-medium">
            応募する
          </Button>
        </div>
      </div>
    </div>
  )
}
