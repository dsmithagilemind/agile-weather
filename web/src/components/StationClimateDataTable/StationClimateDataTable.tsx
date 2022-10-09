/*
  id
      city
      county
      fips
      state
      stateAbbrev
      zip
      stations {
        stationName
        longitude
        latitude
        hcn
        gsn
        code
        elevation
        id
        wmoid
        climateEntries {
          dataSet
          period
          topic
          id
          stationId
          dataPoints {
            value
            label
            id
            flag
            climateEntryId
          }
        }
      }
*/

const StationClimateDataTable = ({ stations }) => {
  return (
    <div>
      <h2>{'StationClimateDataTable'}</h2>
      <p>
        {
          'Find me in ./web/src/components/StationClimateDataTable/StationClimateDataTable.tsx'
        }
      </p>
    </div>
  )
}

export default StationClimateDataTable
