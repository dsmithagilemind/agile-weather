import ZipSearchCell from 'src/components/ZipSearch/ZipSearchCell'

type ZipSearchPageProps = {
  id: string
}

const ZipSearchPage = ({ id }: ZipSearchPageProps) => {
  return <ZipSearchCell id={id} />
}

export default ZipSearchPage
