import React from "react";
import { MaintenanceData } from "types/maintenance";

type Props = {
  data: MaintenanceData
}

export const EditMaintenance = (props: Props) => {
  const { data } = props;
  return(
    <>編集ページ </>
  )
}