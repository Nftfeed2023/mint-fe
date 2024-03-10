import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { ReactComponent as BNBIcon } from '~/assets/svgs/bnb.svg'

const MaxInput = () => {
  return (
    <InputGroup>
      <Input
        border="1px solid #DFE6F1"
        pr="5rem"
        placeholder="0"
        textAlign="right"
        fontSize="18px"
        lineHeight="20px"
        color="black.1d"
        fontWeight="500"
      />
      <InputRightElement width="4.5rem">
        <Button
          fontSize="16px"
          fontWeight="500"
          lineHeight="20px"
          color="black.1d"
          onClick={() => {}}
        >
          MAX
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default MaxInput
