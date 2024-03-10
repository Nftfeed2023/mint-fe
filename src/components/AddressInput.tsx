import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ReactComponent as BNBIcon } from '~/assets/svgs/bnb.svg'

const AddressInput = ({ value, onChange }) => {
  return (
    <Input
      borderColor="#448AFF !important"
      borderWidth="1px"
      borderStyle="solid"
      placeholder="Receiver address"
      borderRadius="10px"
      textAlign="right"
      mr="40px"
      fontSize="32px"
      lineHeight="20px"
      h="56px"
      bg="#F7F9FA"
      value={value}
      onChange={onChange}
    />
  )
}

export default AddressInput
