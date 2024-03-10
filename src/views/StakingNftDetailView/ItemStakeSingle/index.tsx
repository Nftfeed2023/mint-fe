import { Box, Grid, GridItem, HStack, SimpleGrid, Text, VStack, Icon, Image, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Flex } from '@chakra-ui/react';
import { Fragment, useCallback, useEffect, useState } from "react"
import { MdGraphicEq } from 'react-icons/md';
import LazyLoad from 'react-lazy-load';
import { TextHorizon } from '~/@ui/TextHorizon';
import { formatDateBlockChain, parseAmountToken } from '~/common/block-chain.helper';
import PrimaryButton from '~/components/PrimaryButton';
import { formatMoney, pipeAmount } from '~/utils';
import NftCard from './NftCard';
import { useStakingPool } from './hooks/useStakingPool';
import { useParams, useNavigate } from 'react-router-dom';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import useWindowSize from '~/hooks/useWindowSize';
import { ReactComponent as ArrowDown } from '~/assets/svgs/arrow-down.svg'
import { INftStaking } from '~/views/StakingNftView/data-staking';

export const ItemStakeSingle = (props: {
  itemNft: INftStaking
}) => {

  const { itemNft } = props;
  const { width } = useWindowSize();
  const { account } = useConnectWallet();
  const navigate = useNavigate();

  const [isOpenInfo, setIsOpenInfo] = useState(true);
  const [isOpenNft, setIsOpenNft] = useState(true);
  const [isOpenBag, setIsOpenBag] = useState(true);
  const [isOpenStaked, setIsOpenStaked] = useState(true);

  useEffect(() => {
    if (width > 1100) {
      setIsOpenInfo(true);
      setIsOpenNft(true);
      setIsOpenBag(true);
      setIsOpenStaked(true);
    }
  }, [width]);

  const {
    isApprove, isLoading, myTokenIds, poolInfo, stakedTokenIds,
    approve,
    selectedMyTokenIds,
    setSelectedMyTokenIds,
    selectedStakedTokenIds,
    setSelectedStakedTokenIds,
    pendingReward,
    stakes,
    stakeAll,
    unStakes,
    unStakeAll,
    claimReward,
  } = useStakingPool({ addressNft: itemNft.poolAddressNft, addressApy: itemNft.poolAddressNftApy });

  const renderHeader = useCallback(() => {
    return (
      <Grid
        templateColumns="repeat(9, 1fr)"
        gap={{
          base: 4,
          lg: 4,
        }}
      >

        <GridItem
          colSpan={{
            base: 9,
            '3lg': 3,
            xxl: 3,
          }}
          p={{
            base: '10px',
            '3lg': '0',
          }}
          borderRadius="8px"
          w="full"
          h="100%"
          bg="white"
          border="1px solid #ffd3cb"
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          alignSelf={"center"}
        >

          <Image
            src={itemNft.image}
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "inherit",
              objectFit: "cover",
              padding: "1px"
            }}
          />

          {/* <VStack
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
              src={itemNft.image}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "inherit",
                objectFit: "cover",
                padding: "1px"
              }}
            />
            <video
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
            </video>
          </VStack> */}

        </GridItem>

        <GridItem
          colSpan={{
            base: 9,
            '3lg': 3,
            xxl: 3,
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

            <HStack
              w="full"
              justifyContent={"space-between"}
            >

              <Box
                bg="#FFF1E4"
                borderRadius="10px"
                display="flex"
                justifyContent="center"
                p="12px 18px"
                alignSelf={"start"}
              >
                <Text
                  fontWeight="700"
                  fontSize={{ base: "24px", }}
                  lineHeight="21px"
                  color="black.light"
                  letterSpacing="-1px"
                >
                  Total Reward
                </Text>
              </Box>

              {width <= 1100 &&
                <Icon
                  as={ArrowDown}
                  w="28px"
                  h="28px"
                  onClick={() => {
                    setIsOpenInfo(!isOpenInfo)
                  }}
                />
              }
            </HStack>

            {isOpenInfo &&
              <>
                <Text
                  fontWeight="500"
                  fontSize={{ base: "24px", md: "30px" }}
                  lineHeight="21px"
                  letterSpacing="-0.5px"
                  alignSelf={"start"}
                >

                  <strong className='textPrimary'>{itemNft.totalReward} ${itemNft.reward}</strong>
                </Text>

                <Box w="full">

                  <HStack
                    w="full"
                    justifyContent={"space-between"}
                  >
                    <div />
                    <Text
                      fontWeight="500"
                      fontSize={{ base: "14px", }}
                      lineHeight="21px"
                      letterSpacing="-0.5px"
                      alignSelf={"start"}
                    >
                      {poolInfo.totalStaked}/{itemNft.totalSupply} NFT Staked
                    </Text>
                  </HStack>

                  <Slider
                    aria-label='slider-ex-1'
                    value={poolInfo.totalStaked}
                    min={0} max={parseInt(itemNft.totalSupply)}
                  >
                    <SliderTrack bg='red.100'>
                      <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb boxSize={4} >
                      <Box color='tomato' as={MdGraphicEq} />
                    </SliderThumb>
                  </Slider>

                </Box>

                {account && <Fragment>
                  <TextHorizon
                    title={"Chain"}
                    value={itemNft.chain}
                  />

                  <TextHorizon
                    title={"Total Staked"}
                    value={`${poolInfo.totalStaked}`}
                  />
                  <TextHorizon
                    title={"APR"}
                    value={poolInfo.apr ? `${formatMoney(pipeAmount(poolInfo.apr))} %` : '--'}
                  />
                  <TextHorizon
                    title={"Start time(UTC)"}
                    value={poolInfo?.startTime > 0 ? formatDateBlockChain(poolInfo.startTime) : `--`}
                  />
                  <TextHorizon
                    title={`Reward per second (${itemNft.reward}/s)`}
                    value={pipeAmount(poolInfo.rewardPerSeconds)}
                  />
                </Fragment>}

              </>
            }

          </VStack>

        </GridItem>

        <GridItem
          colSpan={{
            base: 9,
            '3lg': 3,
            xxl: 3,
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
            pt="10px"
            spacing={4}
          >

            <HStack
              w="full"
              justifyContent={"space-between"}
            >
              <Text
                fontWeight="700"
                fontSize={{ base: "24px", md: "30px" }}
                lineHeight={{ base: "32px", md: "42px" }}
                letterSpacing="-0.5px"
                alignSelf={"start"}
                className="textPrimary"
                textTransform={"uppercase"}
              >
                {itemNft.title} INFORMATION
              </Text>
              {width <= 1100 &&
                <Icon
                  as={ArrowDown}
                  w="28px"
                  h="28px"
                  onClick={() => {
                    setIsOpenNft(!isOpenNft)
                  }}
                />
              }
            </HStack>

            {isOpenNft &&
              <Text
                color="grey.66"
                fontWeight="400"
                lineHeight="19px"
                letterSpacing="-0.5px"
                fontSize="16px"
                alignSelf={"start"}
              >
                <span
                  style={{ whiteSpace: "pre-line", lineHeight: "38px" }}
                  dangerouslySetInnerHTML={{
                    __html: itemNft.information
                  }}
                />
              </Text>
            }


          </VStack>

        </GridItem>

      </Grid>
    )
  }, [account, isOpenInfo, isOpenNft, itemNft.chain, itemNft.image,
    itemNft.information, itemNft.reward, itemNft.title, itemNft.totalReward, itemNft.totalSupply,
    poolInfo.apr, poolInfo.rewardPerSeconds, poolInfo.startTime, poolInfo.totalStaked, width])

  const renderStakingData = useCallback(() => {

    const buttonsYourBag = () => {
      return (
        <>
          <HStack
            w="full"
            justifyContent={"space-between"}
          >
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              color="black.light"
              fontWeight="600"
            >
              Your Bag ({myTokenIds.length})
            </Text>

            <HStack>
              <PrimaryButton
                w={{ base: "full", md: "140px" }}
                h="30px"
                onClick={() => {
                  let url = "https://mint.nftfeed.guru/nft-collection/8453/0x268174ff68633901a2ec6511b33c590aac4fe263";
                  if (itemNft.key === "basepunk-nft") {
                    url = "https://mint.nftfeed.guru/nft-collection/8453/0x27dac2f25edb24c75cd1781e68b0358c91a9765a";
                  }
                  window.open(url);
                }}
              >
                Buy NFT
              </PrimaryButton>
              {width <= 1100 &&
                <Icon
                  as={ArrowDown}
                  w="28px"
                  h="28px"
                  onClick={() => {
                    setIsOpenBag(!isOpenBag)
                  }}
                />
              }
            </HStack>

          </HStack>

          {itemNft.key === "sharkie-nft" &&
            <HStack
              p="12px"
              w="fit-content"
              border="2px dashed rgba(226, 83, 74, 0.5)"
              bg="rgba(226, 83, 74, 0.05)"
            >
              <Text
                color={'secondary'}
                fontWeight={700}
                fontSize="16px"
                lineHeight="140%"
                textAlign="center"
              >
                Each wallet can only stakes Maximum 40 NFTs
              </Text>
            </HStack>
          }

          <VStack
            w='full'
            spacing={2}
          >

            {!isApprove ? <PrimaryButton
              w={{ base: "full", md: "350px" }}
              isLoading={isLoading}
              onClick={approve}
            >
              Approve NFT
            </PrimaryButton>
              :
              <SimpleGrid
                w="full"
                spacing={2}
                columns={{ base: 1, md: 2 }}
              >
                <PrimaryButton
                  isLoading={isLoading}
                  onClick={stakeAll}
                  disabled={myTokenIds.length === 0 || itemNft.key === "basepunk-nft"}
                >
                  Stake All NFT (Max 40 NFTs)
                </PrimaryButton>
                <PrimaryButton
                  isLoading={isLoading}
                  onClick={stakes}
                  disabled={selectedMyTokenIds.length === 0 || itemNft.key === "basepunk-nft"}
                >
                  Stake NFT
                </PrimaryButton>
              </SimpleGrid>
            }

          </VStack >
        </>
      )
    }

    const buttonsYourStake = () => {
      return (
        <>
          <HStack w="full" justifyContent={"space-between"}>
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              color="black.light"
              fontWeight="600"
            >
              Your Staked ({stakedTokenIds.length})
            </Text>
            {width <= 1100 &&
              <Icon
                as={ArrowDown}
                w="28px"
                h="28px"
                onClick={() => {
                  setIsOpenStaked(!isOpenStaked)
                }}
              />
            }
          </HStack>

          <VStack alignItems={"start"} w="full" mt="10px !important">
            <Text
              fontSize={{ base: "16px", md: "20px" }}
              color="black.light"
              fontWeight="600"
            >
              Pending Reward: <span className='textPrimary'>{pipeAmount(pendingReward)} ${itemNft.reward}</span>
            </Text>
          </VStack>


          <VStack
            w='full'
            spacing={2}
          >

            <SimpleGrid
              w="full"
              spacing={2}
              columns={{ base: 1, md: 3 }}
            >
              <PrimaryButton
                onClick={unStakeAll}
                isLoading={isLoading}
                disabled={stakedTokenIds.length === 0}
              >
                UnStake All NFT
              </PrimaryButton>
              <PrimaryButton
                onClick={unStakes}
                isLoading={isLoading}
                disabled={selectedStakedTokenIds.length === 0}
              >
                UnStake NFT
              </PrimaryButton>
              <PrimaryButton
                onClick={claimReward}
                isLoading={isLoading}
                disabled={parseAmountToken(pendingReward).lte(50)}
              >
                Claim Reward
              </PrimaryButton>
            </SimpleGrid>

          </VStack>
        </>
      )
    }

    return (
      <Grid
        pt="20px"
        templateColumns="repeat(8, 1fr)"
        gap={{
          base: 4,
        }}
      >

        <GridItem
          colSpan={{
            base: 8,
            '3lg': 4,
          }}
          p={{
            base: '10px',
            lg: '20px',
          }}
          borderRadius="8px"
          h={"fit-content"}
          bg="white"
          border="1px solid #ffd3cb"
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          <VStack
            w='full'
            spacing={4}
          >

            {buttonsYourBag()}

            {isOpenBag &&
              <SimpleGrid
                w="full"
                spacing={2}
                columns={{ base: 1, md: 3, lg: 3, '2xl': 4 }}
              >
                {myTokenIds
                  .map(tokenId => ({ tokenId, name: itemNft.title }))
                  .map((item, idx) => {
                    return (
                      <Box
                        w="full"
                        key={idx}
                      >
                        <NftCard
                          {...item}
                          selectedTokenIds={selectedMyTokenIds}
                          setSelectedTokenIds={setSelectedMyTokenIds}
                        />
                      </Box>
                    )
                  })
                }

              </SimpleGrid>
            }

          </VStack>

        </GridItem>

        <GridItem
          colSpan={{
            base: 8,
            '3lg': 4,
          }}
          p={{
            base: '10px',
            lg: '20px',
          }}
          borderRadius="8px"
          h={"fit-content"}
          bg="white"
          border="1px solid #ffd3cb"
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          <VStack
            w='full'
            spacing={4}
          >

            {buttonsYourStake()}

            {isOpenStaked &&
              <SimpleGrid
                w="full"
                spacing={2}
                columns={{ base: 1, md: 3, lg: 3, '2xl': 4 }}
              >
                {stakedTokenIds
                  .map(tokenId => ({ tokenId, name: itemNft.title }))
                  .map((item, idx) => {
                    return (
                      <Box
                        w="full"
                        key={idx}
                      >
                        <NftCard
                          {...item}
                          selectedTokenIds={selectedStakedTokenIds}
                          setSelectedTokenIds={setSelectedStakedTokenIds}
                        />
                      </Box>
                    )
                  })
                }

              </SimpleGrid>
            }

          </VStack>

        </GridItem>

      </Grid>
    )
  }, [approve, claimReward, isApprove, isLoading, isOpenBag, isOpenStaked, itemNft.reward,
    itemNft.title, myTokenIds, pendingReward, selectedMyTokenIds, selectedStakedTokenIds,
    setSelectedMyTokenIds, setSelectedStakedTokenIds, stakeAll, stakedTokenIds, stakes, unStakeAll, unStakes, width])

  return (
    <Fragment>

      {renderHeader()}

      {account &&
        <>
          <Box
            mt="20px"
            w='full'
            h="1px"
            background={"#ff2700"}
          />

          {renderStakingData()}
        </>
      }
    </Fragment>
  )
}
