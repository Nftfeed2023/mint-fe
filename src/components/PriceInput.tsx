import {
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { ReactComponent as NoteIcon } from '~/assets/svgs/note-icon.svg'

const precision = 1
const format = (valueAsNumber: number) => {
  let valueAsString = valueAsNumber.toString()

  const [integerPart, decimalPart = ''] = valueAsString.split('.')

  if (decimalPart) {
    valueAsString = `${integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    )},${decimalPart.padEnd(precision, '0')}`
  } else {
    valueAsString = `${integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    )},${'0'.repeat(precision)}`
  }

  return valueAsString
}

const parse = (valueAsString: string) => {
  let valueAsNumber = 0

  try {
    let parsedValueAsString = valueAsString.replace(/\D/g, '')

    parsedValueAsString = parsedValueAsString.padStart(precision + 1, '0')

    parsedValueAsString = `${parsedValueAsString.substring(
      0,
      parsedValueAsString.length - precision,
    )}.${parsedValueAsString.slice(precision * -1)}`

    valueAsNumber = parseFloat(parsedValueAsString)
  } catch {
    valueAsNumber = 0
  }

  return valueAsNumber
}

const PriceInput = ({ onChange, value }) => {
  return (
    <>
      <InputGroup>
        <Input
          value={value}
          onChange={onChange}
          // onKeyPress={(event) => {
          //   console.log('====================================')
          //   console.log(event.key)
          //   console.log('====================================')
          //   if (!/^(\d+)(,\d{1,2}|\.\d{1,2})?$/.test(event.key)) {
          //     event.preventDefault()
          //   }
          // }}
          borderColor="#448AFF !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="0.000"
          borderRadius="10px"
          textAlign="right"
          fontWeight="500"
          mr="106px"
          fontSize="32px"
          lineHeight="20px"
          h="56px"
          bg="#F7F9FA"
        />
        <InputRightElement
          bg="#EFF3F9"
          borderTopColor="#448AFF !important"
          borderRightColor="#448AFF !important"
          borderBottomColor="#448AFF !important"
          borderWidth="1px"
          borderStyle="solid"
          borderTopRightRadius="10px"
          borderBottomRightRadius="10px"
          w="136px"
          children={
            <HStack>
              <Image src="/assets/images/demo/busd.png" w="32px" h="32px" />
              <Text
                fontSize="24px"
                lineHeight="20px"
                color="black"
                letterSpacing="-0.5px"
              >
                BUSD
              </Text>
            </HStack>
          }
          h="56px"
        />
      </InputGroup>
      <HStack align="center" mt="10px">
        <Icon as={NoteIcon} w="29px" h="28px" />
        <Text
          fontSize="13px"
          color="grey.97"
          lineHeight="15px"
          letterSpacing="-0.5px"
        >
          The comma (,) is to separate groups of thousands, the dot (.) is to
          separate decimals
        </Text>
      </HStack>
    </>
  )
}

export default PriceInput
