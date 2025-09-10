"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, DollarSign, Heart, Share } from "lucide-react"
import { JobApplicationForm } from "./job-application-form"
import Link from "next/link"

interface JobDetailsProps {
  jobId: string
}

export function JobDetails({ jobId }: JobDetailsProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  // Mock job data
  const job = {
    id: jobId,
    title: "カフェスタッフ募集",
    businessName: "丸々商店",
    location: "津田沼駅徒歩5分",
    salary: "時給 1,000円〜1,500円",
    workType: "アルバイト・パート",
    description: "地域密着型のカフェで一緒に働いてくれるスタッフを募集しています。未経験者歓迎！丁寧に指導いたします。",
    requirements: ["未経験歓迎", "週2日以上勤務可能な方", "接客が好きな方"],
    benefits: ["交通費支給", "まかない付き", "昇給あり"],
    workHours: "9:00〜18:00（シフト制）",
  }

  if (showApplicationForm) {
    return <JobApplicationForm job={job} onBack={() => setShowApplicationForm(false)} />
  }

  return (
    <div className="px-6">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <Link href="/search">
          <ArrowLeft className="w-6 h-6 text-[#007aff]" />
        </Link>
        <div className="flex items-center space-x-3">
          <button onClick={() => setIsFavorited(!isFavorited)} className="p-2 hover:bg-[#e5e5e5] rounded-lg">
            <Heart className={`w-6 h-6 ${isFavorited ? "fill-[#ff3b30] text-[#ff3b30]" : "text-[#666666]"}`} />
          </button>
          <button className="p-2 hover:bg-[#e5e5e5] rounded-lg">
            <Share className="w-6 h-6 text-[#666666]" />
          </button>
        </div>
      </div>

      {/* Job Image */}
      <div className="w-full h-48 bg-[#d9d9d9] rounded-lg mb-6"></div>

      {/* Job Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[#000000] mb-2">{job.title}</h1>
          <p className="text-[#007aff] font-medium mb-4">{job.businessName}</p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#666666]" />
              <span className="text-[#666666]">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-[#666666]" />
              <span className="text-[#666666]">{job.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#666666]" />
              <span className="text-[#666666]">{job.workHours}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-[#000000] mb-2">仕事内容</h3>
          <p className="text-[#666666] leading-relaxed">{job.description}</p>
        </div>

        <div>
          <h3 className="font-medium text-[#000000] mb-2">応募条件</h3>
          <ul className="space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[#666666] rounded-full"></div>
                <span className="text-[#666666]">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-[#000000] mb-2">待遇・福利厚生</h3>
          <ul className="space-y-1">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[#666666] rounded-full"></div>
                <span className="text-[#666666]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="pb-8">
          <button
            onClick={() => setShowApplicationForm(true)}
            className="w-full bg-[#007aff] text-[#ffffff] py-3 rounded-lg font-medium hover:bg-[#0056b3]"
          >
            この求人に応募する
          </button>
        </div>
      </div>
    </div>
  )
}
