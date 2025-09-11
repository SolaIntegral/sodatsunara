console.warn("Firebase is not configured. Using mock services for development.")

// Mock Firebase services that match the expected interface
export const db = {
  collection: (name: string) => ({
    doc: (id?: string) => ({
      get: () =>
        Promise.resolve({
          exists: false,
          data: () => ({}),
          id: id || "mock-id",
        }),
      set: (data: any) => Promise.resolve(),
      update: (data: any) => Promise.resolve(),
    }),
    add: (data: any) => Promise.resolve({ id: `mock-${Date.now()}` }),
    where: (field: string, op: string, value: any) => ({
      get: () => Promise.resolve({ docs: [] }),
      orderBy: (field: string, direction?: string) => ({
        get: () => Promise.resolve({ docs: [] }),
      }),
    }),
    orderBy: (field: string, direction?: string) => ({
      get: () => Promise.resolve({ docs: [] }),
      where: (field: string, op: string, value: any) => ({
        get: () => Promise.resolve({ docs: [] }),
      }),
    }),
  }),
  doc: (collection: string, id: string) => ({
    get: () =>
      Promise.resolve({
        exists: false,
        data: () => ({}),
        id: id,
      }),
    set: (data: any) => Promise.resolve(),
    update: (data: any) => Promise.resolve(),
  }),
}

export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    setTimeout(() => callback(null), 0)
    return () => {}
  },
  signInWithEmailAndPassword: (email: string, password: string) =>
    Promise.reject(new Error("Firebase not configured. Please set up environment variables.")),
  createUserWithEmailAndPassword: (email: string, password: string) =>
    Promise.reject(new Error("Firebase not configured. Please set up environment variables.")),
  signOut: () => Promise.resolve(),
  updateProfile: (user: any, profile: any) => Promise.resolve(),
}

export const storage = {
  ref: (path?: string) => ({
    put: (file: any) => Promise.reject(new Error("Firebase not configured")),
    getDownloadURL: () => Promise.reject(new Error("Firebase not configured")),
  }),
}

export default null
