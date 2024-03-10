import { Box, Grid, GridItem, Text, Image, HStack } from '@chakra-ui/react'

import DiscordIcon from '~/components/Icons/Discord'
import GlobalIcon from '~/components/Icons/Global'
import PaperClipIcon from '~/components/Icons/PaperClip'
import TwitterIcon from '~/components/Icons/Twitter'

import PhaseCard from './PhaseCard'

const PhaseSection = () => {
  return (
    <Box bg="white" borderRadius="12px" p="24px" mt="20px">
      <Grid templateColumns="repeat(2, 1fr)" gridGap={12}>
        <GridItem
          colSpan={{
            base: 2,
            lg: 1,
          }}
        >
          <HStack>
            <Image src="/assets/images/demo/pyramid.png" />
            <Text
              fontWeight="600"
              color="black.1d"
              fontSize="32px"
              lineHeight="38px"
            >
              Hesman Legend
            </Text>
          </HStack>
          <HStack mt="11px">
            <GlobalIcon />
            <TwitterIcon />
            <DiscordIcon />
            <PaperClipIcon />
          </HStack>
          <Grid templateColumns="repeat(8, 1fr)" mt="25px">
            <GridItem colSpan={4}>
              <PhaseCard
                title="Lead VC:"
                description="Alameda Research Venture"
              />
            </GridItem>
            <GridItem
              colSpan={3}
              ml={{
                base: '6px',
                lg: '24px',
              }}
            >
              <PhaseCard title="martket maker" description="hyperwalk" />
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(8, 1fr)" mt="20px">
            <GridItem
              colSpan={{
                base: 4,
                lg: 2,
              }}
            >
              <PhaseCard title="Public team:" description="Yes" />
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem
          colSpan={{
            base: 2,
            lg: 1,
          }}
        >
          <Image
            src="/assets/images/demo/phase-demo.png"
            maxH="259px"
            maxW="100%"
            w="full"
          />

          <Box>
            <Text
              mt="12px"
              fontSize="14px"
              fontWeight="700"
              color="#1F2228"
              lineHeight="19px"
            >
              Phase 1: Nahavi’s Invocation / The Awakening
            </Text>
            <Text
              mt="4px"
              fontSize="14px"
              fontWeight="400"
              color="#1F2228"
              lineHeight="19px"
            >
              A community call will prompt all Nahavis to proudly exhibit their
              origins on their socials through PFP and the bearing of the tag,
              24 hours prior to the mint. MINT / The Nahavis Awakening
            </Text>
            <Text
              mt="12px"
              fontSize="14px"
              fontWeight="700"
              color="#1F2228"
              lineHeight="19px"
            >
              Phase 1: Nahavi’s Invocation / The Awakening
            </Text>
            <Text
              mt="4px"
              fontSize="14px"
              fontWeight="400"
              color="#1F2228"
              lineHeight="19px"
            >
              A community call will prompt all Nahavis to proudly exhibit their
              origins on their socials through PFP and the bearing of the tag,
              24 hours prior to the mint. MINT / The Nahavis Awakening
            </Text>
            <Text
              mt="12px"
              fontSize="14px"
              fontWeight="700"
              color="#1F2228"
              lineHeight="19px"
            >
              Phase 1: Nahavi’s Invocation / The Awakening
            </Text>
            <Text
              mt="4px"
              fontSize="14px"
              fontWeight="400"
              color="#1F2228"
              lineHeight="19px"
            >
              A community call will prompt all Nahavis to proudly exhibit their
              origins on their socials through PFP and the bearing of the tag,
              24 hours prior to the mint. MINT / The Nahavis Awakening
            </Text>
            <Text
              mt="12px"
              fontSize="14px"
              fontWeight="700"
              color="#1F2228"
              lineHeight="19px"
            >
              Phase 1: Nahavi’s Invocation / The Awakening
            </Text>
            <Text
              mt="4px"
              fontSize="14px"
              fontWeight="400"
              color="#1F2228"
              lineHeight="19px"
            >
              A community call will prompt all Nahavis to proudly exhibit their
              origins on their socials through PFP and the bearing of the tag,
              24 hours prior to the mint. MINT / The Nahavis Awakening
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default PhaseSection
