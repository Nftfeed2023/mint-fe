import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import Header from './Header'
import SellerItem from './SellerItem'

const NewestCollections = () => {
  return (
    <Box>
      <Header title="Newest collections" />
      <SimpleGrid
        columns={{
          base: 1,
          sm: 1,
          lg: 3,
          xl: 4,
        }}
        spacing="20px"
        mt="16px"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return <SellerItem key={item} />
        })}
      </SimpleGrid>
    </Box>
  )
}

export default NewestCollections
