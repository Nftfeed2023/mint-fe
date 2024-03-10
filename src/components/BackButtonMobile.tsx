import { ArrowBackIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

const BackButtonMobile = () => {
  const { t } = useTranslation('src/components/BackButtonMobile.lang.json')
  const navigate = useNavigate()
  return (
    <HStack
      spacing="14px"
      alignItems="center"
      onClick={() => {
        navigate(-1)
      }}
      cursor="pointer"
    >
      <ArrowBackIcon h="24px" w="24px" />
      <Text fontSize="16px" color="black" fontWeight="600" lineHeight="22.4px">
        {t('back')}
      </Text>
    </HStack>
  )
}

export default BackButtonMobile
