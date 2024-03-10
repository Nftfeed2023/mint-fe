import { Box, Button, Flex, Text, VStack, Image, SimpleGrid, Avatar, Center, Stack, HStack, Icon } from '@chakra-ui/react'
import { useCallback } from 'react';
import { configEnv } from '~/@config';
import useWindowSize from '~/hooks/useWindowSize'
import useMintNft from '../hooks/useMintNft';
import Title from './Title'

import ImageNft from "~/assets/svgs/images/nft-heniken.png"
import ImageNft1 from "~/assets/svgs/images/DiamondDemo.png"
import ImageNft2 from "~/assets/svgs/images/GoldDemo.png"
import ImageNft3 from "~/assets/svgs/images/SilverDemo.png"
import AvatarHeineken from "~/assets/svgs/images/avatar-heineken.jpg"
import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'


const { } = configEnv();

const POOL_NFT_HENIKEN = "";

const LIST_NFT = [
    {
        image: ImageNft1,
        name: "Heineken Diamond NFT",
    },
    {
        image: ImageNft2,
        name: "Heineken Gold NFT",
    },
    {
        image: ImageNft3,
        name: "Heineken Silver NFT",
    },
    {
        image: ImageNft,
        name: "Heineken Mystery Box",
    },
]

const CioMembership = () => {
    const { width } = useWindowSize();
    const {
        isChainPolygon,
        isLoading,
        isGrantedNft,
        isGrantedFaucet,
        minftNft,
        faucet,
    } = useMintNft({ poolNft: POOL_NFT_HENIKEN });

    const renderButton = useCallback(() => {
        return (
            <>
                <Button
                    mt={{ base: "30px !important", md: "80px !important" }}
                    bg="yellow.primary !important"
                    borderRadius="8px"
                    fontWeight="600"
                    fontSize="16px"
                    lineHeight="18px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    w="full"
                    p="10px"
                    disabled={isGrantedFaucet || !isChainPolygon}
                    // disabled={true}
                    isLoading={isLoading}
                    onClick={faucet}
                >
                    Get Free Gas
                </Button>

                <Button
                    mt="10px !important"
                    bg="yellow.primary !important"
                    borderRadius="8px"
                    fontWeight="600"
                    fontSize="16px"
                    lineHeight="18px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    w="full"
                    p="10px"
                    disabled={isGrantedNft || !isChainPolygon}
                    onClick={minftNft}
                    isLoading={isLoading}
                >
                    Mint
                </Button>

                {!isChainPolygon &&
                    <Text
                        fontWeight="400"
                        fontSize={{
                            base: '10px',
                            md: '14px',
                        }}
                        color="#E50300"
                        textAlign="center"
                    >
                        Notice: In order to action from this section please switch to POLYGON
                    </Text>
                }

            </>
        )
    }, [faucet, isChainPolygon, isGrantedFaucet, isGrantedNft, isLoading, minftNft])

    const renderInfomation = () => {
        return (
            <Box
                background={"#111827"}
                height={width <= 500 ? "auto" : "550px"}
                w={{ base: "350px", lg: "460px" }}
                p={{ base: "24px", lg: "32px 40px" }}
                borderRadius="20px"
                position={{ base: "relative", md: "absolute" }}
                left={{ base: "auto", md: "0" }}
                top={{ base: "-30px", md: "auto" }}
            >

                <VStack spacing={3}>

                    <Text
                        fontSize={{
                            base: '20px',
                            lg: '30px',
                        }}
                        lineHeight="20px"
                        color="#e5e7eb"
                        fontWeight="600"
                    >
                        Heineken Mystery Box
                    </Text>

                    <VStack
                        alignItems={"start"}
                        spacing={1}
                        pt="20px"
                    >
                        <Text
                            fontSize={{
                                base: '12px',
                                md: '16px',
                            }}
                            lineHeight={{
                                base: '16px',
                                md: '20px',
                            }}
                            color="#9ca3af"
                            fontWeight="400"
                            textAlign={"justify"}
                        >
                            Heineken Mystery Box NFT  - NFT sẽ trở thành trend mới trong năm 2023? Cùng Heineken và FAM Central trải nghiệm những giá trị tuyệt vời mà NFT mang lại.
                        </Text>
                    </VStack>

                    {renderButton()}

                </VStack>

            </Box>
        )
    }

    const renderNftCio = () => {
        return (
            <Box
                w={{ base: "full", md: "60%", lg: "64%" }}
                bg="#010101"
                borderRadius="20px"
                pb="10px"
            >
                <Image
                    src={ImageNft}
                    borderRadius="80px"
                    p="60px"
                    objectFit={"contain"}
                    style={{
                        height: width <= 500 ? "400px" : "630px",
                        width: "100%"
                    }}
                    className='shake-vertical'
                />
                {/* <video
                    // controls
                    loop
                    width="100%"
                    style={{
                        height: width <= 500 ? "400px" : "630px",
                    }}
                    //@ts-ignore
                    autoPlay={true}
                    //@ts-ignore
                    playsInline="playsInline"
                    //@ts-ignore
                    muted="muted"
                    src="nft-collectibles.mp4"
                >
                </video> */}
            </Box>
        )
    }

    const renderListNft = useCallback(() => {
        return (
            <SimpleGrid
                columns={{
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                }}
                spacing="20px"
                mt="16px"
            >
                {LIST_NFT.map((item, idx) => (
                    <Center
                        minW="217px"
                        cursor="pointer"
                        border={{
                            base: '1px solid #DFE6F1',
                            lg: 'none',
                        }}
                        rounded="10px"
                        role="group"
                        h="full"
                        overflow="hidden"
                    >
                        <Box
                            transition="all 250ms ease-in"
                            border="1px solid transparent"
                            _groupHover={{
                                border: '1px solid #DFE6F1',
                                filter:
                                    'drop-shadow(0px -4px 10px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.1))',
                            }}
                            w="full"
                            h="full"
                            bg="white"
                            rounded="10px"
                            overflow="hidden"
                        >
                            <Box position="relative">
                                <Image
                                    h="full"
                                    w="full"
                                    maxH={{
                                        base: '130px',
                                        '2xl': '200px',
                                    }}
                                    transition="all 250ms ease-in"
                                    overflow="hidden"
                                    src={item.image}
                                    fallbackSrc="/assets/images/empty-item.png"
                                    objectFit="contain"
                                    _groupHover={{
                                        lg: {
                                            transform: 'scale(1.1)',
                                        },
                                    }}
                                />
                            </Box>

                            <Flex
                                justify={{
                                    base: 'flex-start',
                                    md: 'center',
                                }}
                                align={{
                                    base: 'start',
                                    md: 'center',
                                }}
                                flexDirection={{
                                    base: 'row',
                                    md: 'column',
                                }}
                                mt={-6}
                                bg={{
                                    base: '#F7F9FA',
                                    lg: 'white',
                                }}
                            >
                                <Avatar
                                    ml={{
                                        base: '10px',
                                        md: 0,
                                    }}
                                    w="48px"
                                    h="48px"
                                    src={AvatarHeineken}
                                />
                                <Box
                                    mt={{ base: '35px', md: '4px' }}
                                    mb="12px"
                                    ml={{
                                        base: '10px',
                                        md: 0,
                                    }}
                                    mr="10px"
                                >
                                    <Stack
                                        spacing={1}
                                        align={{
                                            base: 'start',
                                            md: 'center',
                                        }}
                                    >
                                        <HStack alignItems="flex-start" px="10px" py="20px">
                                            <Text
                                                fontSize={{
                                                    base: '12px',
                                                    md: '15px',
                                                }}
                                                color="black.1d"
                                                lineHeight="18px"
                                                letterSpacing="-0.5px"
                                                fontWeight="600"
                                                noOfLines={2}
                                            >
                                                {item.name}
                                            </Text>
                                            <Icon as={VerifyIcon} />
                                        </HStack>

                                    </Stack>
                                </Box>
                            </Flex>
                        </Box>
                    </Center>
                ))}

            </SimpleGrid>
        )
    }, [])

    return (
        <Box pb="10vh">

            <Title>{'Hot'}</Title>

            <VStack
                w="full"
                position={"relative"}
            >

                <Flex
                    flexDirection={{ base: "column-reverse", md: "row" }}
                    justifyContent="flex-end"
                    py="30px"
                    w="full"
                    maxW={"1024px"}
                    position={"relative"}
                    alignItems="center"
                >

                    {renderInfomation()}

                    {renderNftCio()}
                </Flex>

            </VStack>

            {renderListNft()}

        </Box>
    )
}

export default CioMembership
