import { ReactNode, useState } from "react";

import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import { IconChartDots } from "@tabler/icons";

import MinMaxAvgClimateEntriesChart from "../MinMaxAvgClimateEntriesChart/MinMaxAvgClimateEntriesChart";

type ChartModalProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  station: any
  open?: boolean
  children?: ReactNode | ReactNode[]
}

const ChartModal = ({ station, open = false }: ChartModalProps) => {
  const [opened, setOpened] = useState(open);

  return (
    <>
      <Tooltip label="Open climate graph">
        <ActionIcon
          variant="outline"
          onClick={() => setOpened(true)}
        >
          <IconChartDots />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Climate Chart for ${station.code}`}
        overlayBlur={3}
        overlayOpacity={0}
        transitionDuration={100}
      >
        <MinMaxAvgClimateEntriesChart stationClimateEntries={station.climateEntries}/>
      </Modal>
    </>
  )
}

export default ChartModal
