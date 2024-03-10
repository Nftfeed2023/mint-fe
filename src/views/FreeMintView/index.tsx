



import { Box, Text } from "@chakra-ui/react"

import { FC } from 'react'
import MainLayout from "~/layouts/MainLayout"

import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import CollectionTrend from "./CollectionTrend"
import BoxLayout from "~/components/BoxLayout"



type IFreeMintViewProps = {
}

const FreeMintView: FC<IFreeMintViewProps> = (props: IFreeMintViewProps) => {


  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <CollectionTrend />

      </BoxLayout>
    </MainLayout>
  )
}
export default FreeMintView;
