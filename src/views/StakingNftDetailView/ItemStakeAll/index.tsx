import { VStack, Image, Box, Text, Grid, GridItem, } from "@chakra-ui/react"
import { TextHorizon } from "~/@ui/TextHorizon"
import PrimaryButton from "~/components/PrimaryButton"
import ImgLogo from "~/assets/images/logo.png"
import { useCallback } from "react"
import { pipeLongTextUi } from "~/common/utils/common.utils"
import { useStakeErc721 } from "./hooks/useStakeErc721"
import { useSwitchChain } from "~/hooks/@global/useSwitchChain"
import { EVM_CHAIN_LIST } from "~/@config/chain-list"
import { useStakeAndClaimAzeta } from "./hooks/useStakeAndClaimAzeta"
import LazyLoad from "react-lazy-load"
import { INftStaking } from "~/views/StakingNftView/data-staking"
import { FaExternalLinkAlt } from "react-icons/fa";

export const ItemStakeAll = ({ nftAddress, image = "", title = "", chainId: targetChainId }: INftStaking) => {


  const switchChain = useSwitchChain();
  const { stakes, poolInfo, isApprovedForAll, approve, isLoading, tokenIds, apr, chainId } = useStakeErc721({ nftAddress });

  const { amoutClaimed, claim, pending, qtyStaked, isLoading: isLoadingClaim } = useStakeAndClaimAzeta();


  const { logo: chainLogo, chainName = "", nativeCurrency } = EVM_CHAIN_LIST[targetChainId] || { logo: "", chainName: "", nativeCurrency: { symbol: "" } };

  const onSwitchChain = useCallback(() => {
    switchChain(targetChainId).catch();
  }, [targetChainId, switchChain])

  const renderStakeButton = useCallback(() => {

    if (!isApprovedForAll) {
      return (
        <PrimaryButton
          disabled={tokenIds.length === 0}
          onClick={approve}
        >
          Approve
        </PrimaryButton>
      )
    }

    return (
      <PrimaryButton
        onClick={stakes}
        disabled={tokenIds.length === 0}
      >
        {poolInfo?.totalStaked > 0 ? "Staked" : "Stake"}
      </PrimaryButton>

    )
  }, [approve, isApprovedForAll, poolInfo?.totalStaked, stakes, tokenIds.length]);


  const renderClaimButton = useCallback(() => {
    return (
      <PrimaryButton
        disabled={isLoading || isLoadingClaim || !pending || pending <= 0}
        onClick={claim}
        isLoading={isLoadingClaim}
      >
        {amoutClaimed > 0 && pending === 0 ? "Claimed" : "Claim"}
      </PrimaryButton>
    )
  }, [amoutClaimed, claim, isLoading, isLoadingClaim, pending])

  return (
    <Grid
      templateColumns="repeat(8, 1fr)"
      gap={{
        base: 4,
        lg: 4,
      }}
    >

      <GridItem
        colSpan={{
          base: 8,
          '3lg': 4,
          xxl: 4,
        }}
        p={{
          base: '10px',
          '3lg': '0',
        }}
        borderRadius="8px"
        h={"fit-content"}
        bg="white"
        border="1px solid #ffd3cb"
        boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      >

        <VStack
          position="relative"
          w="100%"
          h="100%"
        >

          <LazyLoad>
            <Box
              h={{
                base: '374px',
                lg: '512px',
              }}
              maxH={{
                base: '374px',
                lg: '512px',
              }}
              w="100%"
            >
              <Image
                src={image}
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "inherit",
                  objectFit: "contain",
                  padding: "1px"
                }}
              />
              {/* <video
                  loop
                  ref={videoRef}
                  style={{
                    borderRadius: "8px",
                    width: "100%",
                    height: "inherit",
                    objectFit: "cover"
                  }}
                  //@ts-ignore
                  autoPlay={true}
                  //@ts-ignore
                  playsInline="playsInline"
                  //@ts-ignore
                  muted="muted"
                  src={VideosNft}
                >
                </video> */}
            </Box>
          </LazyLoad>

        </VStack>

      </GridItem>

      <GridItem
        colSpan={{
          base: 8,
          '3lg': 4,
          xxl: 4,
        }}
        p={{
          base: '10px',
          lg: '20px 30px',
        }}
        bg="white"
        borderRadius="8px"
        border="1px solid #ffd3cb"
        boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      >

        <VStack
          w="full"
          spacing={4}
        >

          <Text
            fontSize={{ base: "20px", md: "28px" }}
            lineHeight={{ base: "28px", md: "34px" }}
            alignSelf={"start"}
            className="textPrimary"
          >
            {title}
          </Text>

          <TextHorizon
            title='Total staked'
            value={`${poolInfo?.totalStaked}`}
          />

          <TextHorizon
            title='Mint Your Mirror NFT'
            value={"Go to Mirror"}
            yourLink="https://mirror.xyz/0x2368dB14Cf7F0F7f975bE690687687fC01F6D31E/Uhw5tCOjZ46emcpsxiFGcAUjYn8m7BvYJ2cKHuohZPE"
            isLink={true}
            icon="https://img.icons8.com/?size=256&id=85777&format=png"
          />

          <TextHorizon
            title='NFT Address'
            value={pipeLongTextUi(nftAddress, 6, 6)}
            isCopy={true}
          />

          <TextHorizon
            title='Start time(UTC)'
            value={poolInfo?.startTime}
          />

          <TextHorizon
            title='My staked'
            value={`${qtyStaked}`}
            icon={ImgLogo}
          />

          <TextHorizon
            title='Token Reward'
            value={`${qtyStaked}`}
            icon={"https://s2.coinmarketcap.com/static/img/coins/64x64/21259.png"}
          />

          <TextHorizon
            title='Pending Reward'
            value={`${pending}`}
            icon={"https://s2.coinmarketcap.com/static/img/coins/64x64/21259.png"}
          />

          <VStack w="full">
            {targetChainId === chainId ? (
              <>
                {renderStakeButton()}
                {renderClaimButton()}
              </>
            ) : (
              <>
                <PrimaryButton
                  onClick={onSwitchChain}
                  leftIcon={<Image src={chainLogo} w="25px" h="25px" />}
                >
                  Switch to {chainName}
                </PrimaryButton>
              </>
            )}
          </VStack>

        </VStack>

      </GridItem>

    </Grid>

  )

}
