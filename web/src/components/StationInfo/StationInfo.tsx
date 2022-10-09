import * as _ from 'radash'

import MinMaxAvgClimateEntriesChart from '../MinMaxAvgClimateEntriesChart/MinMaxAvgClimateEntriesChart'

function DataCard({ title, body }) {
  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}

const StationInfo = ({ stationData }) => {
  const hasMinMaxAvgClimateEntries =
    stationData.climateEntries && stationData.climateEntries.length == 3

  return (
    <div>
      <div>
        <DataCard title={'StationCode'} body={stationData.code}></DataCard>
        <DataCard
          title={'StationName'}
          body={stationData.stationName}
        ></DataCard>
        <DataCard title={'Latitude'} body={stationData.latitude}></DataCard>
        <DataCard title={'Longitude'} body={stationData.longitude}></DataCard>
        <DataCard title={'Elevation'} body={stationData.elevation}></DataCard>
      </div>

      {!hasMinMaxAvgClimateEntries ? null : (
        <MinMaxAvgClimateEntriesChart
          stationClimateEntries={stationData.climateEntries}
        />
      )}
    </div>
  )
}

export default StationInfo
