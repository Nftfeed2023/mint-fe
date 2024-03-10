import { Grid, GridItem, } from "@chakra-ui/react";
import ImgLogo from "~/assets/images/logo.png"
import ImgUSDT from "~/assets/images/usdt.png"
import { TextVertical } from "~/@ui/TextVertical";

export const InfoIdo = () => {
  return (

    <Grid
      pt="20px"
      w="full"
      templateColumns="repeat(12, 1fr)"
      gap={{ base: 4, }}
    >


      <GridItem
        colSpan={{ base: 12, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Pool Allaction'
          value={"1,000,000 WSHARKIE"}
          icon={ImgLogo}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Deposit'
          value={"USDT"}
          icon={ImgUSDT}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Price'
          value={"1 USDT"}
          icon={ImgUSDT}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Swap Price'
          value={"1 USDT = 0.001 WSHARKIE"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Token Name'
          value={"SHARKIEE"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Token Symbol'
          value={"WSHARKIEE"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='Token Address'
          value={"0x68a44D9306084DDBc7b53142A218cc9cAb795c63"}
          isCopy={true}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >

        <TextVertical
          title='Token Decimals'
          value={"18"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='Chain'
          value={"ETHERIUM"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='Whitelist Opens (UTC)'
          value={"09:09:00 09/09/2023"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='Whitelist End(UTC)'
          value={"09:09:00 09/09/2023"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='FCFS Opens(UTC)'
          value={"09:09:00 09/09/2023"}
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, md: 4, lg: 3 }}
      >
        <TextVertical
          title='FCFS End (UTC)'
          value={"09:09:00 09/09/2023"}
        />
      </GridItem>



    </Grid>
  )
}
