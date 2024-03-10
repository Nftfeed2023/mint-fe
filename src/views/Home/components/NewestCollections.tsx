import { Box, SimpleGrid } from '@chakra-ui/react'
import ContentLoader from 'react-content-loader'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

import CollectionCard from '~/components/CollectionCard'
import useWindowSize from '~/hooks/useWindowSize'

import useListNewest from '../hooks/useListNewest'
import Header from './Header'
import { MAIN_ROUTERS } from "~/routes/routes"

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
  const { t } = useTranslation(
    'src/views/Home/components/NewestCollections.lang.json',
  )
  const navigate = useNavigate()
  const { data, isLoading } = useListNewest()

  if (isLoading) {
    return (
      <Box>
        <Header
          title={t('newest_collections')}
          onClickSeeAll={() => {
            navigate(`${MAIN_ROUTERS.MARKET_PLACE_ROUTER}?order=newest`)
          }}
        />
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
    <Box>
      <Header
        title={t('newest_collections')}
        onClickSeeAll={() => {
          navigate(`${MAIN_ROUTERS.MARKET_PLACE_ROUTER}?order=newest`)
        }}
      />
      {width > 992 ? (
        <SimpleGrid
          columns={{
            sm: 1,
            lg: 3,
            xl: 4,
            '2xl': 5,
          }}
          spacing="20px"
          mt="16px"
        >
          {data.map((item) => {
            return <CollectionCard key={item.id} {...item} />
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
            {data.map((item) => {
              return (
                <Box key={item.id} mr="20px">
                  <Box maxW="214px">
                    <CollectionCard {...item} />
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
