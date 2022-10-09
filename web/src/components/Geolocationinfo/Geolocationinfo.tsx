import * as _ from 'radash'

import StationInfo from '../StationInfo/StationInfo'

function DataCard({ title, body }) {
  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}

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

const Geolocationinfo = ({ geoLocationData }) => {
  const geoLocation = _.pick(geoLocationData, [
    'city',
    'county',
    'fips',
    'state',
    'stateAbbrev',
    'zip',
  ])

  const geoLocationElements = Object.entries(geoLocation).map(([key, val]) => {
    return <DataCard key={key} title={key} body={val}></DataCard>
  })

  return (
    <div>
      <div>{geoLocationElements}</div>
      {
        // @ts-ignore
        geoLocationData.stations.map((station, i) => (
          <StationInfo stationData={station} key={i} />
        ))
      }
    </div>
  )
}

export default Geolocationinfo
