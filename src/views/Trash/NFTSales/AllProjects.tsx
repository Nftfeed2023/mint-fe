import { useRef, useState } from 'react'
import { Box, Text, SimpleGrid, HStack, Icon } from '@chakra-ui/react'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'

import MainLayout from '~/layouts/MainLayout'
import UpcomingCard from './components/UpcomingCard'
import OpeningCard from './components/OpeningCard'
import useWindowSize from '~/hooks/useWindowSize'
import TabContainer from './components/TabContainer'
import SecondaryButton from '~/components/SecondaryButton'

import { ReactComponent as ArrowRightIcon } from '~/assets/svgs/arrow-right.svg'
import { ReactComponent as ArrowLeftIcon } from '~/assets/svgs/arrow-left.svg'
import WrapperHeaderMobile from '../../../layouts/MasterLayout/WrapperHeaderMobile'

const AllProjects = () => {
  const { t } = useTranslation('src/views/NFTSales/AllProjects.lang.json')
  const { width } = useWindowSize()
  const [activeSlide, setActiveSlide] = useState(0)

  const refSlider = useRef<Slider>(null)

  return (
    <MainLayout>
      <WrapperHeaderMobile />
      <Box
        mt="120px"
        ml="20px"
        mr="20px"
        display={{
          base: 'block',
          lg: 'none',
        }}
      >
        <TabContainer />
      </Box>
      <Box
        mr={{
          base: '10px',
          xl: '41px',
        }}
        ml={{
          base: '10px',
          xl: '47px',
        }}
        mt={{
          base: '14px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >
        <Box>
          <Text
            fontSize="28px"
            lineHeight="33px"
            color="black.light"
            fontWeight="600"
          >
            {t('opening')}
          </Text>
          <Box w="100%" overflow="hidden" mt="20px">
            <Slider
              ref={refSlider}
              slidesToShow={1}
              slidesToScroll={1}
              dots={false}
              infinite={false}
              {...(width < 992 ? {} : { variableWidth: true })}
              beforeChange={(current, next) => {
                setActiveSlide(next)
              }}
              afterChange={() => { }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item) => {
                return (
                  <Box key={item}>
                    <Box
                      maxW={{
                        base: '100%',
                        lg: '918px',
                        '2lg': '738px',
                        '3lg': '918px',
                      }}
                      mr={{
                        base: '5px',
                        lg: '24px',
                      }}
                    >
                      <OpeningCard />
                    </Box>
                  </Box>
                )
              })}
            </Slider>
            <HStack
              mt={{
                base: '51px',
                lg: '18px',
              }}
              justifyContent={{
                base: 'center',
                lg: 'space-between',
              }}
            >
              <HStack>
                {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
                  return (
                    <Box
                      w={index === activeSlide ? '48px' : '24px'}
                      h="6px"
                      borderRadius="100px"
                      bg={index === activeSlide ? 'blue.darkest' : 'grey.c8'}
                      transition="all 250ms ease-in-out"
                    />
                  )
                })}
              </HStack>

              <HStack
                display={{
                  base: 'none',
                  lg: 'flex',
                }}
              >
                <SecondaryButton
                  borderRadius="50%"
                  onClick={refSlider.current?.slickPrev}
                  w="40px"
                  h="40px"
                  maxH="auto"
                  maxW="auto"
                  borderColor="white"
                  _disabled={{
                    bg: 'white',
                    borderColor: 'white',
                  }}
                >
                  <Icon
                    as={ArrowLeftIcon}
                    width="24px"
                    height="24px"
                    color="grey.c8"
                  />
                </SecondaryButton>
                <SecondaryButton
                  borderRadius="50%"
                  onClick={refSlider.current?.slickNext}
                  w="40px"
                  h="40px"
                  maxH="auto"
                  maxW="auto"
                  borderColor="white"
                  _disabled={{
                    bg: 'white',
                    borderColor: 'white',
                  }}
                >
                  <Icon as={ArrowRightIcon} width="20px" height="20px" />
                </SecondaryButton>
              </HStack>
            </HStack>
          </Box>
        </Box>

        <Box mt="77px">
          <Text
            fontSize="28px"
            lineHeight="33px"
            color="black.light"
            fontWeight="600"
          >
            {t('upcoming')}
          </Text>
          <SimpleGrid
            mt="24px"
            columns={{
              base: 1,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            spacingX="12px"
            spacingY="20px"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return <UpcomingCard key={item} />
            })}
          </SimpleGrid>
        </Box>

        <Box mt="134px">
          <Text
            fontSize="28px"
            lineHeight="33px"
            color="black.light"
            fontWeight="600"
          >
            {t('completed')}
          </Text>
          <SimpleGrid
            mt="24px"
            columns={{
              base: 1,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            spacingX="12px"
            spacingY="20px"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return <UpcomingCard key={item} isClosed />
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default AllProjects
