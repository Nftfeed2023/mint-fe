import { Box, HStack, Image, Tooltip, } from '@chakra-ui/react'
import useWindowSize from '~/hooks/useWindowSize';


export interface ISocial {
  id: string
  title: string;
  name: string;
  icon: string;
  href: string;
}

export const SocialsLayout = (props: {
  socialLinks: ISocial[]
}) => {
  const { socialLinks } = props;
  const { width } = useWindowSize();
  return (
    <HStack spacing={2}>
      {socialLinks.length > 0 &&
        socialLinks.map((item, idx) => {
          if (width <= 500) {
            return (
              <Box
                key={idx}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.open(item.href, '_blank')
                }}
              >
                <Image
                  src={item.icon}
                  h="18px"
                />
              </Box>
            )
          }
          return (
            <Tooltip
              label={item.name}
              placement='top-start'
              borderRadius="8px"
              key={idx}
            >
              <Box
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.open(item.href, '_blank')
                }}
              >
                <Image
                  src={item.icon}
                  h="20px"
                />
              </Box>
            </Tooltip>
          )
        })
      }
    </HStack>
  )
}
