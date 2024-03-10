import { HStack, Spacer, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import TextButton from '~/components/TextButton'
import Title from './Title'

const Header = ({ title, onClickSeeAll = () => {} }) => {
  const { t } = useTranslation('src/views/Home/components/Header.lang.json')
  return (
    <HStack w="100%">
      <Title>{title}</Title>
      <Spacer />
      <Box>
        <TextButton
          fontSize={{ base: '14px', lg: '15px' }}
          lineHeight={{
            base: '14px',
            lg: '18px',
          }}
          letterSpacing="-0.5px"
          fontWeight="400"
          h="33px"
          borderRadius="16px"
          textTransform="none"
          pr={{
            base: 0,
            lg: '20px',
          }}
          onClick={onClickSeeAll}
        >
          {t('see_all')}
        </TextButton>
      </Box>
    </HStack>
  )
}

export default Header
