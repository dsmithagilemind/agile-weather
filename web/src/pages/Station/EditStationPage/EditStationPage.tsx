import EditStationCell from 'src/components/Station/EditStationCell'

type StationPageProps = {
  id: string
}

const EditStationPage = ({ id }: StationPageProps) => {
  return <EditStationCell id={id} />
}

export default EditStationPage
