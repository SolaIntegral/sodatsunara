import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore"
import { db } from "./firebase"

export interface JobPosting {
  id?: string
  businessId: string
  businessName: string
  title: string
  description: string
  category: string
  location: string
  salary: {
    min: number
    max: number
    type: "hourly" | "monthly" | "annual"
  }
  workType: "full-time" | "part-time" | "contract" | "internship"
  requirements: string[]
  benefits: string[]
  applicationDeadline?: Date
  status: "active" | "paused" | "closed"
  createdAt: any
  updatedAt: any
  applicantCount: number
}

export interface JobApplication {
  id?: string
  jobId: string
  citizenId: string
  citizenName: string
  citizenEmail: string
  coverLetter: string
  resume?: string
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected"
  appliedAt: any
  updatedAt: any
}

// Create job posting
export async function createJobPosting(
  jobData: Omit<JobPosting, "id" | "createdAt" | "updatedAt" | "applicantCount">,
): Promise<string> {
  const jobsRef = collection(db, "jobs")

  const newJob: Omit<JobPosting, "id"> = {
    ...jobData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    applicantCount: 0,
  }

  const docRef = await addDoc(jobsRef, newJob)
  return docRef.id
}

// Get jobs for a business
export function subscribeToBusinessJobs(businessId: string, callback: (jobs: JobPosting[]) => void) {
  const jobsRef = collection(db, "jobs")
  const q = query(jobsRef, where("businessId", "==", businessId), orderBy("createdAt", "desc"))

  return onSnapshot(q, (snapshot) => {
    const jobs: JobPosting[] = []
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as JobPosting)
    })
    callback(jobs)
  })
}

// Get all active jobs
export function subscribeToActiveJobs(callback: (jobs: JobPosting[]) => void) {
  const jobsRef = collection(db, "jobs")
  const q = query(jobsRef, where("status", "==", "active"), orderBy("createdAt", "desc"))

  return onSnapshot(q, (snapshot) => {
    const jobs: JobPosting[] = []
    snapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() } as JobPosting)
    })
    callback(jobs)
  })
}

// Apply for job
export async function applyForJob(
  applicationData: Omit<JobApplication, "id" | "appliedAt" | "updatedAt">,
): Promise<string> {
  const applicationsRef = collection(db, "applications")

  const newApplication: Omit<JobApplication, "id"> = {
    ...applicationData,
    appliedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(applicationsRef, newApplication)

  // Update job applicant count
  const jobRef = doc(db, "jobs", applicationData.jobId)
  const jobDoc = await getDoc(jobRef)
  if (jobDoc.exists()) {
    const currentCount = jobDoc.data().applicantCount || 0
    await updateDoc(jobRef, {
      applicantCount: currentCount + 1,
    })
  }

  return docRef.id
}

// Get applications for a job
export function subscribeToJobApplications(jobId: string, callback: (applications: JobApplication[]) => void) {
  const applicationsRef = collection(db, "applications")
  const q = query(applicationsRef, where("jobId", "==", jobId), orderBy("appliedAt", "desc"))

  return onSnapshot(q, (snapshot) => {
    const applications: JobApplication[] = []
    snapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as JobApplication)
    })
    callback(applications)
  })
}

// Update application status
export async function updateApplicationStatus(applicationId: string, status: JobApplication["status"]): Promise<void> {
  const applicationRef = doc(db, "applications", applicationId)
  await updateDoc(applicationRef, {
    status,
    updatedAt: serverTimestamp(),
  })
}

// Get applications for a citizen
export function subscribeToCitizenApplications(citizenId: string, callback: (applications: JobApplication[]) => void) {
  const applicationsRef = collection(db, "applications")
  const q = query(applicationsRef, where("citizenId", "==", citizenId), orderBy("appliedAt", "desc"))

  return onSnapshot(q, (snapshot) => {
    const applications: JobApplication[] = []
    snapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() } as JobApplication)
    })
    callback(applications)
  })
}
