import { Box, SimpleGrid } from '@chakra-ui/react'
import Slider from 'react-slick'

import useWindowSize from '~/hooks/useWindowSize'

import LaunchPadCard from './LaunchpadCard'
import LaunchpadCardMobile from './LaunchpadCard.mobile'

import Header from '../Header'

const Launchpad = () => {
  const { width } = useWindowSize()
  return (
    <div>
      <Header title="Launchpad" />

      {width > 992 ? (
        <SimpleGrid
          columns={{
            sm: 1,
            lg: 3,
            xl: 4,
          }}
          spacing="20px"
          mt="16px"
        >
          {[1, 2].map((item) => {
            return <LaunchPadCard key={item} />
          })}
        </SimpleGrid>
      ) : (
        <Box w="100%" maxWidth="calc(100vw - 40px)" overflow="hidden" mt="20px">
          <Slider
            {...{
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((item) => {
              return (
                <Box key={item} mr="20px">
                  <Box maxW="214px">
                    <LaunchpadCardMobile index={item} />
                  </Box>
                </Box>
              )
            })}
          </Slider>
        </Box>
      )}
    </div>
  )
}

export default Launchpad
