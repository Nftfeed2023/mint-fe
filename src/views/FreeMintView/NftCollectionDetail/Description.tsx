import { Box, Text, Tooltip } from '@chakra-ui/react'
import { memo, useState } from 'react'
import useWindowSize from '~/hooks/useWindowSize'
import ReactQuill from 'react-quill';

const Description = ({ description }: { description?: string }) => {
  const [onPressSeeFull, setOnPressSeeFull] = useState(false)
  const { width } = useWindowSize()

  if (!description) {
    return null
  }

  const pipeDesc = description
  // .split("\n")


  return (
    // <Tooltip isDisabled={width < 1024} label={description}>
    <Box
      w='full'
      p={{ base: "10px 0px", md: "20px 30px" }}
      border={{
        base: 'none',
        lg: '1px solid #ccc',
      }}
      borderRadius="10px"
    >

      <ReactQuill
        value={pipeDesc}
        readOnly={true}
        theme={"bubble"}
      />

    </Box>
    // </Tooltip >
  )
}

export default memo(Description)
