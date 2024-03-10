import { configEnv } from "~/@config";

import { useMintV1 } from "./useMintV1";
import { useMintV2 } from "./useMintV2";

const { customSMC, CONNECTORS } = configEnv();


export const useMint = ({ versionFactory, address, ref }: { address: string, versionFactory: "V1" | "V2", ref?: string }) => {
  const hookV1 = useMintV1({ address });
  const hookV2 = useMintV2({ address, ref });

  if (versionFactory === "V2") {
    return {
      ...hookV2
    }
  }
  return {
    ...hookV1
  }

}
