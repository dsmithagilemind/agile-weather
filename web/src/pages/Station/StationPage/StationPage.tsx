import StationCell from 'src/components/Station/StationCell'

type StationPageProps = {
  id: string
}

const StationPage = ({ id }: StationPageProps) => {
  return <StationCell id={id} />
}

export default StationPage
