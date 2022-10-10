import EditZipSearchCell from 'src/components/ZipSearch/EditZipSearchCell'

type ZipSearchPageProps = {
  id: string
}

const EditZipSearchPage = ({ id }: ZipSearchPageProps) => {
  return <EditZipSearchCell id={id} />
}

export default EditZipSearchPage
