import create from 'zustand'

interface ZipSearchStore {
  loadZipCode: string
  setLoadZipCode: (zipCode: string) => void
}

export const useZipSearchStore = create<ZipSearchStore>()((set) => ({
  loadZipCode: undefined,
  setLoadZipCode: (zipCode) => set((_state) => ({ loadZipCode: zipCode })),
}))
