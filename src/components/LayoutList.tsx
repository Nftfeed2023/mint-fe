import { SimpleGrid } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import useWindowSize from '~/hooks/useWindowSize'

const LayoutList: FC<{ children?: ReactNode[] }> = ({ children }) => {
  const { width } = useWindowSize()
  return (
    <SimpleGrid
      columns={{
        sm: 1,
        lg: 3,
        xl: 4,
        '2xl': 5,
      }}
      w="100%"
      spacing="16px"
      {...(width <= 1280 && children.length > 1 && { minChildWidth: '200px' })}
    >
      {children}
    </SimpleGrid>
  )
}

export default LayoutList
