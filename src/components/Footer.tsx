import { HStack, Text, VStack, useColorMode } from "@chakra-ui/react"
import useWindowSize from "~/hooks/useWindowSize";
import { SocialsLayout } from '~/components/SocialsLayout'


import TeleIcon from '~/assets/svgs/socials/icon_white_telegram.svg'
import TwitterIcon from '~/assets/svgs/socials/icon_white_twitter.svg'
import IcDiscord from '~/assets/svgs/socials/ic_discord.svg'
import IcGitbook from '~/assets/svgs/socials/ic_gitbook.svg'

const Footer = () => {
  const { width } = useWindowSize();
  const { colorMode } = useColorMode();

  return (
    <VStack
      bg={`transparent`}
      w="full"
    >

      <VStack
        maxW={{ base: "100%", }}
        w="full"
        py={{ base: "20px", md: "32px" }}
        px={{ base: "12px", md: "32px", xl: "50px" }}
      >

        <HStack
          w="full"
          justifyContent="space-between"
        >
          <Text
            fontSize={{ base: "13px", md: "16px" }}
            fontWeight={500}
            lineHeight="normal"
          >
            © 2023 NFTFeed
          </Text>


          <SocialsLayout
            socialLinks={[
              {
                id: "1",
                title: "Telegram Group",
                name: "Telegram Group",
                icon: TeleIcon,
                href: "https://t.me/NFTFeedOfficial",
              },
              {
                id: "2",
                title: "X",
                name: "X",
                icon: TwitterIcon,
                href: "https://twitter.com/NFTFeedOfficial",
              },
              {
                id: "3",
                title: "Discord",
                name: "Discord",
                icon: IcDiscord,
                href: "https://discord.com/invite/v65bvg5veQ",
              },
              {
                id: "4",
                title: "GitBook",
                name: "GitBook",
                icon: IcGitbook,
                href: "https://nftfeed.gitbook.io/nftfeed/",
              },
            ]}
          />

        </HStack>

      </VStack>

    </VStack>
  )
}

export default Footer
