import { SimpleGrid, HStack, VStack, Icon, Text, Image } from "@chakra-ui/react"
import { SocialsLayout } from "~/components/SocialsLayout"
import ImgLogo from "~/assets/images/logo.png"

import TeleIcon from '~/assets/svgs/socials/icon_white_telegram.svg'
import TwitterIcon from '~/assets/svgs/socials/icon_white_twitter.svg'
import YbIcon from '~/assets/svgs/socials/icon_white_youtube.svg'
import TkIcon from '~/assets/svgs/socials/icon_tiktok_white.svg'
import { ReactComponent as ArrowDown } from '~/assets/svgs/arrow-down.svg'

export const InfoHeader = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, xl: 3 }}
      spacing={4}
      alignItems={"center"}
      w="full"
      pb={{ base: "20px", lg: "0px" }}
    >

      <VStack
        w="full"
        alignItems={{ base: "center", xl: "start" }}
      >
        <HStack
          w='full'
          alignSelf={"center"}
          justifyContent={{ base: "center", xl: "start" }}
        >
          <Image src={ImgLogo} h={{ base: "32px", md: "64px" }} w={{ base: "32px", md: "64px" }} />
          <Text
            fontWeight="700"
            fontSize={{ base: "24px", md: "28px", '2xl': "32px" }}
            lineHeight="32px"
            letterSpacing="-0.5px"
          >
            SHARKIEE (WSHARKIE)
          </Text>
        </HStack>
      </VStack>

      <VStack>
        <SocialsLayout
          socialLinks={[
            {
              id: "1",
              title: "Twitter",
              name: "Twitter",
              icon: TwitterIcon,
              href: "",
            },
            {
              id: "2",
              title: "Telegram Group",
              name: "Telegram Group",
              icon: TeleIcon,
              href: "",
            },
            {
              id: "3",
              title: "Telegram Channel",
              name: "Telegram Channel",
              icon: TeleIcon,
              href: "",
            },
            {
              id: "4",
              title: "Youtube",
              name: "Youtube",
              icon: YbIcon,
              href: "",
            },
            {
              id: "5",
              title: "Tiktok",
              name: "Tiktok",
              icon: TkIcon,
              href: "",
            },
          ]}
        />
      </VStack>

      <VStack
        w='full'
        alignItems={{ base: "center", xl: "end" }}
      >
        <HStack
          cursor={{ base: "none", lg: "pointer" }}
          spacing={0}
          w="fit-content"
          p="4px 8px"
          borderRadius={"8px"}
          border={"1px solid #448AFF"}
          onClick={() => {
            const element = document.getElementById("about-ido");
            element.scrollIntoView({ behavior: "smooth", block: 'center' })
          }}
        >
          <Text
            fontWeight="600"
            fontSize={{ base: "16px", lg: "20px", }}
            lineHeight="21px"
            letterSpacing="-0.5px"
          >
            About IDO
          </Text>
          <Icon as={ArrowDown} h={{ base: "20px", lg: "32px" }} w={{ base: "20px", lg: "32px" }} />
        </HStack>
      </VStack>

    </SimpleGrid>
  )
}
