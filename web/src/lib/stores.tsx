import create from 'zustand'

interface ZipSearchStore {
  loadZipCode: string
  setLoadZipCode: (zipCode: string) => void
  reloadZipCode: string,
  setReloadZipCode: (reloadZipCode: string) => void
}

export const useZipSearchStore = create<ZipSearchStore>()((set) => ({
  loadZipCode: undefined,
  setLoadZipCode: (zipCode) => set((_state) => ({ loadZipCode: zipCode })),
  reloadZipCode: undefined,
  setReloadZipCode: (reloadZipCode) => set((_state) => ({ reloadZipCode: reloadZipCode}))
}))

interface RestEndpointsStore {
  restEndpoints: boolean
  setRestEndpoints: (setRestEndpoints: boolean) => void
  endpointRoute: string
  setEndpointRoute: (setEndpointRoute: string) => void
}

export const useRestEndpointsStore = create<RestEndpointsStore>()((set) => ({
  restEndpoints: false,
  setRestEndpoints: (setRestEndpoints) =>
    set((_state) => ({ restEndpoints: setRestEndpoints })),
  endpointRoute: undefined,
  setEndpointRoute: (setEndpointRoute) =>
    set((_state) => ({ endpointRoute: setEndpointRoute })),
}))

type StationClimateEntry = unknown
interface StationClimateGraphStore {
  selectedStation: string
  stationClimateData: StationClimateEntry[]
  setSelectedStationData: (
    stationData: string,
    stationClimateEntries: StationClimateEntry[]
  ) => void
  clearStationClimateData: () => void
}

export const useStationClimateGraphStore = create<StationClimateGraphStore>()(
  (set) => {
    return {
      selectedStation: undefined,
      stationClimateData: undefined,
      setSelectedStationData: (
        stationData: string,
        stationClimateEntries: StationClimateEntry[]
      ) => {
        return set((_state) => {
          return {
            selectedStation: stationData,
            stationClimateData: stationClimateEntries,
          }
        })
      },
      clearStationClimateData: () =>
        set((_state) => ({
          selectedStation: undefined,
          stationClimateData: undefined,
        })),
    }
  }
)
