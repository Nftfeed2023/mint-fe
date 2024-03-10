import { Box, SimpleGrid } from '@chakra-ui/react'
import Slider from 'react-slick'
import ContentLoader from 'react-content-loader'

import useWindowSize from '~/hooks/useWindowSize'
import CollectionDetailItemCard from '~/container/CollectionDetailItemCard/CollectionDetailItemCard'

import Header from './Header'
import useListItemNewest from '../hooks/useListItemNewest'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="17" rx="0" ry="0" width="200" height="106" />
    <rect x="5" y="137" rx="0" ry="0" width="158" height="12" />
  </ContentLoader>
)

const NewestCollections = () => {
  const { width } = useWindowSize()
  const { data, isLoading } = useListItemNewest()

  if (isLoading) {
    return (
      <Box>
        <Header title="The newest listed" />
        <SimpleGrid
          columns={{
            sm: 3,
          }}
          spacing="20px"
          mt="16px"
        >
          {[1, 2, 3].map((key) => {
            return <MyLoader key={key} />
          })}
        </SimpleGrid>
      </Box>
    )
  }

  return (
    <Box pb="150px">
      <Header title="The newest listed" />
      {width > 992 ? (
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
            xl: 4,
            '2xl': 5,
          }}
          {...(width <= 1440 && data.length > 4 && { minChildWidth: '200px' })}
          spacing="20px"
          mt="16px"
        >
          {data.map((item: any) => {
            return <CollectionDetailItemCard key={item.id} {...item} />
          })}
        </SimpleGrid>
      ) : (
        <Box w="100%" mt="20px">
          <Slider
            {...{
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
            }}
          >
            {data.map((item: any) => {
              return (
                <Box key={item.id}>
                  <Box mr="20px">
                    <CollectionDetailItemCard {...item} />
                  </Box>
                </Box>
              )
            })}
          </Slider>
        </Box>
      )}
    </Box>
  )
}

export default NewestCollections
