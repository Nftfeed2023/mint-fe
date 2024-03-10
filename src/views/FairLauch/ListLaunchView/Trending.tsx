import { HStack, Text, Box, Flex } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick'
import { ILauchPool } from "~/dto/ILauchPool";
import fairlaunchTokenService from "~/services/fairlaunch.token.service";

export const Trending = (props: {
  listLaunch?: ILauchPool[]
}) => {

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [listLaunch, setListLaunch] = useState<ILauchPool[]>([]);

  const getListTrend = useCallback(async () => {
    setIsLoading(true);
    try {

      const rs = await fairlaunchTokenService.trending({
        pageIndex: 1,
        pageSize: 10,
      });

      setListLaunch(rs.data);
      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    getListTrend();
  }, [getListTrend])

  useEffect(() => {
    sliderRef.current?.slickGoTo(activeIndex);
  }, [activeIndex])

  const renderBody = useMemo(() => {

    const setting = {
      responsive: [
        {
          breakpoint: 1681,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1441,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          }
        },
      ]
    }

    return (
      <Box
        w="100%"
        overflow="hidden"
      >
        <Slider
          {...setting}
          ref={sliderRef}
          speed={1000}
          dots={false}
          autoplay={true}
          infinite={true}
          slidesToShow={2}
          slidesToScroll={1}
          initialSlide={0}
          onSwipe={(e) => {
            console.log(e)
          }}
          beforeChange={(current, next) => setActiveIndex(current)}
          afterChange={(current,) => setActiveIndex(current)}
          nextArrow={null}
          prevArrow={null}
          cssEase="linear"
        >
          {[
            ...listLaunch,
          ].map((item, idx) => {
            return (
              <div
                key={idx}
                style={{ width: "auto" }}
              >
                <HStack spacing={1} w="fit-content">
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    color="black.light"
                  >
                    #{idx + 1}
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    className="textPrimary"
                  >
                    {item.tokenName}
                  </Text>
                </HStack>
              </div>
            )
          })}
        </Slider>
      </Box>
    )
  }, [listLaunch])

  return (
    <Box
      w="full"
      p={{ base: "5px", lg: "15px" }}
      bg="white"
      borderRadius="8px"
      border={{ md: "1px solid #ffd3cb" }}
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
    >

      <HStack>
        <Text
          fontWeight={"700"}
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight="21px"
          className="textPrimary"
          letterSpacing="1.5px"
          pr={{ md: "15px" }}
        >
          Trending
        </Text>

        <Flex
          flex={1}
          w="100%"
          flexWrap="nowrap"
          position={"relative"}
          zIndex={1}
          overflow={"auto"}
        >
          {[
            ...listLaunch,
          ].map((item, idx) => {
            return (
              <div
                key={idx}
                style={{ width: "auto", paddingRight: "10px" }}
                onClick={() => {
                  history(
                    `/feedipad/${item.chainId}/${item.presaleAddress}`
                  );
                }}
              >
                <HStack spacing={1} w="fit-content" cursor={{ lg: "pointer" }}>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    color="black.light"
                  >
                    #{idx + 1}
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    className="textPrimary"
                  >
                    {item.tokenName}
                  </Text>
                </HStack>
              </div>
            )
          })}
        </Flex>

        {/* <Flex
          flex={1}
          w="100%"
          flexWrap="nowrap"
          position={"relative"}
          zIndex={1}
          overflow={"auto"}
        >
          {renderBody}
        </Flex> */}

      </HStack>

    </Box>
  )
}
