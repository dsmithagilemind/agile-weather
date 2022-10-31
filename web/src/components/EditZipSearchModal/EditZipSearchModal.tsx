import { ReactNode, useState } from "react";

import { Container, Modal } from "@mantine/core"

import EditZipSearchCell from 'src/components/ZipSearch/EditZipSearchCell';
import ZipSearchesLayout from "src/layouts/ZipSearchesLayout/ZipSearchesLayout"

type EditSearchModalProps = {
  id: string
  open: boolean
  children?: ReactNode | ReactNode[]
}

const EditZipSearchModal = ({ id, children, open = false }: EditSearchModalProps) => {

  const [opened, setOpened] = useState(open);


  return (
    <>
      <Container
        onClick={() => setOpened(true)}
      >
        {children}
      </Container>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit ZipSearch"
        overlayBlur={3}
        overlayOpacity={0}
        transitionDuration={100}
      >
        <ZipSearchesLayout>
          <EditZipSearchCell id={id}></EditZipSearchCell>
        </ZipSearchesLayout>
      </Modal>
    </>
  )
}

export default EditZipSearchModal
